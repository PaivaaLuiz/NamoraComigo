const noBtn = document.getElementById('noBtn');
const yesBtn = document.getElementById('yesBtn');

// Função para mover o botão NÃO
function foge(event) {
    // Para o evento imediatamente para não clicar em nada atrás
    if (event) {
        event.preventDefault();
        event.stopPropagation();
    }

    const larguraTela = window.innerWidth;
    const alturaTela = window.innerHeight;

    // Margem de segurança para o botão não sumir nas bordas
    const maxX = larguraTela - noBtn.offsetWidth;
    const maxY = alturaTela - noBtn.offsetHeight;

    const newX = Math.random() * maxX;
    const newY = Math.random() * maxY;

    noBtn.style.position = "fixed";
    noBtn.style.left = `${newX}px`;
    noBtn.style.top = `${newY}px`;
    noBtn.style.zIndex = "1000";
}

// Evento de toque inicial (o mais rápido no mobile)
noBtn.addEventListener('touchstart', foge, {passive: false});

// Evento de clique (caso o touchstart falhe)
noBtn.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    foge(e);
});

// Botão SIM com "Trava de Segurança"
yesBtn.addEventListener('click', (e) => {
    // Verifica se o botão NÃO está muito perto do SIM no momento do clique
    const rectSIM = yesBtn.getBoundingClientRect();
    const rectNAO = noBtn.getBoundingClientRect();

    // Se houver sobreposição visual no momento do clique, ignoramos o clique no SIM
    const sobreposicao = !(rectNAO.right < rectSIM.left || 
                           rectNAO.left > rectSIM.right || 
                           rectNAO.bottom < rectSIM.top || 
                           rectNAO.top > rectSIM.bottom);

    if (sobreposicao) {
        e.preventDefault();
        foge(); // Move o botão NÃO de novo por segurança
    } else {
        window.location.href = "yes.html";
    }
});