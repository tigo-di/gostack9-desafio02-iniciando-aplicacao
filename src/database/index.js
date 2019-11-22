// 2 tasks:
// 1 - create connection with database
// 2 - load all models

// Object-relational mapping
import Sequelize from 'sequelize';
import User from '../app/models/User';
import databaseConfig from '../config/database'; // import cfgs db

// models vector
const models = [User];

class Database {
  // initializing the object
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig); // connection established

    models.map(model => model.init(this.connection));
  }
}

export default new Database();
