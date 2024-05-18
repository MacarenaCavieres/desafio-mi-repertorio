const url = "/api/v1/canciones";
const tbody = document.getElementById("cuerpo");
let cancion = document.getElementById("cancion");
let artista = document.getElementById("artista");
let tono = document.getElementById("tono");

window.onload = getData();

async function getData() {
    await axios
        .get(url)
        .then((data) => {
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
            document.getElementById("editar").style.display = "none";
            cancion.value = "";
            artista.value = "";
            tono.value = "";
        })
        .catch((error) => console.error(error));
}

function nuevaCancion() {
    titulo = cancion.value;
    const artistaValue = artista.value;
    const tonoValue = tono.value;

    if (!titulo || !artista || !tono) return alert("Todos los campos obligatorios");

    axios
        .post(url, {
            titulo,
            artista: artistaValue,
            tono: tonoValue,
        })
        .then(() => {
            getData();
        });
}

function eliminarCancion(id) {
    axios
        .delete(url + `/${id}`)
        .then(() => {
            getData();
        })
        .catch((error) => console.error(error));
}

async function prepararCancion(id) {
    await axios
        .get(url + `/${id}`)
        .then((data) => {
            const result = data.data;

            cancion.value = result.titulo;
            artista.value = result.artista;
            tono.value = result.tono;

            document.getElementById("editar").setAttribute("onclick", `editarCancion('${result.id}')`);
            document.getElementById("agregar").style.display = "none";
            document.getElementById("editar").style.display = "block";
        })
        .catch((error) => console.error(error));
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
