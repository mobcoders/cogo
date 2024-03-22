'use client';
import { createUser, credAuth, googleAuth } from '@/lib/action';
import { ExclamationCircleIcon } from '@heroicons/react/24/solid';
import {
  Tabs,
  Tab,
  Input,
  Link,
  Button,
  Card,
  CardBody,
} from '@nextui-org/react';
import { Dispatch, SetStateAction, useRef, useState } from 'react';
import { useFormState } from 'react-dom';
import { toast } from 'react-toastify';

function CredentialLoginForm({
  setSelected,
}: {
  setSelected: Dispatch<SetStateAction<string>>;
}) {
  const [errorMessage, dispatch] = useFormState(credAuth, undefined);
  return (
    <form action={dispatch} className="flex flex-col gap-4">
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
      {errorMessage && (
        <div className="flex">
          <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
          <p className="text-sm text-red-500">{errorMessage}</p>
        </div>
      )}
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
  );
}

function CredentialRegisterForm({
  setSelected,
}: {
  setSelected: Dispatch<SetStateAction<string>>;
}) {
  const [errorMessage, dispatch] = useFormState(credAuth, undefined);

  function handleRegister(formData: FormData) {
    createUser(formData);
    credAuth(formData);
  }
  return (
    <form action={handleRegister} className="flex flex-col gap-4 h-[300px]">
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
  );
}

function GoogleForm({ children }: { children?: React.ReactNode }) {
  return (
    <form className="my-5" action={googleAuth}>
      <Button type="submit" fullWidth color="primary">
        {children}
      </Button>
    </form>
  );
}

export default function LoginForm() {
  const [selected, setSelected] = useState('login');

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
              <CredentialLoginForm setSelected={setSelected} />
              <GoogleForm>Sign in with Google</GoogleForm>
            </Tab>
            <Tab key="sign-up" title="Sign up">
              <CredentialRegisterForm setSelected={setSelected} />
              <GoogleForm>Sign up with Google</GoogleForm>
            </Tab>
          </Tabs>
        </CardBody>
      </Card>
    </div>
  );
}
