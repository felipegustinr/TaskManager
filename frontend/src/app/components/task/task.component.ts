import { Component, OnInit } from '@angular/core';
import { TaskListService } from '../../services/task_list/task-list.service';
import { TaskService } from '../../services/task/task.service';
import { LoginService } from '../../services/login/login.service';

interface TaskList {
  id: number;
  title: string;
  user_id: number;
  tasks: any[];
}

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {
  public taskLists: TaskList[] = [];
  public newTaskListTitle: string = '';
  public newTaskTitles: { [key: number]: string } = {}; 
  
  constructor(
    private taskListService: TaskListService,
    private taskService: TaskService,
    private loginService: LoginService
  ) { }

  ngOnInit(): void {
    this.loadTaskLists();
  }

  loadTaskLists() {
    const userId = this.loginService.getUserId();
    this.taskListService.getAllTaskLists().subscribe(
      (data: TaskList[]) => {
        this.taskLists = data.filter((taskList: any) => taskList.user_id === userId!);
        this.taskLists.forEach(taskList => {
          this.taskService.getFullTaskList().subscribe(
            (tasks: any[]) => {
              taskList.tasks = tasks;
            },
            error => {
              console.error('Error loading tasks for task list', error);
            }
          );
        });
      },
      error => {
        console.error('Error loading task lists:', error);
      }
    );
  }

  createTaskList() {
    const title = this.newTaskListTitle.trim();
    if (title) {
      const userId = this.loginService.getUserId();
      this.taskListService.addTaskList({ title, user_id: userId }).subscribe(
        () => {
          this.newTaskListTitle = '';
          this.loadTaskLists();
        },
        error => {
          console.error('Error creating task list:', error);
        }
      );
    }
  }

  createTask(taskList: TaskList) {
    const title = this.newTaskTitles[taskList.id]?.trim();
    if (title) {
      const task = { title, description: '', completed: false, list_id: taskList.id }; 
      this.taskService.addTask(task).subscribe(
        () => {
          this.newTaskTitles[taskList.id] = '';
          this.loadTaskLists();
        },
        error => {
          console.error('Error creating task:', error);
        }
      );
    }
  }

  completeTaskList(taskListId: number) {
    this.taskListService.deleteTaskList(taskListId).subscribe(
      () => {
        this.loadTaskLists();
      },
      error => {
        console.error('Error deleting task list:', error);
      }
    );
  }
}
