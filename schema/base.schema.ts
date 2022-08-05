import Joi from "joi";

abstract class BaseSchema {
  constructor() {}
  abstract schema(yesterdaysDate?: Date): Joi.ObjectSchema;
}

export default BaseSchema;
