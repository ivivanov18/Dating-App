import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
    @Input() valuesFromHome: any;
    @Output() cancelRegister = new EventEmitter();
    // model: any = {};
    registerForm: FormGroup;

    constructor(
        private authService: AuthService,
        private alertify: AlertifyService
    ) {}

    ngOnInit() {
        this.registerForm = new FormGroup({
            username: new FormControl(''),
            password: new FormControl(''),
            confirmPassword: new FormControl(''),
        });
    }

    cancel() {
        this.cancelRegister.emit(false);
    }

    register() {
        // this.authService.register(this.model).subscribe(
        //     () => {
        //         this.alertify.success('registration successful');
        //     },
        //     (err) => {
        //         this.alertify.error(err);
        //     }
        // );
        console.log(this.registerForm.value);
    }
}
