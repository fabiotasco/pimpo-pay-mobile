"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var enums_1 = require("ui/enums");
var platform_1 = require("platform");
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYm90dG9tLWJhci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJib3R0b20tYmFyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQU91QjtBQUN2QixrQ0FBMEM7QUFDMUMscUNBQWtDO0FBQ2xDLG1EQUFxRDtBQUNyRCxtREFBMkQ7QUFRM0Q7SUFhRTtRQVhBLGdCQUFXLEdBQVcsQ0FBQyxDQUFDO1FBVWQsZ0JBQVcsR0FBRyxJQUFJLG1CQUFZLEVBQU8sQ0FBQztJQUNqQyxDQUFDO0lBRWhCLHFDQUFRLEdBQVI7UUFDRSxJQUFJLENBQUMsU0FBUyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsa0JBQU0sQ0FBQyxDQUFDO1FBQ3pDLElBQUksQ0FBQyxlQUFlO1lBQ2xCLElBQUksQ0FBQyxTQUFTLEtBQUssc0JBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDO0lBQ2hFLENBQUM7SUFFRCxzQ0FBUyxHQUFULFVBQVUsS0FBYSxFQUFFLE9BQWU7UUFDdEMsSUFBSSxXQUFXLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQztRQUNuQyxJQUFJLEtBQUssSUFBSSxJQUFJLENBQUMsV0FBVyxFQUFFO1lBQzdCLElBQUksQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDO1lBQ3pCLElBQUksQ0FBQyxZQUFZLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQztnQkFDdEMsU0FBUyxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsS0FBSyxHQUFHLGlCQUFNLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFO2dCQUNqRSxLQUFLLEVBQUUsc0JBQWMsQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDO2dCQUN6RCxRQUFRLEVBQUUsR0FBRzthQUNkLENBQUMsQ0FBQztZ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biAgRWxlbWVudFJlZixcbiAgT3V0cHV0LFxuICBFdmVudEVtaXR0ZXJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBbmltYXRpb25DdXJ2ZSB9IGZyb20gJ3VpL2VudW1zJztcbmltcG9ydCB7IHNjcmVlbiB9IGZyb20gJ3BsYXRmb3JtJztcbmltcG9ydCAqIGFzIHN0b3JhZ2UgZnJvbSAnbmF0aXZlc2NyaXB0LWxvY2Fsc3RvcmFnZSc7XG5pbXBvcnQgeyBBQ0NFU1MsIEFjY2Vzc1R5cGUgfSBmcm9tICd+L2FwcC91dGlscy92YXJpYWJsZXMnO1xuXG5AQ29tcG9uZW50KHtcbiAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgc2VsZWN0b3I6ICdQaW1wb0JvdHRvbUJhcicsXG4gIHRlbXBsYXRlVXJsOiAnLi9ib3R0b20tYmFyLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vYm90dG9tLWJhci5jb21wb25lbnQuY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgQm90dG9tQmFyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgQFZpZXdDaGlsZCgndGFiSGlnaGxpZ2h0JykgdGFiSGlnaGxpZ2h0OiBFbGVtZW50UmVmO1xuICBzZWxlY3RlZFRhYjogbnVtYmVyID0gMDtcbiAgYWNlc3NUeXBlOiBzdHJpbmc7XG5cbiAgQFZpZXdDaGlsZCgnaW1hZ2UxJykgaW1hZ2UxOiBFbGVtZW50UmVmO1xuICBAVmlld0NoaWxkKCdpbWFnZTInKSBpbWFnZTI6IEVsZW1lbnRSZWY7XG4gIEBWaWV3Q2hpbGQoJ2ltYWdlMycpIGltYWdlMzogRWxlbWVudFJlZjtcbiAgQFZpZXdDaGlsZCgnaW1hZ2U0JykgaW1hZ2U0OiBFbGVtZW50UmVmO1xuICBAVmlld0NoaWxkKCdpbWFnZTUnKSBpbWFnZTU6IEVsZW1lbnRSZWY7XG4gIHRyYW5zYWN0aW9uTmFtZTogc3RyaW5nO1xuXG4gIEBPdXRwdXQoKSB0YWJTZWxlY3RlZCA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICBjb25zdHJ1Y3RvcigpIHt9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5hY2Vzc1R5cGUgPSBzdG9yYWdlLmdldEl0ZW0oQUNDRVNTKTtcbiAgICB0aGlzLnRyYW5zYWN0aW9uTmFtZSA9XG4gICAgICB0aGlzLmFjZXNzVHlwZSA9PT0gQWNjZXNzVHlwZS5CVVNJTkVTUyA/ICdWZW5kYScgOiAnQ29tcHJhJztcbiAgfVxuXG4gIHNlbGVjdFRhYihpbmRleDogbnVtYmVyLCB0YWJOYW1lOiBzdHJpbmcpIHtcbiAgICBsZXQgcHJldmlvdXNUYWIgPSB0aGlzLnNlbGVjdGVkVGFiO1xuICAgIGlmIChpbmRleCAhPSB0aGlzLnNlbGVjdGVkVGFiKSB7XG4gICAgICB0aGlzLnNlbGVjdGVkVGFiID0gaW5kZXg7XG4gICAgICB0aGlzLnRhYkhpZ2hsaWdodC5uYXRpdmVFbGVtZW50LmFuaW1hdGUoe1xuICAgICAgICB0cmFuc2xhdGU6IHsgeDogKGluZGV4ICogc2NyZWVuLm1haW5TY3JlZW4ud2lkdGhESVBzKSAvIDUsIHk6IDAgfSxcbiAgICAgICAgY3VydmU6IEFuaW1hdGlvbkN1cnZlLmN1YmljQmV6aWVyKDAuMDEsIDAuMDIsIDAuNDUsIDAuOTMpLFxuICAgICAgICBkdXJhdGlvbjogMjAwXG4gICAgICB9KTtcbiAgICAgIHRoaXMuYW5pbWF0ZUN1cnJlbnRJbWFnZSh0aGlzLmdldEltYWdlKGluZGV4KSk7XG4gICAgICB0aGlzLmFuaW1hdGVQcmV2aW91c0ltYWdlKHRoaXMuZ2V0SW1hZ2UocHJldmlvdXNUYWIpKTtcbiAgICAgIHRoaXMudGFiU2VsZWN0ZWQuZW1pdCh7IHRhYkluZGV4OiB0aGlzLnNlbGVjdGVkVGFiLCB0YWJOYW1lOiB0YWJOYW1lIH0pO1xuICAgIH1cbiAgfVxuXG4gIGdldEltYWdlKGluZGV4OiBhbnkpIHtcbiAgICBsZXQgY3VycmVudEltYWdlOiBhbnk7XG4gICAgc3dpdGNoIChpbmRleCkge1xuICAgICAgY2FzZSAwOlxuICAgICAgICBjdXJyZW50SW1hZ2UgPSB0aGlzLmltYWdlMTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDE6XG4gICAgICAgIGN1cnJlbnRJbWFnZSA9IHRoaXMuaW1hZ2UyO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgMjpcbiAgICAgICAgY3VycmVudEltYWdlID0gdGhpcy5pbWFnZTM7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAzOlxuICAgICAgICBjdXJyZW50SW1hZ2UgPSB0aGlzLmltYWdlNDtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDQ6XG4gICAgICAgIGN1cnJlbnRJbWFnZSA9IHRoaXMuaW1hZ2U1O1xuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgICByZXR1cm4gY3VycmVudEltYWdlO1xuICB9XG5cbiAgYW5pbWF0ZUN1cnJlbnRJbWFnZShhcmc6IGFueSkge1xuICAgIGFyZy5uYXRpdmVFbGVtZW50LmFuaW1hdGUoe1xuICAgICAgc2NhbGU6IHsgeDogMS4zLCB5OiAxLjMgfSxcbiAgICAgIGN1cnZlOiBBbmltYXRpb25DdXJ2ZS5jdWJpY0JlemllcigxLCAwLjAyLCAwLjQ1LCAwLjkzKSxcbiAgICAgIGR1cmF0aW9uOiAzMDBcbiAgICB9KTtcbiAgfVxuXG4gIGFuaW1hdGVQcmV2aW91c0ltYWdlKGFyZzogYW55KSB7XG4gICAgYXJnLm5hdGl2ZUVsZW1lbnQuYW5pbWF0ZSh7XG4gICAgICBzY2FsZTogeyB4OiAxLCB5OiAxIH0sXG4gICAgICBjdXJ2ZTogQW5pbWF0aW9uQ3VydmUuY3ViaWNCZXppZXIoMSwgMC4wMiwgMC40NSwgMC45MyksXG4gICAgICBkdXJhdGlvbjogMzAwXG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==