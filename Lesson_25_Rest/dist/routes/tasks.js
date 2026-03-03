"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tasks_1 = require("../controllers/tasks");
const router = (0, express_1.Router)();
router.get('/', tasks_1.taskController.getAll);
router.get('/:id', tasks_1.taskController.findById);
router.post('/', tasks_1.taskController.create);
router.put('/', tasks_1.taskController.update);
router.delete('/', tasks_1.taskController.delete);
exports.default = router;
//# sourceMappingURL=tasks.js.map