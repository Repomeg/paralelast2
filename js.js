let pokelista = document.getElementById("ListaPoke")
const botones=document.getElementById("botones");
const botonlista=document.getElementById("botonlista");

function imprimirarray(arreglo){
 for(let ai of arreglo){
  pokelista.innerHTML+=`
               <p> ${ai.type.name}</p> 
               `
 }
}


function LlamadaApi(url) {
  pokelista.innerHTML="";
    fetch(url)
    .then(res=>res.json())
    .then(res=> {
      for(let i of res.results){
        fetch(i.url)
          .then(x=>x.json())
          .then(x=>{
            let tipo="";
            x.types.forEach(element => {
              tipo+=`${element.type.name}<br>`;
            });
            let formas="";
            x.forms.forEach(element =>{
              formas+=`${element.name}<br>`;
            });
            let habilidades="";
            x.abilities.forEach(element =>{
              habilidades+=`${element.ability.name} <br>`;
            });
            pokelista.innerHTML+= `<div class="card">
            <img src="${x.sprites.front_default}">
            <p>ID ${x.id}</p>
            <p>Nombre ${x.name}</p>
            <p>Altura ${x.height/10} m</p>
            <p>Peso ${x.weight/10} Kg</p>
            <p>Tipo: ${tipo} </p>        
            <p>Formas: ${formas}</p>  
            <p>Habilidades: ${habilidades}</p>  
            <p>Ubicacion: </p>
            </div>`
          
          });
      };
        // Mostramos Los botones a los enlaces de siguiente o anterior de la paginacion de los pokemones 
        //Boton hacia atrás
        botones.innerHTML = (res.previous) ? `<button onclick="LlamadaApi('${res.previous}')">Atrás</button>` : "";
        //Botón hacia adelante
        botones.innerHTML += (res.next) ? `<button onclick="LlamadaApi('${res.next}')">Siguiente</button>` : "";
  });
}


LlamadaApi("https://pokeapi.co/api/v2/pokemon?offset=0&limit=10");

function buscar(){
  BusquedaPoke.innerHTML="";
  botonlista.innerHTML="";
 var idpoke= document.getElementById("pokeid").value;
 fetch(`https://pokeapi.co/api/v2/pokemon/${idpoke}/`)
 .then(res=>res.json())
 .then(res=> {
  let tipo="";
  res.types.forEach(element => {
    tipo+=`${element.type.name}<br>`;
  });
  let formas="";
  res.forms.forEach(element =>{
    formas+=`${element.name}<br>`;
  });
  let habilidades="";
  res.abilities.forEach(element =>{
    habilidades+=`${element.ability.name} <br>`;
  });


  BusquedaPoke.innerHTML+= `<div class="card">
  <img src="${res.sprites.front_default}">
  <p>ID ${res.id}</p>
  <p>Nombre ${res.name}</p>
  <p>Altura ${res.height/10} m</p>
  <p>Peso ${res.weight/10} Kg</p>
  <p>Tipo: ${tipo} </p>        
  <p>Formas: ${formas}</p>  
  <p>Habilidades: ${habilidades}</p>  
  <p>Ubicacion: </p>
  </div>`

   botonlista.innerHTML+=`<a href="index.html">
   <input type="submit" value="Inicio"/>
 </a>`
 })
}