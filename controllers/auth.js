const { response } = require('express');
const Usuario = require('../models/Usuario');

const createUser = async ( req, res = response ) => {

    // const { name, email, password } = req.body;

    try {
            
        const usuario = new Usuario( req.body );

        await usuario.save();
        
        return res.status(201).json({
            ok: true,
            msg: 'register',
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Por favor hable con el administrador'
        });
    }

    
};

const loginUser = ( req, res = response ) => {

    const { email, password } = req.body;


    res.status(201).json({
        ok: true,
        msg: 'login',
        email,
        password
    });
    
};

const revalidateToken = ( req, res = response ) => {

    res.json({
        ok: true,
        msg: 'renew'
    })
    
};

module.exports = {
    createUser,
    loginUser,
    revalidateToken
}