module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('atendimentos', 'situacao', {
      type: Sequelize.STRING,
      allowNull: false,
    });
  },

  down: queryInterface => {
    return queryInterface.dropColumn('atendimentos', 'situacao');
  },
};
