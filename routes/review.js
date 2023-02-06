const express = require('express');
const router = express.Router({ mergeParams: true });

const {
    getReviews,
    getReview,
    addReview,
    updateReview,
    deleteReview
} = require('../controllers/review');

const Review = require('../models/Review');

const { protect, authorize } = require('../middleware/auth');

router.route('/')
    .get(getReviews);

router.route('/:id')
    .get(getReview);

router.route('/').post(protect, authorize('user', 'admin'), addReview);
router.route('/:id').put(protect, authorize('user', 'admin'), updateReview);
router.route('/:id').delete(protect, authorize('user', 'admin'), deleteReview);

module.exports = router;
