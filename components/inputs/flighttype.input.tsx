import React from "react";
import { FlightType } from "../../models/flighttype.models";

const FlightTypeInput = ({
  trips,
  selectedTrip,
  handleTripTypeSelected,
}: {
  trips: FlightType[];
  selectedTrip: FlightType;
  handleTripTypeSelected: (
    event: React.MouseEvent<HTMLButtonElement>,
    flightType: FlightType
  ) => void;
}) => (
  <>
    {trips.map((trip: FlightType, idx: number) => (
      <button
        key={idx}
        onClick={(e) => handleTripTypeSelected(e, trip)}
        className={`${trip === selectedTrip ? "bg-white" : ""} mb-10`}
      >
        {trip}
      </button>
    ))}
  </>
);

export default FlightTypeInput;
