import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {FormsModule} from '@angular/forms';
import {BugModule} from '../bug/bug.module';
import {UserModule} from '../user/user.module';
import {PopUpMessageComponent} from '../pages/login/login.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule, MatSortModule, MatTableModule, MatToolbarModule} from '@angular/material';
import {PagesModule} from '../pages/pages.module';
import {RoleModule} from '../role/role.module';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {TokenInterceptorService} from '../interceptors/token-interceptor.service';
import {AuthGuard} from '../interceptors/auth.guard';
import {ExcelService} from "../bug/service/excel.service";

@NgModule({
  declarations: [
    AppComponent,
    PopUpMessageComponent
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BugModule,
    UserModule,
    MatCardModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatToolbarModule,
    PagesModule,
    MatIconModule,
    RoleModule,
    MatSortModule
  ],
  entryComponents: [
    PopUpMessageComponent
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    },
    AuthGuard,
    [ExcelService]

  ],
  bootstrap: [
    AppComponent
  ]

})
export class AppModule {
}
