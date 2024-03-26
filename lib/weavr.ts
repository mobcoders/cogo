'use server';
import { auth } from '@/auth';
import axios from 'axios';
import { revalidatePath } from 'next/cache';

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const weavr = axios.create({
  baseURL: 'https://sandbox.weavr.io/multi',
  headers: {
    'api-key': 'Fu+L/syUYY0BjnbJwd8ARA==',
    'Content-Type': 'application/json',
  },
});

const weavrSimulateApproval = axios.create({
  baseURL: 'https://sandbox.weavr.io/simulate',
  headers: {
    'programme-key': process.env.WEAVR_API_KEY,
    'Content-Type': 'application/json',
  },
});

// Hard coded aspects to later collect from user:
// country code & number.
// ip Address.
// date of birth.

export async function WeavrUserCreationFlow() {
  console.log('Starting Weavr Consumer Creation Flow...');
  const userCreationResp = await createWeavrConsumer();
  console.log('Consumer created');
  await assignPasswordWeavrConsumer(userCreationResp.id.id);
  console.log('Password assigned');
  await emailConsumerVerificationCode();
  console.log('Code emailed');
  await verifyConsumerEmailCode('123456');
  console.log('Email code verified');
  await loginUser();
  console.log('User logged in & bearer token intercepted');
  await enrolUserPhoneOTP();
  console.log('User phone OTP enrolled');
  await verifyConsumerRootUserSMSFactor();
  console.log('Consumer Root user SMS verified');
  await stepUpChallengeOTP();
  console.log('StepUp complete\nPlease now start KYC flow...');
}

export async function weavrKYCFlow() {
  console.log('KYC flow starting...');
  const loginResp = await loginUser();
  console.log('User logged in & bearer token intercepted');
  await startConsumerKYC();
  console.log('KYC started.');
  await simulateConsumerKYCApproval(loginResp.identity.id);
  console.log('KYC approval simulation complete.');
}

export async function createWeavrConsumer() {
  const session = await auth();
  // console.log(session!.user!.name!.split(' ')[0]);
  // profileId: process.env.WEAVR_CONSUMERS_PROFILE_ID,

  try {
    const splitName = session!.user!.name!.split(' ');
    const response = await weavr.post('/consumers', {
      profileId: '112157649645469763',
      rootUser: {
        name: splitName[0],
        surname: splitName[0],
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
      },
      ipAddress: '82.163.118.2',
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

export async function emailConsumerVerificationCode() {
  const session = await auth();
  console.log(session?.user?.email);
  try {
    const response = await weavr.post('/consumers/verification/email/send', {
      email: session?.user?.email,
    });
    console.log(response.status);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function verifyConsumerEmailCode(verificationCode: string) {
  const session = await auth();
  try {
    const response = await weavr.post('/consumers/verification/email/verify', {
      email: session?.user?.email,
      verificationCode: verificationCode,
    });
    console.log('verifyEmailCode status:', response.status);
  } catch (error) {
    console.error(error);
  }
}

export async function enrolUserPhoneOTP() {
  try {
    const response = await weavr.post('/authentication_factors/otp/sms');
    console.log('Enrol OTP status:', response.status);
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
    console.log('start consumer kyc status:', response.status);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function simulateConsumerKYCApproval(consumer_id: string) {
  try {
    const response = await weavrSimulateApproval.post(
      `/api/consumers/${consumer_id}/verify`
    );
    console.log('KYC approval status:', response.status);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

// export async function getConsumerKYC() {
//   try {

//   } catch (error) {
//     console.error(error);
//   }
// }

export async function loginUser() {
  const session = await auth();
  try {
    //login with user password
    const response = await weavr.post('/login_with_password', {
      email: session?.user?.email,
      password: {
        value: 'Pass1234!',
      },
    });
    console.log('loginUser status', response.status);
    await sleep(2000);

    weavr.interceptors.request.clear();
    await sleep(2000);

    weavr.interceptors.request.use(
      function (config) {
        config.headers.Authorization = `Bearer ${response.data.token}`;
        return config;
      },
      null,
      { synchronous: true }
    );
    return response.data;

    // //OTP SMS step up
    // const SMS_StepUP = await weavr.post('/stepup/challenges/otp/SMS');
    // console.log('SMS_StepUP status:', SMS_StepUP.status);

    // //OTP verify
    // await weavr.post('/stepup/challenges/otp/SMS/verify', {
    //   verificationCode: '123456',
    // });

    // console.log('OTP verified');
  } catch (error) {
    console.log(error);
  }
}

export async function stepUpChallengeOTP() {
  try {
    const response = await weavr.post('/stepup/challenges/otp/SMS', {});
    console.log('stepUpChallengeOTP status:', response.status);
    console.log('stepUpChallengeOTP response data:', response.data);
  } catch (error) {
    console.error(error);
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
