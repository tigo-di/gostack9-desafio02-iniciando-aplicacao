module.exports = {
  // Syntax Common JS, because Sequelize
  dialect: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: 'docker',
  database: 'gympoint',
  define: {
    timestamps: true, // doubt: true is default value, why Rockseat writes it here.
    // reference: https://sequelize.org/master/manual/models-definition.html
    // It force the use of collumns createdAt and updatedAt
    underscored: true, // Sequelize create Tables of model UserGroup => user_groups
    underscoredAll: true, // Sequelize create Collumns/Relationships as underscored
  },
};
