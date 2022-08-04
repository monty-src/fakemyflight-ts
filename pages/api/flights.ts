import Joi from 'joi';
import type { NextApiRequest, NextApiResponse } from "next";

import FlightSchema, {FlightRequestSchema} from "../../schema/flight.schema";

type Data = {
  name: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  
  const flightSchema: FlightSchema = new FlightSchema(req.body);

  const { value, error } = flightSchema.schema();
  console.log('schema: ', value);

  // console.log(schema);



  // const schema = flightSchema.schema();
  // const { value, error } = schema;
  // console.log("value: ", schema.value);
  // console.log("error: ", scjerror);

  // console.log('response: ', res);
  res.status(200).json({ name: "John Doe" });
}
