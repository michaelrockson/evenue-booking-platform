import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import {useState} from "react";
import useSignUpForm from "@/features/auth/hooks/useSignUpForm.tsx";
import {Spinner} from "@/components/ui/spinner.tsx";
import {Field, FieldDescription, FieldError, FieldGroup, FieldLabel, FieldSet} from "@/components/ui/field.tsx";

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
        isLoading,
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
            <FieldSet className="flex flex-col gap-6 w-1/2 mx-auto">
                <div className="flex flex-col gap-4 justify-center items-center">
                    <img
                        src="/evenue-logo-1.png"
                        alt="Evenue-logo"
                        className="h-40 w-40"
                    />
                        <h1>Sign Up With Evenue</h1>
                        <FieldDescription>
                            Please enter your details to sign up.
                        </FieldDescription>
                </div>

                <FieldGroup className="flex flex-col gap-8">
                    <Field className={"flex flex-col gap-2"}>
                        <FieldLabel>Full Name</FieldLabel>
                        <Input
                            type="text"
                            placeholder="Enter your full name"
                            className="h-12"
                            value={userName}
                            onChange={handleUserNameChange}
                            onBlur={() => setTouched({...isTouched, userName: true})}
                        ></Input>
                        {isTouched.userName && (
                            <FieldError>
                                {validateUserName(userName)}
                            </FieldError>
                        )}
                    </Field>

                    <Field className={"flex flex-col gap-2"}>
                        <FieldLabel>Email</FieldLabel>
                        <Input
                            type="email"
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
                        <FieldLabel>Password</FieldLabel>
                        <Input
                            type="password"
                            placeholder="Enter your password"
                            className="h-12"
                            value={password}
                            onChange={handlePasswordChange}
                            onBlur={() => setTouched({...isTouched, password: true})}
                        ></Input>
                        {isTouched.password && (
                            <FieldError>
                                {checkEmptyPassword(password) || validatePassword(password)}
                            </FieldError>
                        )}
                    </Field>

                    <div className="flex flex-col gap-4">
                        <Button className="h-12" type="submit">
                          {isLoading && <Spinner/>}
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
                </FieldGroup>

                <div className="flex justify-center items-center gap-2">
                    <FieldDescription>Already have an account?</FieldDescription>
                    <FieldLabel className="text-primary">Login</FieldLabel>
                </div>
            </FieldSet>
        </form>
    );
}
