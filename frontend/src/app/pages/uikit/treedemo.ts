import { Component, inject, OnInit } from '@angular/core';
import { TreeNode } from 'primeng/api';
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

interface Task {
    id: number;
    parentId: number | null;
    name: string;
    plannedEndDate: string;
    description: string;
    status: string;
}

interface NestedTask {
    name: string;
    plannedEndDate: Date;
    description: string;
    status: string;
    children: NestedTask[];
}

@Component({
    selector: 'app-tree-demo',
    standalone: true,
    imports: [CommonModule, FormsModule, TreeModule, TreeTableModule, TagModule, DatePicker, Select, Button],
    template: `

        <div class="card">
            <div class="font-semibold text-xl mb-4">Tasks</div>
            <p-treetable [value]="treeTableValue" [columns]="cols" 
                         dataKey="key" [scrollable]="false" [tableStyle]="{ 'min-width': '50rem', 'min-height': '8rem'}">
                <ng-template #header let-columns>
                    <tr>
                        <!-- <th *ngFor="let col of columns">
                            {{ col.header }}
                        </th> -->

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
                <ng-template #body let-rowNode let-rowData="rowData" let-columns="columns">
                    <tr [ttRow]="rowNode">
                        <td *ngFor="let col of columns; let i = index;">
                            <div *ngIf="i === 0" style="width: 340px">
                                <p-treeTableToggler [rowNode]="rowNode" *ngIf="i === 0" />
                                <input class="p-1" pInputText type="text" [value]="rowData[col.field]" placeholder="Default" />
                            </div>

                            <div *ngIf="i === 1" >
                                <textarea class="p-1" pTextarea placeholder="Your Message" [value]="rowData[col.field]" rows="2" cols="25"></textarea>
                            </div>

                            <div *ngIf="i === 2" >
                                <p-datepicker [showIcon]="true" [showButtonBar]="true" dateFormat="dd.mm.yy" [(ngModel)]="rowData[col.field]"></p-datepicker>
                            </div>

                            <div *ngIf="i === 3" >
                                <p-select  [(ngModel)]="rowData[col.field]" [options]="['New', 'In Progress', 'Completed', 'Cancelled']" 
                                placeholder="Status..." />  
                            </div>

                            <div *ngIf="i == 4" class="flex gap-2">
                                <p-button icon="pi pi-chevron-right" rounded="true"/>
                                <p-button icon="pi pi-chevron-down" rounded="true"/>
                                <p-button icon="pi pi-trash" rounded="true" severity="danger" />
                            </div>

                        </td>
                        
                    </tr>
                </ng-template>
            </p-treetable>
        </div>
      
    `,
    providers: [NodeService]
})
export class TreeDemo implements OnInit {


    data: any[] = [];


    
    transformToNested(json: Task[]): NestedTask[] {
        const map: { [key: number]: NestedTask } = {};
        const result: NestedTask[] = [];
    
        json.forEach(item => {
            const { id, parentId, name, plannedEndDate, description, status } = item;
            const node: NestedTask = {
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
            const result: any = { data };
    
            if (children && Array.isArray(children)) {
                result.children = this.convertTasksToUITreeForm(children);
            }
    
            return result;
        });
    }


    treeTableValue: TreeNode[] = [];



    cols: any[] = [
        { field: 'name', header: 'Name' },
        { field: 'description', header: 'Description' },
        { field: 'plannedEndDate', header: 'Planned End Date' },
        { field: 'status', header: 'Status' },
        { field: '', header: '' },
    ];
    nodeService = inject(NodeService);

    httpClient = inject(HttpClient);

    ngOnInit() {
        
        //this.nodeService.getTreeTableNodes().then((files: any) => (this.treeTableValue = files));
        //this.treeTableValue = this.convertTasksToUITreeForm(this.data);


        ((async () => {
            const result = await firstValueFrom(this.httpClient.get('http://localhost:8080/all')) as Array<any>;
            this.data = this.transformToNested(result);
            this.treeTableValue = this.convertTasksToUITreeForm(this.data);
        }))();
        

    }
}
