import React, { ReactNode, useState } from "react";
import Section from "./Section";
import FlightTypeInput from "./FlightTypeInput";
import AutoCompleteInput from "./AutoCompleteInput";

type Props = {};

const FindFlightForm = ({}: Props): JSX.Element => {
  const [airport, setAirport] = useState<string>("");

  return (
    <Section tailwindColumnSize={2}>
      <FlightTypeInput />
      <AutoCompleteInput label="From" setAirport={setAirport} />
    </Section>
  );
};

export default FindFlightForm;
