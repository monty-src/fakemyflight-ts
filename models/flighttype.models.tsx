import React from "react";
import bind from "bind-decorator";

export enum FlightType {
  ONE_WAY = "One-way",
  ROUND_TRIP = "Round Trip",
}

export interface FlightTypeProps {
  active: true | false;
  flightType: FlightType.ONE_WAY | FlightType.ROUND_TRIP;
}

export const { ONE_WAY, ROUND_TRIP } = FlightType;

class FlightTypeModel {
  public trips: FlightType[] = [ONE_WAY, ROUND_TRIP];

  constructor(
    public trip: FlightType = ONE_WAY,
    private setTrip: React.Dispatch<React.SetStateAction<FlightType>>
  ) {}

  @bind
  public handleTripTypeSelected(event: React.MouseEvent<HTMLButtonElement>, trip: FlightType) {
    event.preventDefault();
    this.setTrip(trip);
  }
  
}

export default FlightTypeModel;
