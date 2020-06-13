// Product Action

import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_SAVE_REQUEST,
  PRODUCT_SAVE_SUCCESS,
  PRODUCT_SAVE_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_CATEGORY_LIST_REQUEST,
  PRODUCT_CATEGORY_LIST_SUCCESS,
  PRODUCT_CATEGORY_LIST_FAIL,
  PRODUCT_REVIEW_SAVE_REQUEST,
  PRODUCT_REVIEW_SAVE_SUCCESS,
  PRODUCT_REVIEW_SAVE_FAIL,
  PRODUCT_DELETE_REVIEW_REQUEST,
  PRODUCT_DELETE_REVIEW_SUCCESS,
  PRODUCT_DELETE_REVIEW_FAIL,
} from '../constants/productConstants';
import { getErrorMessage } from '../utils';

import axios from 'axios';

/**
 * List Product Action
 * @param  [category, searchKeyword, sortOder]  [kategoriBarang, namaPencarianBarang, urutanBarang]
 * @return none
 * Melakukan fetch API ke server untuk pengambilan daftar product yang ada didalam database product berdasarkan kategori (optional), nama product(optional), dan urutan product(optional (default product akan ditampilkan secara yang paling baru ditambahkan) kemudian dispatch  action type yang sesuai dari hasil fetch API ke server ke reducer productListReducer.
 */
const listProducts = (category = '', searchKeyword = '', sortOrder = '') => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_LIST_REQUEST });
    const { data } = await axios.get(`http://localhost:5000/api/products?category=${category}&search=${searchKeyword}&sort=${sortOrder}`);
    dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
  }
  catch (error) {
    dispatch({ type: PRODUCT_LIST_FAIL, payload: getErrorMessage(error.message )});
  }
}

/**
 * list Product Categories Action
 * @param  none
 * @return none
 * Melakukan fetch API ke server untuk pengambilan product berdasarkan kategorinya yang ada didalam database product kemudian dispatch  action type yang sesuai dari hasil fetch API ke server ke reducer productCategoryListReducer.
 */

const listProductCategories = () => async (dispatch) => {
  dispatch({ type: PRODUCT_CATEGORY_LIST_REQUEST, loading: true });
  try {
    const result = await axios.get('http://localhost:5000/api/products/categories');
    dispatch({ type: PRODUCT_CATEGORY_LIST_SUCCESS, payload: result.data });
  } catch (error) {
    dispatch({ type: PRODUCT_CATEGORY_LIST_FAIL, payload: getErrorMessage(error) });
  }
};

/**
 * Details Product Action
 * @param  [productId]  [id product]
 * @return none
 * Melakukan fetch API ke server untuk pengambilan product berdasarkan id product yang ada didalam database product kemudian dispatch  action type yang sesuai dari hasil fetch API ke server ke reducer productDetailsReducer.
 */
const detailsProduct = (productId) => async (dispatch) => {
	try {
		dispatch({type: PRODUCT_DETAILS_REQUEST });
		const { data } = await axios.get(`http://localhost:5000/api/products/${productId}`);
    console.log(data);
		dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data });
	} catch(error){
    dispatch({ type: PRODUCT_DETAILS_FAIL, payload: getErrorMessage(error.message )});
	}
}

/**
 * Save Product Action
 * @param  [product]  [data product baru yang akan ditambahkan ke dalam database product]
 * @return none
 * Melakukan fetch API ke server untuk post/put product didalam database product kemudian dispatch action type yang sesuai dengan hasil fetch API ke server ke reducer productSaveReducer 
 */
