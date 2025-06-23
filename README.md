# Task Manager CLI

A simple command-line task management application written in Python.

## Features

- Add new tasks
- List all tasks
- Mark tasks as complete
- Delete tasks
- Filter tasks by status
- Save tasks persistently

## Installation

```bash
pip install -r requirements.txt
```

## Usage

```bash
python src/task_manager.py --help
```

### Commands

- `add "Task description"` - Add a new task
- `list` - List all tasks
- `list --status pending` - List pending tasks
- `list --status completed` - List completed tasks
- `complete <task_id>` - Mark task as completed
- `delete <task_id>` - Delete a task

## Example

```bash
# Add tasks
python src/task_manager.py add "Buy groceries"
python src/task_manager.py add "Complete project report"

# List all tasks
python src/task_manager.py list

# Complete a task
python src/task_manager.py complete 1

# Delete a task
python src/task_manager.py delete 2
```