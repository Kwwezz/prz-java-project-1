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
                                <textarea pTextarea placeholder="Your Message" [value]="rowData[col.field]" rows="2" cols="25"></textarea>
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


    data: any[] = [
        {
            name: 'Konfiguracja systemu',
            plannedEndDate: new Date(),
            description: 'Ogólna konfiguracja i ustawienia systemu.',
            status: 'New',
            children: [
                {
                    name: 'Instalacja środowiska',
                    plannedEndDate: new Date(),
                    description: 'Instalacja oraz konfiguracja niezbędnego oprogramowania.',
                    status: 'In Progress',
                    children: [
                        {
                            name: 'Negocjacja z klientem',
                            plannedEndDate: new Date(),
                            description: 'Omówienie warunków projektu z klientem.',
                            status: 'Cancelled'
                        },
                        {
                            name: 'Negocjacja z klientem',
                            plannedEndDate: new Date(),
                            description: 'Zamknięcie negocjacji i zatwierdzenie warunków.',
                            status: 'Completed'
                        }, 
                        {
                            name: 'Planowanie infrastruktury',
                            plannedEndDate: new Date(),
                            description: 'Przygotowanie planu infrastruktury technicznej.',
                            status: 'In Progress'
                        }
                    ]
                },
                {
                    name: 'Wdrażanie pracowników do systemu',
                    plannedEndDate: new Date(),
                    description: 'Szkolenie i wprowadzenie pracowników do nowego systemu.',
                    status: 'In Progress'
                },
                {
                    name: 'Spotkanie zarządu',
                    plannedEndDate: new Date(),
                    description: 'Omówienie postępów i kluczowych decyzji projektowych.',
                    status: 'New'
                }
            ]
        },
    ]

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

    ngOnInit() {
        
        //this.nodeService.getTreeTableNodes().then((files: any) => (this.treeTableValue = files));
        this.treeTableValue = this.convertTasksToUITreeForm(this.data);

    }
}
