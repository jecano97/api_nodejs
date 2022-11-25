const { getConnection, sql } = require("../database/connection");
const Joi = require('@hapi/joi');

//VALIDATION SCHEMAS
const schemaOMC23N1 = Joi.object({
    codigo: Joi.string().max(9).required(),
    descriEng: Joi.string().max(100).required(),
    descriSpa: Joi.string().max(110).required(),
    definicionEng: Joi.string().max(200).required(),
    definicionSpa: Joi.string().max(150).required(),
    ejemploEng: Joi.string().max(300).required(),
    ejemploSpa: Joi.string().max(400).required(),
    anioReg: Joi.number().required()

});

const schemaOMC23N2 = Joi.object({
    numMat: Joi.number(),
    codigo: Joi.string().max(9).required(),
    descriEng: Joi.string().max(100).required(),
    descriSpa: Joi.string().max(110).required(),
    definicionEng: Joi.string().max(300).required().allow(''),
    definicionSpa: Joi.string().max(470),
    ejemploEng: Joi.string().max(300),
    ejemploSpa: Joi.string().max(400),
    anioReg: Joi.number().required(),
    regFinal: Joi.boolean().required(),
    regUsuario: Joi.boolean(),
    fk_Omc23N1: Joi.number().required()

});

const schemaOMC23N3 = Joi.object({
    numMat: Joi.number().required().allow(''),
    codigo: Joi.string().max(9).required(),
    descriEng: Joi.string().max(100).required(),
    descriSpa: Joi.string().max(101).required(),
    definicionEng: Joi.string().max(350).required().allow(''),
    definicionSpa: Joi.string().max(450).required().allow(''),
    ejemploEng: Joi.string().max(250).required().allow(''),
    ejemploSpa: Joi.string().max(300).required().allow(''),
    anioReg: Joi.number().required(),
    regFinal: Joi.boolean().required(),
    regUsuario: Joi.boolean().required().allow(''),
    fk_Omc23N2: Joi.number().required()
});

const schemaOMC23N4 = Joi.object({
    numMat: Joi.number().required().allow(''),
    codigo: Joi.string().max(11).required(),
    descriEng: Joi.string().max(100).required(),
    descriSpa: Joi.string().max(110).required(),
    definicionEng: Joi.string().max(350).required().allow(''),
    definicionSpa: Joi.string().max(400).required().allow(''),
    ejemploEng: Joi.string().max(300).required().allow(''),
    ejemploSpa: Joi.string().max(300).required().allow(''),
    anioReg: Joi.number().required(),
    regFinal: Joi.boolean().required(),
    regUsuario: Joi.boolean().required().allow(''),
    fk_Omc23N3: Joi.number().required()
});

const schemaOMC23N5 = Joi.object({
    numMat: Joi.number(),
    codigo: Joi.string().max(13).required(),
    descriEng: Joi.string().max(120).required(),
    descriSpa: Joi.string().max(120).required(),
    definicionEng: Joi.string().max(250),
    definicionSpa: Joi.string().max(350),
    ejemploEng: Joi.string().max(150),
    ejemploSpa: Joi.string().max(150),
    anioReg: Joi.number().required(),
    regFinal: Joi.boolean().required(),
    regUsuario: Joi.boolean(),
    fk_Omc23N4: Joi.number().required()
});

const schemaOMC23N6 = Joi.object({
    numMat: Joi.number().required().allow(''),
    codigo: Joi.string().max(15).required(),
    descriEng: Joi.string().max(100).required(),
    descriSpa: Joi.string().max(100).required(),
    definicionEng: Joi.string().max(250).required().allow(''),
    definicionSpa: Joi.string().max(350).required().allow(''),
    ejemploEng: Joi.string().max(150).required().allow(''),
    ejemploSpa: Joi.string().max(150).required().allow(''),
    anioReg: Joi.number().required(),
    regFinal: Joi.boolean().required(),
    regUsuario: Joi.boolean().required().allow(''),
    fk_Omc23N5: Joi.number().required()
});

const getOmc23N1 = async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request().query('SELECT * FROM Omc23Nivel1');
        res.json(result.recordset);
    } catch (error) {
        res.status(400).json(error);
    }
};

