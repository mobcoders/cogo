'use server';
import { auth } from '@/auth';
import axios from 'axios';
import { revalidatePath } from 'next/cache';

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

export async function WeavrUserCreationFlow(tripid: string) {
  console.log('Starting Weavr Consumer Creation Flow...');
  const userCreationResp = await createWeavrConsumer();
  console.log('Consumer created');
  await assignPasswordWeavrConsumer(userCreationResp.id.id);
  console.log('Password assigned');
  await emailConsumerVerificationCode();
  console.log('Code emailed');
  await verifyConsumerEmailCode('123456');
  console.log('Email code verified');
  await loginNewUser();
  console.log('User logged in & bearer token intercepted');
  await enrolUserPhoneOTP();
  console.log('User phone OTP enrolled');
  await verifyConsumerRootUserSMSFactor();
  console.log('Consumer Root user SMS verified');
  // await stepUpChallengeOTP();
  // console.log('StepUp complete.');
  console.log('KYC flow starting...');
  const loginResp = await loginNewUser();
  console.log('User logged in & bearer token intercepted');
  await startConsumerKYC();
  console.log('KYC started.');
  await simulateConsumerKYCApproval(loginResp.identity.id);
  console.log(
    'KYC approval simulation complete. Revalidating path to trip card details page...'
  );
  revalidatePath(`/${tripid}/card-details`);
}

export async function createWeavrConsumer() {
  const session = await auth();

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

export async function loginNewUser() {
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

    weavr.interceptors.request.clear();

    weavr.interceptors.request.use(
      function (config) {
        config.headers.Authorization = `Bearer ${response.data.token}`;
        return config;
      },
      null,
      { synchronous: true }
    );
    return response.data;
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
