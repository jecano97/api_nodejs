const { getConnection, sql } = require("../database/connection");
const Joi = require('@hapi/joi');
const bcrypt = require('bcrypt');

//Validation SCHEMAS
const schemaUser = Joi.object({
    username: Joi.string().min(5).max(45).required(),
    email: Joi.string().min(6).max(255).required().email(),
    name: Joi.string().max(45).required().allow(''),
    lastname: Joi.string().max(90).required().allow(''),
    gender: Joi.string().max(1).required().allow(''),
    rol: Joi.string().max(15).required(),
});

const schemaPassword = Joi.object({
    passwordOld: Joi.string().min(6).max(128).required(),
    passwordNew: Joi.string().min(6).max(128).required()
})

const schemaEmployee = Joi.object({
    dateOfBirth: Joi.date().required().allow(''),
    placeOfBirth: Joi.string().max(45).required().allow(''),
    RFC: Joi.string().max(13).required().allow(''),
    CURP: Joi.string().max(18).required().allow(''),
    celphone: Joi.string().max(12).required().allow(''),
    street: Joi.string().max(45).required().allow(''),
    noInt: Joi.number().required().allow(''),
    noExt: Joi.number().required().allow(''),
    fk_User: Joi.number().required().allow(''),
    fk_CP: Joi.number().required().allow('')
});

const schemaEmployeeExtraData = Joi.object({
    code: Joi.string().max(5).required(),
    dateIn: Joi.date().required(),
    dateOut: Joi.date().required().allow(''),
    salary: Joi.number().required().allow(''),
    reference1: Joi.string().max(200).required().allow(''),
    reference2: Joi.string().max(200).required().allow(''),
    location: Joi.string().max(45).required().allow(''),
    origin: Joi.string().max(10).required().allow(''),
    remarks: Joi.string().max(250).required().allow(''),
    fk_position: Joi.number().required().allow(''),
    fk_employee: Joi.number().required().allow(''),
    fk_agreement: Joi.number().required().allow('')
});

const schemaUserHistory = Joi.object({
    user: Joi.string().max(45).required(),
    entity: Joi.string().max(45).required(),
    module: Joi.string().max(45).required(),
    transaction: Joi.string().max(45).required(),
    date: Joi.date().required().required().allow(''),
    remarks: Joi.string().max(255).required().allow('')
});

const getUser = async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request().query('SELECT * FROM usuarios_user');
        res.json(result.recordset);
    } catch (error) {
        res.status(400).json(error);
    }
};

const updateUser = async (req, res) => {
    const {id} = req.params;
    const {error} = schemaUser.validate(req.body);

    if (error){
        return res.status(400).json({error: error.details[0].message});
    }

    try {
        const pool = await getConnection();
        const result = await pool.request()
            .input("username", sql.NVarChar, req.body.username)
            .input("email", sql.NVarChar, req.body.email)
            .input("name", sql.NVarChar, req.body.name)
            .input("lastname", sql.NVarChar, req.body.lastname)
            .input("gender", sql.NVarChar, req.body.gender)
            .input("rol", sql.NVarChar, req.body.rol)
            .input("id", sql.BigInt, id)
            .query('UPDATE usuarios_user SET username=@username, correo=@email, nombre=@name, apellidos=@lastname, genero=@gender, rol=@rol WHERE id = @id');
        
        if (result.rowsAffected[0] == 0){
            res.status(404).json({error:'There is no data with this id!'});
        }else {
            res.json({message: 'Data was updated successfully!'});
        }
    } catch (error) {
        res.status(400).json(error);
    }
};

