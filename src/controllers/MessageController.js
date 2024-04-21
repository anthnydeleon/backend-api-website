import User from "../models/User";
import Message from "../models/Message";

class MessageController {
  async create(req, res) {
    try {
      const { message } = req.body;
      const user = await User.findByPk(req.userId);

      if (!user) {
        return res.status(404).json({
          errors: ["Usuário não encontrado."],
        });
      }

      if (message.length > 500) {
        return res.status(400).json({
          errors: ["Mensagem não podem ser maior que 500 caracteres."],
        });
      }

      const user_id = user.id;
      await Message.create({ message, user_id });

      return res.json({ user_id, message });
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }
}

export default new MessageController();
