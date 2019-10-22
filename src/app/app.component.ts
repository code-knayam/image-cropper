import {
  Component,
  Renderer2,
  ViewChild,
  ElementRef,
  ViewChildren
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { FirebaseService } from './services/firebase.service';
import { Router } from '@angular/router';
import { AppService } from './services/app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
}
