import mongoose from "mongoose";

const livroSchema = new mongoose.Schema(
  {
    id: { type: mongoose.Schema.Types.ObjectId },
    titulo: {
      type: String,
      required: [true, "O título do livro é obrigatório"],
    },
    autor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "autores",
      required: [true, "O(a) autor(a) é obrigatório"],
    },
    editora: {
      type: String,
      required: [true, "A editora é obrigatória"],
      enum: {
        values: ["Casa do código", "Alura"],
        message: "A editora {VALUE} não é um valor permitido",
      },
    },
    preco: { type: Number },
    paginas: {
      type: Number,
      validate: {
        validator: (valor) => {
          return valor > 0 && valor < 5001;
        },
        message:
          "O número de páginas deve estar entre 1 e 5000. Valor fornecido: {VALUE}.",
      },
    },
  },
  { versionKey: false }
);

const livros = mongoose.model("livros", livroSchema);

export default livros;
