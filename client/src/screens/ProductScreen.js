// Render Single Product Page

import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import LoadingBox from '../components/LoadingBox';
import ErrorBox from '../components/ErrorBox';
import { detailsProduct, saveProductReview, deleteProductReview } from '../actions/productAction';
import Rating from '../components/Rating';
import { PRODUCT_REVIEW_SAVE_RESET, PRODUCT_DELETE_REVIEW_RESET } from '../constants/productConstants';


export default function ProductScreen(props) {
	const [qty, setQty] = useState(1);
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState('');
  const [isReviewed, setIsReviewed ] = useState(false)
	const dispatch = useDispatch();
	
	// ambil data  di global state 
	const productDetails = useSelector(state => state.productDetails);
  const productDeleteReview = useSelector(state => state.productDeleteReview);
  const productReviewSave = useSelector((state) => state.productReviewSave);
  const userSignin = useSelector(state => state.userSignin);
	// extract data 
	const { product, loading, error } = productDetails; 
 	const { loading: loadingSaveReview, error: errorSaveReview, success: successSaveReview } = productReviewSave;
  const { loading: loadingDeleteReview, error: errorDeleteReview, success: successDeleteReview } = productDeleteReview;
  const { userInfo } = userSignin;


	// compoenentDidMount and componentDidUpdate(successSaveReview)
	useEffect(() => {
		// cek apakah user berhasil melakukan review product atau tidak
		if (successSaveReview) {
			// user berhasil melakukan review product			
      setComment('');
      setRating('');
      alert('Review Submitted');
      // dispatch action type PRODUCT_REVIEW_SAVE_RESET ke reducer productReviewSaveReducer 
      dispatch({ type: PRODUCT_REVIEW_SAVE_RESET });

		} else {
			// user tidak melakukan review product
			// lakukan dispatch action detailsProduct dengna memberikan argumen berupa id product
      dispatch(detailsProduct(props.match.params.id));      
		}


		return () => {
			// componentWillUnmount	
		};
	}, [successSaveReview, successDeleteReview]);

	// fungsi untuk menghandle penambahan product ke dalam cart/keranjang 
	const addToCart = () => {
		// redirect
		props.history.push(`/cart/${props.match.params.id}?qty=${qty}`)
	}

  const submitHandler = async (e) => {
    e.preventDefault();
    let isReviewed = true
    await product.reviews.map(review => {
      if(review.user === userInfo._id) isReviewed = false
    })

    if(!isReviewed) {
      setComment('');
      setRating('');      
      alert('Review Hanya Dapat Dilakukan Sekali Saja')
    } else {
      // lakukan dispatch action ke saveProductReview dengan memberikan arugmen berupa id product dan data review (comment, rating)
      dispatch(saveProductReview(props.match.params.id, { comment, rating }));
    }
  };

  const handleDeleteReview = (productId, review) => {
      // lakukan dispatch action ke saveProductReview dengan memberikan arugmen berupa id product dan data review (comment, rating)
      dispatch(deleteProductReview(productId, review._id));
  }

	return (	
		loading ? <LoadingBox /> : error ? <ErrorBox message={error} />
    : (
      <div>
        <div className="back-to-results">
          <Link to="/"> ‹ Back to results</Link>
        </div>
        <div className="details">
          <div className="details-image">
            { 
              product.images !== undefined ?  product.images.map((img, i) => ( <img src={img} key={i} alt="product" /> ))  : null
            }
          </div>
          <div className="details-info">
            <ul>
              <li>
                <h3>{product.name}</h3>
              </li>
              <li>
                <Rating value={product.rating} />
                ( {product.numReviews} {' '} Customer reviews )
              </li>
              <li>
                Price:
                {' '}
                <span className="price">
                  {' '} Rp.{product.price}
                </span>
              </li>
              <li>
                Description:
                <div>{product.description}</div>
              </li>
            </ul>
          </div>
          <div className="details-actions">
            <ul>
              <li>
                Price: Rp.
                {product.price}
              </li>
              <li>
                State:
                {' '}
                {product.countInStock > 0 ? 'InStock' : 'Unavailable'}
              </li>
              {
                product.countInStock && (
                  <li>
                    Qty:
                    <select value={qty} onChange={(e) => setQty(e.target.value)}>
                      {[...Array(product.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                  </li>
                )
              }
              {
                product.countInStock && (
                  <li>
                    <button type="button" onClick={addToCart} className="button primary">
                      Add to Cart
                    </button>
                  </li>
                )
              }
            </ul>
          </div>
        </div>
        <div className="content-margined">
          <h2>Reviews</h2>
          {product.reviews.length === 0 && <div>There is no review.</div>}
          <ul className="review">
            {
              product.reviews.map((review) => (
                <li key={review._id}>
                  <div><b>{review.name}</b></div>
                  <div className="rating-container">
                    {userInfo !== undefined && review.user === userInfo._id ? (<button onClick={() => handleDeleteReview(product._id, review)}>Delete Review</button>) : ''}
                    <Rating value={review.rating} />
                    <div>
                      {review.createdAt.substring(0, 10)}
                    </div>
                  </div>
                  <div>
                    {review.comment}
                  </div>
                </li>
              ))
            }
            <li>
              <h3>Write a customer reviews</h3>
              {userInfo 
                ? (
                  <form onSubmit={submitHandler}>
                    <ul className="form-container">
                      <li>
                        <label htmlFor="rating">Rating</label>
                        <select required value={rating} name="rating" id="rating" onChange={(e) => setRating(e.target.value)}>
                          <option value="">Select</option>
                          <option value="1">1 = Poor</option>
                          <option value="2">2 = Fair</option>
                          <option value="3">3 = Good</option>
                          <option value="4">4 = Very Good</option>
                          <option value="5">5 = Excellent</option>
                        </select>
                      </li>
                      <li>
                        <label htmlFor="comment">Comment</label>
                        <textarea required value={comment} name="comment" id="comment" onChange={(e) => setComment(e.target.value)} />
                      </li>
                      <li>
                        <button type="submit" className="button primary">Submit</button>
                      </li>
                    </ul>
                  </form>
             	 ) : ( <div> Please {' '} <Link to="/signin">Signin</Link> {' '} to write a review. </div>)
            	}
         	 </li>
    	    </ul>
     		</div>
    	</div>
 	  )
  );
}