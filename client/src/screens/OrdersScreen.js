// Render Orders Page - Only Admin

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { listOrders, deleteOrder } from '../actions/orderAction';
import LoadingBox from '../components/LoadingBox';
import ErrorBox from '../components/ErrorBox';

function AdminOrdersScreen(props) {
  // get global state
  const orderList = useSelector((state) => state.orderList);
  const orderUpdate = useSelector((state) => state.orderUpdate);
  const orderDelete = useSelector((state) => state.orderDelete);
  const userSignin = useSelector(state => state.userSignin);

  // extrack
  const { loading, orders, error } = orderList;
  const { loading: loadingDelete, success: successDelete, error: errorDelete } = orderDelete;
  const { userInfo } = userSignin;

  const dispatch = useDispatch();

  // componentDidMound and componentDidUpdate(successDelete)
  useEffect(() => {

    // uji konsidi agar hanya admin yang dapat mengakses halaman ini.
    if(userInfo === undefined) {
      props.history.push('/');
    } else {
      if(!userInfo.isAdmin) {
        props.history.push('/');      
      }
    }


    // dispatch action ke listOrders.
    dispatch(listOrders());
    return () => {
      //
    };
  }, [successDelete]);

  // handle delete order 
  const deleteHandler = (order) => {
    // dispatch action ke deleteOrder dengan memberikan argumen berupa id order.
    dispatch(deleteOrder(order._id));
  }
  return loading ? <LoadingBox /> : error ? <ErrorBox message={error} /> : (
    <div className="content content-margined">
      <h3>Orders</h3>
      {
        orders.length === 0 ? (
        <div className="empty-list">
          There is no orders.
        </div>
        ) : (         
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>USER</th>
              <th>PAID</th>
              <th>PAID AT</th>
              <th>DELIVERED</th>
              <th>DELIVERED AT</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.createdAt}</td>
                <td>{order.totalPrice}</td>
                <td>{order.user.name}</td>
                <td>{order.isPaid.toString()}</td>
                <td>{order.paidAt}</td>
                <td>{order.isDelivered.toString()}</td>
                <td>{order.deliveredAt}</td>
               <td>
                  <Link className="button" to={`/order/${order._id}?ref=/orders`}>Details</Link>
                  {' '}
                  <button type="button" onClick={() => deleteHandler(order)} className="button">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}  
    </div>
  );
}
export default AdminOrdersScreen;