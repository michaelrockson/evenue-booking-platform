import {Button} from "@/components/ui/button.tsx";
import {Input} from "@/components/ui/input.tsx";
import useAuthForm from "@/features/auth/hooks/useAuthForm.tsx";
import {useState} from "react";
import {Spinner} from "@/components/ui/spinner.tsx";
import {Field, FieldDescription, FieldError, FieldGroup, FieldLabel, FieldSet} from "@/components/ui/field.tsx";

export default function LoginForm() {
    const [isTouched, setTouched] = useState({email: false, password: false});

    const {
        email,
        password,
        isLoading,
        handleEmailChange,
        handlePasswordChange,
        validateEmail,
        checkEmptyPassword,
        onLogin,
    } = useAuthForm();

    return (
        <form onSubmit={onLogin}>
            <FieldSet className="flex flex-col gap-6 w-1/2 mx-auto">

                <div className="flex flex-col gap-4 justify-center items-center">
                    <img
                        src="/evenue-logo-1.png"
                        alt="Evenue-logo"
                        className="h-40 w-40"
                    />
                    <h1>Welcome Back</h1>
                    <FieldDescription>
                        Please enter your details to login.
                    </FieldDescription>
                </div>

                <FieldGroup className="flex flex-col gap-8">
                    <Field className={"flex flex-col gap-2"}>
                        <FieldLabel>Email</FieldLabel>
                        <Input
                            type="email"
                            id="email"
                            placeholder="example@gmail.com"
                            className="h-12"
                            value={email}
                            onChange={handleEmailChange}
                            onBlur={() => setTouched({...isTouched, email: true})}
                        ></Input>
                        {isTouched.email && (
                            <FieldError>
                                {validateEmail(email)}
                            </FieldError>
                        )}
                    </Field>

                    <Field className={"flex flex-col gap-2"}>
                        <div className="flex justify-between">
                            <FieldLabel>Password</FieldLabel>
                            <FieldLabel className="text-primary">Forgot your password?</FieldLabel>
                        </div>
                        <Input
                            type="password"
                            id="password"
                            placeholder="Enter your password"
                            className="h-12"
                            value={password}
                            onChange={handlePasswordChange}
                            onBlur={() => setTouched({...isTouched, password: true})}
                        ></Input>
                        {isTouched.password && (
                            <FieldError>
                                {checkEmptyPassword(password)}
                            </FieldError>
                        )}
                    </Field>

                    <div className="flex flex-col gap-4">
                        <Button className="font-bold h-12 flex gap-1" type="submit">
                            {isLoading && <Spinner/>}
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
                </FieldGroup>

                <div className="flex justify-center items-center gap-2">
                    <FieldDescription>Don't have an
                        account?</FieldDescription>
                    <FieldLabel className="text-primary">Register</FieldLabel>
                </div>
            </FieldSet>
        </form>
    );
}
