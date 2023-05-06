import { Component, OnInit, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import { MovimentiPerCategoriaDTO, MovimentoDTO } from '../../models/finance.module';
import { FinanceService } from '../../service/finance.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements OnInit {

  totalContoCorrente = 0;
  nameConto: string = "";
  operazioni: MovimentiPerCategoriaDTO[] = [];
  _UserId = Number(sessionStorage.getItem('UserId'));
  type: string = "Uscite";
  AmountOperations: number[] = [];
  AmountExit: number[] = [];
  AmountEntry: number[] = [];
  categoriesName: string[] = [];
  catNameExit: string[] = [];
  catNameEntry: string[] = [];
  totalExit = 0;
  @ViewChild('mychart') mychart: any;
  @ViewChild('mychart2') mychart2: any;
  @ViewChild('mychart3') mychart3: any;
  @ViewChild('mychart4') mychart4: any;
  canvas: any;
  canvas2: any;
  canvas3: any;
  canvas4: any;
  ctx: any;
  ctx2: any;
  ctx3: any;
  ctx4: any;
  movimenti: MovimentoDTO[] = [];
  movUscita: MovimentoDTO[] = [];
  movEntrata: MovimentoDTO[] = [];
  labelDate: string[] = [];
  labelDateNumber: number[] = [];
  amountAllOperation: number[] = [];



  constructor(private _service: FinanceService,
              public datePipe: DatePipe  ) { }

  ngOnInit(): void {
    this.getOperationsForCategory(this._UserId, this.type);
    this.getAllOperation();
  }

  ngAfterViewInit(): void {
    this.renderChartGeneral();
    this.renderChartEntry();
    this.renderChartExit();
/*    this.renderChartForDate();*/
  }

  


  getOperationsForCategory(userId: number, type: string): void {
    this._service.getOperationsForCategory(userId, type).subscribe(result => {
      this.operazioni = result;
      result.forEach(x => {
        this.categoriesName.push(x.CategoryName);
        this.AmountOperations.push(x.TotalAmount);
        this.totalExit += x.TotalAmount
      })
    })
  }

  getAllOperation(): void {
    this._service.getAllOperation().subscribe(result => {
      this.movimenti = result;
      result.forEach(element => {
        if (element.Type == "Uscite") {
          element.Type = "U";        
        }
        if (element.Type == "Entrate") {
          element.Type = "E";        
        }
        //let dateTransform = this.datePipe.transform(element.WhenCreated, 'dd/MM/yyyy')
        //if (dateTransform != null) {
        //  this.labelDate.push(dateTransform);
        //}
        //this.labelDateNumber.push(100000)
        //if (element.TotalAmount != null && element.TotalAmount != undefined) {
        //  this.amountAllOperation.push(element.TotalAmount);
        //}
        //console.log(this.labelDate)
        //console.log(this.amountAllOperation)
      });
      this.movUscita = result.filter(x => x.Type == "U");
      this.movEntrata = result.filter(x => x.Type == "E");
      this.movUscita.forEach(el => {
        if (el.CategoryName != null && el.CategoryName != undefined) {
          this.catNameExit.push(el.CategoryName);
        }
        if (el.TotalAmount != null && el.TotalAmount != undefined) {
          this.AmountExit.push(el.TotalAmount);
        }
      })
      this.movEntrata.forEach(el => {
        if (el.CategoryName != null && el.CategoryName != undefined) {
          this.catNameEntry.push(el.CategoryName);
        }
        if (el.TotalAmount != null && el.TotalAmount != undefined) {
          this.AmountEntry.push(el.TotalAmount);
        }
      })
    })
  }



  renderChartGeneral(): void {
    setTimeout(() => {
      var data = {
        labels: this.categoriesName,
        datasets: [{
          label: 'Categorie',
          data: this.AmountOperations,
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)',
            'rgb(116, 214, 17)',
            'rgb(196, 123, 246)',
            'rgb(246, 132, 123)'
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
    }, 2000);
  }

  renderChartExit(): void {
    setTimeout(() => {
      const data2 = {
        labels: this.catNameExit,
        datasets: [{
          label: 'Categorie Uscita',
          data: this.AmountExit,
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)',
            'rgb(116, 214, 17)',
            'rgb(196, 123, 246)',
            'rgb(246, 132, 123)'
          ],
          hoverOffset: 4
        }]
      };
      this.canvas2 = this.mychart2.nativeElement;
      this.ctx2 = this.canvas2.getContext('2d');
      new Chart(this.ctx2, {
        type: 'pie',
        data: data2
      });
    }, 2000);

  }

  renderChartEntry(): void {
    setTimeout(() => {
      const data3 = {
        labels: this.catNameEntry,
        datasets: [{
          label: 'Categorie Entrata',
          data: this.AmountEntry,
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)',
            'rgb(116, 214, 17)',
            'rgb(196, 123, 246)',
            'rgb(246, 132, 123)'
          ],
          hoverOffset: 4
        }]
      };
      this.canvas3 = this.mychart3.nativeElement;
      this.ctx3 = this.canvas3.getContext('2d');
      new Chart(this.ctx3, {
        type: 'doughnut',
        data: data3
      });
    }, 2000);
  }

  //renderChartForDate(): void {
  //  setTimeout(() => {
  //    const data4 = {
  //      labels: this.labelDateNumber,
  //      datasets: [{
  //        label: 'Data',
  //        data: this.amountAllOperation,
  //        backgroundColor: [
  //          'rgb(255, 99, 132)',
  //          'rgb(54, 162, 235)',
  //          'rgb(255, 205, 86)',
  //          'rgb(116, 214, 17)',
  //          'rgb(196, 123, 246)',
  //          'rgb(246, 132, 123)'
  //        ],
  //        hoverOffset: 4
  //      }]
  //    };
  //    this.canvas4 = this.mychart4.nativeElement;
  //    this.ctx4 = this.canvas4.getContext('2d');
  //    new Chart(this.ctx4, {
  //      type: 'line',
  //      data: data4,
  //      options: {
  //        scales: {
  //          x: {
  //            type: 'time',
  //            time: {
  //              unit: 'day',
  //              parser: 'dd.MM.yyyy'
  //            }
  //          },
  //          y: {
  //            beginAtZero: true
  //          }
  //        }
  //      }
  //    });
  //  }, 2000);
  //}


}
