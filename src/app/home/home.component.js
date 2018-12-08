"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var page_1 = require("tns-core-modules/ui/page/page");
var router_1 = require("nativescript-angular/router");
var variables_1 = require("../utils/variables");
var account_service_1 = require("../services/account.service");
var trasaction_service_1 = require("../services/trasaction.service");
var HomePageComponent = /** @class */ (function () {
    function HomePageComponent(page, routes, accountService, transactionService) {
        this.page = page;
        this.routes = routes;
        this.accountService = accountService;
        this.transactionService = transactionService;
    }
    HomePageComponent.prototype.ngOnInit = function () {
        this.page.actionBarHidden = true;
        this.userData$ = this.accountService.userData$;
        this.transactionService.getBalance();
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
        __metadata("design:paramtypes", [page_1.Page, router_1.RouterExtensions, account_service_1.AccountService, trasaction_service_1.TransactionService])
    ], HomePageComponent);
    return HomePageComponent;
}());
exports.HomePageComponent = HomePageComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9tZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJob21lLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFrRDtBQUNsRCxzREFBcUQ7QUFDckQsc0RBQStEO0FBQy9ELGdEQUFnRDtBQUNoRCwrREFBNkQ7QUFHN0QscUVBQW9FO0FBUXBFO0lBSUUsMkJBQW9CLElBQVUsRUFBVSxNQUF3QixFQUFVLGNBQThCLEVBQVMsa0JBQXFDO1FBQWxJLFNBQUksR0FBSixJQUFJLENBQU07UUFBVSxXQUFNLEdBQU4sTUFBTSxDQUFrQjtRQUFVLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUFTLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBbUI7SUFBRyxDQUFDO0lBRTFKLG9DQUFRLEdBQVI7UUFDRSxJQUFJLENBQUMsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUM7UUFDakMsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQztRQUMvQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDdkMsQ0FBQztJQUVELDBDQUFjLEdBQWQsVUFBZSxLQUFhO1FBQzFCLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsc0JBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLEVBQUUsWUFBWSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7SUFDcEUsQ0FBQztJQWRVLGlCQUFpQjtRQU43QixnQkFBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFFBQVEsRUFBRSxVQUFVO1lBQ3BCLFdBQVcsRUFBRSx1QkFBdUI7WUFDcEMsU0FBUyxFQUFFLENBQUMsc0JBQXNCLENBQUM7U0FDcEMsQ0FBQzt5Q0FLMEIsV0FBSSxFQUFrQix5QkFBZ0IsRUFBMEIsZ0NBQWMsRUFBNEIsdUNBQWtCO09BSjNJLGlCQUFpQixDQWU3QjtJQUFELHdCQUFDO0NBQUEsQUFmRCxJQWVDO0FBZlksOENBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFBhZ2UgfSBmcm9tICd0bnMtY29yZS1tb2R1bGVzL3VpL3BhZ2UvcGFnZSc7XG5pbXBvcnQgeyBSb3V0ZXJFeHRlbnNpb25zIH0gZnJvbSAnbmF0aXZlc2NyaXB0LWFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IHJlZGlyZWN0VG8gfSBmcm9tICcuLi91dGlscy92YXJpYWJsZXMnO1xuaW1wb3J0IHsgQWNjb3VudFNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9hY2NvdW50LnNlcnZpY2UnO1xuaW1wb3J0IHsgVXNlckRhdGEgfSBmcm9tICcuLi9tb2RlbHMvdXNlci1kYXRhJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IFRyYW5zYWN0aW9uU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL3RyYXNhY3Rpb24uc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICBzZWxlY3RvcjogJ0hvbWVQYWdlJyxcbiAgdGVtcGxhdGVVcmw6ICcuL2hvbWUuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9ob21lLmNvbXBvbmVudC5jc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBIb21lUGFnZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgdXNlckRhdGEkOk9ic2VydmFibGU8VXNlckRhdGE+O1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcGFnZTogUGFnZSwgcHJpdmF0ZSByb3V0ZXM6IFJvdXRlckV4dGVuc2lvbnMsIHByaXZhdGUgYWNjb3VudFNlcnZpY2U6IEFjY291bnRTZXJ2aWNlLHByaXZhdGUgdHJhbnNhY3Rpb25TZXJ2aWNlOlRyYW5zYWN0aW9uU2VydmljZSkge31cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLnBhZ2UuYWN0aW9uQmFySGlkZGVuID0gdHJ1ZTtcbiAgICB0aGlzLnVzZXJEYXRhJCA9IHRoaXMuYWNjb3VudFNlcnZpY2UudXNlckRhdGEkO1xuICAgIHRoaXMudHJhbnNhY3Rpb25TZXJ2aWNlLmdldEJhbGFuY2UoKTtcbiAgfVxuXG4gIG5hdmlnYXRlVG9QYWdlKGluZGV4OiBudW1iZXIpOiB2b2lkIHtcbiAgICB0aGlzLnJvdXRlcy5uYXZpZ2F0ZShbcmVkaXJlY3RUbyhpbmRleCldLCB7IGNsZWFySGlzdG9yeTogdHJ1ZSB9KTtcbiAgfVxufVxuIl19