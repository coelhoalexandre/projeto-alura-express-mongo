import RequisicaoIncorreta from "../erros/RequisicaoIncorreta.js";

const paginar = async (req, res, next) => {
  try {
    let { limite = 1, pagina = 1, ordenacao = "_id:-1" } = req.query;

    let [campoOrdenacao, ordem] = ordenacao.split(":");

    limite = parseInt(limite);
    pagina = parseInt(pagina);
    ordem = parseInt(ordem);

    if (limite < 0 || pagina < 0) throw new RequisicaoIncorreta();

    const resultado = req.resultado;

    const resultadoPaginado = await resultado
      .find()
      .sort({ [campoOrdenacao]: ordem })
      .skip(limite * (pagina - 1))
      .limit(limite)
      .exec();

    res.status(200).json(resultadoPaginado);
  } catch (erro) {
    next(erro);
  }
};

export default paginar;
