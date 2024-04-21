import User from "../models/User";
import Photo from "../models/Photo";
import Message from "../models/Message";

class UserController {
  async index(req, res) {
    try {
      const users = await User.findAll({
        attributes: ["id", "name", "email"],
        order: [
          ["id", "DESC"],
          [Photo, "id", "DESC"],
          [Message, "id", "DESC"],
        ],
        include: [
          {
            model: Photo,
            attributes: ["url", "filename"],
          },
          {
            model: Message,
            attributes: ["message"],
          },
        ],
      });

      return res.json(users);
    } catch (e) {
      return res.json(null);
    }
  }

  async show(req, res) {
    try {
      const user = await User.findByPk(req.userId, {
        attributes: ["id", "name", "email"],
        order: [
          ["id", "DESC"],
          [Photo, "id", "DESC"],
          [Message, "id", "DESC"],
        ],
        include: [
          {
            model: Photo,
            attributes: ["url", "filename"],
          },
          {
            model: Message,
            attributes: ["message"],
          },
        ],
      });
      return res.json(user);
    } catch (e) {
      return res.json(null);
    }
  }

  async create(req, res) {
    try {
      const newUser = await User.create(req.body);
      const { id, name, email } = newUser;

      return res.send({
        id,
        name,
        email,
        info: "Usuário criado.",
      });
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async update(req, res) {
    try {
      const user = await User.findByPk(req.userId);

      if (!user) {
        return res.status(404).json({
          errors: ["Usuário não encontrado."],
        });
      }

      const { id, name, email } = await user.update(req.body);

      return res.json({
        id,
        name,
        email,
        info: "Dados alterados.",
      });
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async delete(req, res) {
    try {
      const user = await User.findByPk(req.userId);

      if (!user) {
        return res.status(404).json({
          errors: ["Usuário não encontrado."],
        });
      }

      const { id, name, email } = await user.destroy(req.body);

      return res.json({
        id,
        name,
        email,
        info: "Usuário deletado.",
      });
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }
}

export default new UserController();
