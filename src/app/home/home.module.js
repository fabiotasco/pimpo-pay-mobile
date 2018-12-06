"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var home_component_1 = require("./home.component");
var home_routing_1 = require("./home.routing");
var buy_page_component_1 = require("./buy-page/buy-page.component");
var credit_page_component_1 = require("./credit-page/credit-page.component");
var balance_component_1 = require("./balance-page/balance.component");
var transfer_component_1 = require("./transfer-page/transfer.component");
var user_component_1 = require("./user-page/user.component");
var shared_module_1 = require("../shared/shared.module");
var HomeModule = /** @class */ (function () {
    function HomeModule() {
    }
    HomeModule = __decorate([
        core_1.NgModule({
            imports: [home_routing_1.HomeRoutingModule, shared_module_1.SharedModule],
            exports: [],
            declarations: [
                home_component_1.HomePageComponent,
                buy_page_component_1.BuyPageComponent,
                credit_page_component_1.CreditPageComponent,
                balance_component_1.BalancePageComponent,
                transfer_component_1.TransferPageComponent,
                user_component_1.UserPageComponent
            ],
            providers: [],
            schemas: [core_1.NO_ERRORS_SCHEMA]
        })
    ], HomeModule);
    return HomeModule;
}());
exports.HomeModule = HomeModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9tZS5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJob21lLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUEyRDtBQUkzRCxtREFBcUQ7QUFDckQsK0NBQW1EO0FBRW5ELG9FQUFpRTtBQUNqRSw2RUFBMEU7QUFDMUUsc0VBQXdFO0FBQ3hFLHlFQUEyRTtBQUMzRSw2REFBK0Q7QUFDL0QseURBQXVEO0FBZ0J2RDtJQUFBO0lBQXlCLENBQUM7SUFBYixVQUFVO1FBZHRCLGVBQVEsQ0FBQztZQUNSLE9BQU8sRUFBRSxDQUFDLGdDQUFpQixFQUFFLDRCQUFZLENBQUM7WUFDMUMsT0FBTyxFQUFFLEVBQUU7WUFDWCxZQUFZLEVBQUU7Z0JBQ1osa0NBQWlCO2dCQUNqQixxQ0FBZ0I7Z0JBQ2hCLDJDQUFtQjtnQkFDbkIsd0NBQW9CO2dCQUNwQiwwQ0FBcUI7Z0JBQ3JCLGtDQUFpQjthQUNsQjtZQUNELFNBQVMsRUFBRSxFQUFFO1lBQ2IsT0FBTyxFQUFFLENBQUMsdUJBQWdCLENBQUM7U0FDNUIsQ0FBQztPQUNXLFVBQVUsQ0FBRztJQUFELGlCQUFDO0NBQUEsQUFBMUIsSUFBMEI7QUFBYixnQ0FBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlLCBOT19FUlJPUlNfU0NIRU1BIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRDb21tb25Nb2R1bGUgfSBmcm9tICduYXRpdmVzY3JpcHQtYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmF0aXZlU2NyaXB0Rm9ybXNNb2R1bGUgfSBmcm9tICduYXRpdmVzY3JpcHQtYW5ndWxhci9mb3Jtcyc7XG5cbmltcG9ydCB7IEhvbWVQYWdlQ29tcG9uZW50IH0gZnJvbSAnLi9ob21lLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBIb21lUm91dGluZ01vZHVsZSB9IGZyb20gJy4vaG9tZS5yb3V0aW5nJztcbmltcG9ydCB7IEJvdHRvbU1vZHVsZSB9IGZyb20gJy4uL2NvbXBvbmVudHMvYm90dG9tLWJhci9ib3R0b20tYmFyLm1vZHVsZSc7XG5pbXBvcnQgeyBCdXlQYWdlQ29tcG9uZW50IH0gZnJvbSAnLi9idXktcGFnZS9idXktcGFnZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgQ3JlZGl0UGFnZUNvbXBvbmVudCB9IGZyb20gJy4vY3JlZGl0LXBhZ2UvY3JlZGl0LXBhZ2UuY29tcG9uZW50JztcbmltcG9ydCB7IEJhbGFuY2VQYWdlQ29tcG9uZW50IH0gZnJvbSAnLi9iYWxhbmNlLXBhZ2UvYmFsYW5jZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgVHJhbnNmZXJQYWdlQ29tcG9uZW50IH0gZnJvbSAnLi90cmFuc2Zlci1wYWdlL3RyYW5zZmVyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBVc2VyUGFnZUNvbXBvbmVudCB9IGZyb20gJy4vdXNlci1wYWdlL3VzZXIuY29tcG9uZW50JztcbmltcG9ydCB7IFNoYXJlZE1vZHVsZSB9IGZyb20gJy4uL3NoYXJlZC9zaGFyZWQubW9kdWxlJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW0hvbWVSb3V0aW5nTW9kdWxlLCBTaGFyZWRNb2R1bGVdLFxuICBleHBvcnRzOiBbXSxcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgSG9tZVBhZ2VDb21wb25lbnQsXG4gICAgQnV5UGFnZUNvbXBvbmVudCxcbiAgICBDcmVkaXRQYWdlQ29tcG9uZW50LFxuICAgIEJhbGFuY2VQYWdlQ29tcG9uZW50LFxuICAgIFRyYW5zZmVyUGFnZUNvbXBvbmVudCxcbiAgICBVc2VyUGFnZUNvbXBvbmVudFxuICBdLFxuICBwcm92aWRlcnM6IFtdLFxuICBzY2hlbWFzOiBbTk9fRVJST1JTX1NDSEVNQV1cbn0pXG5leHBvcnQgY2xhc3MgSG9tZU1vZHVsZSB7fVxuIl19