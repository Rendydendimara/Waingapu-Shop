// Product component

import React from 'react';
import { Link } from 'react-router-dom';
import Rating from './Rating';
import AwesomeSlider from 'react-awesome-slider';
import styles from 'react-awesome-slider/dist/styles.css';

const Product = (props) => (
  <li>
    <div className="product">
      <div className="product-image">
        <AwesomeSlider cssModule={styles}>
            {props.images.map((img, i) => (
              <img src={img} data-src={img} key={i}/>
            ))} 

        </AwesomeSlider>           
      </div>
      <div className="product-name">
        <Link
          to={`/product/${props._id}`}
        >
          {props.name}
        </Link>
      </div>
      <div className="product-brand">{props.brand}</div>
      <div className="product-price">
        Rp.
        {props.price}
      </div>
      <div className="product-rating">
        <Rating value={props.rating} />
        (
          {props.numReviews}
          {' '}
          Reviews
        )

      </div>
    </div>
  </li>
);
export default Product;
