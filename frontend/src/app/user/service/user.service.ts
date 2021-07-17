import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private ROOT_URL = "http://localhost:3000/api/users"
  
  constructor(private http: HttpClient) { }

  register(user: any){
    return this.http.post<any>(`${this.ROOT_URL}/register`, user);
  }
}
