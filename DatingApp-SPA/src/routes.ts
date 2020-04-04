import { AuthguardGuard } from './app/authguard.guard';
import { Routes } from '@angular/router';
import { MessagesComponent } from './app/messages/messages.component';
import { ListsComponent } from './app/lists/lists.component';
import { MemberListComponent } from './app/member-list/member-list.component';
import { HomeComponent } from './app/home/home.component';

export const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    {
        path: '',
        canActivate: [AuthguardGuard],
        runGuardsAndResolvers: 'always',
        children: [
            {
                path: 'members',
                component: MemberListComponent,
            },
            { path: 'lists', component: ListsComponent },
            { path: 'messages', component: MessagesComponent },
        ],
    },
    { path: '**', redirectTo: '', pathMatch: 'full' },
];
