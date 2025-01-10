"use client";

import { useSession } from "next-auth/react";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

import AdminLayout from "components/Common/Layout/AdminLayout";
import { withAuthentication } from "libs/hoc/withAuthentication";
import { ROUTE } from "constants/route";
import { ROLE } from "constants/common";

function Admin() {
  const { data: session } = useSession();
  const user = session?.user;
  const router = useRouter();

  useEffect(() => {
    if (user && router) {
      router.push(ROUTE.ADMIN_INDEX);
    }
  }, [router, user]);

  return <AdminLayout>
    <div className="text-center">
      Content
    </div>
  </AdminLayout>;
}

export default withAuthentication(Admin, [ROLE.ADMIN, ROLE.USER]);
