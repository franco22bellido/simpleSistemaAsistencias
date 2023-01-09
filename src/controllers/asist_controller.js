import conecction from "../database.js";

export const renderSaveAsist = (req, res) => {
    res.render('./asist/asist');
}

export const postSaveAsist = async (req, res) => {
    //validar si ya se guardo una fecha el día de hoy. asi no guardan muchos 
    //registros repetidos. solo uno por dia
    const user = {
        id_usuario_FK: req.user.id
    }
    await conecction.query('INSERT INTO asistencias set ? ', [user]);

    req.flash('sucedio', 'se guardo tu llegada con exito');
    res.redirect('/');
}

export const showAllAsist = async(req, res)=>{
    
    const user = {
        id: req.user.id
    }
    
    const consulta = await conecction.query(`SELECT username, fecha from asistencias 
    inner join usuarios on usuarios.id = asistencias.id_usuario_FK where usuarios.id =?`,[user.id]);

    res.render('./asist/asist_results', {consulta});

}