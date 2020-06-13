// const express = require('express');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const config = require('./config/keys.config.js');
const mongoose = require('mongoose');
const path = require('path');
const multer = require('multer');
const fileUpload = require('express-fileupload');
const { storage } = require('./cloudinary/index.cloudinary.js');
const asyncHandler = require('express-async-handler');
const upload = multer({ storage });
require('dotenv').config();

const mongodbUrl = config.MONGODB_URL;
const PORT = config.PORT;
mongoose.connect(mongodbUrl, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
}).catch(err => console.log(err.reason));

const app = express();

app.use(cors());
app.use(bodyParser.json()); 
// app.use(fileUpload());

// routes
app.use('/api/users', require('./routes/user.route.js'))
app.use('/api/products', require('./routes/product.route.js'));
app.use('/api/orders', require('./routes/order.route.js'));
// route untuk memberikan client id paypal.
app.get('/api/config/paypal', (req, res) => {
  res.send(config.PAYPAL_CLIENT_ID);
});

// const uploads = path.join(__dirname, './uploads');
// app.use('/uploads', express.static(uploads));

app.use(express.static(path.join(__dirname, '/../frontend/build')));

// 404
app.get('*', (req, res) => {
  res.sendFile(path.join(`${__dirname}/../frontend/build/index.html`));
});

// eslint-disable-next-line no-unused-vars
// error handler
app.use((err, req, res, next) => {
  console.log(err);
  const status = err.name && err.name === 'ValidationError' ? 400 : 500;
  res.status(status);
  res.send({ message: err.message });
});

// routes post upload file - App Cloud
app.post('/upload', (req, res) => {
  console.log(req.files);
  // cek apakah ada file yang diupload
  if (!req.files || Object.keys(req.files).length === 0) {
  	// tidak ada file yang diupload
    return res.status(400).send('No files were uploaded.');
  }

  // file yang diupload ada 
  const { image } = req.files;
  const filename = image.mimetype === 'image/png' ? `${new Date().getTime()}.png` : image.mimetype === 'image/jpg' ? `${new Date().getTime()}.jpg` : image.mimetype === 'image/jpeg' ? `${new Date().getTime()}.jpeg` : null;
  console.log(filename)
  image.mv(`${uploads}/${filename}`, (err) => {
    if (err) return res.status(500).send(err); // server error saat upload file
    console.log(`/uploads/${filename}`);
    res.send(`./uploads/${filename}`);
  });
});

// routes post upload file - Cloudinary
// app.post('/upload', upload.single('image'), asyncHandler((req, res) => {
//   file = req.file;
//   console.log(req.file);
//   console.log('uploaddddddddddd');
  // // cek apakah ada file yang diupload
  // if (!req.files || Object.keys(req.files).length === 0) {
  //   // tidak ada file yang diupload
  //   return res.status(400).send('No files were uploaded.');
  // }

  // // file yang diupload ada 
  // const { image } = req.files;
  // const filename = image.mimetype === 'image/png' ? `${new Date().getTime()}.png` : image.mimetype === 'image/jpg' ? `${new Date().getTime()}.jpg` : image.mimetype === 'image/jpeg' ? `${new Date().getTime()}.jpeg` : null;
  // console.log(filename)
  // image.mv(`${uploads}/${filename}`, (err) => {
  //   if (err) return res.status(500).send(err); // server error saat upload file
  //   console.log(`/uploads/${filename}`);
  //   res.send(`./uploads/${filename}`);
  // });
// }));

app.listen(PORT, () => {
	console.log(`Server started at http://localhost:${PORT}`);
});