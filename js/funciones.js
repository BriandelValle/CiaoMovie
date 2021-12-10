//var peli=null;
var numSiguiente = 1
var totalPelis = 0

const d = document;
let getJSON = "";
let favlink = d.querySelector('#favlink');

favlink.addEventListener('click', () => {
    console.log('click');
    MostrarFavs(pelicula)
});




// estado offline/online
const alert = document.getElementById('alert')

addEventListener('online', (e) => {
    setAlert(1)
})

addEventListener('offline', (e) => {
    setAlert(0)
})

const setAlert = (status) => {
    alert.classList.remove('alert--online')
    alert.classList.remove('alert--offline')

    status === 0 ?
        setTimeout(() => {
            alert.textContent = 'Ups, parece que estas desconectado de la red'
            alert.classList.add('alert--offline')
        }, 100)
        :
        setTimeout(() => {
            alert.textContent = 'Usted se encuentra en conectado a la red'
            alert.classList.add('alert--online')
        }, 100)
}

function eventoBtn() {
    const searchText = document.getElementById('searchText');

    let url = `https://www.omdbapi.com/?t=${searchText.value}&apikey=9177a8fa&plot=full`;
    cargarDatos(url);
}
function cargarDatos(txto) {
    console.log(txto);
    var detalles = "";
    if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();
    } else {
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function () {

        if (this.readyState == 4 && this.status == 200) {
            var data = JSON.parse(this.responseText)
            console.log(data)
            /* data.Search.forEach(movie => { */
                //console.log(movie.imdbID)
                detalles +=
                    "<div class=modal-dialog >" +
                    "<div class=modal-content md>" +
                    "<div class=modal-body><h1>" +
                    data.Title + "</h1><br>" +
                    "<img class=card-img-top src='" + data.Poster + "'><br>" +
                    "<h3> Año de Lanzamiento: " + data.Year + "</h3>" +
                    "<h3> Tipo: " + data.Type + "</h3>" +
                    "<a class=btn btn-primary btn-lg btn purple-gradient data-toggle=modal href='#dat' onclick=\"buscaId('" + data.imdbID + "')\">Mas Detalles</a>" +
                    "<a class=btn btn-primary btn-lg btn purple-gradient data-toggle=modal onclick=\"guardarEnStorage('" + data.Title + "')\">Agregar a Favoritos</a>"

                    + "</div>" + "</div>" + "</div>";
            /* }); */
            document.getElementById('answer').innerHTML = detalles;
        } else {
            document.getElementById('answer').innerHTML = "<h2> No se a encontrado resultados. </h2>"
        }
    };
    xmlhttp.open("GET", txto, true);
    xmlhttp.send();

}
function buscaId(id) {
    console.log(id);
    let deta = '';
    if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();
    } else {
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            const peli = JSON.parse(this.responseText)

            console.log(xmlhttp)
            //console.log(peli);
            deta = `
            <div class="modal-dialog">
            <div class="modal-content md">
                <div class="modal-header">
                    <h4 class=modal-title>Titulo: ${peli.Title}</h4>
                </div>
                <div class="modal-body" id="saraza">
                <p class=card-text>Año de Lanzamiento: ${peli.Year}</p>
                <p class=card-text>Fecha de Estreno: ${peli.Released}</p>
                <p class=card-text>Duracion: ${peli.Runtime}</p>
                <p class=card-text>Genero: ${peli.Genre}</p>
                <p class=card-text>Director: ${peli.Director}</p>
                <p class=card-text>Escrita por: ${peli.Writer}</p>
                <p class=card-text>Actores: ${peli.Actors}</p>
                <p class=card-text>Trama: ${peli.Plot}</p>
                <p class=card-text>Language: ${peli.Language}</p>
                <p class=card-text>País: ${peli.Country}</p>
                <p class=card-text>Premios: ${peli.Awards}</p>
                <p class=card-text>Metascore: ${peli.Metascore}</p>
                <p class=card-text>imdbRating: ${peli.imdbRating}</p>
                <p class=card-text>DVD: ${peli.DVD}</p>
                <p class=card-text>imdbVotos: ${peli.imdbVotes}</p>
                </div>
            </div>
        </div>`;
            //console.log(deta);
            document.getElementById("dat").innerHTML = deta
        }
    };
    xmlhttp.open("GET", "https://www.omdbapi.com/?apikey=9177a8fa&i=" + id, true);
    xmlhttp.send();
}


