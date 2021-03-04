let http = require('http');
let express = require('express');
let cors = require('cors');
let routes = require('./routes/routes');
let bodyParser = require('body-parser');
let mongoose = require('mongoose');
let config = require('./config');
require('dotenv').config();


const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
app.use(express.static('public'));
app.use('/api',routes)
app.use('*', (req, res) => {
    res
    .status(404)
    .json( config.notFound );
})
mongoose.Promise = global.Promise;
mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

const port = process.env.PORT || 6684;

http.createServer(app).listen(port, function(){
    console.log(`app is running in localhost:${port}`)
});
