import { google, lucia } from '@/auth';
import { cookies } from 'next/headers';
import { OAuth2RequestError, generateCodeVerifier } from 'arctic';
import { generateId } from 'lucia';

export async function GET(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const code = url.searchParams.get('code');
  const state = url.searchParams.get('state');
  const storedState = cookies().get('google_oauth_state')?.value ?? null;
  const codeVerifier = generateCodeVerifier();

  prisma.user.create({
    data: {
      id: generateId(15),
      google_id: 'dslkjfadsjfl',
      username: 'dlkfjlds;fja',
    },
  });

  if (!code || !state || !storedState || state !== storedState) {
    return new Response(null, {
      status: 400,
    });
  }

  try {
    const tokens = await google.validateAuthorizationCode(code!, codeVerifier);
    const googleUserResponse = await fetch(
      'https://www.googleapis.com/oauth2/v1/userinfo',
      {
        headers: {
          Authorization: `Bearer ${tokens.accessToken}`,
        },
      }
    );
    const googleUser: googleUser = await googleUserResponse.json();

    // Replace this with your own DB client.
    const existingUser = await prisma.user.findUnique({
      where: {
        google_id: googleUser.id,
      },
    });

    if (existingUser) {
      const session = await lucia.createSession(existingUser.id, {});
      const sessionCookie = lucia.createSessionCookie(session.id);
      cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
      );
      return new Response(null, {
        status: 302,
        headers: {
          Location: '/',
        },
      });
    }

    const userId = generateId(15);

    // Replace this with your own DB client.
    await prisma.user.create({
      data: {
        id: userId,
        google_id: googleUser.id,
        username: googleUser.login,
      },
    });

    const session = await lucia.createSession(userId, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    );
    return new Response(null, {
      status: 302,
      headers: {
        Location: '/',
      },
    });
  } catch (e) {
    // the specific error message depends on the provider
    if (e instanceof OAuth2RequestError) {
      // invalid code
      return new Response(null, {
        status: 400,
      });
    }
    return new Response(null, {
      status: 500,
    });
  }
}

interface googleUser {
  id: string;
  login: string;
}
