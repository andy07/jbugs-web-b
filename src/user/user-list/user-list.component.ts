import {Component, OnInit, ViewChild} from '@angular/core';
import {RestUser} from '../models/restUser';
import {UserService} from '../service/user.service';
import {infoToken, PopUpMessageComponent} from '../../pages/login/login.component';
import {FormControl} from '@angular/forms';
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {Router} from '@angular/router';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  dataSource = new MatTableDataSource<RestUser>();

  public userList: RestUser[];

  displayedColumns: string[] = ['firstName', 'lastName', 'email', 'mobileNumber', 'status', 'username', 'star'];
  displayedColumnsFilter: string[] = ['firstNameFilter', 'lastNameFilter',
    'emailFilter', 'mobileNumberFilter',
    'statusFilter', 'usernameFilter'];

  private firstNameFilter = new FormControl();
  private lastNameFilter = new FormControl();
  private emailFilter = new FormControl();
  private mobileNumberFilter = new FormControl();
  private usernameFilter = new FormControl();
  private globalFilter = new FormControl('');
  private filterValues = {firstName: '', lastName: '', email: '', mobileNumber: '', username: '', data: ''};

  private newStatus: boolean;

  constructor(private userService: UserService, private router: Router, public dialog: MatDialog) {
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  sortData() {
    this.dataSource.sort = this.sort;
  }

  ngOnInit() {
    this.userService.getAllUsers().subscribe((userList) => {
        this.userList = userList;
        this.dataSource = new MatTableDataSource(this.userList);
        this.dataSource.paginator = this.paginator;
        this.dataSource.filterPredicate = this.createTableFilter();
      },
      error => {// daca nu poate returna toti userii
        this.router.navigate(['/home/error'], {queryParams: {message: error.error}});
      });
    this.firstNameFilter.valueChanges
      .subscribe(value => {
        this.filterValues.firstName = value;
        this.dataSource.filter = JSON.stringify(this.filterValues);
      });

    this.lastNameFilter.valueChanges
      .subscribe(value => {
        this.filterValues.lastName = value
        this.dataSource.filter = JSON.stringify(this.filterValues);
      });
    this.emailFilter.valueChanges
      .subscribe(value => {
        this.filterValues.email = value
        this.dataSource.filter = JSON.stringify(this.filterValues);
      });
    this.mobileNumberFilter.valueChanges
      .subscribe(value => {
        this.filterValues.mobileNumber = value
        this.dataSource.filter = JSON.stringify(this.filterValues);
      });
    this.usernameFilter.valueChanges
      .subscribe(value => {
        this.filterValues.username = value
        this.dataSource.filter = JSON.stringify(this.filterValues);
      });
    this.globalFilter.valueChanges
      .subscribe(
        value => {
          this.filterValues.data = value
          this.dataSource.filter = JSON.stringify(this.filterValues);
        }
      );
  }

  createTableFilter(): (data: any, filter: string) => boolean {
    const filterFunction = function (data, filter): boolean {
      console.log('!!!!!!');
      const searchTerms = JSON.parse(filter);
      return searchTerms.data !== '' ? JSON.stringify(data).toLowerCase().indexOf(searchTerms.data.toLowerCase()) !== -1 :
        data.firstName.trim().toLowerCase().indexOf(searchTerms.firstName.toLowerCase()) !== -1
        && data.lastName.trim().toLowerCase().indexOf(searchTerms.lastName.toLowerCase()) !== -1
        && data.email.trim().toLowerCase().indexOf(searchTerms.email.toLowerCase()) !== -1
        && data.mobileNumber.trim().toLowerCase().indexOf(searchTerms.mobileNumber.toLowerCase()) !== -1
        && data.username.trim().toLowerCase().indexOf(searchTerms.username.toLowerCase()) !== -1;

    };
    return filterFunction;
  }

  onChange(user: any) {
    if (infoToken.sub === user.username) {
      this.dialog.open(PopUpMessageComponent, {
        width: '500px', height: '120px', data: {
          data: '\n' +
            'Go home! You are drunk!'
        }
      });
      this.ngOnInit();
    } else {
      this.newStatus = !user.status;
      this.userService.updateUserStatus(user.username, this.newStatus).subscribe(message => {
          this.ngOnInit();
          this.dialog.open(PopUpMessageComponent, {
            width: '500px', height: '120px', data: {
              data: '\n' +
                'User status has been successfully updated!'
            }
          });
        },
        error => {
          this.ngOnInit();
          this.dialog.open(PopUpMessageComponent, {width: '500px', height: '120px', data: {data: error.error.message}});
        });
    }
  }

  getUserStatus(status: any): string {
    if (status === true) {
      return 'Active';
    } else {
      return 'Deactivated';
    }
  }
}
