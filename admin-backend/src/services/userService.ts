import axios from 'axios';
import { PromiseResolve } from '../utils/interafce';
import logger from '../utils/logger'; // Assuming you have a logger utility
import { RES_MSG, RESPONSES } from '../utils/resposne-contants';
const USER_SERVICE_URL =
  process.env.USER_SERVICE_URL || 'http://localhost:5000/admin';

const axiosInstance = axios.create({
  baseURL: USER_SERVICE_URL,
  timeout: 10000, // 10 seconds timeout
});
const adminEmail = process.env.ADMIN_EMAIL || 'admin@medoc.com';
const userService = {
  async adminLogin(req: any): Promise<PromiseResolve> {
    try {
      const { email, password } = req.body;
      if (email !== adminEmail) {
        return {
          status: RESPONSES.BADREQUEST,
          error: true,
          data: {},
          message: RES_MSG.INVALID_CREDENTIALS,
        };
      }

      const response: any = await axiosInstance.post(
        '/login',
        {
          email: email,
          password: password,
        },
        {
          headers: {
            'x-api-key': req.headers['x-api-key'], // Pass specific headers if required
            'Content-Type': 'application/json',
          },
          validateStatus: function (status) {
            return true;
          },
        }
      );
      const users = response.data;

      return {
        status: users.status,
        error: users.error,
        data: users.data,
        message: users.message,
      };
    } catch (error: any) {
      logger.error(error, 'Error in adminLogin service');
      return {
        status: error.status || RESPONSES.BADREQUEST,
        error: true,
        message: RES_MSG.SMTHNG_WRNG,
      };
    }
  },
  async getAllUsers(req: any): Promise<PromiseResolve> {
    try {
      const response: any = await axiosInstance.get('/users', {
        headers: req.headers,
        validateStatus: function (status) {
          return true;
        },
      });
      const users = response.data;

      return {
        status: users.status,
        error: users.error,
        data: users.data,
        message: users.message,
      };
    } catch (error: any) {
      logger.error(error, 'Error in getAllUsers service');
      return {
        status: error.status || RESPONSES.BADREQUEST,
        error: true,
        message: RES_MSG.SMTHNG_WRNG,
      };
    }
  },

  async getUserById(req: any): Promise<PromiseResolve> {
    try {
      const { id } = req.params;
      const response: any = await axiosInstance.get(`/users/${id}`, {
        headers: req.headers,
        validateStatus: function (status) {
          return true;
        },
      });
      const user = response.data;
      return {
        status: user.status,
        error: user.error,
        data: user.data,
        message: user.message,
      };
    } catch (error: any) {
      logger.error(error, 'Error in getUserById service');
      return {
        status: RESPONSES.BADREQUEST,
        error: true,
        message: RES_MSG.SMTHNG_WRNG,
      };
    }
  },

  async deleteUser(req: any): Promise<PromiseResolve> {
    try {
      const { id } = req.params;
      const response: any = await axiosInstance.delete(`/users/${id}`, {
        headers: req.headers,
        validateStatus: function (status) {
          return true;
        },
      });
      const res = response.data;
      console.log(res);

      return {
        status: res.status,
        error: res,
        message: res.message,
        data: res.data,
      };
    } catch (error: any) {
      logger.error(error, 'Error in deleteUser service');
      return {
        status: RESPONSES.BADREQUEST,
        error: true,
        message: RES_MSG.SMTHNG_WRNG,
      };
    }
  },
};
export default userService;
