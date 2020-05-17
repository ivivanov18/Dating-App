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
    public users: User[];
    public pagination: Pagination;
    constructor(
        private route: ActivatedRoute,
        private userService: UserService
    ) {}

    ngOnInit() {
        this.route.data.subscribe((data) => {
            this.users = data.users.result;
            this.pagination = data.users.pagination;
        });
    }

    pageChanged(event: any): void {
        this.pagination.currentPage = event.page;
        this.loadUsers();
    }

    loadUsers() {
        this.userService
            .getUsers(this.pagination.currentPage, this.pagination.itemsPerPage)
            .subscribe((res: PaginatedResult<User[]>) => {
                this.users = res.result;
                this.pagination = res.pagination;
            });
    }
}
