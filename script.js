// ==========================================================
// Cruzadinha de Arquitetura Computacional
// HTML, CSS e JavaScript puros
// ==========================================================

// ---------- Dados do tabuleiro ----------
// linha e coluna começam em 0. "H" = horizontal, "V" = vertical.
const LINHAS = 13;
const COLUNAS = 16;

const PALAVRAS = [
  { resposta: "MICROCONTROLADOR", linha: 0,  coluna: 0,  direcao: "H",
    pista: "Chip único com processador, memória e periféricos, usado em sistemas embarcados como Arduino." },
  { resposta: "REGISTRADORES",    linha: 0,  coluna: 3,  direcao: "V",
    pista: "Pequenas posições de armazenamento dentro do processador, as mais rápidas de todas." },
  { resposta: "CPU",              linha: 0,  coluna: 5,  direcao: "V",
    pista: "Cérebro do computador: busca, decodifica e executa as instruções dos programas." },
  { resposta: "ROM",              linha: 0,  coluna: 15, direcao: "V",
    pista: "Memória não volátil gravada na fábrica, cujo conteúdo o usuário comum não altera." },
  { resposta: "CACHE",            linha: 2,  coluna: 0,  direcao: "V",
    pista: "Memória pequena e rapidíssima entre processador e RAM; guarda dados usados com frequência." },
  { resposta: "DMA",              linha: 2,  coluna: 11, direcao: "H",
    pista: "Permite que periféricos troquem dados com a RAM sem ocupar o processador." },
  { resposta: "ADDRESSBUS",       linha: 2,  coluna: 13, direcao: "V",
    pista: "Linhas que levam do processador a posição da memória que será lida ou escrita." },
  { resposta: "FLASH",            linha: 3,  coluna: 9,  direcao: "V",
    pista: "Memória permanente regravável em blocos, usada em pendrives, SSDs e cartões SD." },
  { resposta: "RAM",              linha: 4,  coluna: 5,  direcao: "V",
    pista: "Memória principal e volátil onde ficam os programas em execução." },
  { resposta: "UC",               linha: 4,  coluna: 11, direcao: "V",
    pista: "Coordena o processador: interpreta instruções e envia sinais que comandam as demais partes." },
  { resposta: "DUALCORE",         linha: 5,  coluna: 7,  direcao: "H",
    pista: "Processador com dois núcleos capazes de executar tarefas ao mesmo tempo." },
  { resposta: "EEPROM",           linha: 6,  coluna: 0,  direcao: "H",
    pista: "Memória permanente regravável byte a byte, usada para guardar pequenas configurações." },
  { resposta: "QUADCORE",         linha: 8,  coluna: 0,  direcao: "H",
    pista: "Processador com quatro núcleos trabalhando em paralelo, comum em celulares atuais." },
  { resposta: "ULA",              linha: 8,  coluna: 1,  direcao: "V",
    pista: "Circuito do processador que soma, subtrai e compara valores binários." },
  { resposta: "DATABUS",          linha: 9,  coluna: 9,  direcao: "H",
    pista: "Linhas bidirecionais por onde trafegam as informações lidas ou gravadas na memória." },
  { resposta: "MEMORIADEMASSA",   linha: 11, coluna: 2,  direcao: "H",
    pista: "Guarda arquivos permanentemente e em grande quantidade; o HD é um exemplo." },
];

// ---------- Estado do jogo ----------
const casas = [];          // casas[linha][coluna] = { resposta, input, elemento, palavras: [] }
let palavraAtiva = null;   // palavra selecionada
let direcaoAtual = "H";    // direção preferida ao clicar numa casa

const tabuleiroEl = document.getElementById("tabuleiro");
const listaH = document.getElementById("pistas-horizontais");
const listaV = document.getElementById("pistas-verticais");
const contadorEl = document.getElementById("contador");
const pistaAtivaEl = document.getElementById("pista-ativa");
const mensagemEl = document.getElementById("mensagem");

