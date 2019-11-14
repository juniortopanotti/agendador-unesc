module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('horarios', 'local', {
      type: Sequelize.STRING,
      allowNull: false,
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('horarios', 'local');
  },
};
