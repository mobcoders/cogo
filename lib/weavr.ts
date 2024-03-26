'use server';
import { auth } from '@/auth';
import axios from 'axios';
import { revalidatePath } from 'next/cache';

const weavr = axios.create({
  baseURL: 'https://sandbox.weavr.io/multi',
  headers: {
    'api-key': `${process.env.WEAVR_API_KEY}`,
    'Content-Type': 'application/json',
  },
});

export async function loginUser() {
  const session = await auth();

  try {
    //login with user password
    const response = await weavr.post('/login_with_password', {
      email: `${session?.user?.email}`,
      password: {
        value: 'Pass1234!',
      },
    });

    const authBearerHeader = {
      headers: {
        Authorization: `Bearer ${response.data.token}`,
      },
    };

    //OTP SMS step up
    await weavr.post('/stepup/challenges/otp/SMS', {}, authBearerHeader);
    console.log('SMS sent...');

    //OTP verify
    await weavr.post(
      '/stepup/challenges/otp/SMS/verify',
      {
        verificationCode: 123456,
      },
      authBearerHeader
    );

    console.log('OTP verified');
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function getCardDetails(token: string, tripid: string) {
  const authBearerHeader = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await weavr.get('/managed_cards', authBearerHeader);
    console.log(
      response.data.cards.find((card: any) => card.friendlyName === tripid)
    );
    return response.data.cards.find(
      (card: any) => card.friendlyName === tripid
    );
  } catch (error) {
    console.error(error);
  }
}

export async function getCardStatement(token: string) {}

export async function createCard(token: string, tripid: string) {
  const session = await auth();
  const authBearerHeader = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    console.log('creating card...');
    const response = await weavr.post(
      '/managed_cards',
      {
        profileId: process.env.WEAVR_MANAGED_CARDS_PROFILE_ID,
        friendlyName: tripid,
        currency: 'GBP',
        nameOnCard: session?.user?.name,
        cardholderMobileNumber: '+35699112233',
        billingAddress: {
          addressLine1: 'addressLine1',
          addressLine2: 'addressLine2',
          city: 'London',
          postCode: 'SPB1111',
          state: 'state',
          country: 'MT',
        },
        tag: 'tag',
        mode: 'PREPAID_MODE',
      },
      authBearerHeader
    );
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
  revalidatePath(`/${tripid}/card-details`);
}

export async function deleteCard(token: string, tripid: string) {
  const authBearerHeader = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const cardDetails = await getCardDetails(token, tripid);
    await weavr.post(
      `/managed_cards/${cardDetails.id}/remove`,
      undefined,
      authBearerHeader
    );
  } catch (error) {
    console.error(error);
  }
  revalidatePath(`/${tripid}/card-details`);
}
