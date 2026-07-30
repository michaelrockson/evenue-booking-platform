import React, { useState } from "react";
import useAuthForm from "./useAuthForm";

export default function useSignUpForm() {
  const [userName, setUserName] = useState("");
  const {
    email,
    password,
    handleEmailChange,
    handlePasswordChange,
    validateEmail,
    validatePassword,
    checkEmptyPassword,
  } = useAuthForm();

  function handleUserNameChange(event: React.ChangeEvent<HTMLInputElement>) {
    setUserName(event.target.value);
  }

  function validateUserName(userName: string) {
    if (!userName) {
      return "Username is required!";
    }
    return null;
  }

  async function onSignUp(): Promise<void> {
    //   SignUp Implementation
  }

  return {
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
  };
}
