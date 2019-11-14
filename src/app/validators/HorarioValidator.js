import * as Yup from 'yup';
import { utcToZonedTime } from 'date-fns-tz';
import {
  setHours,
  setMinutes,
  setSeconds,
  isAfter,
  differenceInMinutes,
} from 'date-fns';

class HorarioValidator {
  async store(req, res, next) {
    const regExp = new RegExp('^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$');
    const schema = Yup.object().shape({
      id_usuario: Yup.number().required('É obrigatório informar o usuário.'),
      inicio: Yup.string()
        .matches(regExp, 'Formato de hora inválido')
        .required('É obrigatório informar a hora inicial.'),
      fim: Yup.string()
        .matches(regExp, 'Formato de hora inválido.')
        .required('É obrigatório informar a data de fim.'),
      duracao: Yup.number().required('É obrigatório informar a duração.'),
      local: Yup.string().required(
        'É obrigatório informar o local do atendimento.'
      ),
      dia_semana: Yup.number()
        .required('É obrigatório informar o dia da semanna')
        .oneOf([0, 1, 2, 3, 4, 5, 6], 'Dia da semana inválido'),
    });

    try {
      await schema.validate(req.body);
    } catch (err) {
      const { path, errors, message } = err;
      return res.status(400).json({ path, errors, message });
    }

    const [inicioHora, inicioMinutos] = req.body.inicio.split(':');
    const [fimHora, fimMinutos] = req.body.fim.split(':');
    const baseDate = utcToZonedTime(new Date(), 'America/Sao_Paulo');
    const inicio = setSeconds(
      setMinutes(setHours(baseDate, inicioHora), inicioMinutos),
      0
    );
    const fim = setSeconds(
      setMinutes(setHours(baseDate, fimHora), fimMinutos),
      0
    );

    if (isAfter(inicio, fim)) {
      return res
        .status(400)
        .json({ message: 'Horário inicial maior que o final.' });
    }

    const { duracao } = req.body;

    if (duracao > differenceInMinutes(fim, inicio)) {
      return res.status(400).json({
        message:
          'O intervalo de agendamento deve ser de no minímo o tempo da duração.',
      });
    }

    return next();
  }
}

export default new HorarioValidator();
