#!/usr/bin/env python3
import argparse
import json
import os
from datetime import datetime
from typing import List, Dict, Optional

class TaskManager:
    def __init__(self, data_file: str = "tasks.json"):
        self.data_file = data_file
        self.tasks = self._load_tasks()
    
    def _load_tasks(self) -> List[Dict]:
        if os.path.exists(self.data_file):
            with open(self.data_file, 'r') as f:
                return json.load(f)
        return []
    
    def _save_tasks(self):
        with open(self.data_file, 'w') as f:
            json.dump(self.tasks, f, indent=2)
    
    def _get_next_id(self) -> int:
        if not self.tasks:
            return 1
        return max(task['id'] for task in self.tasks) + 1
    
    def add_task(self, description: str) -> Dict:
        task = {
            'id': self._get_next_id(),
            'description': description,
            'status': 'pending',
            'created_at': datetime.now().isoformat(),
            'completed_at': None
        }
        self.tasks.append(task)
        self._save_tasks()
        return task
    
    def list_tasks(self, status: Optional[str] = None) -> List[Dict]:
        if status:
            return [task for task in self.tasks if task['status'] == status]
        return self.tasks
    
    def complete_task(self, task_id: int) -> Optional[Dict]:
        for task in self.tasks:
            if task['id'] == task_id:
                task['status'] = 'completed'
                task['completed_at'] = datetime.now().isoformat()
                self._save_tasks()
                return task
        return None
    
    def delete_task(self, task_id: int) -> bool:
        for i, task in enumerate(self.tasks):
            if task['id'] == task_id:
                self.tasks.pop(i)
                self._save_tasks()
                return True
        return False

def format_task(task: Dict) -> str:
    status_symbol = "✓" if task['status'] == 'completed' else "○"
    created = datetime.fromisoformat(task['created_at']).strftime("%Y-%m-%d %H:%M")
    return f"{status_symbol} [{task['id']}] {task['description']} (Created: {created})"

def main():
    parser = argparse.ArgumentParser(description='Simple Task Manager CLI')
    subparsers = parser.add_subparsers(dest='command', help='Available commands')
    
    # Add command
    add_parser = subparsers.add_parser('add', help='Add a new task')
    add_parser.add_argument('description', help='Task description')
    
    # List command
    list_parser = subparsers.add_parser('list', help='List tasks')
    list_parser.add_argument('--status', choices=['pending', 'completed'], 
                           help='Filter by status')
    
    # Complete command
    complete_parser = subparsers.add_parser('complete', help='Mark task as completed')
    complete_parser.add_argument('task_id', type=int, help='Task ID')
    
    # Delete command
    delete_parser = subparsers.add_parser('delete', help='Delete a task')
    delete_parser.add_argument('task_id', type=int, help='Task ID')
    
    args = parser.parse_args()
    
    if not args.command:
        parser.print_help()
        return
    
    manager = TaskManager()
    
    if args.command == 'add':
        task = manager.add_task(args.description)
        print(f"Task added: {format_task(task)}")
    
    elif args.command == 'list':
        tasks = manager.list_tasks(args.status)
        if not tasks:
            print("No tasks found.")
        else:
            print(f"\n{'Pending' if args.status == 'pending' else 'Completed' if args.status == 'completed' else 'All'} Tasks:")
            print("-" * 50)
            for task in tasks:
                print(format_task(task))
    
    elif args.command == 'complete':
        task = manager.complete_task(args.task_id)
        if task:
            print(f"Task completed: {format_task(task)}")
        else:
            print(f"Task with ID {args.task_id} not found.")
    
    elif args.command == 'delete':
        if manager.delete_task(args.task_id):
            print(f"Task {args.task_id} deleted successfully.")
        else:
            print(f"Task with ID {args.task_id} not found.")

if __name__ == '__main__':
    main()