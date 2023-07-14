Trabalho de Implementação de Contrato Inteligente - Loteria em Solidity
Bruno Cipriani Cerqueira
Instituto de Computação – Universidade Federal Fluminense (UFF)
Niterói – RJ – Brazil

1. Resumo: 
O contrato inteligente Loteria utiliza a linguagem Solidity e a plataforma Ethereum para fornecer uma loteria descentralizada, transparente e confiável. Ele permite que os participantes contribuam financeiramente para jogar na loteria, define um limite de participantes, realiza sorteios aleatórios e distribui prêmios aos ganhadores.

2. Linguagem de programação utilizada: 
O contrato foi desenvolvido usando a linguagem Solidity. Ela permite definir a lógica e as regras do contrato, além de fornecer acesso aos recursos da blockchain Ethereum.
Esta linguagem foi projetada para ser de alto nível, semelhante ao JavaScript. Ela possui recursos avançados, como herança, bibliotecas, tipos de dados personalizados e muito mais. Além disso, é estaticamente tipada, o que significa que os tipos das variáveis são verificados em tempo de compilação. Os contratos escritos em Solidity são compilados em bytecode que é executado na máquina virtual Ethereum (EVM - Ethereum Virtual Machine). A EVM é responsável por executar o código dos contratos e manter o estado da blockchain Ethereum.
Solidity fornece acesso a recursos essenciais da plataforma Ethereum, como transações, variáveis de estado, eventos, modificadores, herança de contratos, entre outros. Ela suporta a escrita de testes automatizados usando frameworks populares, para este caso, utilizamos o Truffle.
No caso do Contrato Inteligente "Loteria", Solidity foi escolhida como a linguagem de programação devido à sua adequação para a escrita de contratos inteligentes na plataforma Ethereum. Ela fornece os recursos necessários para implementar a lógica da loteria, controlar as transações e garantir a execução correta das regras estabelecidas.

3. Funcionalidades: 
    O contrato oferece uma série de funcionalidades para permitir que os participantes joguem e concorram aos prêmios. Algumas das principais funcionalidades incluem: 
    - Participação: Os jogadores podem participar da loteria enviando uma contribuição financeira igual ou superior à taxa de participação definida. 
    - Sorteio Justo: O contrato realiza sorteios justos usando um algoritmo aleatório baseado em fatores como o bloco atual, a dificuldade do bloco e a lista de participantes. 
    - Prêmios: O ganhador do sorteio recebe o prêmio acumulado ou o valor definido como prêmio atual, que pode ser ajustado pela banca. 
    - Limite de Participantes: O contrato permite definir um limite máximo de participantes, encerrando as apostas quando esse limite é atingido. 
    - Configurações Personalizáveis: A banca tem controle sobre configurações importantes, como a taxa de participação e o prêmio atual. 
    - Restrição de Acesso: Certas funções são restritas à banca para garantir a integridade do jogo.
    - Transparência: Todos os participantes podem consultar a lista de participantes para verificar sua participação e acompanhar os resultados.

4. Métodos: 
    Para cumprir seu objetivo, o contrato é composto por vários métodos que desempenham funções específicas para permitir que os jogadores participem e concorram ao prêmio. Abaixo estão os principais métodos do contrato e sua descrição:
    - jogar(): Método que permite que os jogadores participem do jogo de loteria. Ao chamar esse método e enviar uma contribuição financeira igual ou superior à taxa de participação definida, um jogador é adicionado à lista de participantes. Se o limite de participantes for atingido, não será mais possível jogar nesta loteria. 
    - random(): Método que retorna um número aleatório com base em uma combinação de fatores, como o bloco atual, a dificuldade do bloco e a lista de participantes. Esse número aleatório é usado para determinar o índice do ganhador no sorteio. 
    - getGanhador(): Método que realiza o sorteio do ganhador da loteria. Primeiro, verifica se há participantes na lista. Em seguida, chama o método random() para obter o índice aleatório do ganhador. O endereço do ganhador correspondente ao índice sorteado é selecionado. Se o prêmio atual for igual a zero, o saldo total do contrato é transferido para o ganhador. Caso contrário, o valor do prêmio atual é transferido para o ganhador. Após o sorteio, a lista de participantes é reiniciada, o prêmio atual é zerado e as apostas são reabertas. 
    - definirTaxaParticipacao(): Método que permite que a banca defina a taxa de participação necessária para os participantes jogarem na loteria.
    - definirPremioAtual(): Método que permite que a banca defina o valor do prêmio atual. O prêmio atual é o valor que será transferido para o ganhador do sorteio. 
    - getParticipantes(): Método que retorna a lista de participantes do jogo de loteria. Os jogadores podem consultar essa lista para verificar se estão incluídos como participantes.

