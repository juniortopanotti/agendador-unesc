module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('atividades', 'ativo', {
      type: Sequelize.STRING,
      allowNull: false,
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('atividades', 'ativo');
  },
};
