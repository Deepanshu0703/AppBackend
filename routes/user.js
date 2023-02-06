const express = require('express');
const router = express.Router();

const {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser
} = require('../controllers/user');

const { protect, authorize } = require('../middleware/auth');

router.use(protect);
router.use(authorize('admin'));


router.post('/', protect, createUser);
router.get('/', getUsers);
router.get('/:id', protect, getUser);
router.put('/:id', protect, updateUser);
router.delete('/:id', deleteUser);

module.exports = router;