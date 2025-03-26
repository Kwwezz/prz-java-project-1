import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Customer } from '../../customers/customers';
import { Task } from '../../tasks/tasks';

@Component({
    standalone: true,
    selector: 'app-stats-widget',
    imports: [CommonModule],
    template: `<div class="col-span-12 lg:col-span-6 xl:col-span-3">
            <div class="card mb-0">
                <div class="flex justify-between mb-4">
                    <div>
                        <span class="block text-muted-color font-medium mb-4">Customers</span>
                        <div class="text-surface-900 dark:text-surface-0 font-medium text-xl">{{ stats.customers }}</div>
                    </div>
                    <div class="flex items-center justify-center bg-blue-100 dark:bg-blue-400/10 rounded-border" style="width: 2.5rem; height: 2.5rem">
                        <i class="pi pi-user text-blue-500 !text-xl"></i>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-span-12 lg:col-span-6 xl:col-span-3">
            <div class="card mb-0">
                <div class="flex justify-between mb-4">
                    <div>
                        <span class="block text-muted-color font-medium mb-4">New Tasks</span>
                        <div class="text-surface-900 dark:text-surface-0 font-medium text-xl">{{ stats.newTasks }}</div>
                    </div>
                    <div class="flex items-center justify-center bg-orange-100 dark:bg-orange-400/10 rounded-border" style="width: 2.5rem; height: 2.5rem">
                        <i class="pi pi-clipboard text-orange-500 !text-xl"></i>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-span-12 lg:col-span-6 xl:col-span-3">
            <div class="card mb-0">
                <div class="flex justify-between mb-4">
                    <div>
                        <span class="block text-muted-color font-medium mb-4">Tasks in progress</span>
                        <div class="text-surface-900 dark:text-surface-0 font-medium text-xl">{{ stats.tasksInProgress }}</div>
                    </div>
                    <div class="flex items-center justify-center bg-cyan-100 dark:bg-cyan-400/10 rounded-border" style="width: 2.5rem; height: 2.5rem">
                        <i class="pi pi-spin pi-spinner text-cyan-500 !text-xl"></i>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-span-12 lg:col-span-6 xl:col-span-3">
            <div class="card mb-0">
                <div class="flex justify-between mb-4">
                    <div>
                        <span class="block text-muted-color font-medium mb-4">Completed Tasks</span>
                        <div class="text-surface-900 dark:text-surface-0 font-medium text-xl">{{ stats.completedTasks }}</div>
                    </div>
                    <div class="flex items-center justify-center bg-purple-100 dark:bg-purple-400/10 rounded-border" style="width: 2.5rem; height: 2.5rem">
                        <i class="pi pi-check text-purple-500 !text-xl"></i>
                    </div>
                </div>
            </div>
        </div>`
})
export class StatsWidget {

    @Input({ required: true }) customers!: Customer[];
    @Input({ required: true }) tasks!: Task[];

    stats = {
        customers: 0,
        newTasks: 0,
        tasksInProgress: 0,
        completedTasks: 0
    }

    ngOnInit() {
        this.stats.customers = this.customers.length;
        this.tasks.forEach(task => {
            switch (task.status) {
                case 'New': {
                    this.stats.newTasks += 1;
                    break;
                }
                case 'In Progress': {
                    this.stats.tasksInProgress += 1;
                    break;
                }
                case 'Completed': {
                    this.stats.completedTasks += 1;
                    break;
                }
                default: break;
            }
        })
    }
}
