import Sequelize, { Model } from "sequelize";

export default class Message extends Model {
  static init(sequelize) {
    super.init(
      {
        message: {
          type: Sequelize.STRING,
          defaultValue: "",
          validate: {
            len: {
              args: [0, 500],
              msg: "Mensagem não podem ser maior que 500 caracteres.",
            },
          },
        },
      },
      {
        sequelize,
        tableName: "messages",
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: "user_id" });
  }
}
