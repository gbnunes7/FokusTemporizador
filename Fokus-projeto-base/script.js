const html = document.querySelector("html");
const focoBt = document.querySelector(".app__card-button--foco");
const curtoBt = document.querySelector(".app__card-button--curto");
const longoBt = document.querySelector(".app__card-button--longo");
const imagem = document.querySelector(".app__image");
const titulo = document.querySelector(".app__title");
const botoes = document.querySelectorAll(".app__card-button");
const botaoMusicaFoco = document.querySelector("#alternar-musica");
const startPauseBttxt = document.querySelector("#start-pause span");
const musica = new Audio("/sons/luna-rise-part-one.mp3");
const musicaPlay = new Audio("/sons/play.mp3");
const musicaPause = new Audio("/sons/pause.mp3");
const musicaZero = new Audio("/sons/beep.mp3");
const tempoTela = document.querySelector("#timer");
const startPauseBt = document.querySelector("#start-pause");
const imagemPausePlay = document.querySelector(".app__card-primary-butto-icon");
let tempoDecorridoEmSegundos = 1500;
let intervalId = null
musica.loop = true;




botaoMusicaFoco.addEventListener("change", () => {
    if (musica.paused) {
        musica.play();
    } else {
        musica.pause();
    }
})

function alterarContexto(contexto) {
    botoes.forEach(function (contexto) {
        contexto.classList.remove("active");
    })
    html.setAttribute("data-contexto", contexto)
    imagem.setAttribute("src", `imagens/${contexto}.png`)
    if (contexto == "foco") {
        titulo.innerHTML = "Otimize sua produtividade, <strong class='app__title-strong'>mergulhe no que importa</strong>";
    } else if (contexto == "descanso-curto") {
        titulo.innerHTML = "Que tal dar uma respirada? <strong class='app__title-strong'>Faça uma pausa curta!";
    } else if (contexto == "descanso-longo") {
        titulo.innerHTML = "Hora de voltar a superfície. <strong class='app__title-strong'>Faça uma pausa longa.";
    }
}

focoBt.addEventListener("click", () => {
    mostrarTempo();
    tempoDecorridoEmSegundos = 1500
    alterarContexto("foco");
    focoBt.classList.add("active");
});

curtoBt.addEventListener("click", () => {
    mostrarTempo();
    tempoDecorridoEmSegundos = 300
    alterarContexto("descanso-curto");
    curtoBt.classList.add("active");
});

longoBt.addEventListener("click", () => {
    mostrarTempo();
    tempoDecorridoEmSegundos = 900
    alterarContexto("descanso-longo");
    longoBt.classList.add("active");
})

const contagemRegressiva = () => {
    if (tempoDecorridoEmSegundos <= 0) {
    alert("Tempo finalizado");
    musicaZero.play();
    zerar();
    return
    } 
    tempoDecorridoEmSegundos-= 1
    mostrarTempo();
}

function iniciarOuPausar() {
    if (intervalId) {
        zerar();
        return
    }
    musicaPlay.play()
    startPauseBttxt.textContent = "Pausar"
    startPauseBt.addEventListener ("click", () => {
        imagemPausePlay.setAttribute ("src",`/imagens/${"play_arrow"}.png`)
    })
    
    
    
    intervalId = setInterval(contagemRegressiva, 1000)
}

function zerar() {
    clearInterval(intervalId);
    intervalId = null;
    musicaPause.play();
    startPauseBttxt.textContent = "Começar"
    startPauseBt.addEventListener ("click", () => {
        imagemPausePlay.setAttribute ("src",`/imagens/${"pause"}.png`)
    })
}

startPauseBt.addEventListener("click", iniciarOuPausar);

function mostrarTempo() {
    const tempo = new Date (tempoDecorridoEmSegundos * 1000)
    const tempoFormatado = tempo.toLocaleTimeString("pt-Br", {minute: '2-digit', second: '2-digit'});
    tempoTela.innerHTML = `${tempoFormatado}`;
}

mostrarTempo();
