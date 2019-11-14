import * as Yup from 'yup';

import Curso from '../models/Curso';

class CursoValidator {
  async store(req, res, next) {
    const schema = Yup.object().shape({
      nome: Yup.string()
        .max(100, 'O nome não pode exceder 100 caracteres')
        .required('É obrigatório informar o nome'),
    });

    try {
      await schema.validate(req.body);
    } catch (err) {
      const { path, errors, message } = err;
      return res.status(400).json({ path, errors, message });
    }

    return next();
  }

  async find(req, res, next) {
    const { id } = req.params;

    const curso = await Curso.findByPk(id);

    if (!curso) {
      return res
        .status(400)
        .json({ message: 'Não foi encontrado curso com o id informada.' });
    }

    req.cursoId = curso.id;

    return next();
  }
}

export default new CursoValidator();
