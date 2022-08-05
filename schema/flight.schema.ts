import Joi from "joi";
import axios from "axios";
import moment from "moment";
import BaseSchema from "./base.schema";
import { FlightType, ONE_WAY, ROUND_TRIP } from "../models/flighttype.models";
import {Price} from "../types/flight.d"

export interface FlightRequestSchema {
  trip: FlightType;
  selectedLeaveDate: Date;
  selectedReturnDate?: Date;
  selectedFromAirport: string;
  selectedToAirport: string;
}

export interface FormattedFlightRequestSchema
  extends Pick<
    FlightRequestSchema,
    "trip" | "selectedFromAirport" | "selectedToAirport"
  > {
  selectedLeaveDate: string;
  selectedReturnDate: string | null;
}

export interface RequestPayload {
  selectedFromAirport: string;
  selectedToAirport: string;
  selectedLeaveDate: string;
  selectedReturnDate: string;
}

export interface PaymentFee {
  paymentMethodId: number;
  currencyCode: string;
  amount: number;
  amountUsd: number;
}

export interface Fare {
  id: string;
  price: Price;
  providerCode: string;
  handoffUrl: string;
  ecpc: number;
  paymentFees: PaymentFee[]
  remainingSeatsCount: number;
  conditionIds: string[];
  legConditionIds: string[];
  refundable: boolean;
  exchangeable: boolean;
  tags: string[];
  tripId: string;
}

export interface Segment {
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

export interface Airlines {
  code: string;
  name: string;
}

export interface City extends Airlines {
  countryCode: string;
}

export interface Airport extends Airlines {
  cityCode: string;
}

export interface Provider extends Airlines {
  type: string;
  instant: boolean;
  wegoFare: boolean;
  facilitatedBooking: boolean;
}

export interface Country extends Airlines {}

export interface Trip {
  id: string;
  code: string;
  legIds: string[]
}

export interface Leg {
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

interface MomentUtils {
  yesterdayDayDate: () => Date;
  formatDateMMDDYYYY: (date: Date) => void;
}

export const DATE_FORMAT: string = "MM-DD-YYYY";
export const API_DATE_FORMAT: string = "YYYY-MM-DD";

class FlightSchema extends BaseSchema implements MomentUtils {
  #trip: FlightType;

  #selectedLeaveDate: Date;
  #selectedReturnDate?: Date;
  #selectedFromAirport: string;
  #selectedToAirport: string;

  constructor(body: FlightRequestSchema) {
    super();

    this.#trip = body.trip;
    this.#selectedLeaveDate = body.selectedLeaveDate;
    this.#selectedFromAirport = body.selectedFromAirport;
    this.#selectedToAirport = body.selectedToAirport;

    if (this.#trip === ROUND_TRIP) {
      this.#selectedReturnDate = body.selectedReturnDate;
    }
  }

  public airportCode(airport: string): string {
    return airport.slice(0, 3).toUpperCase();
  }

  public yesterdayDayDate(): Date {
    return moment().subtract({ days: 1 }).toDate();
  }

  public formatDateMMDDYYYY(date: Date): string {
    return moment(date).format(DATE_FORMAT); // 'MM-DD-YYYY'
  }

  public formatDateYYYYMMDD(date: Date): string {
    return moment(date).format(API_DATE_FORMAT); // 'MM-DD-YYYY'
  }

  public requestUrl(formatted: FormattedFlightRequestSchema): string {
    const { selectedFromAirport, selectedToAirport } = formatted;
    const formattedLeaveDate = this.formatDateYYYYMMDD(this.#selectedLeaveDate);
    if (this.#trip === ONE_WAY) {
      return `https://api.flightapi.io/onewaytrip/${process.env.API_KEY}/${selectedFromAirport}/${selectedToAirport}/${formattedLeaveDate}/2/0/1/Economy/USD`;
    }
    const formattedReturnDate = this.formatDateYYYYMMDD(
      this.#selectedReturnDate!
    );
    return `https://api.flightapi.io/roundtrip/${process.env.API_KEY}/${selectedFromAirport}/${selectedToAirport}/${formattedLeaveDate}/${formattedReturnDate}/2/0/1/Economy/USD`;
  }

  public async request(
    requestPayload: FormattedFlightRequestSchema
  ): Promise<ResponsePayload> {
    const url = this.requestUrl(requestPayload);
    const { data } = await axios.get<ResponsePayload>(url, {});
    return data;
  }

  public transform(body: FlightRequestSchema): FormattedFlightRequestSchema {
    return {
      trip: body.trip,
      selectedLeaveDate: this.formatDateMMDDYYYY(body.selectedLeaveDate),
      selectedReturnDate: body.selectedReturnDate
        ? this.formatDateMMDDYYYY(body.selectedReturnDate)
        : null,
      selectedFromAirport: this.airportCode(body.selectedFromAirport),
      selectedToAirport: this.airportCode(body.selectedToAirport),
    };
  }

  public schema(yesterdaysDate: Date): Joi.ObjectSchema {
    return Joi.object({
      trip: Joi.string().valid(ONE_WAY, ROUND_TRIP).required(),
      selectedLeaveDate: Joi.date().greater(yesterdaysDate).required(),
      selectedReturnDate: [
        Joi.date().greater(Joi.ref("selectedLeaveDate")).required(),
        Joi.allow(null),
      ],
      selectedFromAirport: Joi.string().required(),
      selectedToAirport: Joi.string().required(),
    });
  }
}

export default FlightSchema;
