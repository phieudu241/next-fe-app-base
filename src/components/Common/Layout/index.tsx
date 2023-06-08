import React from "react";

import Header from "components/Common/Header";

const Layout: React.FC<React.PropsWithChildren<unknown>> = ({ children }) => (
  <div>
    <Header/>
    {children}
  </div>
);

export default Layout;
