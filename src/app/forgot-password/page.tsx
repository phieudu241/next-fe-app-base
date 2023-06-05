"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "antd";
import { useState } from "react";
import { useForm } from "react-hook-form";

import Error from "components/Common/Error";
import Layout from "components/Common/Layout";
import { forgotPasswordSchema } from "libs/validation/schemas";
import { forgotPassword } from "services/client/user.service";

type FormData = {
  email: string;
};

export default function Page() {
  const [errMsg, setErrMsg] = useState<string>();
  const [success, setSuccess] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(forgotPasswordSchema),
  });

  const onSubmit = async (values) => {
    setErrMsg("");
    setSuccess(false);
    try {
      await forgotPassword(values);
      setSuccess(true);
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
              Forgot password
            </h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              {/*Email*/}
              <div className="relative mb-4">
                <label
                  htmlFor="email"
                  className="text-sm leading-7 text-gray-600"
                >
                  Email
                  <input
                    {...register("email")}
                    className="w-full px-3 py-1 text-base leading-8 text-gray-700 transition-colors duration-200 ease-in-out bg-white border border-gray-300
               rounded outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                  />
                </label>
                {errors.email && <Error message={errors.email.message}/>}
              </div>
              {/*Submit*/}
              <Button
                htmlType="submit"
                type="primary"
                className="text-lg text-white bg-indigo-500 border-0 rounded focus:outline-none hover:bg-indigo-600"
              >
                Reset password
              </Button>
            </form>
            {/*Error*/}
            <Error message={errMsg}/>
            {/*Success*/}
            {success && (
              <div>
                An email was sent to your mail box. Please check the email
              </div>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
}
