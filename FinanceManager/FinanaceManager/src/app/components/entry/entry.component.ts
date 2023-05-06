import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Chart } from 'chart.js';
import { MovimentiPerCategoriaDTO } from 'src/app/models/finance.module';
import { FinanceService } from 'src/app/service/finance.service';
import { DetailOperationComponent } from '../dialog/detail-operation/detail-operation.component';

@Component({
  selector: 'app-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.css']
})
export class EntryComponent implements OnInit {

  totalAmount = 0;
  nameConto: string = "";
  operazioni: MovimentiPerCategoriaDTO[] = [];
  _UserId = Number(sessionStorage.getItem('UserId'));
  type: string = "Entrate";
  AmountOperations: number[] = [];
  catName: string[] = [];
  totalExit = 0;  
  @ViewChild('mychart') mychart: any;
  canvas: any;
  ctx: any;


  constructor(private _service: FinanceService,
              public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getOperationsForCategory(this._UserId, this.type);
    this.getInfoConto(this._UserId);
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      const data = {
        labels: this.catName,
        datasets: [{
          label: 'Categorie',
          data: this.AmountOperations,
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)',
            'rgb(116, 214, 17)'
          ],
          hoverOffset: 4
        }]
      };
      this.canvas = this.mychart.nativeElement;
        this.ctx = this.canvas.getContext('2d');
        new Chart(this.ctx, {
            type: 'bar',
            data: data
        });
    }, 4000);
  }

  getOperationsForCategory(userId: number, type: string): void {
    this._service.getOperationsForCategory(userId, type).subscribe(result => {
      this.operazioni = result;
      result.forEach(x => {
        this.catName.push(x.CategoryName);
        this.AmountOperations.push(x.TotalAmount);
        this.totalExit += x.TotalAmount
      })
    })
  }

  getInfoConto(userId: number): number {
    this._service.getInfoConto(userId).subscribe(result => {
        this.totalAmount = result.TotalAmount;
        this.nameConto = result.NameConto;
    })
    return this.totalAmount
  }


  openDetailOperationEntry(operation: MovimentiPerCategoriaDTO): void {
    const dialogRef = this.dialog.open(DetailOperationComponent, {
      height: '700px',
      width: '350px',
      data: operation
    })

    dialogRef.afterClosed().subscribe(res => {

    })

  }



}
