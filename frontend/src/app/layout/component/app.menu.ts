import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AppMenuitem } from './app.menuitem';

@Component({
    selector: 'app-menu',
    standalone: true,
    imports: [CommonModule, AppMenuitem, RouterModule],
    template: `
    <ul class="layout-menu" style="display: flex; flex-direction: column; justify-content: space-between; height: 100%">
        <ng-container *ngFor="let item of model; let i = index">
            <li app-menuitem *ngIf="!item.separator" [item]="item" [index]="i" [root]="true"></li>
            <li *ngIf="item.separator" class="menu-separator"></li>
        </ng-container>
    </ul> `
})
export class AppMenu {
    model: MenuItem[] = [];

    ngOnInit() {
        this.model = [
            {
                label: 'Home',
                items: [
                    { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/'] },
                    { label: 'Customers', icon: 'pi pi-fw pi-user', routerLink: ['/customers'] },
                    { label: 'Tasks', icon: 'pi pi-fw pi-book', routerLink: ['/tasks'] },
                ]
            },
            {
                label: 'Get Started',
                items: [
                    // {
                    //     label: 'Documentation',
                    //     icon: 'pi pi-fw pi-book',
                    //     routerLink: ['/documentation']
                    // },
                    {
                        label: 'prz-java-project-1',
                        icon: 'pi pi-fw pi-github',
                        url: 'https://github.com/Kwwezz/prz-java-project-1',
                        target: '_blank'
                    }
                ]
            }
        ];
    }
}
