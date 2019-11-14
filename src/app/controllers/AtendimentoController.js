import { Op } from 'sequelize';
import { isBefore, parseISO } from 'date-fns';
import AtendimentoHorarioService from '../services/AtendimentoHorarioService';
import Atendimento from '../models/Atendimento';
import SituacaoAtendimento from '../constants/SituacaoAtendimento';

class AtendimentoController {
  async store(req, res) {
    const { analista, atividade } = req;
    const { dt_atendimento, hr_inicio } = req.body;
    const { userContext } = req;

    if (isBefore(parseISO(dt_atendimento), new Date())) {
      return res.status(400).json({
        message: 'Não é permitido criar agendamentos para datas passadas.',
      });
    }

    const atendimentoList = await AtendimentoHorarioService.getHorarioAtendimentoList(
      dt_atendimento,
      analista
    );

    const horario = atendimentoList.find(atend => {
      return atend.disponivel === true && atend.inicio === hr_inicio;
    });

    if (!horario) {
      return res.status(400).json({
        message: 'Não existe agendamento disponível com o horário informado.',
      });
    }

    const atendimentoObj = await Atendimento.findOne({
      where: {
        monitorando: userContext.id,
        dt_atendimento: {
          [Op.gt]: new Date(),
        },
      },
    });

    if (atendimentoObj) {
      return res
        .status(400)
        .json({ message: 'Você já tem um agendamento marcado em aberto.' });
    }

    const atendimento = await Atendimento.create({
      analista: analista.id,
      atividade: atividade.id,
      monitorando: userContext.id,
      local: horario.local,
      hr_inicio: horario.inicio,
      hr_fim: horario.fim,
      dt_atendimento: horario.data,
      situacao: SituacaoAtendimento.Aberto,
    });

    return res.json(atendimento);
  }
}

export default new AtendimentoController();
