const noBtn = document.getElementById('noBtn');
const yesBtn = document.getElementById('yesBtn');

function foge(event) {
    if (event) {
        event.preventDefault();
        event.stopPropagation();
    }

    const larguraTela = window.innerWidth;
    const alturaTela = window.innerHeight;

    // Posição do botão SIM para evitar
    const rectSim = yesBtn.getBoundingClientRect();

    let newX, newY;
    let colidindo = true;

    // Sorteia até achar um lugar longe do botão SIM
    while (colidindo) {
        newX = Math.random() * (larguraTela - noBtn.offsetWidth - 40) + 20;
        newY = Math.random() * (alturaTela - noBtn.offsetHeight - 40) + 20;

        // Se a nova posição estiver fora da área do SIM, aceitamos
        const margem = 60; // Distância mínima entre os botões
        const foraX = (newX + noBtn.offsetWidth < rectSim.left - margem) || (newX > rectSim.right + margem);
        const foraY = (newY + noBtn.offsetHeight < rectSim.top - margem) || (newY > rectSim.bottom + margem);

        if (foraX || foraY) {
            colidindo = false;
        }
    }

    noBtn.style.position = "fixed";
    noBtn.style.left = `${newX}px`;
    noBtn.style.top = `${newY}px`;
    noBtn.style.zIndex = "1000";
}

// Eventos para Mobile
noBtn.addEventListener('touchstart', foge, {passive: false});
// Eventos para PC
noBtn.addEventListener('mouseover', foge);

yesBtn.addEventListener('click', () => {
    window.location.href = "yes.html";
});