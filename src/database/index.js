import Sequelize from "sequelize";
import databaseConfig from "../config/database";

import User from "../models/User";
import Photo from "../models/Photo";
import Message from "../models/Message";

const models = [User, Photo, Message];
const connection = new Sequelize(databaseConfig);

models.forEach((model) => model.init(connection));
models.forEach(
  (model) => model.associate && model.associate(connection.models)
);
