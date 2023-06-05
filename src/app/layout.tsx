import React from "react";

import { NextAuthProvider, ReduxProvider } from "app/providers";
import "styles/globals.scss";

export const metadata = {
  title: "Wasabi",

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
          <ReduxProvider>{children}</ReduxProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
