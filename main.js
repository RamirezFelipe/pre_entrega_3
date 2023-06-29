// Obtén las tareas del localStorage al una vez que la pagina carge
window.onload = function() {
  const tareasGuardadas = JSON.parse(localStorage.getItem('tareas'));
  if (tareasGuardadas) {
    tareas = tareasGuardadas;
    rederTareas();
  }
};

// Array de tareas segun sus estados
let tareas = {
  hacer: [],
  haciendo: [],
  hecho: []
};

// Escucha el formulario de envío para agregar nuevas tareas
// Agregando deteccion de eventos para la tercera entrega 
document.getElementById('task-form').addEventListener('submit', function(e) {
  e.preventDefault();
  const nombre = document.getElementById('task-nombre').value;
  const descripcion = document.getElementById('task-descripcion').value;
  const fechaInicio = document.getElementById('task-fechaInicio').value;
  const fechaTermino = document.getElementById('task-fechaTermino').value;
  const nivelPrioridad = document.getElementById('task-nivelPrioridad').value;

  tareas.hacer.push({
    nombre,
    descripcion,
    fechaInicio,
    fechaTermino,
    nivelPrioridad
  });

  // Guarda las tareas en el localStorage
  localStorage.setItem('tareas', JSON.stringify(tareas));

  // Vuelve a renderizar las tareas
  rederTareas();
});


function rederTareas() {
  // Limpia las columnas existentes para cargar las guardadas en el localStorage "tareas"
  // manimulacion del DOM para la tercera entrega
  for (const type of ['hacer', 'haciendo', 'hecho']) {
    const column = document.getElementById(type);
    column.innerHTML = '';
    
    // Añade cada tarea a su columna correspondiente
    for (const task of tareas[type]) {
      // creando elementos, para luego agregar al DOM
      const card = document.createElement('div');
      card.className = 'card';
      
      const cardBody = document.createElement('div');
      cardBody.className = 'card-body';
      
      const cardTitle = document.createElement('h5');
      cardTitle.className = 'card-title';
      cardTitle.textContent = task.nombre;
      
      const cardText = document.createElement('p');
      cardText.className = 'card-text';
      cardText.textContent = task.descripcion;
      
      const cardDates = document.createElement('p');
      cardDates.className = 'card-text';
      cardDates.textContent = `fechaInicio: ${task.fechaInicio} | Fin: ${task.fechaTermino}`;
      
      const cardnivelPrioridad = document.createElement('p');
      cardnivelPrioridad.className = 'card-text';
      cardnivelPrioridad.textContent = `Prioridad: ${task.nivelPrioridad}`;
      
      // agrega los elementos al DOM 
      cardBody.appendChild(cardTitle);
      cardBody.appendChild(cardText);
      cardBody.appendChild(cardDates);
      cardBody.appendChild(cardnivelPrioridad);
      
      
      // Añade los botones para mover las tareas
      if (type !== 'hecho') {
        const moverEstado = document.createElement('button');
        moverEstado.className = 'btn btn-primary';
        moverEstado.textContent = 'Mover al siguiente estado';
        moverEstado.addEventListener('click', function() {
          // Mueve la tarea al siguiente estado
          tareas[type] = tareas[type].filter(t => t !== task);
          tareas[type === 'hacer' ? 'haciendo' : 'hecho'].push(task);
          
          // Guarda las tareas en el localStorage
          localStorage.setItem('tareas', JSON.stringify(tareas));
          
          // Vuelve a renderizar las tareas
          rederTareas();
        });
        cardBody.appendChild(moverEstado);
      }
      
      card.appendChild(cardBody);
      const cardSpace = document.createElement('br');
      column.appendChild(card);
      column.appendChild(cardSpace)
    }
  }
}
