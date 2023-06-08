"use client";

import { useEffect } from "react";

import { fetchUserInfo } from "services/client/user.service";

export default function Page() {
  useEffect(() => {
    fetchUserInfo();
  }, []);

  return (
    <div>
      <h2>Test Page</h2>
    </div>
  );
}
