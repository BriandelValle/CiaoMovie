const d = document;
const b = d.body
const mainBuscador = d.getElementById('mainBuscador');
const mainWatchlist = d.getElementById('mainWatchlist');
const mainSugerencias = d.getElementById('mainSugerencias');
const API_KEY = 'dc49e68f';
const inputBusqueda = d.getElementById('inputBusqueda');
let watchList = [];
let peliculaActual;

if (localStorage.getItem("watchList")) {
    let watchListLS = JSON.parse(localStorage.getItem("watchList"));
    watchListLS.forEach(function(element){
        let peliLS = new Pelicula(element.titulo, element.plot, element.tipo, element.anio, element.genero, element.director, element.actores, element.poster, element.rating);
        watchList.push(peliLS);
    })
}

// VERIFICO CONEXION A INTERNET
window.addEventListener('offline', event => {
    let conexionCHK = d.getElementById('conexionChk');
    conexionCHK.className = ("offline");
    conexionCHK.innerHTML = ('<i class="gg-shape-circle"></i> Offline');
});

window.addEventListener('online', event => {
    let conexionCHK = d.getElementById('conexionChk');
    conexionCHK.className = ("online");
    conexionCHK.innerHTML = ('<i class="gg-shape-circle"></i> Online');
});

if (!navigator.onLine) {
    let conexionCHK = d.getElementById('conexionChk');
    conexionCHK.className = ("offline");
    conexionCHK.innerHTML = ('<i class="gg-shape-circle"></i> Offline');
}
// FIN VERIFICO CONEXIÓN A INTERNET


/**
 * Clase Película que contiene el formato de la película que se muestra en la app
 * 
 * @param {string} titulo 
 * @param {string} plot 
 * @param {string} tipo 
 * @param {int} anio 
 * @param {string} genero 
 * @param {string} director 
 * @param {string} actores 
 * @param {string} poster 
 * @param {string} rating 
 */
function Pelicula(titulo, plot, tipo, anio, genero, director, actores, poster, rating)
{
    this.titulo = titulo;
    this.plot = plot;
    this.tipo = tipo;
    this.anio = anio;
    this.genero = genero;
    this.director = director;
    this.actores = actores;
    this.poster = poster;
    this.rating = rating;    
  }

function traerPeliculas(palabraBusqueda)
{
    fetch (
        `https://www.omdbapi.com/?apikey=${API_KEY}&t=${palabraBusqueda}`
        ).then(function(response){
        return response.json();
    }).then(function(responseJson){
        if (responseJson.Response != 'False') {
            console.log('Funciona el fetch');

            peliculaActual = new Pelicula(responseJson.Title, responseJson.Plot, responseJson.Type, responseJson.Year, responseJson.Genre, responseJson.Director, responseJson.Actors, responseJson.Poster, responseJson.Ratings);
            
            mostrarPelicula(peliculaActual);

            return responseJson;
        }
        else {
            console.log('No funciona el fetch');
        }
    }).catch(function (err) {
        console.log("Hubo un fallo en la interacción con la API.", err);
    });
    
}

// Escuchador en el input que busca la película ejecutando el fetch
if (inputBusqueda != null) {
inputBusqueda.addEventListener("input", function() {
    traerPeliculas(inputBusqueda.value);
});
}

// Escuchador en el input que busca la película ejecutando el fetch
if (inputBusqueda != null) {
inputBusqueda.addEventListener("input", function() {
    traerPeliculas(inputBusqueda.value);
});
}

// Función que carga el HTML de las películas
function cargarPelicula() {
    let htmlPelicula = d.createElement('div');
    htmlPelicula.className = ('div-det-pelicula');
    htmlPelicula.innerHTML = (`<section class="container-detalle-pelicula container animate__animated animate__fadeIn" id="containerDetallePelicula">
                            <article class="detalle-pelicula">
                            <img id="detPoster" src="" alt="Portada de la película">
                            <div class="deta-info">
                            <h2 id="detTitulo"></h2>
                            <span id="detTipo"></span>
                            <p id="detPlot"></p>
                            <p id="detGeneroAnio"></p>
                            <p id="detDirector">Director:</p>
                            <p id="detActores">Actores:</p>
                            <span id="detRating">Rating de</span>
                            <a href="#" id="addWL">Agregar a WatchList</a>
                            <div>
                            </article>
                        </section>`);
    this.getHtmlPelicula = () => {
        return htmlPelicula;
    }
}cargarPelicula();

