import { Router } from 'express';
import multer from 'multer';
import { auth } from '../../controllers';
import contentGet from './get';
import contentList from './list';
import contentPost from './post';
import contentPut from './put';
import contentDelete from './delete';

const router = Router();

const upload = multer({ dest: 'uploads/' });

router.get('/', auth.get, contentList);
router.get('/:id', auth.get, contentGet);
router.post('/', auth.get, upload.array('image', 5), contentPost);
router.put('/:id', auth.get, upload.array('image', 5), contentPut);
router.delete('/:id', auth.get, contentDelete);

export default router;
