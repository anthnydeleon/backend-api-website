import { Router } from "express";
import messageController from "../controllers/MessageController";
import loginRequired from "../middlewares/loginRequired";

const router = new Router();

router.post("/", loginRequired, messageController.create);

export default router;

/*
index -> lista todos os usuários -> GET
store/create -> cria um novo usuário -> POST
delete -> deleta um  usuário -> DELETE
show -> mostra um usuário -> GET
update -> atualiza um usuário -> PATCH ou PUT
*/
