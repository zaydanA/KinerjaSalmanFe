import React, { FormEvent } from "react";

import { apiBase } from "@/api";
import { IApiBaseError } from "@/types/http";
import { useInput } from "@/hooks/useInput";
import { useAuth } from "@/contexts";
import BaseInputText from "@/components/shares/inputs/BaseInputText";

function Login() {
  const [email, setEmail] = useInput("");
  const [password, setPassword] = useInput("");

  const apiBaseError = apiBase().error<IApiBaseError>();
  const { login } = useAuth();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const res = await login(email, password);

      if (res.status === "success") {
        // toaster
        // dispatch(
        //   addNotification({
        //     message: res.message,
        //     type: "success",
        //   })
        // );
      }
    } catch (error) {
      apiBaseError.set(error);

      // toaster
      // dispatch(
      //   addNotification({
      //     message: apiBaseError.getMessage(),
      //     type: "danger",
      //   })
      // );
    }
  };
  return (
    <>
      <h1>Login</h1>
      <form
        className="flex flex-col gap-5 w-96 max-md:w-full my-0 mx-auto pb-0"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col gap-4">
          <BaseInputText
            id="email"
            label="Email"
            placeholder="Email"
            value={email}
            setValue={setEmail}
            error={apiBaseError.getErrors("email")?.[0]?.toString()}
          />
          <BaseInputText
            id="password"
            label="Password"
            placeholder="Password"
            type="password"
            value={password}
            setValue={setPassword}
            error={apiBaseError.getErrors("password")?.[0]?.toString()}
          />
          <div className="mt-6">
            <button className="w-full text-clr-text-black bg-clr-text-info py-4 px-8 rounded-full text-base font-bold">
              Log in
            </button>
          </div>
        </div>
      </form>
    </>
  );
}

export default Login;
