const jwt = require('jsonwebtoken');
const config = require('../config/keys.config.js');

module.exports = {
	// fungsi untuk mengetahui apakah user seorang admin atau bukan
	isAdmin: async (req, res, next) => {
		// cek informasi user dan status admin user
		if(req.user && req.user.isAdmin) {
			// informasi user valid dan user seorang admin
			return next();
		} 
		// jika user bukan seorang admin
		return res.status(401).send({
			success: false,
			msg: 'Admin Token is not valid'
		});
	},
	
	// fungsi untuk mengecek apakah user sudah login atau belum
	isAuth: async (req, res, next) => {
		let token = req.headers['x-access-token'] || req.headers.authorization;
		// cek apakah header reqeust ada informasi user dan token atau tidak
		if(token) {
			// ada token
		    if (token.startsWith('Bearer ')) {
				token = token.slice(7, token.length); // ambil token
		    }

			// validasi token dengan jwt
			jwt.verify(token, config.JWT_SECRET, (err, decode) => {
				// cek apakah token valid atau tidak
				if(err) {
					console.log(err);
					// token tidak valid
					return res.status(401).send({
						success: false,
						msg: 'Token is not valid',
					});
				} 
				// token valid
				req.user = decode;
				next();
			});
		} else {
			// jika tidak ada informasi user dan token
			return res.status(401).send({
				success: false,
				msg: 'Token is not supplied.',
			});
		}
	},
}