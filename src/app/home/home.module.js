"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("nativescript-angular/common");
var forms_1 = require("nativescript-angular/forms");
var home_component_1 = require("./home.component");
var home_routing_1 = require("./home.routing");
var bottom_bar_module_1 = require("../components/bottom-bar/bottom-bar.module");
var buy_page_component_1 = require("./buy-page/buy-page.component");
var credit_page_component_1 = require("./credit-page/credit-page.component");
var balance_component_1 = require("./balance-page/balance.component");
var transfer_component_1 = require("./transfer-page/transfer.component");
var user_component_1 = require("./user-page/user.component");
var HomeModule = /** @class */ (function () {
    function HomeModule() {
    }
    HomeModule = __decorate([
        core_1.NgModule({
            imports: [common_1.NativeScriptCommonModule, forms_1.NativeScriptFormsModule, home_routing_1.HomeRoutingModule, bottom_bar_module_1.BottomModule],
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9tZS5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJob21lLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUEyRDtBQUMzRCxzREFBdUU7QUFDdkUsb0RBQXFFO0FBRXJFLG1EQUFxRDtBQUNyRCwrQ0FBbUQ7QUFDbkQsZ0ZBQTBFO0FBQzFFLG9FQUFpRTtBQUNqRSw2RUFBMEU7QUFDMUUsc0VBQXdFO0FBQ3hFLHlFQUEyRTtBQUMzRSw2REFBK0Q7QUFnQi9EO0lBQUE7SUFBeUIsQ0FBQztJQUFiLFVBQVU7UUFkdEIsZUFBUSxDQUFDO1lBQ1IsT0FBTyxFQUFFLENBQUMsaUNBQXdCLEVBQUUsK0JBQXVCLEVBQUUsZ0NBQWlCLEVBQUUsZ0NBQVksQ0FBQztZQUM3RixPQUFPLEVBQUUsRUFBRTtZQUNYLFlBQVksRUFBRTtnQkFDWixrQ0FBaUI7Z0JBQ2pCLHFDQUFnQjtnQkFDaEIsMkNBQW1CO2dCQUNuQix3Q0FBb0I7Z0JBQ3BCLDBDQUFxQjtnQkFDckIsa0NBQWlCO2FBQ2xCO1lBQ0QsU0FBUyxFQUFFLEVBQUU7WUFDYixPQUFPLEVBQUUsQ0FBQyx1QkFBZ0IsQ0FBQztTQUM1QixDQUFDO09BQ1csVUFBVSxDQUFHO0lBQUQsaUJBQUM7Q0FBQSxBQUExQixJQUEwQjtBQUFiLGdDQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUsIE5PX0VSUk9SU19TQ0hFTUEgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5hdGl2ZVNjcmlwdENvbW1vbk1vZHVsZSB9IGZyb20gJ25hdGl2ZXNjcmlwdC1hbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRGb3Jtc01vZHVsZSB9IGZyb20gJ25hdGl2ZXNjcmlwdC1hbmd1bGFyL2Zvcm1zJztcblxuaW1wb3J0IHsgSG9tZVBhZ2VDb21wb25lbnQgfSBmcm9tICcuL2hvbWUuY29tcG9uZW50JztcbmltcG9ydCB7IEhvbWVSb3V0aW5nTW9kdWxlIH0gZnJvbSAnLi9ob21lLnJvdXRpbmcnO1xuaW1wb3J0IHsgQm90dG9tTW9kdWxlIH0gZnJvbSAnLi4vY29tcG9uZW50cy9ib3R0b20tYmFyL2JvdHRvbS1iYXIubW9kdWxlJztcbmltcG9ydCB7IEJ1eVBhZ2VDb21wb25lbnQgfSBmcm9tICcuL2J1eS1wYWdlL2J1eS1wYWdlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBDcmVkaXRQYWdlQ29tcG9uZW50IH0gZnJvbSAnLi9jcmVkaXQtcGFnZS9jcmVkaXQtcGFnZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgQmFsYW5jZVBhZ2VDb21wb25lbnQgfSBmcm9tICcuL2JhbGFuY2UtcGFnZS9iYWxhbmNlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBUcmFuc2ZlclBhZ2VDb21wb25lbnQgfSBmcm9tICcuL3RyYW5zZmVyLXBhZ2UvdHJhbnNmZXIuY29tcG9uZW50JztcbmltcG9ydCB7IFVzZXJQYWdlQ29tcG9uZW50IH0gZnJvbSAnLi91c2VyLXBhZ2UvdXNlci5jb21wb25lbnQnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbTmF0aXZlU2NyaXB0Q29tbW9uTW9kdWxlLCBOYXRpdmVTY3JpcHRGb3Jtc01vZHVsZSwgSG9tZVJvdXRpbmdNb2R1bGUsIEJvdHRvbU1vZHVsZV0sXG4gIGV4cG9ydHM6IFtdLFxuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBIb21lUGFnZUNvbXBvbmVudCxcbiAgICBCdXlQYWdlQ29tcG9uZW50LFxuICAgIENyZWRpdFBhZ2VDb21wb25lbnQsXG4gICAgQmFsYW5jZVBhZ2VDb21wb25lbnQsXG4gICAgVHJhbnNmZXJQYWdlQ29tcG9uZW50LFxuICAgIFVzZXJQYWdlQ29tcG9uZW50XG4gIF0sXG4gIHByb3ZpZGVyczogW10sXG4gIHNjaGVtYXM6IFtOT19FUlJPUlNfU0NIRU1BXVxufSlcbmV4cG9ydCBjbGFzcyBIb21lTW9kdWxlIHt9XG4iXX0=