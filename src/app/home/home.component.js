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
        this.actionTitle = 'Extrato';
    }
    HomePageComponent.prototype.ngOnInit = function () {
        this.userData$ = this.accountService.userData$;
        this.transactionService.getBalance();
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
            styleUrls: ['./home.component.css']
        }),
        __metadata("design:paramtypes", [page_1.Page,
            router_1.RouterExtensions,
            account_service_1.AccountService,
            trasaction_service_1.TransactionService])
    ], HomePageComponent);
    return HomePageComponent;
}());
exports.HomePageComponent = HomePageComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9tZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJob21lLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFrRDtBQUNsRCxzREFBcUQ7QUFDckQsc0RBQStEO0FBQy9ELGdEQUFnRDtBQUNoRCwrREFBNkQ7QUFHN0QscUVBQW9FO0FBUXBFO0lBSUUsMkJBQ1UsSUFBVSxFQUNWLE1BQXdCLEVBQ3hCLGNBQThCLEVBQzlCLGtCQUFzQztRQUh0QyxTQUFJLEdBQUosSUFBSSxDQUFNO1FBQ1YsV0FBTSxHQUFOLE1BQU0sQ0FBa0I7UUFDeEIsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBQzlCLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBb0I7UUFQaEQsZ0JBQVcsR0FBVyxTQUFTLENBQUM7SUFRN0IsQ0FBQztJQUVKLG9DQUFRLEdBQVI7UUFDRSxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDO1FBQy9DLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUN2QyxDQUFDO0lBRUQsMENBQWMsR0FBZCxVQUFlLEdBQVE7UUFDckIsSUFBSSxDQUFDLFdBQVcsR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDO1FBQy9CLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsc0JBQVUsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxFQUFFLFlBQVksRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO0lBQzNFLENBQUM7SUFuQlUsaUJBQWlCO1FBTjdCLGdCQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsUUFBUSxFQUFFLFVBQVU7WUFDcEIsV0FBVyxFQUFFLHVCQUF1QjtZQUNwQyxTQUFTLEVBQUUsQ0FBQyxzQkFBc0IsQ0FBQztTQUNwQyxDQUFDO3lDQU1nQixXQUFJO1lBQ0YseUJBQWdCO1lBQ1IsZ0NBQWM7WUFDVix1Q0FBa0I7T0FSckMsaUJBQWlCLENBb0I3QjtJQUFELHdCQUFDO0NBQUEsQUFwQkQsSUFvQkM7QUFwQlksOENBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFBhZ2UgfSBmcm9tICd0bnMtY29yZS1tb2R1bGVzL3VpL3BhZ2UvcGFnZSc7XG5pbXBvcnQgeyBSb3V0ZXJFeHRlbnNpb25zIH0gZnJvbSAnbmF0aXZlc2NyaXB0LWFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IHJlZGlyZWN0VG8gfSBmcm9tICcuLi91dGlscy92YXJpYWJsZXMnO1xuaW1wb3J0IHsgQWNjb3VudFNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9hY2NvdW50LnNlcnZpY2UnO1xuaW1wb3J0IHsgVXNlckRhdGEgfSBmcm9tICcuLi9tb2RlbHMvdXNlci1kYXRhJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IFRyYW5zYWN0aW9uU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL3RyYXNhY3Rpb24uc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICBzZWxlY3RvcjogJ0hvbWVQYWdlJyxcbiAgdGVtcGxhdGVVcmw6ICcuL2hvbWUuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9ob21lLmNvbXBvbmVudC5jc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBIb21lUGFnZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIGFjdGlvblRpdGxlOiBzdHJpbmcgPSAnRXh0cmF0byc7XG4gIHVzZXJEYXRhJDogT2JzZXJ2YWJsZTxVc2VyRGF0YT47XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBwYWdlOiBQYWdlLFxuICAgIHByaXZhdGUgcm91dGVzOiBSb3V0ZXJFeHRlbnNpb25zLFxuICAgIHByaXZhdGUgYWNjb3VudFNlcnZpY2U6IEFjY291bnRTZXJ2aWNlLFxuICAgIHByaXZhdGUgdHJhbnNhY3Rpb25TZXJ2aWNlOiBUcmFuc2FjdGlvblNlcnZpY2VcbiAgKSB7fVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMudXNlckRhdGEkID0gdGhpcy5hY2NvdW50U2VydmljZS51c2VyRGF0YSQ7XG4gICAgdGhpcy50cmFuc2FjdGlvblNlcnZpY2UuZ2V0QmFsYW5jZSgpO1xuICB9XG5cbiAgbmF2aWdhdGVUb1BhZ2UodGFiOiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLmFjdGlvblRpdGxlID0gdGFiLnRhYk5hbWU7XG4gICAgdGhpcy5yb3V0ZXMubmF2aWdhdGUoW3JlZGlyZWN0VG8odGFiLnRhYkluZGV4KV0sIHsgY2xlYXJIaXN0b3J5OiB0cnVlIH0pO1xuICB9XG59XG4iXX0=