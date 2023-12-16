import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { RouterModule, Routes } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { TaskService } from './task.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EditTaskDialogComponent } from './edit-task-dialog/edit-task-dialog.component';

const routes:Routes =[
  {path:'',component:HomeComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    EditTaskDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    
  ],
  providers: [
    // provideClientHydration()
    TaskService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
