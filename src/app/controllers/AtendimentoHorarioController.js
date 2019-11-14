import AtendimentoHorarioService from '../services/AtendimentoHorarioService';

class AtendimentoHorarioController {
  async index(req, res) {
    const { data } = req.query;

    const { analista } = req;

    const atendimentosDisponiveis = await AtendimentoHorarioService.getHorarioAtendimentoList(
      data,
      analista
    );

    return res.json(atendimentosDisponiveis);
  }
}

export default new AtendimentoHorarioController();
