import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AdminService {
  constructor(private http: HttpClient) {}

getUserByEmail(email: string): Observable<any> {
  const apiA = this.http.get<any[]>(`https://681d40aff74de1d219af3d06.mockapi.io/people?email=${email}`)
    .pipe(catchError(() => of([])));

  const apiB = this.http.get<any[]>(`https://681d40aff74de1d219af3d06.mockapi.io/people2?email=${email}`)
    .pipe(catchError(() => of([])));

  return forkJoin([apiA, apiB]).pipe(
    map(([resA, resB]) => {
      if (resA.length > 0) {
        return { ...resA[0], source: 'A' };
      } else if (resB.length > 0) {
        return { ...resB[0], source: 'B' };
      } else {
        return null;
      }
    })
  );
}


  updateUser(user: any): Observable<any> {
    const apiUrl = user.source === 'A'
      ? `https://681d40aff74de1d219af3d06.mockapi.io/people/${user.id}`
      : `https://681d40aff74de1d219af3d06.mockapi.io/people2/${user.id}`;

    return this.http.put(apiUrl, user);
  }

    deleteAllUsers(): Observable<any> {
    const apiAUrl = 'https://681d40aff74de1d219af3d06.mockapi.io/people';
    const apiBUrl = 'https://681d40aff74de1d219af3d06.mockapi.io/people2';

    // Step 1: Fetch all users
    const getPeopleA$ = this.http.get<any[]>(apiAUrl).pipe(catchError(() => of([])));
    const getPeopleB$ = this.http.get<any[]>(apiBUrl).pipe(catchError(() => of([])));

    // Step 2: Delete them all
    return forkJoin([getPeopleA$, getPeopleB$]).pipe(
      switchMap(([peopleA, peopleB]) => {
        const deleteRequests = [
          ...peopleA.map(user => this.http.delete(`${apiAUrl}/${user.id}`)),
          ...peopleB.map(user => this.http.delete(`${apiBUrl}/${user.id}`))
        ];
        return forkJoin(deleteRequests);
      })
    );
  }
}
