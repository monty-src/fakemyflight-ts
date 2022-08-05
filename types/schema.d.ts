export enum FlightType {
  ONE_WAY = "One-way",
  ROUND_TRIP = "Round Trip",
}

type PossibleDate = Date | null;
type StringOrNull = string | null;

export interface FlightSchema {
  /**
   * defines the valued for trip type.
   *
   * One-way
   * Round trip
   */
  trip: FlightType;

  /**
   * Leave Properties
   *
   * Leaving airport, leaving date;
   */
  leaveDate: Date;
  leaveAirport: string;

  /**
   * Return Properties
   *
   * Return airport, return date. If One-way is
   * trip possible for return date to be null
   */
  returnDate: PossibleDate;
  returnAirport: string;
}

export interface FormattedFlightSchema
  /**
   * Extends FlightSchema
   *
   * trip, leaveAirport, & returnAirport from FlightSchema
   */
  extends Pick<FlightSchema, "trip" | "leaveAirport" | "returnAirport"> {
  /**
   * Leave date formatted to string
   */
  leaveDate: string;
  /**
   * Return date formatted to string or null
   */
  returnDate: StringOrNull;
}
