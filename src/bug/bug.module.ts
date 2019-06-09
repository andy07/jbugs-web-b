import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BugCreateComponent} from './bug-create/bug-create.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {
  MatButtonModule,
  MatCardModule,
  MatDatepickerModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatSelectModule,
  MatSidenavModule,
  MatTableModule,
  MatToolbarModule
} from '@angular/material';
import {MatSortModule} from '@angular/material/sort';
import {BugStatusComponent} from './bug-status/bug-status.component';
import {BugListComponent} from './bug-list/bug-list.component';
import {BugEditComponent} from './bug-edit/bug-edit.component';
import {RouterModule} from '@angular/router';
import {BugViewDetailsComponent} from './bug-view-details/bug-view-details.component';
import {AttachmentCreateComponent} from './attachment-create/attachment-create.component';
import {AttachmentListComponent} from './attachment-list/attachment-list.component';
import {PiechartComponent} from './piechart/piechart.component';
import {ChartModule} from 'angular-highcharts';


@NgModule({
  declarations: [
    BugCreateComponent,
    BugStatusComponent,
    BugListComponent,
    BugEditComponent,
    BugViewDetailsComponent,
    AttachmentCreateComponent,
    AttachmentListComponent,
    PiechartComponent,
  ],
  exports: [
    BugCreateComponent,
    BugListComponent,
    BugStatusComponent,
    BugEditComponent,
    BugViewDetailsComponent,
    PiechartComponent

  ],
  imports: [
    CommonModule,
    FormsModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule,
    MatButtonModule,
    MatTableModule,
    FormsModule,
    MatCardModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatCardModule,
    ReactiveFormsModule,
    MatButtonModule,
    RouterModule,
    MatIconModule,
    MatMenuModule,
    MatPaginatorModule,
    MatSortModule,
    MatSidenavModule,
    MatListModule,
    MatToolbarModule,
    MatSidenavModule,
    ChartModule


  ]
})
export class BugModule {
}
