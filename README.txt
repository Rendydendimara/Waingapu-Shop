Membuat Aplikasi ECommerce seperti Amazon
MERN STACK.

Ini kelas online di Udemy, tapi hanya sebagiannya saja.

Build ECommerce Website Like Amazon For All Levels Developers
00:02:00 Part 01- Introduction
00:08:26 Part 02- Install Tools (VS Code, Chrome)
00:12:36 Part 03- Website Template (HTML, CSS)
00:29:47 Part 04- Products List (Grid, Flexbox)
00:41:54 Part 05- Create Sidebar (JavaScript)
00:52:39 Part 06- Create React App (React)
01:01:09 Part 07- Render Products (JSX)
01:06:30 Part 08- Product Details (React Router)
01:30:53 Part 09- Create Node Server (Node.js)
01:39:52 Part 10- Fetch Server Data (React Hooks)
01:47:55 Part 11- Manage State With Redux (Redux)
02:07:11 Part 12- Add Redux To Details (Redux with Hooks)
02:29:23 Part 13- Shopping Cart Screen (Advanced React)
03:08:11 Part 14- Connect MongoDB (Mongoose)
03:21:35 Part 15- Sign In User (JWT Authentication)
03:56:02 Part 16- Manage Products (React Modal)
04:38:43 Part 17- Checkout Wizard (React Wizard)


Yang tidak kita dapati:
24:56Order Details Screen
19:37 Connect to PayPal
15:45 Manage Order Screen
– Manage Users
12:18 User Profile Screen
25:51 Filter and Sort Products
– Deploy Website
09:04 Deploy Website on Heroku

YOU WILL LEARN:
1. HTML5 and CSS3: Semantic Elements, CSS Grid, Flexbox
2. React: Components, Props, Events, Hooks, Router, Axios
3. Redux: Store, Reducers, Actions
4. Node & Express: Web API, Body Parser, File Upload, JWT
5. MongoDB: Mongoose, Aggregation
6. Development: ESLint, Babel, Git, Github, 
7. Deployment: Heroku

Menggunakan Functional Pattern, silakan gunakan OOP jika dibutuhkan.

Demo: https://node-react-ecommerce-app.herokuapp.com/

Persyaratan
Basic knowledge of computer algorithms

Deskripsi
Welcome to my coding course to build an ecommerce website like amazon. You will learn the essential tools and skills to design, develop and deploy a fully-function website like amazon using MERN stack.

My name is Basir and I’ll be your instructor in this course. After 17 years of coding in international companies like ROI Vision in Montreal, I found my passion in teaching programming. For the last 5 years I have been tutoring hundreds of successful students around the world.

I designed this course for anyone seeking to develop a fully-functional ecommerce website like amazon. By the end of this course you’ll be able to design a responsive template, implement a user-friendly frontend and develop a scalable backend. Also you can deploy the website on cloud servers like Heroku and connect it to a payment gateway like Paypal.

You need to open a code editor along with me and start coding throughout this course. To get this point I teach you web design using HTML, CSS, user interaction by JavaScript, coding frontend by React and building web api using Node and MongoDB.

I designed this course for non-coders or juniors who want to be a professional web developer to get a job in 22 million job opportunities around the world. This is no requirement necessary for this course and having a passion for coding is enough.


Untuk siapa kursus ini:
None-Coder
Beginner JavaScript Programmers
Web Developers and Designers
Business owners who want to sell products

Alur Aplikasi Logic:
 - Tiap Halaman Dapat Mengakses Store Global Dengan Menggunakan Method useSelector(state(globalState) => state.dataGlobalStoreYangMauDiambil)), menggunakan useSelector karena kita menggunakan React-Hooks Redux
 - Tiap Halaman Dapat Melakukan Dispatch ke action untuk melakukan reducer untuk memanipulasi data store global Dengan Menggunakan Method useDispatch(actionYangMauDilakukanUntukMemanggilReducer), menggunakan useDispatch karena kita menggunakan React-Hooks Redux
 - Tiap action akan melakukan fecth data ke server jika diperlukan dan melakukan reducer untuk memanipulasi data store global.
 - store.js, merupakan data store global yang menyimpan data-data yang akan digunakan oleh compoent2/halaman yang membutuhkannya, kita menggunakan redux-thunk agar dapat menjalankan asynchronous/async pada reducer/action. 

 - Tiap kali ada pengambilan data/perubahan data/penambahan data/penghapusan data : 
   - Lakukan dispatch ke action yang sesuai dengan apa yang dilakuakan pada halaman yang ingin pengambilan data/perubahan data/penambahan data/penghapusan data 
   - Action akan menerima parameter berupa data yang dikirimkan (optional), dan dispatch (wajib) , getState(tidak wajib, digunakan hanya jika pada action tersebut membutuhkan data di store global). Kemudian akan melakukan fetching API ke server untuk melakukan pengambilan data/perubahan data/penambahan data/penghapusan data (jika dibutuhkan). Action melakukan fetching API secara asyncrhrous ke server, ini bisa dilakukan karena kita telah menggunakan redux-thunk.
   - Setelah berhasil melakukan fetching API ke server (jika dibutuhkan) action akan melakukan dispatch ke reducer agar reducer dapat memanipulasi data di global store (pengambilan data/perubahan data/penambahan data/penghapusan data ) 
   - Jika terdapat data yang dibutuhkan untuk disimpan kedalam cookie, maka data tersebut akan ditambahkan kedalam cookie dengan format ('namaDataYangAkanDiSimpanKedalamCookie', dataYangAkanDiSimpanKedalamCookie)

 - store global menyimpan data berupa object, store global juga dapat menyimpan data yang ada sudah tersimpan di dalam cookie.
 - saat membuat reducer kita menggunakan API 





