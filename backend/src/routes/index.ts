import { Router } from 'express';
import passagesRouter from './passages';

const apiRouter = Router();

/**
 * API routes
 */
apiRouter.use('/passages', passagesRouter);

export default apiRouter;
