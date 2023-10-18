import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { User } from 'src/app/interfaces/user';
import { StorageService } from 'src/app/services/storage.service';
import { formErrorsMessages } from 'src/app/shared/constants/errors';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent  implements OnInit {

  public formErrorsMessages = formErrorsMessages;

  isToastOpen:boolean = false;
  repeatPassword:string = '';
  user: User = {
    name: '',
    email: '',
    password: ''
  };

  constructor(
    private formBuilder:FormBuilder,
    private userService:UserService,
    private storageService:StorageService,
  ) { }
  
  registerForm = this.formBuilder.group({
    name: ['', [
      Validators.required,
      Validators.minLength(8)]
    ],
    email: ['', [
      Validators.required, 
      Validators.email]
    ],
    password: ['', [
      Validators.required,
      Validators.minLength(10)]
    ],
    repeatPassword: ['', [
      Validators.required,
      Validators.minLength(10)]
    ]
  });

  get name() { return this.registerForm.get('name'); }
  get email() { return this.registerForm.get('email'); }
  get password() { return this.registerForm.get('password'); }
  get repeatPasswordForm() { return this.registerForm.get('repeatPassword'); }

  ngOnInit() {}

  setOpen(isOpen: boolean) {
    this.isToastOpen = isOpen;
  }

  onSubmit() {
    
    if (this.password?.value !== this.repeatPasswordForm?.value) {
      this.isToastOpen = true;
      return;
    }

    if (this.registerForm.valid) {
      this.user.email = this.email!.value as string;
      this.user.name = this.name!.value as string;
      this.user.password = this.password!.value as string
      this.userService.register(this.user).subscribe({
        next: (res) => {
          console.log(res);
          this.storageService.set('token', res.data.token)
            .then(() => { console.log('guardado token'); })
            .catch((err) => { console.log(err) });
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }

}
