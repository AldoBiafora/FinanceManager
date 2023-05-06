import { Component, OnInit, ViewChild } from '@angular/core';
import { DatePipe, formatDate } from '@angular/common';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { CategoryDTO, ConfirmDialogModel, ContoCorrenteDTO, DialogMode, MovimentoDTO } from 'src/app/models/finance.module';
import { FinanceService } from 'src/app/service/finance.service';
import { ToolService } from 'src/app/service/tool.service';
import { MatDialog } from '@angular/material/dialog';
import { AddOperationExitComponent } from '../dialog/add-operation-exit/add-operation-exit.component';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmDialogComponent } from '../../dialog/confirm-dialog/confirm-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-bank-account',
  styleUrls: ['./bank-account.component.css'],
  templateUrl: './bank-account.component.html',
  providers: [DatePipe]
})
export class BankAccountComponent implements OnInit {

  form = this.fb.group({
    Name: "",
    Total: "",
    Date: ""
  })

  money = new Intl.NumberFormat('it-IT',
  { style:'currency', currency: 'EUR' });


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort = new MatSort;
  pageEvent!: PageEvent;
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = ['category', 'whenCreated', 'Total','Type', 'Action'];
  resultLength = 0;
  _type: string = "Uscite";
  isLoading: boolean = false;
  _UserId = Number(sessionStorage.getItem('UserId'));
  infoConto!: ContoCorrenteDTO;
  categorie: CategoryDTO[] = [];


  constructor( private fb: FormBuilder,
              private datePipe: DatePipe,
              private _service: FinanceService,
              private toolService: ToolService,
              public dialog: MatDialog,
              public snackBar: MatSnackBar  ) { }

  ngOnInit(): void {
    this.getInfoConto(this._UserId);
    this.getAllCategoriesExit();
    this.getAllOperation();
  }


  getInfoConto(userId: number): void {
    this._service.getInfoConto(userId).subscribe(result => {
        this.infoConto = result;
        this.form.patchValue({
          Name: result.NameConto,
          Total: this.money.format(result.TotalAmount),
          Date: this.datePipe.transform(result.WhenCreated, 'dd/MM/yyyy, HH:mm:ss')
        })
    })
  }

  sortData(sort: Sort) {
    this.dataSource.sort = this.sort;
  }

  getAllOperation(): void {
    this._service.getAllOperation().subscribe(result => {
      console.log(result)
       result.forEach(element => {
         if (element.Type == "Uscite") {
           element.Type = "U"
         }
         if (element.Type == "Entrate") {
           element.Type = "E"
         }
      }); 
      this.dataSource = new MatTableDataSource(result);
      this.dataSource.paginator = this.paginator;
    }) 
  }

  addOperation(): void {
    const dialogRef = this.dialog.open(AddOperationExitComponent, {
      height: '630px',
      width: '350px',
      data: this.infoConto
    })

    dialogRef.afterClosed().subscribe(res =>{
      if(res != false){
          this.isLoading = true;
          this._service.addOperation(res).subscribe(result => {
            if (result == true) {
              this.getAllOperation();
              this.getInfoConto(this._UserId);
              this.toolService.openSnackBarConfirm("Movimento aggiunta con successo", "");
              this.isLoading = false;
          }else {
              this.isLoading = true;
              this.getAllOperation();
              this.getInfoConto(this._UserId);
              this.toolService.openSnackBarError("Errore nell'aggiunta del movimento", "");
          }
        })
      }
    })
  } 

  getAllCategoriesExit(): void {
    this._service.getAllCategoryExit().subscribe(result => {
      this.categorie = result;
    })
  }

  deleteOperation(id: number): void {
    const dialogRef = this.dialog.open<ConfirmDialogComponent, ConfirmDialogModel, boolean>(ConfirmDialogComponent, {
      height: '340px',
      width: '400px',
      data: {
        title: "Attenzione",
        message: "Sei sicuro di volere eliminare l'operazione?",
        mode: DialogMode.CONFIRM,
        value: id
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result)
      if (result == true) {
        this._service.deleteOperation(id).subscribe(res => {
          this.getAllOperation();
          this.getInfoConto(this._UserId);
          this.snackBar.open("Operazione eliminata", '', { duration: 3000, panelClass: ['mat-toolbar', 'confirm'] });
        })
      } 
    })
  }



}
