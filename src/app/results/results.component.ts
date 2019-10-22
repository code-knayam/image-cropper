import { Component, OnInit } from '@angular/core';
import { AppService } from '../services/app.service';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {

  imgData;

  constructor(private appService: AppService, private firebaseService: FirebaseService) { }

  ngOnInit() {
    this.firebaseService.fetchImageData(this.appService.activeId).then((snapshot) => {
      console.log(snapshot.val());
      this.imgData = snapshot.val();
      this.parseImages(this.imgData);
    });
  }

  parseImages(data) {

  }

}
