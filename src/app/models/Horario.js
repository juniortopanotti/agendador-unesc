import Sequelize, { Model } from 'sequelize';

class Horario extends Model {
  static init(sequelize) {
    super.init(
      {
        inicio: Sequelize.TIME,
        fim: Sequelize.TIME,
        duracao: Sequelize.INTEGER,
        dia_semana: Sequelize.INTEGER,
        local: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Usuario, { foreignKey: 'id_usuario', as: 'usuario' });
  }
}

export default Horario;