const saveProduct = (product) => async (dispatch, getState) => {
  try {
    dispatch({type: PRODUCT_SAVE_REQUEST, payload: product});
    const {userSignin: { userInfo }} = getState(); 

    /**
     * Cek apakah product yang disave sudah ada atau belum (post/update).
     * Ini bertujuan ini melihat apakah product yang ditambahkan berupa product baru atau product yang sudah ada kemudian di update/edit
     */
    if(product._id) {
      // jika product sudah ada, update product (put)
      const {data: savedProduct} = await axios.put(`http://localhost:5000/api/products/${product._id }`, product, {
        headers: { // melakukan fetch api ke server untuk memput product dengan memberikan header Authorization bernilai : 'Bearer+serInfo.token'
          'Authorization': 'Bearer ' + userInfo.token
        }
      });
      dispatch({type: PRODUCT_SAVE_SUCCESS, payload: savedProduct});
    } else {
      // jika product belum ada, create product (post)
      const {data: savedProduct} = await axios.post('http://localhost:5000/api/products', product, {
        headers: { // melakukan fetch api ke server untuk mempost product dengan memberikan header Authorization bernilai : 'Bearer+serInfo.token'
          'Authorization': 'Bearer ' + userInfo.token
        }
      });
      dispatch({type: PRODUCT_SAVE_SUCCESS, payload: savedProduct});
    }
  } catch(error) {
    dispatch({type: PRODUCT_SAVE_FAIL, payload: getErrorMessage(error.message)});
  }
}

/**
 * Save Product Review Action
 * @param  [productId, review]  [id product yang direview, data review(body, rating)]
 * @return none
 * Melakukan fetch API PUT ke server untuk menambahankan data review pada product berdasarkan id product yang direview didalam database product kemudian dispatch  action type yang sesuai dari hasil fetch API ke server ke reducer productReviewSaveReducer.
 */ 
const saveProductReview = (productId, review) => async (dispatch, getState) => {
  dispatch({ type: PRODUCT_REVIEW_SAVE_REQUEST, payload: review });
  try {
    const { userSignin: { userInfo: { token } } } = getState();
    const { data: savedReview } = await axios.post(`http://localhost:5000/api/products/${productId}/reviews`, review, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch({ type: PRODUCT_REVIEW_SAVE_SUCCESS, payload: savedReview });
  } catch (error) {
    dispatch({ type: PRODUCT_REVIEW_SAVE_FAIL, payload: getErrorMessage(error) });
  }
};
 
/**
 * Delete Product Action
 * @param  [productId]  [id product]
 * @return none
 * Melakukan fetch API DELETE ke server untuk delete product berdasarkan id product didalam database product kemudian dispatch  action type yang sesuai dari hasil fetch API ke server ke reducer productDeleteReducer.
 */ 
const deleteProduct = (productId) => async (dispatch, getState) => {
  try {
    // ambil informasi user yang ada di properti userSigin.userInfo dalam global state    
    const {userSignin: { userInfo }} = getState(); 
    dispatch({type: PRODUCT_DELETE_REQUEST, payload: productId});
    const { data: deletedProduct } = await axios.delete(`http://localhost:5000/api/products/${productId}`, {
        headers: { 
          'Authorization': 'Bearer ' + userInfo.token
        }
      });
    dispatch({ type: PRODUCT_DELETE_SUCCESS, payload: deletedProduct, success: true });
  } catch(error){
    dispatch({ type: PRODUCT_DELETE_FAIL, payload: getErrorMessage(error.message )});
  }
}

const deleteProductReview = (productId, reviewId) => async(dispatch, getState) => {
  try {
    // ambil informasi user yang ada di properti userSigin.userInfo dalam global state    
    const {userSignin: { userInfo }} = getState(); 
    dispatch({type: PRODUCT_DELETE_REVIEW_REQUEST, payload: productId});
    const { data } = await axios.delete(`http://localhost:5000/api/products/${productId}/reviews/${reviewId}`, {
        headers: { 
          'Authorization': 'Bearer ' + userInfo.token
        }
      });
    // console.log(data);
    dispatch({ type: PRODUCT_DELETE_REVIEW_SUCCESS, payload: data, success: true });
  } catch(error){
    dispatch({ type: PRODUCT_DELETE_REVIEW_FAIL, payload: getErrorMessage(error.message )});
  }

}

export { listProducts, detailsProduct, saveProduct, deleteProduct, saveProductReview, listProductCategories, deleteProductReview };

