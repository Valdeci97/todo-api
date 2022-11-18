import joi from 'joi';

function greaterThanMessageGenerator(label: string, length: string): string {
  return `400/${label} must be greater than or equal ${length} characters length`;
}

const UNFILLED_PROPERTY = '400/{{#label}} property must be filled';
const MIN_NAME_LENGTH = greaterThanMessageGenerator('name', '3');
const STRING_BASE = '400/{{#label}} property must be a string';
const INVALID_EMAIL =
  '400/{{#label}} must be a valid e-mail. i.e user@gmail.com';
const MIN_PASSWORD_LENGTH = greaterThanMessageGenerator('password', '8');

export const username = joi
  .object({
    name: joi.string().min(3).required().messages({
      'any.required': UNFILLED_PROPERTY,
      'string.empty': UNFILLED_PROPERTY,
      'string.min': MIN_NAME_LENGTH,
      'string.base': STRING_BASE,
    }),
  })
  .unknown(true);

export const email = joi
  .object({
    email: joi.string().email().required().messages({
      'any.required': UNFILLED_PROPERTY,
      'string.email': INVALID_EMAIL,
      'string.base': STRING_BASE,
    }),
  })
  .unknown(true);

export const password = joi
  .object({
    password: joi.string().min(8).required().messages({
      'any.required': UNFILLED_PROPERTY,
      'string.empty': UNFILLED_PROPERTY,
      'string.min': MIN_PASSWORD_LENGTH,
      'string.base': STRING_BASE,
    }),
  })
  .unknown(true);
