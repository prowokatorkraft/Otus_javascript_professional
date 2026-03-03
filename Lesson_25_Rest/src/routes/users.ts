import {Router} from 'express';
import {userController} from "../controllers/users";
import {validate} from "../middleware/validate";
import {userSchema} from "../models/schemas/user";

const router = Router();

router.get('/', userController.getAll);
router.get('/:id',
  validate(userSchema.params, 'params'),
  userController.findById
);
router.post('/',
  validate(userSchema.create, 'body'),
  userController.create
);
router.put('/',
  validate(userSchema.update, 'body'),
  userController.update
);
router.delete('/:id',
  validate(userSchema.params, 'params'),
  userController.delete
);

export default router;