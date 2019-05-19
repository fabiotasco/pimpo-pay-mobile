"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var page_1 = require("tns-core-modules/ui/page/page");
var router_1 = require("nativescript-angular/router");
var variables_1 = require("../utils/variables");
var account_service_1 = require("../services/account.service");
var trasaction_service_1 = require("../services/trasaction.service");
var loading_service_1 = require("../services/loading.service");
var HomePageComponent = /** @class */ (function () {
    function HomePageComponent(page, routes, accountService, transactionService, loadingService) {
        this.page = page;
        this.routes = routes;
        this.accountService = accountService;
        this.transactionService = transactionService;
        this.loadingService = loadingService;
        this.actionTitle = 'Extrato';
    }
    HomePageComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.$isLoading = this.loadingService.$isLoading;
        this.userData$ = this.accountService.userData$;
        this.loadingService.show();
        this.transactionService.getBalance().subscribe(function (res) {
            _this.loadingService.hide();
        });
    };
    HomePageComponent.prototype.logOut = function () {
        this.routes.navigate(['login'], { clearHistory: true });
    };
    HomePageComponent.prototype.navigateToPage = function (tab) {
        this.actionTitle = tab.tabName;
        this.routes.navigate([variables_1.redirectTo(tab.tabIndex)], { clearHistory: true });
    };
    HomePageComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'HomePage',
            templateUrl: './home.component.html',
            styleUrls: ['./home.component.css'],
            providers: [loading_service_1.LoadingService]
        }),
        __metadata("design:paramtypes", [page_1.Page,
            router_1.RouterExtensions,
            account_service_1.AccountService,
            trasaction_service_1.TransactionService,
            loading_service_1.LoadingService])
    ], HomePageComponent);
    return HomePageComponent;
}());
exports.HomePageComponent = HomePageComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9tZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJob21lLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFrRDtBQUNsRCxzREFBcUQ7QUFDckQsc0RBQStEO0FBQy9ELGdEQUFnRDtBQUNoRCwrREFBNkQ7QUFHN0QscUVBQW9FO0FBQ3BFLCtEQUE2RDtBQVM3RDtJQUtFLDJCQUNVLElBQVUsRUFDVixNQUF3QixFQUN4QixjQUE4QixFQUM5QixrQkFBc0MsRUFDdEMsY0FBOEI7UUFKOUIsU0FBSSxHQUFKLElBQUksQ0FBTTtRQUNWLFdBQU0sR0FBTixNQUFNLENBQWtCO1FBQ3hCLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUM5Qix1QkFBa0IsR0FBbEIsa0JBQWtCLENBQW9CO1FBQ3RDLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQVR4QyxnQkFBVyxHQUFXLFNBQVMsQ0FBQztJQVU3QixDQUFDO0lBRUosb0NBQVEsR0FBUjtRQUFBLGlCQU9DO1FBTkMsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQztRQUNqRCxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDO1FBQy9DLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDM0IsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFVBQVUsRUFBRSxDQUFDLFNBQVMsQ0FBQyxVQUFBLEdBQUc7WUFDaEQsS0FBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUM3QixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCxrQ0FBTSxHQUFOO1FBQ0UsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxPQUFPLENBQUMsRUFBRSxFQUFFLFlBQVksRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO0lBQzFELENBQUM7SUFFRCwwQ0FBYyxHQUFkLFVBQWUsR0FBUTtRQUNyQixJQUFJLENBQUMsV0FBVyxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUM7UUFDL0IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxzQkFBVSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLEVBQUUsWUFBWSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7SUFDM0UsQ0FBQztJQTdCVSxpQkFBaUI7UUFQN0IsZ0JBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixRQUFRLEVBQUUsVUFBVTtZQUNwQixXQUFXLEVBQUUsdUJBQXVCO1lBQ3BDLFNBQVMsRUFBRSxDQUFDLHNCQUFzQixDQUFDO1lBQ25DLFNBQVMsRUFBRSxDQUFDLGdDQUFjLENBQUM7U0FDNUIsQ0FBQzt5Q0FPZ0IsV0FBSTtZQUNGLHlCQUFnQjtZQUNSLGdDQUFjO1lBQ1YsdUNBQWtCO1lBQ3RCLGdDQUFjO09BVjdCLGlCQUFpQixDQThCN0I7SUFBRCx3QkFBQztDQUFBLEFBOUJELElBOEJDO0FBOUJZLDhDQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBQYWdlIH0gZnJvbSAndG5zLWNvcmUtbW9kdWxlcy91aS9wYWdlL3BhZ2UnO1xuaW1wb3J0IHsgUm91dGVyRXh0ZW5zaW9ucyB9IGZyb20gJ25hdGl2ZXNjcmlwdC1hbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyByZWRpcmVjdFRvIH0gZnJvbSAnLi4vdXRpbHMvdmFyaWFibGVzJztcbmltcG9ydCB7IEFjY291bnRTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvYWNjb3VudC5zZXJ2aWNlJztcbmltcG9ydCB7IFVzZXJEYXRhIH0gZnJvbSAnLi4vbW9kZWxzL3VzZXItZGF0YSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBUcmFuc2FjdGlvblNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy90cmFzYWN0aW9uLnNlcnZpY2UnO1xuaW1wb3J0IHsgTG9hZGluZ1NlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9sb2FkaW5nLnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgc2VsZWN0b3I6ICdIb21lUGFnZScsXG4gIHRlbXBsYXRlVXJsOiAnLi9ob21lLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vaG9tZS5jb21wb25lbnQuY3NzJ10sXG4gIHByb3ZpZGVyczogW0xvYWRpbmdTZXJ2aWNlXVxufSlcbmV4cG9ydCBjbGFzcyBIb21lUGFnZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIGFjdGlvblRpdGxlOiBzdHJpbmcgPSAnRXh0cmF0byc7XG4gIHVzZXJEYXRhJDogT2JzZXJ2YWJsZTxVc2VyRGF0YT47XG4gICRpc0xvYWRpbmc6IE9ic2VydmFibGU8Ym9vbGVhbj47XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBwYWdlOiBQYWdlLFxuICAgIHByaXZhdGUgcm91dGVzOiBSb3V0ZXJFeHRlbnNpb25zLFxuICAgIHByaXZhdGUgYWNjb3VudFNlcnZpY2U6IEFjY291bnRTZXJ2aWNlLFxuICAgIHByaXZhdGUgdHJhbnNhY3Rpb25TZXJ2aWNlOiBUcmFuc2FjdGlvblNlcnZpY2UsXG4gICAgcHJpdmF0ZSBsb2FkaW5nU2VydmljZTogTG9hZGluZ1NlcnZpY2VcbiAgKSB7fVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuJGlzTG9hZGluZyA9IHRoaXMubG9hZGluZ1NlcnZpY2UuJGlzTG9hZGluZztcbiAgICB0aGlzLnVzZXJEYXRhJCA9IHRoaXMuYWNjb3VudFNlcnZpY2UudXNlckRhdGEkO1xuICAgIHRoaXMubG9hZGluZ1NlcnZpY2Uuc2hvdygpO1xuICAgIHRoaXMudHJhbnNhY3Rpb25TZXJ2aWNlLmdldEJhbGFuY2UoKS5zdWJzY3JpYmUocmVzID0+IHtcbiAgICAgIHRoaXMubG9hZGluZ1NlcnZpY2UuaGlkZSgpO1xuICAgIH0pO1xuICB9XG5cbiAgbG9nT3V0KCk6IHZvaWQge1xuICAgIHRoaXMucm91dGVzLm5hdmlnYXRlKFsnbG9naW4nXSwgeyBjbGVhckhpc3Rvcnk6IHRydWUgfSk7XG4gIH1cblxuICBuYXZpZ2F0ZVRvUGFnZSh0YWI6IGFueSk6IHZvaWQge1xuICAgIHRoaXMuYWN0aW9uVGl0bGUgPSB0YWIudGFiTmFtZTtcbiAgICB0aGlzLnJvdXRlcy5uYXZpZ2F0ZShbcmVkaXJlY3RUbyh0YWIudGFiSW5kZXgpXSwgeyBjbGVhckhpc3Rvcnk6IHRydWUgfSk7XG4gIH1cbn1cbiJdfQ==