const createNewOmc23N1 = async (req, res) => {
    const { error } = schemaOMC23N1.validate(req.body);
    if (error){
        
        return res.status(400).json({error: error.details[0].message});
    }

    try {
        const pool = await getConnection();

        await pool.request()
            .input("codigo", sql.Char, req.body.codigo)
            .input("descriEng",sql.VarChar, req.body.descriEng)
            .input("descriSpa",sql.NVarChar, req.body.descriSpa)
            .input("definicionEng",sql.NVarChar, req.body.definicionEng)
            .input("definicionSpa",sql.NVarChar, req.body.definicionSpa)
            .input("ejemploEng",sql.VarChar, req.body.ejemploEng)
            .input("ejemploSpa",sql.NVarChar, req.body.ejemploSpa)
            .input("anioReg",sql.Int, req.body.anioReg)
            .query('INSERT INTO Omc23Nivel1 (codigo, descriEng, descriSpa, definicionEng, definicionSpa, ejemploEng, ejemploSpa, anioReg) VALUES (@codigo, @descriEng, @descriSpa, @definicionEng, @definicionSpa, @ejemploEng, @ejemploSpa, @anioReg)');
        
        res.json({message: 'Data was created successfully!'});
    } catch (error) {
        res.status(400).json(error);
    }

};

const updateOmc23N1 = async (req, res) =>{
    const { error } = schemaOMC23N1.validate(req.body);
    const {id} = req.params;
    if (error) {
        return res.status(400).json({error: error.details[0].message});
    }

    try {
        const pool = await getConnection();
        const result = await pool.request()
            .input("codigo", sql.Char, req.body.codigo)
            .input("descriEng",sql.VarChar, req.body.descriEng)
            .input("descriSpa",sql.NVarChar, req.body.descriSpa)
            .input("definicionEng",sql.NVarChar, req.body.definicionEng)
            .input("definicionSpa",sql.NVarChar, req.body.definicionSpa)
            .input("ejemploEng",sql.VarChar, req.body.ejemploEng)
            .input("ejemploSpa",sql.NVarChar, req.body.ejemploSpa)
            .input("anioReg",sql.Int, req.body.anioReg)
            .input("id", sql.Int, id)
            .query('UPDATE Omc23Nivel1 SET codigo=@codigo, descriEng=@descriEng, descriSpa=@descriSpa, definicionEng=@definicionEng, definicionSpa=@definicionSpa, ejemploEng=@ejemploEng, ejemploSpa=@ejemploSpa, anioReg=@anioReg WHERE idOmc23N1=@id'); 
        
        if (result.rowsAffected[0] == 0){
            res.status(404).json({error:'There is no data with this id!'});
        } else {
            res.json({message: 'Data was updated succesfully!'});
        }
    } catch (error) {
        res.status(400).json(error);
    }
};

const deleteOmc23N1 = async (req, res) =>{
    const {id} = req.params;

    try {
        const pool = await getConnection();
        const result = await pool.request()
            .input('idOmc23N1',sql.Int, id)
            .query('DELETE FROM Omc23Nivel1 WHERE idOmc23N1 = @idOmc23N1');

        if (result.rowsAffected[0] == 0){
            res.status(404).json({error:'There is no data with this id!'});
        } else {
            res.json({message: 'Data was deleted succesfully!'});
        }

    } catch (error) {
        res.status(400).json(error);
    }
};

const getOmc23N2 = async (req, res) =>{
    try {
        const pool = await getConnection();
        const result = await pool.request().query('SELECT * FROM Omc23Nivel2');

        res.json(result.recordset);
    } catch (error) {
        res.status(400).json(error);
    }
};

const createNewOmc23N2 = async (req, res) =>{
    const { error } = schemaOMC23N2.validate(req.body);
    if (error){
        return res.status(400).json({error: error.details[0].message});
    }

    try {
        const pool = await getConnection();
        await pool.request()
            .input('numMat', sql.Int, req.body.numMat)
            .input('codigo', sql.Char, req.body.codigo)
            .input('descriEng', sql.VarChar, req.body.descriEng)
            .input('descriSpa', sql.NVarChar, req.body.descriSpa)
            .input('definicionEng', sql.NVarChar, req.body.definicionEng)
            .input('definicionSpa', sql.NVarChar, req.body.definicionSpa)
            .input('ejemploEng', sql.VarChar, req.body.ejemploEng)
            .input('ejemploSpa', sql.NVarChar, req.body.ejemploSpa)
            .input('anioReg', sql.Int, req.body.anioReg)
            .input('regFinal', sql.Bit, req.body.regFinal)
            .input('regUsuario', sql.Bit, req.body.regUsuario)
            .input('fk_Omc23N1', sql.Int, req.body.fk_Omc23N1)
            .query('INSERT INTO Omc23Nivel2 (numMat,codigo,descriEng,descriSpa,definicionEng,definicionSpa,ejemploEng,ejemploSpa,anioReg,regFinal,regUsuario,fk_Omc23N1) VALUES (@numMat,@codigo,@descriEng,@descriSpa,@definicionEng,@definicionSpa,@ejemploEng,@ejemploSpa,@anioReg,@regFinal,@regUsuario,@fk_Omc23N1)');

        res.json({message: 'Data was created succesfully!'});
    } catch (error) {
        res.status(400).json(error);
    }
};