5. Testes: 
    A condução de testes é uma prática fundamental durante o processo de desenvolvimento de contratos inteligentes, visando garantir a sua robustez e confiabilidade. No âmbito do Contrato Inteligente "Loteria", foram empregados testes escritos em Solidity utilizando o framework Truffle. O Truffle é um framework amplamente adotado para o desenvolvimento, implantação e teste de contratos inteligentes na plataforma Ethereum. Essa ferramenta provê uma estrutura de teste poderosa e abrangente, possibilitando a criação de testes automatizados que verificam o comportamento esperado do contrato em diversas situações.
    Os testes em Solidity, executados através do Truffle, permitem a verificação precisa do correto funcionamento das funcionalidades do contrato, identificação de potenciais erros e garantia de que o contrato atue conforme o esperado, antes de ser implantado em um ambiente de produção.
    A seguir, serão descritos os principais testes implementados no Contrato Inteligente "Loteria". Cada teste desempenha um papel fundamental na realização do jogo, proporcionando funcionalidades como participação, sorteio, distribuição de prêmios e configurações personalizáveis.
    - “Deploy bem sucedido!": verifica se o deploy do contrato Loteria foi bem-sucedido, garantindo que o endereço do contrato esteja definido.
    - "Jogar bem sucedido!": verifica se a função jogar() permite que uma pessoa participe da loteria. Ele envia uma contribuição financeira em ether em nome do participante e confirma que ele foi adicionado à lista de participantes. 
    -"Jogar bem sucedido para múltiplas contas!": verifica se a função jogar() permite que várias contas participem na loteria. Ele envia uma contribuição financeira em ether de três contas diferentes e confirma que os jogadores foram adicionados corretamente à lista de participantes.
    - "Jogar mal sucedido pois número de participantes é maior que o limite!": verifica se a função jogar() falha quando o número de participantes excede o limite definido. Ele envia contribuições financeiras de três contas diferentes, atingindo o limite máximo de participantes definido como três, e tenta adicionar um quarto participante. O teste verifica que uma exceção é lançada, pois o participante 3 não pode jogar em uma loteria que está cheia.
    - "Necessário uma quantidade mínima de ether para jogar!": verifica se a função jogar() falha quando a quantidade de ether enviada como contribuição não atinge a taxa mínima para jogar. Ele tenta chamar a função jogar() com uma contribuição de 0 ether e verifica que uma exceção é lançada, pois não é possível jogar se a contribuição for menor que a taxa mínima. 
    - "Jogo precisa ser iniciado pela banca!": verifica que a função getGanhador() só pode ser chamada pela banca. Ele tenta chamar a função a partir de uma conta que não é a banca e verifica que uma exceção é lançada, pois só a banca pode executar esta função.. 
    - "Remunera o ganhador e esvazia o array de participantes!": verifica se a função getGanhador() remunera o ganhador corretamente e esvazia a lista de participantes. Ele envia uma contribuição financeira em ether de uma conta, verifica o saldo inicial da conta, chama a função getGanhador() e verifica se o saldo final da conta aumentou. Além disso, o teste verifica se a lista de participantes foi esvaziada após o sorteio. 
    - "A banca pode definir uma nova taxaParticipacao!": verifica se a função definirTaxaParticipacao() permite que a banca defina uma nova taxa de participação.
    - "A banca pode definir um novo premioAtual!": verifica se a função definirPremioAtual() permite que a banca defina um novo prêmio atual.

6. Referências: 
    - The Solidity Authors (2016-2023) “Solidity: Revision a1b79de6”, https://docs.soliditylang.org/en/v0.8.20/, Acessado em 07/2023.
    - Grider, S (2023) “Ethereum and Solidity: The Complete Developer’s Guide”, https://www.udemy.com/course/ethereum-and-solidity-the-complete-developers-guide/, Acessado em 07/2023.
