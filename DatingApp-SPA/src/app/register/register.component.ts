import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../_services/auth.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
    @Input() valuesFromHome: any;
    @Output() cancelRegister = new EventEmitter();
    model: any = {};

    constructor(private authService: AuthService) {}

    ngOnInit() {}

    cancel() {
        this.cancelRegister.emit(false);
    }

    register() {
        console.log(this.model);
        this.authService.register(this.model).subscribe(
            () => {
                console.log('registration successful');
            },
            err => {
                console.log({ err });
            }
        );
    }
}
