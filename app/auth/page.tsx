'use client';
import { signIn } from '@/auth';
import { createUser, credAuth, googleAuth } from '@/lib/action';
import {
  Tabs,
  Tab,
  Input,
  Link,
  Button,
  Card,
  CardBody,
} from '@nextui-org/react';
import { useSearchParams } from 'next/navigation';
import { useRef, useState } from 'react';

export default function LoginForm() {
  const [selected, setSelected] = useState('login');
  const formRef = useRef<HTMLFormElement>(null);

  function handleRegister(formData: FormData) {
    createUser(formData);
    credAuth(formData);
  }

  return (
    <div className="flex flex-col w-full">
      <Card className="max-w-full w-[340px] max-h-full">
        <CardBody>
          <Tabs
            fullWidth
            size="md"
            aria-label="Tabs form"
            selectedKey={selected}
            onSelectionChange={(key) => setSelected(String(key))}
          >
            <Tab key="login" title="Login">
              <form action={credAuth} className="flex flex-col gap-4">
                <Input
                  isRequired
                  label="Email"
                  name="email"
                  placeholder="Enter your email"
                  type="email"
                />
                <Input
                  isRequired
                  label="Password"
                  name="password"
                  placeholder="Enter your password"
                  type="password"
                />
                <p className="text-center text-small">
                  Need to create an account?{' '}
                  <Link size="sm" onPress={() => setSelected('sign-up')}>
                    Sign up
                  </Link>
                </p>
                <div className="flex gap-2 justify-end">
                  <Button type="submit" fullWidth color="primary">
                    Login
                  </Button>
                </div>
              </form>
              <form className="my-5" action={googleAuth}>
                <Button type="submit" fullWidth color="primary">
                  Login with Google
                </Button>
              </form>
            </Tab>
            <Tab key="sign-up" title="Sign up">
              <form
                action={handleRegister}
                className="flex flex-col gap-4 h-[300px]"
              >
                <Input
                  isRequired
                  label="Name"
                  name="name"
                  placeholder="Enter your name"
                  type="text"
                />
                <Input
                  isRequired
                  label="Email"
                  name="email"
                  placeholder="Enter your email"
                  type="email"
                />
                <Input
                  isRequired
                  label="Password"
                  name="password"
                  placeholder="Enter your password"
                  type="password"
                />
                <p className="text-center text-small">
                  Already have an account?{' '}
                  <Link size="sm" onPress={() => setSelected('login')}>
                    Login
                  </Link>
                </p>
                <div className="flex gap-2 justify-end">
                  <Button type="submit" fullWidth color="primary">
                    Sign up
                  </Button>
                </div>
              </form>
              <form className="my-5" action={googleAuth}>
                <Button type="submit" fullWidth color="primary">
                  Sign up with Google
                </Button>
              </form>
            </Tab>
          </Tabs>
        </CardBody>
      </Card>
    </div>
  );
}
