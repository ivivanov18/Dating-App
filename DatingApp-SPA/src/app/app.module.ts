import { MemberDetailsComponent } from './members/member-details/member-details.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap';
import { RouterModule } from '@angular/router';
import { JwtModule } from '@auth0/angular-jwt';

import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { appRoutes } from './../routes';

import { AuthService } from './_services/auth.service';
import { ErrorInterceptorProvider } from './_services/error.interceptor';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { MessagesComponent } from './messages/messages.component';
import { ListsComponent } from './lists/lists.component';
import { MemberComponent } from './members/member/member.component';

const tokenGetter = () => localStorage.getItem('token');

@NgModule({
    declarations: [
        AppComponent,
        NavComponent,
        HomeComponent,
        RegisterComponent,
        MemberListComponent,
        MessagesComponent,
        ListsComponent,
        MemberComponent,
        MemberDetailsComponent,
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        FormsModule,
        BrowserAnimationsModule,
        BsDropdownModule.forRoot(),
        RouterModule.forRoot(appRoutes, { enableTracing: true }),
        JwtModule.forRoot({
            config: {
                tokenGetter,
                whitelistedDomains: ['localhost:5000'],
                blacklistedRoutes: ['localhost:5000/api/auth'],
            },
        }),
    ],
    providers: [ErrorInterceptorProvider, AuthService],
    bootstrap: [AppComponent],
})
export class AppModule {}
