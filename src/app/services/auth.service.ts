import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable } from 'rxjs';
import { throwError, switchMap } from 'rxjs';
import { forkJoin, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'https://681d40aff74de1d219af3d06.mockapi.io/people'

  private apiUrl2 = 'https://681d40aff74de1d219af3d06.mockapi.io/people2'
  constructor(private http: HttpClient) { }
register(userData: any): Observable<any> {
  const initializedUser = {
    ...userData,
    agentName: '',
    btcbalance: '0.00',
    balance: '0.00',
  };

  return this.http.get<any[]>(this.apiUrl).pipe(
    switchMap((people1) => {
      if (people1.length < 100) {
        return this.http.post(this.apiUrl, initializedUser);
      } else {
        return this.http.get<any[]>(this.apiUrl2).pipe(
          switchMap((people2) => {
            if (people2.length < 100) {
              return this.http.post(this.apiUrl2, initializedUser);
            } else {
              return throwError(() => new Error('All resources full!'));
            }
          })
        );
      }
    })
  );
}


  login(userData: { email: string; password: string }): Observable<any> {
    const urls = [
      this.apiUrl,
      this.apiUrl2
    ];
  
    return forkJoin(
      urls.map(url =>
        this.http.get<any[]>(url).pipe(
          catchError(() => of([])) // if one fails, return empty array
        )
      )
    ).pipe(
      map(([list1, list2]) => {
        const users = [...list1, ...list2];
        const user = users.find(
          u => u.email === userData.email && u.password === userData.password
        );
  
        return user
          ? { success: true, user }
          : { success: false, message: 'Invalid credentials' };
      })
    );
  }
}
