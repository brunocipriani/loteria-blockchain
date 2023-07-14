pragma solidity ^0.4.17;

contract Loteria {
    address public banca;
    address[] public participantes;
    uint public limiteParticipantes;
    uint public taxaParticipacao;
    uint public premioAtual;
    bool public apostasEncerradas;

    function Loteria(uint _limiteParticipantes) public {
        banca = msg.sender;
        taxaParticipacao = 0.01 ether;  // Taxa padrão
        premioAtual = 0;                // Prêmio padrão
        limiteParticipantes = _limiteParticipantes;
        apostasEncerradas = false;
    }

    // Se jogador possuir um valor maior que a taxa de participação definida, ele entra no jogo
    function jogar() public payable {
        require(!apostasEncerradas);
        require(msg.value >= taxaParticipacao);

        participantes.push(msg.sender);

        if (participantes.length == limiteParticipantes) {
            apostasEncerradas = true;
        }
    }

    // Define a taxa de participação. Padrão: 0.01 ether
    function definirTaxaParticipacao(uint novaTaxa) public restringirAcesso {
        require(novaTaxa > 0);
        taxaParticipacao = novaTaxa;
    }

    function definirPremioAtual(uint novoPremio) public restringirAcesso {
        require(novoPremio >= 0);
        premioAtual = novoPremio;
    }

    function random() public view returns (uint) {
        return uint(keccak256(block.difficulty, now, participantes));
    }

    function getGanhador() public restringirAcesso {
        require(participantes.length > 0);

        uint index = random() % participantes.length;
        address ganhador = participantes[index];

        if (premioAtual == 0) {
            ganhador.transfer(this.balance);
        } else {
            ganhador.transfer(premioAtual);
        }

        participantes = new address[](0);
        premioAtual = 0;
        apostasEncerradas = false;
    }

    modifier restringirAcesso() {
        require(msg.sender == banca);
        _;
    }

    function getParticipantes() public view returns (address[]) {
        return participantes;
    }
}
