import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { User } from 'src/app/interfaces/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent  implements OnInit {

  repeatPassword:string = '';
  user: User = {
    name: '',
    email: '',
    password: ''
  };

  constructor(
    private formBuilder:FormBuilder,
    private userService:UserService
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
  })

  get name() { return this.registerForm.get('name'); }
  get email() { return this.registerForm.get('email'); }
  get password() { return this.registerForm.get('password'); }

  ngOnInit() {}

  onSubmit() {
    // console.log(this.registerForm.valid);
    // console.log('onSubmit',this.registerForm.value);

    console.log('onSubmit',this.user);

    /*
    this.userService.register(this.user).subscribe({
      next: data => {
        console.log('data',data);
      },
      error: error => {
        console.log('error',error);
      }
    });
    */
  }

}
