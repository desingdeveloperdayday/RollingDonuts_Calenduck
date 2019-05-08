import { Router } from 'express';
import { auth } from '../../controllers';
import userGet from './get';
import contents from './contents';
import images from './images';
import userPost from './post';
import userPut from './put';
import userDelete from './delete';

const router = Router();

router.get('/', auth.get, userGet);
router.get('/:id/contents', auth.get, contents);
router.get('/:id/images', auth.get, images);
router.post('/', userPost);
router.put('/:id', auth.get, userPut);
router.delete('/:id', auth.get, userDelete);

export default router;