function cargarWatchList() {
    let htmlWatchlist = d.createElement('div');
    htmlWatchlist.className = ('div-det-watchlist');
    htmlWatchlist.innerHTML = (`<section class="container-watchlist container animate__animated animate__fadeIn" id="containerWatchlist">
                            <ul class="watchlist" id="watchlist">
                            </ul>
                        </section>`);
    
        let htmlWLItem = d.createElement('li');
        let divItem = d.createElement('div');
        let titulo = d.createElement('h2');
        let plot = d.createElement('p');
        let tipo = d.createElement('span');
        let generoAnio = d.createElement('p');
        let director = d.createElement('p');
        let actores = d.createElement('p');
        let poster = d.createElement('img');
        let rating = d.createElement('span');
        let botonAdd = d.createElement('a');
        let liVacio = d.createElement('li');
        let irInicio = d.createElement('a');

        this.getDivItem = () => {
            return divItem;
        }
        this.getTituloItem = () => {
            return titulo;
        }
        this.getPlotItem = () => {
            return plot;
        }
        this.getTipoItem = () => {
            return tipo;
        }
        this.getGeneroAnioItem = () => {
            return generoAnio;
        }
        this.getDirectorItem = () => {
            return director;
        }
        this.getActoresItem = () => {
            return actores;
        }
        this.getPosterItem = () => {
            return poster;
        }
        this.getRating = () => {
            return rating;
        }
        this.getBotonAdd = () => {
            return botonAdd;
        }
        this.getLiVacio = () => {
            return liVacio;
        }
        this.getIrInicio = () => {
            return irInicio;
        }

    
    this.gethtmlWLItem = () => {
        return htmlWLItem;
    }
    this.getHtmlWatchList = () => {
        return htmlWatchlist;
    }
}

function cargarSugerencias() {
    let htmlPelicula = d.createElement('div');
    htmlPelicula.className = ('div-det-pelicula');
    htmlPelicula.innerHTML = (`<section class="container-detalle-pelicula container animate__animated animate__fadeIn" id="containerSugerencia">
                            <article class="detalle-pelicula">
                            <img id="sugPoster" src="" alt="Portada de la película">
                            <div class="deta-info">
                            <h2 id="sugTitulo"></h2>
                            <span id="sugTipo"></span>
                            <p id="sugPlot"></p>
                            <p id="sugGeneroAnio"></p>
                            <p id="sugDirector">Director:</p>
                            <p id="sugActores">Actores:</p>
                            <span id="sugRating">Rating de</span>
                            <div>
                            </article>
                        </section>`);
    let pVacio = d.createElement('p');
    let irInicio = d.createElement('a');
    
    this.getPVacio = () => {
        return pVacio;
    }
    this.getIrInicioSug = () => {
        return irInicio;
    }
    this.getHtmlSugerencia = () => {
        return htmlPelicula;
    }
}

