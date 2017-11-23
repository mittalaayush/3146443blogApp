import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {BlogService} from "../blog.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  users: { User_name, Password, favorites, id }[];

  ngOnInit(): void {
    if (this.request.currentUser == null) {
      this.getUsers();
    }
    else {
      this.router.navigate(['/home'])
    }

  }

  constructor(private request: BlogService, private router: Router) {
  }

  getUsers() {
    this.request.loadData()
      .subscribe((data) => {
        this.users = data;
      })
  }

  checkUser(name, pwd) {
    for (let user of this.users) {
      if (user.User_name == name && user.Password == pwd) {
        this.request.currentUser = user;
        this.router.navigate(['/home']);
        return;
      }
    }
    alert("Invalid Credentials");
  }

  CreateUser(name, pass) {

    for (let user of this.users) {
      if (user.User_name == name) {
        alert("User Name Already Registered");
        return;
      }
    }

    var user = {User_name: name, Password: pass, favorites: []};
    this.request.addUser(user)
      .subscribe(data =>  {
        alert("Signup Successfull");
        this.request.currentUser = data;
        this.router.navigate(['/home']);
      })
  }

}

