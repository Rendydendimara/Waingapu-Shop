// Cart Action

import axios from 'axios';
import { CART_ADD_ITEM, CART_REMOVE_ITEM, CART_SAVE_SHIPPING, CART_SAVE_PAYMENT } from "../constants/cartConstants";
import Cookie from 'js-cookie'

/**
 * Add To Cart Action
 * @param  [productId, qty] [id product, jumlah total product yang di pesan]
 * @return none
 * Melakukan fetch API ke server untuk pengambilan product berdasarkan id product yang ada didalam database product kemudian dispatch action type CART_ADD_ITEM ke reducer cartReducer untuk menambahkan product kedalam keranjang.
 */
const addToCart = (productId, qty) => async (dispatch, getState) => {
 	try {
		const { data: product } = await axios.get(`http://localhost:5000/api/products/${productId}`);
		dispatch({ type: CART_ADD_ITEM, payload: {
			product: product._id,
			name: product.name,
			images: product.images,
			price: product.price,
			countInStock: product.countInStock,
			qty
		}});

		const {cart: {cartItems}} = getState(); // ambil cartItems di global state
		Cookie.set('cartItems', JSON.stringify(cartItems)); // set untuk menyimpan cookie cartItems yang menampung data json cari cartItems
	} catch(err) {

	}
}

/**
 * Remove From Cart Action
 * @param  [productId] [id product]
 * @return none
 * Melakukan dispatch action type CART_REMOVE_ITEM ke reducer cartReducer untuk menghapus product yang ada didalam cart/keranjang berdasarkan id product.
 */
const removeFromCart = (productId) => (dispatch, getState) => {
	dispatch({type: CART_REMOVE_ITEM, payload: productId });

	const {cart: {cartItems}} = getState(); // ambil cartItems di global state
	Cookie.set('cartItems', JSON.stringify(cartItems)); // set untuk menyimpan cookie cartItems yang menampung data json cari cartItems
}

/**
 * Save Shipping(pengiriman) Action
 * @param  [data] [data informasi pengiriman user yang memesan product berupa address, city, postalCode, country]
 * @return none
 * Melakukan dispatch action type CART_SAVE_SHIPPING ke reducer cartReducer untuk menambahkan data pengiriman barang berupa address, city, postalCode, country user yang memesan barang.
 */
const saveShipping = (data) => (dispatch) => {
	dispatch({type: CART_SAVE_SHIPPING, payload: data });
}

/**
 * Save Payment Action
 * @param  [data] [data informasi pembayaran yang dilakukan user]
 * @return none
 * Melakukan dispatch action type CART_SAVE_PAYMENT ke reducer cartReducer untuk menambahkan data pembayaran barang oleh user yang memesan barang.
 */
const savePayment = (data) => (dispatch) => {
	dispatch({type: CART_SAVE_PAYMENT, payload: data });
}

export { addToCart, removeFromCart, saveShipping, savePayment };