const setPassword = async (req, res) =>{
    const {id} = req.params;
    const {error} = schemaPassword.validate(req.body)

    if (error) {
        return res.status(400).json({error: error.details[0].message});
    }

    try {
        const pool = await getConnection();
        const user = await pool.request()
            .input("id", sql.BigInt, id)
            .query('SELECT * FROM usuarios_user WHERE id = @id');

        if (user.rowsAffected[0] == 0){
            return res.status(404).json({error: 'User does not exist!'});
        }

        const correctPass = await bcrypt.compare(req.body.passwordOld, user.recordset[0].password)
        if (!correctPass){
            return res.status(400).json({error: 'The current password is incorrect!'});
        }

        const salts = await bcrypt.genSalt(10);
        const passwordNew = await bcrypt.hash(req.body.passwordNew, salts);

        await pool.request()
            .input('passwordNew',sql.NVarChar,passwordNew)
            .input('id',sql.BigInt, id)
            .query('UPDATE usuarios_user SET password=@passwordNew WHERE id=@id');

        res.json({message: 'Password was updated successfully!'});
    } catch (error) {
        res.status(400).json(error);
    }

};

const deleteUser = async (req, res) =>{
    const {id} = req.params

    try {
        const pool = await getConnection();
        const result = await pool.request()
            .input("id", sql.BigInt, id)
            .query('DELETE FROM usuarios_user WHERE id=@id')
        
        if (result.rowsAffected[0] == 0){
            res.status(404).json({error: 'There is no data with this id!'});
        }else {
            res.json({message: 'Data was deleted successfully!'});
        }
    } catch (error) {
        res.status(400).json(error);
    }
};

const getEmployee = async (req, res) =>{
    try {
        const pool = await getConnection();
        const result = await pool.request().query('SELECT * FROM Empleado');
        res.json(result.recordset);
    } catch (error) {
        res.status(400).json(error);
    }
};

const createEmployee = async (req, res) =>{
    const {error} = schemaEmployee.validate(req.body)

    if (error){
        return res.status(400).json({error: error.details[0].message});
    }

    try {
        const pool = await getConnection();
        await pool.request()
            .input('dateOfBirth',sql.DateTime2, req.body.dateOfBirth)
            .input('placeOfBirth',sql.NVarChar, req.body.placeOfBirth)
            .input('RFC', sql.Char, req.body.RFC)
            .input('CURP', sql.Char, req.body.CURP)
            .input('celphone', sql.VarChar, req.body.celphone)
            .input('street', sql.VarChar, req.body.street)
            .input('noInt', sql.Int, req.body.noInt)
            .input('noExt', sql.Int, req.body.noExt)
            .input('fk_User', sql.Int, req.body.fk_User)
            .input('fk_CP', sql.Int, req.body.fk_CP)
            .query('INSERT INTO Empleado (fechaNac,lugarNac,RFC,CURP,celular,calle,noInt,noExt,fk_User,fk_CP) VALUES (@dateOfBirth,@placeOfBirth,@RFC,@CURP,@celphone,@street,@noInt,@noExt,@fk_User,@fk_CP)');

        res.json({message: 'Data was created successfully!'});
    } catch (error) {
        res.status(400).json(error);
    }
};

const updateEmployee = async (req, res) =>{
    const {id} = req.params
    const {error} = schemaEmployee.validate(req.body)

    if (error){
        res.status(400).json({error: error.details[0].message})
    }

    try {
        const pool = await getConnection();
        const result = await pool.request()
            .input('dateOfBirth',sql.DateTime2, req.body.dateOfBirth)
            .input('placeOfBirth',sql.NVarChar, req.body.placeOfBirth)
            .input('RFC', sql.Char, req.body.RFC)
            .input('CURP', sql.Char, req.body.CURP)
            .input('celphone', sql.VarChar, req.body.celphone)
            .input('street', sql.VarChar, req.body.street)
            .input('noInt', sql.Int, req.body.noInt)
            .input('noExt', sql.Int, req.body.noExt)
            .input('fk_User', sql.Int, req.body.fk_User)
            .input('fk_CP', sql.Int, req.body.fk_CP)
            .input('id', sql.Int, id)
            .query('UPDATE Empleado SET fechaNac=@dateOfBirth,lugarNac=@placeOfBirth,RFC=@RFC,CURP=@CURP,celular=@celphone,calle=@street,noInt=@noInt,noExt=@noExt,fk_User=@fk_User,fk_CP=@fk_CP WHERE idEmpleado=@id');
        
        if(result.rowsAffected[0] == 0){
            res.status(404).json({error: 'There is no data with this id!'});
        }else {
            res.json({message: 'Data was updated successfully!'});
        }
    } catch (error) {
        res.status(400).json(error);
    }
};

