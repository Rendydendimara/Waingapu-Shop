// Order Model Database 

const mongoose = require('mongoose');

const addressSchema = {
	address: {
		type: String,
		required: true
	}, 
    city: { 
    	type: String, 
    	required: true 
    },
    postalCode: { 
    	type: String, 
    	required: true 
    },
    country: { 
    	type: String, 
    	required: true
    } 
};

const paymentResultSchema = {
  	orderID: { type: String },
	payerID: { type: String },
	paymentID: { type: String },
};


const paymentSchema = {
  	paymentResult: paymentResultSchema,
	paymentMethod: { type: String, enum: ['paypal'], required: true },
};

const orderItemSchema = new mongoose.Schema({
	name: { 
		type: String, 
	  	required: true 
	},
	qty: { 
	  	type: Number, 
	  	required: true 
	},
	images: [{  
	    type: String,
	    // required: true
	}],
	price: { 
	  	type: String, 
	  	required: true 
	},
	product: {
	    type: mongoose.Schema.Types.ObjectId,
	    ref: 'Product',
	    required: true
	},
});

const orderSchema = new mongoose.Schema({
	user: { 
		type: mongoose.Schema.Types.ObjectId, 
		ref: 'User', 
		required: true 
	},
	orderItems: [orderItemSchema], // array of bject
	shipping: addressSchema,
	payment: paymentSchema,
	itemsPrice: { 
		type: Number,
		required: true,
		min: 0 
	},
	taxPrice: { 
		type: Number, 
		required: true,
		min: 0 
	},
	shippingPrice: { 
		type: Number, 
		required: true,
		min: 0 
	},
	totalPrice: { 
		type: Number, 
		required: true,
		min: 0 
	},
	isPaid: { 
		type: Boolean, 
		default: false 
	},
	paidAt: { 
		type: Date 
	},
	isDelivered: { 
		type: Boolean, 
		default: false 
	},
	deliveredAt: { 
		type: Date 
	},
}, {
  timestamps: true
});

const orderModel = mongoose.model("Order", orderSchema);
module.exports = orderModel;









