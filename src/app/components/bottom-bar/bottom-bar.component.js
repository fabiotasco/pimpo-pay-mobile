"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var enums_1 = require("tns-core-modules/ui/enums");
var platform_1 = require("tns-core-modules/platform");
var storage = require("nativescript-localstorage");
var variables_1 = require("~/app/utils/variables");
var BottomBarComponent = /** @class */ (function () {
    function BottomBarComponent() {
        this.selectedTab = 0;
        this.tabSelected = new core_1.EventEmitter();
    }
    BottomBarComponent.prototype.ngOnInit = function () {
        this.acessType = storage.getItem(variables_1.ACCESS);
        this.transactionName =
            this.acessType === variables_1.AccessType.BUSINESS ? 'Venda' : 'Compra';
    };
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
            selector: 'PimpoBottomBar',
            templateUrl: './bottom-bar.component.html',
            styleUrls: ['./bottom-bar.component.css']
        }),
        __metadata("design:paramtypes", [])
    ], BottomBarComponent);
    return BottomBarComponent;
}());
exports.BottomBarComponent = BottomBarComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYm90dG9tLWJhci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJib3R0b20tYmFyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQU91QjtBQUN2QixtREFBMkQ7QUFDM0Qsc0RBQW1EO0FBQ25ELG1EQUFxRDtBQUNyRCxtREFBMkQ7QUFRM0Q7SUFhRTtRQVhBLGdCQUFXLEdBQVcsQ0FBQyxDQUFDO1FBVWQsZ0JBQVcsR0FBRyxJQUFJLG1CQUFZLEVBQU8sQ0FBQztJQUNqQyxDQUFDO0lBRWhCLHFDQUFRLEdBQVI7UUFDRSxJQUFJLENBQUMsU0FBUyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsa0JBQU0sQ0FBQyxDQUFDO1FBQ3pDLElBQUksQ0FBQyxlQUFlO1lBQ2xCLElBQUksQ0FBQyxTQUFTLEtBQUssc0JBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDO0lBQ2hFLENBQUM7SUFFRCxzQ0FBUyxHQUFULFVBQVUsS0FBYSxFQUFFLE9BQWU7UUFDdEMsSUFBSSxXQUFXLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQztRQUNuQyxJQUFJLEtBQUssSUFBSSxJQUFJLENBQUMsV0FBVyxFQUFFO1lBQzdCLElBQUksQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDO1lBQ3pCLElBQUksQ0FBQyxZQUFZLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQztnQkFDdEMsU0FBUyxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsS0FBSyxHQUFHLGlCQUFNLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFO2dCQUNqRSxLQUFLLEVBQUUsc0JBQWMsQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDO2dCQUN6RCxRQUFRLEVBQUUsR0FBRzthQUNkLENBQUMsQ0FBQztZ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biAgRWxlbWVudFJlZixcbiAgT3V0cHV0LFxuICBFdmVudEVtaXR0ZXJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBbmltYXRpb25DdXJ2ZSB9IGZyb20gJ3Rucy1jb3JlLW1vZHVsZXMvdWkvZW51bXMnO1xuaW1wb3J0IHsgc2NyZWVuIH0gZnJvbSAndG5zLWNvcmUtbW9kdWxlcy9wbGF0Zm9ybSc7XG5pbXBvcnQgKiBhcyBzdG9yYWdlIGZyb20gJ25hdGl2ZXNjcmlwdC1sb2NhbHN0b3JhZ2UnO1xuaW1wb3J0IHsgQUNDRVNTLCBBY2Nlc3NUeXBlIH0gZnJvbSAnfi9hcHAvdXRpbHMvdmFyaWFibGVzJztcblxuQENvbXBvbmVudCh7XG4gIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gIHNlbGVjdG9yOiAnUGltcG9Cb3R0b21CYXInLFxuICB0ZW1wbGF0ZVVybDogJy4vYm90dG9tLWJhci5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL2JvdHRvbS1iYXIuY29tcG9uZW50LmNzcyddXG59KVxuZXhwb3J0IGNsYXNzIEJvdHRvbUJhckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIEBWaWV3Q2hpbGQoJ3RhYkhpZ2hsaWdodCcpIHRhYkhpZ2hsaWdodDogRWxlbWVudFJlZjtcbiAgc2VsZWN0ZWRUYWI6IG51bWJlciA9IDA7XG4gIGFjZXNzVHlwZTogc3RyaW5nO1xuXG4gIEBWaWV3Q2hpbGQoJ2ltYWdlMScpIGltYWdlMTogRWxlbWVudFJlZjtcbiAgQFZpZXdDaGlsZCgnaW1hZ2UyJykgaW1hZ2UyOiBFbGVtZW50UmVmO1xuICBAVmlld0NoaWxkKCdpbWFnZTMnKSBpbWFnZTM6IEVsZW1lbnRSZWY7XG4gIEBWaWV3Q2hpbGQoJ2ltYWdlNCcpIGltYWdlNDogRWxlbWVudFJlZjtcbiAgQFZpZXdDaGlsZCgnaW1hZ2U1JykgaW1hZ2U1OiBFbGVtZW50UmVmO1xuICB0cmFuc2FjdGlvbk5hbWU6IHN0cmluZztcblxuICBAT3V0cHV0KCkgdGFiU2VsZWN0ZWQgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcbiAgY29uc3RydWN0b3IoKSB7fVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuYWNlc3NUeXBlID0gc3RvcmFnZS5nZXRJdGVtKEFDQ0VTUyk7XG4gICAgdGhpcy50cmFuc2FjdGlvbk5hbWUgPVxuICAgICAgdGhpcy5hY2Vzc1R5cGUgPT09IEFjY2Vzc1R5cGUuQlVTSU5FU1MgPyAnVmVuZGEnIDogJ0NvbXByYSc7XG4gIH1cblxuICBzZWxlY3RUYWIoaW5kZXg6IG51bWJlciwgdGFiTmFtZTogc3RyaW5nKSB7XG4gICAgbGV0IHByZXZpb3VzVGFiID0gdGhpcy5zZWxlY3RlZFRhYjtcbiAgICBpZiAoaW5kZXggIT0gdGhpcy5zZWxlY3RlZFRhYikge1xuICAgICAgdGhpcy5zZWxlY3RlZFRhYiA9IGluZGV4O1xuICAgICAgdGhpcy50YWJIaWdobGlnaHQubmF0aXZlRWxlbWVudC5hbmltYXRlKHtcbiAgICAgICAgdHJhbnNsYXRlOiB7IHg6IChpbmRleCAqIHNjcmVlbi5tYWluU2NyZWVuLndpZHRoRElQcykgLyA1LCB5OiAwIH0sXG4gICAgICAgIGN1cnZlOiBBbmltYXRpb25DdXJ2ZS5jdWJpY0JlemllcigwLjAxLCAwLjAyLCAwLjQ1LCAwLjkzKSxcbiAgICAgICAgZHVyYXRpb246IDIwMFxuICAgICAgfSk7XG4gICAgICB0aGlzLmFuaW1hdGVDdXJyZW50SW1hZ2UodGhpcy5nZXRJbWFnZShpbmRleCkpO1xuICAgICAgdGhpcy5hbmltYXRlUHJldmlvdXNJbWFnZSh0aGlzLmdldEltYWdlKHByZXZpb3VzVGFiKSk7XG4gICAgICB0aGlzLnRhYlNlbGVjdGVkLmVtaXQoeyB0YWJJbmRleDogdGhpcy5zZWxlY3RlZFRhYiwgdGFiTmFtZTogdGFiTmFtZSB9KTtcbiAgICB9XG4gIH1cblxuICBnZXRJbWFnZShpbmRleDogYW55KSB7XG4gICAgbGV0IGN1cnJlbnRJbWFnZTogYW55O1xuICAgIHN3aXRjaCAoaW5kZXgpIHtcbiAgICAgIGNhc2UgMDpcbiAgICAgICAgY3VycmVudEltYWdlID0gdGhpcy5pbWFnZTE7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAxOlxuICAgICAgICBjdXJyZW50SW1hZ2UgPSB0aGlzLmltYWdlMjtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDI6XG4gICAgICAgIGN1cnJlbnRJbWFnZSA9IHRoaXMuaW1hZ2UzO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgMzpcbiAgICAgICAgY3VycmVudEltYWdlID0gdGhpcy5pbWFnZTQ7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSA0OlxuICAgICAgICBjdXJyZW50SW1hZ2UgPSB0aGlzLmltYWdlNTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICBicmVhaztcbiAgICB9XG4gICAgcmV0dXJuIGN1cnJlbnRJbWFnZTtcbiAgfVxuXG4gIGFuaW1hdGVDdXJyZW50SW1hZ2UoYXJnOiBhbnkpIHtcbiAgICBhcmcubmF0aXZlRWxlbWVudC5hbmltYXRlKHtcbiAgICAgIHNjYWxlOiB7IHg6IDEuMywgeTogMS4zIH0sXG4gICAgICBjdXJ2ZTogQW5pbWF0aW9uQ3VydmUuY3ViaWNCZXppZXIoMSwgMC4wMiwgMC40NSwgMC45MyksXG4gICAgICBkdXJhdGlvbjogMzAwXG4gICAgfSk7XG4gIH1cblxuICBhbmltYXRlUHJldmlvdXNJbWFnZShhcmc6IGFueSkge1xuICAgIGFyZy5uYXRpdmVFbGVtZW50LmFuaW1hdGUoe1xuICAgICAgc2NhbGU6IHsgeDogMSwgeTogMSB9LFxuICAgICAgY3VydmU6IEFuaW1hdGlvbkN1cnZlLmN1YmljQmV6aWVyKDEsIDAuMDIsIDAuNDUsIDAuOTMpLFxuICAgICAgZHVyYXRpb246IDMwMFxuICAgIH0pO1xuICB9XG59XG4iXX0=