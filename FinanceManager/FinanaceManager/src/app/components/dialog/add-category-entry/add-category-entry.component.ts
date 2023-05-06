import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CategoryDTO } from 'src/app/models/finance.module';
import { FinanceService } from 'src/app/service/finance.service';

@Component({
  selector: 'app-add-category-entry',
  templateUrl: './add-category-entry.component.html',
  styleUrls: ['./add-category-entry.component.css']
})
export class AddCategoryEntryComponent implements OnInit {

  form = this.fb.group({
    id: 0,
    Name: new FormControl('', Validators.required),
    Type: new FormControl('', Validators.required)
  })

  formValues: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private _service: FinanceService,
              public dialog: MatDialog,
              private fb: FormBuilder,
              public dialogRef: MatDialogRef<AddCategoryEntryComponent>) {
                dialogRef.disableClose = true;
              }

  ngOnInit(): void {
  }

  onSubmit(): void {
    let formData = this.form.value;
    let returnData: CategoryDTO = {
      CategoryId: 0,
      Name: formData.Name,
      Type: formData.Type,
      IsCanceled: false
    }
    this.dialogRef.close(returnData)
  }

}
