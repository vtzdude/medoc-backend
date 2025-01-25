import axios from 'axios';
import logger from '../utils/logger'; // Assuming you have a logger utility
import { PromiseResolve } from '../utils/interafce';
import { RES_MSG, RESPONSES } from '../utils/resposne-contants';

const USER_SERVICE_URL =
  process.env.USER_SERVICE_URL || 'http://localhost:5000/admin';

const axiosInstance = axios.create({
  baseURL: USER_SERVICE_URL,
  timeout: 10000, // 10 seconds timeout
});
const notesService = {
  async getNotesFromUserBackend(req: any): Promise<PromiseResolve> {
    try {
      const { page } = req.params;
      const response: any = await axiosInstance.get(`/notes/${page}`, {
        headers: req.headers,
        validateStatus: function (status) {
          return true;
        },
      });
      const res = response.data;
      return {
        status: res.status,
        error: res.error,
        data: res.data,
        message: res.message,
      };
    } catch (error: any) {
      logger.error(error, 'Error in getNotesFromUserBackend service');

      return {
        status: RESPONSES.BADREQUEST,
        error: true,
        message: RES_MSG.SMTHNG_WRNG,
      };
    }
  },
};

export default notesService;
