// Render order screen

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import LoadingBox from '../components/LoadingBox';
import ErrorBox from '../components/ErrorBox';
import { detailsOrder, payOrder, deliverOrder } from '../actions/orderAction';
import PaypalButton from '../components/PaypalButton';
import { ORDER_PAY_RESET } from '../constants/orderConstants';

function OrderScreen(props) {
  // get global state
  const userSignin = useSelector((state) => state.userSignin);
  const orderDetails = useSelector((state) => state.orderDetails);
  const orderPay = useSelector((state) => state.orderPay);
  const orderDeliver = useSelector((state) => state.orderDeliver);  
  // extract
  const { userInfo } = userSignin;
  const { loading, error, order } = orderDetails;
  const { loading: loadingPay, error: errorPay, success: successPay } = orderPay;
  const { loading: loadingDeliver, error: errorDeliver, success: successDeliver } = orderDeliver;
  
  const dispatch = useDispatch();
  // ambil url /profile
  const redirect = props.location.search ? props.location.search.split('=')[1] : '/profile';

  // componentDidMount and componentDidUpdate(successPay, dispatch)
  useEffect(() => {
    if(userInfo === undefined) {
      props.history.push('/');
    }

    // cek apakah user sudah melakuakn pembayaran atau belum
    if (successPay && successDeliver) {
      // jika user berhasil melakukan pembayaran
      // redirect ke halaman profile user
      props.history.push("/profile");
    } else {
      // user belum melakukan pembayaran
      // lakukan dispatch action ke detailsOrder dengna memberikan argumen berupa id order 
      dispatch(detailsOrder(props.match.params.id));
    }
    return () => {
    };
  }, [successPay, dispatch]);

  // handle ketika berhasil melakukan pembayaran order
  const handleSuccessPayment = (paymentResult) => {
    // lakukan dispatch action ke payOrder dengan memberikan argumen berupa data order dan hasil keterangan pembayaran
    dispatch(payOrder(order, paymentResult));
  }

  // handle ketika berhasil melakukan pengiriman order
  const handleDeliverOrder = () => {
    // lakukan dispatch action ke deliverOrder dengan memberikan argumen berupa data order.
    dispatch(deliverOrder(order));
  };

  return (
    loading ? <LoadingBox /> : error ? <ErrorBox message={error} />
      : (
        <div>
          <div className="back-to-results">
            <Link to={redirect}> ‹ Back to list</Link>
            <br />
            <h3>
              Order
              {' '}
              {order._id}
            </h3>
          </div>

          <div className="placeorder">

            <div className="placeorder-info">
              <div>
                <h3>Shipping Address</h3>
                <div>
                  {order.shipping.address}
                  ,
                  {' '}
                  {order.shipping.city}
                  ,
                  {' '}
                  {order.shipping.country}
                  ,
                  {' '}
                  {order.shipping.postalCode}
                </div>
                <h3>
                  {order.isDelivered ? `Delivered At ${order.deliveredAt}` : 'Not Delivered'}

                </h3>
              </div>
              <div>
                <h3>Payment Method</h3>
                <div>
                  {order.payment.paymentMethod}
                </div>
                <h3>

                  {order.isPaid ? `Paid At ${order.paidAt}` : 'Not Paid'}
                </h3>
              </div>
              <div>

                <ul className="cart-list-container">
                  <li>
                    <h3>Order Items</h3>
                    <div>Price</div>
                  </li>
                  {order.orderItems.map((item) => (
                    <li key={item._id}>
                      <div className="cart-image">
                        <img src={item.image} alt="product" />
                      </div>
                      <div className="cart-name">
                        <div>
                          <Link to={`/product/${item.product}`}>{item.name}</Link>
                        </div>
                        <div className="cart-list-actions">
                          Qty:
                          {' '}
                          {item.qty}

                        </div>
                      </div>
                      <div className="order-price">
                        Rp.
                        {item.price}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="placeorder-actions">

              <ul>
                {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                  <li>

                    <button onClick={handleDeliverOrder} type="button" className="button primary">
                      Deliver Order
                    </button>

                  </li>
                )}

                {!order.isPaid
                  && (
                    <li>
                      <PaypalButton
                        amount="1.00"
                        onError={() => console.log('error')}
                        onSuccess={handleSuccessPayment}
                        onCancel={() => console.log('cancel')}
                      />
                    </li>
                  )}

                <li>
                  <h3>Order Summary</h3>
                </li>
                <li>
                  <div>Items:</div>
                  <div>
                    Rp.
                    {order.itemsPrice}
                  </div>
                </li>
                <li>
                  <div>Shipping:</div>
                  <div>{order.shippingPrice ? `Rp.${order.shippingPrice}` : 'Free'}</div>
                </li>
                <li>
                  <div>Tax:</div>
                  <div>
                    Rp.
                    {order.taxPrice}
                  </div>
                </li>
                <li>
                  <div>Order Total:</div>
                  <div>
                    Rp.
                    {order.totalPrice}

                  </div>
                </li>
              </ul> 

            </div>
          </div>
        </div>
      )
  );
}

export default OrderScreen;