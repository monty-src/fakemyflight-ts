import type { NextApiRequest, NextApiResponse } from "next";

import FlightSchema from "../../schema/flight.schema";

type Data = {
  name: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const flightSchema = new FlightSchema(req.body);
  // const schema = flightSchema.schema();
  // const { value, error } = schema;
  // console.log("value: ", schema.value);
  // console.log("error: ", scjerror);

  // console.log('response: ', res);
  res.status(200).json({ name: "John Doe" });
}
