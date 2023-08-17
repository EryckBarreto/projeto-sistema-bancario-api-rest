let { contas, saques, depositos, transferencias, } = require("../bancodedados");
const { encontrarConta } = require("./funcoes");
const { format } = require("date-fns");  

const depositar = (req, res) => {
    
    const { numero_conta, valor } = req.body;

    if (!numero_conta || !valor) {
        res.status(400).json({mensagem: "É necessário o número da conta e o valor maior que zero para efetuar o depósito."})
    };

    const contaEncontrada = encontrarConta(numero_conta);

    if (!contaEncontrada) {
        return res.status(404).json({mensagem: "Conta não encontrada."});
    };

    if (Number(valor) <= 0) {
        return res.status(400).json({mensagem: "Valor inválido para depósito, somente valores maiores que 0 (zero), tente novamente."});
    };

    const saldoAtualizado = Number(valor) + contaEncontrada.saldo;
    contaEncontrada.saldo = saldoAtualizado;

    const dataFormatada = format(new Date(), "yyyy-MM-dd HH:mm:ss");

    depositos.push({
        data: dataFormatada,
        numero_conta,
        valor: Number(valor)
    });

    return res.status(200).json({mensagem: "Depósito realizado com sucesso."});

};

const sacar = (req, res) => {

    const { numero_conta, valor, senha } = req.body;

    if (!numero_conta || !valor || !senha) {
        res.status(400).json({mensagem: "É necessário o número da conta, senha e o valor maior que zero para efetuar o saque."})
    };

    const contaEncontrada = encontrarConta(numero_conta);

    if (!contaEncontrada) {
        return res.status(404).json({mensagem: "Conta não encontrada."});
    };

    if (senha !== contaEncontrada.usuario.senha) {
        return res.status(401).json({mensagem: "Senha inválida, após 3 tentativas incorretas a senha é bloqueada."});
    };

    if (Number(valor) <= 0) {
        return res.status(400).json({mensagem: "Valor inválido para saque, somente valores maiores que 0 (zero), tente novamente."});
    };

    if (Number(valor) > contaEncontrada.saldo) {
        return res.status(400).json({mensagem: "Saldo insuficiente."});
    };

    const saldoAtualizado = contaEncontrada.saldo - Number(valor);
    contaEncontrada.saldo = saldoAtualizado;

    const dataFormatada = format(new Date(), "yyyy-MM-dd HH:mm:ss");

    saques.push({
        data: dataFormatada,
        numero_conta,
        valor: Number(valor)
    });

    return res.status(200).json({mensagem: "Saque realizado com sucesso."});
};

const transferir = (req, res) => {

    const { numero_conta_origem, numero_conta_destino, valor, senha } = req.body;

    const contaOrigemEncontrada = contas.find((conta) => {
        return conta.numero === Number(numero_conta_origem);
    });

    const contaDestinoEncontrada = contas.find((conta) => {
        return conta.numero === Number(numero_conta_destino);
    });

    if (!contaOrigemEncontrada) {
        return res.status(404).json({mensagem: "Conta origem não encontrada."});
    };

    if (!contaDestinoEncontrada) {
        return res.status(404).json({mensagem: "Conta destino não encontrada."});
    };

    if (!senha) {
        return res.status(400).json({mensagem: "Senha não fornecida. Tente novamente."});
    };

    if (!valor) {
        return res.status(400).json({mensagem: "É necessário preencher o valor a ser transferido."});
    };

    if (senha !== contaOrigemEncontrada.usuario.senha) {
        return res.status(401).json({mensagem: "Senha inválida, após 3 tentativas incorretas a senha é bloqueada."});
    };

    if (Number(valor) > contaOrigemEncontrada.saldo) {
        return res.status(400).json({mensagem: "Saldo insuficiente."});
    };

    const saldoOrigemAtualizado = contaOrigemEncontrada.saldo - Number(valor);
    contaOrigemEncontrada.saldo = saldoOrigemAtualizado;

    const saldoDestinoAtualizado = Number(valor) + contaDestinoEncontrada.saldo;
    contaDestinoEncontrada.saldo = saldoDestinoAtualizado;

    const dataFormatada = format(new Date(), "yyyy-MM-dd HH:mm:ss");

    transferencias.push({
        data: dataFormatada,
        numero_conta_origem: contaOrigemEncontrada.numero,
        numero_conta_destino: contaDestinoEncontrada.numero,
        valor: Number(valor)
    });

    return res.status(200).json({mensagem: "Transferência realizada com sucesso."});

};



module.exports = {
    depositar,
    sacar,
    transferir
}