// 2 tasks:
// 1 - create connection with database
// 2 - load all models

// Object-relational mapping
import Sequelize from 'sequelize';
import User from '../app/models/User'; // Only for admin
import Student from '../app/models/Student'; // No access for Students, Admins manage all data
import databaseConfig from '../config/database'; // import cfgs db

// models vector
const models = [User, Student];

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
