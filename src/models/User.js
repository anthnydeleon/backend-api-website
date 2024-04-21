import Sequelize, { Model } from "sequelize";
import bcryptjs from "bcryptjs";

export default class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: {
          type: Sequelize.STRING,
          defaultValue: "",
          validate: {
            len: {
              args: [3, 250],
              msg: "Campo nome deve ter entre 3 e 250 caracteres.",
            },
          },
        },
        email: {
          type: Sequelize.STRING,
          defaultValue: "",
          validate: {
            isEmail: {
              msg: "E-mail inválido.",
            },
            isUnique(value, next) {
              User.findOne({ where: { email: value } })
                .then((user) => {
                  if (user) {
                    return next("E-mail já existe, tente outro!");
                  }
                  return next();
                })
                .catch((err) => next(err));
            },
          },
        },
        password_hash: {
          type: Sequelize.STRING,
          defaultValue: "",
        },
        password: {
          type: Sequelize.VIRTUAL,
          defaultValue: "",
          validate: {
            len: {
              args: [6, 30],
              msg: "Campo nome deve ter entre 6 e 30 caracteres.",
            },
          },
        },
      },
      {
        sequelize,
      }
    );

    this.addHook("beforeSave", async (user) => {
      if (user.password) {
        user.password_hash = await bcryptjs.hash(user.password, 8);
      }
    });

    return this;
  }

  static associate(models) {
    this.hasMany(models.Photo, { foreignKey: "user_id" });
    this.hasMany(models.Message, { foreignKey: "user_id" });
  }

  passwordIsValid(password) {
    return bcryptjs.compare(password, this.password_hash);
  }
}