// Función que muestra la película en el HTML
function mostrarPelicula(data) {
    mainBuscador.appendChild(getHtmlPelicula());
    let titulo = d.getElementById('detTitulo');
    let plot = d.getElementById('detPlot');
    let tipo = d.getElementById('detTipo');
    let generoAnio = d.getElementById('detGeneroAnio');
    let director = d.getElementById('detDirector');
    let actores = d.getElementById('detActores');
    let poster = d.getElementById('detPoster');
    let rating = d.getElementById('detRating');
    titulo.innerHTML = (data.titulo);
    plot.innerHTML = (data.plot);
    tipo.innerHTML = (data.tipo);
    generoAnio.innerHTML = (`${data.genero} - ${data.anio}`);
    director.innerHTML = (`Director: ${data.director}`);
    actores.innerHTML = (`Cast: ${data.actores}`);
    poster.src = (data.poster);
    rating.innerHTML = (`Rating de ${data.rating[0].Source}: ${data.rating[0].Value}`);

    let addWL = d.getElementById('addWL');
    
    let flag1 = 0;
    
    for (let pelicula of watchList) {
        if(pelicula.titulo == peliculaActual.titulo) { // Verifica si la pelicula está en la watchlist. Si no está, aumenta el contador.
            flag1 = 1;
        }
    }

    if (flag1 == 0) { // Si el contador es 0, significa que la película no está en la watchlist, por lo tanto la agrega.
        addWL.innerHTML = ('Agregar a WatchList');
    } else {
        addWL.innerHTML = ('Quitar de WatchList');
    }
    addWL.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopImmediatePropagation();
        
        let cont = 0;
        let flag = 0;
        
        for (let peli of watchList) {

            if(peli.titulo === peliculaActual.titulo && flag === 0){
                flag = 1;
                e.target.innerHTML = ('Agregar a WatchList');
                console.log(peli.titulo);
                console.log(peliculaActual.titulo);
                let indice = watchList.indexOf(peli);
                removeFromWatchList(indice);
            }
        }

        if (flag == 0) {
            e.target.innerHTML = ('Quitar de WatchList');
            addToWatchList();
        }

    });
}

function mostrarWatchList() {
    let botonesAdd = [];
    let peliculasListadas = [];
    this.getPeliculasListadas = () => {
        return peliculasListadas;
    }
    this.getBotonesAdd = () => {
        return botonesAdd;
    }
    if(watchList.length != 0) {
    for (let pelicula of watchList) {
        cargarWatchList();
        mainWatchlist.appendChild(getHtmlWatchList());
        let ulWatchlist = d.getElementById('watchlist');

        getTituloItem().innerHTML = (pelicula.titulo);
        getPlotItem().id = ('WL plot');
        getTipoItem().className = ('WL tipo');
        getPlotItem().innerHTML = (pelicula.plot);
        getTipoItem().innerHTML = (pelicula.tipo);
        getGeneroAnioItem().className = ('WL generoAnio');
        getGeneroAnioItem().innerHTML = (`${pelicula.genero} - ${pelicula.anio}`);
        getDirectorItem().className = ('WL director');
        getDirectorItem().innerHTML = (`Director: ${pelicula.director}`);
        getActoresItem().className = ('WL actores');
        getActoresItem().innerHTML = (`Cast: ${pelicula.actores}`);
        getPosterItem().className = ('WL poster');
        getPosterItem().alt = ('Portada de la película.');
        getPosterItem().src = (pelicula.poster);
        getRating().className = ('WL rating');
        getRating().innerHTML = (`Rating de ${pelicula.rating[0].Source}: ${pelicula.rating[0].Value}`);
        getBotonAdd().className = ('WL botonadd');
        getBotonAdd().innerHTML = ('- Eliminar');
        getBotonAdd().href = ('#');
        
        
            ulWatchlist.appendChild(gethtmlWLItem());
            gethtmlWLItem().appendChild(getPosterItem());
            gethtmlWLItem().appendChild(getDivItem());
            getDivItem().appendChild(getTituloItem());
            getDivItem().appendChild(getTipoItem());
            getDivItem().appendChild(getPlotItem());
            getDivItem().appendChild(getGeneroAnioItem());
            getDivItem().appendChild(getDirectorItem());
            getDivItem().appendChild(getActoresItem());
            getDivItem().appendChild(getRating());
            gethtmlWLItem().appendChild(getBotonAdd());
    
            peliculasListadas.push(gethtmlWLItem());
            botonesAdd.push(getBotonAdd());
    
            getBotonAdd().addEventListener("click", (e) => {
                e.preventDefault();
                e.stopImmediatePropagation();
                let indice;
                let peliculisima;
                for (let peli of watchList) {
                    if (botonesAdd.indexOf(e.target) == watchList.indexOf(peli)){
                        indice = botonesAdd.indexOf(e.target);
                        peliculisima = watchList.indexOf(peli);
                        peliculasListadas[indice].remove();
                        peliculasListadas.splice(indice, 1);
                        botonesAdd.splice(indice, 1);
                    }
                }
                removeFromWatchList(indice);
                if (watchList.length == 0) {
                    getLiVacio().innerHTML = ('Todavía no agregaste contenido a tu Watchlist');
                    getLiVacio().className = ('WL-vacia');
                    getIrInicio().href = ('index.html');
                    getIrInicio().innerHTML = ('Buscar contenido');
                    getIrInicio().className = ('btn-ir-inicio');
                    mainWatchlist.appendChild(getHtmlWatchList());
                    let ulWatchlist = d.getElementById('watchlist');
                    ulWatchlist.appendChild(getLiVacio());
                    getLiVacio().appendChild(getIrInicio());
                }
            });
        
        }
        } else {
            cargarWatchList();
            getLiVacio().innerHTML = ('Todavía no agregaste contenido a tu Watchlist');
            getLiVacio().className = ('WL-vacia');
            getIrInicio().href = ('index.html');
            getIrInicio().innerHTML = ('Buscar contenido');
            getIrInicio().className = ('btn-ir-inicio');
            mainWatchlist.appendChild(getHtmlWatchList());
            let ulWatchlist = d.getElementById('watchlist');
            ulWatchlist.appendChild(getLiVacio());
            getLiVacio().appendChild(getIrInicio());
        }
}

