import { Request, Response } from 'express';
import AuthService from '../services/authService';
import logger from '../utils/logger';
import { RES_MSG, RESPONSES } from '../utils/resposne-contants';

// @desc Register a new user
// @route POST /auth/register
// @access Public
export async function registerUser(req: Request, res: Response): Promise<any> {
  try {
    const { name, email, password } = req.body;

    const response = await AuthService.register(name, email, password);

    if (response.error) {
      return res.status(response.status).send({
        status: response.status,
        error: true,
        message: response.message,
      });
    }

    return res.status(RESPONSES.CREATED).send({
      status: RESPONSES.CREATED,
      error: false,
      data: response.data,
      message: response.message,
    });
  } catch (error) {
    logger.error(error, 'Error in registerUser controller');
    return res.status(RESPONSES.BADREQUEST).send({
      status: RESPONSES.BADREQUEST,
      error: true,
      message: RES_MSG.SMTHNG_WRNG,
    });
  }
}

// @desc Login user
// @route POST /auth/login
// @access Public
export async function loginUser(req: Request, res: Response): Promise<any> {
  try {
    const { email, password } = req.body;

    const response = await AuthService.login(email, password);

    if (response.error) {
      return res.status(response.status).send({
        status: response.status,
        error: true,
        message: response.message,
      });
    }

    return res.status(RESPONSES.SUCCESS).send({
      status: RESPONSES.SUCCESS,
      error: false,
      data: response.data,
    });
  } catch (error) {
    logger.error(error, 'Error in loginUser controller');
    return res.status(RESPONSES.BADREQUEST).send({
      status: RESPONSES.BADREQUEST,
      error: true,
      message: RES_MSG.SMTHNG_WRNG,
    });
  }
}

// @desc Get all users
// @route GET /auth/users
// @access Private
export async function getAllUsers(req: Request, res: Response): Promise<any> {
  try {
    const page = Number(req.params.page) || 1;

    const response = await AuthService.getAllUsers(page);

    if (response.error) {
      return res.status(response.status).send({
        status: response.status,
        error: true,
        message: response.message,
      });
    }

    return res.status(RESPONSES.SUCCESS).send({
      status: RESPONSES.SUCCESS,
      error: false,
      data: response.data,
    });
  } catch (error) {
    logger.error(error, 'Error in getAllUsers controller');
    return res.status(RESPONSES.BADREQUEST).send({
      status: RESPONSES.BADREQUEST,
      error: true,
      message: RES_MSG.SMTHNG_WRNG,
    });
  }
}

// @desc Get user by ID
// @route GET /auth/user/:id
// @access Private
export async function getUserById(req: Request, res: Response): Promise<any> {
  try {
    const { id } = req.params;

    const response = await AuthService.getUserById(id);

    if (response.error) {
      return res.status(response.status).send({
        status: response.status,
        error: true,
        message: response.message,
      });
    }

    return res.status(RESPONSES.SUCCESS).send({
      status: RESPONSES.SUCCESS,
      error: false,
      data: response.data,
    });
  } catch (error) {
    logger.error(error, 'Error in getUserById controller');
    return res.status(RESPONSES.BADREQUEST).send({
      status: RESPONSES.BADREQUEST,
      error: true,
      message: RES_MSG.SMTHNG_WRNG,
    });
  }
}

// @desc Delete user by ID
// @route DELETE /auth/user/:id
// @access Private
export async function deleteUser(req: Request, res: Response): Promise<any> {
  try {
    const { id } = req.params;

    const response = await AuthService.deleteUser(id);

    if (response.error) {
      return res.status(response.status).send({
        status: response.status,
        error: true,
        message: response.message,
      });
    }

    return res.status(RESPONSES.SUCCESS).send({
      status: RESPONSES.SUCCESS,
      error: false,
      message: response.message,
    });
  } catch (error) {
    logger.error(error, 'Error in deleteUser controller');
    return res.status(RESPONSES.BADREQUEST).send({
      status: RESPONSES.BADREQUEST,
      error: true,
      message: RES_MSG.SMTHNG_WRNG,
    });
  }
}
