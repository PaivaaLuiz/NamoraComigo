const noBtn = document.getElementById('noBtn');
const yesBtn = document.getElementById('yesBtn');

function foge(event) {
    if (event) {
        event.preventDefault();
        event.stopPropagation();
    }

    const larguraTela = window.innerWidth;
    const alturaTela = window.innerHeight;

    // Margens de segurança para o botão não sumir nas bordas (80px)
    const maxX = larguraTela - noBtn.offsetWidth - 20;
    const maxY = alturaTela - noBtn.offsetHeight - 20;

    // Pega a posição exata do botão SIM para evitar
    const rectSIM = yesBtn.getBoundingClientRect();

    let newX, newY;
    let tentativa = 0;
    let posicaoValida = false;

    // Tenta encontrar uma posição que não sobreponha o SIM (máximo 50 tentativas)
    while (!posicaoValida && tentativa < 50) {
        newX = Math.random() * maxX;
        newY = Math.random() * maxY;

        // Define a área ocupada pelo botão NÃO nessa nova posição hipotética
        const rectNaoFuturo = {
            left: newX,
            top: newY,
            right: newX + noBtn.offsetWidth,
            bottom: newY + noBtn.offsetHeight
        };

        // Verifica se essa área encosta no botão SIM (com uma margem extra de 20px)
        const colidiu = !(rectNaoFuturo.right < rectSIM.left - 20 || 
                          rectNaoFuturo.left > rectSIM.right + 20 || 
                          rectNaoFuturo.bottom < rectSIM.top - 20 || 
                          rectNaoFuturo.top > rectSIM.bottom + 20);

        if (!colidiu) {
            posicaoValida = true;
        }
        tentativa++;
    }

    noBtn.style.position = "fixed";
    noBtn.style.left = `${newX}px`;
    noBtn.style.top = `${newY}px`;
    noBtn.style.zIndex = "1000";
}

// Eventos para Mobile e PC
noBtn.addEventListener('touchstart', foge, {passive: false});
noBtn.addEventListener('pointerdown', foge);
noBtn.addEventListener('click', (e) => {
    e.preventDefault();
    foge(e);
});

// Botão SIM livre de interferência
yesBtn.addEventListener('click', () => {
    window.location.href = "yes.html";
});