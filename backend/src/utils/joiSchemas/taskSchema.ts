import joi from 'joi';

const UNFILLED_PROPERTY = '400/{{#label}} property must be filled';
const ID_NOT_HEXA = '400/{{#label}} property must be hexadecimal string';
const ID_MIN_LENGTH = '400/id param must have 24 characters length';
const INVALID_CATEGORY = `
400/{{#label}} property must be in "Estudos, Esportes, Compras, Lazer, Exercícios, Alimentação ou Viagem" values`;
const STRING_BASE = '400/{{#label}} property must be a string';
const DATE_BASE = '400/{{#label}} property must be a date';
const DATE_FORMAT = `400/{{#label}} property must follow ISO 8601 pattern i.e yyyy-MM-ddTHH:mm:ss.ms`;
const BOOLEAN_BASE = '400/{{#label}} property must be a bollean value';

export const userId = joi
  .object({
    userId: joi.string().hex().min(24).required().messages({
      'any.required': UNFILLED_PROPERTY,
      'string.hex': ID_NOT_HEXA,
      'string.min': ID_MIN_LENGTH,
    }),
  })
  .unknown(true);

export const category = joi
  .object({
    category: joi
      .string()
      .valid(
        'Estudos',
        'Esportes',
        'Compras',
        'Lazer',
        'Exercícios',
        'Alimentação',
        'Viagem'
      )
      .required()
      .messages({
        'any.only': INVALID_CATEGORY,
        'any.required': UNFILLED_PROPERTY,
        'string.empty': UNFILLED_PROPERTY,
        'string.base': STRING_BASE,
      }),
  })
  .unknown(true);

export const title = joi
  .object({
    title: joi.string().required().messages({
      'any.required': UNFILLED_PROPERTY,
      'string.empty': UNFILLED_PROPERTY,
      'string.base': STRING_BASE,
    }),
  })
  .unknown(true);

export const description = joi
  .object({
    description: joi.string().required().messages({
      'any.required': UNFILLED_PROPERTY,
      'string.empty': UNFILLED_PROPERTY,
      'string.base': STRING_BASE,
    }),
  })
  .unknown(true);

export const when = joi
  .object({
    when: joi.date().iso().required().messages({
      'date.base': DATE_BASE,
      'date.strict': DATE_BASE,
      'date.format': DATE_FORMAT,
      'any.required': UNFILLED_PROPERTY,
    }),
  })
  .unknown(true);

export const done = joi
  .object({
    done: joi.boolean().required().messages({
      'boolean.base': BOOLEAN_BASE,
    }),
  })
  .unknown(true);
