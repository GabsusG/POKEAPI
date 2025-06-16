const listaPokemon = document.getElementById("listaPokemon");  // corregí variable a minúscula 'l'
const botones = document.querySelectorAll(".btn");
const Api = "https://pokeapi.co/api/v2/pokemon/";

for (let i = 0; i <= 150; i++) {
  fetch(Api + i)
    .then((response) => response.json())
    .then((data) => verpokemones(data));
}

function verpokemones(data) {
  let tipos = data.types
    .map((type) => `<p class="${type.type.name} tipo">${type.type.name}</p>`)
    .join("");

  const div = document.createElement("div");
  div.classList.add("CardPokemon");
  div.id = `poke-${data.id}`;
  div.innerHTML = `
    <div class="id">
      <p>${data.id}</p>
    </div>
    <div class="imagenP">
      <img src="${data.sprites.other["official-artwork"].front_default}" alt="${data.name}">
    </div>
    <div class="informacion">
      <h2>${data.name}</h2>
      <div class="elemento">${tipos}</div>
      <div class="estadisticas">
        <p>P: ${data.weight}</p>
        <p>H: ${data.height}</p>
      </div>
    </div>
  `;

  listaPokemon.append(div);

  div.addEventListener("click", () => {
    document.startViewTransition(() => {
      mostrarDetallePokemon(data);
    });
  });
}

botones.forEach((boton) =>
  boton.addEventListener("click", (event) => {
    const botonId = event.currentTarget.id;

    listaPokemon.innerHTML = "";

    for (let i = 1; i <= 151; i++) {
      fetch(Api + i)
        .then((response) => response.json())
        .then((data) => {
          if (botonId === "ver-todos") {
            verpokemones(data);
          } else {
            const tipos = data.types.map((type) => type.type.name);
            if (tipos.includes(botonId)) {
              verpokemones(data);
            }
          }
        });
    }
  })
);

const detallePokemon = document.getElementById("detallePokemon");

function mostrarDetallePokemon(pokemon) {
  detallePokemon.innerHTML = `
    <div class="detalle-pokemon">
      <div class="cerrar">✕</div>
      <div class="imagen-detalle">
        <img src="${pokemon.sprites.other['official-artwork'].front_default}" alt="${pokemon.name}">
      </div>
      <div class="info-detalle">
        <h2>${pokemon.name.toUpperCase()}</h2>
        <div class="contenedor-columnas">
          <div class="columna-izquierda">
            <p><strong>ID:</strong> ${pokemon.id}</p>
            <p><strong>Altura:</strong> ${pokemon.height}</p>
            <p><strong>Peso:</strong> ${pokemon.weight}</p>
            <p><strong>Tipo:</strong> ${pokemon.types.map(t => t.type.name).join(', ')}</p>
            <p><strong>Habilidad principal:</strong> ${pokemon.abilities[0].ability.name}</p>
            <p><strong>Experiencia base:</strong> ${pokemon.base_experience}</p>
          </div>
          <div class="columna-derecha">
            <p><strong>Orden:</strong> ${pokemon.order}</p>
            <p><strong>HP:</strong> ${pokemon.stats[0].base_stat}</p>
            <p><strong>Ataque:</strong> ${pokemon.stats[1].base_stat}</p>
            <p><strong>Defensa:</strong> ${pokemon.stats[2].base_stat}</p>
            <p><strong>Movimientos:</strong> ${pokemon.moves.slice(0, 3).map(m => m.move.name).join(', ')}</p>
          </div>
        </div>
      </div>
    </div>
  `;

  detallePokemon.classList.add('active');

  document.querySelector(".cerrar").addEventListener("click", () => {
    detallePokemon.classList.remove('active');
    detallePokemon.innerHTML = '';
  });
}





