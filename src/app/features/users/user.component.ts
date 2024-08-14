import { Component, DestroyRef, inject, OnInit } from "@angular/core";
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { User } from "../../core/auth/user.model";
import { UserService } from "../../core/auth/services/user.service";
import { ListErrorsComponent } from "../../shared/components/list-errors.component";
import { Errors } from "../../core/models/errors.model";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { NgIf } from "@angular/common";
import { use } from "marked";

interface SettingsForm {
  image: FormControl<string>;
  username: FormControl<string>;
  bio: FormControl<string>;
  email: FormControl<string>;
  password: FormControl<string>;
  isAdmin: FormControl<boolean>;
}

@Component({
  selector: "app-settings-page",
  templateUrl: "./user.component.html",
  imports: [ListErrorsComponent, ReactiveFormsModule, NgIf],
  standalone: true,
})
export default class SettingsComponent implements OnInit {
  user!: User;
  settingsForm = new FormGroup<SettingsForm>({
    image: new FormControl("", { nonNullable: true }),
    username: new FormControl("", { nonNullable: true }),
    bio: new FormControl("", { nonNullable: true }),
    email: new FormControl("", { nonNullable: true }),
    password: new FormControl("", {
      validators: [Validators.required],
      nonNullable: true,
    }),
    isAdmin: new FormControl(false, { nonNullable: true }),
  });
  errors: Errors | null = null;
  isSubmitting = false;
  destroyRef = inject(DestroyRef);
  isAdmin: boolean = false;
  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly userService: UserService,
  ) { }

  ngOnInit(): void {
    this.userService.getCurrentUser().pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(({ user }) => {
        if (!this.route.snapshot.params["email"]) {
          this.settingsForm.patchValue(user)
        }
        this.isAdmin = user.isAdmin;
      });
    if (this.route.snapshot.params["email"]) {
      this.userService.getUserByEmail(this.route.snapshot.params["email"]).pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe((user) => {
          this.settingsForm.patchValue(user)
        });
    }
  }

  submitForm() {
    this.isSubmitting = true;

    this.userService
      .update(this.settingsForm.value)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: ({ user }) => {
          if (this.route.snapshot.params["email"]) {
            void this.router.navigate(["/users"])
          }
          else {
            void this.router.navigate(["/profile/", user.username])
          }
        },
        error: (err) => {
          this.errors = err;
          this.isSubmitting = false;
        },
      });
  }
}
