const express = require('express');
const { isAuth } = require('../middleware/auth.middleware.js'); 
const asyncHandler = require('express-async-handler');
const router = express.Router();
const {
	createAdmin, 
	updateProfile, 
	postRegister, 
	postSingin
} = require('../controllers/user.controller.js');

/**
 * @route      	GET  / 
 * @params 		none
 * @deskripsi  	Render landind page view
 * @access     	Public 		
 * @Protection 	none
 * @middleware	asyncErrorHandler
 * @ereturn 	res.render('index', { posts, mapBoxToken, recentPosts, title: 'Surf Shop - Home' });
 */
router.post('/signin', asyncHandler(postSingin));

/**
 * @route      	GET  / 
 * @params 		none
 * @deskripsi  	Render landind page view
 * @access     	Public 		
 * @Protection 	none
 * @middleware	asyncErrorHandler
 * @ereturn 	res.render('index', { posts, mapBoxToken, recentPosts, title: 'Surf Shop - Home' });
 */
router.post('/register', asyncHandler(postRegister));

/**
 * @route      	GET  / 
 * @params 		none
 * @deskripsi  	Render landind page view
 * @access     	Public 		
 * @Protection 	none
 * @middleware	asyncErrorHandler
 * @ereturn 	res.render('index', { posts, mapBoxToken, recentPosts, title: 'Surf Shop - Home' });
 */
router.put('/:id', isAuth, asyncHandler(updateProfile));

/**
 * @route      	GET  / 
 * @params 		none
 * @deskripsi  	Render landind page view
 * @access     	Public 		
 * @Protection 	none
 * @middleware	asyncErrorHandler
 * @ereturn 	res.render('index', { posts, mapBoxToken, recentPosts, title: 'Surf Shop - Home' });
 */
router.get('/api/users/createadmin', asyncHandler(createAdmin));

module.exports = router;