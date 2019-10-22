import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { Router } from '@angular/router';
import { AppService } from '../services/app.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  selectedFile: any = '';
  img;
  error;
  preview;
  window = window;
  svg;
  images = [];
  imageFormats = {
    '1024*1024': { width: '1024', height: '1024' },
    '755*450': { width: '755', height: '450' },
    '365*450': { width: '365', height: '450' },
    '755*212': { width: '755', height: '212' },
    '380*380': { width: '380', height: '380' }
  };
  showLoader = false;

  @ViewChild('tiffCanvasContainer', { read: false, static: false })
  tiffCanvasContainer: ElementRef;
  public tiffCanvas: HTMLCanvasElement;

  constructor(private firebaseService: FirebaseService, private router: Router, private appService: AppService) { }

  onFileSelect(e) {
    this.error = '';
    this.selectedFile = '';
    const reader = new FileReader();
    if (e.target.files && e.target.files.length) {
      const file = e.target.files[0];

      const img = new Image();
      img.src = this.window.URL.createObjectURL(file);

      reader.readAsDataURL(file);
      reader.onload = () => {
        const width = img.naturalWidth;
        const height = img.naturalHeight;

        this.window.URL.revokeObjectURL(img.src);

        if (width !== 1024 || height !== 1024) {
          this.error = 'Image should be in 1024 * 1024 resolution only';
        } else {
          this.selectedFile = reader.result;
          this.img = document.createElement('img');
          this.img.src = this.selectedFile;
        }
      };
    }
  }

  onSubmit() {
    if (!this.error) {
      this.showLoader = true;
      // tslint:disable-next-line: no-string-literal
      this.imageFormats['1024*1024']['blob'] = this.selectedFile;
      const keys = Object.keys(this.imageFormats);
      for (let index = 1; index < keys.length; index++) {
        const format = this.imageFormats[keys[index]];
        this.createCanvas(format, keys[index]);
        this.getImageFromCanvas(format, keys[index]);
      }
      this.firebaseService.saveImage(this.images).subscribe(res => {
        console.log(res);
        this.appService.activeId = res.id;
        this.router.navigate(['results']);
      });
      console.log(this.images);
    }
  }

  createCanvas(data, id) {
    const canv = document.createElement('canvas');
    canv.width = data.width;
    canv.height = data.height;
    canv.id = id;

    canv.setAttribute('style', 'display: none');

    const ctx = canv.getContext('2d');
    ctx.drawImage(this.img, 0, 0);
    this.tiffCanvasContainer.nativeElement.appendChild(canv);
  }

  getImageFromCanvas(format, id) {
    const canvEle: any = document.getElementById(id);
    const ctx = canvEle.getContext('2d');

    const img = new Image();
    img.src = canvEle.toDataURL();

    this.images.push({id, base64: img.src});
  }

}
