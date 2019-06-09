import {AfterViewInit, Component, OnInit} from '@angular/core';
import { Chart } from 'angular-highcharts';
import {BugService} from "../service/bug.service";
import {BugStatus} from "../models/bugStatus.model";

@Component({
  selector: 'app-piechart',
  templateUrl: './piechart.component.html',
  styleUrls: ['./piechart.component.scss']
})
export class PiechartComponent implements OnInit {

  chartPie: Chart=new Chart();
  chartBar: Chart=new Chart();
  noNEW:number=-1;
  noIN_PROGRESS:number=-1;
  noINFO_NEEDED:number=-1;
  noFIXED:number=-1;
  noREJECTED:number=-1;
  noCLOSED:number=-1;
  show:boolean=false;


  constructor(private bugService: BugService) { }

  ngOnInit() {
    Object.keys(BugStatus).forEach(s=>{

      this.bugService.getNoBugsByStatus(s).subscribe((no)=>{

        switch(s) {

          case BugStatus.NEW: {
            this.noNEW=+no;
            break;
          }
          case BugStatus.IN_PROGRESS: {
            this.noIN_PROGRESS=+no;
            break;
          }
          case BugStatus.INFO_NEEDED: {
            this.noINFO_NEEDED=+no;
            break;
          }
          case BugStatus.FIXED: {
            this.noFIXED=+no;
            break;
          }
          case BugStatus.REJECTED: {
            this.noREJECTED=+no;
            break;
          }
          case BugStatus.CLOSED: {
            this.noCLOSED=+no;
            break;
          }
          default: {
            break;
          }
        }
        if(this.isValid()) {
          this.init();
          this.show=true;
        }
      })
    });
  }

  isValid():boolean{
    return this.noNEW != -1 &&
      this.noIN_PROGRESS != -1 &&
      this.noINFO_NEEDED != -1 &&
      this.noFIXED != -1 &&
      this.noREJECTED != -1 &&
      this.noCLOSED != -1;


  }


  init() {

     this.chartPie = new Chart({

      chart : {
        plotBorderWidth: null,
        plotShadow: false
      },
      title : {
        text: 'Bugs Status'
      },
      tooltip : {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
      },
      plotOptions : {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: true,
             format: '<b>{point.name}%</b>: {point.percentage:.1f} %',

          },
          showInLegend: true
        }
      },
      series : [{
        type: 'pie',
        name: 'Bugs Status: ',
        data: [
          [BugStatus.NEW,this.noNEW],
          [BugStatus.IN_PROGRESS,this.noIN_PROGRESS],
          [BugStatus.INFO_NEEDED,this.noINFO_NEEDED],
          [BugStatus.FIXED,this.noFIXED],
          [BugStatus.REJECTED,this.noREJECTED],
          [BugStatus.CLOSED,this.noCLOSED],
        ]
      }]
     });


       this.chartBar = new Chart({
       chart: {
         type: 'bar'
       },
       title: {
         text: 'Bug Status'
       },
       subtitle : {
         text: 'Number of each bug'
       },
       legend : {
         layout: 'vertical',
         align: 'left',
         verticalAlign: 'top',
         x: 250,
         y: 100,
         floating: true,
         borderWidth: 1,

       },
       xAxis:{
         categories: [BugStatus.NEW,BugStatus.IN_PROGRESS,BugStatus.INFO_NEEDED,BugStatus.FIXED,BugStatus.REJECTED,BugStatus.CLOSED], title: {
           text: null
         }
       },
       yAxis : {
         min: 0, title: {
           text: 'Number of Bugs', align: 'high'
         },
         labels: {
           overflow: 'justify'
         }
       },
       tooltip : {
         valueSuffix: ' '
       },
       plotOptions : {
         bar: {
           dataLabels: {
             enabled: true
           }
         },
         series: {
           stacking: 'normal'
         }
       },
       credits:{
         enabled: false
       },
       series: [
         {
           type: 'bar',
           name: 'bugs ',
            data: [this.noNEW,this.noIN_PROGRESS,this.noINFO_NEEDED,this.noFIXED,this.noREJECTED,this.noCLOSED]
         },
       ]

     });


  }


}
