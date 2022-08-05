export default interface Segment {
  durationMinutes: number;
  stopoverDurationMinutes: number;
  departureAirportCode: string;
  arrivalAirportCode: string;
  airlineCode: string;
  cabin: string;
  designatorCode: string;
  departureDateTime: string;
  arrivalDateTime: string;
}