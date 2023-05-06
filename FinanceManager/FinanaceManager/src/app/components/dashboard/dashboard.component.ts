import { Component, OnInit } from '@angular/core';
import { FinanceService } from 'src/app/service/finance.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  

  constructor(private _service: FinanceService,) { }

  ngOnInit(): void {

  }

  

}
