import { Component, OnInit } from '@angular/core';
import {BlogService} from "../blog.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {

  current_user:{User_name:null,Password:null,favorites:[null],id:null};
  blogs : {Author,Title,Date,Category,Body,id}[];
  showcontent : boolean = false;
  categoryFilter : string = "All";
  title :string = "";

  searchTitle(){
    var titleElement = <HTMLInputElement>document.getElementById("title_search");
    this.title =  titleElement.value;
  }

  toggleContent(){
    var label = (<HTMLInputElement>document.getElementById("showContent"));
    if(this.showcontent){
      this.showcontent = false;
      label.innerHTML = "Show_Content";
    }
    else {
      this.showcontent = true;
      label.innerHTML = "Hide_Content";
    }
  }

  setCategory(){
    this.categoryFilter = (<HTMLInputElement>document.getElementById("Category")).value;
  }

  ngOnInit(): void {
    if(this.request.currentUser==null)
    {this.router.navigate(['/login'])
    }
    else {
      this.current_user= this.request.currentUser;
      this.blogs = [{Author:null,Title:null,Date:null,Category:null,Body:null,id:null}];
      this.getBlogs();
    }

  }

  constructor(private request:BlogService,private router:Router){
  }

  getBlogs(){
    this.blogs = [];
    this.request.loadBlogs()
      .subscribe((data)=>{
      let i =0;
      for(let item of data) {
        console.log(item)
        if(this.current_user.favorites.indexOf(item.id)>-1){
          this.blogs[i++]=item;
        }
      }
        console.log(this.blogs);
      })


  }

  markFavorite(blog){


    var index = this.current_user.favorites.indexOf(blog.id);
    if (index > -1) {
      this.current_user.favorites.splice(index, 1);
    }

    this.request.updateUser(this.current_user.id,this.current_user)
      .subscribe((data)=>{
        this.request.currentUser = data;
        console.log(this.request.currentUser);
      })

    this.getBlogs();

  }


}
