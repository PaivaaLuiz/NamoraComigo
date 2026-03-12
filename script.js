const noBtn = document.getElementById('noBtn');
const yesBtn = document.getElementById('yesBtn');

function foge(event) {
    if (event) {
        event.preventDefault();
        event.stopPropagation();
    }

    const larguraTela = window.innerWidth;
    const alturaTela = window.innerHeight;

    // Pegamos a posição e tamanho real do botão SIM
    const rectSIM = yesBtn.getBoundingClientRect();

    let newX, newY;
    let colide = true;

    // Tenta sortear uma posição até que ela esteja fora da área do SIM
    while (colide) {
        // Sorteia posição (mantendo 20px de margem das bordas da tela)
        newX = Math.random() * (larguraTela - noBtn.offsetWidth - 40) + 20;
        newY = Math.random() * (alturaTela - noBtn.offsetHeight - 40) + 20;

        // Criamos uma "zona de exclusão" de 50px ao redor do SIM
        const zonaExclusao = {
            top: rectSIM.top - 50,
            bottom: rectSIM.bottom + 50,
            left: rectSIM.left - 50,
            right: rectSIM.right + 50
        };

        // Verifica se o novo ponto do botão NÃO entra na zona do SIM
        const bateuNoSim = (
            newX + noBtn.offsetWidth > zonaExclusao.left &&
            newX < zonaExclusao.right &&
            newY + noBtn.offsetHeight > zonaExclusao.top &&
            newY < zonaExclusao.bottom
        );

        if (!bateuNoSim) {
            colide = false;
        }
    }

    // Aplica a posição
    noBtn.style.position = "fixed";
    noBtn.style.left = `${newX}px`;
    noBtn.style.top = `${newY}px`;
    noBtn.style.zIndex = "9999";
}

// Eventos de fuga
noBtn.addEventListener('touchstart', foge, {passive: false});
noBtn.addEventListener('pointerdown', foge);
noBtn.addEventListener('click', (e) => {
    e.preventDefault();
    foge(e);
});

// Clique no SIM
yesBtn.addEventListener('click', () => {
    window.location.href = "yes.html";
});