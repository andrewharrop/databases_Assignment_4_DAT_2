import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import {HttpClient} from '@angular/common/http';
import { ThrowStmt } from '@angular/compiler';

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
  loginStatus:String;
  lwind="Register";
  lWindStatus=true
  loggedIn:boolean=true;

authTracker:number=0;

//Home:0
//Delete a user:1
//Add a user:2
//Add feedback:3
//View weather in my location:4
//View All weather: 5

setHome(){
  this.authTracker=0;
}

setAddUser(){
  this.authTracker=2;
}
setAddFeedback(){
  this.authTracker=3;
}
setWeatherWhereIAm(){
  this.authTracker=4;
}


getData(data){
  return data.result;
}


deleteUsername:String;
deleteStatus:String;
submitDelete(){

}
setDelete(){
  this.authTracker=1;
}













allWeatherBool:Boolean=false;
allWeatherData:any;
setAllWeather(){
  this.authTracker=5;
  this.allUsersBool=false;
  this.http.get('http://localhost:3000/allweather').subscribe(data=>{
    this.allWeatherData=this.getData(data);
    this.allWeatherBool=true;
  })
}



allUsersBool:Boolean=false;
allUserData:any;
viewAllUsers(){
  this.allUsersBool=false;
  this.authTracker=6;
  this.http.get('http://localhost:3000/allusers').subscribe(data=>{
  this.allUserData=this.getData(data);
  //console.log(this.allUserData)
  this.allUsersBool=true;
  })
}


  getStatus(data:any){
    return data.status
  }

  ngOnInit(): void {
  }

deleteUser(){

}
searchWeather(){

}

viewWeatherWhereIAm(){

}



  submit(){
    this.http.post('http://localhost:3000/login', {username:this.username, password:this.password}).subscribe(data=>{
      
        this.loggedIn=this.getStatus(data)
        //alert(this.loggedIn)
    
  })
    

    //this.loggedIn=true;
  }

  logout(){
    this.loggedIn=false;
  }
  register(){
    this.http.post('http://localhost:3000/register', {username:this.username2, firstname:this.firstname , lastname:this.lastname, email:this.email, password:this.password2}).subscribe(data=>{
      console.log(data);
    })
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
