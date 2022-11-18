import joi from 'joi';

const ID_NOT_AVAILABLE = '400/there is no id param';
const NOT_ID_PARAM = '400/id param must be hexadecimal string';
const ID_MIN_LENGTH = '400/id param must have 24 characters length';

export const uuidSchema = joi.string().hex().min(24).required().messages({
  'any.required': ID_NOT_AVAILABLE,
  'string.hex': NOT_ID_PARAM,
  'string.min': ID_MIN_LENGTH,
});
