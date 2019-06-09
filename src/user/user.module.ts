import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserListComponent} from './user-list/user-list.component';
import {JumperDirective} from './directives/jumper.directive';
// import {ButtonDisableDirective} from './directives/button-disable.directive';
import {HttpClientModule} from '@angular/common/http';
import {BackendService} from '../assets/backend.service';
import {
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatPaginatorModule,
  MatRadioModule,
  MatSelectModule,
  MatSidenavModule, MatSlideToggleModule,
  MatSortModule,
  MatTableModule
} from '@angular/material';
import {AddUserComponent} from './add-user/add-user.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {EditUserComponent} from './edit-user/edit-user.component';
import {RouterModule} from '@angular/router';
import { NotificationListComponent } from './notification-list/notification-list.component';

// import { BrowserAnimationsModule } from '@angular/platform-browser/animations' ;


@NgModule({
  declarations: [
    UserListComponent,
    JumperDirective,
    // ButtonDisableDirective,
    AddUserComponent,
    EditUserComponent,
    NotificationListComponent
  ],
  exports: [
    UserListComponent,
    JumperDirective,
    // ButtonDisableDirective,
    AddUserComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    CommonModule,
    HttpClientModule,
    MatTableModule,
    FormsModule,
    MatCardModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatRadioModule,
    MatCheckboxModule,
    MatListModule,
    RouterModule,
    MatIconModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    MatSortModule,
    MatMenuModule,  // pentru formControl in html
    MatSidenavModule,
    MatSlideToggleModule
  ],
  providers: [
    BackendService
  ]
})
export class UserModule {
}
