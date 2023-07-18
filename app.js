// Function to play the checkbox sound
function playCheckboxSound() {
  const checkboxSound = document.getElementById('checkboxSound');
  checkboxSound.currentTime = 0; // Reset sound to the beginning
  checkboxSound.play();
}

function areAllItemsCompleted() {
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  for (const checkbox of checkboxes) {
    if (!checkbox.checked) {
      return false;
    }
  }
  return true;
}

// Function to create a new to-do item
function createTodo() {
  const inputElement = document.getElementById('newTodo');
  const todoText = inputElement.value.trim();

  if (todoText === '') {
    alert('Please enter a valid to-do item.');
    return;
  }

  inputElement.value = '';

  const listItem = document.createElement('li');
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';

  const todoTextElement = document.createElement('span');
  todoTextElement.textContent = todoText;

  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete';

  listItem.appendChild(checkbox);
  listItem.appendChild(todoTextElement);
  listItem.appendChild(deleteButton);

  document.getElementById('todoItems').appendChild(listItem);

  // Event listener for checkbox change event
  checkbox.addEventListener('change', function () {
    if (checkbox.checked) {
      playCheckboxSound();
      todoTextElement.classList.add('completed'); // Add the 'completed' class to the list item, not the checkbox
      document.getElementById('todoItems').appendChild(listItem);
    } else {
      todoTextElement.classList.remove('completed');
      document.getElementById('todoItems').prepend(listItem);
    }

    // Check if all checkboxes are checked
    if (areAllItemsCompleted()) {
      // Display congratulatory message
      const messageElement = document.createElement('p');
      messageElement.textContent = 'Congratulations, all the items are completed!';
      messageElement.classList.add('congratulation-message'); // Add the class for styling
      document.body.appendChild(messageElement);

      // Play the sound of claps
      const clapsSound = new Audio('claps_sound.mp3');
      clapsSound.play();

      // Remove the message after 3 seconds
      setTimeout(() => {
        messageElement.remove();
      }, 12000);
    }
  });



  // Event listener for delete button click event
  deleteButton.addEventListener('click', function () {
    todoTextElement.classList.add('deleted');
    setTimeout(() => {
      listItem.remove();
    }, 3000);
  });
}

// Event listener for the "Add" button
document.getElementById('addTodo').addEventListener('click', createTodo);

// Event listener for the "Enter" key on the input field
document.getElementById('newTodo').addEventListener('keypress', function (event) {
  if (event.key === 'Enter') {
    createTodo();
  }
});
