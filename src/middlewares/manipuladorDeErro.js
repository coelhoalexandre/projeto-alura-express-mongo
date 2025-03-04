import mongoose from "mongoose";
import ErroBase from "../erros/ErroBase.js";
import RequisicaoIncorreta from "../erros/RequisicaoIncorreta.js";
import ErroValidacao from "../erros/ErroValidacao.js";

// eslint-disable-next-line no-unused-vars
const manipuladorDeErros = (erro, req, res, next) => {
  if (erro instanceof ErroBase) erro.enviarResposta(res);

  if (erro instanceof mongoose.Error.CastError)
    new RequisicaoIncorreta().enviarResposta(res);

  if (erro instanceof mongoose.Error.ValidationError)
    new ErroValidacao(erro).enviarResposta(res);

  new ErroBase().enviarResposta(res);
};

export default manipuladorDeErros;
