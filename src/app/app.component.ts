import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  selectedFile;
  error;
  preview;
  window = window;
  svg;
  imageFormats =[
    {width: '755', height: '450'},
    {width: '365', height: '450'},
    {width: '755', height: '212'},
    {width: '380', height: '380'}
  ];

  onFileSelect(e) {
    this.error = '';
    const reader = new FileReader();
    if(e.target.files && e.target.files.length) {
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
        }
      };
    }
  }

  onSubmit() {
    console.log(this.selectedFile);
    console.log(this.error);

    if (!this.error) {

      this.imageFormats.forEach(format => {
        this.createSVG(format);
      });
      this.getImageFromSVG();
    }
  }

  createSVG(data) {
    this.svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    this.svg.setAttributeNS(null, 'width', data.width);
    this.svg.setAttributeNS(null, 'height', data.height);
    this.svg.setAttributeNS(null, 'visibility', 'visible');

    const element = document.createElementNS('http://www.w3.org/2000/svg', 'image');
    element.setAttributeNS(null, 'href', this.selectedFile);

    this.svg.appendChild(element);

    document.body.appendChild(this.svg);
    console.log(this.svg);

  }

  getImageFromSVG() {
    const blob = new Blob([this.svg], {type: 'image/svg+xml'});
    const URL = this.window.URL.createObjectURL(blob);
    const image = document.createElement('img');

    image.addEventListener('load', () => this.window.URL.revokeObjectURL(URL), {once: true});

    image.src = URL;
    console.log(image);

    // document.appendChild(image);

  }
}
