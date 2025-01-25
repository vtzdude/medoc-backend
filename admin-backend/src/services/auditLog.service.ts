import AuditLog from '../models/auditModel';
import { PromiseResolve } from '../utils/interafce';
import logger from '../utils/logger';
import { RES_MSG, RESPONSES } from '../utils/resposne-contants';

const auditLogService = {
  async logAudit(logData: {
    userId?: string;
    action: string;
    resource: string;
    status: 'SUCCESS' | 'FAILURE';
    ip?: string;
    details?: object;
  }): Promise<PromiseResolve> {
    try {
      await AuditLog.create(logData);

      return {
        status: RESPONSES.SUCCESS,
        error: false,
        message: 'Audit log created successfully',
        data: {},
      };
    } catch (error: any) {
      logger.error(
        {
          message: 'Error in logAudit service',
          error: error.message,
        },
        'AuditLogServiceError'
      );

      return {
        status: RESPONSES.BADREQUEST,
        error: true,
        message: RES_MSG.SMTHNG_WRNG,
      };
    }
  },

  async getRecentLogs(page: number): Promise<PromiseResolve> {
    try {
      const limit = Number(process.env.PAGE_LIMIT) || 10;
      const offset = (page - 1) * limit;
      const totalRecords = await AuditLog.countDocuments();
      const logs = await AuditLog.find()
        .sort({ timestamp: -1 })
        .limit(limit)
        .skip(offset)
        .select('-__v');

      return {
        status: RESPONSES.SUCCESS,
        error: false,
        message: 'Recent audit logs fetched successfully',
        data: {
          rows: logs,
          count: totalRecords,
        },
      };
    } catch (error: any) {
      logger.error(
        {
          message: 'Error in getRecentLogs service',
          error: error.message,
        },
        'AuditLogServiceError'
      );

      return {
        status: RESPONSES.BADREQUEST,
        error: true,
        message: RES_MSG.SMTHNG_WRNG,
      };
    }
  },
};

export default auditLogService;
