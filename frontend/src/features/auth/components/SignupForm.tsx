import { Input } from "@/components/ui/input.tsx";
import { Button } from "@/components/ui/button.tsx";
import { useState } from "react";
import useSignUpForm from "@/features/auth/hooks/useSignUpForm.tsx";

export default function SignupForm() {
  const [isTouched, setTouched] = useState({
    userName: false,
    email: false,
    password: false,
  });

  const {
    userName,
    email,
    password,
    handleUserNameChange,
    handleEmailChange,
    handlePasswordChange,
    validateUserName,
    validateEmail,
    validatePassword,
    checkEmptyPassword,
    onSignUp,
  } = useSignUpForm();

  return (
    <form onSubmit={onSignUp}>
      <div className="flex flex-col gap-6 w-1/2 mx-auto">
        <div className="flex flex-col gap-4 justify-center items-center">
          <img
            src="/evenue-logo-1.png"
            alt="Evenue-logo"
            className="h-40 w-40"
          />
          <div>
            <h1>Sign Up With Evenue</h1>
          </div>
          <div>
            <p className="text-caption text-gray-500">
              Please enter your details to sign up.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-8">
          <div className={"flex flex-col gap-2"}>
            <p className="text-caption">Full Name</p>
            <Input
              type="text"
              placeholder="Enter your full name"
              className="h-12"
              value={userName}
              onChange={handleUserNameChange}
              onBlur={() => setTouched({ ...isTouched, userName: true })}
            ></Input>
            {isTouched.userName && (
              <p className="text-red-500 text-caption">
                {validateUserName(userName)}
              </p>
            )}
          </div>

          <div className={"flex flex-col gap-2"}>
            <p className="text-caption">Email</p>
            <Input
              type="email"
              placeholder="example@gmail.com"
              className="h-12"
              value={email}
              onChange={handleEmailChange}
              onBlur={() => setTouched({ ...isTouched, email: true })}
            ></Input>
            {isTouched.email && (
              <p className="text-red-500 text-caption">
                {validateEmail(email)}
              </p>
            )}
          </div>

          <div className={"flex flex-col gap-2"}>
            <p className="text-caption">Password</p>
            <Input
              type="password"
              placeholder="Enter your password"
              className="h-12"
              onChange={handlePasswordChange}
              onBlur={() => setTouched({ ...isTouched, password: true })}
            ></Input>
            {isTouched.password && (
              <p className="text-red-500 text-caption">
                {checkEmptyPassword(password) || validatePassword(password)}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-4">
            <Button className="h-12" type="submit">
              Sign Up
            </Button>
            <Button variant="outline" className="h-12">
              <div className="flex gap-2">
                <img
                  src="/google-icon.svg"
                  alt="Google Icon"
                  className="h-4 w-4"
                />
                Sign in with Google
              </div>
            </Button>
          </div>
        </div>

        <div className="flex justify-center gap-2">
          <p className="text-caption text-gray-500">Already have an account?</p>
          <span className="text-primary">Login</span>
        </div>
      </div>
    </form>
  );
}
