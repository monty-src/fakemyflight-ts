import React, { useState } from "react";
import FlightTypeInputModel, {
  ONE_WAY,
  FlightType,
} from "../models/flighttype.models";

const FlightTypeInput = (): JSX.Element => {
  // state properties
  const [selectedTrip, setTrip] = useState<FlightType>(ONE_WAY);

  // model
  const flightTypeInputModel: FlightTypeInputModel = new FlightTypeInputModel(
    selectedTrip,
    setTrip
  );

  // deconstruct model
  const { trips, handleTripTypeSelected } = flightTypeInputModel;

  return (
    <>
      {trips.map(
        (trip: FlightType, idx: number): JSX.Element => (
          <button
            key={idx}
            onClick={() => handleTripTypeSelected(trip)}
            className={`${trip === selectedTrip ? "bg-white" : ""} mb-10`}
          >
            {trip}
          </button>
        )
      )}
    </>
  );
};

export default FlightTypeInput;
