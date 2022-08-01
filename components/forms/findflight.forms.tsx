import React, { useState } from "react";
import Section from "../Section";
import FlightTypeInput from "../inputs/flighttype.input";
import AutoCompleteInput from "../inputs/autocomplete.input";

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
