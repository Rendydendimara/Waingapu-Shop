// Global Store  


import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import Cookies from 'js-cookie'

// import product reducer
import { productListReducer, 
	productDetailsReducer, 
	productSaveReducer, 
	productDeleteReducer, 
	productCategoryListReducer, 
	productReviewSaveReducer, 
	productDeleteReviewReducer,
} from './reducers/productReducers';

// import cart reducer
import { cartReducer } from './reducers/cartReducers';

// import user reducer
import { userSiginReducer, 
	userRegisterReducer, 
	userUpdateReducer
} from './reducers/userReducers';

// import order reducer
import { orderCreateReducer, 
	orderDetailsReducer, 
	orderListReducer, 
	myOrderListReducer, 
	orderPayReducer, 
	orderUpdateReducer, 
	orderDeleteReducer, 
	orderDeliverReducer, 
} from './reducers/orderReducers';


// ambil data cartItems yang tersimpan dalam cookie, jika tidak ada data cookie cartItems default kosong
const cartItems = Cookies.getJSON('cartItems') || [];

// ambil data userInfo yang tersimpan dalam cookie, jika tidak ada data cookie userInfo default null
const userInfo = Cookies.getJSON('userInfo') || null;

// initial state global
const initialState = {
  cart: {
    cartItems: Cookies.getJSON('cartItems') || [],
    shipping: {
      address: '1911, Sherbrooke', city: 'Montreal', country: 'Canada', postalCode: 'H2X1C4',
    },
    payment: { paymentMethod: 'paypal' },
  },
  userSignin: { userInfo: Cookies.getJSON('userInfo') },
};

// reducer 
const reducer = combineReducers({
	// product reducer
	productList: productListReducer,
	myOrderList: myOrderListReducer,
	productDetails: productDetailsReducer,
	productSave: productSaveReducer,
	productDelete: productDeleteReducer,
    productReviewSave: productReviewSaveReducer,
    productDeleteReview: productDeleteReviewReducer,
    productCategoryList: productCategoryListReducer,

	// user reducer
	userSignin: userSiginReducer,
	userRegister: userRegisterReducer,
	userUpdate: userUpdateReducer,
	
	// cart reducer
	cart: cartReducer,

	// order reducer
	orderCreate: orderCreateReducer,
	orderList: orderListReducer,
 	orderDetails: orderDetailsReducer,
	orderUpdate: orderUpdateReducer,
	orderDelete: orderDeleteReducer,
	orderPay: orderPayReducer,
    orderDeliver: orderDeliverReducer,

 });

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// membuat store global
const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)));

export default store;

