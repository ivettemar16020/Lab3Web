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
    alert("Ooops");
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
  list.id = 'myUL';

  for (let i = 0; i < state.tasks.length; i += 1) {
    const listElement = document.createElement('li');
    listElement.className = `li`;
    listElement.innerHTML = state.tasks[i][0];
    if (state.currentSort === 1 && state.tasks[i][1] === true) {
      list.appendChild(listElement);
    }
    if (state.currentSort === 2 && state.tasks[i][1] === false) {
      list.appendChild(listElement);
    } else if (state.currentSort === 0) {
      list.appendChild(listElement);
    }
  }

  root.appendChild(list);

  //Add new ones
  const inputTask = document.createElement('div');
  inputTask.className= 'inputTask';

  root.appendChild(inputTask);

  const inputField = document.createElement('input');
  inputField.className = 'inputField'; 
  inputField.id = 'myInput';

  const inputBtn = document.createElement('button');
  inputBtn.className = 'inputBtn';
  inputBtn.innerHTML = 'ADD';

  inputTask.appendChild(inputField); 
  inputTask.appendChild(inputBtn);

  // Add a "done" symbol when clicking on a list item
  let list1 = document.querySelector('ul');
  list1.addEventListener('click', function(ev) {
  if (ev.target.tagName === 'LI') {
    ev.target.classList.toggle('done');
    let taskName = ev.target.innerHTML; 
    for (let i = 0; i < state.tasks.length; i += 1) {
      if (state.tasks[i][0] === taskName) {
        if(state.tasks[i][1] === false){
          state.tasks[i][1] = true;
        }else{
          state.tasks[i][1] = false;
        }
        console.log(state.tasks[i]);
      }
    }
    
    }
  }, false);

  

  // Events
  inputBtn.onclick = () => {
    addTask();
    render(lState);
  };

  state1.onclick = () => {
    state.currentSort = 0;
    render(lState);
  }

  state2.onclick = () => {
    state.currentSort = 1;
    render(lState);
  }

  state3.onclick = () => {
    state.currentSort = 2;
    render(lState);
  }

  
}

function addTask(){
  let inputValue = document.getElementById("myInput").value;
  if (inputValue === '') {
    alert("Ooops");
  } else {
    state.tasks.push([document.getElementById("myInput").value, false]);
  }
  document.getElementById("myInput").value = "";
}

render(state);