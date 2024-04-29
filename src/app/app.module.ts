import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import{ AngularFireModule} from '@angular/fire/compat';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import {AngularFireAuth, AngularFireAuthModule} from '@angular/fire/compat/auth';
import { environment } from 'src/environments/environment';
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule, 
    provideFirebaseApp(() => initializeApp({"projectId":"moveeasy-882f3","appId":"1:152366760083:web:e55f1064f2c86814ca0d66","storageBucket":"moveeasy-882f3.appspot.com","apiKey":"AIzaSyDDSRsPcVOznOBouVjJefj500yf1zO4Uko","authDomain":"moveeasy-882f3.firebaseapp.com","messagingSenderId":"152366760083","measurementId":"G-WWLDHJTHBS"})), provideAuth(() => getAuth()), provideFirestore(() => getFirestore()),
    AngularFireModule,
    AngularFireAuthModule, 
    AngularFireModule.initializeApp(environment.firebaseConfig)
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
