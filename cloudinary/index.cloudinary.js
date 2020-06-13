const cloudinary = require('cloudinary');
const crypto = require('crypto');
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
	cloud_name: 'r3ndydinar',
	api_key: '516384945497356',
	api_secret: '9dSc028kbXeZp2bN7v37yEK5Ytc' //process.env.CLOUDINARY_SECRET
});

const storage = new CloudinaryStorage({
	// setup penyimpanan dan apa yang akan disimpan di cloudynar, nama, ekstensi, folder, dan lain2
	cloudinary,
	folder: 'waingapu-shop-zone', // folder penyimpanan
	allowedFormats: ['jpeg', 'jpg', 'png'], // format file yang diperbolehkan untuk di simpan
	filename: function (req, file, cb) {
		// setting nama file
		// nama file yang unique
  	let buf = crypto.randomBytes(16);
  	buf = buf.toString('hex');
  	let uniqFileName = file.originalname.replace(/\.jpeg|\.jpg|\.png/ig, ''); 
  	uniqFileName += buf;
    cb(undefined, uniqFileName );
  }	
});

module.exports = {
	cloudinary, 
	storage
};
// const cloudinary = require('cloudinary');
// const crypto = require('crypto');

// cloudinary.config({
// 	cloud_name: 'r3ndydinar',
// 	api_key: '516384945497356',
// 	api_secret: '9dSc028kbXeZp2bN7v37yEK5Ytc' //process.env.CLOUDINARY_SECRET
// });

// const cloudinaryStorage = require('multer-storage-cloudinary');
// const storage = cloudinaryStorage({
// 	// setup penyimpanan dan apa yang akan disimpan di cloudynar, nama, ekstensi, folder, dan lain2
// 	cloudinary,
// 	folder: 'waingapu-shop-zone', // folder penyimpanan
// 	allowedFormats: ['jpeg', 'jpg', 'png'], // format file yang diperbolehkan untuk di simpan
// 	filename: function (req, file, cb) {
// 		// setting nama file
// 		// nama file yang unique
//   	let buf = crypto.randomBytes(16);
//   	buf = buf.toString('hex');
//   	let uniqFileName = file.originalname.replace(/\.jpeg|\.jpg|\.png/ig, ''); 
//   	uniqFileName += buf;
//     cb(undefined, uniqFileName );
//   }	
// });

// module.exports = {
// 	cloudinary, 
// 	storage
// };