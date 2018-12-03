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
            _this.toastHelper.showToast('Usuário Logado');
            _this.routes.navigate(['/home/buy'], { clearHistory: true });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFwcC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBa0Q7QUFDbEQsd0VBQXFFO0FBQ3JFLHNEQUErRDtBQUMvRCxvRUFBaUU7QUFPakU7SUFDRSxzQkFDVSxXQUErQixFQUMvQixNQUF3QixFQUN4QixXQUErQjtRQUYvQixnQkFBVyxHQUFYLFdBQVcsQ0FBb0I7UUFDL0IsV0FBTSxHQUFOLE1BQU0sQ0FBa0I7UUFDeEIsZ0JBQVcsR0FBWCxXQUFXLENBQW9CO0lBQ3RDLENBQUM7SUFFSiwrQkFBUSxHQUFSO1FBQ0UsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO0lBQ3pCLENBQUM7SUFFTyxzQ0FBZSxHQUF2QjtRQUFBLGlCQVNDO1FBUkMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDO1lBQ2xDLEtBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLGdCQUFnQixDQUFDLENBQUM7WUFDN0MsS0FBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxXQUFXLENBQUMsRUFBRSxFQUFFLFlBQVksRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO1FBQzlELENBQUMsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDO1lBQ3JDLEtBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsUUFBUSxDQUFDLEVBQUUsRUFBRSxZQUFZLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztRQUMzRCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFwQlUsWUFBWTtRQUx4QixnQkFBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLFFBQVE7WUFDbEIsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFdBQVcsRUFBRSxzQkFBc0I7U0FDcEMsQ0FBQzt5Q0FHdUIseUNBQWtCO1lBQ3ZCLHlCQUFnQjtZQUNYLHlDQUFrQjtPQUo5QixZQUFZLENBcUJ4QjtJQUFELG1CQUFDO0NBQUEsQUFyQkQsSUFxQkM7QUFyQlksb0NBQVkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgR2xvYmFsRXZlbnRTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlcy9nbG9iYWwtZXZlbnQuc2VydmljZSc7XG5pbXBvcnQgeyBSb3V0ZXJFeHRlbnNpb25zIH0gZnJvbSAnbmF0aXZlc2NyaXB0LWFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IFRvYXN0SGVscGVyU2VydmljZSB9IGZyb20gJy4vY29yZS90b2FzdC1oZWxwZXIuc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25zLWFwcCcsXG4gIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gIHRlbXBsYXRlVXJsOiAnLi9hcHAuY29tcG9uZW50Lmh0bWwnXG59KVxuZXhwb3J0IGNsYXNzIEFwcENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgZ2xvYmFsRXZlbnQ6IEdsb2JhbEV2ZW50U2VydmljZSxcbiAgICBwcml2YXRlIHJvdXRlczogUm91dGVyRXh0ZW5zaW9ucyxcbiAgICBwcml2YXRlIHRvYXN0SGVscGVyOiBUb2FzdEhlbHBlclNlcnZpY2VcbiAgKSB7fVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIHRoaXMuc3Vic2NyaWJlRXZlbnRzKCk7XG4gIH1cblxuICBwcml2YXRlIHN1YnNjcmliZUV2ZW50cygpOiB2b2lkIHtcbiAgICB0aGlzLmdsb2JhbEV2ZW50LmxvZ2dlZEluLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICB0aGlzLnRvYXN0SGVscGVyLnNob3dUb2FzdCgnVXN1w6FyaW8gTG9nYWRvJyk7XG4gICAgICB0aGlzLnJvdXRlcy5uYXZpZ2F0ZShbJy9ob21lL2J1eSddLCB7IGNsZWFySGlzdG9yeTogdHJ1ZSB9KTtcbiAgICB9KTtcblxuICAgIHRoaXMuZ2xvYmFsRXZlbnQuZGlzY29ubmV0ZWQuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIHRoaXMucm91dGVzLm5hdmlnYXRlKFsnL2xvZ2luJ10sIHsgY2xlYXJIaXN0b3J5OiB0cnVlIH0pO1xuICAgIH0pO1xuICB9XG59XG4iXX0=