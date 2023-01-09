import { Router } from "express";
import { isLoggedIn } from "../lib/authSesion.js";

//controllers
import { postSaveAsist, renderSaveAsist, showAllAsist } from "../controllers/asist_controller.js";

 const rutas = Router();

rutas.get('/guardarasistencia',isLoggedIn ,renderSaveAsist);
rutas.post('/guardarasistencia',isLoggedIn, postSaveAsist);

//ver todas mis asistencias
rutas.get('/',isLoggedIn, showAllAsist);

export default rutas;
