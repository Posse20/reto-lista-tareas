/**
 * Lista que guarda las tareas ingresadas por el usuario
 */
let taskList = [];
/**
 * ID inicial para la primer tarea que ingrese el usuario
 */
let counterId = 1;
/**
 * Constantes que representan elementos del HTML
 */
const tasksElementsList = document.getElementById('taskList');
const tasksInput = document.getElementById('task_name');
/**
 * Clase que define una tarea nueva
 */
class Task {
    constructor(id, taskName){
        this.id = id;
        this.taskName = taskName;
        this.completed = false;
    }

    markCompleted(){
        this.completed = !this.completed;
    }
}
/**
 * Método que se ejecuta cuando se hace click en el botón de agregar
 */
function addTask() {
    const task = new Task(counterId, tasksInput.value.trim());
    counterId++;
    taskList.push(task);
    renderList(taskList);
    tasksInput.value = '';
}
/**
 * Metodo que se ejecuta cuando se quieren ver solo las tareas completadas
 */
function completedTasks() {
    const completed = taskList.filter(x => x.completed);
    this.renderList(completed);
}
/**
 * Metodo que muestra todas las tareas
 */
function allTasks() {
    this.renderList(taskList);
}
/**
 * Metodo que elimina una tarea
 */
function removeTask(id) {
    const index = taskList.findIndex(x => x.id === id);
    if(index !== -1){
        taskList.splice(index, 1);
        renderList(taskList);
    }
}
/**
 * Método que renderiza la lista de teras
 */
function renderList(taskItems){
    //Limpiar la lista de elementos siempre que se va a renderizar
    tasksElementsList.innerHTML = '';

    taskItems.forEach(ele => {
        // Se crea el elemento de lista, y se le asigna como atributo el id
        const list = document.createElement('li');
        list.setAttribute('task-id', ele.id);
        // Se crea el elemento del checkbox
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = ele.completed;
        // Se crea el elemento deel span para mostrar el nombre de la tarea
        const labelTaskName = document.createElement('span');
        labelTaskName.textContent = ele.taskName;
        labelTaskName.style.marginLeft = '10px';
        // Añadir el evento de cambio al checkbox 
        checkbox.addEventListener('change', () => {
            ele.markCompleted();
            list.classList.toggle('completed', ele.completed)
        })
        // Añadir el elemento del botón de eliminar el elemento
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'X';
        deleteBtn.title = 'Eliminar';
        deleteBtn.classList.add('delete-task-btn')
        deleteBtn.addEventListener('click', () => {
            this.removeTask(ele.id);
        })
        // Añadir todo al elemento del HTML que muestra la lista
        list.appendChild(checkbox);
        list.appendChild(labelTaskName);
        list.appendChild(deleteBtn);
        tasksElementsList.appendChild(list);
    });
}
