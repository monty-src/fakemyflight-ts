import React, { useState, useEffect } from "react";
import Section from "../Section";
import FlightTypeInput from "../inputs/flighttype.input";
import AutoCompleteInput from "../inputs/autocomplete.input";
import DatePickerInput from "../inputs/datepicker.input";
import DatePickerModel from "../../models/datepicker.models";

import "react-datepicker/dist/react-datepicker.css";

type Props = {};

const FindFlightForm = ({}: Props): JSX.Element => {
  const [fromAirport, setFromAirport] = useState<string>("");
  const [toAirport, setToAirport] = useState<string>("");

  const [toDate, setToDate] = useState<Date | null>(null);
  const [fromDate, setFromDate] = useState(new Date());

  const datePickerModel = new DatePickerModel(
    toDate,
    setToDate,
    fromDate,
    setFromDate
  );
  
  useEffect(datePickerModel.addTwoWeeks, []);

  return (
    <Section tailwindColumnSize={2}>
      <form>
        <FlightTypeInput />
        <AutoCompleteInput label="From" setAirport={setFromAirport} />
        <AutoCompleteInput label="To" setAirport={setToAirport} />
        <DatePickerInput selectedDate={fromDate} label="Leave Date" />
        <DatePickerInput selectedDate={toDate} label="Return Date" />
        <button>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            />
          </svg>
        </button>
      </form>
    </Section>
  );
};

export default FindFlightForm;
