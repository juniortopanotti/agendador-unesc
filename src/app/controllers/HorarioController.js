import { Op } from 'sequelize';
import Horario from '../models/Horario';

class HorarioController {
  async store(req, res) {
    const { dia_semana, inicio, fim } = req.body;
    const { id } = req.userContext;

    const horarioExists = await Horario.findOne({
      where: {
        [Op.and]: [
          { id_usuario: id },
          { dia_semana },
          {
            [Op.or]: [
              {
                [Op.and]: [
                  { inicio: { [Op.lte]: inicio } },
                  { fim: { [Op.gte]: fim } },
                ],
              },
              {
                [Op.and]: [
                  { inicio: { [Op.gte]: inicio } },
                  { fim: { [Op.lte]: fim } },
                ],
              },
              {
                [Op.and]: [
                  { inicio: { [Op.lte]: inicio } },
                  { fim: { [Op.gte]: inicio } },
                ],
              },
              {
                [Op.and]: [
                  { inicio: { [Op.lte]: fim } },
                  { fim: { [Op.gte]: fim } },
                ],
              },
            ],
          },
        ],
      },
    });

    if (horarioExists) {
      return res.status(400).json({
        message: 'Já existe um horário abrangindo o horário informado',
      });
    }

    const horario = await Horario.create(req.body);

    return res.json(horario);
  }
}

export default new HorarioController();
