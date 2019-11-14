import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';

class Usuario extends Model {
  static init(sequelize) {
    super.init(
      {
        celular: Sequelize.STRING,
        dt_nascimento: Sequelize.DATE,
        email: Sequelize.STRING,
        fase: Sequelize.INTEGER,
        nome: Sequelize.STRING,
        orientador: Sequelize.STRING,
        sexo: Sequelize.STRING,
        tipo: Sequelize.STRING,
        trabalho: Sequelize.STRING,
        senha: Sequelize.STRING,
        password: Sequelize.VIRTUAL,
      },
      {
        sequelize,
      }
    );

    this.addHook('beforeSave', async user => {
      if (user.password) {
        user.senha = await bcrypt.hash(user.password, 8);
      }
    });

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Curso, { foreignKey: 'id_curso', as: 'curso' });
    this.belongsToMany(models.Atividade, {
      through: 'atividade_usuarios',
      foreignKey: 'id_usuario',
      as: 'atividades',
    });
  }

  checkPassword(password) {
    return bcrypt.compare(password, this.senha);
  }
}

export default Usuario;
