const state = {
  tasks: [['',0]], //name and state
  sort: ['all', 'active', 'completed'],
  currentSort: 0,
  isLoading: false
};

const solicitud = fetch('https://raw.githubusercontent.com/samuelchvez/todos-fake-json-api/master/db.json');

solicitud
  .then(resultado => resultado.json())
  .then(resultadoJSON =>{
    state.tasks = resultadoJSON
    console.log(resultadoJSON)
    console.log(state.tasks)});

const render = lState =>  {
  // Clear previous root content
  if (root.hasChildNodes()) {
    root.innerHTML = null;
  }

  const states = document.createElement('div');
  states.className= 'states';

  root.appendChild(states);

  const state1 = document.createElement('button');
  state1.className = 'state';
  state1.innerHTML = 'ALL';
  const state2 = document.createElement('button');
  state2.className = 'state';
  state2.innerHTML = 'COMPLETED';
  const state3 = document.createElement('button');
  state3.className = 'state';
  state3.innerHTML = 'ACTIVE';

  states.appendChild(state1);
  states.appendChild(state2);
  states.appendChild(state3);

  const inputTask = document.createElement('div');
  inputTask.className= 'inputTask';

  root.appendChild(inputTask);

  const inputField = document.createElement('input');
  inputField.className = 'inputField'; 

  const inputBtn = document.createElement('button');
  inputBtn.className = 'inputBtn';
  inputBtn.innerHTML = 'ADD';

  inputTask.appendChild(inputField); 
  inputTask.appendChild(inputBtn);

  
}

render(state);