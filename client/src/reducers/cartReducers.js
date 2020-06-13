import {
  CART_ADD_ITEM, CART_REMOVE_ITEM, CART_SAVE_SHIPPING, CART_SAVE_PAYMENT, CART_EMPTY_ITEMS,
} from '../constants/cartConstants';


// handle cartReducer 
function cartReducer(state = { cartItems: [] }, action) {
  switch(action.type) {
  	case CART_ADD_ITEM:
  	  const item = action.payload;

  	  // cek apakah product sudah ada didalam daftar keranjang atau belum 
  	  const product = state.cartItems.find(x => x.product === item.product);
  	  if(product) {
  	  	/**
         * Product sudah ada didalam daftar keranjang
         * Update product kedalam keranjang jika product yang ditambahkan sebelumnya melakukan penambahan total pembelian product.
         */
  	  	return {
  	  		cartItems: state.cartItems.map(x => x.product === product.product ? item : x)
  	  	};
			}
			/**
       * Product belum ada didalam daftar keranjang
       * Tambahkan ke dalam data cartItems
       */ 
	  	return { cartItems: [...state.cartItems, item] };
    case CART_REMOVE_ITEM: 
      // menghapus product dalam daftar cart
      return { cartItems: state.cartItems.filter(x => x.product !== action.payload)};  
    case CART_EMPTY_ITEMS:
      // reset cart
      return { cartItems: [], shipping: {}, payment: {} };
    case CART_SAVE_SHIPPING:
      // tambahkan data pengriman
      return {...state, shipping: action.payload }
    case CART_SAVE_PAYMENT:
      // tambahkan data pembayaran
      return {...state, payment: action.payload }
  	default: 
  		return state;
  }
}

export { cartReducer };
 