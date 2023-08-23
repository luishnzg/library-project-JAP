let listado = [];
let min = undefined;
let max = undefined;
let search = "";

function filtrarLibros(listaLibros) {

    let listaFiltrada = listaLibros.filter(libro => {
        return (parseInt(libro.paginas) >= min || min == undefined) && (parseInt(libro.paginas) <= max || max == undefined)
    });
    return listaFiltrada
}

function redirigir(id) {
    localStorage.setItem("libroID",id);
    window.location.href = "ver-libro.html"
}

function mostrarLibros(listaLibros) {
    document.getElementById("listado").innerHTML = "";

    for (let libro of listaLibros) {
        if (libro.titulo.toLowerCase().includes(search.toLowerCase())) {
            let li = `
            <li onclick="redirigir(${libro.id})">
                Título: ${libro.titulo} <br>
                Autor: ${libro.autor} <br>
                Editorial: ${libro.editorial} <br>
                Páginas: ${libro.paginas}
            </li> 
            <hr>`;

            document.getElementById("listado").innerHTML += li;
        }

    }

}

document.addEventListener("DOMContentLoaded", function () {
    getJSONData(LIBROS_URL).then(resultObj => {
        if (resultObj.status == "ok") {
            listado = resultObj.data;
            mostrarLibros(listado);
        } else {
            alert("No se pudo....");
        }
    })

    document.getElementById("filtrar").addEventListener("click", function () {

        if (document.getElementById("rango-min").value != "") {
            min = parseInt(document.getElementById("rango-min").value);
        } else {
            min = undefined;
        }

        if (document.getElementById("rango-max").value != "") {
            max = parseInt(document.getElementById("rango-max").value);
        } else {
            max = undefined;
        }

        mostrarLibros(filtrarLibros(listado));

    })

    document.getElementById("limpiar").addEventListener("click", function () {
        min = undefined;
        max = undefined;
        mostrarLibros(listado);
        document.getElementById("rango-min").value = "";
        document.getElementById("rango-max").value = "";

    })

    document.getElementById("buscador").addEventListener("input", function () {
        search = document.getElementById("buscador").value;
        mostrarLibros(listado)
    })

    document.getElementById("sortPagDesc").addEventListener("click", function () {

        listado.sort(function (a, b) {
            return parseInt(b.paginas) - parseInt(a.paginas);
        });
        mostrarLibros(listado);
    })
})
