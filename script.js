document.addEventListener('DOMContentLoaded', () => {

    const todoinput = document.getElementById('todo-input')
    const addTaskButton = document.getElementById('add-task-btn')
    const todolist = document.getElementById('todo-list')

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// In JavaScript,
// a || b
// means →
// ➡️ return a if it’s truthy,
// ➡️ otherwise return b.

// So:
// It doesn’t run both sides.
// It just checks the first one — and if it’s falsy, it moves to the next one.

    tasks.forEach((task) => renderTask(task));

    addTaskButton.addEventListener('click', () => {
        const taskText = todoinput.value.trim();  // .value takes the value from todoinput element
        if (taskText === "") { return }           // This is logical that empty thing is not added 


        const newTask = {
            id: Date.now(),
            text: taskText,
            completed: false
        }


        tasks.push(newTask);
        saveTasks();
        renderTask(newTask);
        todoinput.value = "";   // Clearing Input
        console.log(tasks);

    })

    function renderTask(task) {
        const li = document.createElement('li')
        li.setAttribute('Data-id',task.id);
        li.innerHTML = `<span>${task.text}</span><button class="delete-btn">Delete</button>`;

        todolist.appendChild(li);

        li.addEventListener('click',(e)=>{
           if(e.target.tagName === 'BUTTON')  return ;
           task.completed = !task.completed;
           li.classList.toggle('completed');          // Reverses False To True And Vice Versa
            saveTasks();                               // After Making any changes we should always update the memory
        })

        li.querySelector('.delete-btn').addEventListener('click', (e) => {
            e.stopPropagation();  // stops Event Bubbling
            tasks = tasks.filter(t => t.id !== task.id);
            li.remove()
            saveTasks();
        })
    }


    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

})


/*

e is the event object automatically passed when an event happens (like a click).

e.target gives the exact HTML element that was clicked.
tagName gives the name of the HTML tag (like 'BUTTON', 'DIV', 'LI', etc.) in uppercase.


classList is a property of DOM elements that gives an easy way to work with the element’s CSS classes.
It lets you:

Add a class → element.classList.add('done')
Remove a class → element.classList.remove('done')
Check for a class → element.classList.contains('done')
Toggle a class → element.classList.toggle('done')


toggle() means:

If the class exists → remove it
If it doesn’t exist → add it

So:
li.classList.toggle('completed');

means
👉 “If the <li> already has the class completed, remove it. Otherwise, add it.”


What is Event Bubbling?

When you click on an element (say, a button inside a div), 
the event starts from the clicked element and then “bubbles up” through
its parent elements — one by one — all the way up to the <html> and <document>.

So the event travels from the inner element → to the outer ones

EXAMPLE OF EVENT BUBBLING ==>

<div id="parent">
  <button id="child">Click Me</button>
</div>


document.getElementById('child').addEventListener('click', () => {
  console.log('Child clicked!');
});

document.getElementById('parent').addEventListener('click', () => {
  console.log('Parent clicked!');
});

Output when you click the button:

Child clicked!
Parent clicked!


If you don’t want the event to bubble up:

e.stopPropagation();

*/
