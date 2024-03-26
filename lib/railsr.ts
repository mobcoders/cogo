'use server';
import axios from 'axios';

const railsrApi = axios.create({
  baseURL: 'https://play.railsbank.com',
  headers: {
    Authorization: `API-Key ${process.env.RAILSR_PLAY_KEY}`,
    'Content-Type': 'application/json',
  },
});

// Railsr docs start with creating beneficiaries. Getting malformed field errors. Have a feeling I need to create a user first.
// Will return to this.
export async function createBeneficiary() {
  try {
    const response = await railsrApi.post(`/v1/customer/beneficiaries`, {
      holder_id: 'c91b339e-57d7-41ea-a805-8966ce8fe4ed',
      default_account: {
        asset_class: 'currency',
        asset_type: 'gbp',
      },
      person: {
        name: 'Theo Cooper-Brown',
      },
    });
    console.log(await response.data);
    // console.log('data path: ', await response.data.request.data.path);
    return response;
  } catch (error) {
    console.error('Error creating beneficiary:', error);
  }
}

// Note UK user country of residence must be "GB".
// Income must be non-zero.
export async function createEndUser() {
  const response = await railsrApi.post('/v1/customer/endusers', {
    enduser_risk_level: 'medium',
    enduser_meta: {
      foo: 'bar',
    },
    person: {
      country_of_residence: ['GB'],
      document_number: '000 000 000',
      document_type: 'passport',
      full_name: {
        last_name: 'Cooper-Brown',
        middle_name: 'Raharjo',
        first_name: 'Theodore',
      },
      income: {
        frequency: 'annual',
        currency: 'GBP',
        amount: '999999',
      },
      pep_type: 'direct',
      pep_notes: 'comment',
      address_history: [
        {
          address_end_date: '2047-10-16',
          address_start_date: '2015-03-07',
          address_iso_country: 'US',
        },
        {
          address_end_date: '2047-10-16',
          address_start_date: '2000-01-01',
          address_iso_country: 'US',
        },
      ],
      pep: true,
      date_onboarded: '2011-11-21',
      email: 'alice@short.com',
      tin: '541571',
      document_issue_date: '2000-01-01',
      name: 'Bob',
      address: {
        address_region: 'California',
        address_iso_country: 'GB',
        address_number: '13',
        address_postal_code: '112233',
        address_refinement: 'Apartment 42',
        address_street: 'Riverside Drive',
        address_city: 'Example City',
      },
      social_security_number: '090606',
      telephone: '0012345678912',
      foreign_residency_tin: '541571',
      date_of_birth: '1981-02-03',
      expected_volume: {
        currency: 'eur',
        range: '5001-10000',
        type: 'monthly',
      },
      account_purposes: ['pay-bills', 'pay-bills'],
      document_expiration_date: '2020-12-03',
      tin_type: 'type',
      citizenship: ['USA'],
      nationality: ['Hungarian'],
      document_issuer: 'USA',
      country_of_birth: 'USA',
    },
  });

  console.log(response.data);
}

// Working as intended.
export async function listAllEndusers() {
  const response = await railsrApi.get('/v1/customer/endusers', {
    params: {
      items_per_page: 10,
      offset: 0,
    },
  });

  console.log(response.data);
  return response.data;
}

// => Look into the alternative ledger_type: "ledger-type-omnibus". This may be what we need but unsure yet.
//    https://www.investopedia.com/terms/o/omnibusaccount.asp
// => Look into partner_product. See what is appropriate. Allowed values here: https://railsbank.stoplight.io/docs/api/0b1a47f33fa20-create-ledger
// => Note: holder_id must be 1 that actually exists. I have created a few. You can see the IDs by clicking "List all endusers"

// => GBP specific Ledger issuance: https://railsbank.stoplight.io/docs/guides/ZG9jOjI4NzczMjI1-issuing-a-gbp-ledger
// => For some reason partner_product "PayrNet-GBP-2" is invalid. However, "PayrNet-GBP-2" works just fine.

// I'm having issues logging error data. Better to get the input data sorted in Postman and then slot in here. Below works as intended now.
// => We need at least one of the Railsbank-Debit-* partner products enabled for Railsr card functionality. Now scrapping PayrNet.
export async function createLedger() {
  const response = await railsrApi.post('/v1/customer/ledgers', {
    ledger_primary_use_types: ['ledger-primary-use-types-payments'],
    ledger_who_owns_assets: 'ledger-assets-owned-by-me',
    holder_id: '660087f5-1365-4cc9-986e-d002cbc6f65a',
    ledger_t_and_cs_country_of_jurisdiction: 'GBR',
    partner_product: 'Railsbank-Debit-Card-3',
    asset_type: 'gbp',
    asset_class: 'currency',
    ledger_type: 'ledger-type-single-user',
  });

  console.log(await response.data);
  return await response.data;
}

// Working as intended.
// Ledger id: '660087f5-1365-4cc9-986e-d002cbc6f65a'
//
export async function createCard() {
  const response = await railsrApi.post('/v1/customer/cards', {
    ledger_id: '660087f5-1365-4cc9-986e-d002cbc6f65a',
    card_programme: 'short',
    card_delivery_name: 'Theo Railsr-Test',
    card_type: 'virtual',
  });

  console.log(await response.data);
  return await response.data;
}
