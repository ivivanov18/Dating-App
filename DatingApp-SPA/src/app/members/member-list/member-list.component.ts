import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { User } from '../../_models/user';
import { Pagination, PaginatedResult } from 'src/app/_models/pagination';
import { UserService } from 'src/app/_services/user.service';

@Component({
    selector: 'app-member-list',
    templateUrl: './member-list.component.html',
    styleUrls: ['./member-list.component.css'],
})
export class MemberListComponent implements OnInit {
    users: User[];
    pagination: Pagination;
    minAge = 18;
    maxAge = 99;
    user: User = JSON.parse(localStorage.getItem('user'));
    genderList = [
        { value: 'male', display: 'Males' },
        { value: 'female', display: 'Females' },
    ];
    userParams: any = {};

    constructor(
        private route: ActivatedRoute,
        private userService: UserService
    ) {}

    ngOnInit() {
        this.route.data.subscribe((data) => {
            this.users = data.users.result;
            this.pagination = data.users.pagination;
        });
        this.userParams.gender =
            this.user.gender === 'male' ? 'female' : 'male';
        this.userParams.minAge = 18;
        this.userParams.maxAge = 99;
        this.userParams.orderBy = 'lastActive';
    }

    resetFilters() {
        this.userParams.gender =
            this.user.gender === 'male' ? 'female' : 'male';
        this.userParams.minAge = 18;
        this.userParams.maxAge = 99;
        this.loadUsers();
    }

    pageChanged(event: any): void {
        this.pagination.currentPage = event.page;
        this.loadUsers();
    }

    loadUsers() {
        this.userService
            .getUsers(
                this.pagination.currentPage,
                this.pagination.itemsPerPage,
                this.userParams
            )
            .subscribe((res: PaginatedResult<User[]>) => {
                this.users = res.result;
                this.pagination = res.pagination;
            });
    }
}
