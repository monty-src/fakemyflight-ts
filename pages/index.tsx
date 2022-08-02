import type { NextPage } from "next";
import Section from "../components/Section";
import FindFlightForm from "../components/forms/findflight.forms";

const Home: NextPage = () => {
  return (
    <>
      <FindFlightForm />
    </>
  );
};

export default Home;