// ---------- Montagem do tabuleiro ----------
function celulasDaPalavra(p) {
  const lista = [];
  for (let i = 0; i < p.resposta.length; i++) {
    const l = p.linha + (p.direcao === "V" ? i : 0);
    const c = p.coluna + (p.direcao === "H" ? i : 0);
    lista.push(casas[l][c]);
  }
  return lista;
}

function montarTabuleiro() {
  tabuleiroEl.style.setProperty("--colunas", COLUNAS);
  tabuleiroEl.style.setProperty("--linhas", LINHAS);

  for (let l = 0; l < LINHAS; l++) {
    casas.push([]);
    for (let c = 0; c < COLUNAS; c++) casas[l].push(null);
  }

  // marca as casas que têm letra
  PALAVRAS.forEach((p) => {
    for (let i = 0; i < p.resposta.length; i++) {
      const l = p.linha + (p.direcao === "V" ? i : 0);
      const c = p.coluna + (p.direcao === "H" ? i : 0);
      if (!casas[l][c]) casas[l][c] = { linha: l, coluna: c, resposta: p.resposta[i], palavras: [] };
      casas[l][c].palavras.push(p);
    }
  });

  // numeração: percorre da esquerda para a direita, de cima para baixo
  let numero = 1;
  const inicioNumero = {};
  for (let l = 0; l < LINHAS; l++) {
    for (let c = 0; c < COLUNAS; c++) {
      const comecam = PALAVRAS.filter((p) => p.linha === l && p.coluna === c);
      if (comecam.length) {
        inicioNumero[l + "," + c] = numero;
        comecam.forEach((p) => (p.numero = numero));
        numero++;
      }
    }
  }

  // cria os elementos
  for (let l = 0; l < LINHAS; l++) {
    for (let c = 0; c < COLUNAS; c++) {
      const casa = casas[l][c];
      const div = document.createElement("div");
      if (!casa) {
        div.className = "casa vazia";
        tabuleiroEl.appendChild(div);
        continue;
      }
      div.className = "casa";
      const num = inicioNumero[l + "," + c];
      if (num) {
        const span = document.createElement("span");
        span.className = "numero";
        span.textContent = num;
        div.appendChild(span);
      }
      const input = document.createElement("input");
      input.type = "text";
      input.maxLength = 1;
      input.autocomplete = "off";
      input.autocapitalize = "characters";
      input.spellcheck = false;
      input.setAttribute("aria-label", `Linha ${l + 1}, coluna ${c + 1}`);
      div.appendChild(input);
      tabuleiroEl.appendChild(div);

      casa.elemento = div;
      casa.input = input;
      ligarEventos(casa);
    }
  }
}

// ---------- Pistas ----------
function montarPistas() {
  const ordenadas = [...PALAVRAS].sort((a, b) => a.numero - b.numero);
  ordenadas.forEach((p) => {
    const li = document.createElement("li");
    li.className = "pista";
    li.innerHTML = `<span class="pista-num">${p.numero}</span>
      <span class="pista-texto">${p.pista} <em>(${p.resposta.length})</em></span>
      <span class="pista-status" aria-hidden="true"></span>`;
    li.addEventListener("click", () => selecionarPalavra(p, 0));
    p.itemPista = li;
    (p.direcao === "H" ? listaH : listaV).appendChild(li);
  });
}

// ---------- Seleção e destaque ----------
function selecionarPalavra(p, indice) {
  palavraAtiva = p;
  direcaoAtual = p.direcao;
  atualizarDestaque();
  const celulas = celulasDaPalavra(p);
  const alvo = indice != null ? celulas[indice] : celulas.find((c) => !c.input.value) || celulas[0];
  alvo.input.focus();
}

function atualizarDestaque() {
  document.querySelectorAll(".casa.na-palavra").forEach((el) => el.classList.remove("na-palavra"));
  document.querySelectorAll(".pista.ativa").forEach((el) => el.classList.remove("ativa"));
  if (!palavraAtiva) return;

  celulasDaPalavra(palavraAtiva).forEach((c) => c.elemento.classList.add("na-palavra"));
  palavraAtiva.itemPista.classList.add("ativa");
  palavraAtiva.itemPista.scrollIntoView({ block: "nearest", behavior: "smooth" });

  const nomeDirecao = palavraAtiva.direcao === "H" ? "HORIZONTAL" : "VERTICAL";
  pistaAtivaEl.innerHTML = `<strong>${palavraAtiva.numero} ${nomeDirecao}</strong> ${palavraAtiva.pista}`;
}

