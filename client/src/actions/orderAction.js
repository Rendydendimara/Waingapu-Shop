// Order Action

import axios from "axios";
import {
  ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS, ORDER_CREATE_FAIL,
  ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS, ORDER_DETAILS_FAIL,
  ORDER_LIST_REQUEST, ORDER_LIST_SUCCESS, ORDER_LIST_FAIL,
  MY_ORDER_LIST_REQUEST, MY_ORDER_LIST_SUCCESS, MY_ORDER_LIST_FAIL,
  ORDER_DELETE_REQUEST, ORDER_DELETE_SUCCESS, ORDER_DELETE_FAIL,
  ORDER_UPDATE_REQUEST, ORDER_UPDATE_SUCCESS, ORDER_UPDATE_FAIL,
  ORDER_PAY_REQUEST, ORDER_PAY_SUCCESS, ORDER_PAY_FAIL,
} from '../constants/orderConstants';
import { getErrorMessage } from '../utils';


/**
 * Create Order Action
 * @param  [order]  [data pemesanan product/barang berupa jumlah pesanan barang, data pengiriman barang, metode pembayaran barang, harga ongkos pengiriman barang, harga pajak barang, total harga yang akan dibayar user 
 * @return none
 * Melakukan fetch API POST ke server untuk menambahkan data order barang/product kedalam database order kemudian dispatch action type yang sesuai dari hasil fetch API ke server ke reducer orderCreateReducer 
 */
const createOrder = (orderProduct) => async (dispatch, getState) => {
  dispatch({ type: ORDER_CREATE_REQUEST });
  try {
    const { userSignin: { userInfo: { token } } } = getState();
    const { data  } = await axios.post("http://localhost:5000/api/orders", orderProduct, {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    });
    // console.log(data.data)
    dispatch({ type: ORDER_CREATE_SUCCESS, payload: data.data });
  } catch (error) {
    dispatch({ type: ORDER_CREATE_FAIL, payload: getErrorMessage(error) });
  }
}

/**
 * List My Orders Action
 * @param  none     
 * @return none
 * Melakukan fetch API GET ke server untuk mendapatkan daftar order barang/product user saat ini (user login) didalam database order kemudian dispatch action type yang sesuai hasil dari fetch API ke server ke reducer myOrderListReducer 
 */
const listMyOrders = () => async (dispatch, getState) => {
  try {
    dispatch({ type: MY_ORDER_LIST_REQUEST });
    const { userSignin: { userInfo : { token }} } = getState();
    const { data } = await axios.get("http://localhost:5000/api/orders/mine", {
      headers: { 
        'Authorization': 'Bearer ' + token 
      }
    });
    dispatch({ type: MY_ORDER_LIST_SUCCESS, payload: data })
  } catch (error) {
    dispatch({ type: MY_ORDER_LIST_FAIL, payload: getErrorMessage(error) });
  }
}

/**
 * List Orders Action
 * @param  none  
 * @param  [category]   [categori product yang dipesan]  
 * @return none
 * Melakukan fetch API GET ke server untuk mendapatkan daftar data order barang/product didalam database kemudian dispatch action type yang sesuai dari hasil fetch API ker server ke reducer orderListReducer.
 */
const listOrders = (category) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_LIST_REQUEST, payload: category });
    const { userSignin: { userInfo : { token }} } = getState();
    const { data } = await axios.get("http://localhost:5000/api/orders", {
      headers:
        { 'Authorization': 'Bearer ' + token }
    });
    dispatch({ type: ORDER_LIST_SUCCESS, payload: data })
  } catch (error) {
    dispatch({ type: ORDER_LIST_FAIL, payload: getErrorMessage(error) });
  }
}

/**
 * Details Order Action
 * @param  [orderId]  [id order]  
 * @return none
 * Melakukan fetch API GET ke server untuk mendapatkan data order barang/product didalam database order berdasarkan id order kemudian dispatch action type yang sesua dari hasil fetch API ke server ke reducer orderDetailsReducer.
 */
