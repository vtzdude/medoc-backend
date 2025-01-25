import * as joi from 'joi';
import { JoiValidationResult } from './interafce';
import * as joiOptions from './joi-error.filter';
import logger from './logger';
import dotenv from 'dotenv';
import { RES_MSG } from './resposne-contants';
dotenv.config();
/**
 * @export
 * @class AuthValidation
 */

class AuthValidation {
  /**
   * @returns {Promise<JoiValidationResult>}
   * @memberof AuthValidation
   */
  async loginValidation(params: any): Promise<JoiValidationResult> {
    try {
      const schema: joi.Schema = joi.object().keys({
        email: joi
          .string()
          .required()
          .trim()
          .min(Number(process.env.MIN_CHARACTER_NAME) + 5)
          .max(Number(process.env.MAX_CHARACTER_NAME) + 250)
          .email({ minDomainSegments: 2, tlds: { allow: ['com', 'in'] } })
          .label('Email Address')
          .lowercase()
          .messages({
            'string.empty': '{#label} is required',
            'any.required': '{#label} is required',
            'string.min': `Minimum ${Number(process.env.MIN_CHARACTER_NAME) + 5} characters allowed`,
            'string.max': `Maximum ${Number(process.env.MAX_CHARACTER_NAME) + 250} characters allowed`,
          }),
        password: joi
          .string()
          .required()
          .trim()
          .min(Number(process.env.MIN_PASS_LENGTH))
          .max(Number(process.env.MAX_PASS_LENGTH))
          .label('Password')
          .messages({
            //TODO: to be changed to config.maxPasswordLEngth
            'string.empty': '{#label} is required',
          }),
      });

      const { error, value } = await schema.validate(
        params,
        joiOptions.options
      );
      if (error) {
        return {
          error: true,
          value: '',
          message: error.details[0].message,
        };
      }
      return {
        error: false,
        value: value,
      };
    } catch (error: any) {
      logger.error(error, 'Login Validation Error');
      return {
        error: true,
        value: '',
        message: RES_MSG.SMTHNG_WRNG,
      };
    }
  }
}
export default new AuthValidation();
