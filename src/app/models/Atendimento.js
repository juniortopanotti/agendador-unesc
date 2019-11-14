import Sequelize, { Model } from 'sequelize';

class Atendimento extends Model {
  static init(sequelize) {
    super.init(
      {
        local: Sequelize.STRING,
        dt_atendimento: Sequelize.DATEONLY,
        hr_inicio: Sequelize.TIME,
        hr_fim: Sequelize.TIME,
        situacao: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Usuario, {
      foreignKey: 'monitorando',
    });
    this.belongsTo(models.Usuario, {
      foreignKey: 'analista',
    });
    this.belongsTo(models.Atividade, {
      foreignKey: 'atividade',
    });
  }
}

export default Atendimento;
