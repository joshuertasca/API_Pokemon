var poder_minimo = 0;
var pokemones_listados = 0;
var pokemonessimilares=[]
console.log(pokemonessimilares)
function consumir(endpoint,poderMinimo) {
    api_url = `https://pokeapi.co/api/v2/pokemon/${endpoint}`;
    let consumo_api = fetch(api_url);
    consumo_api.then(respuesta_api => respuesta_api.json())
        .then(data_api => {
            data_api.results.forEach((personaje, x) => {
                let consumo_api2 = fetch(personaje.url);
                consumo_api2.then(respuesta_api2 => respuesta_api2.json())
                    .then(data_api2 => {
                        
                        if(data_api2.stats[0].base_stat > poderMinimo){
                            pokemones_listados++
                            document.querySelector("#vista").innerHTML += `
                                <div class="col">
                                    <div class="card border border-5 border-dark bg-rojo ">
                                    <img src="${data_api2.sprites.other.home.front_default}" class=" card-img-top" alt="...">
                                        <div class="card-body">
                                            <h5 class="card-title">${data_api2.name}</h5>
                                        </div>
                                        <ul class="list-group" id = "informacion_personaje">
                                            <li id = "tipo${x}" class="list-group-item">Tipo de pokemon: </li>
                                            <li id = "peso${x}" class="list-group-item">peso : ${data_api2.weight} Kilos</li>
                                            <li id = "poder${x}" class="list-group-item">Poder Base:  ${data_api2.stats[0].base_stat} %<br>
                                            <progress class=" w-75 " id="file" max="233" value="${data_api2.stats[0].base_stat}"> ${data_api2.stats[0].base_stat} </progress>       
                                            </li>
                                        </ul>
                                    </div>
                                </div>`
                            data_api2.types.forEach(element => {
                                document.querySelector("#tipo" + x).innerHTML += "<br> •" + element.type.name
                            });
                        }
                    })
            });
        })
}

var existe = false
consumir(`?offset=0&limit=20`,poder_minimo);

var limit = 20
document.querySelector("#numerolistar").addEventListener("blur", () => {
     if(document.querySelector("#numerolistar").value <= 1000) {
         document.querySelector("#vista").innerHTML = ``
         numeromostrar=document.querySelector("#numerolistar").value
         consumir(`?offset=${offset}&limit=${numeromostrar}`,poder_minimo)
         limit =document.querySelector("#numerolistar").value
     } 
});

function buscador(endpoint_buscar) {

    
    verificar(endpoint_buscar)

    setTimeout(() => {
        console.log(existe)
        if (endpoint_buscar == "") {
            document.querySelector("#vista").innerHTML = ``
            consumir("",poder_minimo)
        }else {

            verificarsimilitud(endpoint_buscar)
            setTimeout(() => {
                
                if(pokemonessimilares.length==0){
                   
                    Swal.fire({
                        
                        imageUrl: 'pokedex.png',
                        imageWidth: 500,
                        imageHeight: 500,
                        imageAlt: 'Custom image',
                        background: '#f0ffff00',
                        showConfirmButton: false,
                        timer: 2500
                      })
                
            }else{
                document.querySelector("#vista").innerHTML = ``
                pokemonessimilares.forEach((element,x) => {
                    api_url = `https://pokeapi.co/api/v2/pokemon/${element}`;
                let consumo_api = fetch(api_url);
                consumo_api.then(respuesta_api => respuesta_api.json())
                    .then(data_api => {
                        var imagen = data_api.sprites.other.home.front_default
                        
                        if (data_api.sprites.other.home.front_default == null) {
                            imagen =data_api.sprites.front_shiny
                            // imagen =data_api.sprites.other.official-artwork.front_default
                        }
                        document.querySelector("#vista").innerHTML += `
                        <div class="col">
                            <div class="card border border-5 border-dark bg-rojo ">
                            <img src="${imagen}" class="card-img-top" alt="...">
                            <div class="card-body">
                            <h5 class="card-title">${data_api.name}</h5>
                            </div>
                                <ul class="list-group" id = "informacion_personaje">
                                        <li id = "tipo${x}" class="list-group-item">Tipo de pokemon: </li>
                                        <li id = "peso" class="list-group-item">peso : ${data_api.weight} Kilos</li>
                                        <li id = "poder" class="list-group-item">Poder Base:  ${data_api.stats[0].base_stat} %<br>
                                        <progress class=" w-75 " id="file" max="233" value="${data_api.stats[0].base_stat}"> ${data_api.stats[0].base_stat} </progress>       
                                    </li>
                                </ul>
                            </div>
                        </div>
                        `
                        data_api.types.forEach(element => {
                            document.querySelector("#tipo"+x).innerHTML += "<br> •" + element.type.name
                        });
        
                    })
                });
                
                
            
            }
            }, 2000);

        }
        existe =false
        pokemonessimilares=[]
    }, 1000);
    

}

document.querySelector("#btnBuscar").addEventListener("click",()=>{
    var endpoint2=document.querySelector("#Buscar").value
    buscador(endpoint2)
});

var offset = 0
document.querySelector("#adelante").addEventListener("click",()=>{
    
    document.querySelector("#vista").innerHTML = ``
    offset= parseInt(offset)+parseInt(limit)
    consumir(`?offset=${offset}&limit=${limit}`,poder_minimo)
    
});
document.querySelector("#atras").addEventListener("click",()=>{
    if (offset==0) {
        
    }else{
    document.querySelector("#vista").innerHTML = ``
    offset= offset-limit
    consumir(`?offset=${offset}&limit=${limit}`,poder_minimo)
    }
});







function verificar(nombreBuscar){
    
    api_url = `https://pokeapi.co/api/v2/pokemon/?offset=0&limit=1126`;
    let consumo_api = fetch(api_url);
    consumo_api.then(respuesta_api => respuesta_api.json())
        .then(data_api => {
            data_api.results.forEach( elemento => {
                
                numero = elemento.url.split("https://pokeapi.co/api/v2/pokemon/",)
                if (nombreBuscar==elemento.name || nombreBuscar+"/" == numero[1]) {
                    existe=true
                }

            });

                
        })

    
}

function verificarsimilitud(nombreBuscar){
    var Npokemones= 0
    api_url = `https://pokeapi.co/api/v2/pokemon/?offset=0&limit=1126`;
    let consumo_api = fetch(api_url);
    consumo_api.then(respuesta_api => respuesta_api.json())
        .then(data_api => {
            data_api.results.forEach( elemento => {
                
                numero = elemento.url.split("https://pokeapi.co/api/v2/pokemon/",)
                
                var palabra1 = nombreBuscar
                var palabra2 = elemento.name
                var palabra3 = palabra1.split("",)
                var palabra4 = palabra2.split("",)
                var letrasiguales = 0
                palabra3.forEach((element,x) => {
                    (element==palabra4[x])?letrasiguales++:""
                });

                if ((letrasiguales> palabra2.length-3 && ((palabra1.length > palabra2.length-3)&&(palabra1.length < palabra2.length+3))&&letrasiguales>=3)||letrasiguales>4) {
                   
    
                        pokemonessimilares[Npokemones]=palabra2
        
                        Npokemones++
                       
                     
                }

            });

                
        })

    
}








