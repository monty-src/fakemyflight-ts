import Head from "next/head";
import type { NextPage } from "next";
import Section from "../components/Section";
import FindFlightForm from "../components/FindFlightForm";

const Home: NextPage = () => {
  return (
    <>
      <Section>
        <p>testing</p>
      </Section>
      <FindFlightForm />
    </>
  );
};

export default Home;
