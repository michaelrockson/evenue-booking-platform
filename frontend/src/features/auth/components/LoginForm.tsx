import { Button } from "@/components/ui/button.tsx";
import { Input } from "@/components/ui/input.tsx";
import useAuthForm from "@/features/auth/hooks/useAuthForm.tsx";
import { useState } from "react";

export default function LoginForm() {
  const [isTouched, setTouched] = useState({ email: false, password: false });

  const {
    email,
    password,
    handleEmailChange,
    handlePasswordChange,
    validateEmail,
    checkEmptyPassword,
    onLogin,
  } = useAuthForm();

  return (
    <form onSubmit={onLogin}>
      <div className="flex flex-col gap-6 w-1/2 mx-auto">
        <div className="flex flex-col gap-4 justify-center items-center">
          <img
            src="/evenue-logo-1.png"
            alt="Evenue-logo"
            className="h-40 w-40"
          />
          <div>
            <h1>Welcome Back</h1>
          </div>
          <div>
            <p className="text-caption text-gray-500">
              Please enter your details to login.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-8">
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
            <div className="flex justify-between">
              <p className="text-caption">Password</p>
              <span className="text-primary">Forgot your password?</span>
            </div>
            <Input
              type="password"
              placeholder="Enter your password"
              className="h-12"
              value={password}
              onChange={handlePasswordChange}
              onBlur={() => setTouched({ ...isTouched, password: true })}
            ></Input>
            {isTouched.password && (
              <p className="text-red-500 text-caption">
                {checkEmptyPassword(password)}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-4">
            <Button className="font-bold h-12" type="submit">
              Login
            </Button>
            <Button variant="outline" className="h-12" type="submit">
              <div className="flex gap-2">
                <img
                  src="/google-icon.svg"
                  alt="Google Icon"
                  className="h-4 w-4"
                />
                Continue with Google
              </div>
            </Button>
          </div>
        </div>

        <div className="flex justify-center gap-2">
          <p className="text-caption text-gray-500">Don't have an account?</p>
          <span className="text-primary">Register</span>
        </div>
      </div>
    </form>
  );
}
