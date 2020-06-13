import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { listProductCategories } from './actions/productAction';

import HomeScreen from './screens/HomeScreen';
import DetailProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import SigninScreen from './screens/SigninScreen';
import RegisterScreen from './screens/RegisterScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import ProfileScreen from './screens/ProfileScreen';
import OrderDetailsScreen from './screens/OrderScreen';
import AdminProductsScreen from './screens/ProductsScreen';
import AdminOrdersScreen from './screens/OrdersScreen';
import LoadingBox from './components/LoadingBox';
import ErrorBox from './components/ErrorBox';
import PrivateRoute from './components/PrivateRoute';

// Next: - Review hanya bisa dilakukan sekali saja
//       - gambar product bisa diupload
//       - design ulang
//       - format tampilan indonesia, harga barang

function App () {
  // ambil data userSignin, productCategoryList, cart yang ada di global store
  const userSignin = useSelector(state => state.userSignin);
  const productCategoryList = useSelector((state) => state.productCategoryList);
  const cart = useSelector((state) => state.cart);
  // extract
  const { userInfo } = userSignin;
  const { cartItems } = cart;
  const { categories, loading, error } = productCategoryList;

  const dispatch = useDispatch();

  // fungsi untuk membuka sidebar menu 
  const openSidebar = () => {
    document.querySelector(".sidebar").classList.add("open");
  }

  // fungsi untuk menutup sidebar menu 
  const closeSidebar = () => {
    document.querySelector(".sidebar").classList.remove("open");
  }

  // componentDidMount()
  useEffect(() => {
    // lakukan dispatch ke action listProductCategories
    dispatch(listProductCategories());
    return () => {
      
    };
  }, []);

  return (
    <Router> {/* memprovide untuk melakukan routing*/}
      <div className="grid-container">
        {/*Header*/}
        <header className="header">
          <div className="brand">  
            <button onClick={openSidebar}> &#9776; </button>
            <Link to="/">WGP SHOP</Link>
          </div>
          <div>
            {cartItems.length !== 0 && <div className="badge">{cartItems.length}</div>}
            <Link className="header-links" to="/cart">Cart</Link>
            {
              userInfo ? (
                <React.Fragment>
                  <Link className="header-links" to="/profile"> {userInfo.name} </Link>
                  {userInfo.isAdmin && (
                    <div className="dropdown">
                      <Link className="header-link" to="#admin"> Admin </Link>
                      <ul className="dropdown-content">
                        <li>
                          <Link className="header-link" to="/products"> Products </Link>
                        </li>
                        <li>
                          <Link className="header-link" to="/orders"> Orders </Link>
                        </li>
                      </ul>
                    </div>
                  )}
                </React.Fragment>
              ) : <Link className="header-link" to="/signin"> Sign in </Link>
            }
          </div>
        </header>
        {/*Sidebar*/}
        <aside className="sidebar">
          <ul className="categories">
            <li>
              <h3>Shopping Categories</h3>
              <button type="button" className="sidebar-menu-close" onClick={closeSidebar}>x</button>
            </li>
            {loading
              ? <li><LoadingBox /></li> : error 
              ? <li><ErrorBox message={error} /></li>
                : categories.length === 0 
              ? (
                  <li className="empty-list">
                    There is no categories.
                  </li>
                ) : categories.map((x) => (
                  <li key={x}>
                    <Link onClick={closeSidebar} to={`/category/${x}`}>{x}</Link>
                  </li>
                ))}
          </ul>
        </aside>
        <main onClick={closeSidebar} className="main">
            {/*Routing App*/}
            <Route path="/signin" component={SigninScreen} />
            <Route path="/register" component={RegisterScreen} />
            <Route path="/product/:id" component={DetailProductScreen} />
            <Route path="/profile" component={ProfileScreen} />
            <Route path="/products" component={AdminProductsScreen} />
            <Route path="/shipping" component={ShippingScreen} />
            <Route path="/payment" component={PaymentScreen} />
            <Route path="/placeorder" component={PlaceOrderScreen} />
            <Route path="/cart/:id?" component={CartScreen} />
            <Route path="/orders" component={AdminOrdersScreen} />
            <Route path="/category/:id" component={HomeScreen} />
            <Route path="/order/:id" component={OrderDetailsScreen} />            
            <Route path="/" exact={true} component={HomeScreen}/>
        </main>
        <footer className="footer">
          All rigth reserved
        </footer>    
      </div>
    </Router>
  );
}

export default App;
