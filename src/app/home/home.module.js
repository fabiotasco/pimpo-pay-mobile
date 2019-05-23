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
var common_1 = require("@angular/common");
var pt_1 = require("@angular/common/locales/pt");
common_1.registerLocaleData(pt_1.default, 'pt-BR');
var element_registry_1 = require("nativescript-angular/element-registry");
var loading_service_1 = require("../services/loading.service");
element_registry_1.registerElement('Fab', function () { return require('nativescript-floatingactionbutton').Fab; });
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
            providers: [
                nativescript_barcodescanner_1.BarcodeScanner,
                { provide: core_1.LOCALE_ID, useValue: 'pt-BR' },
                loading_service_1.LoadingService
            ],
            schemas: [core_1.NO_ERRORS_SCHEMA]
        })
    ], HomeModule);
    return HomeModule;
}());
exports.HomeModule = HomeModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9tZS5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJob21lLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFzRTtBQUV0RSxtREFBcUQ7QUFDckQsK0NBQW1EO0FBQ25ELG9FQUFpRTtBQUNqRSw2RUFBMEU7QUFDMUUsc0VBQXdFO0FBQ3hFLHlFQUEyRTtBQUMzRSw2REFBK0Q7QUFDL0QseURBQXVEO0FBQ3ZELDJFQUE2RDtBQUM3RCwwQ0FBcUQ7QUFDckQsaURBQThDO0FBQzlDLDJCQUFrQixDQUFDLFlBQUksRUFBRSxPQUFPLENBQUMsQ0FBQztBQUNsQywwRUFBd0U7QUFDeEUsK0RBQTZEO0FBQzdELGtDQUFlLENBQUMsS0FBSyxFQUFFLGNBQU0sT0FBQSxPQUFPLENBQUMsbUNBQW1DLENBQUMsQ0FBQyxHQUFHLEVBQWhELENBQWdELENBQUMsQ0FBQztBQW9CL0U7SUFBQTtJQUF5QixDQUFDO0lBQWIsVUFBVTtRQWxCdEIsZUFBUSxDQUFDO1lBQ1IsT0FBTyxFQUFFLENBQUMsZ0NBQWlCLEVBQUUsNEJBQVksQ0FBQztZQUMxQyxPQUFPLEVBQUUsRUFBRTtZQUNYLFlBQVksRUFBRTtnQkFDWixrQ0FBaUI7Z0JBQ2pCLHFDQUFnQjtnQkFDaEIsMkNBQW1CO2dCQUNuQix3Q0FBb0I7Z0JBQ3BCLDBDQUFxQjtnQkFDckIsa0NBQWlCO2FBQ2xCO1lBQ0QsU0FBUyxFQUFFO2dCQUNULDRDQUFjO2dCQUNkLEVBQUUsT0FBTyxFQUFFLGdCQUFTLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBRTtnQkFDekMsZ0NBQWM7YUFDZjtZQUNELE9BQU8sRUFBRSxDQUFDLHVCQUFnQixDQUFDO1NBQzVCLENBQUM7T0FDVyxVQUFVLENBQUc7SUFBRCxpQkFBQztDQUFBLEFBQTFCLElBQTBCO0FBQWIsZ0NBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSwgTk9fRVJST1JTX1NDSEVNQSwgTE9DQUxFX0lEIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IEhvbWVQYWdlQ29tcG9uZW50IH0gZnJvbSAnLi9ob21lLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBIb21lUm91dGluZ01vZHVsZSB9IGZyb20gJy4vaG9tZS5yb3V0aW5nJztcbmltcG9ydCB7IEJ1eVBhZ2VDb21wb25lbnQgfSBmcm9tICcuL2J1eS1wYWdlL2J1eS1wYWdlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBDcmVkaXRQYWdlQ29tcG9uZW50IH0gZnJvbSAnLi9jcmVkaXQtcGFnZS9jcmVkaXQtcGFnZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgQmFsYW5jZVBhZ2VDb21wb25lbnQgfSBmcm9tICcuL2JhbGFuY2UtcGFnZS9iYWxhbmNlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBUcmFuc2ZlclBhZ2VDb21wb25lbnQgfSBmcm9tICcuL3RyYW5zZmVyLXBhZ2UvdHJhbnNmZXIuY29tcG9uZW50JztcbmltcG9ydCB7IFVzZXJQYWdlQ29tcG9uZW50IH0gZnJvbSAnLi91c2VyLXBhZ2UvdXNlci5jb21wb25lbnQnO1xuaW1wb3J0IHsgU2hhcmVkTW9kdWxlIH0gZnJvbSAnLi4vc2hhcmVkL3NoYXJlZC5tb2R1bGUnO1xuaW1wb3J0IHsgQmFyY29kZVNjYW5uZXIgfSBmcm9tICduYXRpdmVzY3JpcHQtYmFyY29kZXNjYW5uZXInO1xuaW1wb3J0IHsgcmVnaXN0ZXJMb2NhbGVEYXRhIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCBwdEJyIGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9sb2NhbGVzL3B0JztcbnJlZ2lzdGVyTG9jYWxlRGF0YShwdEJyLCAncHQtQlInKTtcbmltcG9ydCB7IHJlZ2lzdGVyRWxlbWVudCB9IGZyb20gJ25hdGl2ZXNjcmlwdC1hbmd1bGFyL2VsZW1lbnQtcmVnaXN0cnknO1xuaW1wb3J0IHsgTG9hZGluZ1NlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9sb2FkaW5nLnNlcnZpY2UnO1xucmVnaXN0ZXJFbGVtZW50KCdGYWInLCAoKSA9PiByZXF1aXJlKCduYXRpdmVzY3JpcHQtZmxvYXRpbmdhY3Rpb25idXR0b24nKS5GYWIpO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbSG9tZVJvdXRpbmdNb2R1bGUsIFNoYXJlZE1vZHVsZV0sXG4gIGV4cG9ydHM6IFtdLFxuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBIb21lUGFnZUNvbXBvbmVudCxcbiAgICBCdXlQYWdlQ29tcG9uZW50LFxuICAgIENyZWRpdFBhZ2VDb21wb25lbnQsXG4gICAgQmFsYW5jZVBhZ2VDb21wb25lbnQsXG4gICAgVHJhbnNmZXJQYWdlQ29tcG9uZW50LFxuICAgIFVzZXJQYWdlQ29tcG9uZW50XG4gIF0sXG4gIHByb3ZpZGVyczogW1xuICAgIEJhcmNvZGVTY2FubmVyLFxuICAgIHsgcHJvdmlkZTogTE9DQUxFX0lELCB1c2VWYWx1ZTogJ3B0LUJSJyB9LFxuICAgIExvYWRpbmdTZXJ2aWNlXG4gIF0sXG4gIHNjaGVtYXM6IFtOT19FUlJPUlNfU0NIRU1BXVxufSlcbmV4cG9ydCBjbGFzcyBIb21lTW9kdWxlIHt9XG4iXX0=