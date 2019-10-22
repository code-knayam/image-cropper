import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as firebase from 'firebase';
import { Observable, Observer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  dbRef;

  constructor(private http: HttpClient) {
    firebase.initializeApp({
      apiKey: 'AIzaSyCApD2cOwJY3hmfbQ8xRREIxVC74QO2s9Q',
      authDomain: 'image-cropper-aceb8.firebaseapp.com',
      databaseURL: 'https://image-cropper-aceb8.firebaseio.com',
      projectId: 'image-cropper-aceb8',
      storageBucket: 'image-cropper-aceb8.appspot.com',
      messagingSenderId: '36976013747',
      appId: '1:36976013747:web:dcdac43c136d619d535bc6',
      measurementId: 'G-0C6EZ11JR9'
    });

    this.dbRef = firebase.database();
  }

  saveImage(data) {
    return Observable.create((observer: Observer<any>) => {
      const newPostRef = this.dbRef.ref('images/').push();
      newPostRef.set(data);
      const key = newPostRef.key;
      observer.next({id: key});
    });
  }

  fetchImageData(id) {
      return this.dbRef.ref('images/' + id).once('value');
  }
}
