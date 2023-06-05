"use client";

import { signOut, useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { ROUTE } from "constants/route";
import { SESSION_STATUS } from "constants/common";

export const withAuthentication = (WrappedComponent, allowedRoles?: string[]) => {
  const RequiredAuthentication = (props) => {
    const [shouldRender, setShouldRender] = useState<boolean>(false);
    const { data: session, status } = useSession();
    const router = useRouter();
    const path = usePathname();

    useEffect(() => {
      if (status !== SESSION_STATUS.LOADING) {
        if (!session) {
          router.push(`${ROUTE.SIGN_IN}?redirect=${path}`);
        } else {
          if (allowedRoles) {
            const role = session.user.role;
            if (!allowedRoles.includes(role)) {
              signOut({ callbackUrl: `${ROUTE.SIGN_IN}?redirect=${path}` });
            } else {
              setShouldRender(true);
            }
          } else {
            setShouldRender(true);
          }
        }
      }
    }, [status]);

    return shouldRender ? <WrappedComponent {...props} /> : null;
  };

  return RequiredAuthentication;
};
