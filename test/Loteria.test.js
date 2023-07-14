const assert = require('assert');
const ganache = require('ganache');
const { Web3 } = require('web3');
const web3 = new Web3(ganache.provider());
const { interface, bytecode } = require("../compile");

let loteria;
let accounts;

beforeEach(async () => {
    accounts = await web3.eth.getAccounts();

    const limiteParticipantes = 3;

    loteria = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({ data: bytecode, arguments: [limiteParticipantes] })
        .send({ from: accounts[0], gas: "1000000" });
});

describe("Testes Loteria...", () => {
    it("Deploy bem sucedido!", () => {
        assert.ok(loteria.options.address);
    });

    it("Jogar bem sucedido!", async () => {
        await loteria.methods.jogar().send({
            from: accounts[0],
            value: web3.utils.toWei('0.02', 'ether')
        });

        const participantes = await loteria.methods.getParticipantes().call({
            from: accounts[0]
        });

        assert.equal(accounts[0], participantes[0]);
        assert.equal(1, participantes.length);
    });

    it("Jogar bem sucedido para múltiplas contas!", async () => {
        await loteria.methods.jogar().send({
            from: accounts[0],
            value: web3.utils.toWei('0.02', 'ether')
        });
        await loteria.methods.jogar().send({
            from: accounts[1],
            value: web3.utils.toWei('0.02', 'ether')
        });
        await loteria.methods.jogar().send({
            from: accounts[2],
            value: web3.utils.toWei('0.02', 'ether')
        });

        const participantes = await loteria.methods.getParticipantes().call({
            from: accounts[0]
        });

        assert.equal(accounts[0], participantes[0]);
        assert.equal(accounts[1], participantes[1]);
        assert.equal(accounts[2], participantes[2]);
        assert.equal(3, participantes.length);
    });

    it("Jogar mal sucedido pois número de participantes é maior que o limite!", async () => {
        await loteria.methods.jogar().send({
            from: accounts[0],
            value: web3.utils.toWei('0.02', 'ether')
        });
        await loteria.methods.jogar().send({
            from: accounts[1],
            value: web3.utils.toWei('0.02', 'ether')
        });
        await loteria.methods.jogar().send({
            from: accounts[2],
            value: web3.utils.toWei('0.02', 'ether')
        });

        try {
            await loteria.methods.jogar().send({
                from: accounts[3],
                value: web3.utils.toWei('0.02', 'ether')
            });
            assert(false);  // força a falha
        } catch (error) {
            assert.ok(error);
        }
    });

    it("Necessário uma quantidade mínima de ether para jogar!", async () => {
        try {
            await loteria.methods.jogar().send({
                from: accounts[0],
                value: 0
            });
            assert(false);  // força a falha
        } catch (error) {
            assert.ok(error);
        }
    });

    it("Jogo precisa ser iniciado pela banca!", async () => {
        try {
            await loteria.methods.getGanhador().send({
                from: accounts[1]
            });
            assert(false);  // força a falha
        } catch (error) {
            assert.ok(error);
        }
    });

    it("Remunera o ganhador e esvazia o array de participantes!", async () => {
        await loteria.methods.jogar().send({
            from: accounts[0],
            value: web3.utils.toWei('2', 'ether')
        });

        const carteiraInicial = await web3.eth.getBalance(accounts[0]);
        await loteria.methods.getGanhador().send({ from: accounts[0] });
        const carteiraFinal = await web3.eth.getBalance(accounts[0]);
        const diferenca = carteiraFinal - carteiraInicial;

        assert(diferenca > web3.utils.toWei('1.8', 'ether'))

        const participantes = await loteria.methods.getParticipantes().call({
            from: accounts[0]
        });
        
        assert.equal(0, participantes.length);
    });

    it("A banca pode definir uma nova taxaParticipacao!", async () => {
        const novaTaxa = web3.utils.toWei("0.02", "ether");

        await loteria.methods.definirTaxaParticipacao(novaTaxa).send({
            from: accounts[0]
        });

        const taxaAtual = await loteria.methods.taxaParticipacao().call();
        assert.equal(taxaAtual, novaTaxa);
    });

    it("A banca pode definir um novo premioAtual!", async () => {
        const novoPremio = web3.utils.toWei("0.04", "ether");

        await loteria.methods.definirPremioAtual(novoPremio).send({
            from: accounts[0]
        });

        const premioAtual = await loteria.methods.premioAtual().call();
        assert.equal(premioAtual, novoPremio);
    });
});