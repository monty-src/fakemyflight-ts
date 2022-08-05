



export interface ResponsePayload {
  legs: Leg[];
  fares: Fare[];
  trips: Trip[];
  cities: City[];
  airports: Airport[];
  airlines: Airlines[];
  countries: Country[];
  providers: Provider[];
  count: number;
}
