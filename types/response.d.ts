import Leg from './leg';
import Fare from './fare';
import Trip from './trip';
import City from './city';
import Airport from './airport';
import Airlines from './airlines';
import Country from './country';
import Provider from './provider';


export interface FlightResponsePayload {
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

export interface PurchaseResponsePayload {}