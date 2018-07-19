const state = {
  //filtro
  //tareas
  //loading
};

const render = lState =>  {
  // Clear previous root content
  if (root.hasChildNodes()) {
    root.innerHTML = null;
  }
  
  const title = document.createElement('h1');
  title.innerHTML = 'todolist';

  
}

render(state);