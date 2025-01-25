import jwt from 'jsonwebtoken';
import { NextFunction, Response } from 'express';
import { RES_MSG, RESPONSES } from '../utils/resposne-contants';
import logger from '../utils/logger';

/**
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise<any>}
 * @memberof AuthMiddleware
 */
export const jwtMiddleware = async (
  req: any,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
      const decoded: any = jwt.verify(
        token,
        process.env.JWT_SECRET || 'defaultsecret'
      );

      req.user = { id: decoded.id, role: decoded.role };
      next();
    }

    if (!token) {
      return res.status(RESPONSES.UN_AUTHORIZED).send({
        status: RESPONSES.UN_AUTHORIZED,
        error: true,
        message: RES_MSG.MISSING_JWT_TOKEN,
      });
    }
  } catch (error: any) {
    logger.error(error, 'JWT Middleware Error');
    return res.status(RESPONSES.BADREQUEST).send({
      status: error.status || RESPONSES.BADREQUEST,
      error: true,
      message: error.message || RES_MSG.SMTHNG_WRNG,
    });
  }
};

export const adminJwtMiddleware = async (
  req: any,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
      const decoded: any = jwt.verify(
        token,
        process.env.JWT_SECRET || 'defaultsecret'
      );
      const apiKey: string = req.header('x-api-key') || null;
      if (decoded.role != 'admin' || apiKey !== process.env.API_KEY) {
        return res.status(RESPONSES.FORBIDDEN).send({
          status: RESPONSES.FORBIDDEN,
          error: true,
          message: RES_MSG.UNAUTHORISED_ACCESS,
        });
      }
      req.user = { id: decoded.id, role: decoded.role };
      next();
    }

    if (!token) {
      return res.status(RESPONSES.UN_AUTHORIZED).send({
        status: RESPONSES.UN_AUTHORIZED,
        error: true,
        message: RES_MSG.MISSING_JWT_TOKEN,
      });
    }
  } catch (error: any) {
    logger.error(error, 'JWT Middleware Error');
    return res.status(RESPONSES.BADREQUEST).send({
      status: error.status || RESPONSES.BADREQUEST,
      error: true,
      message: error.message || RES_MSG.SMTHNG_WRNG,
    });
  }
};

export const adminLoginMiddleware = async (
  req: any,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const apiKey: string = req.header('x-api-key') || null;

    if (apiKey !== process.env.API_KEY) {
      return res.status(RESPONSES.FORBIDDEN).send({
        status: RESPONSES.FORBIDDEN,
        error: true,
        message: RES_MSG.UNAUTHORISED_ACCESS,
      });
    }

    next();
  } catch (error: any) {
    logger.error(error, 'JWT Middleware Error');
    return res.status(RESPONSES.BADREQUEST).send({
      status: error.status || RESPONSES.BADREQUEST,
      error: true,
      message: error.message || RES_MSG.SMTHNG_WRNG,
    });
  }
};
