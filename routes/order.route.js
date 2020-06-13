const express = require('express');
const { isAuth, isAdmin } = require('../middleware/auth.middleware.js'); 
const asyncHandler = require('express-async-handler');
const { 
  getAllOrders,
  getOrderById,
  getAllOrdersByUserMine,
  getAllOrdersByCategori,
  postOrder,
  deleteOrderById,
  updateOrderAffterSuccessPay,
  updateOrderAffterSuccessDelevier,
  updateOrderById,
} = require('../controllers/order.controller.js');
const router = express.Router();

/**
 * @route       GET  / 
 * @params    none
 * @deskripsi   Render landind page view
 * @access      Public    
 * @Protection  none
 * @middleware  asyncErrorHandler
 * @ereturn   res.render('index', { posts, mapBoxToken, recentPosts, title: 'Surf Shop - Home' });
 */
router.get("/", isAuth, isAdmin, asyncHandler(getAllOrders));

// Mengambil seluruh daftar order untuk user tertentu didalam database
/**
 * @route       GET  / 
 * @params    none
 * @deskripsi   Render landind page view
 * @access      Public    
 * @Protection  none
 * @middleware  asyncErrorHandler
 * @ereturn   res.render('index', { posts, mapBoxToken, recentPosts, title: 'Surf Shop - Home' });
 */
router.get("/mine", isAuth, asyncHandler(getAllOrdersByUserMine));

// mengambil data order berdasarkan id order didalam database
/**
 * @route       GET  / 
 * @params    none
 * @deskripsi   Render landind page view
 * @access      Public    
 * @Protection  none
 * @middleware  asyncErrorHandler
 * @ereturn   res.render('index', { posts, mapBoxToken, recentPosts, title: 'Surf Shop - Home' });
 */
router.get("/:id", isAuth, asyncHandler(getOrderById));

// ambil data order didalam database berdasarkan category
/**
 * @route       GET  / 
 * @params    none
 * @deskripsi   Render landind page view
 * @access      Public    
 * @Protection  none
 * @middleware  asyncErrorHandler
 * @ereturn   res.render('index', { posts, mapBoxToken, recentPosts, title: 'Surf Shop - Home' });
 */
router.get('/categories', isAuth, asyncHandler(getAllOrdersByCategori));


// Menghapus data order berdasarkan id order diddalam database
/**
 * @route       GET  / 
 * @params    none
 * @deskripsi   Render landind page view
 * @access      Public    
 * @Protection  none
 * @middleware  asyncErrorHandler
 * @ereturn   res.render('index', { posts, mapBoxToken, recentPosts, title: 'Surf Shop - Home' });
 */
// Hanya admin yang berhak menghapus data order
router.delete("/:id", isAuth, isAdmin, asyncHandler(deleteOrderById));

// Menambahkan data order
/**
 * @route       GET  / 
 * @params    none
 * @deskripsi   Render landind page view
 * @access      Public    
 * @Protection  none
 * @middleware  asyncErrorHandler
 * @ereturn   res.render('index', { posts, mapBoxToken, recentPosts, title: 'Surf Shop - Home' });
 */
router.post("/", isAuth, asyncHandler(postOrder));

// Mengubah data order (umumnya diubah karena user sudah melakukan pembayaran)
/**
 * @route       GET  / 
 * @params    none
 * @deskripsi   Render landind page view
 * @access      Public    
 * @Protection  none
 * @middleware  asyncErrorHandler
 * @ereturn   res.render('index', { posts, mapBoxToken, recentPosts, title: 'Surf Shop - Home' });
 */
router.put("/:id/pay", isAuth, asyncHandler(updateOrderAffterSuccessPay));

// Ubah data pengiriman pada models order didalam database yang manandakan bahwa pengiriman sudah dilakukan.
/**
 * @route       GET  / 
 * @params    none
 * @deskripsi   Render landind page view
 * @access      Public    
 * @Protection  none
 * @middleware  asyncErrorHandler
 * @ereturn   res.render('index', { posts, mapBoxToken, recentPosts, title: 'Surf Shop - Home' });
 */
router.put('/:id/deliver', isAuth, isAdmin, asyncHandler(updateOrderAffterSuccessDelevier));

// Update order berdasarkan id didalam database
/**
 * @route       GET  / 
 * @params    none
 * @deskripsi   Render landind page view
 * @access      Public    
 * @Protection  none
 * @middleware  asyncErrorHandler
 * @ereturn   res.render('index', { posts, mapBoxToken, recentPosts, title: 'Surf Shop - Home' });
 */
router.put('/:id', isAuth, isAdmin, asyncHandler(updateOrderById));

module.exports = router;