const updateOmc23N2 = async (req, res) =>{
    const {id} = req.params;
    const { error } = schemaOMC23N2.validate(req.body);

    if (error){
        return res.status(400).json({error: error.details[0].message});
    }

    try {
        const pool = await getConnection();
        const result = await pool.request()
            .input('numMat', sql.Int, req.body.numMat)
            .input('codigo', sql.Char, req.body.codigo)
            .input('descriEng', sql.VarChar, req.body.descriEng)
            .input('descriSpa', sql.NVarChar, req.body.descriSpa)
            .input('definicionEng', sql.NVarChar, req.body.definicionEng)
            .input('definicionSpa', sql.NVarChar, req.body.definicionSpa)
            .input('ejemploEng', sql.VarChar, req.body.ejemploEng)
            .input('ejemploSpa', sql.NVarChar, req.body.ejemploSpa)
            .input('anioReg', sql.Int, req.body.anioReg)
            .input('regFinal', sql.Bit, req.body.regFinal)
            .input('regUsuario', sql.Bit, req.body.regUsuario)
            .input('fk_Omc23N1', sql.Int, req.body.fk_Omc23N1)
            .input('id', sql.Int, id)
            .query('UPDATE Omc23Nivel2 SET numMat = @numMat,codigo = @codigo,descriEng = @descriEng,descriSpa = @descriSpa,definicionEng = @definicionEng,definicionSpa = @definicionSpa,ejemploEng = @ejemploEng,ejemploSpa = @ejemploSpa,anioReg = @anioReg,regFinal = @regFinal,regUsuario = @regUsuario,fk_Omc23N1 = @fk_Omc23N1 WHERE idOmc23N2 = @id');
        
        if (result.rowsAffected[0] == 0){
            res.status(404).json({error: 'There is no data with this id!'});
        } else{
            res.json({message: 'Data was updated succesfully!'});
        }
        
    } catch (error) {
        res.status(400).json(error);
    }
};

const deleteOmc23N2 = async (req, res) =>{
    const {id} = req.params;

    try {
        const pool = await getConnection();
        const result = await pool.request()
            .input('id', sql.Int, id)
            .query('DELETE FROM Omc23Nivel2 WHERE idOmc23N2 = @id');
        
        if (result.rowsAffected[0] == 0){
            res.status(404).json({error: 'There is no data with this id!'});
        } else{
            res.json({message: 'Data was deleted succesfully!'});
        }

    } catch (error) {
        res.status(400).json(error);
    }
};

const getOmc23N3 = async (req, res) =>{
    try {
        const pool = await getConnection();
        const result = await pool.request().query('SELECT * FROM Omc23Nivel3');

        res.json(result.recordset);
    } catch (error) {
        res.status(400).json(error);
    }
};

