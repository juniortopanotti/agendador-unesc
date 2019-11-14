module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('horarios', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      id_usuario: {
        type: Sequelize.INTEGER,
        refereneces: { model: 'usuarios', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: false,
      },
      inicio: {
        type: Sequelize.TIME,
        allowNull: false,
      },
      fim: {
        type: Sequelize.TIME,
        allowNull: false,
      },
      duracao: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      dia_semana: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('horarios');
  },
};
