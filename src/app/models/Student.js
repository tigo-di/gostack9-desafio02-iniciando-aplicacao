import Sequelize, { Model } from 'sequelize';

class Student extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        age: Sequelize.INTEGER,
        weight: Sequelize.DECIMAL(4, 1),
        height: Sequelize.DECIMAL(3, 2),
      },
      {
        sequelize,
      }
    );

    return this;
  }
}

export default Student;
