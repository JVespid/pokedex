
setTimeout( () => {
    console.log("wa")

    document.querySelector(".pokedex-carga-content").remove("pkedex-carga-content");
    }, 5000); 



const responsibe = () =>{

    const body = document.querySelector("body");
    const parteTop    = document.querySelector(".part-top");
    const parteButton = document.querySelector(".part-botton");
    const content = document.querySelector(".content");
    const obtencionDatos = document.querySelector(".obtencion-datos");
    
    if(body.clientWidth <= 850){
        parteTop.style.width = body.clientWidth + "px";
        parteButton.style.width = body.clientWidth + "px";
        content.style.width = body.clientWidth + "px";
    }else{
        parteTop.style.width = (body.clientWidth/10)*8 + "px";
        parteButton.style.width = (body.clientWidth/10)*8 + "px";
        content.style.width = (body.clientWidth/10)*8 + "px";
    }

    if(body.clientWidth <=600){

        obtencionDatos.style.width = (content.clientWidth/100)*95 + "px";
        console.log("true")
    }else{

        obtencionDatos.style.width = (content.clientWidth/10)*8 + "px";
        console.log("false")
    }
    
    let heightTotal = document.documentElement.clientHeight;
    body.style.height = heightTotal + ".px";

    
}



window.addEventListener("resize", responsibe);

responsibe()


