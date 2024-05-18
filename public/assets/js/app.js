const url = "/api/v1/canciones";
const tbody = document.getElementById("cuerpo");
let cancion = document.getElementById("cancion");
let artista = document.getElementById("artista");
let tono = document.getElementById("tono");

// let canciones = [];
window.onload = getData();

async function getData() {
    await axios.get(url).then((data) => {
        const result = data.data;
        tbody.innerHTML = "";
        result.forEach((item) => {
            tbody.innerHTML += `
            <tr>
              <td>${item.id}</td>
              <td>${item.titulo}</td>
              <td>${item.artista}</td>
              <td>${item.tono}</td>
              <td>
                <button class="btn btn-warning" onclick="prepararCancion('${item.id}')">Editar</button>
                <button class="btn btn-danger" onclick="eliminarCancion('${item.id}')">Eliminar</button>
              </td>
            </tr>
          `;
        });
    });
    cancion.value = "";
    artista.value = "";
    tono.value = "";
}

function nuevaCancion() {
    titulo = cancion.value;
    artista = artista.value;
    tono = tono.value;

    axios
        .post(url, {
            titulo,
            artista,
            tono,
        })
        .then(() => getData());
}

function eliminarCancion(id) {
    axios.delete(url + `/${id}`).then(() => {
        console.log(url + id);
        // alert("Canción " + canciones[i].titulo + " eliminada");
        // getData();
    });
}

function prepararCancion(i, id) {
    cancion.value = canciones[i].titulo;
    artista.value = canciones[i].artista;
    tono.value = canciones[i].tono;
    document.getElementById("editar").setAttribute("onclick", `editarCancion('${id}')`);
    document.getElementById("agregar").style.display = "none";
    document.getElementById("editar").style.display = "block";
}

function editarCancion(id) {
    axios
        .put(url + "/" + id, {
            titulo: cancion.value,
            artista: artista.value,
            tono: tono.value,
        })
        .then(() => {
            getData();
            document.getElementById("agregar").style.display = "block";
            document.getElementById("editar").style.display = "none";
        });
}