const createNewOmc23N3 = async (req, res) =>{
    const { error } = schemaOMC23N3.validate(req.body);
    if (error) {
        return res.status(400).json({error: error.details[0].message});
    }

    try {
        const pool = await getConnection();
        await pool.request()
            .input('numMat',sql.Int, req.body.numMat)
            .input('codigo', sql.Char, req.body.codigo)
            .input('descriEng', sql.VarChar, req.body.descriEng)
            .input('descriSpa', sql.NVarChar, req.body.descriSpa)
            .input('definicionEng', sql.NVarChar, req.body.definicionEng)
            .input('definicionSpa', sql.NVarChar, req.body.definicionSpa)
            .input('ejemploEng', sql.VarChar, req.body.VarChar)
            .input('ejemploSpa', sql.NVarChar, req.body.ejemploSpa)
            .input('anioReg', sql.Int, req.body.anioReg)
            .input('regFinal', sql.Bit, req.body.regFinal)
            .input('regUsuario', sql.Bit, req.body.regUsuario)
            .input('fk_Omc23N2', sql.Int, req.body.fk_Omc23N2)
            .query('INSERT INTO Omc23Nivel3 (numMat,codigo,descriEng,descriSpa,definicionEng,definicionSpa,ejemploEng,ejemploSpa,anioReg,regFinal,regUsuario,fk_Omc23N2) VALUES (@numMat,@codigo,@descriEng,@descriSpa,@definicionEng,@definicionSpa,@ejemploEng,@ejemploSpa,@anioReg,@regFinal,@regUsuario,@fk_Omc23N2)')

        res.json({message: 'Data was created succesfully!'});
    } catch (error) {
        res.status(400).json(error);
    }
};

const updateOmc23N3 = async (req, res) =>{
    const { id } = req.params;

    const { error } = schemaOMC23N3.validate(req.body);
    if (error){
        return res.status(400).json({error: error.details[0].message});
    }

    try {
        const pool = await getConnection();
        const result = await pool.request()
            .input('numMat',sql.Int, req.body.numMat)
            .input('codigo', sql.Char, req.body.codigo)
            .input('descriEng', sql.VarChar, req.body.descriEng)
            .input('descriSpa', sql.NVarChar, req.body.descriSpa)
            .input('definicionEng', sql.NVarChar, req.body.definicionEng)
            .input('definicionSpa', sql.NVarChar, req.body.definicionSpa)
            .input('ejemploEng', sql.VarChar, req.body.VarChar)
            .input('ejemploSpa', sql.NVarChar, req.body.ejemploSpa)
            .input('anioReg', sql.Int, req.body.anioReg)
            .input('regFinal', sql.Bit, req.body.regFinal)
            .input('regUsuario', sql.Bit, req.body.regUsuario)
            .input('fk_Omc23N2', sql.Int, req.body.fk_Omc23N2)
            .input('id',sql.Int, id)
            .query('UPDATE Omc23Nivel3 SET numMat=@numMat,codigo=@codigo,descriEng=@descriEng,descriSpa=@descriSpa,definicionEng=@definicionEng,definicionSpa=@definicionSpa,ejemploEng=@ejemploEng,ejemploSpa=@ejemploSpa,anioReg=@anioReg,regFinal=@regFinal,regUsuario=@regUsuario,fk_Omc23N2=@fk_Omc23N2 WHERE idOmc23N3=@id');

        if (result.rowsAffected[0] == 0){
            res.status(404).json({error: 'There is no data with this id!'});
        }else {
            res.json({message: 'Data was updated succesfully!'});
        }
    } catch (error) {
        res.status(400).json(error);
    }
};

const deleteOmc23N3 = async (req, res) =>{
    const { id } = req.params;

    try {
        const pool = await getConnection();
        const result = await pool.request()
            .input('id',sql.Int, id)
            .query('DELETE FROM Omc23Nivel3 WHERE idOmc23N3 = @id');
        
        if (result.rowsAffected[0] == 0){
            res.status(404).json({error: 'There is no data with this id'});
        } else{
            res.json({message: 'Data was deleted succesfully!'});
        }
    } catch (error) {
        res.status(400).json(error);
    }
};

const getOmc23N4 = async (req, res) =>{
    try {
        const pool = await getConnection();
        const result = await pool.request().query('SELECT * FROM Omc23Nivel4');

        res.json(result.recordset);
    } catch (error) {
        res.status(400).json(error);
    }
};

