import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, find } from 'rxjs';
import { User } from './User';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  readonly url = 'http://localhost:3000/users';

  loginStatus: boolean;
  currentUser!: User;
  // /posts/1/comments?_start=20&_end=30

  constructor(private http: HttpClient) {
    this.loginStatus = false;
    this.currentUser = new User();

    console.log('My intial global variable value is: ' + this.loginStatus);
  }
  private subject = new BehaviorSubject<any>(true);
  private subj = new BehaviorSubject<any>(null);
  sendMessage(message: boolean) {
    this.subject.next(message); //all subscribers get the new value
  }

  getMessage() {
    return this.subject.asObservable();
  }

  getUser(userId: string, pwd: string): Observable<User> {
     return this.http.get<User>(`${this.url}?email=${userId}&password=${pwd}`);
  }
  register(user: User): Observable<User> {
    return this.http.post<User>(this.url, user);
  }
  public setLoginStatus(user: boolean) {
    console.log('set status: ' + this.loginStatus);
    this.loginStatus = user;
  }
  public getLoginStatus(): Boolean {
    console.log('My intial global variable value is: ' + this.loginStatus);
    return this.loginStatus;
  }
  public setCurrentUser(user: User) {
    this.subject.next(user);
  }
  public getCurrentUser() {
    return this.subj.asObservable();
  }
}
