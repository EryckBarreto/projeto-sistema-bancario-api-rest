const { contas } = require("../bancodedados")

function encontrarConta(numeroConta) {
    const contaEncontrada = contas.find((conta) => {
        return conta.numero === Number(numeroConta);
    });
    return contaEncontrada;
};


module.exports = {
    encontrarConta
}