// paginación

/* function pag(pg) {
    var titulo = document.getElementById("searchText").value;
    numSiguiente = numSiguiente + (pg);
    console.log(numSiguiente)


    if (numSiguiente <= 1) {
        numSiguiente = 1
        document.getElementById('back').classList.add("disabled");

    } else {
        document.getElementById('back').classList.remove("disabled");
    }

    var totalPel = totalPelis / 10
    console.log(totalPel)

    let html = `
        <div style="display: flex; align-items: center; justify-content: center;" id="numPg">
                <li class="previous">
                    <a class="page-link"> Pagina ${numSiguiente}/${Math.round(totalPel)} </a>
                </li>
        </div>
    `;
    document.querySelector('#numPg').innerHTML = html

    let url = `https://www.omdbapi.com/?apikey=9177a8fa&s=${titulo}&page=${numSiguiente}`
    //console.log(url)
    cargarDatos(url)
} */


//seccion fav



function guardarEnStorage(pelicula) {
    console.log(pelicula);
    // let peliculaS = JSON.parse(pelicula);
    // console.log(peliculaS);

    // Titulo de Peliculas
    const getJSON = JSON.parse(localStorage.getItem('Titulo de Peliculas'));

    //chequeo de lista sin valor
    if (getJSON == null){
        const newList = [];
        newList.push(pelicula);
        localStorage.setItem('Titulo de Peliculas', JSON.stringify(newList));
    } else {
        const isInList = getJSON.some(item => item === pelicula);
        if (!isInList) {
            getJSON.push(pelicula);
            localStorage.setItem('Titulo de Peliculas', JSON.stringify(getJSON))
        }
    }
}



function MostrarFavs() {
    let divFav = d.querySelector('#fav');
    list = JSON.parse(localStorage.getItem('Titulo de Peliculas'));
divFav.innerHTML="";

if (getJSON !== null || getJSON.length > 0) {
       
    console.log(getJSON);
    for( pelicula of getJSON){

        let divData = d.createElement('div');
        divData.classList.add('container', 'card');
        divData.style.width = '20rem';
        divFav.appendChild(divData);

        //title
        let h2Fav = d.createElement('h2');
        h2Fav.innerHTML = pelicula.Title;
        h2Fav.classList.add('title');
        divData.appendChild(h2Fav);

                    //btn
                    let favBorrar = d.createElement('a');
                    favBorrar.innerHTML = 'Remove';
                    favBorrar.id = pelicula.Title;
                    favBorrar.classList.add('btn', 'btn-danger', 'boton');
                    divSinopsis.appendChild(favBorrar);
        
                    favDelete.addEventListener('click', () => {
                        deleteFav(favBorrar.Title)
                        divFav.innerHTML="";
                        MostrarFavs();
        
                    })
        
                }
                
            }
        }


//fav


/* function agregarFav(pelicula){
    const agregarFavorito = d.getElementById('agregarFavorito');
    agregarFavorito.addEventListener('click', (ev) => {
        console.log('click');
        ev.target.getAttribute('data-pelicula');
        guardarEnStorage(pelicula);
    })

    const quitarFavorito = d.getElementById('quitarFavorito');
    quitarFavorito.addEventListener('click', () => {
        console.log('click');
        borrarStorage(pelicula);
    })
}

function sinFav() {
    if (listaStorage === null || listaStorage.length === 0){

        let Vacio = d.creatElement('h1');
        Vacio.innerHTML = 'No se agregaron peliculas';
        Vacio.classList.add('sinFavoritos');
        // modal-dialog.appendChild(vacio);
    }
} */




