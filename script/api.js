let todosOsPokemons = []; // Armazena os dados para filtro posterior

// Função para deixar a primeira letra maiúscula
function capitalizarPrimeiraLetra(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

async function carregarPokemons() {
  try {
    const resposta = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1025&offset=0');
    const dados = await resposta.json();
    todosOsPokemons = dados.results;

    renderizarPokemons(todosOsPokemons);

    // Adiciona o listener de busca
    const inputBusca = document.querySelector("#buscaPokemon");
    inputBusca.addEventListener("input", () => {
      const termo = inputBusca.value.toLowerCase();
      const filtrados = todosOsPokemons.filter(pokemon => {
        const urlSplit = pokemon.url.split("/").filter(Boolean);
        const id = urlSplit[urlSplit.length - 1];
        return (
          pokemon.name.toLowerCase().includes(termo) ||
          id.includes(termo)
        );
      });
      renderizarPokemons(filtrados);
    });

  } catch (erro) {
    console.error("Erro ao carregar Pokémon:", erro);
  }
}

function renderizarPokemons(lista) {
  const nav = document.querySelector("#pokemonNav");
  nav.innerHTML = ""; // Limpa a lista atual

  lista.forEach((pokemon) => {
    const urlSplit = pokemon.url.split("/").filter(Boolean);
    const id = urlSplit[urlSplit.length - 1];

    const link = document.createElement("a");
    link.href = "#";
    link.textContent = `#${id} - ${capitalizarPrimeiraLetra(pokemon.name)}`;
    link.classList.add("nav-link");

    link.addEventListener("click", async (event) => {
      event.preventDefault();
      await exibirDetalhesDoPokemon(pokemon.url);
      link.classList.add("checked");
    });

    nav.appendChild(link);
  });
}

async function exibirDetalhesDoPokemon(url) {
  try {
    const resposta = await fetch(url);
    const pokemon = await resposta.json();

    const html = `
    <div class="container-fluid text-center">
      <div class="pokemon-picture">
        <img src="${pokemon.sprites.front_default}" alt="Sprite of ${pokemon.name}" class="bigImage img-fluid">
      </div>
      <div class="pokemon-info">
        <h2 class="name">Name: ${capitalizarPrimeiraLetra(pokemon.name)}</h2>
        <h4 class="number">Nº ${pokemon.id}</h4>
        <h5 class="type">Type: ${pokemon.types.map(item => tipoComEmoji(item.type.name)).join(', ')}</h5>
        <h5 class="weight">Weight: ${pokemon.weight / 10}kg</h5>
        <h5 class="height">Height: ${pokemon.height / 10}m</h5>
        <h5 class="skill">Skills: ${pokemon.moves
          .map(item => capitalizarPrimeiraLetra(item.move.name))
          .slice(0, 8)
          .join(', ')}</h5>        
      </div>
    </div>
    `;

    document.getElementById("exibirPokemon").innerHTML = html;
  } catch (erro) {
    console.error("Erro ao exibir detalhes do Pokémon:", erro);
  }
}

function tipoComEmoji(tipo) {
  if (tipo === "normal") return "Normal 🔘";
  else if (tipo === "fire") return "Fire 🔥";
  else if (tipo === "water") return "Water 💧";
  else if (tipo === "electric") return "Electric ⚡";
  else if (tipo === "grass") return "Grass 🌿";
  else if (tipo === "ice") return "Ice ❄️";
  else if (tipo === "fighting") return "Fighting 🥊";
  else if (tipo === "poison") return "Poison ☠️";
  else if (tipo === "ground") return "Ground 🌍";
  else if (tipo === "flying") return "Flying 🕊️";
  else if (tipo === "psychic") return "Psychic 🌀";
  else if (tipo === "bug") return "Bug 🐛";
  else if (tipo === "rock") return "Rock 🗻";
  else if (tipo === "ghost") return "Ghost 👻";
  else if (tipo === "dragon") return "Dragon 🐉";
  else if (tipo === "dark") return "Dark 🌑";
  else if (tipo === "steel") return "Steel ⚙️";
  else if (tipo === "fairy") return "Fairy ✨";
  else return tipo;
}

function filtrarTabela() {
  const termo = document.getElementById("buscaPokemon").value.trim().toLowerCase();
  const linhas = document.querySelectorAll("#pokemonNav");

  if (termo === "") {
    linhas.forEach((linha) => linha.style.display = "");
    return;
  }

  linhas.forEach((linha) => {
    const id = pokemon.id.textContent.toLowerCase();
    const nome = pokemon.name.textContent.toLowerCase();

    if (id.includes(termo) || nome.includes(termo)) {
      linha.style.display = "";
    } else {
      linha.style.display = "none";
    }
  });
}

function resetarFiltro() {
  document.getElementById("buscaPokemon").value = "";
  filtrarTabela();
}

// Escuta digitação no campo de busca
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("buscaPokemon").addEventListener("input", filtrarTabela);
  carregarPokemons(); // Carrega os dados ao iniciar
});
