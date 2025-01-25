import { Request, Response } from 'express';
import { RES_MSG, RESPONSES } from '../utils/resposne-contants';
import logger from '../utils/logger'; // Assuming you have a logger utility
import userService from '../services/userService';
import notesService from '../services/noteService';
import auditLogService from '../services/auditLog.service';
//Login admin
export async function adminLogin(req: Request, res: Response): Promise<any> {
  try {
    const response = await userService.adminLogin(req);
    await auditLogService.logAudit({
      action: 'adminLogin',
      resource: 'Admin',
      status: response.error ? 'SUCCESS' : 'FAILURE',
      ip: req.ip,
      details: { payload: req.body },
    });
    if (response.error) {
      return res.status(response.status).send({
        status: response.status,
        error: true,
        message: response.message,
      });
    }

    return res.status(response.status).send({
      status: response.status,
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
// Get all users
export async function getAllUsers(req: Request, res: Response): Promise<any> {
  try {
    const response = await userService.getAllUsers(req);
    await auditLogService.logAudit({
      action: 'getAllUsers',
      resource: 'Admin',
      status: response.error ? 'SUCCESS' : 'FAILURE',
      ip: req.ip,
      details: { params: req.params },
    });
    if (response.error) {
      return res.status(response.status).send({
        status: response.status,
        error: true,
        message: response.message,
      });
    }

    return res.status(response.status).send({
      status: response.status,
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

// Get user by ID
export async function getUserById(req: Request, res: Response): Promise<any> {
  try {
    const response = await userService.getUserById(req);
    await auditLogService.logAudit({
      action: 'getUserById',
      resource: 'Admin',
      status: response.error ? 'SUCCESS' : 'FAILURE',
      ip: req.ip,
      details: { params: req.params },
    });
    if (response.error) {
      return res.status(response.status).send({
        status: response.status,
        error: true,
        message: response.message,
      });
    }

    return res.status(response.status).send({
      status: response.status,
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

// Delete a user
export async function deleteUser(req: Request, res: Response): Promise<any> {
  try {
    const response = await userService.deleteUser(req);
    await auditLogService.logAudit({
      action: 'deleteUser',
      resource: 'Admin',
      status: response.error ? 'SUCCESS' : 'FAILURE',
      ip: req.ip,
      details: { params: req.params },
    });
    if (response.error) {
      return res.status(response.status).send({
        status: response.status,
        error: true,
        message: response.message,
      });
    }

    return res.status(response.status).send({
      status: response.status,
      error: false,
      data: response.data,
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

// Get notes from User Backend
export async function getNotes(req: Request, res: Response): Promise<any> {
  try {
    const response = await notesService.getNotesFromUserBackend(req);
    await auditLogService.logAudit({
      action: 'getNotes',
      resource: 'Admin',
      status: response.error ? 'SUCCESS' : 'FAILURE',
      ip: req.ip,
      details: { params: req.params },
    });
    if (response.error) {
      return res.status(response.status).send({
        status: response.status,
        error: true,
        message: response.message,
      });
    }

    return res.status(response.status).send({
      status: response.status,
      error: false,
      data: response.data,
    });
  } catch (error) {
    logger.error(error, 'Error in getNotes controller');
    return res.status(RESPONSES.BADREQUEST).send({
      status: RESPONSES.BADREQUEST,
      error: true,
      message: RES_MSG.SMTHNG_WRNG,
    });
  }
}

// Get auditLogs from admin Backend
export async function getAuditLogs(req: Request, res: Response): Promise<any> {
  try {
    const { page } = req.params;
    const response = await auditLogService.getRecentLogs(!!page ? +page : 1);
    if (response.error) {
      return res.status(response.status).send({
        status: response.status,
        error: true,
        message: response.message,
      });
    }

    return res.status(response.status).send({
      status: response.status,
      error: false,
      data: response.data,
    });
  } catch (error) {
    logger.error(error, 'Error in getNotes controller');
    return res.status(RESPONSES.BADREQUEST).send({
      status: RESPONSES.BADREQUEST,
      error: true,
      message: RES_MSG.SMTHNG_WRNG,
    });
  }
}
