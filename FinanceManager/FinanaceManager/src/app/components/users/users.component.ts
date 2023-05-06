import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmDialogComponent } from 'src/app/dialog/confirm-dialog/confirm-dialog.component';
import { ConfirmDialogModel, DialogMode, UserDTO } from 'src/app/models/finance.module';
import { FinanceService } from 'src/app/service/finance.service';
import { ToolService } from 'src/app/service/tool.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  
  form = this.fb.group({
    Name: "",
    Total: "",
    Date: ""
  })


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort = new MatSort;
  pageEvent!: PageEvent;
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = ['category', 'whenCreated', 'Total','Type', 'Action'];
  resultLength = 0;
  _type: string = "Uscite";
  isLoading: boolean = false;

  allUsers: UserDTO[] = [];

  constructor( private fb: FormBuilder,
                private datePipe: DatePipe,
                private _service: FinanceService,
                public dialog: MatDialog,
                public snackBar: MatSnackBar,
                private toolService: ToolService) { }

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers(): void {
    this._service.getAllUsers().subscribe(result => {
      this.allUsers = result;
      this.dataSource = new MatTableDataSource(result);
      this.dataSource.paginator = this.paginator;
    })
  }

  sortData(sort: Sort) {
    this.dataSource.sort = this.sort;
  }

  deleteUser(userId: number): void {
    const dialogRef = this.dialog.open<ConfirmDialogComponent, ConfirmDialogModel, boolean>(ConfirmDialogComponent, {
      height: '340px',
      width: '400px',
      data: {
        title: "Attenzione",
        message: "Sei sicuro di volere eliminare l'utente?",
        mode: DialogMode.CONFIRM,
        value: userId
      }
    });
    dialogRef.afterClosed().subscribe(res => {
      console.log(res)
      if(res == true){
        this._service.deleteUser(userId).subscribe(result => {
          console.log(result)
          this.toolService.openSnackBarConfirm('Utente Eliminato con successo', 'OK')
          this.getAllUsers();
        })
      }
    })
    
  }

  /* 
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
  } */


}
