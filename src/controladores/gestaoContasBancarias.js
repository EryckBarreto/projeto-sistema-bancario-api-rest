let { contas } = require("../bancodedados");
const { encontrarConta } = require("./funcoes");
let identificadorInicialDasContas = 1;

const listarContasBancarias = (req, res) => {
    
    if (contas.length < 1) {
        return res.status(404).json({mensagem: "Nenhuma conta encontrada."});
    }

    return res.status(200).json(contas);
};

const abrirContaBancaria = (req, res) => {

    const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;

    if (!nome || !cpf || !data_nascimento || !telefone || !email || !senha) {
        res.status(400).json({mensagem: "Todos os campos precisam ser preenchidos."})
    };
    // esse bloco é para verificar se já tem conta cadastrada com esse cpf ou e-mail
    const contaExiste = contas.find((conta) => {
        return conta.usuario.cpf === cpf || conta.usuario.email === email;
    });

    if (contaExiste) {
        return res.status(409).json({mensagem: "CPF ou e-mail já cadastrados."});
    };

    const novaConta = {
        numero: identificadorInicialDasContas++,
        saldo: 0,
        usuario: {
            nome,
            cpf,
            data_nascimento,
            telefone,
            email,
            senha
        }
    };


    contas.push(novaConta);
    return res.status(201).json(novaConta);

};

const atualizarUsuarioContaBancaria = (req, res) => {

    const { numeroConta } = req.params;
    const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;

    //verificar se existe a conta
    const contaEncontrada = encontrarConta(numeroConta);

    if (!contaEncontrada) {
        return res.status(404).json({mensagem: "Conta não encontrada."});
    };

    if (!nome && !cpf && !data_nascimento && !telefone && !email && !senha) {
        res.status(400).json({mensagem: "Pelo menos um dos campos precisa estar preenchidos."})
    };

    // esse bloco é para verificar se existe outra conta cadastrada com esse cpf ou e-mail
    if (cpf || email) {

        const contaExisteCpfEmail = contas.find((conta) => {
            return conta.usuario.cpf === cpf || conta.usuario.email === email;
        });

        if (contaExisteCpfEmail && contaExisteCpfEmail.numero !== Number(numeroConta)) {
            return res.status(409).json({mensagem: "CPF ou e-mail já cadastrados."});
        };
    };

    //realizadas as validações acima, a atualização pode ser realizada
    if (nome) {
        contaEncontrada.usuario.nome = nome;
    };

    if (cpf) {
        contaEncontrada.usuario.nome = cpf;
    };

    if (data_nascimento) {
        contaEncontrada.usuario.data_nascimento = data_nascimento;
    };

    if (telefone) {
        contaEncontrada.usuario.telefone = telefone;
    };

    if (email) {
        contaEncontrada.usuario.senha = senha;
    };

    return res.status(200).json({mensagem: "Informações atualizadas com sucesso."});
};

const deletarContaBancaria = (req, res) => {

    const { numeroConta } = req.params;

    const contaEncontrada = encontrarConta(numeroConta);

    if (!contaEncontrada) {
        return res.status(404).json({mensagem: "Conta não encontrada."});
    };

    if (contaEncontrada.saldo > 0) {
        return res.status(400).json({mensagem: "Não é possível encerrar conta com saldo."});
    };  

    contas.pop();

    return res.status(200).json({mensagem: "Conta encerrada com sucesso."});

};

module.exports = {
    listarContasBancarias,
    abrirContaBancaria,
    atualizarUsuarioContaBancaria,
    deletarContaBancaria
}
