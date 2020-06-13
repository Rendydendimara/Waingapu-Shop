import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { logout, update } from '../actions/userAction';
import { useDispatch, useSelector } from 'react-redux';
import LoadingBox from '../components/LoadingBox';
import ErrorBox from '../components/ErrorBox';
import SuccessBox from '../components/SuccessBox';
import { listMyOrders } from '../actions/orderAction';

function ProfileScreen(props) {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();

  // ambil data userSignin, userUpdate dan myOrderList di global state 
  const userSignin = useSelector(state => state.userSignin);
  const userUpdate = useSelector(state => state.userUpdate);
  const myOrderList = useSelector(state => state.myOrderList);
  
  // extract
  const { userInfo } = userSignin;
  const { loading, success, error } = userUpdate;
  const { loading: loadingOrders, orders, error: errorOrders } = myOrderList;

  // handle saat user logout
  const logoutHandler = () => {
    // Lakukan dispatch ke action logout.
    dispatch(logout());
    // redirect
    props.history.push("/signin");
  }

  // handle saat submit
  const handleSubmit = (e) => {
    e.preventDefault();
    // Lakukan dispatch ke action update dengna memberikan argument berupa userId, email, name, password.
    dispatch(update({ userId: userInfo._id, email, name }))
  }

  // componentDidMount and componentDidUpdate(userInfo)
  useEffect(() => {
    // set apakah ada data userInfo
    // mencegah terjadi serangan hacker/missconfigurasi/clienterrror/amankandata
    if (userInfo) {
      // userInfo ada
      setEmail(userInfo.email);
      setName(userInfo.name);
    }
    // Lakukan dispatch ke action listMyOrders.
    dispatch(listMyOrders());
    return () => {

    };
  }, [userInfo])

  return (
    <div className="profile">
      <div className="profile-info content-margined">
        <div className="form">
          <form onSubmit={handleSubmit}>
            <ul className="form-container">
              <li>
                <h2>Profile</h2>
              </li>
              {error && (
                <li>
                  <ErrorBox message={error} />
                </li>
              )}
              {success && (
                <li>
                  <SuccessBox message={success} />
                </li>
              )}
              {loading && (
                <li>
                  <LoadingBox />
                </li>
              )}
              <li>
                <label htmlFor="name">Your name </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </li>
              <li>
                <label htmlFor="email">Email </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </li>
              <li>
                <label htmlFor="password">Password </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </li>
              <li>
                <button type="submit" className="button primary">Update Profile</button>
              </li>
              <li>
                <button
                  onClick={logoutHandler}
                  type="button"
                  className="button secondary text-center"
                >
                  Logout
                </button>
              </li>
            </ul>
          </form>
        </div>
      </div>
      <div className="profile-orders content-margined">
        {loadingOrders
          ? <LoadingBox /> : error ? <ErrorBox message={errorOrders} /> : (
            <div>
              <h2>Your Orders</h2>

              {orders.length === 0 ? (
                <div className="empty-list">
                  There is no orders.
                </div>
              )
                : (
                  <table>
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>DATE</th>
                        <th>TOTAL</th>
                        <th>PAID</th>
                        <th>DELIVERED</th>
                        <th>ACTION</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((order) => (
                        <tr key={order._id}>
                          <td>{order._id}</td>
                          <td>{order.createdAt}</td>
                          <td>{order.totalPrice}</td>
                          <td>{order.isPaid.toString()}</td>
                          <td>{order.isDelivered.toString()}</td>
                          <td><Link to={`/order/${order._id}?ref=/profile`}>Details</Link></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
            </div>
          )}
      </div>
    </div>
  );
}

export default ProfileScreen;