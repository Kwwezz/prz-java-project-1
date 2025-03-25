import { Component, inject, OnInit } from '@angular/core';
import { MessageService, TreeNode } from 'primeng/api';
import { TreeModule } from 'primeng/tree';
import { FormsModule } from '@angular/forms';
import { TreeTableModule } from 'primeng/treetable';
import { CommonModule } from '@angular/common';
import { NodeService } from '../service/node.service';
import { TagModule } from 'primeng/tag';
import { DatePicker } from 'primeng/datepicker';
import { Select } from 'primeng/select';
import { Button } from 'primeng/button';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { Toast, ToastModule } from 'primeng/toast';



interface Task {
    id: number | null;
    parentId: number | null;
    customerId: number | null;
    name: string;
    description: string;
    plannedEndDate: string | Date | null;
    status: 'New' | 'In Progress' | 'Completed' | 'Cancelled';
    changed?: boolean,
    createdAt: string | null;
    updatedAt: string | null;
}

interface NestedTask {
    id: number;
    parentId: number | null;
    name: string;
    plannedEndDate: Date;
    description: string;
    status: string;
    children: NestedTask[];
}

@Component({
    selector: 'app-tree-demo',
    standalone: true,
    imports: [CommonModule, FormsModule, TreeModule, TreeTableModule, TagModule, DatePicker, Select, Button, ToastModule],
    template: `
        <div class="card">
            <div *ngIf="selectedCustomer?.name"
                class="font-semibold flex justify-between p-2">
                <div class="flex gap-2 items-center pl-2">
                    <i class="pi pi-user"></i>
                    <span class="text-xl">{{selectedCustomer?.name + "'"}} Tasks</span>
                </div>
                <div class="flex gap-5">
                    <p-select [options]="customers" [(ngModel)]="selectedCustomer"
                            (onChange)="loadTasksForSelectedCustomer()"
                            optionLabel="name" placeholder="Select a customer" class="w-full md:w-56">
                        <ng-template #dropdownicon>
                            <i class="pi pi-user"></i>
                        </ng-template>
                    </p-select>
                    <p-button (click)="addTask(null)" label="Add Task" />
                </div>
            </div>
            <p-treetable [value]="treeTableValue"
                         dataKey="key" [scrollable]="false" [tableStyle]="{ 'min-width': '50rem', 'min-height': '8rem'}">
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
                                <i class="pi pi-book"></i>
                                <span>Description</span>                                
                            </div>
                        </th>
                        <th>
                            <div class="flex items-center gap-1">
                                <i class="pi pi-calendar-clock"></i>
                                <span>Planned Completion Date</span>                                
                            </div>
                        </th>               
                        <th>
                            <div class="flex items-center gap-1">
                                <i class="pi pi-paperclip"></i>
                                <span>Status</span>                         
                            </div>
                        </th>  

                    </tr>
                </ng-template>
                <ng-template #body let-rowNode let-rowData="rowData">
                    <tr [ttRow]="rowNode" (click)="selectedTask = rowData;">
                        <td>
                            <div style="width: 340px">
                                <p-treeTableToggler [rowNode]="rowNode"/>
                                <input (input)="rowData['changed'] = true" (blur)="updateSelectedTask()" [(ngModel)]="rowData['name']"
                                    class="p-1" pInputText type="text" placeholder="Default" />
                            </div>
                        </td>
                        <td>
                            <textarea (input)="rowData['changed'] = true" (blur)="updateSelectedTask()" [(ngModel)]="rowData['description']" 
                                class="p-1" pTextarea placeholder="Your Message" rows="2" cols="25">
                            </textarea>
                        </td>
                        <td>
                            <p-datepicker [(ngModel)]="rowData['plannedEndDate']" (onSelect)="this.selectedTask.changed = true; updateSelectedTask()"
                                [showIcon]="true" [showButtonBar]="true" dateFormat="dd.mm.yy">
                            </p-datepicker>
                        </td>
                        <td>
                            <div>
                                <p-select  [(ngModel)]="rowData['status']" (onChange)="this.selectedTask.changed = true; updateSelectedTask()"
                                    [options]="['New', 'In Progress', 'Completed', 'Cancelled']" 
                                    placeholder="Status..." />
                            </div>
                        </td>
                        <td>
                            <div class="flex gap-2">
                                <p-button (click)="addTask(rowData['id'])" icon="pi pi-chevron-down" rounded="true"/>
                                <p-button (click)="deleteTask(rowData['id'])" icon="pi pi-trash" rounded="true" severity="danger" />
                            </div>
                        </td>    
                    </tr>
                </ng-template>
            </p-treetable>
        </div>
        <p-toast/>
    `,
    providers: [NodeService, MessageService]
})
export class TreeDemo implements OnInit {

