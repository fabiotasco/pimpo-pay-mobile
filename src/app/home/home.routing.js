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
var detail_transaction_component_1 = require("./balance-page/detail-transaction/detail-transaction.component");
var routes = [
    {
        path: '',
        component: home_component_1.HomePageComponent,
        children: [
            { path: 'buy', component: buy_page_component_1.BuyPageComponent },
            { path: 'credit', component: credit_page_component_1.CreditPageComponent },
            { path: 'balance', component: balance_component_1.BalancePageComponent },
            { path: 'balance/detail', component: detail_transaction_component_1.DetailTransactionComponent },
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9tZS5yb3V0aW5nLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiaG9tZS5yb3V0aW5nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQXlDO0FBRXpDLHNEQUF1RTtBQUN2RSxtREFBcUQ7QUFDckQsb0VBQWlFO0FBQ2pFLDZFQUEwRTtBQUMxRSxzRUFBd0U7QUFDeEUseUVBQTJFO0FBQzNFLDZEQUErRDtBQUMvRCwrR0FBNEc7QUFFNUcsSUFBTSxNQUFNLEdBQVc7SUFDckI7UUFDRSxJQUFJLEVBQUUsRUFBRTtRQUNSLFNBQVMsRUFBRSxrQ0FBaUI7UUFDNUIsUUFBUSxFQUFFO1lBQ1IsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxxQ0FBZ0IsRUFBRTtZQUM1QyxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFFLDJDQUFtQixFQUFFO1lBQ2xELEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsd0NBQW9CLEVBQUU7WUFDcEQsRUFBRSxJQUFJLEVBQUUsZ0JBQWdCLEVBQUUsU0FBUyxFQUFFLHlEQUEwQixFQUFFO1lBQ2pFLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxTQUFTLEVBQUUsMENBQXFCLEVBQUU7WUFDdEQsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxrQ0FBaUIsRUFBRTtTQUMvQztLQUNGO0NBQ0YsQ0FBQztBQU9GO0lBQUE7SUFBZ0MsQ0FBQztJQUFwQixpQkFBaUI7UUFMN0IsZUFBUSxDQUFDO1lBQ1IsT0FBTyxFQUFFLENBQUMsaUNBQXdCLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ3BELE9BQU8sRUFBRSxDQUFDLGlDQUF3QixDQUFDO1lBQ25DLFlBQVksRUFBRSxFQUFFO1NBQ2pCLENBQUM7T0FDVyxpQkFBaUIsQ0FBRztJQUFELHdCQUFDO0NBQUEsQUFBakMsSUFBaUM7QUFBcEIsOENBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFJvdXRlcyB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRSb3V0ZXJNb2R1bGUgfSBmcm9tICduYXRpdmVzY3JpcHQtYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgSG9tZVBhZ2VDb21wb25lbnQgfSBmcm9tICcuL2hvbWUuY29tcG9uZW50JztcbmltcG9ydCB7IEJ1eVBhZ2VDb21wb25lbnQgfSBmcm9tICcuL2J1eS1wYWdlL2J1eS1wYWdlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBDcmVkaXRQYWdlQ29tcG9uZW50IH0gZnJvbSAnLi9jcmVkaXQtcGFnZS9jcmVkaXQtcGFnZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgQmFsYW5jZVBhZ2VDb21wb25lbnQgfSBmcm9tICcuL2JhbGFuY2UtcGFnZS9iYWxhbmNlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBUcmFuc2ZlclBhZ2VDb21wb25lbnQgfSBmcm9tICcuL3RyYW5zZmVyLXBhZ2UvdHJhbnNmZXIuY29tcG9uZW50JztcbmltcG9ydCB7IFVzZXJQYWdlQ29tcG9uZW50IH0gZnJvbSAnLi91c2VyLXBhZ2UvdXNlci5jb21wb25lbnQnO1xuaW1wb3J0IHsgRGV0YWlsVHJhbnNhY3Rpb25Db21wb25lbnQgfSBmcm9tICcuL2JhbGFuY2UtcGFnZS9kZXRhaWwtdHJhbnNhY3Rpb24vZGV0YWlsLXRyYW5zYWN0aW9uLmNvbXBvbmVudCc7XG5cbmNvbnN0IHJvdXRlczogUm91dGVzID0gW1xuICB7XG4gICAgcGF0aDogJycsXG4gICAgY29tcG9uZW50OiBIb21lUGFnZUNvbXBvbmVudCxcbiAgICBjaGlsZHJlbjogW1xuICAgICAgeyBwYXRoOiAnYnV5JywgY29tcG9uZW50OiBCdXlQYWdlQ29tcG9uZW50IH0sXG4gICAgICB7IHBhdGg6ICdjcmVkaXQnLCBjb21wb25lbnQ6IENyZWRpdFBhZ2VDb21wb25lbnQgfSxcbiAgICAgIHsgcGF0aDogJ2JhbGFuY2UnLCBjb21wb25lbnQ6IEJhbGFuY2VQYWdlQ29tcG9uZW50IH0sXG4gICAgICB7IHBhdGg6ICdiYWxhbmNlL2RldGFpbCcsIGNvbXBvbmVudDogRGV0YWlsVHJhbnNhY3Rpb25Db21wb25lbnQgfSxcbiAgICAgIHsgcGF0aDogJ3RyYW5zZmVyJywgY29tcG9uZW50OiBUcmFuc2ZlclBhZ2VDb21wb25lbnQgfSxcbiAgICAgIHsgcGF0aDogJ3VzZXInLCBjb21wb25lbnQ6IFVzZXJQYWdlQ29tcG9uZW50IH1cbiAgICBdXG4gIH1cbl07XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtOYXRpdmVTY3JpcHRSb3V0ZXJNb2R1bGUuZm9yQ2hpbGQocm91dGVzKV0sXG4gIGV4cG9ydHM6IFtOYXRpdmVTY3JpcHRSb3V0ZXJNb2R1bGVdLFxuICBkZWNsYXJhdGlvbnM6IFtdXG59KVxuZXhwb3J0IGNsYXNzIEhvbWVSb3V0aW5nTW9kdWxlIHt9XG4iXX0=