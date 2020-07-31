import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { map, first } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import * as firebase from 'firebase'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  currentUser: firebase.User
  currentUser$: Observable<firebase.User>

  constructor(private angularFireAuth: AngularFireAuth, private translateService: TranslateService) {
    this.currentUser$ = this.angularFireAuth.user
    this.angularFireAuth.user.subscribe(user => this.currentUser = user)
  }

  login(email: string, password: string): Promise<firebase.auth.UserCredential> {
    return this.angularFireAuth.signInWithEmailAndPassword(email, password)
  }

  isAuthenticated(): Observable<boolean> {
    return this.angularFireAuth.user.pipe(map(user => user != null && user.uid != null), first())
  }

  logout(): Promise<void> {
    return this.angularFireAuth.signOut()
  }

  register(email: string, password: string): Promise<firebase.auth.UserCredential> {
    return this.angularFireAuth.createUserWithEmailAndPassword(email, password)
  }

  getUser(): Observable<firebase.User> {
    return this.angularFireAuth.user.pipe(first())
  }

  async sendPasswordReset() {
    // Doing like that because with angularfire it doesn't work
    firebase.auth().languageCode = this.translateService.defaultLang
    this.angularFireAuth.sendPasswordResetEmail(this.currentUser.email)
  }
}