const createNewOmc23N4 = async (req, res) =>{
    const { error } = schemaOMC23N4.validate(req.body);

    if (error) {
        return res.status(400).json({error: error.details[0].message});
    }

    try {
        const pool = await getConnection();
        await pool.request()
            .input('numMat', sql.Int, req.body.numMat)
            .input('codigo', sql.Char, req.body.codigo)
            .input('descriEng', sql.VarChar, req.body.descriEng)
            .input('descriSpa', sql.NVarChar, req.body.descriSpa)
            .input('definicionEng', sql.NVarChar, req.body.definicionEng)
            .input('definicionSpa', sql.NVarChar, req.body.definicionSpa)
            .input('ejemploEng', sql.VarChar, req.body.ejemploEng)
            .input('ejemploSpa', sql.NVarChar, req.body.ejemploSpa)
            .input('anioReg', sql.Int, req.body.anioReg)
            .input('regFinal', sql.Bit, req.body.regFinal)
            .input('regUsuario', sql.Bit, req.body.regUsuario)
            .input('fk_Omc23N3', sql.Int, req.body.fk_Omc23N3)
            .query('INSERT INTO Omc23Nivel4 (numMat,codigo,descriEng,descriSpa,definicionEng,definicionSpa,ejemploEng,ejemploSpa,anioReg,regFinal,regUsuario,fk_Omc23N3) VALUES (@numMat,@codigo,@descriEng,@descriSpa,@definicionEng,@definicionSpa,@ejemploEng,@ejemploSpa,@anioReg,@regFinal,@regUsuario,@fk_Omc23N3)');

        res.json({message: 'Data was created succesfully!'});
    } catch (error) {
        res.status(400).json(error);
    }

};

const updateOmc23N4 = async (req, res) =>{
    const { id } = req.params;

    const { error } = schemaOMC23N4.validate(req.body)
    if (error){
        return res.status(400).json({error: error.details[0].message});
    }

    try {
        const pool = await getConnection();
        const result = await pool.request()
            .input('numMat', sql.Int, req.body.numMat)
            .input('codigo', sql.Char, req.body.codigo)
            .input('descriEng', sql.VarChar, req.body.descriEng)
            .input('descriSpa', sql.NVarChar, req.body.descriSpa)
            .input('definicionEng', sql.NVarChar, req.body.definicionEng)
            .input('definicionSpa', sql.NVarChar, req.body.definicionSpa)
            .input('ejemploEng', sql.VarChar, req.body.ejemploEng)
            .input('ejemploSpa', sql.NVarChar, req.body.ejemploSpa)
            .input('anioReg', sql.Int, req.body.anioReg)
            .input('regFinal', sql.Bit, req.body.regFinal)
            .input('regUsuario', sql.Bit, req.body.regUsuario)
            .input('fk_Omc23N3', sql.Int, req.body.fk_Omc23N3)
            .input('id', sql.Int, id)
            .query('UPDATE Omc23Nivel4 SET numMat=@numMat,codigo=@codigo,descriEng=@descriEng,descriSpa=@descriSpa,definicionEng=@definicionEng,definicionSpa=@definicionSpa,ejemploEng=@ejemploEng,ejemploSpa=@ejemploSpa,anioReg=@anioReg,regFinal=@regFinal,regUsuario=@regUsuario,fk_Omc23N3=@fk_Omc23N3 WHERE idOmc23N4 = @id')

        if (result.rowsAffected[0] == 0){
            res.status(404).json({error: 'There is no data with this id'});
        }else {
            res.json({message: 'Data was updated successfully!'});
        }
    } catch (error) {
        res.status(400).json(error);
    }
};

const deleteOmc23N4 = async (req, res) =>{
    const { id } = req.params

    try {
        const pool = await getConnection();
        const result = await pool.request()
            .input('id', sql.Int, id)
            .query('DELETE FROM Omc23Nivel4 WHERE idOmc23N4 = @id')
        
        if(result.rowsAffected[0] == 0){
            res.status(404).json({error: 'There is no data with this id'});
        }else {
            res.json({message: 'Data was deleted successfully!'});
        }
    } catch (error) {
        res.status(400).json(error);
    }
};

const getOmc23N5 = async (req, res) =>{
    try {
        const pool = await getConnection();
        const result = await pool.request().query('SELECT * FROM Omc23Nivel5');

        res.json(result.recordset);
    } catch (error) {
        res.status(400).json(error);
    }
};

