const botones=document.getElementById("botones");
let lista = document.getElementById("ListaPoke")


function ListadoPoke(url) {
  
    fetch(url)
    .then(res=>res.json())
    .then(res=> {
      for(let i of res.results){
        lista.innerHTML="";
        fetch(i.url)
          .then(x=>x.json())
          .then(x=>{
            let tipo="";
            x.types.forEach(element => {
              tipo+=`${element.type.name} `;
            });
            let formas="";
            x.forms.forEach(element =>{
              formas+=`${element.name} `;
            });
            let habilidades="";
            x.abilities.forEach(element =>{
              habilidades+=`${element.ability.name} `;
            });
            lista.innerHTML+= `<div class="card">
            <p>ID: ${x.id}</p>
            <p>Nombre: ${x.name}</p>
            <img style="width:100px" src="${x.sprites.front_default}">
            <p>Altura: ${x.height/10} (m)</p>
            <p>Peso: ${x.weight/10} (Kg)</p>
            <p>Tipo: ${tipo} </p>        
            <p>Formas: ${formas}</p>  
            <p>Habilidades: ${habilidades}</p>  
            </div>`
          
          });
      };
        // Mostramos Los botones a los enlaces de siguiente o anterior de la paginacion de los pokemones 
        //Boton hacia atrás
        botones.innerHTML = (res.previous) ? `<button onclick="ListadoPoke('${res.previous}')">Atrás</button>` : "";
        //Botón hacia adelante
        botones.innerHTML += (res.next) ? `<button onclick="ListadoPoke('${res.next}')">Siguiente</button>` : "";
        
        
  });
}


ListadoPoke("https://pokeapi.co/api/v2/pokemon?offset=0&limit=10");

function BuscarPoke(){
  Busqueda.innerHTML="";
 var idpoke= document.getElementById("pokeid").value;
 fetch(`https://pokeapi.co/api/v2/pokemon/${idpoke}/`)
 .then(res=>res.json())
 .then(res=> {
  let tipo="";
  res.types.forEach(element => {
    tipo+=`${element.type.name} `;
  });
  let formas="";
  res.forms.forEach(element =>{
    formas+=`${element.name} `;
  });
  let habilidades="";
  res.abilities.forEach(element =>{
    habilidades+=`${element.ability.name} `;
  });


  Busqueda.innerHTML+= `<div class="card ">
  <p>ID:  ${res.id}</p>
  <p>Nombre:  ${res.name}</p>
  <img style="width:100px"  src="${res.sprites.front_default}">
  <p>Altura:  ${res.height/10} (m)</p>
  <p>Peso:  ${res.weight/10} (Kg)</p>
  <p>Tipo: ${tipo} </p>        
  <p>Formas: ${formas}</p>  
  <p>Habilidades: ${habilidades}</p>  
  </div>`
 })
}

function imprimirarray(arreglo){
  for(let ai of arreglo){
   lista.innerHTML+=`
                <p> ${ai.type.name}</p> 
                `
  }
 }