/**
 * Task Manager Project Simulation
 * Author: Nitish Kumar
 * Description: A simple console-based Task Manager that demonstrates
 * CRUD operations, filtering, and localStorage-like persistence.
 */

// -------------------------------
// Utility Functions
// -------------------------------
const utils = {
  generateId: () => Math.random().toString(36).substring(2, 10),
  getDate: () => new Date().toLocaleString(),
  logDivider: (title = "") => {
    console.log("\n===============================");
    if (title) console.log(title);
    console.log("===============================\n");
  },
};

// -------------------------------
// Task Class
// -------------------------------
class Task {
  constructor(title, description, priority = "Medium") {
    this.id = utils.generateId();
    this.title = title;
    this.description = description;
    this.priority = priority;
    this.createdAt = utils.getDate();
    this.completed = false;
  }

  toggleComplete() {
    this.completed = !this.completed;
  }

  toString() {
    return `${this.title} [${this.priority}] - ${
      this.completed ? "✅ Done" : "❌ Pending"
    }`;
  }
}

// -------------------------------
// TaskManager Class
// -------------------------------
class TaskManager {
  constructor() {
    this.tasks = [];
    this.loadFromStorage();
  }

  addTask(title, description, priority) {
    const task = new Task(title, description, priority);
    this.tasks.push(task);
    this.saveToStorage();
    return task;
  }

  removeTask(id) {
    this.tasks = this.tasks.filter((task) => task.id !== id);
    this.saveToStorage();
  }

  toggleTaskCompletion(id) {
    const task = this.tasks.find((task) => task.id === id);
    if (task) {
      task.toggleComplete();
      this.saveToStorage();
    }
  }

  listTasks(filter = "all") {
    let filteredTasks;
    switch (filter) {
      case "completed":
        filteredTasks = this.tasks.filter((t) => t.completed);
        break;
      case "pending":
        filteredTasks = this.tasks.filter((t) => !t.completed);
        break;
      default:
        filteredTasks = this.tasks;
    }

    utils.logDivider(`Showing ${filter.toUpperCase()} Tasks`);
    filteredTasks.forEach((task) => console.log(task.toString()));
  }

  saveToStorage() {
    // Simulating localStorage
    const data = JSON.stringify(this.tasks);
    FakeLocalStorage.setItem("tasks", data);
  }

  loadFromStorage() {
    const data = FakeLocalStorage.getItem("tasks");
    if (data) {
      this.tasks = JSON.parse(data).map((t) => Object.assign(new Task(), t));
    }
  }
}

// -------------------------------
// Fake Local Storage (Simulated)
// -------------------------------
const FakeLocalStorage = {
  store: {},
  setItem(key, value) {
    this.store[key] = value;
  },
  getItem(key) {
    return this.store[key];
  },
  clear() {
    this.store = {};
  },
};

// -------------------------------
// Demo Simulation
// -------------------------------
utils.logDivider("Task Manager Demo");
const manager = new TaskManager();

manager.addTask("Build Portfolio", "Finish my developer portfolio", "High");
manager.addTask("Prepare Resume", "Update resume for internship", "Medium");
manager.addTask("Study DSA", "Solve 5 LeetCode problems", "High");

manager.listTasks("all");

const firstTask = manager.tasks[0];
manager.toggleTaskCompletion(firstTask.id);

manager.listTasks("completed");
manager.listTasks("pending");

// Simulate Delete
manager.removeTask(manager.tasks[1].id);
manager.listTasks("all");

utils.logDivider("Simulation Ended");
console.log("✅ Task Manager finished execution.");
