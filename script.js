const taskInput = document.getElementById("taskInput");
const taskDate = document.getElementById("taskDate");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const filterSelect = document.getElementById("filter");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let editIndex = null;

// Tampilkan daftar tugas
function renderTasks() {
    taskList.innerHTML = "";
    let filter = filterSelect.value;

    tasks.forEach((task, index) => {
        if (filter === "completed" && !task.completed) return;
        if (filter === "pending" && task.completed) return;

        const li = document.createElement("li");
        li.className = task.completed ? "completed" : "";
        li.innerHTML = `
            <div onclick="toggleTask(${index})">
                <strong>${task.name}</strong> <br>
                <small>Deadline: ${task.date}</small>
            </div>
            <div class="actions">
                <button class="edit-btn" onclick="editTask(${index})">Edit</button>
                <button class="delete-btn" onclick="deleteTask(${index})">Hapus</button>
            </div>
        `;
        taskList.appendChild(li);
    });
}

// Tambah / Update Tugas
addTaskBtn.addEventListener("click", () => {
    const name = taskInput.value.trim();
    const date = taskDate.value;

    if (name === "" || date === "") {
        alert("Nama tugas dan tanggal harus diisi!");
        return;
    }

    if (editIndex === null) {
        tasks.push({ name, date, completed: false });
    } else {
        tasks[editIndex] = { ...tasks[editIndex], name, date };
        editIndex = null;
        addTaskBtn.textContent = "Tambah";
    }

    localStorage.setItem("tasks", JSON.stringify(tasks));
    taskInput.value = "";
    taskDate.value = "";
    renderTasks();
});

// Edit Tugas
function editTask(index) {
    taskInput.value = tasks[index].name;
    taskDate.value = tasks[index].date;
    editIndex = index;
    addTaskBtn.textContent = "Update";
}

// Toggle status selesai
function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTasks();
}

// Hapus tugas
function deleteTask(index) {
    if (confirm("Yakin ingin menghapus tugas ini?")) {
        tasks.splice(index, 1);
        localStorage.setItem("tasks", JSON.stringify(tasks));
        renderTasks();
    }
}

// Filter tugas
filterSelect.addEventListener("change", renderTasks);

// Jalankan pertama kali
renderTasks();
