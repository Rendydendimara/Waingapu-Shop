// Render Cart/Keranjang Page

import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { addToCart, removeFromCart } from '../actions/cartAction';
import { Link } from 'react-router-dom';

export default function CartScreen(props) {

	// mengambil data cart di global store
	const cart = useSelector(state => state.cart);
	const { cartItems } = cart;
	const productId = props.match.params.id; // ambil id params berupa id product 
	const dispatch = useDispatch();

	// Fungsi untuk menghandle penghapusan product di dalam keranjang
	const removeFromCartHandler = (productId) => {
		// Lakukan dispatch ke action removeFromCart dengan mengirimkan argumen berupa id product.
		dispatch(removeFromCart(productId));
	}

	// fungsi untku menghandle penambahan product kedalam keranjang
  const addToCartHandler = (productId, qty) => {
			// Lakukan dispatch ke action addToCart dengan mengirimkan argumen berupa id product dan jumlah product yang pesan.
    dispatch(addToCart(productId, Number(qty)));
  };


	// handle untuk redirect ke halaman /shipping
  const proccedToCheckout = () => {
		/**
		 * Redirect ke rute sigin
		 * Bertujuan untuk mengecek apakah user sudah login atau belum
		 * jika sudah login lanjut ke route /shipping
		 * jika belum wajib login
		 * format url = (urlUntukLogin?urlRedirectJikaSudahLogin)
		 */
    props.history.push('/signin?redirect=/shipping');
  };

	// componentDidMount
	useEffect(() => {
		// cek apakah ada id product params url
	    if (productId) {
				/**
				 * Ambil jumlah product/barang yang dipesan 
				 * jika tidak ada, default jumlah barang yang dipesan 1 buah
				 */
	      const qty = props.location.search ? Number(props.location.search.split('=')[1]) : 1; 
				// Lakukan dispatch ke action addToCart dengan mengirimkan argumen berupa id product dan jumlah product yang pesan.
	      dispatch(addToCart(productId, qty));
	    }

	}, []);

	return (
		<div className="cart">
			<div className="cart-list">
				<ul className="cart-list-container">
					<li>
						<div><h2>Shopping Cart</h2></div>
						<div>Price</div>
					</li>
					{cartItems.length === 0 && (
						<div> 
							Cart is empty {' '}   
							<Link to="/">Go Shopping</Link>
						</div>
					)} 
					{cartItems.map( (item, i) => (
						<li key={i}>
							<div className="cart-image">
					            { 
					              item.images !== undefined ?  item.images.map((img, i) => ( <img src={img} key={i} alt="item" /> ))  : null
					            }
							</div>
							<div className="cart-name">
								<div>
									<Link to={`/product/${item.product}`}>
										{ item.name }
									</Link>
								</div>
								<div className="cart-list-actions">
									Qty:
									<select value={item.qty} onChange={(e) => addToCartHandler(item.product, e.target.value)}>
										{[...Array(item.countInStock).keys()].map(x => <option value={x+1} key={x+1}>{x+1}</option>)}
									</select>
									{' '}
									<button type="button" className="button" onClick={() => removeFromCartHandler(item.product)}>
										Delete
									</button>
								</div>
							</div>
							<div className="cart-price">
								Rp. {item.price}
							</div>
						</li>
					))}
				</ul>
			</div>
			<div className="cart-checkout">
				<h3>
					Subtotal( {cartItems.reduce((a,c) => a + c.qty, 0)} {' '} items)
					: Rp. {cartItems.reduce((a,c) => a + c.price * c.qty, 0)}
				</h3>
				<button type="button" onClick={proccedToCheckout} className="button primary" disabled={cartItems.length === 0}>
					Proceed to Checkout
				</button>
			</div>
		</div>
	);
}