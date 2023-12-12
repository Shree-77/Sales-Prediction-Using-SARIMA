import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


// Variables

username:string="";
password:string=""; 
username_reg:string="";
password_reg:string="";

logindiv=false;
signupdiv=true;
message_div=true;

message:string="";





  constructor(private router:Router,private http:HttpClient) { }

  ngOnInit(): void {
  }

  // Login function
  loginUser(){
   if(this.username!="" && this.password!=""){
      this.http.post('http://127.0.0.1:5000/signin',{'username':this.username,'password':this.password}).subscribe((response:any)=>{
        this.message=response.resp
        setTimeout(()=>{this.message_div=true},2000)
        this.message_div=false;
        if(this.message=="Login Successful"){
          this.message_div=false;
          this.router.navigateByUrl('/uploadfile')
        }
      })
    }
    else{
      this.message="Check whether fields are not empty"
      setTimeout(()=>{this.message_div=true},2000)
      this.message_div=false
    }
  }

  // SignUp function
  signupUser(){
    if(this.username_reg!="" && this.password_reg!=""){
    this.http.post('http://127.0.0.1:5000/register-user',{'username':this.username_reg,'password':this.password_reg}).subscribe((response:any)=>{
      this.message=response.resp;
      setTimeout(()=>{this.message_div=true},2000)
      this.message_div=false;
      if(this.message=="SignUp Successful"){
        this.message_div=false;
        this.logindiv=false;
        this.signupdiv=true;
      }
    })
    }
  else{
    this.message="Check whether fields are not empty"
        setTimeout(()=>{this.message_div=true},2000)
        this.message_div=false
    }
  }

  // Login and SignUp div transition
  loginDiv(){
    this.logindiv=true
    this.signupdiv=false
  }

  signUpDiv(){
    this.logindiv=false
    this.signupdiv=true
  }

 
  


}