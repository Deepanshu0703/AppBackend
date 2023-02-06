const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const User = require('../models/Users');

// @desc    Get all users
// @route   GET /api/v1/auth/users
// @access  Private/Admin

exports.getUsers = asyncHandler(async (req, res, next) => {
    req.user.id = req.user;
    console.log(req.user.id);
    const users = await User.find();
    res.status(200).json({
        success: true,
        count: users.length,
        data: users
    });
});


// @desc    Get single user
// @route   GET /api/v1/auth/users/:id
// @access  Private/Admin

exports.getUser = asyncHandler(async (req, res, next) => {

    const user = await User.findById(req.params.id);
    if (!user) {
        return next(new ErrorResponse(`User not found with id of ${req.params.id}`, 404));
    }
    res.status(200).json({
        success: true,
        data: user
    });
});

// @desc    Create user
// @route   POST /api/v1/auth/users
// @access  Private/Admin

exports.createUser = asyncHandler(async (req, res, next) => {

    const user = await User.create(req.body);
    res.status(201).json({
        success: true,
        data: user
    });
}
);

// @desc    Update user
// @route   PUT /api/v1/auth/users/:id
// @access  Private/Admin

exports.updateUser = asyncHandler(async (req, res, next) => {
    const user = await User.findById({ _id: req.params.id });
    if (!user) {
        return next(new ErrorResponse(`User not found with id of ${req.params.id}`, 404));
    }

    user.name = req.body.name;
    user.email = req.body.email;
    user.role = req.body.role;
    user.save();
    res.status(200).json({
        success: true,
        data: user
    });

});

// @desc    Delete user
// @route   DELETE /api/v1/auth/users/:id
// @access  Private/Admin

exports.deleteUser = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        return next(new ErrorResponse(`User not found with id of ${req.params.id}`, 404));
    }

    user.remove();
    res.status(200).json({
        success: true,
        data: {}
    });
});


