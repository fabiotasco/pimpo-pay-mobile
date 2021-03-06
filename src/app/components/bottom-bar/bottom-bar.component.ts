import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter, Input } from '@angular/core';
import { AnimationCurve } from 'tns-core-modules/ui/enums';
import { screen } from 'tns-core-modules/platform';

@Component({
  moduleId: module.id,
  selector: 'PimpoBottomBar,[PimpoBottomBar]',
  templateUrl: './bottom-bar.component.html'
})
export class BottomBarComponent implements OnInit {
  @ViewChild('tabHighlight') tabHighlight: ElementRef;
  @Input()
  selectedTab: number = 0;

  @ViewChild('image1') image1: ElementRef;
  @ViewChild('image2') image2: ElementRef;
  @ViewChild('image3') image3: ElementRef;
  @ViewChild('image4') image4: ElementRef;
  @ViewChild('image5') image5: ElementRef;

  @Output() tabSelected = new EventEmitter<any>();
  constructor() {}

  ngOnInit() {}

  selectTab(index: number, tabName: string) {
    let previousTab = this.selectedTab;
    if (index != this.selectedTab) {
      this.selectedTab = index;
      this.tabHighlight.nativeElement.animate({
        translate: { x: (index * screen.mainScreen.widthDIPs) / 5, y: 0 },
        curve: AnimationCurve.cubicBezier(0.01, 0.02, 0.45, 0.93),
        duration: 200
      });
      this.animateCurrentImage(this.getImage(index));
      this.animatePreviousImage(this.getImage(previousTab));
      this.tabSelected.emit({ tabIndex: this.selectedTab, tabName: tabName });
    }
  }

  getImage(index) {
    let currentImage;
    switch (index) {
      case 0:
        currentImage = this.image1;
        break;
      case 1:
        currentImage = this.image2;
        break;
      case 2:
        currentImage = this.image3;
        break;
      case 3:
        currentImage = this.image4;
        break;
      case 4:
        currentImage = this.image5;
        break;
      default:
        break;
    }
    return currentImage;
  }

  animateCurrentImage(arg: any) {
    arg.nativeElement.animate({
      scale: { x: 1.3, y: 1.3 },
      curve: AnimationCurve.cubicBezier(1, 0.02, 0.45, 0.93),
      duration: 300
    });
  }

  animatePreviousImage(arg: any) {
    arg.nativeElement.animate({
      scale: { x: 1, y: 1 },
      curve: AnimationCurve.cubicBezier(1, 0.02, 0.45, 0.93),
      duration: 300
    });
  }
}
