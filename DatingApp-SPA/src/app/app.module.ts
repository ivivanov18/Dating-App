import {
    BrowserModule,
    HammerGestureConfig,
    HAMMER_GESTURE_CONFIG,
} from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
    BsDropdownModule,
    TabsModule,
    BsDatepickerModule,
} from 'ngx-bootstrap';
import { RouterModule } from '@angular/router';
import { JwtModule } from '@auth0/angular-jwt';
import { NgxGalleryModule } from 'ngx-gallery';
import { FileUploadModule } from 'ng2-file-upload';
import { TimeAgoPipe } from 'time-ago-pipe';

import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { appRoutes } from './../routes';

import { AuthService } from './_services/auth.service';
import { ErrorInterceptorProvider } from './_services/error.interceptor';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { MemberListResolver } from './_resolvers/member-list.resolver';
import { MemberDetailsResolver } from './_resolvers/member-details.resolver';
import { MemberDetailsComponent } from './members/member-details/member-details.component';
import { MessagesComponent } from './messages/messages.component';
import { ListsComponent } from './lists/lists.component';
import { MemberComponent } from './members/member/member.component';
import { MemberEditResolver } from './_resolvers/member-edit.resolver';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { AuthguardGuard } from './_guards/authguard.guard';
import { PreventUnsavedChanges } from './_guards/prevent-unsaved-changes.guard';
import { PhotoEditComponent } from './members/photo-edit/photo-edit.component';

const tokenGetter = () => localStorage.getItem('token');

export class CustomHammerConfig extends HammerGestureConfig {
    overrides = {
        pinch: { enable: false },
        rotate: { enable: false },
    };
}

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
        MemberEditComponent,
        PhotoEditComponent,
        TimeAgoPipe,
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        BsDropdownModule.forRoot(),
        TabsModule.forRoot(),
        BsDatepickerModule.forRoot(),
        RouterModule.forRoot(appRoutes, { enableTracing: false }),
        JwtModule.forRoot({
            config: {
                tokenGetter,
                whitelistedDomains: ['localhost:5000'],
                blacklistedRoutes: ['localhost:5000/api/auth'],
            },
        }),
        NgxGalleryModule,
        FileUploadModule,
    ],
    providers: [
        ErrorInterceptorProvider,
        AuthService,
        MemberDetailsResolver,
        MemberListResolver,
        { provide: HAMMER_GESTURE_CONFIG, useClass: CustomHammerConfig },
        MemberEditResolver,
        AuthguardGuard,
        PreventUnsavedChanges,
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
