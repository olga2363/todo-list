
function onPageLoaded() {
  const input = document.querySelector("input[type='text']");
  const ul = document.querySelector("ul.todos");
  const saveButton = document.querySelector("button.save");
  const clearButton = document.querySelector("button.clear");
  const showInfoButton = document.querySelector("button.showInfo");
  const closeButton = document.querySelector("a.close");
  const modalwin = document.querySelector("#modalwin");

  function createTodo() {
      const li = document.createElement("li");
      const textSpan = document.createElement("span");
      textSpan.classList.add("todo-text");
      const newTodo = input.value;
      textSpan.append(newTodo);

      const deleteBtn = document.createElement("span");
      deleteBtn.classList.add("todo-trash");
      const icon = document.createElement("i");
      icon.classList.add("fas", "fa-trash-alt");
      deleteBtn.appendChild(icon);

      ul.appendChild(li).append(textSpan, deleteBtn);
      input.value = "";
      listenDeleteTodo(deleteBtn);
  }

  function listenDeleteTodo(element) {
    element.addEventListener("click", (event) => {
        element.parentElement.remove();
        event.stopPropagation();
    });
  }

  function loadTodos() {
    const data = localStorage.getItem("todos");
    if (data) {
        ul.innerHTML = data;
    }
    const deleteButtons = document.querySelectorAll("span.todo-trash");
    for (const button of deleteButtons) {
        listenDeleteTodo(button);
    }
  }

  function onClickTodo(event) {
    if (event.target.tagName === "LI") {
        event.target.classList.toggle("checked");
    }
  }

  input.addEventListener("keypress", (keyPressed) => {
      const keyEnter = 13;
      if (keyPressed.which == keyEnter) {
          createTodo();
      }
  });
  ul.addEventListener("click", onClickTodo);



  saveButton.addEventListener("click", () => {
    localStorage.setItem("todos", ul.innerHTML);
  });
  clearButton.addEventListener("click", () => {
      ul.innerHTML = "";
      localStorage.removeItem('todos', ul.innerHTML);
  });
  showInfoButton.addEventListener("click", () => {
    modalwin.style.height = "100%";
  });
  closeButton.addEventListener("click", () => {
    modalwin.style.height = "0";
  });

  loadTodos();
}

document.addEventListener("DOMContentLoaded", onPageLoaded);
