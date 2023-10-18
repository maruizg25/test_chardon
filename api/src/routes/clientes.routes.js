import { Router } from "express";
import {getClientes, createCliente, getClienteById,deleteClienteById, updateCliente, register, deleteClienteBySecuencia  } from "../controllers/clientes.controller";
import {createDetalle} from "../controllers/clientes.controller";

const router = Router();
// obtener todos los clientes
router.get("/clientes",getClientes);

// obtener un cliente por identificacion
router.get("/clientes/:secuencia",getClienteById);

// crear un cliente
router.post("/clientes",createCliente);

// delete cliente identificaion
router.delete("/clientes/:id",deleteClienteById);

//delet cliente por secuencia
router.delete("/clientes/:secuencia",deleteClienteBySecuencia);

// actualizar un cliente
router.put("/clientes",updateCliente);

// crear detalle
router.post("/detalle",createDetalle);



// register
router.post("/register", register);

export default router;