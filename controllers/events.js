const { response } = require('express');
const Evento = require('../models/Evento');

const getEventos = async ( req, res = response ) => {

    const eventos = await Evento.find()
                                .populate('user', 'name');
    
    return res.json({
        ok: true,
        eventos
    });
}

const crearEvento = async ( req, res = response ) => {

    const evento = new Evento( req.body );

    try {

        evento.user = req.uid;
        
        const eventoGuardado = await evento.save()
        
        return res.status(200).json({
            ok: true,
            evento: eventoGuardado
        });
        
    } catch (error) {

        console.log(error);
        
        return res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }
}

const actualizarEvento = async ( req, res = response ) => {

    const eventoId = req.params.id;
    const uid = req.uid;

    try {

        const evento = await Evento.findById( eventoId );

        if( !evento ) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe evento con ese id'
            });
        }

        if ( evento.user.toString() !== uid ) {
            return res.status(401).json({
                ok: false,
                msg: 'No tiene permiso para editar este evento'
            });
        }

        const nuevoEvento = {
            ...req.body,
            user: uid // El usuario no viene en la solicitud por eso es añadido aquí
        }

        const eventoActualizado = await Evento.findByIdAndUpdate( eventoId, nuevoEvento, { new: true } );

        return res.json({
            ok: true,
            evento: eventoActualizado
        });
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }
    
    
}

const eliminarEvento = ( req, res = response ) => {
    return res.json({
        ok: true,
        msg: 'eliminarEvento'
    })
}

module.exports = {
    getEventos,
    crearEvento,
    actualizarEvento,
    eliminarEvento
}
