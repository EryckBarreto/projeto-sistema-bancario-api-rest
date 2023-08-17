const express = require('express');
const controladoresContas = require("./controladores/gestaoContasBancarias");
const controladoresTransacoes = require("./controladores/transacoesContasBancarias");
const controladoresRelatoriosContas = require("./controladores/relatoriosContasBancarias");
const { validarSenhaDoBanco } = require("./intermediarios");

const rota = express();
rota.use(express.json());

rota.get("/contas", validarSenhaDoBanco, controladoresContas.listarContasBancarias);
rota.post("/contas", controladoresContas.abrirContaBancaria);
rota.put("/contas/:numeroConta/usuario", controladoresContas.atualizarUsuarioContaBancaria);
rota.delete("/contas/:numeroConta", controladoresContas.deletarContaBancaria);

rota.post("/transacoes/depositar", controladoresTransacoes.depositar);
rota.post("/transacoes/sacar", controladoresTransacoes.sacar);
rota.post("/transacoes/transferir", controladoresTransacoes.transferir);

rota.get("/contas/saldo", controladoresRelatoriosContas.consultarSaldoContaBancaria);
rota.get("/contas/extrato", controladoresRelatoriosContas.consultarExtratoContaBancaria);

module.exports = rota;