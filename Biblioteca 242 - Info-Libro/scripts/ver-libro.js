document.addEventListener("DOMContentLoaded", function () {
    let libroID = localStorage.getItem("libroID");
    getJSONData(LIBRO_URL + libroID + ".json").then(resultado => {
        if (resultado.status == "ok") {

            document.getElementById("contenido").innerHTML = `
                <h1>${resultado.data.titulo}</h1>
                <p>${resultado.data.editorial}</p>
                <p>${resultado.data.autor}</p>
            `;

            let imgs = "";

            for (let rutaImagen of resultado.data.imagenes) {
                imgs += `<img src="${rutaImagen}">`;
            }

            document.getElementById("imagenes").innerHTML = imgs;


        }else{
            alert("Se rompió")
        }
    })
})