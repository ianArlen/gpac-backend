//localhost port in the environment
require('dotenv').config({"path": `.env.${process.env.NODE_ENV}`});

const port = process.env.port;

//Data Base of mongoose of mongo atlas 
const conexiondb = require('./db/conexion.js');
const db_host = process.env.db_host;
conexiondb(db_host);

//Bring in the models
require("./models/User");
require("./models/Person");
require("./models/Rol");


//Bring app and listen port in the environment 
const app = require("./app");
const server = app.listen(port, () => console.log(`app listening http://localhost:${port}`));

