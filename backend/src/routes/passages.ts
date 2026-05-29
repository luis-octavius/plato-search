import { Router } from 'express';
import { PassageController } from '../controllers';

const router = Router();
const passageController = new PassageController();

/**
 * GET /api/passages/search
 * Query parameters:
 *   - dialogue: Platonic dialogue name (e.g., 'republic', 'apology')
 *   - stephanus: Stephanus reference (e.g., '7.514a')
 *
 * Response:
 *   {
 *     reference: string,
 *     greek: string,
 *     english: string,
 *     adaptations: {
 *       beginner: string,
 *       intermediate: string,
 *       advanced: string
 *     }
 *   }
 */
router.get('/search', (req, res, next) => passageController.search(req as any, res, next));

/**
 * GET /api/passages/dialogues
 * Lists all available Platonic dialogues in the Perseus collection
 *
 * Response:
 *   {
 *     dialogues: string[],
 *     count: number
 *   }
 */
router.get('/dialogues', (req, res, next) => passageController.listDialogues(req, res, next));

export default router;
