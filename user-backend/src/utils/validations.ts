/* eslint-disable @typescript-eslint/no-explicit-any */
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
  async signupValidation(params: any): Promise<JoiValidationResult> {
    try {
      const schema: joi.Schema = joi.object().keys({
        name: joi
          .string()
          .required()
          .trim()
          .label('Name')
          .min(Number(process.env.MIN_CHARACTER_NAME))
          .max(Number(process.env.MAX_CHARACTER_NAME))
          .pattern(/^[a-zA-Z\s]*$/)
          .messages({
            'string.empty': '{#label} is required',
            'string.required': '{#label} is required',
            'string.pattern.base': 'Invalid {#label}',
            'string.min': `Minimum ${Number(process.env.MIN_CHARACTER_NAME)} characters allowed`,
            'string.max': `Maximum ${Number(process.env.MAX_CHARACTER_NAME)} characters allowed`,
          })
          .custom((value, helper) => {
            try {
              return value.replace(/\s+/g, ' ');
            } catch (error: any) {
              return helper.message({ custom: 'Failed to process name' });
            }
          }),
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
      logger.error(error, 'Signup Validation Error');
      return {
        error: true,
        value: '',
        message: RES_MSG.SMTHNG_WRNG,
      };
    }
  }

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

  /**
   * @returns {Promise<JoiValidationResult>}
   * @memberof NoteValidation
   */
  async noteCreationValidation(params: any): Promise<JoiValidationResult> {
    try {
      const schema: joi.Schema = joi.object().keys({
        title: joi
          .string()
          .required()
          .trim()
          .min(Number(process.env.MIN_NOTE_LENGTH))
          .max(Number(process.env.MAX_NOTE_LENGTH))
          .label('title')
          .messages({
            'string.empty': '{#label} is required',
            'any.required': '{#label} is required',
            'string.min': 'Title must be at least 5 characters long',
            'string.max': 'Title cannot be more than 100 characters long',
          }),
        description: joi
          .string()
          .required()
          .trim()
          .min(10) // Minimum length for description, adjust as per requirement
          .max(500) // Maximum length for description, adjust as per requirement
          .label('description')
          .messages({
            'string.empty': '{#label} is required',
            'any.required': '{#label} is required',
            'string.min': 'Description must be at least 10 characters long',
            'string.max': 'Description cannot be more than 500 characters long',
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
      logger.error(error, 'Note Creation Validation Error');
      return {
        error: true,
        value: '',
        message: RES_MSG.SMTHNG_WRNG,
      };
    }
  }

  /**
   * @returns {Promise<JoiValidationResult>}
   * @memberof NoteValidation
   */
  async updateNoteValidation(params: any): Promise<JoiValidationResult> {
    try {
      const schema: joi.Schema = joi.object().keys({
        title: joi
          .string()
          .optional()
          .trim()
          .min(Number(process.env.MIN_NOTE_LENGTH))
          .max(Number(process.env.MAX_NOTE_LENGTH))
          .label('title')
          .messages({
            'string.empty': '{#label} cannot be empty',
            'string.min': 'Title must be at least 5 characters long',
            'string.max': 'Title cannot be more than 100 characters long',
          }),
        description: joi
          .string()
          .optional()
          .trim()
          .min(10) // Minimum length for description
          .max(500) // Maximum length for description
          .label('description')
          .messages({
            'string.empty': '{#label} cannot be empty',
            'string.min': 'Description must be at least 10 characters long',
            'string.max': 'Description cannot be more than 500 characters long',
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
      logger.error(error, 'Update Note Validation Error');
      return {
        error: true,
        value: '',
        message: RES_MSG.SMTHNG_WRNG,
      };
    }
  }
}

export default new AuthValidation();
