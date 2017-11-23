import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {BlogService} from "./blog.service";
import { LoginComponent } from './login/login.component';
import {HttpModule} from "@angular/http";
import {RouterModule} from "@angular/router";
import { AddNewComponent } from './add-new/add-new.component';
import { HomeComponent } from './home/home.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { MyBlogsComponent } from './my-blogs/my-blogs.component';

const approutes =[
  {path:"",redirectTo:"/login",pathMatch:"full"},
  {path:"login",component:LoginComponent},
  {path: "home", component:HomeComponent},
  {path: "add", component:AddNewComponent},
  {path: "favorite", component:FavoritesComponent},
  {path: "myblogs", component:MyBlogsComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AddNewComponent,
    HomeComponent,
    FavoritesComponent,
    MyBlogsComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    RouterModule.forRoot(approutes)
  ],
  providers: [BlogService],
  bootstrap: [AppComponent]
})
export class AppModule { }