function mostrarSugerencias() {
    let sugerencia = watchList[Math.floor(Math.random() * watchList.length)];
    if (sugerencia != undefined) {
        let data = sugerencia;
        mainSugerencias.appendChild(getHtmlSugerencia());
        let titulo = d.getElementById('sugTitulo');
        let plot = d.getElementById('sugPlot');
        let tipo = d.getElementById('sugTipo');
        let generoAnio = d.getElementById('sugGeneroAnio');
        let director = d.getElementById('sugDirector');
        let actores = d.getElementById('sugActores');
        let poster = d.getElementById('sugPoster');
        let rating = d.getElementById('sugRating');
        titulo.innerHTML = (data.titulo);
        plot.innerHTML = (data.plot);
        tipo.innerHTML = (data.tipo);
        generoAnio.innerHTML = (`${data.genero} - ${data.anio}`);
        director.innerHTML = (`Director: ${data.director}`);
        actores.innerHTML = (`Cast: ${data.actores}`);
        poster.src = (data.poster);
        rating.innerHTML = (`Rating de ${data.rating[0].Source}: ${data.rating[0].Value}`);
    } else {
        getPVacio().innerHTML = ('Todavía no agregaste contenido a tu Watchlist');
        getPVacio().className = ('WL-vacia');
        getIrInicioSug().href = ('index.html');
        getIrInicioSug().innerHTML = ('Buscar contenido');
        getIrInicioSug().className = ('btn-ir-inicio');
        mainSugerencias.appendChild(getPVacio());
        mainSugerencias.appendChild(getIrInicioSug());
    }
}


if (mainWatchlist) {
    mostrarWatchList();
} else if (mainSugerencias) {
    cargarSugerencias();
    mostrarSugerencias();
}

// Función para agregar películas a la watchlist
function addToWatchList() {                                 // Entra si la pelicula existe en la watchlist
    watchList.push(peliculaActual);
    console.log(watchList);
    localStorage.setItem('watchList', JSON.stringify(watchList));
}


// Función para quitar películas de la watchlist
function removeFromWatchList(indice) {               // Entra si la pelicula NO existe en la watchlist
    watchList.splice(indice, 1);
    console.log(watchList);
    localStorage.setItem('watchList', JSON.stringify(watchList));