"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var page_1 = require("tns-core-modules/ui/page/page");
var router_1 = require("nativescript-angular/router");
var variables_1 = require("../utils/variables");
var account_service_1 = require("../services/account.service");
var HomePageComponent = /** @class */ (function () {
    function HomePageComponent(page, routes, accountService) {
        this.page = page;
        this.routes = routes;
        this.accountService = accountService;
    }
    HomePageComponent.prototype.ngOnInit = function () {
        this.page.actionBarHidden = true;
        this.userData$ = this.accountService.userData$;
    };
    HomePageComponent.prototype.navigateToPage = function (index) {
        this.routes.navigate([variables_1.redirectTo(index)], { clearHistory: true });
    };
    HomePageComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'HomePage',
            templateUrl: './home.component.html',
            styleUrls: ['./home.component.css']
        }),
        __metadata("design:paramtypes", [page_1.Page, router_1.RouterExtensions, account_service_1.AccountService])
    ], HomePageComponent);
    return HomePageComponent;
}());
exports.HomePageComponent = HomePageComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9tZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJob21lLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFrRDtBQUNsRCxzREFBcUQ7QUFDckQsc0RBQStEO0FBQy9ELGdEQUFnRDtBQUNoRCwrREFBNkQ7QUFVN0Q7SUFJRSwyQkFBb0IsSUFBVSxFQUFVLE1BQXdCLEVBQVUsY0FBOEI7UUFBcEYsU0FBSSxHQUFKLElBQUksQ0FBTTtRQUFVLFdBQU0sR0FBTixNQUFNLENBQWtCO1FBQVUsbUJBQWMsR0FBZCxjQUFjLENBQWdCO0lBQUcsQ0FBQztJQUU1RyxvQ0FBUSxHQUFSO1FBQ0UsSUFBSSxDQUFDLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDO1FBQ2pDLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUM7SUFDakQsQ0FBQztJQUVELDBDQUFjLEdBQWQsVUFBZSxLQUFhO1FBQzFCLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsc0JBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLEVBQUUsWUFBWSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7SUFDcEUsQ0FBQztJQWJVLGlCQUFpQjtRQU43QixnQkFBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFFBQVEsRUFBRSxVQUFVO1lBQ3BCLFdBQVcsRUFBRSx1QkFBdUI7WUFDcEMsU0FBUyxFQUFFLENBQUMsc0JBQXNCLENBQUM7U0FDcEMsQ0FBQzt5Q0FLMEIsV0FBSSxFQUFrQix5QkFBZ0IsRUFBMEIsZ0NBQWM7T0FKN0YsaUJBQWlCLENBYzdCO0lBQUQsd0JBQUM7Q0FBQSxBQWRELElBY0M7QUFkWSw4Q0FBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUGFnZSB9IGZyb20gJ3Rucy1jb3JlLW1vZHVsZXMvdWkvcGFnZS9wYWdlJztcbmltcG9ydCB7IFJvdXRlckV4dGVuc2lvbnMgfSBmcm9tICduYXRpdmVzY3JpcHQtYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgcmVkaXJlY3RUbyB9IGZyb20gJy4uL3V0aWxzL3ZhcmlhYmxlcyc7XG5pbXBvcnQgeyBBY2NvdW50U2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL2FjY291bnQuc2VydmljZSc7XG5pbXBvcnQgeyBVc2VyRGF0YSB9IGZyb20gJy4uL21vZGVscy91c2VyLWRhdGEnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuXG5AQ29tcG9uZW50KHtcbiAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgc2VsZWN0b3I6ICdIb21lUGFnZScsXG4gIHRlbXBsYXRlVXJsOiAnLi9ob21lLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vaG9tZS5jb21wb25lbnQuY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgSG9tZVBhZ2VDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIHVzZXJEYXRhJDpPYnNlcnZhYmxlPFVzZXJEYXRhPjtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHBhZ2U6IFBhZ2UsIHByaXZhdGUgcm91dGVzOiBSb3V0ZXJFeHRlbnNpb25zLCBwcml2YXRlIGFjY291bnRTZXJ2aWNlOiBBY2NvdW50U2VydmljZSkge31cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLnBhZ2UuYWN0aW9uQmFySGlkZGVuID0gdHJ1ZTtcbiAgICB0aGlzLnVzZXJEYXRhJCA9IHRoaXMuYWNjb3VudFNlcnZpY2UudXNlckRhdGEkO1xuICB9XG5cbiAgbmF2aWdhdGVUb1BhZ2UoaW5kZXg6IG51bWJlcik6IHZvaWQge1xuICAgIHRoaXMucm91dGVzLm5hdmlnYXRlKFtyZWRpcmVjdFRvKGluZGV4KV0sIHsgY2xlYXJIaXN0b3J5OiB0cnVlIH0pO1xuICB9XG59XG4iXX0=