const createNewOmc23N5 = async (req, res) =>{
    const { error } = schemaOMC23N5.validate(req.body)

    if (error){
        return res.status(400).json({error: error.details[0].message});
    }

    try {
        const pool = await getConnection();
        await pool.request()
            .input('numMat', sql.Int, req.body.numMat)
            .input('codigo', sql.Char, req.body.codigo)
            .input('descriEng', sql.VarChar, req.body.descriEng)
            .input('descriSpa', sql.NVarChar, req.body.descriSpa)
            .input('definicionEng', sql.NVarChar, req.body.definicionEng)
            .input('definicionSpa', sql.NVarChar, req.body.definicionSpa)
            .input('ejemploEng', sql.VarChar, req.body.ejemploEng)
            .input('ejemploSpa', sql.NVarChar, req.body.ejemploSpa)
            .input('anioReg', sql.Int, req.body.anioReg)
            .input('regFinal', sql.Bit, req.body.regFinal)
            .input('regUsuario', sql.Bit, req.body.regUsuario)
            .input('fk_Omc23N4', sql.Int, req.body.fk_Omc23N4)
            .query('INSERT INTO Omc23Nivel5 (numMat,codigo,descriEng,descriSpa,definicionEng,definicionSpa,ejemploEng,ejemploSpa,anioReg,regFinal,regUsuario,fk_Omc23N4) VALUES (@numMat,@codigo,@descriEng,@descriSpa,@definicionEng,@definicionSpa,@ejemploEng,@ejemploSpa,@anioReg,@regFinal,@regUsuario,@fk_Omc23N4)');

        res.json({message: 'Data was created succesfully'});
    } catch (error) {
        res.status(400).json(error);
    }
};

const updateOmc23N5 = async (req, res) =>{
    const { id } = req.params

    const { error } = schemaOMC23N5.validate(req.body);
    if (error){
        return res.status(400).json({error: error.details[0].message});
    }

    try {
        const pool = await getConnection();
        const result = await pool.request()
            .input('numMat', sql.Int, req.body.numMat)
            .input('codigo', sql.Char, req.body.codigo)
            .input('descriEng', sql.VarChar, req.body.descriEng)
            .input('descriSpa', sql.NVarChar, req.body.descriSpa)
            .input('definicionEng', sql.NVarChar, req.body.definicionEng)
            .input('definicionSpa', sql.NVarChar, req.body.definicionSpa)
            .input('ejemploEng', sql.VarChar, req.body.ejemploEng)
            .input('ejemploSpa', sql.NVarChar, req.body.ejemploSpa)
            .input('anioReg', sql.Int, req.body.anioReg)
            .input('regFinal', sql.Bit, req.body.regFinal)
            .input('regUsuario', sql.Bit, req.body.regUsuario)
            .input('fk_Omc23N4', sql.Int, req.body.fk_Omc23N4)
            .input('id', sql.Int, id)
            .query('UPDATE Omc23Nivel5 SET numMat=@numMat,codigo=@codigo,descriEng=@descriEng,descriSpa=@descriSpa,definicionEng=@definicionEng,definicionSpa=@definicionSpa,ejemploEng=@ejemploEng,ejemploSpa=@ejemploSpa,anioReg=@anioReg,regFinal=@regFinal,regUsuario=@regUsuario,fk_Omc23N4=@fk_Omc23N4 WHERE idOmc23N5 = @id');

        if (result.rowsAffected[0] == 0){
            res.status(404).json({error: 'there is no data with this id'})
        }else {
            res.json({message: 'Data was updated succesfully'});
        }
    } catch (error) {
        res.status(400).json(error);
    }
};

const deleteOmc23N5 = async (req, res) =>{
    const { id } = req.params;

    try {
        const pool = await getConnection();
        const result = await pool.request()
            .input('id', sql.Int, id)
            .query('DELETE FROM Omc23Nivel5 WHERE idOmc23N5 = @id');

        if (result.rowsAffected[0] == 0){
            res.status(404).json({error: 'there is no data with this id'})
        }else {
            res.json({message: 'Data was deleted succesfully'});
        }
    } catch (error) {
        res.status(400).json(error);
    }
};

const getOmc23N6 = async (req, res) =>{
    try {
        const pool = await getConnection();
        const result = await pool.request().query('SELECT * FROM Omc23Nivel6');

        res.json(result.recordset);
    } catch (error) {
        res.status(400).json(error);
    }
};

