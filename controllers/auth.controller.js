const { getConnection, sql } = require("../database/connection");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Joi = require('@hapi/joi');
const router = require("../routes/omniclass23.routes");

//VALIDATOS SCHEMAS
const schemaRegister = Joi.object({
    username: Joi.string().min(5).max(45).required(),
    email: Joi.string().min(6).max(255).required().email(),
    name: Joi.string().max(45),
    lastname: Joi.string().max(90),
    gender: Joi.string().max(1),
    rol: Joi.string().max(15).required(),
    password: Joi.string().min(6).max(128).required(),

});

const schemaLogin = Joi.object({
    username: Joi.string().min(5).max(45).required(),
    password: Joi.string().min(5).max(128).required()
});

const login = async (req, res) =>{
    const { error } = schemaLogin.validate(req.body);
    if (error){
        return res.status(400).json({error: error.details[0].message});
    }

    try {
        const pool = await getConnection();
        const result = await pool.request()
            .input('username', sql.NVarChar, req.body.username)
            .query('SELECT * FROM usuarios_user WHERE username = @username')
        
        if (result.rowsAffected[0] == 0){
            return res.status(404).json({error: 'username not found!'})
        }
        const correctPass = await bcrypt.compare(req.body.password, result.recordset[0].password)
        if (!correctPass){
            return res.status(400).json({error: 'Incorrect password!'});
        }

        const token = jwt.sign({
            username: result.recordset[0].username,
            email: result.recordset[0].correo,
            id: result.recordset[0].id
        }, process.env.TOKEN_SECRET, {expiresIn: '8h'});

        res.header('auth-token', token).json({
            user: result.recordset[0],
            token: token
        });

    } catch (error) {
        res.status(400).json(error);
    }
};

const register = async (req, res) =>{
    //VALIDATE INPUT
    const { error } = schemaRegister.validate(req.body);
    if (error){
        return res.status(400).json({error: error.details[0].message});
    }

    try {
        const pool = await getConnection();
        //VALIDATE USER
        const username = await pool.request()
            .input('username', sql.NVarChar, req.body.username)
            .query('SELECT * FROM usuarios_user WHERE username = @username');
        
        if (username.rowsAffected[0] > 0){
            return res.status(404).json({error: 'username already exists!'});
        }
        // console.log("pasa validacion de user")
        const email = await pool.request()
            .input('email',sql.NVarChar, req.body.email)
            .query('SELECT * FROM usuarios_user WHERE correo = @email');
        
        if (email.rowsAffected[0] > 0){
            return res.status(404).json({error: 'email already exists!'});
        }
        // console.log("pasa validacion de email")

        //ENCRYPTING PASSWORD
        const salts = await bcrypt.genSalt(10);
        const password = await bcrypt.hash(req.body.password, salts);

        // console.log("pasa encryptacion: ", password)

        await pool.request()
            .input("password",sql.NVarChar,password)
            .input("is_superuser", sql.Bit, false)
            .input("username", sql.NVarChar, req.body.username)
            .input("email", sql.NVarChar,req.body.email)
            .input("name", sql.NVarChar, req.body.name)
            .input("lastname", sql.NVarChar, req.body.lastname)
            .input("gender", sql.NVarChar, req.body.gender)
            .input("rol", sql.NVarChar, req.body.rol)
            .input("is_active", sql.Bit, true)
            .input("is_staff", sql.Bit, true)
            .query('INSERT INTO usuarios_user (password,is_superuser,username,correo,nombre,apellidos,genero,rol,is_active,is_staff) VALUES (@password,@is_superuser,@username,@email,@name,@lastname,@gender,@rol,@is_active,@is_staff)')

        res.json({message: 'Register was successfully!'})
    } catch (error) {
        res.status(400).json(error);
    }
};

module.exports = {
    login,
    register
}