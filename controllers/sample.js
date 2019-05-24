'use strict'

let controller = {
    unprotected: (req,res)=>{
        res.send("Ok. ruta sin proteger");
    },
    protected: (req,res)=>{
        console.log("caso protected");
        res.send(`Ok ${req.user.first_name} ${req.user.last_name}, bienvenido a la ruta protegida.`);
    },

}

module.exports = controller;