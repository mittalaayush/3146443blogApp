import {Component, OnInit} from '@angular/core';
import {BlogService,} from "./blog.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{

  user : object;
  blogs :any[];



  ngOnInit(): void {
    if(this.request.currentUser==null)
    {this.router.navigate(['/login'])
    }
    else {
      this.user= this.request.currentUser;
    }
  }

  constructor(private request:BlogService,private router:Router){

  }

  logout(){
    this.request.currentUser = null;
    this.router.navigate(['/login']);
  }

  link = {
    login:["/login"],
    home:["/home"],
    add:["/add"],
    favorite:["/favorite"],
    myBlogs : ["/myblogs"]
  }

}
