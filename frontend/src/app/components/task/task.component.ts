import { Component, OnInit } from '@angular/core';
import { TaskListService } from '../../services/task_list/task-list.service';
import { TaskService } from '../../services/task/task.service';
import { LoginService } from '../../services/login/login.service';

interface TaskList {
  id: number;
  title: string;
  user_id: number;
  task: any[] 
}

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {
  public taskLists: TaskList[] = [];
  public newTaskListTitle: string = '';
  public newTaskTitle: string = '';
  
  

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
    const title = this.newTaskTitle.trim();
    if (title) {
      this.taskService.addTask({ title, list_id: taskList.id }).subscribe(
        () => {
          this.newTaskTitle = '';
          this.loadTaskLists();
        },
        error => {
          console.error('Error creating task:', error);
        }
      );
    }
  }
}
