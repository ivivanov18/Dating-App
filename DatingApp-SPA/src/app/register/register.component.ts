import { Router } from '@angular/router';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { BsDatepickerConfig } from 'ngx-bootstrap';
import { User } from '../_models/user';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
    @Input() valuesFromHome: any;
    @Output() cancelRegister = new EventEmitter();
    user: User;
    registerForm: FormGroup;
    bsDatePickerConfig: Partial<BsDatepickerConfig>;

    constructor(
        private authService: AuthService,
        private alertify: AlertifyService,
        private fb: FormBuilder,
        private router: Router
    ) {}

    ngOnInit() {
        this.createRegisterForm();
        this.bsDatePickerConfig = {
            containerClass: 'theme-red',
        };
    }

    createRegisterForm() {
        this.registerForm = this.fb.group(
            {
                gender: ['male'],
                username: ['', Validators.required],
                knownAs: ['', Validators.required],
                dateOfBirth: [null, Validators.required],
                city: ['', Validators.required],
                country: ['', Validators.required],
                password: [
                    '',
                    [
                        Validators.required,
                        Validators.minLength(4),
                        Validators.maxLength(8),
                    ],
                ],
                confirmPassword: ['', Validators.required],
            },
            { validator: this.passwordMatchValidator }
        );
    }

    passwordMatchValidator(g: FormGroup): null | object {
        return g.get('password').value === g.get('confirmPassword').value
            ? null
            : { mismatch: true };
    }

    cancel() {
        this.cancelRegister.emit(false);
    }

    register() {
        if (this.registerForm.valid) {
            this.user = Object.assign({}, this.registerForm.value);
            this.authService.register(this.user).subscribe(
                () => {
                    this.alertify.success('registration successful');
                },
                (err) => {
                    this.alertify.error(err);
                },
                () => {
                    this.authService.login(this.user).subscribe(
                        (next) => {
                            this.router.navigate(['/members']);
                        },
                        (err) => this.alertify.error(err)
                    );
                }
            );
        }
    }
}
