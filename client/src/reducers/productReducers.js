import {
  PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL, PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS, PRODUCT_DETAILS_FAIL,
  PRODUCT_SAVE_REQUEST, PRODUCT_SAVE_FAIL, PRODUCT_SAVE_SUCCESS,
  PRODUCT_DELETE_REQUEST, PRODUCT_DELETE_SUCCESS, PRODUCT_DELETE_FAIL,
  PRODUCT_CATEGORY_LIST_REQUEST, PRODUCT_CATEGORY_LIST_SUCCESS, PRODUCT_CATEGORY_LIST_FAIL, PRODUCT_REVIEW_SAVE_FAIL, PRODUCT_REVIEW_SAVE_SUCCESS, PRODUCT_REVIEW_SAVE_REQUEST, PRODUCT_REVIEW_SAVE_RESET,
  PRODUCT_DELETE_REVIEW_REQUEST,
  PRODUCT_DELETE_REVIEW_SUCCESS,
  PRODUCT_DELETE_REVIEW_FAIL,
  PRODUCT_DELETE_REVIEW_RESET,
} from '../constants/productConstants';

// handle productCategoryListReducer 
function productCategoryListReducer(state = { categories: [] }, action) {
  switch (action.type) {
    case PRODUCT_CATEGORY_LIST_REQUEST:
      return { loading: true };
    case PRODUCT_CATEGORY_LIST_SUCCESS:
      // tambahkan data product berdasarkan categori
      return { loading: false, categories: action.payload };
    case PRODUCT_CATEGORY_LIST_FAIL:
      return { loading: false, error: action.payload };
    default: return state;
  }
}


// handle productListReducer 
function productListReducer(state = { products: [] }, action) {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return { loading: true };
    case PRODUCT_LIST_SUCCESS:
      // tambahkan daftar product
      return { loading: false, products: action.payload };
    case PRODUCT_LIST_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state;
  }
}

// handle productDetailsReducer 
function productDetailsReducer(state = { product: { reviews: []} }, action) {
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
      return { loading: true };
    case PRODUCT_DETAILS_SUCCESS:
      // tambahkan data detail product
      return { loading: false, product: action.payload };
    case PRODUCT_DETAILS_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state;
  }
}

// handle productSaveReducer 
function productSaveReducer(state = {}, action) {
  switch (action.type) {
    case PRODUCT_SAVE_REQUEST:
      return { loading: true };
    case PRODUCT_SAVE_SUCCESS:
      // tambahkan data detail product yang berhasil ditambahkan kedalam database 
      return { loading: false, success: true, products: action.payload };
    case PRODUCT_SAVE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state;
  }
}

// handle productReviewSaveReducer
function productReviewSaveReducer(state = {}, action) {
  switch (action.type) {
    case PRODUCT_REVIEW_SAVE_REQUEST:
      return { loading: true };
    case PRODUCT_REVIEW_SAVE_SUCCESS:
      // tambahkan data review yang baru saja ditambahkan pada product
      return { loading: false, success: true, products: action.payload };
    case PRODUCT_REVIEW_SAVE_FAIL:
      return { loading: false, error: action.payload };
    case PRODUCT_REVIEW_SAVE_RESET:
      return { };
    default: return state;
  }
}

// handle productDeleteReducer 
function productDeleteReducer(state = {}, action) {
  switch (action.type) {
    case PRODUCT_DELETE_REQUEST:
      return { loading: true };
    case PRODUCT_DELETE_SUCCESS:
      return { loading: false, products: action.payload, success: true };
    case PRODUCT_DELETE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state;
  }
}

// handle productDeleteReviewReducer
function productDeleteReviewReducer(state = {}, action) {
  switch (action.type) {
    case PRODUCT_DELETE_REVIEW_REQUEST:
      return { loading: true };
    case PRODUCT_DELETE_REVIEW_SUCCESS:
      return { loading: false, products: action.payload, success: true };
    case PRODUCT_DELETE_REVIEW_FAIL:
      return { loading: false, error: action.payload }
    case PRODUCT_DELETE_REVIEW_RESET:
      return { loading: false, success: false };
    default:
      return state;
  }
}


export { productListReducer, productDetailsReducer, productSaveReducer, productDeleteReducer, productReviewSaveReducer, productCategoryListReducer, productDeleteReviewReducer };
