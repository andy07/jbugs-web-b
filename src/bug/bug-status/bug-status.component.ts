import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {BugStatus} from '../models/bugStatus.model';
import {BugService} from '../service/bug.service';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-bug-status',
  templateUrl: './bug-status.component.html',
  styleUrls: ['./bug-status.component.scss']
})
export class BugStatusComponent implements OnInit {

  private bugActualStatus: BugStatus = BugStatus.NEW;
  private bugStatusList: BugStatus[];

  private statusControl = new FormControl(this.bugActualStatus, [Validators.required]);
  private selectValue: BugStatus = this.bugActualStatus;
  @Input()
  private currentStatus: BugStatus;
  @Output()
  public outputBugsStatus = new EventEmitter<BugStatus>();

  constructor(private bugService: BugService) {
  }

  ngOnInit() {

    this.bugService.getPostAllAllowedStatus(this.bugActualStatus.valueOf()).subscribe((bugStatusList) => {
      this.bugStatusList = bugStatusList;
    });

  }

  setActualStatus(bugStatus: BugStatus) {
    this.bugActualStatus = bugStatus;
  }

  getSelectedStatus(): BugStatus {
    return this.selectValue;
  }


}
