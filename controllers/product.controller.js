const Product = require('../models/product.model.js')

module.exports = {

	/**
	 * [getAllProducts description]
	 * @param  {[type]}   req  [description]
	 * @param  {[type]}   res  [description]
	 * @param  {Function} next [description]
	 * @return {[type]}        [description]
	 */
	async getAllProducts(req, res, next) {
		// cek apakah user ingin mengambil barang berdasarkan ketegori atau tidak
		const category = req.query.category ? { category: req.query.category } : {}; 
		// cek apakah user melakukan pencarian product/barang berdasarkan nama barang atau tidak
		const search = req.query.search ? { 
		name: { // reqex untuk menampilkan nama product yang sesuai dengan pencarian
		  $regex: req.query.search,
		  $options: 'i',
		}
		} : {};
		// cek apakah user ingin melakukan pencarian barang berdasarkan urutan 
		const order = req.query.sort ? (req.query.sort === 'lowest' ? { price: 1 } : { price: -1 }) : { _id: -1 };

		// lakukkan pengambilan product didalam database berdasarkan kategori, pan query parameter pencarian  yang berupa nama product
		// kemudian product di tampilkan dengan pengurutan yang ditentukan (default urut secara descending)
	 	// let a= await Product.updateOne({_id: "5ee2d48a1361ba3452c46308"}, {$set :{image: './uploads/1591923850243.jpg'}});
	 	// console.log(a);

		const products = await Product.find({ ...category, ...search }).sort(order);
		console.log(products);
		res.send(products);
	},

	// lakukan pencarian product dengan kategori yang berbeda-beda didalam database
	/**
	 * [getAllProductsByCategori description]
	 * @param  {[type]}   req  [description]
	 * @param  {[type]}   res  [description]
	 * @param  {Function} next [description]
	 * @return {[type]}        [description]
	 */
	async getAllProductsByCategori(req, res, next) {
	  const categories = await Product.find().distinct('category');
    res.send(categories);
	},
	
	// mengambil product berdasarkan id product didalam database
	/**
	 * [getProductById description]
	 * @param  {[type]}   req  [description]
	 * @param  {[type]}   res  [description]
	 * @param  {Function} next [description]
	 * @return {[type]}        [description]
	 */
	async getProductById(req, res, next) {
		const product = await Product.findById(req.params.id);
		if(product) {
			res.send(product)
		} else {
			throw Error('Product not found.');
			// res.status(404).send({message: 'Product Not Found.'});
		}
	},
	
	// tambahkan product kedalam database product
	/**
	 * [postProduct description]
	 * @param  {[type]}   req  [description]
	 * @param  {[type]}   res  [description]
	 * @param  {Function} next [description]
	 * @return {[type]}        [description]
	 */
	async postProduct(req, res, next) {
		console.log(req.body);
		const product = new Product({
			name: req.body.name,
			price: req.body.price,
			images: req.body.images,
			brand: req.body.brand,
			category: req.body.category,
			countInStock: req.body.countInStock,
			description: req.body.description,
		    features: req.body.features,
		});

		const newProduct = await product.save();
		if(newProduct) {
			return res.send({message: 'New Product Created', data: newProduct});
		} else {
			return res.status(500).send({message: 'Error in creating product'});
		}
	},
	
	
	/**
	 * [updateProductById description]
	 * @param  {[type]}   req  [description]
	 * @param  {[type]}   res  [description]
	 * @param  {Function} next [description]
	 * @return {[type]}        [description]
	 */
	async updateProductById(req, res, next) {
		const productUpdate = await Product.findById(req.params.id);
		// cek apakah id product yang diupdate ada didalam database atau tidak
		if(productUpdate) {	
			// id product ada didatabase
			productUpdate.name = req.body.name;
			productUpdate.price = req.body.price;
			productUpdate.image = req.body.image;
			productUpdate.brand = req.body.brand;
			productUpdate.category = req.body.category;
			productUpdate.countInStock = req.body.countInStock;
			productUpdate.description = req.body.description;
			
			const updatedProduct = await productUpdate.save();

			// cek apakah product berhasil diupdate didalam database atau tidak
			if(updatedProduct) {
				// product berhasil didupdate kedalam database
				return res.send({message: 'Product Updated', data: updatedProduct})
			}  else {
				// product gagal didupdate kedalam database
				return res.status(500).send({message: 'Error in Updating', data: newProductUpdate})
			}
		} else {
			throw Error('Product does not exist.');
		}
	},
	
	/**
	 * [postProductReview description]
	 * @param  {[type]}   req  [description]
	 * @param  {[type]}   res  [description]
	 * @param  {Function} next [description]
	 * @return {[type]}        [description]
	 */
	async postProductReview(req, res, next) {
	  const product = await Product.findById(req.params.id);
	  if (product) {
	    const review = {
	      rating: req.body.rating, 
	      comment: req.body.comment, 
	      user: req.user._id, 
	      name: req.user.name,
	    };

	    // tambahkan data review di array product.reviews
	    product.reviews.push(review);

	    // hitung jumlah total rating setelah penambahan review
	    product.rating = product.reviews.reduce((a, c) => c.rating + a, 0) / product.reviews.length;
	    // hitung jumlah total review yang dilakukan setelah penambahan review
	    product.numReviews = product.reviews.length;
	    const updatedProduct = await product.save();
	    res.send({ 
	    	message: 'Comment Created.', 
	    	data: updatedProduct.reviews[updatedProduct.reviews.length - 1] 
	    });
	  } else {
	    throw Error('Product does not exist.');
	  }
	},
	
	/**
	 * [deleteProductById description]
	 * @param  {[type]}   req  [description]
	 * @param  {[type]}   res  [description]
	 * @param  {Function} next [description]
	 * @return {[type]}        [description]
	 */
	async deleteProductById(req, res, next) {
		const removeProduct = await Product.findById(req.params.id);
		if(removeProduct) {
			await removeProduct.remove();
			res.send({ message: 'Product Deleted', data: removeProduct });
		} else {
		    throw Error('Product already removed.');
		}
	},
	
	/**
	 * [deleteProductById description]
	 * @param  {[type]}   req  [description]
	 * @param  {[type]}   res  [description]
	 * @param  {Function} next [description]
	 * @return {[type]}        [description]
	 */
	async deleteProductReviewById(req, res, next) {

		const product = await Product.findById(req.params.id);
		if(product) {
			product.reviews = await product.reviews.filter(review => review.id !== req.params.reviewid)
		    const updatedProduct = await product.save();
		    res.send({ 
		    	message: 'Review Deleted.', 
		    	data: updatedProduct 
		    });

			// res.send({ message: 'Product Deleted', data: removeProduct });
		} else {
		    throw Error('Review already removed.');
		}
	},
	
}
