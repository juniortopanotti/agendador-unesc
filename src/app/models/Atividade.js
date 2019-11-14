import Sequelize, { Model } from 'sequelize';

class Atividade extends Model {
  static init(sequelize) {
    super.init(
      {
        nome: Sequelize.STRING,
        ativo: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsToMany(models.Usuario, {
      through: 'atividade_usuarios',
      foreignKey: 'id_atividade',
      as: 'usuarios',
    });
  }
}

export default Atividade;
