import { StorageService } from 'src/app/services/storage.service';
import { ToastService } from './../../services/toast.service';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from './../../services/user.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss'],
})
export class LoginPage {

  emailValue:string = '';
  passwordValue:string = '';

  constructor(
    private router:Router,
    private userService:UserService,
    private formBuilder:FormBuilder,
    private toastService:ToastService,
    private storageService:StorageService,
  ) {}

  loginForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(10)]]
  });

  get email() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }

  register() {
    this.router.navigate(['/user/register']);
  }

  onSubmit() {
    if (this.loginForm.invalid) return;

    this.userService.login(this.emailValue,this.passwordValue).subscribe({
      next: (response) => {
        if (response.success) {
          Promise.all([
            this.storageService.set('token',response.data.token),
            this.storageService.set('user',response.data.user)
          ]).then(() => {
            this.router.navigate(['/hickingtrail/search']);
          }).catch((err) => {
            console.log('error guardando token',err);
          });
        }
      },
      error: (err) => {
        console.log('error',err);
        this.toastService.presentToast(err);
      }
    });
  }

}
