let { contas, saques, depositos, transferencias } = require("../bancodedados");
const { encontrarConta } = require("./funcoes");



const consultarSaldoContaBancaria = (req, res) => {
    const { numero_conta, senha } = req.query;

    if (!numero_conta || !senha) {
        res.status(400).json({mensagem: "É necessário o número da conta e a senha para consultar o saldo."})
    };

    const contaEncontrada = encontrarConta(numero_conta);

    if (!contaEncontrada) {
        return res.status(404).json({mensagem: "Conta não encontrada."});
    };

    if (senha !== contaEncontrada.usuario.senha) {
        return res.status(401).json({mensagem: "Senha inválida, após 3 tentativas o usuário é bloqueado."});
    };

    return res.status(200).json(contaEncontrada.saldo);

};

const consultarExtratoContaBancaria = (req, res) => {
    
    const { numero_conta, senha } = req.query;

    if (!numero_conta || !senha) {
        res.status(400).json({mensagem: "É necessário o número da conta e a senha para consultar o saldo."})
    };

    const contaEncontrada = encontrarConta(numero_conta);

    if (!contaEncontrada) {
        return res.status(404).json({mensagem: "Conta não encontrada."});
    };

    if (senha !== contaEncontrada.usuario.senha) {
        return res.status(401).json({mensagem: "Senha inválida, após 3 tentativas incorretas a senha é bloqueada."});
    };

    const depositosConta = depositos.filter((deposito) => {
        return numero_conta === deposito.numero_conta;
    });

    const saquesConta = saques.filter((saque) => {
        return numero_conta === saque.numero_conta;
    });

    const transferenciasEnviadas = transferencias.filter((transferenciaEnviada) => {
        return Number(numero_conta) === Number(transferenciaEnviada.numero_conta_origem);
    });

    const transferenciasRecebidas = transferencias.filter((transferenciaRecebida) => {
        return Number(numero_conta) === Number(transferenciaRecebida.numero_conta_destino);
    });

    const extratoCompleto = {
        depositos: depositosConta,
        saques: saquesConta,
        transferenciasEnviadas,
        transferenciasRecebidas
    };

    return res.status(200).json(extratoCompleto);



}

module.exports = {
    consultarSaldoContaBancaria,
    consultarExtratoContaBancaria
}