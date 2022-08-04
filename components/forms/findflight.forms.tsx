import React, { useState } from "react";
import Section from "../Section";
import FlightTypeInput from "../inputs/flighttype.input";
import DatePickerInput from "../inputs/datepicker.input";
import AutoCompleteInput from "../inputs/autocomplete.input";
import DatePickerModel from "../../models/datepicker.models";
import FindFlightFormModel from "../../models/findflight.models";

import FlightTypeModel, {
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
  const [selectedReturnDate, setSelectedReturnDate] =
    useState<Date>(twoWeeksLater);

  const flightTypeModel: FlightTypeModel = new FlightTypeModel(
    selectedTrip,
    setTrip
  );

  const datePickerModel: DatePickerModel = new DatePickerModel(
    selectedLeaveDate,
    setSelectedLeaveDate,
    selectedReturnDate,
    setSelectedReturnDate
  );

  const { submit } = new FindFlightFormModel(
    datePickerModel,
    flightTypeModel,

    fromAirport,
    toAirport
  );

  return (
    <Section tailwindColumnSize={2}>
      <form onSubmit={submit}>
        <FlightTypeInput
          selectedTrip={selectedTrip}
          trips={flightTypeModel.trips}
          handleTripTypeSelected={flightTypeModel.handleTripTypeSelected}
        />
        <AutoCompleteInput label="From" setAirport={setFromAirport} />
        <AutoCompleteInput label="To" setAirport={setToAirport} />
        <DatePickerInput
          label="Leave Date"
          selectedDate={selectedLeaveDate}
          onChange={datePickerModel.setLeaveDate}
        />
        <DatePickerInput
          label="Return Date"
          selectedDate={selectedReturnDate}
          onChange={datePickerModel.setReturnDate}
        />
        <button type="submit">
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
