module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('atendimentos', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      analista: {
        type: Sequelize.INTEGER,
        references: { model: 'usuarios', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: false,
      },
      monitorando: {
        type: Sequelize.INTEGER,
        references: { model: 'usuarios', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: false,
      },
      atividade: {
        type: Sequelize.INTEGER,
        references: { model: 'atividades', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      local: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      dt_atendimento: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      hr_inicio: {
        type: Sequelize.TIME,
        allowNull: false,
      },
      hr_fim: {
        type: Sequelize.TIME,
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
    return queryInterface.dropTable('atendimentos');
  },
};
