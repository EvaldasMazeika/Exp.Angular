import { Component, OnInit } from '@angular/core';
import { ExpensesService } from '../services/expenses.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private services: ExpensesService) { }

  ngOnInit() {
  }


}
