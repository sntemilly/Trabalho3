const pontos = [
  {
    nome: "Bloco A",
    localizacao: "Biblioteca",
    capacidade: 12,
    atual: 3,
    coberto: true,
    iluminado: false
  },
  {
    nome: "Bloco B",
    localizacao: "Restaurante",  
    capacidade: 8,
    atual: 7,
    coberto: false,
    iluminado: true
  }
];


// Função que retorna o status visual
function getStatus(ponto) {
  const ratio = ponto.atual / ponto.capacidade;
  if (ratio === 1) return { text: "Lotado", className: "lotado" };
  if (ratio >= 0.75) return { text: "Quase cheio", className: "quase" };
  return { text: "Disponível", className: "disponivel" };
}

// Renderiza os pontos na tela
function renderPontos() {
  const container = document.getElementById("pontos-container");
  container.innerHTML = ""; 

  pontos.forEach((ponto, idx) => {
    const status = getStatus(ponto);

    const card = document.createElement("div");
    card.className = "ponto";

    card.innerHTML = `
      <div class="ponto-header">
        <div class="ponto-nome">${ponto.nome}</div>
        <div class="status ${status.className}">${status.text}</div>
      </div>
      <div class="ponto-info">
        Local: ${ponto.localizacao} <br>
        Capacidade: ${ponto.capacidade} <br>
        Bicicletas estacionadas: ${ponto.atual}
      </div>

      <div class="ponto-detalhes">
        <p><strong>Coberto:</strong> ${ponto.coberto ? "Sim" : "Não"}</p>
        <p><strong>Iluminação:</strong> ${ponto.iluminado ? "Sim" : "Não"}</p>
      </div>

      <div class="ponto-actions">
        <button class="btn-add" ${ponto.atual >= ponto.capacidade ? "disabled" : ""}>Adicionar</button>
        <button class="btn-remove" ${ponto.atual <= 0 ? "disabled" : ""}>Remover</button>
      </div>
    `;

    // Toggle detalhes ao clicar no card (excluindo botões)
    card.addEventListener("click", e => {
      if (
        e.target.tagName !== "BUTTON" &&
        !e.target.classList.contains("btn-add") &&
        !e.target.classList.contains("btn-remove")
      ) {
        const detalhes = card.querySelector(".ponto-detalhes");
        detalhes.style.display = detalhes.style.display === "block" ? "none" : "block";
      }
    });

    // Adicionar bike
    card.querySelector(".btn-add").addEventListener("click", e => {
      e.stopPropagation();
      if (ponto.atual < ponto.capacidade) {
        ponto.atual++;
        renderPontos();
      }
    });

    // Remover bike
    card.querySelector(".btn-remove").addEventListener("click", e => {
      e.stopPropagation();
      if (ponto.atual > 0) {
        ponto.atual--;
        renderPontos();
      }
    });

    container.appendChild(card);
  });
}

renderPontos();


const modal = document.getElementById("modal");
const modalInfo = document.getElementById("modal-info");
const closeModal = document.getElementById("close-modal");

closeModal.onclick = () => {
  modal.style.display = "none";
};
window.onclick = (event) => {
  if (event.target === modal) {
    modal.style.display = "none";
  }
};
