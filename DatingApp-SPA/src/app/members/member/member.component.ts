import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/_models/user';

@Component({
    selector: 'app-member',
    templateUrl: './member.component.html',
    styleUrls: ['./member.component.css'],
})
export class MemberComponent implements OnInit {
    @Input() member: User;
    constructor() {}

    ngOnInit() {}
}
