import Note from '../models/noteModel';
import logger from '../utils/logger'; // Assuming you have a logger utility
import { PromiseResolve } from '../utils/interafce';
import { RES_MSG, RESPONSES } from '../utils/resposne-contants';
import CustomError from '../utils/custom-error';

const NoteService = {
  /**
   * Retrieves all notes for a specific user.
   * @param {string} userId
   *  @param {number} page - The number of records to return
   * @returns {Promise<PromiseResolve>}
   * @memberof NoteService
   */
  async getNotes(userId: string, page: number): Promise<PromiseResolve> {
    try {
      const limit: number = Number(process.env.PAGE_LIMIT) || 10;
      const offset = (page - 1) * limit;
      const totalRecords = await Note.countDocuments({ userId });

      // Fetch the notes with pagination
      const notes = await Note.find({ userId })
        .skip(offset)
        .limit(limit)
        .sort({ createdAt: -1 })
        .select('title description createdAt updatedAt userId _id status');
      return {
        status: RESPONSES.SUCCESS,
        error: false,
        message: RES_MSG.NOTES_FETCH_SUCCESS,
        data: {
          rows: notes,
          count: totalRecords,
        },
      };
    } catch (error: any) {
      logger.error(error, 'GetNotes Error');
      return {
        status: RESPONSES.BADREQUEST,
        error: true,
        message: error.message || RES_MSG.SMTHNG_WRNG,
      };
    }
  },

  /**
   * Creates a new note for a specific user.
   * @param {string} userId
   * @param {string} title
   * @param {string} description
   * @returns {Promise<PromiseResolve>}
   * @memberof NoteService
   */
  async createNote(
    userId: string,
    title: string,
    description: string
  ): Promise<PromiseResolve> {
    try {
      const findNote = await Note.findOne({ userId, title });
      if (findNote)
        return {
          status: RESPONSES.BADREQUEST,
          error: true,
          message: RES_MSG.DUPLICATE_NOTE,
          data: {},
        };

      const note = await Note.create({ userId, title, description });
      return {
        status: RESPONSES.CREATED,
        error: false,
        message: RES_MSG.NOTE_CREATE_SUCCESS,
        data: {},
      };
    } catch (error: any) {
      logger.error(error, 'CreateNote Error');
      return {
        status: RESPONSES.BADREQUEST,
        error: true,
        message: RES_MSG.SMTHNG_WRNG,
      };
    }
  },

  /**
   * Updates a specific note for a user.
   * @param {string} userId
   * @param {string} noteId
   * @param {string} title
   * @param {string} description
   * @returns {Promise<PromiseResolve>}
   * @memberof NoteService
   */
  async updateNote(
    userId: string,
    noteId: string,
    title: string,
    description: string
  ): Promise<PromiseResolve> {
    try {
      if (noteId.length !== 24) {
        return {
          status: 400,
          error: true,
          message: 'Invalid user ID format: ID must be 24 characters long',
        };
      }
      const note = await Note.findById(noteId);

      if (!note || note.userId !== userId) {
        return {
          status: RESPONSES.BADREQUEST,
          error: true,
          message: RES_MSG.NOTE_NOT_FOUND,
          data: {},
        };
      }
      if (!!title) {
        const findNote = await Note.findOne({ userId, title });
        if (findNote)
          return {
            status: RESPONSES.BADREQUEST,
            error: true,
            message: RES_MSG.DUPLICATE_NOTE,
            data: {},
          };
      }
      note.title = title || note.title;
      note.description = description || note.description;
      const updatedNote = await note.save();

      return {
        status: RESPONSES.SUCCESS,
        error: false,
        message: RES_MSG.NOTE_UPDATE_SUCCESS,
        data: {},
      };
    } catch (error: any) {
      logger.error(error, 'UpdateNote Error');
      return {
        status: error.status || RESPONSES.BADREQUEST,
        error: true,
        message: error.message || RES_MSG.SMTHNG_WRNG,
      };
    }
  },

  /**
   * Deletes a specific note for a user.
   * @param {string} userId
   * @param {string} noteId
   * @returns {Promise<PromiseResolve>}
   * @memberof NoteService
   */
  async deleteNote(userId: string, noteId: string): Promise<PromiseResolve> {
    try {
      if (noteId.length !== 24) {
        return {
          status: 400,
          error: true,
          message: 'Invalid user ID format: ID must be 24 characters long',
        };
      }
      const note: any = await Note.findById(noteId);

      if (!note || note.userId !== userId) {
        return {
          status: RESPONSES.BADREQUEST,
          error: true,
          message: RES_MSG.NOTE_NOT_FOUND,
          data: {},
        };
      }

      await note.deleteOne();
      return {
        status: RESPONSES.SUCCESS,
        error: false,
        message: RES_MSG.NOTE_DELETE_SUCCESS,
      };
    } catch (error: any) {
      logger.error(error, 'DeleteNote Error');
      return {
        status: error.status || RESPONSES.BADREQUEST,
        error: true,
        message: error.message || RES_MSG.SMTHNG_WRNG,
      };
    }
  },

  /**
   * Retrieves all notes for a specific user.
   * @param {string} userId
   *  @param {number} page - The number of records to return
   * @returns {Promise<PromiseResolve>}
   * @memberof NoteService
   */
  async getNotesAdmin(page: number): Promise<PromiseResolve> {
    try {
      const limit: number = Number(process.env.PAGE_LIMIT) || 10;
      const offset = (page - 1) * limit;
      const totalRecords = await Note.countDocuments();

      // Fetch the notes with pagination
      const notes = await Note.find()
        .skip(offset)
        .limit(limit)
        .sort({ createdAt: -1 })
        .select('title  _id status');
      return {
        status: RESPONSES.SUCCESS,
        error: false,
        message: RES_MSG.NOTES_FETCH_SUCCESS,
        data: {
          rows: notes,
          count: totalRecords,
        },
      };
    } catch (error: any) {
      logger.error(error, 'GetNotes Error');
      return {
        status: RESPONSES.BADREQUEST,
        error: true,
        message: error.message || RES_MSG.SMTHNG_WRNG,
      };
    }
  },
};

export default NoteService;
