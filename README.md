# 📝 Task Tracker CLI

Task Tracker is a simple **command-line interface (CLI)** project used to track and manage your tasks.  
It allows you to keep track of what you need to do, what you have done, and what you are currently working on.  

This project will help you practice programming skills such as:
- Working with the **filesystem**
- Handling **user inputs**
- Building a **CLI application**  

---

## 🚀 Features
The application supports the following actions:

- ➕ **Add, Update, and Delete tasks**
- 🔄 **Mark a task as in progress or done**
- 📋 **List all tasks**
- ✅ **List tasks by status** (done, todo, in-progress)

---

## 📌 Requirements
- Run from the command line
- Accept user actions and inputs as arguments
- Store tasks in a **JSON file**
- Create the JSON file automatically if it does not exist
- Use the **native filesystem module** of the programming language
- ❌ No external libraries or frameworks
- Handle errors and edge cases gracefully

---

## ⚙️ Constraints
- Any programming language may be used  
- Must use **positional arguments** for CLI input  
- Store tasks locally in a JSON file in the project directory  

---

## 📖 Example Usage

```bash
# Adding a new task
task-cli add "Buy groceries"
# Output: Task added successfully (ID: 1)

# Updating a task
task-cli update 1 "Buy groceries and cook dinner"

# Deleting a task
task-cli delete 1

# Marking tasks
task-cli mark-in-progress 1
task-cli mark-done 1

# Listing tasks
task-cli list

# Listing tasks by status
task-cli list done
task-cli list todo
task-cli list in-progress
