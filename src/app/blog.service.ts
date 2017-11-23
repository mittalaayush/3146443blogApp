import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http'
import 'rxjs/add/operator/map';

const BASE_URL_USER = "http://localhost:3000/Users/";
const BASE_URL_BLOGS = "http://localhost:3000/blogs/"
const header = {header: new Headers({'Content-Type':'application/json'})}

@Injectable()
export class BlogService {

  public display = "login-page";
  public currentUser : {User_name,Password,favorites,id} = null;

  constructor(private http: Http) // private http: Http makes Http available to entire class
  { }

  loadData(){
    return this.http.get(BASE_URL_USER)
      .map(res => res.json())
  }

  loadBlogs(){
    return this.http.get(BASE_URL_BLOGS)
      .map(res => res.json())
  }

  updateUser(id,data){
    return this.http.patch(BASE_URL_USER+id,data,header)
      .map(res=>res.json())
  }

  postBlog(data){
    return this.http.post(BASE_URL_BLOGS,data,header)
      .map(res=>res.json())
  }

  addUser(data){
    return this.http.post(BASE_URL_USER,data,header)
      .map(res=>res.json())
  }

  updateBlog(id,data){
    return this.http.patch(BASE_URL_BLOGS+id,data,header)
      .map(res=>res.json())
  }

  deleteBlog(id){
    return this.http.delete(BASE_URL_BLOGS+id,header)
      .map(res=>res.json)
  }

}
