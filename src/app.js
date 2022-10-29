const botones=document.getElementById("botones"); // Capturamos el div de los botones
let lista = document.getElementById("ListaPoke") // Capturamos el div de la busqueda

// Función que despliega el listado de pokemones
function ListadoPoke(url) {
  // Fech para traer la lista de pokemones
  fetch(url).then(res => 
  res.json()).then(res => {
    for(let i of res.results){
      lista.innerHTML="";
      // Fetch para traer los datos de cada pokemon
      fetch(i.url).then(x =>
        x.json()).then(x => {
          let tipo="";
          x.types.forEach(element => {   // Recorre el arreglo almacenando los tipos
            tipo+=`${element.type.name} `;
          });
          let formas="";
          x.forms.forEach(element =>{   // Recorre el arreglo almacenando las elementos
            formas+=`${element.name} `;
            if(formas.trim() == x.name.trim()) { // Verifica que tenga formas
              formas = "Ninguna";
            }
          });
          let habilidades="";
          x.abilities.forEach(element =>{  // Recorre el arreglo almacenando las habilidades
            habilidades+=`${element.ability.name} `;
          });
          // Imprimimos los datos en el html
          lista.innerHTML+= `<div class="card text-center">
          <p>ID: ${x.id}</p>
          <h2> ${x.name}</h2>
          <img style="width:20% position:center" src="${x.sprites.front_default}">
          <p>Altura: ${x.height/10} (m)</p>
          <p>Peso: ${x.weight/10} (Kg)</p>
          <p>Tipo: ${tipo} </p>        
          <p>Formas: ${formas}</p>  
          <p>Habilidades: ${habilidades}</p>  
          </div>`
        
        });
    };
      // Botones para navegar entre las paginas
      botones.innerHTML = (res.previous) ? `<button onclick="ListadoPoke('${res.previous}')">Atrás</button>` : "";
      botones.innerHTML += (res.next) ? `<button onclick="ListadoPoke('${res.next}')">Siguiente</button>` : "";
  });
}

// Link de la API
ListadoPoke("https://pokeapi.co/api/v2/pokemon?offset=0&limit=10");

// Función para buscar un pokemon
function BuscarPoke(){
  Busqueda.innerHTML="";
 var idpoke= document.getElementById("pokeid").value; // Capturamos el valor del input
 fetch(`https://pokeapi.co/api/v2/pokemon/${idpoke}/`)  // Hacemos el fetch con el valor del input
 .then(res=>res.json())  // Convertimos la respuesta a json
 .then(res=> {
  let tipo="";
  res.types.forEach(element => { // Recorremos el arreglo de tipos
    tipo+=`${element.type.name} `; // Almacenamos los tipos en una variable
  });
  let formas="";
  res.forms.forEach(element =>{ // Recorremos el arreglo de formas
    formas+=`${element.name} `;
    if(formas.trim() == res.name.trim()) {  // Verificamos que tenga formas
      formas = "Ninguna";
    }
  });
  let habilidades="";
  res.abilities.forEach(element =>{
    habilidades+=`${element.ability.name} `; // Recorremos el arreglo de habilidades
  });


  // Imprimimos los datos en el html
  Busqueda.innerHTML+= `<div class="card ">
  <p>ID:  ${res.id}</p>
  <p>Nombre:  ${res.name}</p>
  <img class="rounded mx-auto d-block" style="width:300px" src="${res.sprites.front_default}">
  <p>Altura:  ${res.height/10} (m)</p>
  <p>Peso:  ${res.weight/10} (Kg)</p>
  <p>Tipo: ${tipo} </p>        
  <p>Formas: ${formas}</p>  
  <p>Habilidades: ${habilidades}</p>  
  </div>`
 })
}