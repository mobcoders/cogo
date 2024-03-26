'use server';
import { auth } from '@/auth';
import axios from 'axios';
import { Session } from 'next-auth';
import { revalidatePath } from 'next/cache';

const weavr = axios.create({
  baseURL: 'https://sandbox.weavr.io/multi',
  headers: {
    'api-key': `${process.env.WEAVR_API_KEY}`,
    'Content-Type': 'application/json',
  },
});

const weavrSimulateApproval = axios.create({
  baseURL: 'https://sandbox.weavr.io/simulate',
  headers: {
    'programme-key': `${process.env.WEAVR_API_KEY}`,
    'Content-Type': 'application/json',
  },
});

// Hard coded aspects to later collect from user:
// country code & number.
// ip Address.
// date of birth.

export async function WeavrUserCreationFlow() {
  const session = await auth();
  const userCreationResp = await createWeavrConsumer(session);
  // await assignPasswordWeavrConsumer(userCreationResp.id.id);
  // await loginUser(session);
  // await emailConsumerVerificationCode(session);
  // await verifyConsumerEmailCode(session!.user!.email!, '123456');
  // const accessTokenResp = await createAccessToken(userCreationResp.id.id);
  // const accessToken = accessTokenResp?.token;
}

export async function weavrKYCFlow() {
  const session = await auth();
  const loginResp = await loginUser(session);
  await startConsumerKYC();
  await simulateConsumerKYCApproval(loginResp.identity.id);
}

export async function createWeavrConsumer(session: Session | null) {
  // const session = await auth();
  try {
    const response = await weavr.post('/consumers', {
      profileId: process.env.WEAVR_CONSUMERS_PROFILE_ID,
      rootUser: {
        name: session!.user!.name!.split(' ')[0],
        surname: session!.user!.name!.split(' ')[1],
        email: session!.user!.email!,
        mobile: {
          countryCode: '+44',
          number: '7147711260',
        },
        dateOfBirth: {
          year: 1998,
          month: 5,
          day: 5,
        },
        address: {
          addressLine1: 'Address line 1',
          addressLine2: 'Address line 2',
          city: 'City',
          country: 'GB',
          postCode: 'TST 1234',
          state: 'State',
        },
        ipAddress: '82.163.118.2',
      },
      acceptedTerms: true,
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

// hard coded password.
export async function assignPasswordWeavrConsumer(consumer_id: string) {
  try {
    const response = await weavr.post(`/passwords/${consumer_id}/create`, {
      password: {
        value: 'Pass1234!',
      },
    });
  } catch (error) {
    console.error(error);
  }
}

export async function emailConsumerVerificationCode(session: Session | null) {
  // const session = await auth();
  try {
    const response = await weavr.post('/consumers/verification/email/send', {
      email: session?.user?.email,
    });

    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function verifyConsumerEmailCode(
  consumerEmail: string,
  verificationCode: string
) {
  try {
    const response = await weavr.post('/consumers/verification/email/verify', {
      email: consumerEmail,
      verificationCode: verificationCode,
    });
  } catch (error) {
    console.error(error);
  }
}

export async function enrolUserPhoneOTP() {
  try {
    const response = await weavr.post('/authentication_factors/otp/sms');
  } catch (error) {
    console.error(error);
  }
}

export async function createAccessToken(userId: string) {
  try {
    const response = await weavr.post('/access_token', {
      identity: {
        type: 'CONSUMER',
        id: userId,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function verifyConsumerRootUserSMSFactor() {
  try {
    const response = await weavr.post(
      '/authentication_factors/otp/sms/verify',
      {
        verificationCode: '123456',
      }
    );
  } catch (error) {
    console.error(error);
  }
}

export async function startConsumerKYC() {
  try {
    const response = await weavr.post('/consumers/kyc');
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function simulateConsumerKYCApproval(consumer_id: string) {
  const response = await weavrSimulateApproval.post(
    `/api/consumers/${consumer_id}/verify`
  );
  return response.data;
}

// export async function getConsumerKYC() {
//   try {

//   } catch (error) {
//     console.error(error);
//   }
// }

export async function loginUser(session: Session | null) {
  // const session = await auth();
  try {
    //login with user password
    const response = await weavr.post('/login_with_password', {
      email: `${session?.user?.email}`,
      password: {
        value: 'Pass1234!',
      },
    });

    weavr.interceptors.request.use(
      function (config) {
        config.headers.Authorization = `Bearer ${response.data.token}`;
        return config;
      },
      null,
      { synchronous: true }
    );

    // const authBearerHeader = {
    //   headers: {
    //     Authorization: `Bearer ${response.data.token}`,
    //   },
    // };

    //OTP SMS step up
    await weavr.post('/stepup/challenges/otp/SMS');
    console.log('SMS sent...');

    //OTP verify
    await weavr.post('/stepup/challenges/otp/SMS/verify', {
      verificationCode: '123456',
    });

    console.log('OTP verified');
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function getCardDetails(tripid: string) {
  // const authBearerHeader = {
  //   headers: {
  //     Authorization: `Bearer ${token}`,
  //   },
  // };

  try {
    const response = await weavr.get('/managed_cards');
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

export async function getCardStatement() {}

export async function createCard(tripid: string) {
  const session = await auth();
  // const authBearerHeader = {
  //   headers: {
  //     Authorization: `Bearer ${token}`,
  //   },
  // };
  try {
    console.log('creating card...');
    const response = await weavr.post('/managed_cards', {
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
    });
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
  revalidatePath(`/${tripid}/card-details`);
}

export async function deleteCard(tripid: string) {
  // const authBearerHeader = {
  //   headers: {
  //     Authorization: `Bearer ${token}`,
  //   },
  // };
  try {
    const cardDetails = await getCardDetails(tripid);
    await weavr.post(`/managed_cards/${cardDetails.id}/remove`);
  } catch (error) {
    console.error(error);
  }
  revalidatePath(`/${tripid}/card-details`);
}
