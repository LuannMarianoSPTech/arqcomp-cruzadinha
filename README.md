# Cruzadinha de Arquitetura Computacional

Jogo de cruzadinha com visual retrô pixel para treinar os termos da aula de Tópicos de Arquitetura Computacional. Feito com HTML, CSS e JavaScript puros.

**Jogue aqui:** https://luannmarianosptech.github.io/arqcomp-cruzadinha/

## Como jogar

1. Clique numa casa do tabuleiro ou numa pista da lista para escolher uma palavra.
2. Digite as letras direto nas casas. O cursor avança sozinho para a próxima casa da palavra.
3. Clique em **Conferir** (ou aperte Enter) para ver quais palavras estão certas (verde) e quais estão erradas (vermelho). O contador mostra quantas você acertou, por exemplo "8 de 16 palavras".
4. Clique em **Reiniciar** para limpar o tabuleiro e começar de novo.

### Atalhos de teclado

| Tecla | O que faz |
|---|---|
| Setas | Movem entre as casas |
| Espaço | Troca entre a palavra horizontal e a vertical da casa |
| Backspace | Apaga a letra e volta uma casa |
| Tab / Shift+Tab | Vai para a próxima / anterior palavra |
| Enter | Confere as respostas |

Também dá para clicar de novo na mesma casa para trocar a direção.

## Palavras e pistas

O tabuleiro usa as 16 palavras da lista, e cada uma cruza com pelo menos outra.

### Horizontais

| Nº | Palavra | Pista |
|---|---|---|
| 1 | MICROCONTROLADOR | Chip único com processador, memória e periféricos, usado em sistemas embarcados como Arduino. |
| 6 | DMA | Permite que periféricos troquem dados com a RAM sem ocupar o processador. |
| 11 | DUALCORE | Processador com dois núcleos capazes de executar tarefas ao mesmo tempo. |
| 12 | EEPROM | Memória permanente regravável byte a byte, usada para guardar pequenas configurações. |
| 13 | QUADCORE | Processador com quatro núcleos trabalhando em paralelo, comum em celulares atuais. |
| 15 | DATABUS | Linhas bidirecionais por onde trafegam as informações lidas ou gravadas na memória. |
| 16 | MEMORIADEMASSA | Guarda arquivos permanentemente e em grande quantidade; o HD é um exemplo. |

### Verticais

| Nº | Palavra | Pista |
|---|---|---|
| 2 | REGISTRADORES | Pequenas posições de armazenamento dentro do processador, as mais rápidas de todas. |
| 3 | CPU | Cérebro do computador: busca, decodifica e executa as instruções dos programas. |
| 4 | ROM | Memória não volátil gravada na fábrica, cujo conteúdo o usuário comum não altera. |
| 5 | CACHE | Memória pequena e rapidíssima entre processador e RAM; guarda dados usados com frequência. |
| 7 | ADDRESSBUS | Linhas que levam do processador a posição da memória que será lida ou escrita. |
| 8 | FLASH | Memória permanente regravável em blocos, usada em pendrives, SSDs e cartões SD. |
| 9 | RAM | Memória principal e volátil onde ficam os programas em execução. |
| 10 | UC | Coordena o processador: interpreta instruções e envia sinais que comandam as demais partes. |
| 14 | ULA | Circuito do processador que soma, subtrai e compara valores binários. |

## Estrutura do projeto

```
index.html   página do jogo
style.css    visual retrô pixel
script.js    tabuleiro, pistas e regras do jogo
README.md    este arquivo
```

## Tecnologias

- HTML, CSS e JavaScript puros (sem bibliotecas)
- Fontes Press Start 2P e VT323 (Google Fonts)
- Publicado com GitHub Pages
