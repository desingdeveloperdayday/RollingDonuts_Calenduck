import { Router } from 'express';
import { auth } from '../../controllers';
import subscriptionList from './list';

const router = Router();

router.get('/', auth.get, subscriptionList);

export default router;
