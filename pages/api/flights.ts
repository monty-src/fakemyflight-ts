import Joi from "joi";
import type { NextApiRequest, NextApiResponse } from "next";

import FlightSchema, {
  FormattedFlightRequestSchema,
} from "../../schema/flight.schema";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const flightSchema: FlightSchema = new FlightSchema(req.body);
  const yesterdaysDate: Date = flightSchema.yesterdayDayDate();
  const schema: Joi.ObjectSchema = flightSchema.schema(yesterdaysDate);
  const { value, error }: Joi.ValidationResult = schema.validate(req.body);

  if (error) return res.status(400).json(error);

  const body: FormattedFlightRequestSchema = flightSchema.transform(value);
  const { legs, trips, fares, airlines, airports } = await flightSchema.request(
    body
  );

  console.log(legs);
  console.log(trips);
  console.log(fares);
  console.log(airlines);
  console.log(airports);

  res.status(200).json({ name: "John Doe" });
}
