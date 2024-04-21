import { Router } from "express";

import loginRequired from "../middlewares/loginRequired";
import photoController from "../controllers/PhotoController";

const router = new Router();

router.post("/", loginRequired, photoController.create);

export default router;

/*
index -> lista todos os usuários -> GET
store/create -> cria um novo usuário -> POST
delete -> deleta um  usuário -> DELETE
show -> mostra um usuário -> GET
update -> atualiza um usuário -> PATCH ou PUT
*/
