const capacidade = {
  A: 12,
  B: 8
};

let estacionadas = {
  A: 6,
  B: 3
};

function atualizar(bloco) {
  document.getElementById(`count${bloco}`).innerText = estacionadas[bloco];
  
  const status = document.getElementById(`status${bloco}`);
  
  if (estacionadas[bloco] < capacidade[bloco]) {
    status.innerText = "Disponível";
    status.className = "status disponivel";
  } else {
    status.innerText = "Lotado";
    status.className = "status lotado";
  }
}

function adicionar(bloco) {
  if (estacionadas[bloco] < capacidade[bloco]) {
    estacionadas[bloco]++;
    atualizar(bloco);
  } else {
    alert("Capacidade máxima atingida!");
  }
}

function remover(bloco) {
  if (estacionadas[bloco] > 0) {
    estacionadas[bloco]--;
    atualizar(bloco);
  } else {
    alert("Não há bicicletas para remover.");
  }
}

atualizar("A");
atualizar("B");
