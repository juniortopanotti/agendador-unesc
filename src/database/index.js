import Sequelize from 'sequelize';

import databaseConfig from '../config/database';
import Usuario from '../app/models/Usuario';
import Atividade from '../app/models/Atividade';
import Curso from '../app/models/Curso';
import Horario from '../app/models/Horario';
import Atendimento from '../app/models/Atendimento';

const models = [Usuario, Curso, Atividade, Horario, Atendimento];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);
    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }
}

export default new Database();
