import { Component, Input } from '@angular/core';
import { RippleModule } from 'primeng/ripple';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { Product, ProductService } from '../../service/product.service';
import { Task } from '../../tasks/tasks';
import { Customer } from '../../customers/customers';
import { TagModule } from 'primeng/tag';

@Component({
    standalone: true,
    selector: 'app-recent-sales-widget',
    imports: [CommonModule, TableModule, ButtonModule, RippleModule, TagModule],
    template: `
    <div class="card !mb-8">
        <div class="font-semibold text-xl mb-4">
            <div class="flex gap-2 items-center">
                <i class="pi pi-book"></i>
                <span>Recently updated Tasks</span>
            </div>
        </div>
        <p-table [value]="tasks" [rows]="6" responsiveLayout="scroll">
            <ng-template #header>
                <tr>
                    <th>
                        <div class="flex items-center gap-1">
                            <i class="pi pi-file"></i>
                            <span>Name</span>
                        </div>
                    </th>

                    <th>
                        <div class="flex items-center gap-1">
                            <i class="pi pi-user"></i>
                            <span>Client</span>
                        </div>
                    </th>
                    <th>
                        <div class="flex items-center gap-1">
                            <i class="pi pi-pencil"></i>
                            <span>Description</span>
                        </div>
                    </th>
                    <th style="width: 8rem">
                        <div class="flex items-center gap-1">
                            <i class="pi pi-paperclip"></i>
                            <span>Status</span>                         
                        </div>
                    </th>  
                    <th style="width: 15rem">
                        <div class="flex items-center gap-1">
                            <i class="pi pi-calendar-clock"></i>
                            <span>Planned Completion Date</span>
                        </div>
                    </th>
                </tr>
            </ng-template>
            <ng-template #body let-task>
                <tr>
                    <td>
                        <span>{{ task.name }}</span>
                    </td>
                    <td>
                        <div>
                            <span>{{ task.customerName }}</span>
                        </div>
                    </td>
                    <td>
                        <div>
                            <span>{{ task.description }}</span>
                        </div>
                    </td>
                    <td>
                        <div>
                            <p-tag *ngIf="task.status == 'New' " severity="info" value="New" />
                            <p-tag *ngIf="task.status == 'In Progress'" severity="warn" value="In Progress" />
                            <p-tag *ngIf="task.status == 'Completed'" severity="success" value="Completed" />
                        </div>
                    </td>
                    <td>
                        <div>
                            <span>{{ task.plannedEndDate }}</span>
                        </div>
                    </td>
                </tr>
            </ng-template>
        </p-table>
    </div>`,
    providers: [ProductService]
})
export class RecentSalesWidget {


    @Input({ required: true }) customers!: Customer[];
    @Input({ required: true }) tasks!: Task[];


    ngOnInit() {
        this.tasks.forEach(task => {
            task.customerName = this.customers.find(customer => customer.id == task.customerId)?.name || '?';
            const date = new Date(task.plannedEndDate!);
            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const year = date.getFullYear();
            const formattedDate = `${day}.${month}.${year}`;
            task.plannedEndDate = formattedDate;
        })

        this.tasks.sort((a, b) => {
            const dateA = new Date(a.updatedAt!);
            const dateB = new Date(b.updatedAt!);
          
            // Sortowanie malejąco
            //@ts-ignore
            return dateB - dateA;
          });
    }
}
