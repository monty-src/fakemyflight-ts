import React, { useState } from "react";
import FlightTypeInputModel, {
  ONE_WAY,
  FlightType,
} from "../../models/flighttype.models";

const FlightTypeInput = () => {
  const [selectedTrip, setTrip] = useState<FlightType>(ONE_WAY);

  const flightTypeInputModel: FlightTypeInputModel = new FlightTypeInputModel(
    selectedTrip,
    setTrip
  );

  const { trips, handleTripTypeSelected } = flightTypeInputModel;

  return (
    <>
      {trips.map(
        (trip: FlightType, idx: number) => (
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
