import { JoiValidationResult, PromiseResolve } from '../utils/interafce';
import { NextFunction, Request, Response } from 'express';
import logger from '../utils/logger';
import { RES_MSG, RESPONSES } from '../utils/resposne-contants';
import AuthValidation from '../utils/validations';

/**
 * @exports
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise<any>}
 */

export async function validateSignupRequest(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> {
  try {
    const validateRequest: JoiValidationResult =
      await AuthValidation.signupValidation(req.body);

    if (validateRequest.error) {
      throw new Error(validateRequest.message);
    }

    req.body = validateRequest.value;

    next();
  } catch (error: any) {
    logger.error(error, 'validateSignupRequest Error');

    return res.status(RESPONSES.BADREQUEST).send({
      status: RESPONSES.BADREQUEST,
      error: true,
      message: error.message || RES_MSG.BADREQUEST,
    });
  }
}

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

/**
 * @exports
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise<any>}
 */
export async function validateNoteCreationRequest(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> {
  try {
    let validateRequest: JoiValidationResult;

    // Validate the note creation data
    validateRequest = await AuthValidation.noteCreationValidation(req.body);

    if (validateRequest.error) {
      throw new Error(validateRequest.message); // Throw error if validation fails
    }

    req.body = validateRequest.value; // Assign the validated value to req.body
    next(); // Proceed to the next middleware or route handler
  } catch (error: any) {
    logger.error(error, 'validateNoteCreationRequest Error');

    return res.status(RESPONSES.BADREQUEST).send({
      status: RESPONSES.BADREQUEST,
      error: true,
      message: error.message || RES_MSG.BADREQUEST,
    });
  }
}

/**
 * @exports
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise<any>}
 */
export async function validateNoteUpdateRequest(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> {
  try {
    let validateRequest: JoiValidationResult;

    // Validate the note update data
    validateRequest = await AuthValidation.updateNoteValidation(req.body);

    if (validateRequest.error) {
      throw new Error(validateRequest.message); // Throw error if validation fails
    }

    req.body = validateRequest.value; // Assign the validated value to req.body
    next(); // Proceed to the next middleware or route handler
  } catch (error: any) {
    logger.error(error, 'validateNoteUpdateRequest Error');

    return res.status(RESPONSES.BADREQUEST).send({
      status: RESPONSES.BADREQUEST,
      error: true,
      message: error.message || RES_MSG.BADREQUEST,
    });
  }
}
