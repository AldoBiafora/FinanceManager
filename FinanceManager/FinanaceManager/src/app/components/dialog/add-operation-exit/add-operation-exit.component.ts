import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CategoryDTO, MovimentoDTO } from 'src/app/models/finance.module';
import { FinanceService } from 'src/app/service/finance.service';

@Component({
  selector: 'app-add-operation-exit',
  templateUrl: './add-operation-exit.component.html',
  styleUrls: ['./add-operation-exit.component.css']
})
export class AddOperationExitComponent implements OnInit {

 

  form = this.fb.group({
    id: 0,
    CatId: new FormControl(0, Validators.required),
    Type: new FormControl('', Validators.required),
    total: new FormControl(0, Validators.required),
    note: '',
  })

  allCategoryExit: CategoryDTO[] = [];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private _service: FinanceService,
              public dialog: MatDialog,
              private fb: FormBuilder,
              public dialogRef: MatDialogRef<AddOperationExitComponent>) {
                dialogRef.disableClose = true;
              }

  ngOnInit(): void {
    this.getAllCategoryExit();
    this.form.get('total')?.reset()
    console.log(this.form.valid)
  }

  getAllCategoryExit(): void {
    this._service.getAllCategoryExit().subscribe(result => {
      this.allCategoryExit = result;
    })
  }

  onSubmit(): void {
    let formData = this.form.value;
    let returnData: MovimentoDTO = {
      UsciteId: 0,
      UserId: this.data.UserId,
      ContoId: this.data.ContoId,
      CategoryId: formData.CatId,
      TotalAmount: formData.total,
      IsCanceled: false,
      WhenCreated: new Date(),
      Note: formData.note,
      Type: formData.Type,
      CategoryName: null
    }
     this.dialogRef.close(returnData)
     
/*    console.log(returnData)*/
    
  }
}
