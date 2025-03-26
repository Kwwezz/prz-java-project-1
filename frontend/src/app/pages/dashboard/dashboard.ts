import { Component, inject } from '@angular/core';
import { StatsWidget } from './components/statswidget';
import { RecentSalesWidget } from './components/recentsaleswidget';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { Task } from '../tasks/tasks';
import { Customer } from '../customers/customers';
import { CommonModule } from '@angular/common';


@Component({
    selector: 'app-dashboard',
    imports: [StatsWidget, RecentSalesWidget, CommonModule],
    template: `
        <div *ngIf="customers?.length && tasks?.length" class="grid grid-cols-12 gap-8">
            <app-stats-widget [customers]="customers" [tasks]="tasks" class="contents" />
            <div class="col-span-12 xl:col-span-6">
                <app-recent-sales-widget [customers]="customers" [tasks]="tasks" />
            </div>
        </div>
    `
})
export class Dashboard {

    httpClient = inject(HttpClient);

    customers: Customer[] = []
    tasks: Task[] = [];

    async loadCustomers() {

        this.customers = await firstValueFrom(
            this.httpClient.get<Array<any>>('http://localhost:8080/customers')
        );

        for (const customer of this.customers) {
            const date = new Date(customer.createdAt);
            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const year = date.getFullYear();
            const hours = String(date.getHours()).padStart(2, '0');
            const minutes = String(date.getMinutes()).padStart(2, '0');
            const seconds = String(date.getSeconds()).padStart(2, '0');
            const formattedDate = `${day}.${month}.${year} ${hours}:${minutes}:${seconds}`;
            customer.createdAt = formattedDate;
        }
    }

    async loadTasks() {

        const result = await firstValueFrom(
            this.httpClient.get(`http://localhost:8080/tasks`)
        ) as Array<any>;

        this.tasks = result;
    }


    async ngOnInit() {
        await this.loadCustomers();
        await this.loadTasks();
    }
}
