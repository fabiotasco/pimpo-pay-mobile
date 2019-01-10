"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var global_event_service_1 = require("./services/global-event.service");
var router_1 = require("nativescript-angular/router");
var toast_helper_service_1 = require("./core/toast-helper.service");
var AppComponent = /** @class */ (function () {
    function AppComponent(globalEvent, routes, toastHelper) {
        this.globalEvent = globalEvent;
        this.routes = routes;
        this.toastHelper = toastHelper;
    }
    AppComponent.prototype.ngOnInit = function () {
        this.subscribeEvents();
    };
    AppComponent.prototype.subscribeEvents = function () {
        var _this = this;
        this.globalEvent.loggedIn.subscribe(function () {
            _this.routes.navigate(['/home/balance'], { clearHistory: true });
        });
        this.globalEvent.disconneted.subscribe(function () {
            _this.routes.navigate(['/login'], { clearHistory: true });
        });
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'ns-app',
            moduleId: module.id,
            templateUrl: './app.component.html'
        }),
        __metadata("design:paramtypes", [global_event_service_1.GlobalEventService,
            router_1.RouterExtensions,
            toast_helper_service_1.ToastHelperService])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFwcC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBa0Q7QUFDbEQsd0VBQXFFO0FBQ3JFLHNEQUErRDtBQUMvRCxvRUFBaUU7QUFPakU7SUFDRSxzQkFDVSxXQUErQixFQUMvQixNQUF3QixFQUN4QixXQUErQjtRQUYvQixnQkFBVyxHQUFYLFdBQVcsQ0FBb0I7UUFDL0IsV0FBTSxHQUFOLE1BQU0sQ0FBa0I7UUFDeEIsZ0JBQVcsR0FBWCxXQUFXLENBQW9CO0lBQ3RDLENBQUM7SUFFSiwrQkFBUSxHQUFSO1FBQ0UsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO0lBQ3pCLENBQUM7SUFFTyxzQ0FBZSxHQUF2QjtRQUFBLGlCQVFDO1FBUEMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDO1lBQ2xDLEtBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsZUFBZSxDQUFDLEVBQUUsRUFBRSxZQUFZLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztRQUNsRSxDQUFDLENBQUMsQ0FBQztRQUVILElBQUksQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQztZQUNyQyxLQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxFQUFFLEVBQUUsWUFBWSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7UUFDM0QsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBbkJVLFlBQVk7UUFMeEIsZ0JBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxRQUFRO1lBQ2xCLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixXQUFXLEVBQUUsc0JBQXNCO1NBQ3BDLENBQUM7eUNBR3VCLHlDQUFrQjtZQUN2Qix5QkFBZ0I7WUFDWCx5Q0FBa0I7T0FKOUIsWUFBWSxDQW9CeEI7SUFBRCxtQkFBQztDQUFBLEFBcEJELElBb0JDO0FBcEJZLG9DQUFZIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEdsb2JhbEV2ZW50U2VydmljZSB9IGZyb20gJy4vc2VydmljZXMvZ2xvYmFsLWV2ZW50LnNlcnZpY2UnO1xuaW1wb3J0IHsgUm91dGVyRXh0ZW5zaW9ucyB9IGZyb20gJ25hdGl2ZXNjcmlwdC1hbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBUb2FzdEhlbHBlclNlcnZpY2UgfSBmcm9tICcuL2NvcmUvdG9hc3QtaGVscGVyLnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICducy1hcHAnLFxuICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICB0ZW1wbGF0ZVVybDogJy4vYXBwLmNvbXBvbmVudC5odG1sJ1xufSlcbmV4cG9ydCBjbGFzcyBBcHBDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGdsb2JhbEV2ZW50OiBHbG9iYWxFdmVudFNlcnZpY2UsXG4gICAgcHJpdmF0ZSByb3V0ZXM6IFJvdXRlckV4dGVuc2lvbnMsXG4gICAgcHJpdmF0ZSB0b2FzdEhlbHBlcjogVG9hc3RIZWxwZXJTZXJ2aWNlXG4gICkge31cblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLnN1YnNjcmliZUV2ZW50cygpO1xuICB9XG5cbiAgcHJpdmF0ZSBzdWJzY3JpYmVFdmVudHMoKTogdm9pZCB7XG4gICAgdGhpcy5nbG9iYWxFdmVudC5sb2dnZWRJbi5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgdGhpcy5yb3V0ZXMubmF2aWdhdGUoWycvaG9tZS9iYWxhbmNlJ10sIHsgY2xlYXJIaXN0b3J5OiB0cnVlIH0pO1xuICAgIH0pO1xuXG4gICAgdGhpcy5nbG9iYWxFdmVudC5kaXNjb25uZXRlZC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgdGhpcy5yb3V0ZXMubmF2aWdhdGUoWycvbG9naW4nXSwgeyBjbGVhckhpc3Rvcnk6IHRydWUgfSk7XG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==