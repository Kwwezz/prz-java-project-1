import { Component, inject, signal } from '@angular/core';
import { TimelineModule } from 'primeng/timeline';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { Dialog } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-timeline-demo',
    standalone: true,
    imports: [TableModule, ButtonModule, Dialog, InputTextModule, FormsModule],
    template: `
    <div class="card">
        <p-table [value]="customers" [tableStyle]="{ 'min-width': '50rem' }">
        <ng-template #caption>
            <div class="flex items-center justify-between">
                <span class="text-xl font-bold">Customers</span>
                <p-button (click)="newOrSelectedCustomer = { name: '', email: '' }; customerDialogVisible = true"
                    icon="pi pi-plus" rounded raised/>
            </div>
        </ng-template>
        <ng-template #header>
            <tr>
                <th>
                    <div class="flex items-center gap-1 ">
                        <i class="pi pi-user"></i>
                        <span>Name</span>
                    </div>
                </th>
                <th>
                    <div class="flex items-center gap-1">
                        <i class="pi pi-envelope"></i>
                        <span>Email</span>
                    </div>
                </th>
                <th>
                    <div class="flex items-center gap-1">
                        <i class="pi pi-calendar"></i>
                        <span>Created at</span>
                    </div>
                </th>
            </tr>
        </ng-template>
        <ng-template #body let-customer>
            <tr>
                <td>{{ customer.name }}</td>
                <td>{{ customer.email }}</td>
                <td>{{ customer.createdAt }}</td>
                <td>
                    <div class="flex gap-2 p-1">
                        <p-button (click)="deleteCustomer(customer.id)"
                            icon="pi pi-trash" rounded severity="danger"/>
                        <p-button (click)="newOrSelectedCustomer = customer; customerDialogVisible = true"
                            icon="pi pi-pencil" rounded severity="warn"/>
                    </div>
                </td>
            </tr>
        </ng-template>
        </p-table>
    </div>
    <p-dialog 
        header="Edit Customer" [modal]="true" [style]="{ width: '25rem' }"
        [(visible)]="customerDialogVisible" >
        <div class="flex items-center gap-2 mb-4">
            <i class="pi pi-user"></i>
            <label for="name" class="font-semibold w-24">Name</label>
            <input [(ngModel)]="newOrSelectedCustomer.name"
                pInputText id="name" class="flex-auto" autocomplete="off" />
        </div>
        <div class="flex items-center gap-2 mb-8">
            <i class="pi pi-envelope"></i>
            <label for="email" class="font-semibold w-24">Email</label>
            <input [(ngModel)]="newOrSelectedCustomer.email"
                pInputText id="email" class="flex-auto" autocomplete="off" />
        </div>
        <div class="flex justify-end gap-2">
            <p-button label="Cancel" severity="secondary" (click)="customerDialogVisible = false" />
            <p-button label="Save" (click)="saveCustomer(); customerDialogVisible = false" />
        </div>
    </p-dialog>
    `
})
export class TimelineDemo {

    httpClient = inject(HttpClient);

    customerDialogVisible = false;

    customers: Array<any> = []

    newOrSelectedCustomer = { name: '', email: '' };

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

    async saveCustomer() {
        const result = await firstValueFrom(
            this.httpClient.post('http://localhost:8080/customer', this.newOrSelectedCustomer)
        );
        this.loadCustomers();
    }

    async deleteCustomer(id: number) {
        const result = await firstValueFrom(
            this.httpClient.delete(`http://localhost:8080/customer/${id}`)
        );
        this.loadCustomers();
    }

    
    async ngOnInit() {
        this.loadCustomers();
    }
}
