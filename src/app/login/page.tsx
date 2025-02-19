"use client";
import { useWixClient } from "@/hooks/useWixClient";
import { LoginState } from "@wix/sdk";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";

enum MODE {
  LOGIN = "LOGIN",
  REGISTER = "REGISTER",
  RESET_PASSWORD = "RESET_PASSWORD",
  EMAIL_VERIFICATION = "EMAIL_VERIFICATION",
}

function LoginPage() {
  const [mode, setMode] = useState(MODE.LOGIN);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [emailCode, setEmailCode] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const pathname = usePathname();
  const router = useRouter();
  const wixClient = useWixClient();

  const formTitle =
    (mode === MODE.LOGIN && "Log in") ||
    (mode === MODE.REGISTER && "Register your Account") ||
    (mode === MODE.RESET_PASSWORD
      ? "Reset your Password"
      : "Verify your Email");

  const buttonTitle =
    (mode === MODE.LOGIN && "Log in") ||
    (mode === MODE.REGISTER && "Register your Account") ||
    (mode === MODE.RESET_PASSWORD ? "Reset" : "Verify");

  const isLoggedIn = wixClient.auth.loggedIn();
  // console.log(isLoggedIn);

  useEffect(
    function () {
      if (isLoggedIn) {
        router.push("/");
      }
    },
    [isLoggedIn]
  );

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    let response;
    try {
      switch (mode) {
        case MODE.LOGIN:
          response = await wixClient.auth.login({
            email,
            password,
          });
          break;
        case MODE.REGISTER:
          response = await wixClient.auth.register({
            email,
            password,
            profile: { nickname: username },
          });

          break;
        case MODE.RESET_PASSWORD:
          response = await wixClient.auth.sendPasswordResetEmail(
            email,
            pathname
          );
          setMessage("Password reset Email sent");
          break;
        case MODE.EMAIL_VERIFICATION:
          response = await wixClient.auth.processVerification({
            verificationCode: emailCode,
          });
          break;
        default:
          break;
      }
      // console.log(response);

      switch (response?.loginState) {
        case LoginState.SUCCESS:
          setMessage("User Logged In. Redirecting...");
          const tokens = await wixClient.auth.getMemberTokensForDirectLogin(
            response.data.sessionToken
          );
          // console.log(tokens);

          // Setting the token in the cookie
          Cookies.set("refreshToken", JSON.stringify(tokens?.refreshToken), {
            expires: 2,
          });

          // setting the token in wixClient
          wixClient.auth.setTokens(tokens);

          break;

        case LoginState.FAILURE:
          if (
            response.errorCode === "invalidEmail" ||
            response.errorCode === "invalidPassword"
          ) {
            setError("Invalid Email or Password");
          } else if (response.errorCode === "emailAlreadyExists") {
            setError("Email already exists");
          } else if (response.errorCode === "resetPassword") {
            setError("You need to reset your password");
          } else {
            setError("Something went wrong");
          }

        case LoginState.EMAIL_VERIFICATION_REQUIRED:
          setMode(MODE.EMAIL_VERIFICATION);
        case LoginState.OWNER_APPROVAL_REQUIRED:
          setMessage("Your Account is pending approval");
        default:
          break;
      }
    } catch (error) {
      console.log(error);
      setError("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="h-[calc(100vh-80px)] px-4 md:px-8 lg:pd-16 xl:32 2xl:px-64 flex items-center justify-center">
      <form action="" className="flex gap-8 flex-col" onSubmit={handleSubmit}>
        <h1 className="font-semibold text-2xl">{formTitle}</h1>
        {mode === MODE.REGISTER && (
          <div className="flex gap-2 flex-col">
            <label htmlFor="" className="text-sm text-gray-700 ">
              Username
            </label>
            <input
              type="text"
              name="username"
              placeholder="Name"
              className="ring-2 ring-gray-300 rounded-md p-4"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
        )}
        {mode !== MODE.EMAIL_VERIFICATION ? (
          <div className="flex gap-2 flex-col">
            <label htmlFor="" className="text-sm text-gray-700 ">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="email@email.com"
              className="ring-2 ring-gray-300 rounded-md p-4"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        ) : (
          <div className="flex gap-2 flex-col">
            <label htmlFor="" className="text-sm text-gray-700 ">
              Verification Code
            </label>
            <input
              type="text"
              name="emailCode"
              placeholder="code"
              className="ring-2 ring-gray-300 rounded-md p-4"
              onChange={(e) => setEmailCode(e.target.value)}
            />
          </div>
        )}

        {(mode === MODE.LOGIN || mode === MODE.REGISTER) && (
          <div className="flex gap-2 flex-col">
            <label htmlFor="" className="text-sm text-gray-700 ">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="password"
              className="ring-2 ring-gray-300 rounded-md p-4"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        )}
        {mode === MODE.LOGIN && (
          <div
            className="text-sm underline cursor-pointer"
            onClick={() => setMode(MODE.RESET_PASSWORD)}
          >
            Forgot Password
          </div>
        )}
        <button className="bg-cartColor text-white rounded-md cursor-pointer disabled:bg-pink-200 p-2 disabled:cursor-not-allowed">
          {isLoading ? " Loading ..." : buttonTitle}
        </button>

        {error && <div className="text-red-600">{error}</div>}
        {mode == MODE.LOGIN && (
          <div
            className="text-sm underline cursor-pointer"
            onClick={() => setMode(MODE.REGISTER)}
          >
            Don't have an account
          </div>
        )}
        {mode == MODE.REGISTER && (
          <div
            className="text-sm underline cursor-pointer"
            onClick={() => setMode(MODE.LOGIN)}
          >
            Log in
          </div>
        )}
        {mode == MODE.RESET_PASSWORD && (
          <div
            className="text-sm underline cursor-pointer"
            onClick={() => setMode(MODE.LOGIN)}
          >
            Log in
          </div>
        )}
        {message && <div className="text-green-600 text-sm">{message}</div>}
      </form>
    </div>
  );
}

export default LoginPage;
