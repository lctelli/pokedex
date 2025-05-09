let todosOsPokemons = []; // Armazena os dados para filtro posterior

async function carregarPokemons() {
  try {
    const resposta = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1302&offset=0');
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
    link.textContent = `#${id} - ${pokemon.name}`;
    link.classList.add("nav-link");

    link.addEventListener("click", async (event) => {
      event.preventDefault();
      await exibirDetalhesDoPokemon(pokemon.url);
      link.classList.add("checked");
    });

    nav.appendChild(link);
  });
}

carregarPokemons();

  
  
  function tipoComEmoji(tipo) {
    if (tipo === "normal") return "normal 🔘";
    else if (tipo === "fire") return "fire 🔥";
    else if (tipo === "water") return "water 💧";
    else if (tipo === "electric") return "electric ⚡";
    else if (tipo === "grass") return "grass 🌿";
    else if (tipo === "ice") return "ice ❄️";
    else if (tipo === "fighting") return "fighting 🥊";
    else if (tipo === "poison") return "poison ☠️";
    else if (tipo === "ground") return "ground 🌍";
    else if (tipo === "flying") return "flying 🕊️";
    else if (tipo === "psychic") return "psychic 🌀";
    else if (tipo === "bug") return "bug 🐛";
    else if (tipo === "rock") return "rock 🗻";
    else if (tipo === "ghost") return "ghost 👻";
    else if (tipo === "dragon") return "dragon 🐉";
    else if (tipo === "dark") return "dark 🌑";
    else if (tipo === "steel") return "steel ⚙️";
    else if (tipo === "fairy") return "fairy ✨";
    else return tipo;
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
          <h2 class="name">Name: ${pokemon.name}</h2>
          <h3 class="number">Nº ${pokemon.id}</h3>
          <h4 class="type">Type: ${pokemon.types.map(item => tipoComEmoji(item.type.name)).join(', ')}</h4>
          <h4 class="weight">Weight: ${pokemon.weight / 10}kg</h3>
          <h4 class="height">Height: ${pokemon.height / 10}m</h4>
          <h4 class="skill">Skills: ${pokemon.moves.map(item => item.move.name).slice(0, 5).join(', ')}</h4>        
        </div>
      </div>
        
      `;
  
      document.getElementById("exibirPokemon").innerHTML = html;
    } catch (erro) {
      console.error("Erro ao exibir detalhes do Pokémon:", erro);
    }
  }
  
  // Aqui ficam as funções de filtro (depois do carregamento)
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
  