function palavraDaCasa(casa, preferida) {
  return casa.palavras.find((p) => p.direcao === preferida) || casa.palavras[0];
}

// ---------- Teclado e digitação ----------
function moverPara(linha, coluna) {
  if (linha < 0 || linha >= LINHAS || coluna < 0 || coluna >= COLUNAS) return false;
  const casa = casas[linha][coluna];
  if (!casa) return false;
  casa.input.focus();
  return true;
}

// anda pelas casas na direção (dl, dc), pulando casas vazias
function andar(casa, dl, dc) {
  let l = casa.linha + dl;
  let c = casa.coluna + dc;
  while (l >= 0 && l < LINHAS && c >= 0 && c < COLUNAS) {
    if (casas[l][c]) return moverPara(l, c);
    l += dl;
    c += dc;
  }
  return false;
}

function proximaCasaNaPalavra(casa, passo) {
  if (!palavraAtiva) return;
  const celulas = celulasDaPalavra(palavraAtiva);
  const i = celulas.indexOf(casa);
  const destino = celulas[i + passo];
  if (destino) destino.input.focus();
}

function ligarEventos(casa) {
  const input = casa.input;

  input.addEventListener("focus", () => {
    if (!palavraAtiva || !casa.palavras.includes(palavraAtiva)) {
      palavraAtiva = palavraDaCasa(casa, direcaoAtual);
      atualizarDestaque();
    }
    document.querySelectorAll(".casa.foco").forEach((el) => el.classList.remove("foco"));
    casa.elemento.classList.add("foco");
    input.select();
  });

  input.addEventListener("blur", () => casa.elemento.classList.remove("foco"));

  // clicar de novo na casa já selecionada troca a direção
  input.addEventListener("mousedown", () => {
    if (document.activeElement === input) alternarDirecao(casa);
  });

  // "input" funciona também no teclado do celular
  input.addEventListener("input", () => {
    const letra = limparLetra(input.value);
    input.value = letra;
    limparMarcacoes(casa);
    if (letra) proximaCasaNaPalavra(casa, 1);
  });

  input.addEventListener("keydown", (e) => {
    switch (e.key) {
      case "ArrowRight": e.preventDefault(); direcaoAtual = "H"; andar(casa, 0, 1); break;
      case "ArrowLeft":  e.preventDefault(); direcaoAtual = "H"; andar(casa, 0, -1); break;
      case "ArrowDown":  e.preventDefault(); direcaoAtual = "V"; andar(casa, 1, 0); break;
      case "ArrowUp":    e.preventDefault(); direcaoAtual = "V"; andar(casa, -1, 0); break;
      case " ":
        e.preventDefault();
        alternarDirecao(casa);
        break;
      case "Backspace":
        if (!input.value) {
          e.preventDefault();
          proximaCasaNaPalavra(casa, -1);
          const atual = document.activeElement;
          if (atual !== input && atual.tagName === "INPUT") {
            atual.value = "";
            limparMarcacoes(casaDoInput(atual));
          }
        }
        break;
      case "Delete":
        input.value = "";
        limparMarcacoes(casa);
        break;
      case "Enter":
        e.preventDefault();
        conferir();
        break;
      case "Tab":
        e.preventDefault();
        pularPalavra(e.shiftKey ? -1 : 1);
        break;
      default:
        // se já tem letra, substitui pela nova
        if (/^[a-zA-ZÀ-ÿ]$/.test(e.key)) input.value = "";
    }
  });
}

function alternarDirecao(casa) {
  const outra = casa.palavras.find((p) => p !== palavraAtiva);
  if (outra) {
    palavraAtiva = outra;
    direcaoAtual = outra.direcao;
    atualizarDestaque();
  }
}

