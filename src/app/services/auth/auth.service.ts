import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private angularFireAuth: AngularFireAuth) { }

  login(email: string, password: string): Promise<firebase.auth.UserCredential> {
    return this.angularFireAuth.signInWithEmailAndPassword(email, password)
  }
}
