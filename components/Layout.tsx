import Head from "next/head";
import React, { ReactNode } from "react";
import Header from "./Header";

type Props = {
  children: ReactNode;
  title?: string;
};

const Layout = ({ children, title = "FakeMyFlight" }: Props) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Header />
      <main>{children}</main>
    </>
  );
};

export default Layout;
