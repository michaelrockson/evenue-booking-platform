import { Section } from "@/components/ui/section";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Input } from "@/components/ui/input.tsx";

export default function LoginForm() {
  return (
    <Section>
      <Card className="flex flex-col gap-6 w-1/2 mx-auto">
        <CardHeader className="flex flex-col gap-4 justify-center items-center">
          <img
            src="/evenue-logo-1.png"
            alt="Evenue-logo"
            className="h-36 w-36"
          />
          <CardTitle>
            <h1>Welcome Back To Evenue</h1>
          </CardTitle>
          <CardDescription>
            <p className="text-caption text-gray-500">
              Please enter your details to login.
            </p>
          </CardDescription>
        </CardHeader>

        <CardContent className="flex flex-col gap-8">
          <div className={"flex flex-col gap-2"}>
            <p className="text-caption">Email</p>
            <Input type="email" placeholder="Email"></Input>
          </div>

          <div className={"flex flex-col gap-2"}>
            <div className="flex justify-between">
              <p className="text-caption">Password</p>
              <CardAction className="text-primary">
                Forgot your password?
              </CardAction>
            </div>
            <Input type="password" placeholder="Password"></Input>
          </div>

          <div className="flex flex-col gap-4">
            <Button className="font-bold">Login</Button>
            <Button variant="outline">
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
        </CardContent>

        <CardFooter className="flex justify-center gap-2">
          <p className="text-caption text-gray-500">Don't have an account?</p>
          <CardAction className="text-primary">Register</CardAction>
        </CardFooter>
      </Card>
    </Section>
  );
}
