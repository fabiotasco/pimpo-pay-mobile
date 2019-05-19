"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var page_1 = require("tns-core-modules/ui/page/page");
var toast_helper_service_1 = require("../core/toast-helper.service");
var account_service_1 = require("../services/account.service");
var router_1 = require("@angular/router");
var loading_service_1 = require("../services/loading.service");
var LoginPageComponent = /** @class */ (function () {
    function LoginPageComponent(page, toastHelper, accountService, loadingService, router) {
        this.page = page;
        this.toastHelper = toastHelper;
        this.accountService = accountService;
        this.loadingService = loadingService;
        this.router = router;
    }
    LoginPageComponent.prototype.ngOnInit = function () {
        this.$isLoading = this.loadingService.$isLoading;
        this.page.actionBarHidden = true;
    };
    LoginPageComponent.prototype.showRegisterForm = function (event) {
        var _this = this;
        var view = event.view;
        view.animate({ scale: { x: 1.1, y: 1.1 }, duration: 200 }).then(function () {
            view.animate({ scale: { x: 1, y: 1 }, duration: 200 });
            _this.router.navigate(['new-account']);
        });
    };
    LoginPageComponent.prototype.doLogin = function () {
        var _this = this;
        if (this.username && this.password) {
            var credentials = {
                username: this.username.replace('/D/g', ''),
                password: this.password
            };
            this.loadingService.show();
            this.accountService.login(credentials).subscribe(function (res) {
                _this.loadingService.hide();
            }, function (err) {
                _this.loadingService.hide();
                _this.toastHelper.showToast(err.message);
            });
        }
        else {
            this.toastHelper.showToast('Informe o documento e o password');
        }
    };
    LoginPageComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'LoginPage',
            templateUrl: './login.component.html',
            styleUrls: ['./login.component.css'],
            providers: [loading_service_1.LoadingService]
        }),
        __metadata("design:paramtypes", [page_1.Page,
            toast_helper_service_1.ToastHelperService,
            account_service_1.AccountService,
            loading_service_1.LoadingService,
            router_1.Router])
    ], LoginPageComponent);
    return LoginPageComponent;
}());
exports.LoginPageComponent = LoginPageComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibG9naW4uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQWtEO0FBQ2xELHNEQUEyRDtBQUUzRCxxRUFBa0U7QUFDbEUsK0RBQTZEO0FBRTdELDBDQUF5QztBQUN6QywrREFBNkQ7QUFVN0Q7SUFLRSw0QkFDVSxJQUFVLEVBQ1YsV0FBK0IsRUFDL0IsY0FBOEIsRUFDOUIsY0FBOEIsRUFDOUIsTUFBYztRQUpkLFNBQUksR0FBSixJQUFJLENBQU07UUFDVixnQkFBVyxHQUFYLFdBQVcsQ0FBb0I7UUFDL0IsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBQzlCLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUM5QixXQUFNLEdBQU4sTUFBTSxDQUFRO0lBQ3JCLENBQUM7SUFFSixxQ0FBUSxHQUFSO1FBQ0UsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQztRQUNqRCxJQUFJLENBQUMsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUM7SUFDbkMsQ0FBQztJQUVNLDZDQUFnQixHQUF2QixVQUF3QixLQUFVO1FBQWxDLGlCQU1DO1FBTEMsSUFBTSxJQUFJLEdBQVMsS0FBSyxDQUFDLElBQUksQ0FBQztRQUM5QixJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsS0FBSyxFQUFFLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLEVBQUUsUUFBUSxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDO1lBQzlELElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxLQUFLLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQztZQUN2RCxLQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7UUFDeEMsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRU0sb0NBQU8sR0FBZDtRQUFBLGlCQW9CQztRQW5CQyxJQUFJLElBQUksQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNsQyxJQUFNLFdBQVcsR0FBZ0I7Z0JBQy9CLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDO2dCQUMzQyxRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVE7YUFDeEIsQ0FBQztZQUVGLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDM0IsSUFBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUMsU0FBUyxDQUM5QyxVQUFBLEdBQUc7Z0JBQ0QsS0FBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUM3QixDQUFDLEVBQ0QsVUFBQyxHQUFzQjtnQkFDckIsS0FBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztnQkFDM0IsS0FBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQzFDLENBQUMsQ0FDRixDQUFDO1NBQ0g7YUFBTTtZQUNMLElBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLGtDQUFrQyxDQUFDLENBQUM7U0FDaEU7SUFDSCxDQUFDO0lBOUNVLGtCQUFrQjtRQVA5QixnQkFBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFFBQVEsRUFBRSxXQUFXO1lBQ3JCLFdBQVcsRUFBRSx3QkFBd0I7WUFDckMsU0FBUyxFQUFFLENBQUMsdUJBQXVCLENBQUM7WUFDcEMsU0FBUyxFQUFFLENBQUMsZ0NBQWMsQ0FBQztTQUM1QixDQUFDO3lDQU9nQixXQUFJO1lBQ0cseUNBQWtCO1lBQ2YsZ0NBQWM7WUFDZCxnQ0FBYztZQUN0QixlQUFNO09BVmIsa0JBQWtCLENBK0M5QjtJQUFELHlCQUFDO0NBQUEsQUEvQ0QsSUErQ0M7QUEvQ1ksZ0RBQWtCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFBhZ2UsIFZpZXcgfSBmcm9tICd0bnMtY29yZS1tb2R1bGVzL3VpL3BhZ2UvcGFnZSc7XG5pbXBvcnQgeyBDcmVkZW50aWFscyB9IGZyb20gJy4uL21vZGVscy9jcmVkZW50aWFscyc7XG5pbXBvcnQgeyBUb2FzdEhlbHBlclNlcnZpY2UgfSBmcm9tICcuLi9jb3JlL3RvYXN0LWhlbHBlci5zZXJ2aWNlJztcbmltcG9ydCB7IEFjY291bnRTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvYWNjb3VudC5zZXJ2aWNlJztcbmltcG9ydCB7IEh0dHBFcnJvclJlc3BvbnNlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IExvYWRpbmdTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvbG9hZGluZy5zZXJ2aWNlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcblxuQENvbXBvbmVudCh7XG4gIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gIHNlbGVjdG9yOiAnTG9naW5QYWdlJyxcbiAgdGVtcGxhdGVVcmw6ICcuL2xvZ2luLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vbG9naW4uY29tcG9uZW50LmNzcyddLFxuICBwcm92aWRlcnM6IFtMb2FkaW5nU2VydmljZV1cbn0pXG5leHBvcnQgY2xhc3MgTG9naW5QYWdlQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgdXNlcm5hbWU6IHN0cmluZyAvKiAgPSAnMTE1NjQ3NjM3MjInICovO1xuICBwYXNzd29yZDogc3RyaW5nIC8qID0gJzEyMzQ1NicgKi87XG4gICRpc0xvYWRpbmc6IE9ic2VydmFibGU8Ym9vbGVhbj47XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBwYWdlOiBQYWdlLFxuICAgIHByaXZhdGUgdG9hc3RIZWxwZXI6IFRvYXN0SGVscGVyU2VydmljZSxcbiAgICBwcml2YXRlIGFjY291bnRTZXJ2aWNlOiBBY2NvdW50U2VydmljZSxcbiAgICBwcml2YXRlIGxvYWRpbmdTZXJ2aWNlOiBMb2FkaW5nU2VydmljZSxcbiAgICBwcml2YXRlIHJvdXRlcjogUm91dGVyXG4gICkge31cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLiRpc0xvYWRpbmcgPSB0aGlzLmxvYWRpbmdTZXJ2aWNlLiRpc0xvYWRpbmc7XG4gICAgdGhpcy5wYWdlLmFjdGlvbkJhckhpZGRlbiA9IHRydWU7XG4gIH1cblxuICBwdWJsaWMgc2hvd1JlZ2lzdGVyRm9ybShldmVudDogYW55KSB7XG4gICAgY29uc3QgdmlldzogVmlldyA9IGV2ZW50LnZpZXc7XG4gICAgdmlldy5hbmltYXRlKHsgc2NhbGU6IHsgeDogMS4xLCB5OiAxLjEgfSwgZHVyYXRpb246IDIwMCB9KS50aGVuKCgpID0+IHtcbiAgICAgIHZpZXcuYW5pbWF0ZSh7IHNjYWxlOiB7IHg6IDEsIHk6IDEgfSwgZHVyYXRpb246IDIwMCB9KTtcbiAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFsnbmV3LWFjY291bnQnXSk7XG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgZG9Mb2dpbigpIHtcbiAgICBpZiAodGhpcy51c2VybmFtZSAmJiB0aGlzLnBhc3N3b3JkKSB7XG4gICAgICBjb25zdCBjcmVkZW50aWFsczogQ3JlZGVudGlhbHMgPSB7XG4gICAgICAgIHVzZXJuYW1lOiB0aGlzLnVzZXJuYW1lLnJlcGxhY2UoJy9EL2cnLCAnJyksXG4gICAgICAgIHBhc3N3b3JkOiB0aGlzLnBhc3N3b3JkXG4gICAgICB9O1xuXG4gICAgICB0aGlzLmxvYWRpbmdTZXJ2aWNlLnNob3coKTtcbiAgICAgIHRoaXMuYWNjb3VudFNlcnZpY2UubG9naW4oY3JlZGVudGlhbHMpLnN1YnNjcmliZShcbiAgICAgICAgcmVzID0+IHtcbiAgICAgICAgICB0aGlzLmxvYWRpbmdTZXJ2aWNlLmhpZGUoKTtcbiAgICAgICAgfSxcbiAgICAgICAgKGVycjogSHR0cEVycm9yUmVzcG9uc2UpID0+IHtcbiAgICAgICAgICB0aGlzLmxvYWRpbmdTZXJ2aWNlLmhpZGUoKTtcbiAgICAgICAgICB0aGlzLnRvYXN0SGVscGVyLnNob3dUb2FzdChlcnIubWVzc2FnZSk7XG4gICAgICAgIH1cbiAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMudG9hc3RIZWxwZXIuc2hvd1RvYXN0KCdJbmZvcm1lIG8gZG9jdW1lbnRvIGUgbyBwYXNzd29yZCcpO1xuICAgIH1cbiAgfVxufVxuIl19