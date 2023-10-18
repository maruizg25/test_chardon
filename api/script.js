listDetalles = [];
document.getElementById('cabeceraForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const formData = new FormData(this);
    const cabeceraData = {
        Identificacion: formData.get('Identificacion'),
        NombresApellidos: formData.get('NombresApellidos'),
        Sexo: formData.get('Sexo'),
        Correo: formData.get('Correo'),
        Telefonos: formData.get('Telefonos'),
        listDetalles: listDetalles
    };

    //Realiza una solicitud POST a la API
    fetch('http://localhost:3000/register', {
        method: 'POST',
        body: JSON.stringify(cabeceraData),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => {
            if (response.ok) {
                Swal.fire('Cliente creado exitosamente', '', 'success');
                // Llama a la función para mostrar los datos de la cabecera
            } else {
                Swal.fire('Error al crear el cliente', '', 'error');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            Swal.fire('Error al crear el cliente', '', 'error');
        });
});

function mostrarCabecera(cabeceraData) {
    const cabeceraTable = document.getElementById('cabeceraTable');
    const newRow = cabeceraTable.insertRow();

    const identificacionCell = newRow.insertCell();
    identificacionCell.innerText = cabeceraData.Identificacion;

    const nombresApellidosCell = newRow.insertCell();
    nombresApellidosCell.innerText = cabeceraData.NombresApellidos;

    const sexoCell = newRow.insertCell();
    sexoCell.innerText = cabeceraData.Sexo;

    const correoCell = newRow.insertCell();
    correoCell.innerText = cabeceraData.Correo;

    const telefonosCell = newRow.insertCell();
    telefonosCell.innerText = cabeceraData.Telefonos;
}

document.getElementById('add').addEventListener('click', function (event) {
    event.preventDefault();

    // const formData = new FormData(this);
    const detalleData = {
        CodigoArticulo: document.getElementById('CodigoArticulo').value,
        DescripcionArticulo: document.getElementById('DescripcionArticulo').value,
        Cantidad: document.getElementById('Cantidad').value,
        Precio: document.getElementById('Precio').value,
        Subtotal: document.getElementById('Cantidad').value * document.getElementById('Precio').value
    };

    listDetalles.push(detalleData);
    const cuerpoTabla = document.getElementById('cuerpo-tabla');
    while (cuerpoTabla.firstChild) {
        cuerpoTabla.removeChild(cuerpoTabla.firstChild);
    }
    listDetalles.forEach((dato) => {
        const fila = cuerpoTabla.insertRow();
        const cell1 = fila.insertCell(0);
        const cell2 = fila.insertCell(1);
        const cell3 = fila.insertCell(2);
        const cell4 = fila.insertCell(3);
        const cell5 = fila.insertCell(4);

        cell1.innerHTML = dato.CodigoArticulo;
        cell2.innerHTML = dato.DescripcionArticulo;
        cell3.innerHTML = dato.Cantidad;
        cell4.innerHTML = dato.Precio;
        cell5.innerHTML = dato.Subtotal;
    });

    total();

});

function total() {
    var total = 0;
    for (const detalle of listDetalles) {
        total += parseFloat(detalle.Subtotal);
    }
    document.getElementById("total").innerHTML = total;
}

function getAllCabeceras() {

    //Realiza una solicitud POST a la API
    fetch('http://localhost:3000/clientes')
        .then(response => {
            if (response.ok) {
                Swal.fire('Cliente creado exitosamente', '', 'success');
                mostrarCabecera(cabeceraData); // Llama a la función para mostrar los datos de la cabecera
            } else {
                Swal.fire('Error al crear el cliente', '', 'error');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            Swal.fire('Error al crear el cliente', '', 'error');
        });
}