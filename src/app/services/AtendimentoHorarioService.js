import {
  differenceInMinutes,
  setSeconds,
  setHours,
  addMinutes,
  format,
  setMinutes,
  parseISO,
  getDay,
} from 'date-fns';

import Horario from '../models/Horario';
import Atendimento from '../models/Atendimento';

class AtendimentoHorarioService {
  static async getHorarioAtendimentoList(data, analista) {
    const baseDate = parseISO(data);
    const weekDay = getDay(baseDate);

    const atendimentosDisponiveis = [];

    const horarios = await Horario.findAll({
      where: {
        id_usuario: analista.id,
        dia_semana: weekDay,
      },
    });

    horarios.forEach(horario => {
      const [inicioHora, inicioMinutos] = horario.inicio.split(':');
      const [fimHora, fimMinutos] = horario.fim.split(':');

      let inicio = setSeconds(
        setMinutes(setHours(baseDate, inicioHora), inicioMinutos),
        0
      );
      const fim = setSeconds(
        setMinutes(setHours(baseDate, fimHora), fimMinutos),
        0
      );

      const { duracao, local } = horario;
      const diferenca = differenceInMinutes(fim, inicio);
      const agendamentosPossiveis = diferenca / duracao;
      for (let i = 0; i < agendamentosPossiveis; i += 1) {
        const diferencaFinal = differenceInMinutes(fim, inicio);
        if (diferencaFinal < duracao) {
          return;
        }
        atendimentosDisponiveis.push({
          local,
          data: format(baseDate, 'yyyy-MM-dd'),
          inicio: format(inicio, 'HH:mm'),
          fim: format(addMinutes(inicio, duracao), 'HH:mm'),
        });

        inicio = addMinutes(inicio, duracao);
      }
    });

    // where monitor
    const atendimentos = await Atendimento.findAll({
      where: {
        analista: analista.id,
        dt_atendimento: baseDate,
      },
    });

    atendimentosDisponiveis.forEach((hor, idx) => {
      atendimentosDisponiveis[idx].disponivel = true;
      atendimentos.forEach(ate => {
        if (ate.hr_inicio <= hor.inicio && ate.hr_fim >= hor.fim) {
          atendimentosDisponiveis[idx].disponivel = false;
        }
        if (ate.hr_inicio >= hor.inicio && ate.hr_fim <= hor.fim) {
          atendimentosDisponiveis[idx].disponivel = false;
        }
        if (ate.hr_inicio <= hor.inicio && ate.hr_fim >= hor.inicio) {
          atendimentosDisponiveis[idx].disponivel = false;
        }
        if (ate.hr_inicio <= hor.fim && ate.hr_fim >= hor.fim) {
          atendimentosDisponiveis[idx].disponivel = false;
        }
      });
    });

    return atendimentosDisponiveis;
  }
}

export default AtendimentoHorarioService;
