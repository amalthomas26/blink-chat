import { Request, Response } from 'express';
import mongoose from 'mongoose';

export const healthCheck = async (req: Request, res: Response) => {
  const mongoState = mongoose.connection.readyState;
  // 1 = connected, 2 = connecting, 3 = disconnecting, 0 = disconnected
  const mongoHealthy = mongoState === 1;

  const status = {
    status: mongoHealthy ? 'healthy' : 'degraded',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    mongodb: mongoHealthy ? 'connected' : `state=${mongoState}`,
    memory: process.memoryUsage(),
  };

  // Return 200 if healthy, 503 if degraded.
  // Docker healthcheck considers non-200 as failure.
  res.status(mongoHealthy ? 200 : 503).json(status);
};