    nodeService = inject(NodeService);
    messageService = inject(MessageService);

    httpClient = inject(HttpClient);

    tasks: Task[] = [];
    selectedTask = { changed: false } as Task;

    nestedTasks: NestedTask[] = [];
    treeTableValue: TreeNode[] = [];


    customers: Array<any> = []
    selectedCustomer: any = {};

    successInfo() {
        this.messageService.add({ 
            severity: 'success', summary: 'Success',
             detail: 'Content saved', life: 3000
        });
    }

    transformToNested(json: Task[]): NestedTask[] {
        const map: { [key: number]: NestedTask } = {};
        const result: NestedTask[] = [];
    
        json.forEach(item => {
            const { id, parentId, name, plannedEndDate, description, status } = item;
            if(!id || !plannedEndDate) {
                throw new Error('Id is missing');
            }
            const node: NestedTask = {
                id, parentId,
                name,
                plannedEndDate: new Date(plannedEndDate),
                description,
                status,
                children: []
            };
    

            map[id] = node;
    
            if (parentId === null) {
                result.push(node);
            } else {
                if (map[parentId]) {
                    map[parentId].children.push(node);
                }
            }
        });
    
        return result;
    }

    convertTasksToUITreeForm(data: any[]) {
        return data.map(item => {
            const { children, ...data } = item;
            const result: any = { data, expanded: true };
    
            if (children && Array.isArray(children)) {
                result.children = this.convertTasksToUITreeForm(children);
            }
    
            return result;
        });
    }

    async loadTasksForSelectedCustomer() {

        const customerId = this.selectedCustomer.id;

        const result = await firstValueFrom(
            this.httpClient.get(`http://localhost:8080/tasks/${customerId}`)
        ) as Array<any>;

        this.nestedTasks = this.transformToNested(result);
        this.treeTableValue = this.convertTasksToUITreeForm(this.nestedTasks);
    }

    async updateSelectedTask() {
        if(!this.selectedTask?.changed){
            return;
        }

        const task: Task = {
            id: this.selectedTask.id,
            parentId: null,
            customerId: null,
            name: this.selectedTask.name,
            description: this.selectedTask.description,
            plannedEndDate: (this.selectedTask.plannedEndDate as Date).toISOString(),
            status: this.selectedTask.status,
            createdAt: null,
            updatedAt: null,
        };


        console.log(task);

        const response = await firstValueFrom(
            this.httpClient.post('http://localhost:8080/task', task)
        );

        this.selectedTask.changed = false;
        this.messageService.add({ severity: 'success', summary: 'Info', detail: 'Content saved', life: 3000 });
        //this.loadTasksForSelectedCustomer()
    }

    
    async addTask(parentId: number | null) {
        const task: Task = {
            id: null,
            parentId: parentId,
            customerId: this.selectedCustomer.id,
            name: 'Testowy task',
            description: 'Testowy opis testowego taska, testowanie systemu...',
            plannedEndDate: new Date().toISOString(),
            status: 'New',
            createdAt: null,
            updatedAt: null
        }

        const response = await firstValueFrom(
            this.httpClient.post('http://localhost:8080/task', task)
        );

        //console.log(response);
        this.loadTasksForSelectedCustomer()
    }

    async deleteTask(taskId: number) {
        const response = await firstValueFrom(
            this.httpClient.delete(`http://localhost:8080/task/${taskId}`)
        );
        this.successInfo();
        this.loadTasksForSelectedCustomer()
    }

    async ngOnInit() {
        
        this.customers = await firstValueFrom(
            this.httpClient.get<Array<any>>('http://localhost:8080/customers')
        );
        this.selectedCustomer = this.customers[0];

        this.loadTasksForSelectedCustomer()
        

    }
}