const deleteEmployee = async (req, res) =>{
    const {id} = req.params
    try {
        const pool = await getConnection();
        const result = await pool.request()
            .input('id', sql.Int, id)
            .query('DELETE FROM Empleado WHERE idEmpleado=@id')
        
        if(result.rowsAffected[0] == 0){
            res.status(404).json({error: 'There is no data with this id!'})
        }else {
            res.json({error: 'Data was deleted successfully!'})
        }
    } catch (error) {
        res.status(400).json(error);
    }
}

const getEmployeeExtraData = async (req, res) =>{
    try {
        const pool = await getConnection();
        const result = await pool.request().query('SELECT * FROM DatosLaborales');
        res.json(result.recordset);
    } catch (error) {
        res.status(400).json(error);
    }
}

const createEmployeeExtraData = async (req, res) =>{
    const {error} = schemaEmployeeExtraData.validate(req.body);

    if(error){
        return res.status(400).json({error: error.details[0].message});
    }

    try {
        const pool = await getConnection();
        await pool.request()
            .input('code',sql.Char,req.body.code)
            .input('dateIn',sql.Date, req.body.dateIn)
            .input('dateOut',sql.Date, req.body.dateOut)
            .input('salary', sql.Float, req.body.salary)
            .input('reference1', sql.NVarChar, req.body.reference1)
            .input('reference2', sql.NVarChar, req.body.reference2)
            .input('location', sql.NVarChar, req.body.location)
            .input('origin', sql.NVarChar, req.body.origin)
            .input('remarks', sql.NVarChar, req.body.remarks)
            .input('fk_position', sql.Int, req.body.fk_position)
            .input('fk_employee', sql.Int, req.body.fk_employee)
            .input('fk_agreement', sql.Int, req.body.fk_agreement)
            .query('INSERT INTO DatosLaborales (codigo,fechaIng,fechaBaja,sueldoMensual,referencia1,referencia2,ubicacion,procedencia,observaciones,fk_Cargo,fk_Empleado,fk_Contrato) VALUES (@code,@dateIn,@dateOut,@salary,@reference1,@reference2,@location,@origin,@remarks,@fk_position,@fk_employee,@fk_agreement)');
        
        res.json({message: 'Data was created successfully!'});
    } catch (error) {
        // console.log(error);
        res.status(400).json(error);
    }
}

const updateEmployeeExtraData = async (req, res) =>{
    const {id} = req.params;
    const {error} = schemaEmployeeExtraData.validate(req.body);

    if(error){
        return res.status(400).json({error: error.details[0].message});
    }

    try {
        const pool = await getConnection();
        const result = await pool.request()
            .input('code',sql.Char,req.body.code)
            .input('dateIn',sql.Date, req.body.dateIn)
            .input('dateOut',sql.Date, req.body.dateOut)
            .input('salary', sql.Float, req.body.salary)
            .input('reference1', sql.NVarChar, req.body.reference1)
            .input('reference2', sql.NVarChar, req.body.reference2)
            .input('location', sql.NVarChar, req.body.location)
            .input('origin', sql.NVarChar, req.body.origin)
            .input('remarks', sql.NVarChar, req.body.remarks)
            .input('fk_position', sql.Int, req.body.fk_position)
            .input('fk_employee', sql.Int, req.body.fk_employee)
            .input('fk_agreement', sql.Int, req.body.fk_agreement)
            .input('id', sql.Int, id)
            .query('UPDATE DatosLaborales SET codigo=@code,fechaIng=@dateIn,fechaBaja=@dateOut,sueldoMensual=@salary,referencia1=@reference1,referencia2=@reference2,ubicacion=@location,procedencia=@origin,observaciones=@remarks,fk_Cargo=@fk_position,fk_Empleado=@fk_employee,fk_Contrato=@fk_agreement WHERE idDatosLab=@id');
        
        if (result.rowsAffected[0] == 0){
            res.status(404).json({error: 'There is no data with this id!'});
        }
        else {
            res.json({message: 'Data was updated successfully!'});
        }
    } catch (error) {
        // console.log('hay error')
        res.status(400).json(error);
    }
}

