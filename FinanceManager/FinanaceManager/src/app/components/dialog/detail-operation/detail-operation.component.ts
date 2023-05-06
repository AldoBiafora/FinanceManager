import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DetailOperationDTO } from 'src/app/models/finance.module';
import { FinanceService } from 'src/app/service/finance.service';
import { ToolService } from 'src/app/service/tool.service';
import { DeleteOperationComponent } from '../delete-operation/delete-operation.component';

@Component({
  selector: 'app-detail-operation',
  templateUrl: './detail-operation.component.html',
  styleUrls: ['./detail-operation.component.css']
})
export class DetailOperationComponent implements OnInit {

  _UserId = Number(sessionStorage.getItem('UserId'));
  entrate: string = "Entrate";
  uscite: string = "Uscite";
  operazioni: DetailOperationDTO[] = [];
  nameCat: string = "";


  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private _service: FinanceService,
              private _toolService: ToolService,
              public dialog: MatDialog,
              private datePipe: DatePipe,
              private fb: FormBuilder,
              public dialogRef: MatDialogRef<DetailOperationComponent>) {
                dialogRef.disableClose = true;
              }

  ngOnInit(): void {
    console.log(this.data)
    this.getDetailOperationForCategory(this._UserId, this.data.Type, this.data.CategoryId);
  }

  getDetailOperationForCategory(userId: number, type: string, catId: number): void {
    this._service.getDetailOperationForCategory(userId, type, catId).subscribe(result => {
      this.operazioni = result;
      result.forEach(element => {
        this.nameCat = element.CategoryName;
        const formatData = this.datePipe.transform(element.WhenCreated, 'dd/MM/yyyy, HH:mm:ss');
        element.WhenCreated = formatData
      });
    })
  }

  deleteOperation(operation: DetailOperationDTO): void {
    const dialogRef = this.dialog.open(DeleteOperationComponent, {
      height: '300px',
      width: '250px',
      data: operation
    })

    dialogRef.afterClosed().subscribe(res => {
      if(res == true){
        this._service.deleteOperation(operation.UsciteId).subscribe(result => {
          console.log(result)
          this._toolService.openSnackBarConfirm("Movimento eliminato con successo", "");
          this.getDetailOperationForCategory(this._UserId, this.data.Type, this.data.CategoryId);
          /* if(result == true){
            this._toolService.openSnackBarConfirm("Movimento eliminato con successo", "");
            this.getDetailOperationForCategory(this._UserId, this.data.Type, this.data.CategoryId);
          }
          else{
            this._toolService.openSnackBarError("Errore durante la cancellazione del movimento", "");
          } */
        })
      }
    })
  }
}
