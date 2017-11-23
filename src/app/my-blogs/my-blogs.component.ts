import {Component, OnInit} from '@angular/core';
import {BlogService} from "../blog.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-my-blogs',
  templateUrl: './my-blogs.component.html',
  styleUrls: ['./my-blogs.component.css']
})
export class MyBlogsComponent implements OnInit {

  currentBlogId = -1;
  current_user: { User_name: null, Password: null, favorites: [null], id: null };
// blogs : {Author,Title,Date,Category,Body,id}[];
  blogs: object[];
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
    this.categoryFilter = (<HTMLInputElement>document.getElementById("CategoryFilter")).value;
  }

  ngOnInit(): void {
    if (this.request.currentUser == null) {
      this.router.navigate(['/login'])
    }
    else {
      this.current_user = this.request.currentUser;
      this.blogs = [{Author: null, Title: null, Date: null, Category: null, Body: null, id: null}];
      this.getBlogs();
    }

  }

  constructor(private request: BlogService, private router: Router) {
  }

  getBlogs() {
    this.blogs=[];
    this.request.loadBlogs()
      .subscribe((data) => {

        let i = 0;
        for (let blog of data) {
          if (blog.Author == this.current_user["User_name"]) {
            this.blogs[i++] = blog;
          }
        }
      })
  };

  markFavorite(blog){


    var index = this.current_user.favorites.indexOf(blog.id);
    if (index > -1) {
      this.current_user.favorites.splice(index, 1);
    }
    else
    {
      this.current_user.favorites.push(blog.id);
      this.current_user.favorites.sort(function(a, b) {
        return a - b;
      }.bind(this));

    }
    this.request.updateUser(this.current_user.id,this.current_user)
      .subscribe((data)=>{
        this.request.currentUser = data;
        console.log(this.request.currentUser);
      })
  }

  editBlog(blog) {

    this.currentBlogId = blog.id;

    var updateDiv = <HTMLInputElement>document.getElementById("Update_div");
    var myBlogsDiv = <HTMLInputElement>document.getElementById("myBlogs_div");

    myBlogsDiv.classList.remove('s10');
    myBlogsDiv.classList.remove('offset-s1');
    myBlogsDiv.classList.add('s12');
    myBlogsDiv.classList.add('m6');
    updateDiv.style.display = "block";

    (<HTMLInputElement>document.getElementById("title")).value = blog.Title;
    (<HTMLInputElement>document.getElementById("Category")).value = blog.Category;
    (<HTMLInputElement>document.getElementById("blogbody")).value = blog.Body;

  }

  deleteBlog(blog){
    this.request.deleteBlog(blog.id)
      .subscribe(data=>{

        this.request.loadData()
          .subscribe((data)=>{
            var users = data;
            for(let user of users){
              var index = user.favorites.indexOf(blog.id);
              if (index > -1) {
                user.favorites.splice(index, 1);
                this.request.updateUser(this.current_user.id,this.current_user)
                  .subscribe((data)=>{ })
              }
            }
          })
        while(this.blogs.length > 0) {
          this.blogs.pop();
        }
        this.getBlogs();
        this.currentBlogId=-1;
        (<HTMLInputElement>document.getElementById("title")).value = "";
        (<HTMLInputElement>document.getElementById("Category")).value = "";
        (<HTMLInputElement>document.getElementById("blogbody")).value = "";
      })

    var updateDiv = <HTMLInputElement>document.getElementById("Update_div");
    var myBlogsDiv = <HTMLInputElement>document.getElementById("myBlogs_div");

    if(updateDiv.style.display == "block") {
      updateDiv.style.display = "none";
      myBlogsDiv.classList.remove('s12');
      myBlogsDiv.classList.remove('m6');
      myBlogsDiv.classList.add('s10');
      myBlogsDiv.classList.add('offset-s1');
    }

  }

  updateBlog() {
    if (this.currentBlogId != -1) {
      var title = (<HTMLInputElement>document.getElementById("title")).value;
      var category = (<HTMLInputElement>document.getElementById("Category")).value;
      var blogBody = (<HTMLInputElement>document.getElementById("blogbody")).value;

      var author = this.current_user.User_name;
      var dateVar = (new Date ).toString();

      var blog = {Author: author, Title: title, Date: dateVar, Category: category, Body: blogBody};

      this.request.updateBlog(this.currentBlogId,blog)
        .subscribe(data => {
          this.currentBlogId = -1;
          (<HTMLInputElement>document.getElementById("title")).value = "";
          (<HTMLInputElement>document.getElementById("Category")).value = "";
          (<HTMLInputElement>document.getElementById("blogbody")).value = "";
          this.request.loadBlogs()
            .subscribe((data) => {
              let i = 0;
              for (let blog of data) {
                if (blog.Author == this.current_user["User_name"]) {
                  this.blogs[i++] = blog;
                }
              }
            })
        })

    }
    var updateDiv = <HTMLInputElement>document.getElementById("Update_div");
    var myBlogsDiv = <HTMLInputElement>document.getElementById("myBlogs_div");

    updateDiv.style.display = "none";
    myBlogsDiv.classList.remove('s12');
    myBlogsDiv.classList.remove('m6');
    myBlogsDiv.classList.add('s10');
    myBlogsDiv.classList.add('offset-s1');

  }
}
