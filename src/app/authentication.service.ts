import { Injectable } from '@angular/core';
import firebase from 'firebase/compat/app';
import { AngularFireAuth } from '@angular/fire/compat/auth';



@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  constructor(public ngFireAuth:AngularFireAuth) { }
  
  isAuthenticated(): boolean {
   return !!this.getToken();
  }

 getToken(): string | null {
   return localStorage.getItem('token');
 }

  async registerUser(email:string,password:string){
    return await this.ngFireAuth.createUserWithEmailAndPassword(email,password)

  }
 
  async loginUser(email: string, password: string): Promise<any> {
    try {
      const userCredential = await this.ngFireAuth.signInWithEmailAndPassword(email, password);
      localStorage.setItem('token', userCredential.user?.refreshToken || '');
      return userCredential;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }

  async resetPassword(email:string){
    return await this.ngFireAuth.sendPasswordResetEmail(email)
  }
  async signOut(){
    return await this.ngFireAuth.signOut()
  }
  async getProfile(){
    return await this.ngFireAuth.currentUser
  }
}
