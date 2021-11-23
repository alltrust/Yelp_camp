const express = require('express');
const router = express.Router({mergeParams: true}); //bc u need access to the id params (& routers default changes the params) we need to mergeparams as such
const {validateReview, isLoggedIn, isReviewAuthor} = require('../views/middleware')
const reviews = require('../controllers/reviews')
const ExpressError = require('../utilities/ExpressError')
const catchAsync = require('../utilities/catchAsync');

router.post('/', isLoggedIn, validateReview, catchAsync(reviews.createReview));

router.delete('/:reviewId', isLoggedIn, isReviewAuthor, catchAsync(reviews.deleteReview));

module.exports = router;