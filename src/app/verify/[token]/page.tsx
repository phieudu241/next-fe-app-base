"use client";

import { useEffect, useState } from "react";

import Error from "components/Common/Error";
import Layout from "components/Common/Layout";
import { verifyToken } from "services/client/auth.service";
import { MESSAGES } from "constants/messages";

export default function VerifyToken({ params }) {
  const [errMsg, setErrMsg] = useState<string>();
  const [verificationResult, setVerificationResult] = useState<string>();

  const token = params.token;

  useEffect(() => {
    if (token) {
      processVerifyToken(token as string);
    }
  }, [token]);

  const processVerifyToken = async (token: string) => {
    setErrMsg("");
    try {
      await verifyToken(token);
      setVerificationResult(MESSAGES.ACCOUNT_VERIFIED);
    } catch (err) {
      const message = err.response?.data?.message || err.message;
      setErrMsg(message);
    }
  };

  return (
    <Layout>
      <section className="relative text-gray-600 body-font">
        <div className="container flex flex-col justify-center px-5 py-24 mx-auto">
          <div className="relative z-10 flex flex-col w-2/3 p-8 mx-auto mt-10 bg-white rounded-lg shadow-md">
            <h2 className="mb-1 text-lg font-medium text-gray-900 title-font">
              Verify account
            </h2>

            {verificationResult && (
              <div>{verificationResult}</div>
            )}

            {/*Error*/}
            <Error message={errMsg}/>
          </div>
        </div>
      </section>
    </Layout>
  );
}
