import Segment from './segment.d';

export default interface Leg {
  id: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  departureAirportCode: string;
  arrivalAirportCode: string;
  airlineCodes: string[];
  stopoverAirportCodes: string[];
  allianceCodes: string[];
  stopoversCount: number;
  departureTimeMinutes: number;
  arrivalTimeMinutes: number;
  departureDateTime: Date;
  arrivalDateTime: Date;
  stopoverDurationMinutes: number;
  durationMinutes: number;
  overnight: boolean;
  stopoverDuration: string;
  durationDays: number;
  longStopover: boolean;
  segments: Segment[];
  operatingAirlineCodes: string[];
  stopoverCode: string;
  shortStopover: boolean;
  earlyDeparture: boolean;
  lateArrival: boolean;
  newAircraft: boolean;
  oldAircraft: boolean;
  highlyRatedCarrier: boolean;
  score: number;
}