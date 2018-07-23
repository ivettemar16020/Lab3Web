const state = {
  tasks: [], //name and state
  sort: ['all', 'active', 'completed'],
  currentSort: 0,
  isLoading: false
};

//FETCH 
const solicitud = fetch('https://raw.githubusercontent.com/samuelchvez/todos-fake-json-api/master/db.json');

//Then
solicitud
  .then(resultado => resultado.json())
  .then(resultadoJSON => {
    for (let i = 0; i < resultadoJSON.length; i = i + 1) {
      state.tasks.push([resultadoJSON[i].title, resultadoJSON[i].isCompleted]);
      console.log(state.tasks[i]);
    }
  })
  .then(() => render(state))
  .catch((err) => {
    // Handle any error that occurred in any of the previous
    // promises in the chain.
  });


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

  //List of tasks
  const list = document.createElement('ul');
  list.className = 'list';

  for (let i = 0; i < state.tasks.length; i += 1) {
    const listElement = document.createElement('li');
    listElement.id = `mensajeindiv ${i}`;
    listElement.innerHTML = state.tasks[i][0];
    list.appendChild(listElement);
    /*
    if (state.currentSort === 1 && state.tasks[i][1] === true) {
      list.appendChild(listElement);
    }
    if (state.currentSort === 2 && state.tasks[i][1] === false) {
      list.appendChild(listElement);
    } else if (state.currentSort === 0) {
      list.appendChild(listElement);
    }
    */
  }

  root.appendChild(list);

  //Add new ones
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