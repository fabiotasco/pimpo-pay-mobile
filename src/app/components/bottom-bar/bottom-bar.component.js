"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var enums_1 = require("tns-core-modules/ui/enums");
var platform_1 = require("tns-core-modules/platform");
var BottomBarComponent = /** @class */ (function () {
    function BottomBarComponent() {
        this.selectedTab = 0;
        this.tabSelected = new core_1.EventEmitter();
    }
    BottomBarComponent.prototype.ngOnInit = function () { };
    BottomBarComponent.prototype.selectTab = function (index, tabName) {
        var previousTab = this.selectedTab;
        if (index != this.selectedTab) {
            this.selectedTab = index;
            this.tabHighlight.nativeElement.animate({
                translate: { x: (index * platform_1.screen.mainScreen.widthDIPs) / 5, y: 0 },
                curve: enums_1.AnimationCurve.cubicBezier(0.01, 0.02, 0.45, 0.93),
                duration: 200
            });
            this.animateCurrentImage(this.getImage(index));
            this.animatePreviousImage(this.getImage(previousTab));
            this.tabSelected.emit({ tabIndex: this.selectedTab, tabName: tabName });
        }
    };
    BottomBarComponent.prototype.getImage = function (index) {
        var currentImage;
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
    };
    BottomBarComponent.prototype.animateCurrentImage = function (arg) {
        arg.nativeElement.animate({
            scale: { x: 1.3, y: 1.3 },
            curve: enums_1.AnimationCurve.cubicBezier(1, 0.02, 0.45, 0.93),
            duration: 300
        });
    };
    BottomBarComponent.prototype.animatePreviousImage = function (arg) {
        arg.nativeElement.animate({
            scale: { x: 1, y: 1 },
            curve: enums_1.AnimationCurve.cubicBezier(1, 0.02, 0.45, 0.93),
            duration: 300
        });
    };
    __decorate([
        core_1.ViewChild('tabHighlight'),
        __metadata("design:type", core_1.ElementRef)
    ], BottomBarComponent.prototype, "tabHighlight", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], BottomBarComponent.prototype, "selectedTab", void 0);
    __decorate([
        core_1.ViewChild('image1'),
        __metadata("design:type", core_1.ElementRef)
    ], BottomBarComponent.prototype, "image1", void 0);
    __decorate([
        core_1.ViewChild('image2'),
        __metadata("design:type", core_1.ElementRef)
    ], BottomBarComponent.prototype, "image2", void 0);
    __decorate([
        core_1.ViewChild('image3'),
        __metadata("design:type", core_1.ElementRef)
    ], BottomBarComponent.prototype, "image3", void 0);
    __decorate([
        core_1.ViewChild('image4'),
        __metadata("design:type", core_1.ElementRef)
    ], BottomBarComponent.prototype, "image4", void 0);
    __decorate([
        core_1.ViewChild('image5'),
        __metadata("design:type", core_1.ElementRef)
    ], BottomBarComponent.prototype, "image5", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], BottomBarComponent.prototype, "tabSelected", void 0);
    BottomBarComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'PimpoBottomBar,[PimpoBottomBar]',
            templateUrl: './bottom-bar.component.html',
            styleUrls: ['./bottom-bar.component.css']
        }),
        __metadata("design:paramtypes", [])
    ], BottomBarComponent);
    return BottomBarComponent;
}());
exports.BottomBarComponent = BottomBarComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYm90dG9tLWJhci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJib3R0b20tYmFyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQVF1QjtBQUN2QixtREFBMkQ7QUFDM0Qsc0RBQW1EO0FBUW5EO0lBWUU7UUFUQSxnQkFBVyxHQUFXLENBQUMsQ0FBQztRQVFkLGdCQUFXLEdBQUcsSUFBSSxtQkFBWSxFQUFPLENBQUM7SUFDakMsQ0FBQztJQUVoQixxQ0FBUSxHQUFSLGNBQVksQ0FBQztJQUViLHNDQUFTLEdBQVQsVUFBVSxLQUFhLEVBQUUsT0FBZTtRQUN0QyxJQUFJLFdBQVcsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDO1FBQ25DLElBQUksS0FBSyxJQUFJLElBQUksQ0FBQyxXQUFXLEVBQUU7WUFDN0IsSUFBSSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7WUFDekIsSUFBSSxDQUFDLFlBQVksQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDO2dCQUN0QyxTQUFTLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxLQUFLLEdBQUcsaUJBQU0sQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUU7Z0JBQ2pFLEtBQUssRUFBRSxzQkFBYyxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUM7Z0JBQ3pELFFBQVEsRUFBRSxHQUFHO2FBQ2QsQ0FBQyxDQUFDO1lBQ0gsSUFBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUMvQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO1lBQ3RELElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEVBQUUsUUFBUSxFQUFFLElBQUksQ0FBQyxXQUFXLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxDQUFDLENBQUM7U0FDekU7SUFDSCxDQUFDO0lBRUQscUNBQVEsR0FBUixVQUFTLEtBQUs7UUFDWixJQUFJLFlBQVksQ0FBQztRQUNqQixRQUFRLEtBQUssRUFBRTtZQUNiLEtBQUssQ0FBQztnQkFDSixZQUFZLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztnQkFDM0IsTUFBTTtZQUNSLEtBQUssQ0FBQztnQkFDSixZQUFZLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztnQkFDM0IsTUFBTTtZQUNSLEtBQUssQ0FBQztnQkFDSixZQUFZLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztnQkFDM0IsTUFBTTtZQUNSLEtBQUssQ0FBQztnQkFDSixZQUFZLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztnQkFDM0IsTUFBTTtZQUNSLEtBQUssQ0FBQztnQkFDSixZQUFZLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztnQkFDM0IsTUFBTTtZQUNSO2dCQUNFLE1BQU07U0FDVDtRQUNELE9BQU8sWUFBWSxDQUFDO0lBQ3RCLENBQUM7SUFFRCxnREFBbUIsR0FBbkIsVUFBb0IsR0FBUTtRQUMxQixHQUFHLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQztZQUN4QixLQUFLLEVBQUUsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUU7WUFDekIsS0FBSyxFQUFFLHNCQUFjLENBQUMsV0FBVyxDQUFDLENBQUMsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQztZQUN0RCxRQUFRLEVBQUUsR0FBRztTQUNkLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCxpREFBb0IsR0FBcEIsVUFBcUIsR0FBUTtRQUMzQixHQUFHLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQztZQUN4QixLQUFLLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUU7WUFDckIsS0FBSyxFQUFFLHNCQUFjLENBQUMsV0FBVyxDQUFDLENBQUMsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQztZQUN0RCxRQUFRLEVBQUUsR0FBRztTQUNkLENBQUMsQ0FBQztJQUNMLENBQUM7SUFwRTBCO1FBQTFCLGdCQUFTLENBQUMsY0FBYyxDQUFDO2tDQUFlLGlCQUFVOzREQUFDO0lBRXBEO1FBREMsWUFBSyxFQUFFOzsyREFDZ0I7SUFFSDtRQUFwQixnQkFBUyxDQUFDLFFBQVEsQ0FBQztrQ0FBUyxpQkFBVTtzREFBQztJQUNuQjtRQUFwQixnQkFBUyxDQUFDLFFBQVEsQ0FBQztrQ0FBUyxpQkFBVTtzREFBQztJQUNuQjtRQUFwQixnQkFBUyxDQUFDLFFBQVEsQ0FBQztrQ0FBUyxpQkFBVTtzREFBQztJQUNuQjtRQUFwQixnQkFBUyxDQUFDLFFBQVEsQ0FBQztrQ0FBUyxpQkFBVTtzREFBQztJQUNuQjtRQUFwQixnQkFBUyxDQUFDLFFBQVEsQ0FBQztrQ0FBUyxpQkFBVTtzREFBQztJQUU5QjtRQUFULGFBQU0sRUFBRTs7MkRBQXVDO0lBWHJDLGtCQUFrQjtRQU45QixnQkFBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFFBQVEsRUFBRSxpQ0FBaUM7WUFDM0MsV0FBVyxFQUFFLDZCQUE2QjtZQUMxQyxTQUFTLEVBQUUsQ0FBQyw0QkFBNEIsQ0FBQztTQUMxQyxDQUFDOztPQUNXLGtCQUFrQixDQXNFOUI7SUFBRCx5QkFBQztDQUFBLEFBdEVELElBc0VDO0FBdEVZLGdEQUFrQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgT25Jbml0LFxuICBWaWV3Q2hpbGQsXG4gIEVsZW1lbnRSZWYsXG4gIE91dHB1dCxcbiAgRXZlbnRFbWl0dGVyLFxuICBJbnB1dFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFuaW1hdGlvbkN1cnZlIH0gZnJvbSAndG5zLWNvcmUtbW9kdWxlcy91aS9lbnVtcyc7XG5pbXBvcnQgeyBzY3JlZW4gfSBmcm9tICd0bnMtY29yZS1tb2R1bGVzL3BsYXRmb3JtJztcblxuQENvbXBvbmVudCh7XG4gIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gIHNlbGVjdG9yOiAnUGltcG9Cb3R0b21CYXIsW1BpbXBvQm90dG9tQmFyXScsXG4gIHRlbXBsYXRlVXJsOiAnLi9ib3R0b20tYmFyLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vYm90dG9tLWJhci5jb21wb25lbnQuY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgQm90dG9tQmFyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgQFZpZXdDaGlsZCgndGFiSGlnaGxpZ2h0JykgdGFiSGlnaGxpZ2h0OiBFbGVtZW50UmVmO1xuICBASW5wdXQoKVxuICBzZWxlY3RlZFRhYjogbnVtYmVyID0gMDtcblxuICBAVmlld0NoaWxkKCdpbWFnZTEnKSBpbWFnZTE6IEVsZW1lbnRSZWY7XG4gIEBWaWV3Q2hpbGQoJ2ltYWdlMicpIGltYWdlMjogRWxlbWVudFJlZjtcbiAgQFZpZXdDaGlsZCgnaW1hZ2UzJykgaW1hZ2UzOiBFbGVtZW50UmVmO1xuICBAVmlld0NoaWxkKCdpbWFnZTQnKSBpbWFnZTQ6IEVsZW1lbnRSZWY7XG4gIEBWaWV3Q2hpbGQoJ2ltYWdlNScpIGltYWdlNTogRWxlbWVudFJlZjtcblxuICBAT3V0cHV0KCkgdGFiU2VsZWN0ZWQgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcbiAgY29uc3RydWN0b3IoKSB7fVxuXG4gIG5nT25Jbml0KCkge31cblxuICBzZWxlY3RUYWIoaW5kZXg6IG51bWJlciwgdGFiTmFtZTogc3RyaW5nKSB7XG4gICAgbGV0IHByZXZpb3VzVGFiID0gdGhpcy5zZWxlY3RlZFRhYjtcbiAgICBpZiAoaW5kZXggIT0gdGhpcy5zZWxlY3RlZFRhYikge1xuICAgICAgdGhpcy5zZWxlY3RlZFRhYiA9IGluZGV4O1xuICAgICAgdGhpcy50YWJIaWdobGlnaHQubmF0aXZlRWxlbWVudC5hbmltYXRlKHtcbiAgICAgICAgdHJhbnNsYXRlOiB7IHg6IChpbmRleCAqIHNjcmVlbi5tYWluU2NyZWVuLndpZHRoRElQcykgLyA1LCB5OiAwIH0sXG4gICAgICAgIGN1cnZlOiBBbmltYXRpb25DdXJ2ZS5jdWJpY0JlemllcigwLjAxLCAwLjAyLCAwLjQ1LCAwLjkzKSxcbiAgICAgICAgZHVyYXRpb246IDIwMFxuICAgICAgfSk7XG4gICAgICB0aGlzLmFuaW1hdGVDdXJyZW50SW1hZ2UodGhpcy5nZXRJbWFnZShpbmRleCkpO1xuICAgICAgdGhpcy5hbmltYXRlUHJldmlvdXNJbWFnZSh0aGlzLmdldEltYWdlKHByZXZpb3VzVGFiKSk7XG4gICAgICB0aGlzLnRhYlNlbGVjdGVkLmVtaXQoeyB0YWJJbmRleDogdGhpcy5zZWxlY3RlZFRhYiwgdGFiTmFtZTogdGFiTmFtZSB9KTtcbiAgICB9XG4gIH1cblxuICBnZXRJbWFnZShpbmRleCkge1xuICAgIGxldCBjdXJyZW50SW1hZ2U7XG4gICAgc3dpdGNoIChpbmRleCkge1xuICAgICAgY2FzZSAwOlxuICAgICAgICBjdXJyZW50SW1hZ2UgPSB0aGlzLmltYWdlMTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDE6XG4gICAgICAgIGN1cnJlbnRJbWFnZSA9IHRoaXMuaW1hZ2UyO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgMjpcbiAgICAgICAgY3VycmVudEltYWdlID0gdGhpcy5pbWFnZTM7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAzOlxuICAgICAgICBjdXJyZW50SW1hZ2UgPSB0aGlzLmltYWdlNDtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDQ6XG4gICAgICAgIGN1cnJlbnRJbWFnZSA9IHRoaXMuaW1hZ2U1O1xuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgICByZXR1cm4gY3VycmVudEltYWdlO1xuICB9XG5cbiAgYW5pbWF0ZUN1cnJlbnRJbWFnZShhcmc6IGFueSkge1xuICAgIGFyZy5uYXRpdmVFbGVtZW50LmFuaW1hdGUoe1xuICAgICAgc2NhbGU6IHsgeDogMS4zLCB5OiAxLjMgfSxcbiAgICAgIGN1cnZlOiBBbmltYXRpb25DdXJ2ZS5jdWJpY0JlemllcigxLCAwLjAyLCAwLjQ1LCAwLjkzKSxcbiAgICAgIGR1cmF0aW9uOiAzMDBcbiAgICB9KTtcbiAgfVxuXG4gIGFuaW1hdGVQcmV2aW91c0ltYWdlKGFyZzogYW55KSB7XG4gICAgYXJnLm5hdGl2ZUVsZW1lbnQuYW5pbWF0ZSh7XG4gICAgICBzY2FsZTogeyB4OiAxLCB5OiAxIH0sXG4gICAgICBjdXJ2ZTogQW5pbWF0aW9uQ3VydmUuY3ViaWNCZXppZXIoMSwgMC4wMiwgMC40NSwgMC45MyksXG4gICAgICBkdXJhdGlvbjogMzAwXG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==