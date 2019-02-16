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
                user_component_1.UserPageComponent,
            ],
            providers: [nativescript_barcodescanner_1.BarcodeScanner, { provide: core_1.LOCALE_ID, useValue: 'pt-BR' }],
            schemas: [core_1.NO_ERRORS_SCHEMA]
        })
    ], HomeModule);
    return HomeModule;
}());
exports.HomeModule = HomeModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9tZS5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJob21lLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFzRTtBQUV0RSxtREFBcUQ7QUFDckQsK0NBQW1EO0FBQ25ELG9FQUFpRTtBQUNqRSw2RUFBMEU7QUFDMUUsc0VBQXdFO0FBQ3hFLHlFQUEyRTtBQUMzRSw2REFBK0Q7QUFDL0QseURBQXVEO0FBQ3ZELDJFQUE2RDtBQUM3RCwwQ0FBcUQ7QUFDckQsaURBQThDO0FBQzlDLDJCQUFrQixDQUFDLFlBQUksRUFBRSxPQUFPLENBQUMsQ0FBQztBQUNsQywwRUFBd0U7QUFDeEUsa0NBQWUsQ0FBQyxLQUFLLEVBQUUsY0FBTSxPQUFBLE9BQU8sQ0FBQyxtQ0FBbUMsQ0FBQyxDQUFDLEdBQUcsRUFBaEQsQ0FBZ0QsQ0FBQyxDQUFDO0FBZ0IvRTtJQUFBO0lBQXlCLENBQUM7SUFBYixVQUFVO1FBZHRCLGVBQVEsQ0FBQztZQUNSLE9BQU8sRUFBRSxDQUFDLGdDQUFpQixFQUFFLDRCQUFZLENBQUM7WUFDMUMsT0FBTyxFQUFFLEVBQUU7WUFDWCxZQUFZLEVBQUU7Z0JBQ1osa0NBQWlCO2dCQUNqQixxQ0FBZ0I7Z0JBQ2hCLDJDQUFtQjtnQkFDbkIsd0NBQW9CO2dCQUNwQiwwQ0FBcUI7Z0JBQ3JCLGtDQUFpQjthQUNsQjtZQUNELFNBQVMsRUFBRSxDQUFDLDRDQUFjLEVBQUUsRUFBRSxPQUFPLEVBQUUsZ0JBQVMsRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFFLENBQUM7WUFDdEUsT0FBTyxFQUFFLENBQUMsdUJBQWdCLENBQUM7U0FDNUIsQ0FBQztPQUNXLFVBQVUsQ0FBRztJQUFELGlCQUFDO0NBQUEsQUFBMUIsSUFBMEI7QUFBYixnQ0FBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlLCBOT19FUlJPUlNfU0NIRU1BLCBMT0NBTEVfSUQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgSG9tZVBhZ2VDb21wb25lbnQgfSBmcm9tICcuL2hvbWUuY29tcG9uZW50JztcbmltcG9ydCB7IEhvbWVSb3V0aW5nTW9kdWxlIH0gZnJvbSAnLi9ob21lLnJvdXRpbmcnO1xuaW1wb3J0IHsgQnV5UGFnZUNvbXBvbmVudCB9IGZyb20gJy4vYnV5LXBhZ2UvYnV5LXBhZ2UuY29tcG9uZW50JztcbmltcG9ydCB7IENyZWRpdFBhZ2VDb21wb25lbnQgfSBmcm9tICcuL2NyZWRpdC1wYWdlL2NyZWRpdC1wYWdlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBCYWxhbmNlUGFnZUNvbXBvbmVudCB9IGZyb20gJy4vYmFsYW5jZS1wYWdlL2JhbGFuY2UuY29tcG9uZW50JztcbmltcG9ydCB7IFRyYW5zZmVyUGFnZUNvbXBvbmVudCB9IGZyb20gJy4vdHJhbnNmZXItcGFnZS90cmFuc2Zlci5jb21wb25lbnQnO1xuaW1wb3J0IHsgVXNlclBhZ2VDb21wb25lbnQgfSBmcm9tICcuL3VzZXItcGFnZS91c2VyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBTaGFyZWRNb2R1bGUgfSBmcm9tICcuLi9zaGFyZWQvc2hhcmVkLm1vZHVsZSc7XG5pbXBvcnQgeyBCYXJjb2RlU2Nhbm5lciB9IGZyb20gJ25hdGl2ZXNjcmlwdC1iYXJjb2Rlc2Nhbm5lcic7XG5pbXBvcnQgeyByZWdpc3RlckxvY2FsZURhdGEgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHB0QnIgZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2xvY2FsZXMvcHQnO1xucmVnaXN0ZXJMb2NhbGVEYXRhKHB0QnIsICdwdC1CUicpO1xuaW1wb3J0IHsgcmVnaXN0ZXJFbGVtZW50IH0gZnJvbSAnbmF0aXZlc2NyaXB0LWFuZ3VsYXIvZWxlbWVudC1yZWdpc3RyeSc7XG5yZWdpc3RlckVsZW1lbnQoJ0ZhYicsICgpID0+IHJlcXVpcmUoJ25hdGl2ZXNjcmlwdC1mbG9hdGluZ2FjdGlvbmJ1dHRvbicpLkZhYik7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtIb21lUm91dGluZ01vZHVsZSwgU2hhcmVkTW9kdWxlXSxcbiAgZXhwb3J0czogW10sXG4gIGRlY2xhcmF0aW9uczogW1xuICAgIEhvbWVQYWdlQ29tcG9uZW50LFxuICAgIEJ1eVBhZ2VDb21wb25lbnQsXG4gICAgQ3JlZGl0UGFnZUNvbXBvbmVudCxcbiAgICBCYWxhbmNlUGFnZUNvbXBvbmVudCxcbiAgICBUcmFuc2ZlclBhZ2VDb21wb25lbnQsXG4gICAgVXNlclBhZ2VDb21wb25lbnQsXG4gIF0sXG4gIHByb3ZpZGVyczogW0JhcmNvZGVTY2FubmVyLCB7IHByb3ZpZGU6IExPQ0FMRV9JRCwgdXNlVmFsdWU6ICdwdC1CUicgfV0sXG4gIHNjaGVtYXM6IFtOT19FUlJPUlNfU0NIRU1BXVxufSlcbmV4cG9ydCBjbGFzcyBIb21lTW9kdWxlIHt9XG4iXX0=