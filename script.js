let currentIndex = 0;
let startX = 0;
let isDragging = false;
let intervalo;

const carrosselContainer = document.querySelector('.carrossel-container');
const totalItems = document.querySelectorAll('.carrossel-item').length;

// Função para mover o carrossel
function moverCarrossel(direction) {
    currentIndex += direction;

    if (currentIndex < 0) {
        currentIndex = totalItems - 1; // Volta para a última imagem
    } else if (currentIndex >= totalItems) {
        currentIndex = 0; // Volta para a primeira imagem
    }

    atualizarCarrossel();
}

// Função para atualizar a posição do carrossel
function atualizarCarrossel() {
    const offset = -currentIndex * 100;
    carrosselContainer.style.transform = `translateX(${offset}%)`;
    carrosselContainer.style.transition = 'transform 0.5s ease-in-out'; // Transição suave
}

// Função para iniciar o arrasto
function iniciarArrasto(e) {
    isDragging = true;
    startX = e.type === 'touchstart' ? e.touches[0].clientX : e.clientX;
    carrosselContainer.style.transition = 'none'; // Remove a transição durante o arrasto
}

// Função para arrastar
function arrastar(e) {
    if (!isDragging) return;

    const currentX = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX;
    const diffX = currentX - startX;
    carrosselContainer.style.transform = `translateX(${-currentIndex * 100 + (diffX / carrosselContainer.offsetWidth) * 100}%)`;
}

// Função para finalizar o arrasto
function finalizarArrasto(e) {
    if (!isDragging) return;

    isDragging = false;
    const endX = e.type === 'touchend' ? e.changedTouches[0].clientX : e.clientX;
    const diffX = endX - startX;

    // Verifica se o arrasto foi significativo para mudar de imagem
    if (Math.abs(diffX) > carrosselContainer.offsetWidth * 0.2) {
        if (diffX > 0) {
            moverCarrossel(-1); // Arrastou para a direita (avança para a esquerda)
        } else {
            moverCarrossel(1); // Arrastou para a esquerda (avança para a direita)
        }
    } else {
        atualizarCarrossel(); // Volta para a imagem atual
    }

    carrosselContainer.style.transition = 'transform 0.5s ease-in-out'; // Restaura a transição
}

// Função para iniciar o carrossel automático
function iniciarCarrosselAutomatico() {
    intervalo = setInterval(() => {
        moverCarrossel(1); // Move para a próxima imagem
    }, 3000); // Intervalo de 3 segundos
}

// Pausa o carrossel automático ao passar o mouse
function pausarCarrossel() {
    clearInterval(intervalo);
}

// Retoma o carrossel automático ao remover o mouse
function retomarCarrossel() {
    iniciarCarrosselAutomatico();
}

// Adiciona eventos de mouse e toque
carrosselContainer.addEventListener('mousedown', iniciarArrasto);
carrosselContainer.addEventListener('mousemove', arrastar);
carrosselContainer.addEventListener('mouseup', finalizarArrasto);
carrosselContainer.addEventListener('mouseleave', finalizarArrasto);

carrosselContainer.addEventListener('touchstart', iniciarArrasto);
carrosselContainer.addEventListener('touchmove', arrastar);
carrosselContainer.addEventListener('touchend', finalizarArrasto);

// Inicia o carrossel automático
iniciarCarrosselAutomatico();

// Pausa e retoma o carrossel ao interagir
carrosselContainer.addEventListener('mouseenter', pausarCarrossel);
carrosselContainer.addEventListener('mouseleave', retomarCarrossel);

// Cria partículas (estrelas) para o fundo da galáxia
function criarGalaxia() {
    const galaxia = document.querySelector('.galaxia');

    for (let i = 0; i < 200; i++) {
        const estrela = document.createElement('div');
        estrela.className = 'estrela';
        estrela.style.top = `${Math.random() * 100}vh`;
        estrela.style.left = `${Math.random() * 100}vw`;
        estrela.style.animationDuration = `${Math.random() * 5 + 2}s`; // Velocidade aleatória
        galaxia.appendChild(estrela);
    }
}

// Estilos dinâmicos para as estrelas
const style = document.createElement('style');
style.innerHTML = `
    .estrela {
        position: absolute;
        width: 2px;
        height: 2px;
        background: white;
        border-radius: 50%;
        box-shadow: 0 0 5px rgba(255, 255, 255, 0.8);
        animation: estrelas 5s infinite linear;
    }

    @keyframes estrelas {
        0% {
            transform: translateY(0) translateX(0);
        }
        100% {
            transform: translateY(-100vh) translateX(-100vw);
        }
    }
`;
document.head.appendChild(style);

// Inicia a criação da galáxia
window.onload = criarGalaxia;