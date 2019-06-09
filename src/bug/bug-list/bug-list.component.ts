import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {RestBug} from '../models/restBug';
import {BugService} from '../service/bug.service';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {FormControl} from '@angular/forms';
import * as jsPDF from 'jspdf';
import {infoToken} from '../../pages/login/login.component';
import {returnUserPermissionForBugExportPDF, returnUserPermissionForBugManagement} from '../../pages/login/token';
import {ExcelService} from '../service/excel.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-bug-list',
  templateUrl: './bug-list.component.html',
  styleUrls: ['./bug-list.component.scss']
})
export class BugListComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  dataSource = new MatTableDataSource<RestBug>();

  constructor(private bugService: BugService, private excelService: ExcelService, private router: Router) {
  }

  public bugList: RestBug[];
  public bugToPDF: RestBug;

  displayedColumns: string[] = [
    'title',
    'version',
    'fixedVersion',
    'severity',
    'status',
    'assignedTo',
    'star'
  ];
  displayedColumnsFilter: string[] = [
    'titleFilter',
    'versionFilter',
    'fixedVersionFilter',
    'severityFilter',
    'statusFilter',
    'assignedToFilter',
    // 'star'
  ];

  private titleFilter = new FormControl();
  private versionFilter = new FormControl();
  private fixedVersionFilter = new FormControl();
  private severityFilter = new FormControl();
  private statusFilter = new FormControl();
  private assignedToFilter = new FormControl();
  private globalFilter = new FormControl('');

  private filterValues = {title: '', version: '', fixedVersion: '', severity: '', status: '', assignedTo: '', data: ''};
  @Output()
  public outputFromBackend = new EventEmitter<RestBug>();

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  sortData() {
    this.dataSource.sort = this.sort;
  }

  ngOnInit() {
    console.log(infoToken);
    this.bugService.getAllBugs().subscribe((bugList) => {
      this.bugList = bugList;
      this.dataSource = new MatTableDataSource(this.bugList);
      this.dataSource.paginator = this.paginator;
      this.dataSource.filterPredicate = this.createTableFilter();
    },
      error => {
        this.router.navigate(['/home/error'], {queryParams: {message: error.error}}); }
      );

    // this.dataSource.filterPredicate = this.createTableFilter();

    this.titleFilter.valueChanges
      .subscribe(value => {
        this.filterValues.title = value;
        this.dataSource.filter = JSON.stringify(this.filterValues);
      });

    this.versionFilter.valueChanges
      .subscribe(value => {
        this.filterValues.version = value;
        this.dataSource.filter = JSON.stringify(this.filterValues);
      });
    this.fixedVersionFilter.valueChanges
      .subscribe(value => {
        this.filterValues.fixedVersion = value;
        this.dataSource.filter = JSON.stringify(this.filterValues);
      });
    this.severityFilter.valueChanges
      .subscribe(value => {
        this.filterValues.severity = value;
        this.dataSource.filter = JSON.stringify(this.filterValues);
      });
    this.statusFilter.valueChanges
      .subscribe(value => {
        this.filterValues.status = value;
        this.dataSource.filter = JSON.stringify(this.filterValues);
      });
    this.assignedToFilter.valueChanges
      .subscribe(value => {
        this.filterValues.assignedTo = value;
        this.dataSource.filter = JSON.stringify(this.filterValues);
      });
    this.globalFilter.valueChanges
      .subscribe(
        value => {
          this.filterValues.data = value;
          this.dataSource.filter = JSON.stringify(this.filterValues);
        }
      );
  }


  createTableFilter(): (data: any, filter: string) => boolean {
    const filterFunction = function(data, filter): boolean {
      console.log('!!!!!!');
      const searchTerms = JSON.parse(filter);
      return searchTerms.data !== '' ? JSON.stringify(data).toLowerCase().indexOf(searchTerms.data.toLowerCase()) !== -1 :
      data.title.trim().toLowerCase().indexOf(searchTerms.title.toLowerCase()) !== -1
      && data.version.trim().toLowerCase().indexOf(searchTerms.version.toLowerCase()) !== -1
      && data.fixedVersion.trim().toLowerCase().indexOf(searchTerms.fixedVersion.toLowerCase()) !== -1
      && data.severity.trim().toLowerCase().indexOf(searchTerms.severity.toLowerCase()) !== -1
      && data.status.trim().toLowerCase().indexOf(searchTerms.status.toLowerCase()) !== -1
      && data.assignedTo.trim().toLowerCase().indexOf(searchTerms.assignedTo.toLowerCase()) !== -1;

    };
    return filterFunction;
  }

  exportBugPDF(title: any) {
    this.bugService.getBugByTitleToExportPDF(title).subscribe(
      (bug) => {
        this.bugToPDF = bug;
        this.createPDFFile(this.bugToPDF);
      },
      error1 => {
        console.log(error1);
      });

  }


  private createPDFFile(bugToPDF: RestBug) {
    const doc = new jsPDF();
    doc.text('\t\t\t\t' + bugToPDF.title + '\n\n' +
      'Title: ' + bugToPDF.title + '\n' +
      'Description: ' + bugToPDF.description + '\n' +
      'Version: ' + bugToPDF.version + '\n' +
      'Target Date: ' + bugToPDF.targetDate + '\n' +
      'Status: ' + bugToPDF.status + '\n' +
      'Fixed Version: ' + bugToPDF.fixedVersion + '\n' +
      'Severity: ' + bugToPDF.severity + '\n' +
      'Created by: ' + bugToPDF.createdBy + '\n' +
      'Assigned to: ' + bugToPDF.assignedTo + '\n', 10, 10);
    doc.save('Bug ' + bugToPDF.title + '.pdf');
  }


  exportBugsToExcel() {
    this.bugService.getAllBugs().subscribe(value => {
        this.excelService.exportAsExcelFile(value, 'Bug List');
      },
      error => {
        console.log(error);
      });

  }

  getPermissionForBugManagement(): boolean {
    return returnUserPermissionForBugManagement();
  }

  returnPermissionPDFExportBug(): boolean {
    return returnUserPermissionForBugExportPDF();
  }
}

