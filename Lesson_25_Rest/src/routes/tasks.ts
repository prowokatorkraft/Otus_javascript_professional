import {Router} from 'express';
import {taskController} from "../controllers/tasks";
import {validate} from "../middleware/validate";
import {taskSchema} from "../models/schemas/task";

const router = Router();

router.get('/', taskController.getAll);
router.get('/:id',
  validate(taskSchema.params, 'params'),
  taskController.findById
);
router.post('/',
  validate(taskSchema.create, 'body'),
  taskController.create
);
router.put('/',
  validate(taskSchema.update, 'body'),
  taskController.update
);
router.delete('/:id',
  validate(taskSchema.params, 'params'),
  taskController.delete
);

export default router;