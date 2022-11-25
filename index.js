const express = require('express');
const bodyparser = require('body-parser');
require('dotenv').config();

const app = express();

//CORS
const cors = require('cors');
var corsOptions = {
    origin: '*',
    optionsSycessStatus: 200
}
app.use(cors(corsOptions));

//MANUPULATE INFORMATION IN (body) TO SENT AND GET
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

//IMPORT ROUTES
const omniclass23Routes = require('./routes/omniclass23.routes');
const authRoutes = require('./routes/auth.routes')
const usersRoutes = require('./routes/users.routes')
const validateToken = require('./routes/validate-token')

//ROUTE MODDLEWARES
app.use('/account',authRoutes);
app.use('/apiomcproductos',validateToken,omniclass23Routes);
app.use('/users',validateToken,usersRoutes);

app.get('/', (req, res) => {
    res.json({
        estado: true,
        mensaje: 'funciona api!'
    })
});

//START SERVER
const PORT = process.env.PORT || 3002;
app.listen(PORT, () =>{
    console.log(`Server on port: ${PORT}`);
});