const detailsOrder = (orderId) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_DETAILS_REQUEST, payload: orderId });
    const { userSignin: { userInfo : { token }} } = getState();
    const { data } = await axios.get("http://localhost:5000/api/orders/" + orderId, {
      headers:
        { 'Authorization': 'Bearer ' + token }
    });
    dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data })
  } catch (error) {
    dispatch({ type: ORDER_DETAILS_FAIL, payload: getErrorMessage(error) });
  }
}

/**
 * Pay Order Action
 * @param  [order, paymentResult]  [data order barang, data  hasil pembayaran barang]  
 * @return none
 * Melakukan fetch API PUT ke server untuk melakukan update data order barang/product didalam database order setelah user berhasil melakukan pembayaran kemudian dispatch action type yang sesuai dari hasil fetch API ke server ke reducer orderPayReducer.
 */
const payOrder = (order, paymentResult) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_PAY_REQUEST, payload: paymentResult });
    const { userSignin: { userInfo : { token }} } = getState();
    const { data: paidOrder } = await axios.put("http://localhost:5000/api/orders/" + order._id + "/pay", paymentResult, {
      headers:
        { 'Authorization': 'Bearer ' + token }
    });
    dispatch({ type: ORDER_PAY_SUCCESS, payload: paidOrder })
  } catch (error) {
    dispatch({ type: ORDER_PAY_FAIL, payload: getErrorMessage(error) });
  }
}

/**
 * Delete Order Action
 * @param  [order]  [data order barang]  
 * @return none
 * Melakukan fetch API DELETE ke server untuk menghapus data order barang/product didalam database berdasarkan id product kemudian dispatch action type yang sesuai dari hasil fetch API ke serve ke reducer orderDeleteReducer.
 */
const deleteOrder = (orderId) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_DELETE_REQUEST });
    const { userSignin: { userInfo : { token }} } = getState();
    const { data: deletedOrder } = await axios.delete("http://localhost:5000/api/orders/" + orderId, {
      headers:
        { 'Authorization': 'Bearer ' + token }
    });
    dispatch({ type: ORDER_DELETE_SUCCESS, payload: deletedOrder })
  } catch (error) {
    dispatch({ type: ORDER_DELETE_FAIL, payload: getErrorMessage(error) });
  }
}

/**
 * Update Order Action
 * @param  [order]  [data order yang sudah di ubah]  
 * @return none
 * Melakukan fetch API PUT ke server untuk mengubah data order barang/product didalam database order berdasarkan id order kemudian dispatch action type yang sesuai hasil dari fetch API ke server ke reducer orderUpdateReducer 
 */
const updateOrder = (order) => async (dispatch, getState) => {
  dispatch({ type: ORDER_UPDATE_REQUEST, payload: order });
  try {
    const { userSignin: { userInfo: { token } } } = getState();

    const { data: updatedOrder } = await axios.put(`http://localhost:5000/api/orders/${order._id}`, order, {
      headers: {
        'Authorization': 'Bearer ' + token,
      },
    });
    dispatch({ type: ORDER_UPDATE_SUCCESS, payload: updatedOrder });
  } catch (error) {
    dispatch({ type: ORDER_UPDATE_FAIL, payload: getErrorMessage(error) });
  }
};

/**
 * Deliver Order Action
 * @param  [order]  [data order yang sudah di ubah]  
 * @return none
 * Melakukan fetch API PUT ke server untuk mengubah data order barang/product didalam database order setelah berhasil melakukan pengiriman barang berdasarkan id order kemudian dispatch action type yang sesuai hasil dari fetch API ke server ke reducer orderDeliverReducer 
 */
const deliverOrder = (order) => async (dispatch, getState) => {
  dispatch({ type: ORDER_PAY_REQUEST, payload: {} });
  try {
    const { userSignin: { userInfo: { token } } } = getState();

    const { data: paidOrder } = await axios.put(`http://localhost:5000/api/orders/${order._id}/deliver`, {}, {
      headers: {
        'Authorization': 'Bearer ' + token,
      },
    });
    dispatch({ type: ORDER_PAY_SUCCESS, payload: paidOrder });
  } catch (error) {
    dispatch({ type: ORDER_PAY_FAIL, payload: getErrorMessage(error) });
  }
};


export { createOrder, detailsOrder, payOrder, listMyOrders, listOrders, deleteOrder, updateOrder, deliverOrder };