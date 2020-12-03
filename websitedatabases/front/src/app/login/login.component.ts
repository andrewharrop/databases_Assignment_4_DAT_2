import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  constructor(private http:HttpClient) { }
  username:String="";
  password:String="";
  username2:String="";
  password2:String="";
  firstname:String="";
  lastname:String="";
  email:String="";

  lwind="Register";
  lWindStatus=true
  loggedIn:boolean=false;
  getStatus(data:any){
    return data.sttatus
  }

  ngOnInit(): void {
  }
  submit(){
    this.http.post('http://localhost:3000/login', {username:this.username, password:this.password}).subscribe(data=>{
      this.loggedIn=this.getStatus(data)
      alert(data)
    })
    //this.loggedIn=true;
  }
  register(){
    //reg logic
  }
  lSwitch(){
    this.lWindStatus = !this.lWindStatus
    if(this.lwind=="Register"){
    this.lwind="Login"}
    else{
      this.lwind="Register"
    }
  }
}
