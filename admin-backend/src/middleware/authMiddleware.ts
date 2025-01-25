import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import User from '../models/auditModel';
import logger from '../utils/logger'; // Assuming you have a logger utility
import { JoiValidationResult } from '../utils/interafce';
import AuthValidation from '../utils/validations';
import { RES_MSG, RESPONSES } from '../utils/resposne-contants';

/**
 * @exports
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise<any>}
 */
export async function validateLoginRequest(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> {
  try {
    let validateRequest: JoiValidationResult;

    validateRequest = await AuthValidation.loginValidation(req.body);
    if (validateRequest.error) {
      throw new Error(validateRequest.message);
    }

    req.body = validateRequest.value;
    next();
  } catch (error: any) {
    logger.error(error, 'validateLoginRequest Error');

    return res.status(RESPONSES.BADREQUEST).send({
      status: RESPONSES.BADREQUEST,
      error: true,
      message: error.message || RES_MSG.BADREQUEST,
    });
  }
}
