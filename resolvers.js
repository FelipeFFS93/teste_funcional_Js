const Conta = require("./Conta");
let newSaldo;

module.exports = {
    Query: {
        contas: () => Conta.find(),
        conta: (root, {
            numero
        }) => Conta.findOne({
            numero
        }),
    },

    Mutation: {
        createConta: (root, {
            numero,
            saldo,
            cliente
        }) => Conta.create({
            numero,
            saldo,
            cliente
        }),

        depositar: (root, {
                numero,
                valor
            }) => Conta.findOne({
                numero
            })
            .then(() => Conta.updateOne({
                numero
            }, {
                $inc: {
                    saldo: valor
                }
            }))
            .then(() => Conta.findOne({
                numero
            })),

        sacar: (root, {
                numero,
                valor
            }) => Conta.findOne({
                numero
            })
            .then(value => {
                newSaldo = value.saldo
                if (valor > value.saldo) {
                    throw new Error("Saldo Insuficiente")
                } else {
                    newSaldo = value.saldo - valor
                }
            })
            .then(() => Conta.updateOne({
                numero
            }, {
                $set: {
                    saldo: newSaldo
                }
            }))
            .then(() => Conta.findOne({
                numero
            }))
    },
}