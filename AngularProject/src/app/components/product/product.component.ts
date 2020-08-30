import { Component, OnInit,  ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
@ViewChild("videoPlayer", { static: false }) videoplayer: ElementRef;
  constructor() { }

  ngOnInit() {
  }
  toggleVideo(event: any) {
    this.videoplayer.nativeElement.play();
  }

}
