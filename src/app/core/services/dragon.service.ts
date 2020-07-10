import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { IDragon } from 'src/app/shared/models/dragon.model';

const API = 'http://5c4b2a47aa8ee500142b4887.mockapi.io/api/v1';

@Injectable({
  providedIn: 'root',
})
export class DragonService {
  constructor(private http: HttpClient) {}

  // Headers
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  getAllDragon(): Observable<IDragon> {
    const url = `${API}/dragon`;
    return this.http.get<IDragon>(url).pipe(
      retry(2),
      catchError(err => this.handleError(err, 'getAllDragon')),
    );
  }
  getDetailDragon(id: number): Observable<IDragon> {
    if (!id) {
      return null;
    }
    const url = `${API}/dragon/${id}`;
    return this.http.get<IDragon>(url).pipe(
      retry(2),
      catchError(err => this.handleError(err, 'getDetailDragon')),
    );
  }
  saveDragon(dragon: IDragon): Observable<IDragon> {
    const url = `${API}/dragon`;
    return this.http.post<IDragon>(url, JSON.stringify(dragon), this.httpOptions).pipe(
      retry(2),
      catchError(err => this.handleError(err, 'saveDragon')),
    );
  }
  updateDragon(dragon: IDragon): Observable<IDragon> {
    const url = `${API}/dragon/${dragon.id}`;
    return this.http.put<IDragon>(`${url}`, JSON.stringify(dragon), this.httpOptions).pipe(
      retry(1),
      catchError(err => this.handleError(err, 'updateDragon')),
    );
  }
  deleteDragon(id: string) {
    const url = `${API}/dragon/${id}`;
    return this.http.delete<IDragon>(`${url}`, this.httpOptions).pipe(
      retry(1),
      catchError(err => this.handleError(err, 'deleteDragon')),
    );
  }
  handleError(error: HttpErrorResponse, methodName: string): Observable<any> {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
