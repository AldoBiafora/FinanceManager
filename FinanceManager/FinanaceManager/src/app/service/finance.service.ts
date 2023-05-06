import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { CategoryDTO, ContoCorrenteDTO, CookieDTO, LoginDTO, MovimentoDTO, MovimentiPerCategoriaDTO, DetailOperationDTO, UserDTO } from '../models/finance.module';
import { ResponseModel } from '../models/tools.module';

@Injectable({
  providedIn: 'root'
})
export class FinanceService {

  constructor(public http: HttpClient) { }

  login(loginDTO: LoginDTO): Observable<CookieDTO> {
    return this.http.post<ResponseModel<CookieDTO>>("/api/data/login", loginDTO).pipe(
      map((response: ResponseModel<CookieDTO>) => { return response.data})
      )
  }

  getInfoConto(userId: number): Observable<ContoCorrenteDTO> {
    return this.http.get<ResponseModel<ContoCorrenteDTO>>("/api/data/getInfoConto/" + userId).pipe(
      map((response: ResponseModel<ContoCorrenteDTO>) => { return response.data})
      )
  }

  getAllCategoryExit(): Observable<CategoryDTO[]> {
    return this.http.get<ResponseModel<CategoryDTO[]>>("/api/data/getAllCategoriesExit").pipe(
      map((response: ResponseModel<CategoryDTO[]>) => { return response.data})
      )
  }

  addCategory(cat: CategoryDTO): Observable<boolean> {
    return this.http.post<ResponseModel<boolean>>("/api/data/addCategory", cat).pipe(
      map((response: ResponseModel<boolean>) => { return response.data})
      )
  }

  getAllCategoryEntry(): Observable<CategoryDTO[]> {
    return this.http.get<ResponseModel<CategoryDTO[]>>("/api/data/getAllCategoriesEntry").pipe(
      map((response: ResponseModel<CategoryDTO[]>) => { return response.data})
      )
  }

  getOperationsForCategory(userId: number, type: string): Observable<MovimentiPerCategoriaDTO[]> {
    return this.http.get<ResponseModel<MovimentiPerCategoriaDTO[]>>("/api/data/getOperationsForCategory/" + userId + "/" + type).pipe(
      map((response: ResponseModel<MovimentiPerCategoriaDTO[]>) => { return response.data})
      )
  }

  addOperation(mov: MovimentoDTO): Observable<boolean> {
    return this.http.post<ResponseModel<boolean>>("/api/data/addOperation", mov).pipe(
      map((response: ResponseModel<boolean>) => { return response.data})
      )
  }

  getDetailOperationForCategory(userId: number, type: string, catId: number): Observable<DetailOperationDTO[]> {
    return this.http.get<ResponseModel<DetailOperationDTO[]>>("/api/data/getDetailOperationForCategory/" + userId + "/" + type + "/" + catId).pipe(
      map((response: ResponseModel<DetailOperationDTO[]>) => { return response.data})
      )
  }

  deleteOperation(usciteId: number): Observable<boolean> {
    return this.http.get<ResponseModel<boolean>>('/api/data/deleteOperation/' + usciteId).pipe(
      map((response: ResponseModel<boolean>) => { return response.data})
    )
  }

  getAllOperation(): Observable<MovimentoDTO[]> {
    return this.http.get<ResponseModel<MovimentoDTO[]>>("/api/data/getAllOperation").pipe(
      map((response: ResponseModel<MovimentoDTO[]>) => { return response.data})
      )
  }

  getAllUsers(): Observable<UserDTO[]> {
    return this.http.get<ResponseModel<UserDTO[]>>("/api/data/getAllUsers").pipe(
      map((response: ResponseModel<UserDTO[]>) => { return response.data})
      )
  }

  saveUser(user: UserDTO): Observable<boolean> {
    return this.http.post<ResponseModel<boolean>>("/api/data/saveUser", user).pipe(
      map((response: ResponseModel<boolean>) => { return response.data})
      )
  } 

  deleteUser(userId: number): Observable<boolean> {
    return this.http.get<ResponseModel<boolean>>('/api/data/deleteUser/' + userId).pipe(
      map((response: ResponseModel<boolean>) => { return response.data})
    )
  }


  
  
}
