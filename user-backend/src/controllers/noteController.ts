import { Response } from 'express';
import noteService from '../services/noteService';
import logger from '../utils/logger'; // Assuming you have a logger utility
import { PromiseResolve } from '../utils/interafce';
import { RES_MSG, RESPONSES } from '../utils/resposne-contants';

// @desc Get all notes for the authenticated user
// @route GET /auth/notes
// @access Private
export async function getNotes(req: any, res: Response): Promise<any> {
  try {
    const userId = req.user?.id;

    const { page } = req.params;

    const response = await noteService.getNotes(userId, +page || 1);

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
    logger.error(error, 'Error in getNotes controller');
    return res.status(RESPONSES.BADREQUEST).send({
      status: RESPONSES.BADREQUEST,
      error: true,
      message: RES_MSG.SMTHNG_WRNG,
    });
  }
}

// @desc Create a new note
// @route POST /auth/notes
// @access Private
export async function createNote(req: any, res: Response): Promise<any> {
  try {
    const userId = req.user?.id;
    const { title, description } = req.body;

    const response: PromiseResolve = await noteService.createNote(
      userId,
      title,
      description
    );

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
      message: response.message,
    });
  } catch (error) {
    logger.error(error, 'Error in createNote controller');
    return res.status(RESPONSES.BADREQUEST).send({
      status: RESPONSES.BADREQUEST,
      error: true,
      message: RES_MSG.SMTHNG_WRNG,
    });
  }
}

// @desc Update a note
// @route PATCH /auth/notes/:id
// @access Private
export async function updateNote(req: any, res: Response): Promise<any> {
  try {
    const userId = req.user?.id;
    const { id } = req.params;
    const { title, description } = req.body;

    const response = await noteService.updateNote(
      userId,
      id,
      title,
      description
    );

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
    logger.error(error, 'Error in updateNote controller');
    return res.status(RESPONSES.BADREQUEST).send({
      status: RESPONSES.BADREQUEST,
      error: true,
      message: RES_MSG.SMTHNG_WRNG,
    });
  }
}

// @desc Delete a note
// @route DELETE /auth/notes/:id
// @access Private
export async function deleteNote(req: any, res: Response): Promise<any> {
  try {
    const userId = req.user?.id;
    const { id } = req.params;

    const response = await noteService.deleteNote(userId, id);

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
      message: response.message,
    });
  } catch (error) {
    logger.error(error, 'Error in deleteNote controller');
    return res.status(RESPONSES.BADREQUEST).send({
      status: RESPONSES.BADREQUEST,
      error: true,
      message: RES_MSG.SMTHNG_WRNG,
    });
  }
}

export async function getNotesAdmin(req: any, res: Response): Promise<any> {
  try {
    const { page } = req.params;

    const response = await noteService.getNotesAdmin(+page || 1);

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
    logger.error(error, 'Error in getNotes controller');
    return res.status(RESPONSES.BADREQUEST).send({
      status: RESPONSES.BADREQUEST,
      error: true,
      message: RES_MSG.SMTHNG_WRNG,
    });
  }
}
