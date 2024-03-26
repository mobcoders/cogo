'use server';
import axios from 'axios';

const weavr = axios.create({
  baseURL: 'https://sandbox.weavr.io/multi',
  headers: {
    'api-key': `${process.env.WEAVR_API_KEY}`,
    'Content-Type': 'application/json',
  },
});

export async function loginUser() {
  try {
    //login with user password
    const response = await weavr.post('/login_with_password', {
      email: 'arjungill6ep@gmail.com',
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

export async function getCardDetails(token: string) {
  const authBearerHeader = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await weavr.get('/managed_cards', authBearerHeader);
    return response.data.cards[0];
  } catch (error) {
    console.error(error);
  }
}

export async function getCardStatement(token: string) {}
