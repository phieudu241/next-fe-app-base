"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "antd";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

import Error from "components/Common/Error";
import Layout from "components/Common/Layout";
import { ROUTE } from "constants/route";
import { resetPasswordSchema } from "libs/validation/schemas";
import {
  resetPassword,
} from "services/client/user.service";

type FormData = {
  password: string;
  confirmedPassword: string;
};

export default function ResetPassword({ params }) {
  const [errMsg, setErrMsg] = useState<string>();
  const router = useRouter();
  const token = params.token;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(resetPasswordSchema),
  });

  const onSubmit = async (values) => {
    setErrMsg("");
    try {
      await resetPassword({ token, ...values });
      router.push(ROUTE.SIGN_IN);
    } catch (err) {
      const message = err.response?.data?.error || err.message;
      setErrMsg(message);
    }
  };

  return (
    <Layout>
      <section className="relative text-gray-600 body-font">
        <div className="container flex flex-col justify-center px-5 py-24 mx-auto">
          <div className="relative z-10 flex flex-col w-1/3 p-8 mx-auto mt-10 bg-white rounded-lg shadow-md">
            <h2 className="mb-1 text-lg font-medium text-gray-900 title-font">
              Reset your password
            </h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              {/*Password*/}
              <div className="relative mb-4">
                <label
                  htmlFor="password"
                  className="text-sm leading-7 text-gray-600"
                >
                  Password
                  <input
                    id="password"
                    {...register("password")}
                    type="password"
                    className="w-full px-3 py-1 text-base leading-8 text-gray-700 transition-colors duration-200 ease-in-out bg-white border border-gray-300
                     rounded outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                  />
                </label>
                {errors.password && <Error message={errors.password.message} />}
              </div>
              {/*Confirm password*/}
              <div className="relative mb-4">
                <label
                  htmlFor="message"
                  className="text-sm leading-7 text-gray-600"
                >
                  Confirm password
                  <input
                    id="confirmedPassword"
                    type="password"
                    {...register("confirmedPassword")}
                    className="w-full px-3 py-1 text-base leading-8 text-gray-700 transition-colors duration-200 ease-in-out bg-white border border-gray-300
                     rounded outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                  />
                </label>
                {errors.confirmedPassword && (
                  <Error message={errors.confirmedPassword.message} />
                )}
              </div>

              {/*Submit*/}
              <Button
                htmlType="submit"
                type="primary"
                className="bg-indigo-500 border-0 rounded focus:outline-none hover:bg-indigo-600"
              >
                Change password
              </Button>
            </form>
            {/*Error*/}
            <Error message={errMsg} />
          </div>
        </div>
      </section>
    </Layout>
  );
}
