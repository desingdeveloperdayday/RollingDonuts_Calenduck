import { Router } from 'express';
import users from './users';
import contents from './contents';
import auth from './auth';
import images from './images';

const router = Router();

router.use('/users', users);
router.use('/contents', contents);
router.use('/auth', auth);
router.use('/images', images);

export default router;
