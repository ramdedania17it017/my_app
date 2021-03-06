const express = require ('express');
const dotenv = require ('dotenv');
const morgan = require ('morgan');
const bodyparser = require ('body-parser');
const connectDB = require ('./server/database/connection.js');
const path = require ('path');
const route = require ('./server/routes/router.js');
const { fileURLToPath } = require ('url');
const { dirname }  = require ('path');

//const __filename = fileURLToPath(const.meta.url);
const app = express();

dotenv.config( { path : 'config.env'} )
const PORT = process.env.PORT || 5000

// log requests
app.use(morgan('tiny'));

// mongodb connection
connectDB();

// parse request to body-parser
app.use(bodyparser.urlencoded({ extended : true}))

// set view engine
app.set("view engine", "ejs")
//app.set("views", path.resolve(__dirname, "views/ejs"))

// load assets
app.use('/css', express.static(path.resolve(__dirname, "assets/css")))
app.use('/img', express.static(path.resolve(__dirname, "assets/img")))
app.use('/js', express.static(path.resolve(__dirname, "assets/js")))

// load routers
app.use('/',route)

app.listen(PORT, ()=> { console.log(`Server is running on http://localhost:${PORT}`)});