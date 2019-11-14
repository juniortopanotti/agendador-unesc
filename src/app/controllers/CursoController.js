import Curso from '../models/Curso';

class CursoController {
  async store(req, res) {
    const curso = await Curso.create(req.body);

    return res.json(curso);
  }

  async index(req, res) {
    const { page = 1, size = 20 } = req.query;

    const curso = await Curso.findAll({
      limit: size,
      offset: (page - 1) * size,
      order: ['nome'],
    });

    return res.json(curso);
  }

  async update(req, res) {
    const curso = await Curso.findByPk(req.cursoId);

    const { id, nome } = await curso.update(req.body);

    return res.json({ id, nome });
  }

  async delete(req, res) {
    await Curso.destroy({ where: { id: req.cursoId } });
    return res.status(204).json();
  }
}

export default new CursoController();
