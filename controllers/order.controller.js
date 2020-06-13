const Order = require('../models/order.model.js')

 module.exports = {
 	/**
 	 * [getAllOrders description]
 	 * @param  {[type]}   req  [description]
 	 * @param  {[type]}   res  [description]
 	 * @param  {Function} next [description]
 	 * @return {[type]}        [description]
 	 */
 	async getAllOrders(req, res, next) {
		/**
		 * Ambil semua data orders yang ada didalam database, lakukan populate untuk models user
		 * Dokumentasi Populate
		 * MongoDB has the join-like $lookup aggregation operator in versions >= 3.2. Mongoose has a more powerful alternative called populate(), which lets you reference documents in other collections.
		 * Population is the process of automatically replacing the specified paths in the document with document(s) from other collection(s). 
		 */
	 	// let a= await Order.updateOne({_id: "5ee184a884acf027eb7a66ab"}, {$set :{isPaid: true}});
	 	// console.log(a);
	  const orders = await Order.find({}).populate('user');
	  console.log(orders);
	  res.send(orders);
 	},

 	/**
 	 * [getOrderById description]
 	 * @param  {[type]}   req  [description]
 	 * @param  {[type]}   res  [description]
 	 * @param  {Function} next [description]
 	 * @return {[type]}        [description]
 	 */
 	async getOrderById(req, res, next) {
	  const order = await Order.findById(req.params.id);
	  if (order) {
	  	// jika data order ditemukan
	    res.send(order);
	  } else {
	  	// jika data order tidak ditemukan
	    // res.status(404).send("Order Not Found.")
	    throw Error('Order not found.');
	  }
 	},

 	/**
 	 * [getAllOrdersByUserMine description]
 	 * @param  {[type]}   req  [description]
 	 * @param  {[type]}   res  [description]
 	 * @param  {Function} next [description]
 	 * @return {[type]}        [description]
 	 */
	async getAllOrdersByUserMine(req, res, next) {
	  console.log(req.user);
	  const orders = await Order.find({ user: req.user._id });
	  res.send(orders);
 	},

 	/**
 	 * [getAllOrdersByCategori description]
 	 * @param  {[type]}   req  [description]
 	 * @param  {[type]}   res  [description]
 	 * @param  {Function} next [description]
 	 * @return {[type]}        [description]
 	 */
 	async getAllOrdersByCategori(req, res, next) {
	  const categories = await Order.find().distinct('category');
	  res.send(categories);
 	},

 	/**
 	 * [postOrder description]
 	 * @param  {[type]}   req  [description]
 	 * @param  {[type]}   res  [description]
 	 * @param  {Function} next [description]
 	 * @return {[type]}        [description]
 	 */
 	async postOrder(req, res, next) {
	  const newOrderCreated = new Order({
	    orderItems: req.body.cartItems,
	    user: req.user._id,
	    shipping: req.body.shipping,
	    payment: req.body.payment,
	    itemsPrice: req.body.itemsPrice,
	    taxPrice: req.body.taxPrice,
	    shippingPrice: req.body.shippingPrice,
	    totalPrice: req.body.totalPrice,
	  });
	  const newOrder = await newOrderCreated.save();
	  res.send({ 
	    message: "New Order Created", 
	    data: newOrder 
	  });
 	},

 	/**
 	 * [deleteOrderById description]
 	 * @param  {[type]}   req  [description]
 	 * @param  {[type]}   res  [description]
 	 * @param  {Function} next [description]
 	 * @return {[type]}        [description]
 	 */
 	async deleteOrderById(req, res, next) {
	  const order = await Order.findById(req.params.id);
	  if (order) {
	    const removeOrder = await order.remove();
	    res.send({
	      message: 'Order Deleted',
	      data: removeOrder
	    });
	  } else {
	    // res.status(404).send("Order Not Found.")
	    throw Error('Order already removed');
	  }
 	},

 	/**
 	 * [updateOrderAffterSuccessPay description]
 	 * @param  {[type]}   req  [description]
 	 * @param  {[type]}   res  [description]
 	 * @param  {Function} next [description]
 	 * @return {[type]}        [description]
 	 */
 	async updateOrderAffterSuccessPay(req, res, next) {
	  const order = await Order.findById(req.params.id);
	  if (order) {
	    order.isPaid = true; // menandakan pesanan sudah dibayar
	    order.paidAt = Date.now(); // waktu pembayaran pesanan
	    order.payment.paymentResult = { // informasi pembayaran
	        payerID: req.body.payerID,
	        orderID: req.body.orderID,
	        paymentID: req.body.paymentID
	 
	    }

	    const updatedOrder = await order.save();
	    res.send({ message: 'Order Paid.', order: updatedOrder });
	  } else {
	    // res.status(404).send({ message: 'Order not found.' })
	    throw Error('Order doest not exists');
	  }
 	},

 	/**
 	 * [updateOrderAffterSuccessDelevier description]
 	 * @param  {[type]}   req  [description]
 	 * @param  {[type]}   res  [description]
 	 * @param  {Function} next [description]
 	 * @return {[type]}        [description]
 	 */
 	async updateOrderAffterSuccessDelevier(req, res, next) {
	  const order = await Order.findById(req.params.id);
	  if (order) {
	    order.isDelivered = true;
	    order.deliveredAt = Date.now();

	    const updatedOrder = await order.save();
	    res.send({ message: 'Order Delivered', data: updatedOrder });
	  } else {
	    throw Error('Order does not exist.');
	  }
 	},

 	/**
 	 * [updateOrderById description]
 	 * @param  {[type]}   req  [description]
 	 * @param  {[type]}   res  [description]
 	 * @param  {Function} next [description]
 	 * @return {[type]}        [description]
 	 */
 	async updateOrderById(req, res, next) {
		const product = await Order.findById(req.params.id);
	  if (product) {
	    product.name = req.body.name || product.name;
	    product.price = req.body.price || product.price;
	    product.countInStock = req.body.countInStock || product.countInStock;
	    product.image = req.body.image || product.image;
	    product.category = req.body.category || product.category;
	    product.brand = req.body.brand || product.brand;
	    product.features = req.body.features || product.features;

	    const updatedOrder = await product.save();
	    res.send({ message: 'Order Updated', data: updatedOrder });
	  } else {
	    throw Error('Order does not exist.');
	  }
 	},

};


