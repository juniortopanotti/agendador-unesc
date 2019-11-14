import Atividade from '../models/Atividade';
import Usuario from '../models/Usuario';

class AtividadeController {
  async store(req, res) {
    const { usuarios, ...data } = req.body;
    const atividade = await Atividade.create(data);

    if (usuarios && usuarios.length > 0) {
      await atividade.setUsuarios(usuarios);
    }

    return res.json(atividade);
  }

  async index(req, res) {
    const { page = 1, size = 20 } = req.query;

    const atividades = await Atividade.findAll({
      limit: size,
      offset: (page - 1) * size,
      order: ['nome'],
      include: [
        {
          model: Usuario,
          as: 'usuarios',
          through: {
            attributes: [],
          },
          attributes: ['id', 'nome', 'email'],
        },
      ],
    });

    return res.json(atividades);
  }

  async update(req, res) {
    const atividade = await Atividade.findByPk(req.atividadeId);

    const { id, nome } = await atividade.update(req.body);

    return res.json({ id, nome });
  }

  async delete(req, res) {
    await Atividade.destroy({ where: { id: req.atividadeId } });
    return res.status(204).json();
  }
}

export default new AtividadeController();
