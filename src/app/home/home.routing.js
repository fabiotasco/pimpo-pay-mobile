"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("nativescript-angular/router");
var home_component_1 = require("./home.component");
var buy_page_component_1 = require("./buy-page/buy-page.component");
var credit_page_component_1 = require("./credit-page/credit-page.component");
var balance_component_1 = require("./balance-page/balance.component");
var transfer_component_1 = require("./transfer-page/transfer.component");
var user_component_1 = require("./user-page/user.component");
var routes = [
    {
        path: '',
        component: home_component_1.HomePageComponent,
        children: [
            { path: 'buy', component: buy_page_component_1.BuyPageComponent },
            { path: 'credit', component: credit_page_component_1.CreditPageComponent },
            { path: 'balance', component: balance_component_1.BalancePageComponent },
            { path: 'transfer', component: transfer_component_1.TransferPageComponent },
            { path: 'user', component: user_component_1.UserPageComponent }
        ]
    }
];
var HomeRoutingModule = /** @class */ (function () {
    function HomeRoutingModule() {
    }
    HomeRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.NativeScriptRouterModule.forChild(routes)],
            exports: [router_1.NativeScriptRouterModule],
            declarations: []
        })
    ], HomeRoutingModule);
    return HomeRoutingModule;
}());
exports.HomeRoutingModule = HomeRoutingModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9tZS5yb3V0aW5nLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiaG9tZS5yb3V0aW5nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQXlDO0FBRXpDLHNEQUF1RTtBQUN2RSxtREFBcUQ7QUFDckQsb0VBQWlFO0FBQ2pFLDZFQUEwRTtBQUMxRSxzRUFBd0U7QUFDeEUseUVBQTJFO0FBQzNFLDZEQUErRDtBQUUvRCxJQUFNLE1BQU0sR0FBVztJQUNyQjtRQUNFLElBQUksRUFBRSxFQUFFO1FBQ1IsU0FBUyxFQUFFLGtDQUFpQjtRQUM1QixRQUFRLEVBQUU7WUFDUixFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLHFDQUFnQixFQUFFO1lBQzVDLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsMkNBQW1CLEVBQUU7WUFDbEQsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSx3Q0FBb0IsRUFBRTtZQUNwRCxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsU0FBUyxFQUFFLDBDQUFxQixFQUFFO1lBQ3RELEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsa0NBQWlCLEVBQUU7U0FDL0M7S0FDRjtDQUNGLENBQUM7QUFPRjtJQUFBO0lBQWdDLENBQUM7SUFBcEIsaUJBQWlCO1FBTDdCLGVBQVEsQ0FBQztZQUNSLE9BQU8sRUFBRSxDQUFDLGlDQUF3QixDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUNwRCxPQUFPLEVBQUUsQ0FBQyxpQ0FBd0IsQ0FBQztZQUNuQyxZQUFZLEVBQUUsRUFBRTtTQUNqQixDQUFDO09BQ1csaUJBQWlCLENBQUc7SUFBRCx3QkFBQztDQUFBLEFBQWpDLElBQWlDO0FBQXBCLDhDQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBSb3V0ZXMgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgTmF0aXZlU2NyaXB0Um91dGVyTW9kdWxlIH0gZnJvbSAnbmF0aXZlc2NyaXB0LWFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IEhvbWVQYWdlQ29tcG9uZW50IH0gZnJvbSAnLi9ob21lLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBCdXlQYWdlQ29tcG9uZW50IH0gZnJvbSAnLi9idXktcGFnZS9idXktcGFnZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgQ3JlZGl0UGFnZUNvbXBvbmVudCB9IGZyb20gJy4vY3JlZGl0LXBhZ2UvY3JlZGl0LXBhZ2UuY29tcG9uZW50JztcbmltcG9ydCB7IEJhbGFuY2VQYWdlQ29tcG9uZW50IH0gZnJvbSAnLi9iYWxhbmNlLXBhZ2UvYmFsYW5jZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgVHJhbnNmZXJQYWdlQ29tcG9uZW50IH0gZnJvbSAnLi90cmFuc2Zlci1wYWdlL3RyYW5zZmVyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBVc2VyUGFnZUNvbXBvbmVudCB9IGZyb20gJy4vdXNlci1wYWdlL3VzZXIuY29tcG9uZW50JztcblxuY29uc3Qgcm91dGVzOiBSb3V0ZXMgPSBbXG4gIHtcbiAgICBwYXRoOiAnJyxcbiAgICBjb21wb25lbnQ6IEhvbWVQYWdlQ29tcG9uZW50LFxuICAgIGNoaWxkcmVuOiBbXG4gICAgICB7IHBhdGg6ICdidXknLCBjb21wb25lbnQ6IEJ1eVBhZ2VDb21wb25lbnQgfSxcbiAgICAgIHsgcGF0aDogJ2NyZWRpdCcsIGNvbXBvbmVudDogQ3JlZGl0UGFnZUNvbXBvbmVudCB9LFxuICAgICAgeyBwYXRoOiAnYmFsYW5jZScsIGNvbXBvbmVudDogQmFsYW5jZVBhZ2VDb21wb25lbnQgfSxcbiAgICAgIHsgcGF0aDogJ3RyYW5zZmVyJywgY29tcG9uZW50OiBUcmFuc2ZlclBhZ2VDb21wb25lbnQgfSxcbiAgICAgIHsgcGF0aDogJ3VzZXInLCBjb21wb25lbnQ6IFVzZXJQYWdlQ29tcG9uZW50IH1cbiAgICBdXG4gIH1cbl07XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtOYXRpdmVTY3JpcHRSb3V0ZXJNb2R1bGUuZm9yQ2hpbGQocm91dGVzKV0sXG4gIGV4cG9ydHM6IFtOYXRpdmVTY3JpcHRSb3V0ZXJNb2R1bGVdLFxuICBkZWNsYXJhdGlvbnM6IFtdXG59KVxuZXhwb3J0IGNsYXNzIEhvbWVSb3V0aW5nTW9kdWxlIHt9XG4iXX0=