const createNewOmc23N6 = async (req, res) =>{
    const { error } = schemaOMC23N6.validate(req.body)

    if (error){
        return res.status(400).json({error: error.details[0].message});
    }

    try {
        const pool = await getConnection();
        await pool.request()
            .input('numMat', sql.Int, req.body.numMat)
            .input('codigo', sql.Char, req.body.codigo)
            .input('descriEng', sql.VarChar, req.body.descriEng)
            .input('descriSpa', sql.NVarChar, req.body.descriSpa)
            .input('definicionEng', sql.NVarChar, req.body.definicionEng)
            .input('definicionSpa', sql.NVarChar, req.body.definicionSpa)
            .input('ejemploEng', sql.VarChar, req.body.ejemploEng)
            .input('ejemploSpa', sql.NVarChar, req.body.ejemploSpa)
            .input('anioReg', sql.Int, req.body.anioReg)
            .input('regFinal', sql.Bit, req.body.regFinal)
            .input('regUsuario', sql.Bit, req.body.regUsuario)
            .input('fk_Omc23N5', sql.Int, req.body.fk_Omc23N5)
            .query('INSERT INTO Omc23Nivel6 (numMat,codigo,descriEng,descriSpa,definicionEng,definicionSpa,ejemploEng,ejemploSpa,anioReg,regFinal,regUsuario,fk_Omc23N5) VALUES (@numMat,@codigo,@descriEng,@descriSpa,@definicionEng,@definicionSpa,@ejemploEng,@ejemploSpa,@anioReg,@regFinal,@regUsuario,@fk_Omc23N5)');

        res.json({message: 'Data was created succesfully'});
    } catch (error) {
        res.status(400).json(error);
    }
};

const updateOmc23N6 = async (req, res) =>{
    const { id } = req.params

    const { error } = schemaOMC23N6.validate(req.body);
    if (error){
        return res.status(400).json({error: error.details[0].message});
    }

    try {
        const pool = await getConnection();
        const result = await pool.request()
            .input('numMat', sql.Int, req.body.numMat)
            .input('codigo', sql.Char, req.body.codigo)
            .input('descriEng', sql.VarChar, req.body.descriEng)
            .input('descriSpa', sql.NVarChar, req.body.descriSpa)
            .input('definicionEng', sql.NVarChar, req.body.definicionEng)
            .input('definicionSpa', sql.NVarChar, req.body.definicionSpa)
            .input('ejemploEng', sql.VarChar, req.body.ejemploEng)
            .input('ejemploSpa', sql.NVarChar, req.body.ejemploSpa)
            .input('anioReg', sql.Int, req.body.anioReg)
            .input('regFinal', sql.Bit, req.body.regFinal)
            .input('regUsuario', sql.Bit, req.body.regUsuario)
            .input('fk_Omc23N5', sql.Int, req.body.fk_Omc23N5)
            .input('id', sql.Int, id)
            .query('UPDATE Omc23Nivel6 SET numMat=@numMat,codigo=@codigo,descriEng=@descriEng,descriSpa=@descriSpa,definicionEng=@definicionEng,definicionSpa=@definicionSpa,ejemploEng=@ejemploEng,ejemploSpa=@ejemploSpa,anioReg=@anioReg,regFinal=@regFinal,regUsuario=@regUsuario,fk_Omc23N5=@fk_Omc23N5 WHERE idOmc23N6 = @id');

        if (result.rowsAffected[0] == 0){
            res.status(404).json({error: 'there is no data with this id'})
        }else {
            res.json({message: 'Data was updated succesfully'});
        }
    } catch (error) {
        res.status(400).json(error);
    }
};

const deleteOmc23N6 = async (req, res) =>{
    const { id } = req.params;

    try {
        const pool = await getConnection();
        const result = await pool.request()
            .input('id', sql.Int, id)
            .query('DELETE FROM Omc23Nivel6 WHERE idOmc23N6 = @id')

        if (result.rowsAffected[0] == 0){
            res.status(404).json({error: 'there is no data with this id'})
        }else {
            res.json({message: 'Data was deleted succesfully'});
        }
    } catch (error) {
        res.status(400).json(error);
    }
};


module.exports = {
    getOmc23N1,
    createNewOmc23N1,
    updateOmc23N1,
    deleteOmc23N1,
    getOmc23N2,
    createNewOmc23N2,
    updateOmc23N2,
    deleteOmc23N2,
    getOmc23N3,
    createNewOmc23N3,
    updateOmc23N3,
    deleteOmc23N3,
    getOmc23N4,
    createNewOmc23N4,
    updateOmc23N4,
    deleteOmc23N4,
    getOmc23N5,
    createNewOmc23N5,
    updateOmc23N5,
    deleteOmc23N5,
    getOmc23N6,
    createNewOmc23N6,
    updateOmc23N6,
    deleteOmc23N6
};
