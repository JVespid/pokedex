
const BucarPokemon = () => {
    const pokeNameInput = document.querySelector(".name-pokemon");
    let pokeName = pokeNameInput.value.toLowerCase();

    const url = `https://pokeapi.co/api/v2/pokemon/${pokeName}`;
    
    fetch(url)
        .then(res => {
            if (res.status != "200") {
                console.log(res);
                ImgPokemon("css/img/error.jpg");
            } else {
                return res.json();
            }
        })
        .then(data => {
            if (data) {

                try {
                    let linkImgPokemon = data.sprites.other.dream_world.front_default;
                    let abilities_Name = data.abilities;
                    let stat_Name = data.stats;
                    let type_Name = data.types;
                    let species_url;
                    try {
                        species_url = data.species.url;
                    } catch (error) {
                        species_url = data.species[0].url;
                    }
    
                    ImgPokemon(linkImgPokemon);
                    ObtencionDatos(stat_Name, type_Name, abilities_Name);
                    ConsultaDescripcion(species_url);
                    
                } catch (error) {
                    ImgPokemon("css/img/error.jpg");
                }
                
            }
        });

};






const ObtencionDatos = (_statName, _typeName, _abilitiesName) => {

    console.log(_statName)

    const divStat = document.querySelector(".stats");
    const divElemt = document.querySelector(".elemento-pokemon");

    for (let i = 0; (i < _statName.length) || (i < _typeName.length) || (i < _abilitiesName.length) ; i++) {

        if(i < _statName.length){

            var div = document. createElement("div");
            div.setAttribute("class", "datos-stats datos new");  
            div.innerHTML = ClaseStats(_statName[i].stat.name,_statName[i].effort,_statName[i].base_stat);
            
            divStat.appendChild(div);
            
        }
        if(i < _typeName.length){

            var div = document. createElement("div");
            div.setAttribute("class", "name-elemet new");  
            div.innerHTML = ClaseElement(_typeName[i].type.name);

            divElemt.appendChild(div);
            
        }
        if(i < _abilitiesName.length){

            let busqueda = _abilitiesName[i].ability.url;
            let name = _abilitiesName[i].ability.name;
            ConsultaAbilities(busqueda, name )
        }
        
    }


}


const ConsultaAbilities = (_abilitiesUrl, _abilitiesName) => {  
    let busquedaDes, index;
    
    fetch(_abilitiesUrl)
        .then(res => {

            if (res.status != "200") {
            } else {
                return res.json();
            }
        }).then(data => {
            if (data) {

                const divHabilidad = document.querySelector(".habilidades");

                let arrays = data.flavor_text_entries
                index = arrays.findIndex(array => array.language.name === "es");
                busquedaDes = arrays[index].flavor_text;
                
                var div = document.createElement("div");
                div.setAttribute("class", "name-habilidades new"); 
                div.innerHTML = ClaseHabilidades(_abilitiesName, busquedaDes);
                divHabilidad.appendChild(div);
            }
        });

}


ConsultaDescripcion = (_speciesurl) => {

    fetch(_speciesurl)
        .then(res => {

            if (res.status != "200") {
                console.log(res);
            } else {
                return res.json();
            }
        }).then(data => {
            if (data) {

                const divHabilidad = document.querySelector(".obtencion-datos");
                let arrays = data.flavor_text_entries
                var div;

                do{

                    index = arrays.findIndex(array => array.language.name === "es");
                    busquedaDes = arrays[index].flavor_text;
                    busquedaVer = arrays[index].version.name;

                    console.log(busquedaVer)

                    arrays[index].language.name ="en";
                    
                    div = document.createElement("div");
                    div.setAttribute("class", "datos-descripcion datos new"); 
                    div.innerHTML = ClaseDescriptions(busquedaDes, busquedaVer);
                    divHabilidad.appendChild(div);
                    index = arrays.findIndex(array => array.language.name === "es");

                }while (index != -1 );


            }
        });



}




const ImgPokemon = url => {
    const pokePhoto = document.querySelector(".img-pokemon");
    pokePhoto.src = url;
};





const ClaseElement = element => {
    //<!-- tal vez borrar -->

    return `<p>${element}</p>`

}
const ClaseStats = (name, effort, power) => {
    //<!-- tal vez borrar -->

    return `<div class="name-stat new">
                <p>${name}</p>
            </div>

            <div class="effort-stat new">
                <p>${effort}</p>
            </div>

            <div class="power-stat new">
                <p>${power}</p>
            </div>`

}
const ClaseDescriptions = (descrip, version) => {
    //<!-- tal vez borrar -->

    return `<div class="lista-descripcion new">
                <p>${descrip}</p>
            </div>

            <div class="version-descripcion new">
                <p>${version}</p>
            </div>`

}
const ClaseHabilidades = (name, descripcion) => {

    //<!-- tal vez borrar -->

    return `<div class="habilidad new">
                    <p>${name}</p>
                </div>
                <div class="descripcion-habilidad new">
                    <p>${descripcion}</p>
                </div>`
}



const botonClick = document.querySelector(".solicitar-pokemon");

botonClick.addEventListener('click', () => {
    const elementosNew = document.querySelectorAll(".new");
    for (let i = 0; i < elementosNew.length; i++) 
        elementosNew[i].remove("new");

    BucarPokemon()

});

document.querySelector(".name-pokemon").addEventListener('keydown', (e)=>{

    if (e.keyCode == 13) {
        botonClick.focus();
    }
});

