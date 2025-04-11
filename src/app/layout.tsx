import React from "react";
import { AntdRegistry } from "@ant-design/nextjs-registry";

import { NextAuthProvider, ReduxProvider } from "app/providers";
import "styles/globals.scss";

export const metadata = {
  title: "My Website",

  icons: {
    icon: "/favicon.ico"
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <body>
        <NextAuthProvider>
          <ReduxProvider>
            <AntdRegistry>
              {children}
            </AntdRegistry>
          </ReduxProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
