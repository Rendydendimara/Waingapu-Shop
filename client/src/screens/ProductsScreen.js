// Render List Product Page, Only Admin

import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { saveProduct, listProducts, deleteProduct } from '../actions/productAction';
import axios from 'axios';
import LoadingBox from '../components/LoadingBox';
import ErrorBox from '../components/ErrorBox';

export default function ProductsScreen(props) {
	const [modalVisible, setModalVisible] = useState(false);
	const [id, setId] = useState('');
	const [name, setName] = useState('');
	const [price, setPrice] = useState('');
	const [image1, setImage1] = useState('');
	const [image2, setImage2] = useState('');
	const [brand, setBrand] = useState('');
	const [category, setCategory] = useState('');
	const [countInStock, setCountInStock] = useState('');
	const [description, setDescription] = useState('');
	const dispatch = useDispatch();

	// mengambil data productList di global store
	const productList = useSelector(state => state.productList); 
	// mengambil data productSave di global store	
	const productSave = useSelector(state => state.productSave);
	// mengambil data productDelete di global store	
	const productDelete = useSelector(state => state.productDelete);
	const userSignin = useSelector(state => state.userSignin);

	// extract
	const { loading, products, error } = productList;
	const { loading: loadingSave, success: successSave, error: errorSave } = productSave;
	const { loading: loadingDelete, success: successDelete, error: errorDelete } = productDelete;
	const { userInfo } = userSignin;

	// handle ketika modal form untuk menambah/mengubah data product di open
	const openModal = (product) => {
		setModalVisible(true);
		setId(product._id);
		setName(product.name);
		setPrice(product.price);
		setImage1(product.images[0]);
		setImage2(product.images[1]);
		setBrand(product.brand);
		setCategory(product.category);
		setDescription(product.description);
		setCountInStock(product.countInStock);
	}

	// // handle ketika admin melakukan penambahan foto product
	const uploadImageFile = (e) => {
	    const file = document.getElementById('image').files[0];
	    const bodyFormData = new FormData();
	    bodyFormData.append('image', file);
	    axios.post('/upload', bodyFormData, {
	      headers: {
	        headers: { 'Content-Type': 'multipart/form-data' },
	      },
	    })
	    .then((response) => {
	        // setImage(response.data);
     	})
      	.catch((response) => {
	        alert('Upload Error');
    	});
	};


	// handle submit product
	const submitHandler = async e => {
		let images = [image1, image2];
		e.preventDefault();
		 // uploadImageFile();
		// lakukan dispatch action saveProduct dengan memberikan argument berupa data product.
		dispatch(saveProduct({_id: id, name, price, images, brand, category, countInStock, description}));
	}

	// handle delete product
	const deleteHandler = product => {
		// lakukan dispatch action deleteProduct dengan memberikan argument berupa id product.
		dispatch(deleteProduct(product._id));
	}
	// componentDidMount and componentDidUpdate(successSave, successDelete)
	useEffect(() => {
		// uji konsidi agar hanya admin yang dapat mengakses halaman ini.
		if(userInfo === undefined) {
			props.history.push('/');
		} else {
			if(!userInfo.isAdmin) {
				props.history.push('/');			
			}
		}


		// product berhasil di tambahkan/update
		if(successSave) {
			setModalVisible(false);
		}
		// lakukan dispatch action listProducts.
		dispatch(listProducts());
		return () => {
			
		};
	}, [successSave, successDelete]);
	
	return loading
    ? <LoadingBox /> : error ? <ErrorBox message={error} /> : (
      <div className="content content-margined">
        <div className="products-header">
          <h3>Products</h3>
          <button type="button" className="button primary" onClick={() => openModal({})}>
            Create Product
          </button>
        </div>
				{ modalVisible 
					&& (
	          <div className="modal">
	          	<h3>Create Product</h3>
              {errorSave && <ErrorBox message={error} />}
              {loading && <LoadingBox />}
              <form onSubmit={submitHandler}>
								<ul className="form-container">
									<li>
										<label htmlFor="name">
											Name
										</label>
										<input type="text" name="name" id="name" value={name} onChange={e => setName(e.target.value)} />
									</li>
									<li>
										<label htmlFor="price">
											Price
										</label>
										<input type="text" name="price" id="price" value={price} onChange={e => setPrice(e.target.value)} />
									</li>
					                <li>
					                    <label htmlFor="image1">
					                      Image (680 X 830)
					                    </label>
					                    <input required name="image1" id="image1" value={image1} onChange={(e) => { setImage1(e.target.value); }} placeholder="image1"/>
					                    <input required name="image1" id="image2" value={image2} onChange={(e) => { setImage2(e.target.value); }} placeholder="image2"/>
					                </li>

									<li>
										<label htmlFor="brand">
											Brand
										</label>
										<input type="text" name="brand" id="brand"  value={brand} onChange={e => setBrand(e.target.value)} />
									</li>
									<li>
										<label htmlFor="category">
											Category
										</label>
										<input type="text" name="category"  value={category} id="category" onChange={e => setCategory(e.target.value)} />
									</li>
									<li>
										<label htmlFor="description">
											Description
										</label>
										<textarea type="description"  value={description} name="description" id="description" onChange={e => setDescription(e.target.value)}></textarea>
									</li>
									<li>
										<label htmlFor="countInStock">
											Count In Stock
										</label>
										<input type="text" name="countInStock" id="countInStock" value={countInStock} onChange={e => setCountInStock(e.target.value)} />
									</li>
									<li>
										<button type="submit" className="button primary">{id ? "Update" : "Create Product"}</button>
									</li>
									<li>
										<button type="button" onClick={() => setModalVisible(false)} className="button secondary">Cancel</button>
									</li>
								</ul>
							</form>
						</div>
				)}
				{
					products.length === 0 ? (
		        <div className="empty-list">
		          There is no products.
		        </div>
		      	): (
			        <table className="table">
								<thead>
									<tr>
										<th>ID</th>
										<th>Name</th>
										<th>Price</th>
										<th>Category</th>
										<th>Brand</th>
										<th>Action</th>
									</tr>
								</thead>
								<tbody>
									{
										products.map((product, i) => (
											<tr key={i}>
												<td>{product._id}</td>
												<td>{product.name}</td>
												<td>{product.price}</td>
												<td>{product.category}</td>
												<td>{product.brand}</td>
												<td>
													{/*Button untuk membuka modal form product untuk mengubah product*/}
													<button className="button" onClick={() => openModal(product)}>Edit</button> {' '}
													{/*Button untuk membuka modal form product untuk menghapus product*/}
													<button className="button" onClick={() => deleteHandler(product)}>Delete</button>
												</td>
											</tr>
										))
									}
								</tbody>
							</table>
						)
					}
			</div>		
	)
}