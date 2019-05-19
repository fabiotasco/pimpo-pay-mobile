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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYm90dG9tLWJhci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJib3R0b20tYmFyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQU91QjtBQUN2QixtREFBMkQ7QUFDM0Qsc0RBQW1EO0FBUW5EO0lBV0U7UUFUQSxnQkFBVyxHQUFXLENBQUMsQ0FBQztRQVFkLGdCQUFXLEdBQUcsSUFBSSxtQkFBWSxFQUFPLENBQUM7SUFDakMsQ0FBQztJQUVoQixxQ0FBUSxHQUFSLGNBQVksQ0FBQztJQUViLHNDQUFTLEdBQVQsVUFBVSxLQUFhLEVBQUUsT0FBZTtRQUN0QyxJQUFJLFdBQVcsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDO1FBQ25DLElBQUksS0FBSyxJQUFJLElBQUksQ0FBQyxXQUFXLEVBQUU7WUFDN0IsSUFBSSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7WUFDekIsSUFBSSxDQUFDLFlBQVksQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDO2dCQUN0QyxTQUFTLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxLQUFLLEdBQUcsaUJBQU0sQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUU7Z0JBQ2pFLEtBQUssRUFBRSxzQkFBYyxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUM7Z0JBQ3pELFFBQVEsRUFBRSxHQUFHO2FBQ2QsQ0FBQyxDQUFDO1lBQ0gsSUFBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUMvQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO1lBQ3RELElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEVBQUUsUUFBUSxFQUFFLElBQUksQ0FBQyxXQUFXLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxDQUFDLENBQUM7U0FDekU7SUFDSCxDQUFDO0lBRUQscUNBQVEsR0FBUixVQUFTLEtBQUs7UUFDWixJQUFJLFlBQVksQ0FBQztRQUNqQixRQUFRLEtBQUssRUFBRTtZQUNiLEtBQUssQ0FBQztnQkFDSixZQUFZLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztnQkFDM0IsTUFBTTtZQUNSLEtBQUssQ0FBQztnQkFDSixZQUFZLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztnQkFDM0IsTUFBTTtZQUNSLEtBQUssQ0FBQztnQkFDSixZQUFZLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztnQkFDM0IsTUFBTTtZQUNSLEtBQUssQ0FBQztnQkFDSixZQUFZLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztnQkFDM0IsTUFBTTtZQUNSLEtBQUssQ0FBQztnQkFDSixZQUFZLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztnQkFDM0IsTUFBTTtZQUNSO2dCQUNFLE1BQU07U0FDVDtRQUNELE9BQU8sWUFBWSxDQUFDO0lBQ3RCLENBQUM7SUFFRCxnREFBbUIsR0FBbkIsVUFBb0IsR0FBUTtRQUMxQixHQUFHLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQztZQUN4QixLQUFLLEVBQUUsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUU7WUFDekIsS0FBSyxFQUFFLHNCQUFjLENBQUMsV0FBVyxDQUFDLENBQUMsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQztZQUN0RCxRQUFRLEVBQUUsR0FBRztTQUNkLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCxpREFBb0IsR0FBcEIsVUFBcUIsR0FBUTtRQUMzQixHQUFHLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQztZQUN4QixLQUFLLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUU7WUFDckIsS0FBSyxFQUFFLHNCQUFjLENBQUMsV0FBVyxDQUFDLENBQUMsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQztZQUN0RCxRQUFRLEVBQUUsR0FBRztTQUNkLENBQUMsQ0FBQztJQUNMLENBQUM7SUFuRTBCO1FBQTFCLGdCQUFTLENBQUMsY0FBYyxDQUFDO2tDQUFlLGlCQUFVOzREQUFDO0lBRy9CO1FBQXBCLGdCQUFTLENBQUMsUUFBUSxDQUFDO2tDQUFTLGlCQUFVO3NEQUFDO0lBQ25CO1FBQXBCLGdCQUFTLENBQUMsUUFBUSxDQUFDO2tDQUFTLGlCQUFVO3NEQUFDO0lBQ25CO1FBQXBCLGdCQUFTLENBQUMsUUFBUSxDQUFDO2tDQUFTLGlCQUFVO3NEQUFDO0lBQ25CO1FBQXBCLGdCQUFTLENBQUMsUUFBUSxDQUFDO2tDQUFTLGlCQUFVO3NEQUFDO0lBQ25CO1FBQXBCLGdCQUFTLENBQUMsUUFBUSxDQUFDO2tDQUFTLGlCQUFVO3NEQUFDO0lBRTlCO1FBQVQsYUFBTSxFQUFFOzsyREFBdUM7SUFWckMsa0JBQWtCO1FBTjlCLGdCQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsUUFBUSxFQUFFLGlDQUFpQztZQUMzQyxXQUFXLEVBQUUsNkJBQTZCO1lBQzFDLFNBQVMsRUFBRSxDQUFDLDRCQUE0QixDQUFDO1NBQzFDLENBQUM7O09BQ1csa0JBQWtCLENBcUU5QjtJQUFELHlCQUFDO0NBQUEsQUFyRUQsSUFxRUM7QUFyRVksZ0RBQWtCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBPbkluaXQsXG4gIFZpZXdDaGlsZCxcbiAgRWxlbWVudFJlZixcbiAgT3V0cHV0LFxuICBFdmVudEVtaXR0ZXJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBbmltYXRpb25DdXJ2ZSB9IGZyb20gJ3Rucy1jb3JlLW1vZHVsZXMvdWkvZW51bXMnO1xuaW1wb3J0IHsgc2NyZWVuIH0gZnJvbSAndG5zLWNvcmUtbW9kdWxlcy9wbGF0Zm9ybSc7XG5cbkBDb21wb25lbnQoe1xuICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICBzZWxlY3RvcjogJ1BpbXBvQm90dG9tQmFyLFtQaW1wb0JvdHRvbUJhcl0nLFxuICB0ZW1wbGF0ZVVybDogJy4vYm90dG9tLWJhci5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL2JvdHRvbS1iYXIuY29tcG9uZW50LmNzcyddXG59KVxuZXhwb3J0IGNsYXNzIEJvdHRvbUJhckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIEBWaWV3Q2hpbGQoJ3RhYkhpZ2hsaWdodCcpIHRhYkhpZ2hsaWdodDogRWxlbWVudFJlZjtcbiAgc2VsZWN0ZWRUYWI6IG51bWJlciA9IDA7XG5cbiAgQFZpZXdDaGlsZCgnaW1hZ2UxJykgaW1hZ2UxOiBFbGVtZW50UmVmO1xuICBAVmlld0NoaWxkKCdpbWFnZTInKSBpbWFnZTI6IEVsZW1lbnRSZWY7XG4gIEBWaWV3Q2hpbGQoJ2ltYWdlMycpIGltYWdlMzogRWxlbWVudFJlZjtcbiAgQFZpZXdDaGlsZCgnaW1hZ2U0JykgaW1hZ2U0OiBFbGVtZW50UmVmO1xuICBAVmlld0NoaWxkKCdpbWFnZTUnKSBpbWFnZTU6IEVsZW1lbnRSZWY7XG5cbiAgQE91dHB1dCgpIHRhYlNlbGVjdGVkID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIGNvbnN0cnVjdG9yKCkge31cblxuICBuZ09uSW5pdCgpIHt9XG5cbiAgc2VsZWN0VGFiKGluZGV4OiBudW1iZXIsIHRhYk5hbWU6IHN0cmluZykge1xuICAgIGxldCBwcmV2aW91c1RhYiA9IHRoaXMuc2VsZWN0ZWRUYWI7XG4gICAgaWYgKGluZGV4ICE9IHRoaXMuc2VsZWN0ZWRUYWIpIHtcbiAgICAgIHRoaXMuc2VsZWN0ZWRUYWIgPSBpbmRleDtcbiAgICAgIHRoaXMudGFiSGlnaGxpZ2h0Lm5hdGl2ZUVsZW1lbnQuYW5pbWF0ZSh7XG4gICAgICAgIHRyYW5zbGF0ZTogeyB4OiAoaW5kZXggKiBzY3JlZW4ubWFpblNjcmVlbi53aWR0aERJUHMpIC8gNSwgeTogMCB9LFxuICAgICAgICBjdXJ2ZTogQW5pbWF0aW9uQ3VydmUuY3ViaWNCZXppZXIoMC4wMSwgMC4wMiwgMC40NSwgMC45MyksXG4gICAgICAgIGR1cmF0aW9uOiAyMDBcbiAgICAgIH0pO1xuICAgICAgdGhpcy5hbmltYXRlQ3VycmVudEltYWdlKHRoaXMuZ2V0SW1hZ2UoaW5kZXgpKTtcbiAgICAgIHRoaXMuYW5pbWF0ZVByZXZpb3VzSW1hZ2UodGhpcy5nZXRJbWFnZShwcmV2aW91c1RhYikpO1xuICAgICAgdGhpcy50YWJTZWxlY3RlZC5lbWl0KHsgdGFiSW5kZXg6IHRoaXMuc2VsZWN0ZWRUYWIsIHRhYk5hbWU6IHRhYk5hbWUgfSk7XG4gICAgfVxuICB9XG5cbiAgZ2V0SW1hZ2UoaW5kZXgpIHtcbiAgICBsZXQgY3VycmVudEltYWdlO1xuICAgIHN3aXRjaCAoaW5kZXgpIHtcbiAgICAgIGNhc2UgMDpcbiAgICAgICAgY3VycmVudEltYWdlID0gdGhpcy5pbWFnZTE7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAxOlxuICAgICAgICBjdXJyZW50SW1hZ2UgPSB0aGlzLmltYWdlMjtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDI6XG4gICAgICAgIGN1cnJlbnRJbWFnZSA9IHRoaXMuaW1hZ2UzO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgMzpcbiAgICAgICAgY3VycmVudEltYWdlID0gdGhpcy5pbWFnZTQ7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSA0OlxuICAgICAgICBjdXJyZW50SW1hZ2UgPSB0aGlzLmltYWdlNTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICBicmVhaztcbiAgICB9XG4gICAgcmV0dXJuIGN1cnJlbnRJbWFnZTtcbiAgfVxuXG4gIGFuaW1hdGVDdXJyZW50SW1hZ2UoYXJnOiBhbnkpIHtcbiAgICBhcmcubmF0aXZlRWxlbWVudC5hbmltYXRlKHtcbiAgICAgIHNjYWxlOiB7IHg6IDEuMywgeTogMS4zIH0sXG4gICAgICBjdXJ2ZTogQW5pbWF0aW9uQ3VydmUuY3ViaWNCZXppZXIoMSwgMC4wMiwgMC40NSwgMC45MyksXG4gICAgICBkdXJhdGlvbjogMzAwXG4gICAgfSk7XG4gIH1cblxuICBhbmltYXRlUHJldmlvdXNJbWFnZShhcmc6IGFueSkge1xuICAgIGFyZy5uYXRpdmVFbGVtZW50LmFuaW1hdGUoe1xuICAgICAgc2NhbGU6IHsgeDogMSwgeTogMSB9LFxuICAgICAgY3VydmU6IEFuaW1hdGlvbkN1cnZlLmN1YmljQmV6aWVyKDEsIDAuMDIsIDAuNDUsIDAuOTMpLFxuICAgICAgZHVyYXRpb246IDMwMFxuICAgIH0pO1xuICB9XG59XG4iXX0=