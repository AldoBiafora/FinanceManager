import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ContoCorrenteDTO } from 'src/app/models/finance.module';
import { FinanceService } from 'src/app/service/finance.service';
import { AppSettings } from 'src/app/shared/app.settings';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  showFiller = false;
  contoCorrente!: ContoCorrenteDTO;
  _UserId = Number(sessionStorage.getItem('UserId'));
  totalAmount = 0;
  nameConto: string = "";
  isAdmin: boolean = false;

  constructor(private cookieService: CookieService,
              private router: Router,
             ) { }

  ngOnInit(): void {
    let role = sessionStorage.getItem('Role');
    if (role == "Admin") {
      this.isAdmin = true;
    }
  }

  logout(): void {
    this.cookieService.delete(AppSettings.TOKEN_NAME, '/');
    this.router.navigate(["/login"]); 
  }

 


  

}
