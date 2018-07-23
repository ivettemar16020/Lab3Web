const state = {
  tasks: [], //name and state
  currentSort: 0, //it can be 0,1,2
  isLoading: false //if the data is loading
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
    alert("Oops an error has occurred");
  });

//lState
const render = lState =>  {
  // Clear previous root content
  if (root.hasChildNodes()) {
    root.innerHTML = null;
  }

  //Div container --> sort buttons 
  const states = document.createElement('div');
  states.className= 'states';

  //Button1 --> shows all the tasks
  const state1 = document.createElement('button');
  state1.className = 'state';
  state1.innerHTML = 'ALL';

  //Button2 --> shows all the completed tasks
  const state2 = document.createElement('button');
  state2.className = 'state';
  state2.innerHTML = 'COMPLETED';

  //Button3 --> shows all the active tasks
  const state3 = document.createElement('button');
  state3.className = 'state';
  state3.innerHTML = 'ACTIVE';

  root.appendChild(states);
  states.appendChild(state1);
  states.appendChild(state2);
  states.appendChild(state3);

  //List of tasks
  const list = document.createElement('ul');
  list.className = 'list';
  list.id = 'myUL';

  //Sort the tasks depending on the state
  for (let i = 0; i < state.tasks.length; i += 1) {
    const listElement = document.createElement('li');
    listElement.className = 'li';
    listElement.innerHTML = state.tasks[i][0];
    if (state.currentSort === 1 && state.tasks[i][1] === true) {
      list.appendChild(listElement);
      listElement.classList.add('complete');
    }
    if (state.currentSort === 2 && state.tasks[i][1] === false) {
      list.appendChild(listElement);
    } else if (state.currentSort === 0) {
      list.appendChild(listElement);
      if(state.tasks[i][1] === true) {
        listElement.classList.add('complete');
      }
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
    render(lState);
  }, false);

  // Events: onclick
  // Using render cycle 
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

//Function that add a new task
function addTask(){
  let inputValue = document.getElementById('myInput').value;
  if (inputValue === '') {
    alert("Blank field");
  } else {
    //Adding the new task in the array
    state.tasks.push([document.getElementById('myInput').value, false]);
  }
  //Empty field
  document.getElementById("myInput").value = "";
}

//Rendering 
render(state);