document.addEventListener('DOMContentLoaded', () => {
    const noBtn = document.getElementById('noBtn');

    noBtn.addEventListener('mouseover', () => {
        // Obter as dimensões do container para limitar o movimento
        const container = noBtn.parentElement;
        const containerRect = container.getBoundingClientRect();
        const btnRect = noBtn.getBoundingClientRect();

        let newX, newY;

        // Tentar encontrar uma posição que não saia do container
        // E que não sobreponha muito o botão SIM
        const maxAttempts = 50;
        let attempts = 0;

        do {
            newX = Math.random() * (containerRect.width - btnRect.width);
            newY = Math.random() * (containerRect.height - btnRect.height);

            // Verificar se a nova posição está muito próxima do botão SIM
            const yesBtn = document.getElementById('yesBtn');
            const yesRect = yesBtn.getBoundingClientRect();

            const isOverlappingYes = (newX < (yesRect.right - containerRect.left) &&
                                      (newX + btnRect.width) > (yesRect.left - containerRect.left) &&
                                      newY < (yesRect.bottom - containerRect.top) &&
                                      (newY + btnRect.height) > (yesRect.top - containerRect.top));

            attempts++;
            if (!isOverlappingYes) break;

        } while (attempts < maxAttempts);

        noBtn.style.position = 'absolute'; // Assegura que está em posicionamento absoluto
        noBtn.style.left = `${newX}px`;
        noBtn.style.top = `${newY}px`;
    });
});