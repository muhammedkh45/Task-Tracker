# Task-Tracker CLI

A simple and efficient command-line interface (CLI) for tracking and managing your tasks directly from your terminal.

## Features

- Add, update, and delete tasks.
- Change task status (`todo`, `in-progress`, `done`).
- List all tasks or filter them by status.
- Data is stored locally in a simple `appData.json` file.

## Installation

1.  **Prerequisites:** Make sure you have Node.js installed (which includes npm).

2.  **Clone the repository:**
    ```sh
    git clone https://github.com/muhammedkh45/Task-Tracker.git
    cd Task-Tracker
    ```

3.  **Install dependencies:**
    ```sh
    npm install
    ```

4.  **Link the CLI command:**
    This step makes the `task-cli` command available globally on your system.
    ```sh
    npm link
    ```

## Usage

All commands are run using the `task-cli` executable.

### Add a new task

```sh
task-cli add "My new task description"
# Output: Task added successfully (ID: 1)
```

### Update an existing task

Provide the task ID and the new text content.
```sh
task-cli update 1 "An updated task description"
# Output: Task updated successfully (ID: 1)
```

### Delete a task

Provide the task ID to delete.
```sh
task-cli delete 1
# Output: Task deleted successfully (ID: 1)
```

### Update task status

You can mark a task as `in-progress` or `done`.
```sh
# Mark as in-progress
task-cli mark-in-progress 2
# Output: Task marked successfully (ID: 2)

# Mark as done
task-cli mark-done 2
# Output: Task marked successfully (ID: 2)
```

### List tasks

You can list all tasks or filter by a specific status.
```sh
# List all tasks
task-cli list

# List all tasks that are 'done'
task-cli list done

# List all tasks that are 'in-progress'
task-cli list in-progress

# List all tasks that are 'todo'
task-cli list todo
```
