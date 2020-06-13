// Paypal button component

import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

const PaypalButton = (props) => {
  const [sdkReady, setSdkReady] = useState(false);

  const addPaypalSdk = async () => {
    const result = await axios.get('/api/config/paypal');
    const clientID = result.data;
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = `https://www.paypal.com/sdk/js?client-id=${clientID}`;
    script.async = true;
    script.onload = () => {
      setSdkReady(true);
    };
    script.onerror = () => {
      throw new Error('Paypal SDK could not be loaded.');
    };

    document.body.appendChild(script);
  };

  useEffect(() => {
    if (window !== undefined && window.paypal === undefined) {
      addPaypalSdk();
    } else if (
      window !== undefined
      && window.paypal !== undefined
      && props.onButtonReady
    ) {
      props.onButtonReady();
    }
  }, []);


  const createOrder = (data, actions) => actions.order.create({
    purchase_units: [
      {
        amount: {
          currency_code: 'USD',
          value: props.amount,
        },
      },
    ],
  });

  const onApprove = (data, actions) => actions.order
    .capture()
    .then((details) => {
      if (props.onSuccess) {
        props.onSuccess(data, details);
      }
    })
    .catch((err) => {
      console.log(err);
    });

  if (!sdkReady && window.paypal === undefined) {
    return (
      <div>Loading...</div>
    );
  }

  const Button = window.paypal.Buttons.driver('react', {
    React,
    ReactDOM,
  });

  return (
    <Button
      {...props}
      createOrder={(data, actions) => createOrder(data, actions)}
      onApprove={(data, actions) => onApprove(data, actions)}
      style={{
        layout: 'vertical',
        color: 'blue',
        shape: 'rect',
        label: 'paypal',
      }}
    />
  );
};

export default PaypalButton;
