let { banco, contas, saques, depositos, transferencias  } = require("./bancodedados");

const validarSenhaDoBanco = (req, res, next) => {
    const { senha_banco } = req.query;

    if (!senha_banco) {
        res.status(401).json({mensagem: "Digite uma senha por favor."});
    };
    
    if (senha_banco !== banco.senha) {
        res.status(401).json({mensagem: "Senha inválida, tente novamente."});
    };


    next();

};

module.exports = {
    validarSenhaDoBanco
}