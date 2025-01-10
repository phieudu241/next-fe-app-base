import React from "react";
import Image from "next/image";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

import { ROUTE } from "constants/route";
import LogoIcon from "statics/images/logo.svg";
import { SESSION_STATUS } from "constants/common";

import styles from "./header.module.scss";

const Header: React.FC = () => {
  const { data: session, status } = useSession();

  if (status === SESSION_STATUS.LOADING) {
    return (
      <div className="spinner" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    );
  }

  return (
    <header className="text-gray-600 body-font">
      <div className="container flex justify-between flex-wrap items-center p-5 mx-auto md:flex-row">
        <Link passHref href="/" className="flex items-center mb-4 font-medium text-gray-900 title-font md:mb-0">
          <Image
            src={LogoIcon}
            alt="Logo"
            width={40}
          />
          <span className="ml-3 text-xl">Admin</span>
        </Link>

        {!session && (
          <div>
            <Link href="/signup">
              Sign Up
            </Link>

            <Link href="/signin" className="ml-3">
              Sign In
            </Link>
          </div>
        )}

        {session && (
          <div
            className="inline-flex items-center px-3 py-1 mt-4 text-base bg-gray-100 border-0 rounded focus:outline-none hover:bg-gray-200 md:mt-0">
            {session.user.image && (
              <span
                style={{
                  backgroundImage: `url(${session.user.image})`,
                }}
                className={styles.avatar}
              />
            )}
            <span className={styles.signedInText}>
              <small>Signed in as</small>
              <br/>
              <strong>
                {session.user.email || session.user.name}
              </strong>
            </span>

            <Link href={ROUTE.SIGN_OUT} className={styles.button}
              onClick={(e) => {
                e.preventDefault();
                signOut();
              }}>
              Sign out
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
