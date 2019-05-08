import { Router } from 'express';
import users from './users';
import contents from './contents';
import auth from './auth';

const router = Router();

router.use('/users', users);
router.use('/contents', contents);
router.use('/auth', auth);

export default router;
