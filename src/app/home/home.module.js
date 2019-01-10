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
var nativescript_barcodescanner_1 = require("nativescript-barcodescanner");
var HomeModule = /** @class */ (function () {
    function HomeModule() {
    }
    HomeModule = __decorate([
        core_1.NgModule({
            imports: [home_routing_1.HomeRoutingModule, shared_module_1.SharedModule],
            exports: [],
            declarations: [home_component_1.HomePageComponent, buy_page_component_1.BuyPageComponent, credit_page_component_1.CreditPageComponent, balance_component_1.BalancePageComponent, transfer_component_1.TransferPageComponent, user_component_1.UserPageComponent],
            providers: [nativescript_barcodescanner_1.BarcodeScanner],
            schemas: [core_1.NO_ERRORS_SCHEMA]
        })
    ], HomeModule);
    return HomeModule;
}());
exports.HomeModule = HomeModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9tZS5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJob21lLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUEyRDtBQUUzRCxtREFBcUQ7QUFDckQsK0NBQW1EO0FBQ25ELG9FQUFpRTtBQUNqRSw2RUFBMEU7QUFDMUUsc0VBQXdFO0FBQ3hFLHlFQUEyRTtBQUMzRSw2REFBK0Q7QUFDL0QseURBQXVEO0FBQ3ZELDJFQUE2RDtBQVM3RDtJQUFBO0lBQXlCLENBQUM7SUFBYixVQUFVO1FBUHRCLGVBQVEsQ0FBQztZQUNSLE9BQU8sRUFBRSxDQUFDLGdDQUFpQixFQUFFLDRCQUFZLENBQUM7WUFDMUMsT0FBTyxFQUFFLEVBQUU7WUFDWCxZQUFZLEVBQUUsQ0FBQyxrQ0FBaUIsRUFBRSxxQ0FBZ0IsRUFBRSwyQ0FBbUIsRUFBRSx3Q0FBb0IsRUFBRSwwQ0FBcUIsRUFBRSxrQ0FBaUIsQ0FBQztZQUN4SSxTQUFTLEVBQUUsQ0FBQyw0Q0FBYyxDQUFDO1lBQzNCLE9BQU8sRUFBRSxDQUFDLHVCQUFnQixDQUFDO1NBQzVCLENBQUM7T0FDVyxVQUFVLENBQUc7SUFBRCxpQkFBQztDQUFBLEFBQTFCLElBQTBCO0FBQWIsZ0NBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSwgTk9fRVJST1JTX1NDSEVNQSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBIb21lUGFnZUNvbXBvbmVudCB9IGZyb20gJy4vaG9tZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgSG9tZVJvdXRpbmdNb2R1bGUgfSBmcm9tICcuL2hvbWUucm91dGluZyc7XG5pbXBvcnQgeyBCdXlQYWdlQ29tcG9uZW50IH0gZnJvbSAnLi9idXktcGFnZS9idXktcGFnZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgQ3JlZGl0UGFnZUNvbXBvbmVudCB9IGZyb20gJy4vY3JlZGl0LXBhZ2UvY3JlZGl0LXBhZ2UuY29tcG9uZW50JztcbmltcG9ydCB7IEJhbGFuY2VQYWdlQ29tcG9uZW50IH0gZnJvbSAnLi9iYWxhbmNlLXBhZ2UvYmFsYW5jZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgVHJhbnNmZXJQYWdlQ29tcG9uZW50IH0gZnJvbSAnLi90cmFuc2Zlci1wYWdlL3RyYW5zZmVyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBVc2VyUGFnZUNvbXBvbmVudCB9IGZyb20gJy4vdXNlci1wYWdlL3VzZXIuY29tcG9uZW50JztcbmltcG9ydCB7IFNoYXJlZE1vZHVsZSB9IGZyb20gJy4uL3NoYXJlZC9zaGFyZWQubW9kdWxlJztcbmltcG9ydCB7IEJhcmNvZGVTY2FubmVyIH0gZnJvbSAnbmF0aXZlc2NyaXB0LWJhcmNvZGVzY2FubmVyJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW0hvbWVSb3V0aW5nTW9kdWxlLCBTaGFyZWRNb2R1bGVdLFxuICBleHBvcnRzOiBbXSxcbiAgZGVjbGFyYXRpb25zOiBbSG9tZVBhZ2VDb21wb25lbnQsIEJ1eVBhZ2VDb21wb25lbnQsIENyZWRpdFBhZ2VDb21wb25lbnQsIEJhbGFuY2VQYWdlQ29tcG9uZW50LCBUcmFuc2ZlclBhZ2VDb21wb25lbnQsIFVzZXJQYWdlQ29tcG9uZW50XSxcbiAgcHJvdmlkZXJzOiBbQmFyY29kZVNjYW5uZXJdLFxuICBzY2hlbWFzOiBbTk9fRVJST1JTX1NDSEVNQV1cbn0pXG5leHBvcnQgY2xhc3MgSG9tZU1vZHVsZSB7fVxuIl19