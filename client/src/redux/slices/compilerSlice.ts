import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface compilerSliceType {
  fullcode: {
    html: string;
    css: string;
    javascript: string;
  };
  currentLanguage: "html" | "css" | "javascript";
}
const initialState: compilerSliceType = {
  fullcode: {
    html: `<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <title>Task List App</title>
        <link rel="stylesheet" href="styles.css" />
    </head>
    <body>
        <div class="task-container">
            <h1>Task List</h1>
            <div class="input-container"><input type="text" id="taskInput" placeholder="Add a new task..." /><button id="addTaskBtn">Add Task</button></div>
            <ul id="taskList"></ul>
        </div>
        <script src="script.js"></script>
    </body>
</html>
`,
    css: `body {
    font-family: Arial, sans-serif;
    background-color: #f4f4f4;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    margin: 0;
}
.task-container {
    background-color: #fff;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 2px 10px rgb(0 0 0 / 0.1);
    width: 300px;
    text-align: center;
}
h1 {
    margin-bottom: 20px;
    color: #333;
}
.input-container {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
}
#taskInput {
    width: 70%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
}
#addTaskBtn {
    padding: 10px;
    background-color: #28a745;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}
#addTaskBtn:hover {
    background-color: #218838;
}
#taskList {
    list-style: none;
    padding: 0;
}
#taskList li {
    padding: 10px;
    border-bottom: 1px solid #ddd;
    display: flex;
    justify-content: space-between;
}
#taskList li:last-child {
    border-bottom: none;
}
.task-complete {
    text-decoration: line-through;
    color: gray;
}
.delete-btn {
    background-color: red;
    color: #fff;
    border: none;
    padding: 5px 10px;
    border-radius: 5px;
    cursor: pointer;
}
.delete-btn:hover {
    background-color: darkred;
}
`,
    javascript: `const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
addTaskBtn.addEventListener("click", addTask);
function addTask() {
    const taskText = taskInput.value;
    if (taskText === "") {
        alert("Please enter a task!");
        return;
    }
    const li = document.createElement("li");
    li.textContent = taskText;
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("delete-btn");
    deleteBtn.addEventListener("click", () => li.remove());
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
    taskInput.value = "";
}
`,
  },
  currentLanguage: "html",
};
const compilerSlice = createSlice({
  name: "compilerSlice",
  initialState,
  reducers: {
    updateLanguage: (
      state,
      action: PayloadAction<compilerSliceType["currentLanguage"]>
    ) => {
      state.currentLanguage = action.payload;
    },
    updateCode: (state, action: PayloadAction<string>) => {
      state.fullcode[state.currentLanguage] = action.payload;
    },
  },
});

export default compilerSlice.reducer;

export const { updateLanguage, updateCode } = compilerSlice.actions;
