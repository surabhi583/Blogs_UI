import { Component, DestroyRef, inject, OnInit } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Router, RouterLink } from "@angular/router";
import { User } from "../../core/auth/user.model";
import { UserService } from "../../core/auth/services/user.service";
import { AsyncPipe, NgClass, NgForOf, NgIf } from "@angular/common";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { UserListConfig } from "src/app/core/auth/user.list.config";
import { LoadingState } from "../../core/models/loading-state.model";

@Component({
    selector: "app-users-page",
    templateUrl: "./users.list.component.html",
    imports: [
        RouterLink,
        NgClass,
        NgForOf,
        AsyncPipe,
        FormsModule,
        ReactiveFormsModule,
        NgIf
    ],
    standalone: true,
})
export default class UsersListComponent implements OnInit {
    query: UserListConfig = { filters: { } };
    results: User[] = [];
    currentPage = 1;
    totalPages: Array<number> = [];
    loading = LoadingState.NOT_LOADED;
    LoadingState = LoadingState;
    limit: number = 10;
    isDeleting = false;
    destroyRef = inject(DestroyRef);

    constructor(
        private readonly router: Router,
        private readonly userService: UserService,
    ) { }

    ngOnInit(): void {
        this.getUsers();
    }

    setPageTo(pageNumber: number) {
        this.currentPage = pageNumber;
        this.getUsers();
    }

    getUsers(): void {
        this.loading = LoadingState.LOADING;
        this.results = [];

        this.query.filters.limit = this.limit;
        this.query.filters.offset = this.limit * (this.currentPage - 1);

        this.userService
            .getUsers(this.query)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe((data) => {
                this.loading = LoadingState.LOADED;
                this.results = data.users;

                this.totalPages = Array.from(
                    new Array(Math.ceil(data.usersCount / this.limit)),
                    (val, index) => index + 1,
                );
            });
    }

    deleteUser(user: User): void {
        this.isDeleting = true;

        this.userService
            .delete(user.email)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe(() => {
                void this.router.navigate(["/users"]);
            });
    }
}
