import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {BugService} from '../service/bug.service';
import {RestBug} from '../models/restBug';

@Component({
  selector: 'app-bug-view-details',
  templateUrl: './bug-view-details.component.html',
  styleUrls: ['./bug-view-details.component.scss']
})
export class BugViewDetailsComponent implements OnInit {

  @Input()
  private bug: RestBug = {
    id: -1,
    title: '',
    description: '',
    version: '',
    targetDate: new Date(),
    status: '',
    fixedVersion: '',
    severity: '',
    createdBy: '',
    assignedTo: ''
  };

  constructor(private bugService: BugService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  redirectToBugList() {
    this.router.navigate(['home/bugs/bug-list']);
  }

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    console.log('id is ' + id);
    this.bugService.getBugById(id).subscribe((bug) => {
        this.bug = bug;
      },
      error => {
        this.router.navigate(['/home/error'], {queryParams: {message: error.error}});
      });
  }
}
