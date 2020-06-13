// Render Home Page/Landing Page

import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { listProducts } from '../actions/productAction';
import Product from '../components/Product';
import LoadingBox from '../components/LoadingBox';
import ErrorBox from '../components/ErrorBox';

export default function HomeScreen(props) {
    const [searchKeyword, setSearchKeyword] = useState('');
    const [sortOrder, setSortOrder] = useState('');
    // cek apakah produk yang dicari ingin ditampilkan berdasarkan categori atau tidak (default tidak)
    const category = props.match.params.id ? props.match.params.id : '';	
	
	// ambil data productList yang ada di global store
	const productList = useSelector(state => state.productList );
	const { products, loading, error } = productList; // extract data productList
	const dispatch = useDispatch(); // deklarasi variabel untuk melakukan dispatch 

	// componentDidMount and componentDidUpdate(category, dispatch)
	useEffect(() => {
		// lakukan dispatch action listProducts dengna memberikan argumen berupa category, searchKeyword dan sortOrder.
		dispatch(listProducts(category, searchKeyword, sortOrder));
	}, [dispatch, category]);


  // handle pencarian product 
	const searchHandler = (e) => {
    e.preventDefault();
	  // lakukan dispatch action listProducts dengan argument berupa category, searchKeyword, dan urutan product
    dispatch(listProducts(category, searchKeyword, sortOrder));
	};

  // handle urutan tampilan product
  const sortHandler = (e) => {
    setSortOrder(e.target.value);
	  // lakukan dispatch action listProducts dengan argument berupa category, searchKeyword, dan urutan product
    dispatch(listProducts(category, searchKeyword, sortOrder))
  }

	return (
		<div className="content">
			{category && (<h2>{category}</h2>)}
	    <ul className="filter">
	      <li>
	        <form onSubmit={searchHandler}>
	          <input value={searchKeyword} onChange={(e) => setSearchKeyword(e.target.value)} />
	          <button type="submit">Search</button>
	        </form>
	      </li>
	      <li>
	        Sort By {' '}
	        <select value={sortOrder} onChange={sortHandler}>
	          <option value="">Newest</option>
	          <option value="lowest">Lowest</option>
	          <option value="highest">Highest</option>
	        </select>
	      </li>
	    </ul>
	    {
	    	loading ? <LoadingBox /> : error ? <ErrorBox message={error}/>
	    	: products.length === 0 ? (
	    		<div className="empty-list">
	    			There is no products
	    		</div>
		    )	: (
				  <ul className="products">
            {products.map((product, i) => (
              <Product key={product._id} {...product} />
            ))}
          </ul>
      	)
      }
		</div>
	)
}