function pularPalavra(passo) {
  const ordem = [
    ...PALAVRAS.filter((p) => p.direcao === "H"),
    ...PALAVRAS.filter((p) => p.direcao === "V"),
  ].sort((a, b) => (a.direcao === b.direcao ? a.numero - b.numero : a.direcao === "H" ? -1 : 1));
  const i = ordem.indexOf(palavraAtiva);
  const proxima = ordem[(i + passo + ordem.length) % ordem.length];
  selecionarPalavra(proxima);
}

function casaDoInput(input) {
  for (const linha of casas) for (const casa of linha) if (casa && casa.input === input) return casa;
  return null;
}

// tira acento, deixa maiúscula e aceita só A-Z
function limparLetra(valor) {
  const letra = valor.normalize("NFD").replace(/[̀-ͯ]/g, "").toUpperCase().replace(/[^A-Z]/g, "");
  return letra.slice(-1);
}

// ---------- Conferir ----------
function palavraDigitada(p) {
  return celulasDaPalavra(p).map((c) => c.input.value || " ").join("");
}

function conferir() {
  let acertos = 0;
  limparTodasMarcacoes();

  PALAVRAS.forEach((p) => {
    p.certa = palavraDigitada(p) === p.resposta;
    if (p.certa) acertos++;
    p.itemPista.classList.add(p.certa ? "certa" : "errada");
  });

  // uma casa fica verde se faz parte de alguma palavra certa
  casas.flat().filter(Boolean).forEach((casa) => {
    const certa = casa.palavras.some((p) => p.certa);
    casa.elemento.classList.add(certa ? "certa" : "errada");
    if (!certa && !casa.input.value) casa.elemento.classList.add("sem-letra");
  });

  atualizarContador(acertos);

  if (acertos === PALAVRAS.length) {
    mensagemEl.textContent = "PARABÉNS! VOCÊ COMPLETOU A CRUZADINHA!";
    mensagemEl.className = "mensagem vitoria";
  } else {
    const faltam = PALAVRAS.length - acertos;
    mensagemEl.textContent = `Faltam ${faltam} ${faltam === 1 ? "palavra" : "palavras"}: as erradas estão em vermelho.`;
    mensagemEl.className = "mensagem aviso";
  }
}

function atualizarContador(acertos) {
  contadorEl.textContent = `${acertos} de ${PALAVRAS.length} palavras`;
}

// ao editar uma casa, tira as marcações das palavras que passam por ela
function limparMarcacoes(casa) {
  if (!casa) return;
  casa.palavras.forEach((p) => {
    p.itemPista.classList.remove("certa", "errada");
    p.certa = false;
  });
  // as casas dessas palavras só continuam verdes se outra palavra certa passa por elas
  casa.palavras.forEach((p) => {
    celulasDaPalavra(p).forEach((c) => {
      if (!c.palavras.some((outra) => outra.certa)) c.elemento.classList.remove("certa", "errada", "sem-letra");
    });
  });
  mensagemEl.textContent = "";
  mensagemEl.className = "mensagem";
}

function limparTodasMarcacoes() {
  document.querySelectorAll(".certa, .errada").forEach((el) => el.classList.remove("certa", "errada", "sem-letra"));
  PALAVRAS.forEach((p) => (p.certa = false));
}

// ---------- Reiniciar ----------
function reiniciar() {
  casas.flat().filter(Boolean).forEach((casa) => (casa.input.value = ""));
  limparTodasMarcacoes();
  atualizarContador(0);
  mensagemEl.textContent = "";
  mensagemEl.className = "mensagem";
  palavraAtiva = null;
  atualizarDestaque();
  pistaAtivaEl.textContent = "Clique numa casa ou numa pista e digite. Espaço troca a direção.";
}

// ---------- Início ----------
document.getElementById("btn-conferir").addEventListener("click", conferir);
document.getElementById("btn-reiniciar").addEventListener("click", reiniciar);

montarTabuleiro();
montarPistas();
atualizarContador(0);
