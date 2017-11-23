import { Component, OnInit } from '@angular/core';
import {BlogService} from "../blog.service";
import {Router} from "@angular/router";
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-add-new',
  templateUrl: './add-new.component.html',
  styleUrls: ['./add-new.component.css']
})
export class AddNewComponent implements OnInit {

  current_user:{User_name:null,Password:null,favorites:[null],id:null};

  ngOnInit(): void {
    if(this.request.currentUser==null)
    {this.router.navigate(['/login'])
    }
    else {
      this.current_user= this.request.currentUser;
    }

  }

  constructor(private request:BlogService,private router:Router){

  }

  addBlog() {
    // this.blogs = [{Author:null,Title:null,Date:null,Category:null,Body:null,id:null}];

    var author = this.current_user.User_name
    var title = (<HTMLInputElement>document.getElementById("title"));
    // console.log(new Date());
    const dateVar = (new Date ).toString();
    console.log(dateVar);
    // var Date = date.getDate()+"/"+date.getMonth()+"/"+date.getFullYear();
    // console.log(Date);
    var category = (<HTMLInputElement>document.getElementById("Category"))
    var Body = (<HTMLInputElement>document.getElementById("blogbody"))

    var blog = {Author: author, Title: title.value, Date: dateVar, Category: category.value, Body: Body.value};

    if(title.value.trim()==""){
      alert("Title Cannot Be Empty")
    }
    else if(Body.value.trim()==""){
      alert("Blog content Cannot Be Empty")
    }
    else
    {
      this.request.postBlog(blog)
      .subscribe(data => {
        alert("Blog Added");
        title.value = "";
        category.value = "";
        Body.value = "";
        this.router.navigate(['/home'])
      })
  }

  }

}
