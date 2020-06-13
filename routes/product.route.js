const express = require('express');
const { isAuth, isAdmin } = require('../middleware/auth.middleware.js'); 
const asyncHandler = require('express-async-handler');
const {
	getAllProducts,
	getAllProductsByCategori,
	getProductById,
	postProduct,
	updateProductById,
	postProductReview,
	deleteProductById,
	deleteProductReviewById,
} = require('../controllers/product.controller.js');

const router = express.Router();

/**
 * @route      	GET  / 
 * @params 		none
 * @deskripsi  	Render landind page view
 * @access     	Public 		
 * @Protection 	none
 * @middleware	asyncErrorHandler
 * @ereturn 	res.render('index', { posts, mapBoxToken, recentPosts, title: 'Surf Shop - Home' });
 */
router.get("/", asyncHandler(getAllProducts));

// lakukan pencarian product dengan kategori yang berbeda-beda didalam database
/**
 * @route      	GET  / 
 * @params 		none
 * @deskripsi  	Render landind page view
 * @access     	Public 		
 * @Protection 	none
 * @middleware	asyncErrorHandler
 * @ereturn 	res.render('index', { posts, mapBoxToken, recentPosts, title: 'Surf Shop - Home' });
 */
router.get('/categories', asyncHandler(getAllProductsByCategori));

// mengambil product berdasarkan id product didalam database
/**
 * @route      	GET  / 
 * @params 		none
 * @deskripsi  	Render landind page view
 * @access     	Public 		
 * @Protection 	none
 * @middleware	asyncErrorHandler
 * @ereturn 	res.render('index', { posts, mapBoxToken, recentPosts, title: 'Surf Shop - Home' });
 */
router.get('/:id', asyncHandler(getProductById));

// tambahkan product kedalam database
/**
 * @route      	GET  / 
 * @params 		none
 * @deskripsi  	Render landind page view
 * @access     	Public 		
 * @Protection 	none
 * @middleware	asyncErrorHandler
 * @ereturn 	res.render('index', { posts, mapBoxToken, recentPosts, title: 'Surf Shop - Home' });
 */
router.post('/', isAuth, isAdmin, asyncHandler(postProduct));

// ubah product yang ada didalam database berdasarkan id product
/**
 * @route      	GET  / 
 * @params 		none
 * @deskripsi  	Render landind page view
 * @access     	Public 		
 * @Protection 	none
 * @middleware	asyncErrorHandler
 * @ereturn 	res.render('index', { posts, mapBoxToken, recentPosts, title: 'Surf Shop - Home' });
 */
router.put('/:id', isAuth, isAdmin, asyncHandler(updateProductById));

// tambahkan review untuk product yang dipilih berdasarkan id product kedalam database
/**
 * @route      	GET  / 
 * @params 		none
 * @deskripsi  	Render landind page view
 * @access     	Public 		
 * @Protection 	none
 * @middleware	asyncErrorHandler
 * @ereturn 	res.render('index', { posts, mapBoxToken, recentPosts, title: 'Surf Shop - Home' });
 */
router.post('/:id/reviews', isAuth, asyncHandler(postProductReview));

// delete product didalam database berdasarkan id product
/**
 * @route      	GET  / 
 * @params 		none
 * @deskripsi  	Render landind page view
 * @access     	Public 		
 * @Protection 	none
 * @middleware	asyncErrorHandler
 * @ereturn 	res.render('index', { posts, mapBoxToken, recentPosts, title: 'Surf Shop - Home' });
 */
router.delete('/:id', isAuth, isAdmin, asyncHandler(deleteProductById));

// delete product didalam database berdasarkan id product
/**
 * @route      	GET  / 
 * @params 		none
 * @deskripsi  	Render landind page view
 * @access     	Public 		
 * @Protection 	none
 * @middleware	asyncErrorHandler
 * @ereturn 	res.render('index', { posts, mapBoxToken, recentPosts, title: 'Surf Shop - Home' });
 */
router.delete('/:id/reviews/:reviewid', isAuth, asyncHandler(deleteProductReviewById));


module.exports = router;

