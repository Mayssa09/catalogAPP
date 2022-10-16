import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AppUser } from '../model/user.model';
import { AuthentificationService } from '../services/authentification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // déclarer un objet formulaire (userFormGroup )de type FormGroup
  //toutes les infos saisies dans le formulaire vont être stocker dans cet objet pour cela on doit injecter le service FormBuilder

  userFormGroup! : FormGroup;
  errorMsg!: string;
  

  constructor(private fb : FormBuilder , private authService : AuthentificationService, private router : Router) { }

  ngOnInit(): void {
    this.userFormGroup=this.fb.group({
      userName : this.fb.control(null),
      password : this.fb.control(null),

    })
  }

  handleLogin(){
    let userName = this.userFormGroup.value.userName;
    let password = this.userFormGroup.value.password;
    this.authService.login(userName,password).subscribe((appUser:AppUser)=>{this.authService.authenticateUser(appUser).subscribe((value=>this.router.navigateByUrl("/admin")))},err => this.errorMsg=err)

  }




}
