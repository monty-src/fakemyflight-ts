import Joi from "joi";
import moment from "moment";
import BaseSchema from "./base.schema";
import { FlightType, ONE_WAY, ROUND_TRIP } from "../models/flighttype.models";

export interface FlightRequestSchema {
  trip: FlightType;
  selectedLeaveDate: Date;
  selectedReturnDate: Date;
  selectedFromAirport: string;
  selectedToAirport: string;
}

interface FormattedFlightRequest
  extends Omit<
    FlightRequestSchema,
    "selectedLeaveDate" | "selectedReturnDate"
  > {
  selectedLeaveDate: string;
  selectedReturnDate: string | null;
}

interface Moment {
  yesterdayDayDate: () => string;
  formatDateMMDDYYYY: (date: Date) => void;
}

export const DATE_FORMAT: string = "MM-DD-YYYY";
export const API_DATE_FORMAT: string = "YYYY-MM-DD";

class FlightSchema extends BaseSchema implements Moment {
  #trip: FlightType;

  #selectedLeaveDate: Date;
  #selectedReturnDate: Date;
  #selectedFromAirport: string;
  #selectedToAirport: string;

  constructor(body: FlightRequestSchema) {
    super();

    this.#trip = body.trip;
    this.#selectedLeaveDate = body.selectedLeaveDate;
    this.#selectedReturnDate = body.selectedReturnDate;
    this.#selectedFromAirport = body.selectedFromAirport;
    this.#selectedToAirport = body.selectedToAirport;
  }

  public yesterdayDayDate(): string {
    return moment().subtract({ days: 1 }).format(DATE_FORMAT);
  }

  public formatDateMMDDYYYY(date: Date): string {
    return moment(date).format(DATE_FORMAT); // 'MM-DD-YYYY'
  }

  public extractAirtport(airport: string): string {
    return airport.slice(0, 3).toUpperCase();
  }

  public joiReadyObject(): FormattedFlightRequest {
    const selectedLeaveDate = this.formatDateMMDDYYYY(this.#selectedLeaveDate);
    const selectedReturnDate = this.#trip === ONE_WAY ? null : this.formatDateMMDDYYYY(this.#selectedReturnDate);
    const selectedFromAirport = this.extractAirtport(this.#selectedFromAirport);
    const selectedToAirport = this.extractAirtport(this.#selectedToAirport);
    return {
      trip: this.#trip,
      selectedLeaveDate,
      selectedReturnDate,
      selectedFromAirport,
      selectedToAirport
    };
  }

  public schema(): Joi.ValidationResult {
    const yesterdayDate: string = this.yesterdayDayDate();

    const joiObject = Joi.object({
      trip: Joi.string().valid(ONE_WAY, ROUND_TRIP).required(),
      selectedLeaveDate: Joi.date().greater(yesterdayDate).required(),
      selectedReturnDate: [
        Joi.date().greater(Joi.ref("selectedLeaveDate")).required(),
        Joi.allow(null),
      ],
      selectedFromAirport: Joi.string().min(2).max(3).required(),
      selectedToAirport: Joi.string().min(2).max(3).required(),
    });

    return joiObject.validate(this.joiReadyObject());
  }
}

export default FlightSchema;
