let tareas = [
  { id: 1, descripcion: "Hacer mercado", realizada: true },
  { id: 2, descripcion: "Estudiar para la prueba", realizada: false },
  { id: 3, descripcion: "Sacar a pasear a Tobby", realizada: false }
];

let contadorId = 4;
let eliminadas = 0;

document.getElementById("btnAgregar").addEventListener("click", agregarTarea);

function render() {
  const lista = document.getElementById("lista");
  lista.innerHTML = "";

  tareas.forEach(tarea => {
    lista.innerHTML += `
      <tr>
        <td>${tarea.id}</td>

        <td class="${tarea.realizada ? 'done' : ''}">
          ${tarea.descripcion}
        </td>

        <td>
          <input type="checkbox"
            ${tarea.realizada ? "checked" : ""}
            onchange="toggle(${tarea.id})">
        </td>

        <td>
          <button onclick="eliminar(${tarea.id})">❌</button>
        </td>
      </tr>
    `;
  });

  actualizarResumen();
}

function agregarTarea() {
  const input = document.getElementById("inputTarea");
  const texto = input.value.trim();

  if (!texto) return;

  tareas.push({
    id: contadorId++,
    descripcion: texto,
    realizada: false
  });

  input.value = "";
  render();
}

function eliminar(id) {
  tareas = tareas.filter(t => t.id !== id);
  eliminadas++;
  render();
}

function toggle(id) {
  const tarea = tareas.find(t => t.id === id);
  tarea.realizada = !tarea.realizada;
  render();
}

function actualizarResumen() {
  document.getElementById("total").innerText = tareas.length;

  const realizadas = tareas.filter(t => t.realizada).length;
  document.getElementById("realizadas").innerText = realizadas;

  document.getElementById("eliminadas").innerText = eliminadas;
}

render();