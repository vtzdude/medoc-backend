import bcrypt from 'bcryptjs';
import { generateToken } from '../utils/jwt';
import User from '../models/userModel';
import logger from '../utils/logger'; // Assuming you have a logger utility
import { PromiseResolve } from '../utils/interafce';
import CustomError from '../utils/custom-error';
import { RES_MSG, RESPONSES } from '../utils/resposne-contants';
import { Types } from 'mongoose';
const adminEmail = process.env.ADMIN_EMAIL || 'admin@medoc.com';

const AuthService = {
  /**
   * Registers a new user.
   */
  async register(
    name: string,
    email: string,
    password: string
  ): Promise<PromiseResolve> {
    try {
      const userExists = await User.findOne({ email });

      if (userExists) {
        return {
          status: RESPONSES.BADREQUEST,
          error: true,
          message: RES_MSG.USER_ALREADY_EXIST,
        };
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const user = await User.create({
        name,
        email,
        password: hashedPassword,
      });

      if (user) {
        return {
          status: RESPONSES.CREATED,
          error: false,
          message: RES_MSG.USER_CREATED_SUCCESS,
          data: {},
        };
      }

      throw new CustomError(RES_MSG.SMTHNG_WRNG, RESPONSES.BADREQUEST);
    } catch (error: any) {
      logger.error(error, 'Register Error');

      return {
        status: error.status || RESPONSES.BADREQUEST,
        error: true,
        message: error.message || RES_MSG.SMTHNG_WRNG,
      };
    }
  },

  /**
   * Logs in an existing user.
   */
  async login(email: string, password: string): Promise<PromiseResolve> {
    try {
      const user = await User.findOne({ email });
      if (user && (await bcrypt.compare(password, user.password))) {
        return {
          status: RESPONSES.SUCCESS,
          error: false,
          message: RES_MSG.LOGIN_SUCCESS,
          data: {
            token: generateToken(
              user._id.toString(),
              email === adminEmail ? 'admin' : 'user'
            ),
          },
        };
      }
      throw new CustomError(
        RES_MSG.INVALID_CREDENTIALS,
        RESPONSES.UN_AUTHORIZED
      );
    } catch (error: any) {
      logger.error(error, 'Login Error');

      return {
        status: error.status || RESPONSES.BADREQUEST,
        error: true,
        message: error.message || RES_MSG.SMTHNG_WRNG,
      };
    }
  },

  /**
   * Get all users with pagination.
   */
  async getAllUsers(page: number): Promise<PromiseResolve> {
    try {
      const limit = Number(process.env.PAGE_LIMIT) || 10;
      const offset = (page - 1) * limit;
      const users = await User.find({ email: { $ne: adminEmail } })
        .select('_id name email')
        .sort({ createdAt: -1 })
        .skip(offset)
        .limit(limit);

      const totalUsers = await User.countDocuments({
        email: { $ne: adminEmail },
      });

      return {
        status: RESPONSES.SUCCESS,
        error: false,
        message: RES_MSG.DATA_SUCCESS,
        data: {
          rows: users,
          count: totalUsers,
        },
      };
    } catch (error: any) {
      logger.error(error, 'Error in getAllUsers service');
      return {
        status: RESPONSES.BADREQUEST,
        error: true,
        message: RES_MSG.SMTHNG_WRNG,
      };
    }
  },

  /**
   * Get a user by ID.
   */
  async getUserById(id: string): Promise<PromiseResolve> {
    try {
      if (id?.length !== 24) {
        return {
          status: 400,
          error: true,
          message: 'Invalid user ID format: ID must be 24 characters long',
        };
      }
      const user = await User.findById(id).select('_id email name');
      if (user) {
        return {
          status: RESPONSES.SUCCESS,
          message: RES_MSG.DATA_SUCCESS,
          error: false,
          data: user,
        };
      }
      return {
        status: RESPONSES.NOTFOUND,
        error: true,
        message: RES_MSG.NO_DATA,
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

  /**
   * Delete a user by ID.
   */
  async deleteUser(id: string): Promise<PromiseResolve> {
    try {
      if (id.length !== 24) {
        return {
          status: 400,
          error: true,
          message: 'Invalid user ID format: ID must be 24 characters long',
        };
      }
      const user: any = await User.findById(id);
      if (user?.email == adminEmail) {
        return {
          status: RESPONSES.BADREQUEST,
          error: true,
          message: RES_MSG.ACTION_NOT_ALLOWED,
        };
      }
      if (user) {
        await user.deleteOne(); // Use `deleteOne` for MongoDB compatibility
        return {
          status: RESPONSES.SUCCESS,
          error: false,
          message: RES_MSG.USER_DELETED,
        };
      }
      return {
        status: RESPONSES.NOTFOUND,
        error: true,
        message: RES_MSG.NO_DATA,
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

export default AuthService;
