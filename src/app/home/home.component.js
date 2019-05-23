"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var page_1 = require("tns-core-modules/ui/page/page");
var router_1 = require("nativescript-angular/router");
var variables_1 = require("../utils/variables");
var account_service_1 = require("../services/account.service");
var trasaction_service_1 = require("../services/trasaction.service");
var loading_service_1 = require("../services/loading.service");
var router_2 = require("@angular/router");
var HomePageComponent = /** @class */ (function () {
    function HomePageComponent(page, routes, accountService, transactionService, loadingService, activeRouter) {
        this.page = page;
        this.routes = routes;
        this.accountService = accountService;
        this.transactionService = transactionService;
        this.loadingService = loadingService;
        this.activeRouter = activeRouter;
        this.actionTitle = 'Extrato';
        this.tabSelected = 0;
    }
    HomePageComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.$isLoading = this.loadingService.$isLoading;
        this.userData$ = this.accountService.userData$;
        this.activeRouter.queryParams.subscribe(function (params) {
            if (params['tab']) {
                var tab = JSON.parse(params['tab']);
                _this.navigateToPage(tab);
            }
            else {
                _this.loadingService.show();
                _this.transactionService.getBalance().subscribe(function (res) {
                    _this.loadingService.hide();
                });
            }
        });
    };
    HomePageComponent.prototype.logOut = function () {
        this.routes.navigate(['login'], { clearHistory: true });
    };
    HomePageComponent.prototype.navigateToPage = function (tab) {
        this.actionTitle = tab.tabName;
        this.tabSelected = tab.tabIndex;
        this.routes.navigate([variables_1.redirectTo(tab.tabIndex)], { clearHistory: true });
    };
    HomePageComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'HomePage',
            templateUrl: './home.component.html',
            styleUrls: ['./home.component.css']
        }),
        __metadata("design:paramtypes", [page_1.Page,
            router_1.RouterExtensions,
            account_service_1.AccountService,
            trasaction_service_1.TransactionService,
            loading_service_1.LoadingService,
            router_2.ActivatedRoute])
    ], HomePageComponent);
    return HomePageComponent;
}());
exports.HomePageComponent = HomePageComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9tZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJob21lLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFrRDtBQUNsRCxzREFBcUQ7QUFDckQsc0RBQStEO0FBQy9ELGdEQUFnRDtBQUNoRCwrREFBNkQ7QUFHN0QscUVBQW9FO0FBQ3BFLCtEQUE2RDtBQUM3RCwwQ0FBaUQ7QUFRakQ7SUFLRSwyQkFDVSxJQUFVLEVBQ1YsTUFBd0IsRUFDeEIsY0FBOEIsRUFDOUIsa0JBQXNDLEVBQ3RDLGNBQThCLEVBQzlCLFlBQTRCO1FBTDVCLFNBQUksR0FBSixJQUFJLENBQU07UUFDVixXQUFNLEdBQU4sTUFBTSxDQUFrQjtRQUN4QixtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFDOUIsdUJBQWtCLEdBQWxCLGtCQUFrQixDQUFvQjtRQUN0QyxtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFDOUIsaUJBQVksR0FBWixZQUFZLENBQWdCO1FBVnRDLGdCQUFXLEdBQVcsU0FBUyxDQUFDO1FBR2hDLGdCQUFXLEdBQUcsQ0FBQyxDQUFDO0lBUWIsQ0FBQztJQUVKLG9DQUFRLEdBQVI7UUFBQSxpQkFlQztRQWRDLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxVQUFVLENBQUM7UUFDakQsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQztRQUUvQyxJQUFJLENBQUMsWUFBWSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsVUFBQSxNQUFNO1lBQzVDLElBQUksTUFBTSxDQUFDLEtBQUssQ0FBQyxFQUFFO2dCQUNqQixJQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUN0QyxLQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2FBQzFCO2lCQUFNO2dCQUNMLEtBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxFQUFFLENBQUM7Z0JBQzNCLEtBQUksQ0FBQyxrQkFBa0IsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxTQUFTLENBQUMsVUFBQSxHQUFHO29CQUNoRCxLQUFJLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSxDQUFDO2dCQUM3QixDQUFDLENBQUMsQ0FBQzthQUNKO1FBQ0gsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsa0NBQU0sR0FBTjtRQUNFLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsT0FBTyxDQUFDLEVBQUUsRUFBRSxZQUFZLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztJQUMxRCxDQUFDO0lBRUQsMENBQWMsR0FBZCxVQUFlLEdBQVE7UUFDckIsSUFBSSxDQUFDLFdBQVcsR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDO1FBQy9CLElBQUksQ0FBQyxXQUFXLEdBQUcsR0FBRyxDQUFDLFFBQVEsQ0FBQztRQUNoQyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLHNCQUFVLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsRUFBRSxZQUFZLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztJQUMzRSxDQUFDO0lBdkNVLGlCQUFpQjtRQU43QixnQkFBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFFBQVEsRUFBRSxVQUFVO1lBQ3BCLFdBQVcsRUFBRSx1QkFBdUI7WUFDcEMsU0FBUyxFQUFFLENBQUMsc0JBQXNCLENBQUM7U0FDcEMsQ0FBQzt5Q0FPZ0IsV0FBSTtZQUNGLHlCQUFnQjtZQUNSLGdDQUFjO1lBQ1YsdUNBQWtCO1lBQ3RCLGdDQUFjO1lBQ2hCLHVCQUFjO09BWDNCLGlCQUFpQixDQXlDN0I7SUFBRCx3QkFBQztDQUFBLEFBekNELElBeUNDO0FBekNZLDhDQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBQYWdlIH0gZnJvbSAndG5zLWNvcmUtbW9kdWxlcy91aS9wYWdlL3BhZ2UnO1xuaW1wb3J0IHsgUm91dGVyRXh0ZW5zaW9ucyB9IGZyb20gJ25hdGl2ZXNjcmlwdC1hbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyByZWRpcmVjdFRvIH0gZnJvbSAnLi4vdXRpbHMvdmFyaWFibGVzJztcbmltcG9ydCB7IEFjY291bnRTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvYWNjb3VudC5zZXJ2aWNlJztcbmltcG9ydCB7IFVzZXJEYXRhIH0gZnJvbSAnLi4vbW9kZWxzL3VzZXItZGF0YSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBUcmFuc2FjdGlvblNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy90cmFzYWN0aW9uLnNlcnZpY2UnO1xuaW1wb3J0IHsgTG9hZGluZ1NlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9sb2FkaW5nLnNlcnZpY2UnO1xuaW1wb3J0IHsgQWN0aXZhdGVkUm91dGUgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuXG5AQ29tcG9uZW50KHtcbiAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgc2VsZWN0b3I6ICdIb21lUGFnZScsXG4gIHRlbXBsYXRlVXJsOiAnLi9ob21lLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vaG9tZS5jb21wb25lbnQuY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgSG9tZVBhZ2VDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBhY3Rpb25UaXRsZTogc3RyaW5nID0gJ0V4dHJhdG8nO1xuICB1c2VyRGF0YSQ6IE9ic2VydmFibGU8VXNlckRhdGE+O1xuICAkaXNMb2FkaW5nOiBPYnNlcnZhYmxlPGJvb2xlYW4+O1xuICB0YWJTZWxlY3RlZCA9IDA7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgcGFnZTogUGFnZSxcbiAgICBwcml2YXRlIHJvdXRlczogUm91dGVyRXh0ZW5zaW9ucyxcbiAgICBwcml2YXRlIGFjY291bnRTZXJ2aWNlOiBBY2NvdW50U2VydmljZSxcbiAgICBwcml2YXRlIHRyYW5zYWN0aW9uU2VydmljZTogVHJhbnNhY3Rpb25TZXJ2aWNlLFxuICAgIHByaXZhdGUgbG9hZGluZ1NlcnZpY2U6IExvYWRpbmdTZXJ2aWNlLFxuICAgIHByaXZhdGUgYWN0aXZlUm91dGVyOiBBY3RpdmF0ZWRSb3V0ZVxuICApIHt9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy4kaXNMb2FkaW5nID0gdGhpcy5sb2FkaW5nU2VydmljZS4kaXNMb2FkaW5nO1xuICAgIHRoaXMudXNlckRhdGEkID0gdGhpcy5hY2NvdW50U2VydmljZS51c2VyRGF0YSQ7XG5cbiAgICB0aGlzLmFjdGl2ZVJvdXRlci5xdWVyeVBhcmFtcy5zdWJzY3JpYmUocGFyYW1zID0+IHtcbiAgICAgIGlmIChwYXJhbXNbJ3RhYiddKSB7XG4gICAgICAgIGNvbnN0IHRhYiA9IEpTT04ucGFyc2UocGFyYW1zWyd0YWInXSk7XG4gICAgICAgIHRoaXMubmF2aWdhdGVUb1BhZ2UodGFiKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMubG9hZGluZ1NlcnZpY2Uuc2hvdygpO1xuICAgICAgICB0aGlzLnRyYW5zYWN0aW9uU2VydmljZS5nZXRCYWxhbmNlKCkuc3Vic2NyaWJlKHJlcyA9PiB7XG4gICAgICAgICAgdGhpcy5sb2FkaW5nU2VydmljZS5oaWRlKCk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgbG9nT3V0KCk6IHZvaWQge1xuICAgIHRoaXMucm91dGVzLm5hdmlnYXRlKFsnbG9naW4nXSwgeyBjbGVhckhpc3Rvcnk6IHRydWUgfSk7XG4gIH1cblxuICBuYXZpZ2F0ZVRvUGFnZSh0YWI6IGFueSk6IHZvaWQge1xuICAgIHRoaXMuYWN0aW9uVGl0bGUgPSB0YWIudGFiTmFtZTtcbiAgICB0aGlzLnRhYlNlbGVjdGVkID0gdGFiLnRhYkluZGV4O1xuICAgIHRoaXMucm91dGVzLm5hdmlnYXRlKFtyZWRpcmVjdFRvKHRhYi50YWJJbmRleCldLCB7IGNsZWFySGlzdG9yeTogdHJ1ZSB9KTtcbiAgfVxuXG59XG4iXX0=