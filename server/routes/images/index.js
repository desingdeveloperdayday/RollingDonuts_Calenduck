import { Router } from 'express';
import { auth } from '../../controllers';
import imageList from './list';

const router = Router();

router.get('/', auth.get, imageList);

export default router;
