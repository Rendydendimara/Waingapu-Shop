const User = require('../models/user.model.js')
const jwt = require('jsonwebtoken');
const config = require('../config/keys.config.js');

module.exports = {

	/**
	 * [handlePostSingin description]
	 * @param  {[type]}   req  [description]
	 * @param  {[type]}   res  [description]
	 * @param  {Function} next [description]
	 * @return {[type]}        [description]
	 */
	async postSingin(req, res, next) {
		const signinUser = await User.findOne({
			email: req.body.email,
			password: req.body.password
		});

		if(signinUser) {

			jwt.sign(
			  {
				_id: signinUser.id,
				name: signinUser.name,
				email: signinUser.email,
				isAdmin: signinUser.isAdmin,
			  }, config.JWT_SECRET, {
			  	expiresIn:  '48h' // masa bertahan token 24*2 hour (2 hari)
			  }, (err, token) => {
				if(err) throw err;
					
				res.send({
					_id: signinUser.id,
					name: signinUser.name,
					email: signinUser.email,
					isAdmin: signinUser.isAdmin,
					token: token
				});
			});
		} else {
			res.status(422).send({msg: 'Invalid Email or Password'});
		}
	},

	/**
	 * [handlePostRegister description]
	 * @param  {[type]}   req  [description]
	 * @param  {[type]}   res  [description]
	 * @param  {Function} next [description]
	 * @return {[type]}        [description]
	 */
	async postRegister(req, res, next) {
		const user = new User({
			name: req.body.name,
			email: req.body.email,
			password: req.body.password
		});

		const newUser = await user.save();

		jwt.sign(
		  {
			_id: newUser.id,
			name: newUser.name,
			email: newUser.email,
			isAdmin: newUser.isAdmin,
		  }, config.JWT_SECRET, {
		  	expiresIn:  '48h' // masa bertahan token 24*2 hour (2 hari)
		  }, (err, token) => {
			if(err) throw err;
				
			res.send({
				_id: newUser.id,
				name: newUser.name,
				email: newUser.email,
				isAdmin: newUser.isAdmin,
				token: token
			});
		});
	},


	/**
	 * [handleUpdateProfile description]
	 * @param  {[type]}   req  [description]
	 * @param  {[type]}   res  [description]
	 * @param  {Function} next [description]
	 * @return {[type]}        [description]
	 */
	async updateProfile(req, res, next) {
	  	// cek apakah parameter id sama dengna id user saat ini dan cek apakah user saat ini adalah admin atau tidak
		if(req.params.id !== req.user._id && !req.user.isAdmin) {
	  		// user saat ini adalah admin
		  	// admin tidak bisa mengupdate datanya
		    return res.status(401).send({
		      success: false,
		      message: 'Can not update this user.',
		    });
		}

		const user = await User.findById(req.user._id);
		if (user) {
		    user.name = req.body.name || user.name;
		    user.email = req.body.email || user.email;
		    user.password = req.body.password || user.password;
		    const updatedUser = await user.save();

			jwt.sign(
			  {
			    _id: updatedUser.id,
			    name: updatedUser.name,
			    email: updatedUser.email,
			    isAdmin: updatedUser.isAdmin,
			  }, config.JWT_SECRET, {
			  	expiresIn:  '48h' // masa bertahan token 24*2 hour (2 hari)
			  }, (err, token) => {
				if(err) throw err;
					
			    res.send({
				    _id: updatedUser.id,
				    name: updatedUser.name,
				    email: updatedUser.email,
				    isAdmin: updatedUser.isAdmin,
					token: token
			    });
			});
	  	} else {
	    	res.status(404).send({ msg: 'User Not Found' });
		}
	},

	/**
	 * [handlerCreateAdmin description]
	 * @param  {[type]}   req  [description]
	 * @param  {[type]}   res  [description]
	 * @param  {Function} next [description]
	 * @return {[type]}        [description]
	 */
	async createAdmin(req, res, next) {
		try {
		  const user = new User({
		  	name: 'Rendy',
		  	email: 'r3ndydinar@gmail.com',
		  	password: 'pwd',
		  	isAdmin: true
		  });

		  const newUser = await user.save();
		  res.send(newUser);
		} catch(err) {
			res.send({msg: err.message});
		}
	}

}
