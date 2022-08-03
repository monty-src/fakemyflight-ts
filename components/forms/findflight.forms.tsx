import React, { useState } from "react";
import Section from "../Section";
import FlightTypeInput from "../inputs/flighttype.input";
import AutoCompleteInput from "../inputs/autocomplete.input";
import DatePickerInput from "../inputs/datepicker.input";
import DatePickerModel from "../../models/datepicker.models";

import FlightTypeInputModel, {
  ONE_WAY,
  FlightType,
} from "../../models/flighttype.models";

import "react-datepicker/dist/react-datepicker.css";

type Props = {};

const { AddTwoWeeks } = DatePickerModel;

const FindFlightForm = ({}: Props): JSX.Element => {
  const today = new Date();
  const twoWeeksLater = AddTwoWeeks(today);

  const [fromAirport, setFromAirport] = useState<string>("");
  const [toAirport, setToAirport] = useState<string>("");
  const [selectedTrip, setTrip] = useState<FlightType>(ONE_WAY);

  const [selectedLeaveDate, setSelectedLeaveDate] = useState<Date>(today);
  const [selectedReturnDate, setSelectedReturnDate] = useState<Date>(
    twoWeeksLater
  );

  const { trips, handleTripTypeSelected }: FlightTypeInputModel =
    new FlightTypeInputModel(selectedTrip, setTrip);

  const { setReturnDate, setLeaveDate }: DatePickerModel = new DatePickerModel(
    selectedLeaveDate,
    setSelectedLeaveDate,
    selectedReturnDate,
    setSelectedReturnDate
  );

  return (
    <Section tailwindColumnSize={2}>
      <form>
        <FlightTypeInput
          trips={trips}
          selectedTrip={selectedTrip}
          handleTripTypeSelected={handleTripTypeSelected}
        />
        <AutoCompleteInput label="From" setAirport={setFromAirport} />
        <AutoCompleteInput label="To" setAirport={setToAirport} />
        <DatePickerInput
          onChange={setLeaveDate}
          selectedDate={selectedLeaveDate}
          label="Leave Date"
        />
        <DatePickerInput
          onChange={setReturnDate}
          selectedDate={selectedReturnDate}
          label="Return Date"
        />
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
