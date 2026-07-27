import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button.tsx";
import { Input } from "@/components/ui/input.tsx";

export default function LoginForm() {
  return (
    <Section>
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
            ></Input>
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
            ></Input>
          </div>

          <div className="flex flex-col gap-4">
            <Button className="font-bold h-12">Login</Button>
            <Button variant="outline" className="h-12">
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
    </Section>
  );
}
