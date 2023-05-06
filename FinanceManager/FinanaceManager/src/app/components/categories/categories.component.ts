import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CategoryDTO } from 'src/app/models/finance.module';
import { FinanceService } from 'src/app/service/finance.service';
import { ToolService } from 'src/app/service/tool.service';
import { AddCategoryEntryComponent } from '../dialog/add-category-entry/add-category-entry.component';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  allCategoryEntry: CategoryDTO[] = [];
  allCategoryExit: CategoryDTO[] = [];
  isLoading = false;

  constructor(private _service: FinanceService,
              private toolService: ToolService,
              public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getAllCategoryExit();
    this.getAllCategoryEntry();
    
  }

  getAllCategoryExit(): void {
    this.isLoading = true;
    this._service.getAllCategoryExit().subscribe(result => {
      this.allCategoryExit = result;
      this.isLoading = false;
    })
  }

  getAllCategoryEntry(): void {
    this.isLoading = true;
    this._service.getAllCategoryEntry().subscribe(result => {
      this.allCategoryEntry = result;
      this.isLoading = false;
    })
  }

  addCategory(): void {
    const dialogRef = this.dialog.open(AddCategoryEntryComponent, {
      height: '400px',
      width: '300px'
    })

    dialogRef.afterClosed().subscribe(result => {
      if(result != false){
        this.isLoading = true;
        this._service.addCategory(result).subscribe(r => {
          if(r == true){
            this.toolService.openSnackBarConfirm("Categoria aggiunta con successo", "");
            this.getAllCategoryExit();
            this.getAllCategoryEntry();
            this.isLoading = false; 
          }else {
            this.isLoading = true;
            this.toolService.openSnackBarError("Errore nell'inserimento della categoria", "");
          }
        })
      }
    })
  }

 

  /* addCategoryEntry(): void {
    const dialogRef = this.dialog.open(AddCategoryEntryComponent, {
      height: '350px',
      width: '250px'
    })

    dialogRef.afterClosed().subscribe(res=> {
      if(res == true){
        this._service.addCategoryEntry(res).subscribe(r => {
          if(r == true){
            this.toolService.openSnackBarConfirm("Categoria aggiunta con successo", "");
            this.getAllCategoryEntry();
          }
        })
      }
    })
  } */

 
}
