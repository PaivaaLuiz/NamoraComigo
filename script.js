const noBtn = document.getElementById('noBtn');
const yesBtn = document.getElementById('yesBtn');

/**
 * Função principal para mover o botão.
 * Usamos coordenadas baseadas na janela (viewport) para o mobile.
 */
function foge(event) {
    // Impede qualquer comportamento padrão e propagação do toque
    if (event) {
        event.preventDefault();
        event.stopPropagation();
    }

    // Pega o tamanho da tela do celular
    const larguraTela = window.innerWidth;
    const alturaTela = window.innerHeight;

    // Calcula limites para o botão não sair da borda (margem de segurança)
    const maxX = larguraTela - noBtn.offsetWidth;
    const maxY = alturaTela - noBtn.offsetHeight;

    // Gera novas coordenadas aleatórias
    let newX = Math.floor(Math.random() * maxX);
    let newY = Math.floor(Math.random() * maxY);

    // Garante que o botão use posicionamento fixo para ignorar o resto do site
    noBtn.style.position = "fixed";
    noBtn.style.left = `${newX}px`;
    noBtn.style.top = `${newY}px`;
    noBtn.style.zIndex = "1000"; // Sempre por cima de tudo
}

// 'pointerdown' funciona tanto para o clique do mouse quanto para o toque do dedo
// Ele dispara no milissegundo em que o dedo encosta na tela
noBtn.addEventListener('pointerdown', foge);

// Prevenção extra para o evento de clique padrão
noBtn.addEventListener('click', (e) => {
    e.preventDefault();
    foge(e);
});

// Botão SIM redireciona para a página de sucesso
yesBtn.addEventListener('click', () => {
    window.location.href = "yes.html";
});