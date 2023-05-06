import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FinanceService } from 'src/app/service/finance.service';

@Component({
  selector: 'app-delete-operation',
  templateUrl: './delete-operation.component.html',
  styleUrls: ['./delete-operation.component.css']
})
export class DeleteOperationComponent implements OnInit {

  operationId: number = this.data.UsciteId;
  confirmDelete: boolean = true;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private _service: FinanceService,
              public dialog: MatDialog,
              private datePipe: DatePipe,
              private fb: FormBuilder,
              public dialogRef: MatDialogRef<DeleteOperationComponent>) {
                dialogRef.disableClose = true;
              }

  ngOnInit(): void {
  }

  onSubmit(): void {
    /* this._service.deleteOperation(this.operationId).subscribe(res => {
      if(res == true){
        this.confirmDelete = true
      }
    }) */
    this.dialogRef.close(this.confirmDelete)
  }

}