const deleteEmployeeExtraData = async (req, res) =>{
    const {id} = req.params

    try {
        const pool = await getConnection()
        const result = await pool.request()
            .input('id', sql.Int, id)
            .query('DELETE FROM DatosLaborales WHERE idDatosLab = @id');

        if(result.rowsAffected[0] == 0){
            res.status(404).json({error: 'There is no data with this id!'});
        }else {
            res.json({message: 'Data was deleted successfully!'});
        }
    } catch (error) {
        res.status(400).json(error);
    }
}

const getUserHistory = async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request().query('SELECT * FROM HistorialUsuario');

        res.json(result.recordset);
    } catch (error) {
        res.status(400).json(error);
    }
};

const createUserHistory = async (req, res) => {
    const {error} = schemaUserHistory.validate(req.body);

    if( error ){
        return res.status(400).json({error: error.details[0].message});
    }

    try {
        const pool = await getConnection();
        await pool.request()
            .input('user', sql.NVarChar, req.body.user)
            .input('entity', sql.NVarChar, req.body.entity)
            .input('module', sql.NVarChar, req.body.module)
            .input('transaction', sql.NVarChar, req.body.transaction)
            .input('date', sql.DateTime, req.body.date)
            .input('remarks', sql.NVarChar, req.body.remarks)
            .query('INSERT INTO HistorialUsuario (usuario,entidad,modulo,movimiento,fecha,observaciones) VALUES (@user,@entity,@module,@transaction,@date,@remarks)');
        
        res.json({message: 'Data was created successfully'});
        
    } catch (error) {
        res.status(400).json(error);
    }
}

const updateUserHistory = async (req, res) => {
    const {id} = req.params
    const {error} = schemaUserHistory.validate(req.body)

    if(error){
        return res.status(400).json({error: error.details[0].message});
    }

    try {
        const pool = await getConnection();
        const result = await pool.request()
            .input('user', sql.NVarChar, req.body.user)
            .input('entity', sql.NVarChar, req.body.entity)
            .input('module', sql.NVarChar, req.body.module)
            .input('transaction', sql.NVarChar, req.body.transaction)
            .input('date', sql.DateTime, req.body.date)
            .input('remarks', sql.NVarChar, req.body.remarks)
            .input('id',sql.Int, id)
            .query('UPDATE HistorialUsuario SET usuario=@user,entidad=@entity,modulo=@module,movimiento=@transaction,fecha=@date,observaciones=@remarks WHERE id = @id');

        if(result.rowsAffected[0] == 0){
            res.status(404).json({error: 'There is no data with this id!'});
        }else{
            res.json({message: 'Data was updated successfully!'});
        }
    } catch (error) {
        res.status.json(error);
    }
}

const deleteUserHistory = async (req, res) => {
    const {id} = req.params
    try {
        const pool = await getConnection();
        const result = await pool.request()
            .input('id', sql.Int, id)
            .query('DELETE FROM HistorialUsuario WHERE id = @id')
        
        if (result.rowsAffected[0] == 0){
            res.status(404).json({error:'There is no data with this id!'});
        } else {
            res.json({message: 'Data was deleted succesfully!'});
        }
    } catch (error) {
        res.status(400).json(error)
    }
}

module.exports = {
    getUser,
    updateUser,
    setPassword,
    deleteUser,
    getEmployee,
    createEmployee,
    updateEmployee,
    deleteEmployee,
    getEmployeeExtraData,
    createEmployeeExtraData,
    updateEmployeeExtraData,
    deleteEmployeeExtraData,
    getUserHistory,
    createUserHistory,
    updateUserHistory,
    deleteUserHistory
}