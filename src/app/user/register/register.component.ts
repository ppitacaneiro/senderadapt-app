import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent  implements OnInit {

  constructor(private formBuilder:FormBuilder) { }
  
  registerForm = this.formBuilder.group({
    name: ['', [Validators.required,Validators.minLength(8)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required,Validators.minLength(8)]],
    repeatPassword: ['', Validators.required,Validators.minLength(8)]
  })

  ngOnInit() {}

  onSubmit() {
    console.log(this.registerForm.valid);
    console.log('onSubmit',this.registerForm.value);
  }

}
