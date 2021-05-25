import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

function userNameValidator(control: FormControl): { [s: string]: boolean } {
  if ( !control.value.match(/^zime/) ) {
    return { invalidUser : true };
  }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  //对应登录的表单
  myForm!: FormGroup;
  
  //输入用户名的输入控件
  userName : FormControl;

  //输入密码的输入控件
  password : FormControl;

  name$!: Observable<string>;

  constructor(private fb: FormBuilder){
    this.myForm = this.fb.group(
      {
        'userName' : ['aaa', Validators.compose([Validators.required,userNameValidator,Validators.minLength(7)])],
        'password' : ['', Validators.compose([Validators.required, Validators.minLength(6)])]
      }
    );

    this.userName = <FormControl>this.myForm.controls['userName'];
    this.password = <FormControl>this.myForm.controls['password'];
    this.name$ = this.userName.valueChanges;
    this.userName.valueChanges.subscribe(val => {
      console.log(val);
      });
      
  }
  onSubmit(vlaue:any){
    console.log(vlaue)
  }
}