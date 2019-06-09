import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginComponent} from './login/login.component';
import {HomeComponent} from './home/home.component';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {
  MatButtonModule,
  MatCardModule,
  MatIconModule,
  MatListModule,
  MatMenuModule,
  MatPaginatorModule,
  MatSidenavModule,
  MatSnackBarModule,
  MatSortModule,
  MatTableModule
} from '@angular/material';
import {MainComponent} from './main/main.component';
import {MenuComponent} from './menu/menu.component';
import {UserComponent} from './user/user.component';
import {ErrorComponent} from './error/error.component';

@NgModule({
  declarations: [
    LoginComponent,
    HomeComponent,
    MainComponent,
    MenuComponent,
    UserComponent,
    ErrorComponent
  ],
  exports: [
    LoginComponent,
    HomeComponent,
    MainComponent,
    UserComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MatSidenavModule,
    MatCardModule,
    MatButtonModule,
    MatListModule,
    MatIconModule,
    MatMenuModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatSnackBarModule
  ]
})
export class PagesModule { }
