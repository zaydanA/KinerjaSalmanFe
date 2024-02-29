import { IApiBaseResponseError } from "@/types/http";
import { AxiosError } from "axios";
import { useRef, useState } from "react";

const useError = <TError = unknown>() => {
  const [errors, setErrors] = useState<TError | undefined>(undefined);
  const message = useRef<string | undefined>(undefined);

  const getErrors = (key?: keyof TError) => {
    if (errors instanceof Array && !key) {
      return errors;
    }
    if (errors && key && errors[key] instanceof Array) {
      return errors[key];
    }
  }

  const getMessage = () => {
    return message.current;
  }

  const set = (error: unknown) => {
    const err = error as AxiosError<IApiBaseResponseError<TError>>

    setErrors(err.response?.data.errors);

    message.current = err.response?.data.message;
  }

  const clear = () => {
    setErrors(undefined);
    // setMessage(undefined);

    message.current = undefined;
  }

  return { set, getErrors, getMessage, clear };
}

export default useError;