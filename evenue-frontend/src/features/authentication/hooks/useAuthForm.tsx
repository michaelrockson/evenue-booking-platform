import React, { useState } from "react";

export default function useAuthForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleEmailChange(event: React.ChangeEvent<HTMLInputElement>) {
    setEmail(event.target.value);
  }

  function handlePasswordChange(event: React.ChangeEvent<HTMLInputElement>) {
    setPassword(event.target.value);
  }

  function validateEmail(email: string): string | null {
    const emailFormat = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    const emptyEmail = /^$/;

    if (emptyEmail.test(email)) {
      return "Email is required!";
    }
    if (!emailFormat.test(email)) {
      return "Enter a valid email!";
    }
    return null;
  }

  function validatePassword(password: string): string | null {
    const passwordChecks = {
      lowercaseLookahead: {
        regex: /(?=.*[a-z])/,
        message: "At least one lowercase letter is required.",
      },
      uppercaseLookahead: {
        regex: /(?=.*[A-Z])/,
        message: "At least one uppercase letter is required.",
      },
      numberLookahead: {
        regex: /(?=.*\d)/,
        message: "At least one number digit (0–9) is required!",
      },
      specialCharLookahead: {
        regex: /(?=.*[@$!%*?&])/,
        message: "At least one special character (@$!%*?&) is required!",
      },
      characterSetAndLength: {
        regex: /^[A-Za-z\d@$!%*?&]{8,}$/,
        message:
          "Password must be at least 8 characters long and use valid characters.",
      },
    };

    const emptyPasswordHandler = {
      characterStartEnd: {
        regex: /^$/,
        message: "Password is required!",
      },
    };

    for (const { regex, message } of Object.values(emptyPasswordHandler)) {
      if (regex.test(password)) {
        return message;
      }
    }

    for (const { regex, message } of Object.values(passwordChecks)) {
      if (!regex.test(password)) {
        return message;
      }
    }
    return null;
  }

  return {
    email,
    password,
    handleEmailChange,
    handlePasswordChange,
    validateEmail,
    validatePassword,
  };
}
