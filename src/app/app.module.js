"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var nativescript_module_1 = require("nativescript-angular/nativescript.module");
var app_routing_module_1 = require("./app-routing.module");
var app_component_1 = require("./app.component");
var http_client_1 = require("nativescript-angular/http-client");
var login_component_1 = require("./login/login.component");
var forms_1 = require("nativescript-angular/forms");
var http_1 = require("@angular/common/http");
var http_interceptor_1 = require("./core/http.interceptor");
var angular_1 = require("nativescript-drop-down/angular");
var angular_2 = require("nativescript-ui-listview/angular");
var new_account_component_1 = require("./login/new-account/new-account.component");
var nativescript_ng_shadow_1 = require("nativescript-ng-shadow");
var forms_2 = require("@angular/forms");
var shared_module_1 = require("./shared/shared.module");
var detail_transaction_component_1 = require("./home/balance-page/detail-transaction/detail-transaction.component");
var AppModule = /** @class */ (function () {
    /*
    Pass your application module to the bootstrapModule function located in main.ts to start your app
    */
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            bootstrap: [app_component_1.AppComponent],
            imports: [
                nativescript_module_1.NativeScriptModule,
                shared_module_1.SharedModule,
                forms_1.NativeScriptFormsModule,
                forms_2.ReactiveFormsModule,
                app_routing_module_1.AppRoutingModule,
                http_client_1.NativeScriptHttpClientModule,
                angular_2.NativeScriptUIListViewModule,
                nativescript_ng_shadow_1.NgShadowModule,
                angular_1.DropDownModule
            ],
            declarations: [
                app_component_1.AppComponent,
                login_component_1.LoginPageComponent,
                new_account_component_1.NewAccountComponent,
                detail_transaction_component_1.DetailTransactionComponent
            ],
            providers: [
                { provide: http_1.HTTP_INTERCEPTORS, useClass: http_interceptor_1.HeaderInterceptor, multi: true }
            ],
            schemas: [core_1.NO_ERRORS_SCHEMA]
        })
        /*
        Pass your application module to the bootstrapModule function located in main.ts to start your app
        */
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFwcC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBMkQ7QUFDM0QsZ0ZBQThFO0FBRTlFLDJEQUF3RDtBQUN4RCxpREFBK0M7QUFFL0MsZ0VBQWdGO0FBQ2hGLDJEQUE2RDtBQUM3RCxvREFBcUU7QUFDckUsNkNBQXlEO0FBQ3pELDREQUE0RDtBQUM1RCwwREFBZ0U7QUFDaEUsNERBQWdGO0FBQ2hGLG1GQUFnRjtBQUNoRixpRUFBd0Q7QUFDeEQsd0NBQXFEO0FBQ3JELHdEQUFzRDtBQUN0RCxvSEFBaUg7QUE2QmpIO0lBSEE7O01BRUU7SUFDRjtJQUF3QixDQUFDO0lBQVosU0FBUztRQTNCckIsZUFBUSxDQUFDO1lBQ1IsU0FBUyxFQUFFLENBQUMsNEJBQVksQ0FBQztZQUN6QixPQUFPLEVBQUU7Z0JBQ1Asd0NBQWtCO2dCQUNsQiw0QkFBWTtnQkFDWiwrQkFBdUI7Z0JBQ3ZCLDJCQUFtQjtnQkFDbkIscUNBQWdCO2dCQUNoQiwwQ0FBNEI7Z0JBQzVCLHNDQUE0QjtnQkFDNUIsdUNBQWM7Z0JBQ2Qsd0JBQWM7YUFDZjtZQUNELFlBQVksRUFBRTtnQkFDWiw0QkFBWTtnQkFDWixvQ0FBa0I7Z0JBQ2xCLDJDQUFtQjtnQkFDbkIseURBQTBCO2FBQzNCO1lBQ0QsU0FBUyxFQUFFO2dCQUNULEVBQUUsT0FBTyxFQUFFLHdCQUFpQixFQUFFLFFBQVEsRUFBRSxvQ0FBaUIsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFO2FBQ3pFO1lBQ0QsT0FBTyxFQUFFLENBQUMsdUJBQWdCLENBQUM7U0FDNUIsQ0FBQztRQUNGOztVQUVFO09BQ1csU0FBUyxDQUFHO0lBQUQsZ0JBQUM7Q0FBQSxBQUF6QixJQUF5QjtBQUFaLDhCQUFTIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUsIE5PX0VSUk9SU19TQ0hFTUEgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5hdGl2ZVNjcmlwdE1vZHVsZSB9IGZyb20gJ25hdGl2ZXNjcmlwdC1hbmd1bGFyL25hdGl2ZXNjcmlwdC5tb2R1bGUnO1xuXG5pbXBvcnQgeyBBcHBSb3V0aW5nTW9kdWxlIH0gZnJvbSAnLi9hcHAtcm91dGluZy5tb2R1bGUnO1xuaW1wb3J0IHsgQXBwQ29tcG9uZW50IH0gZnJvbSAnLi9hcHAuY29tcG9uZW50JztcblxuaW1wb3J0IHsgTmF0aXZlU2NyaXB0SHR0cENsaWVudE1vZHVsZSB9IGZyb20gJ25hdGl2ZXNjcmlwdC1hbmd1bGFyL2h0dHAtY2xpZW50JztcbmltcG9ydCB7IExvZ2luUGFnZUNvbXBvbmVudCB9IGZyb20gJy4vbG9naW4vbG9naW4uY29tcG9uZW50JztcbmltcG9ydCB7IE5hdGl2ZVNjcmlwdEZvcm1zTW9kdWxlIH0gZnJvbSAnbmF0aXZlc2NyaXB0LWFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgSFRUUF9JTlRFUkNFUFRPUlMgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBIZWFkZXJJbnRlcmNlcHRvciB9IGZyb20gJy4vY29yZS9odHRwLmludGVyY2VwdG9yJztcbmltcG9ydCB7IERyb3BEb3duTW9kdWxlIH0gZnJvbSAnbmF0aXZlc2NyaXB0LWRyb3AtZG93bi9hbmd1bGFyJztcbmltcG9ydCB7IE5hdGl2ZVNjcmlwdFVJTGlzdFZpZXdNb2R1bGUgfSBmcm9tICduYXRpdmVzY3JpcHQtdWktbGlzdHZpZXcvYW5ndWxhcic7XG5pbXBvcnQgeyBOZXdBY2NvdW50Q29tcG9uZW50IH0gZnJvbSAnLi9sb2dpbi9uZXctYWNjb3VudC9uZXctYWNjb3VudC5jb21wb25lbnQnO1xuaW1wb3J0IHsgTmdTaGFkb3dNb2R1bGUgfSBmcm9tICduYXRpdmVzY3JpcHQtbmctc2hhZG93JztcbmltcG9ydCB7IFJlYWN0aXZlRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBTaGFyZWRNb2R1bGUgfSBmcm9tICcuL3NoYXJlZC9zaGFyZWQubW9kdWxlJztcbmltcG9ydCB7IERldGFpbFRyYW5zYWN0aW9uQ29tcG9uZW50IH0gZnJvbSAnLi9ob21lL2JhbGFuY2UtcGFnZS9kZXRhaWwtdHJhbnNhY3Rpb24vZGV0YWlsLXRyYW5zYWN0aW9uLmNvbXBvbmVudCc7XG5cbkBOZ01vZHVsZSh7XG4gIGJvb3RzdHJhcDogW0FwcENvbXBvbmVudF0sXG4gIGltcG9ydHM6IFtcbiAgICBOYXRpdmVTY3JpcHRNb2R1bGUsXG4gICAgU2hhcmVkTW9kdWxlLFxuICAgIE5hdGl2ZVNjcmlwdEZvcm1zTW9kdWxlLFxuICAgIFJlYWN0aXZlRm9ybXNNb2R1bGUsXG4gICAgQXBwUm91dGluZ01vZHVsZSxcbiAgICBOYXRpdmVTY3JpcHRIdHRwQ2xpZW50TW9kdWxlLFxuICAgIE5hdGl2ZVNjcmlwdFVJTGlzdFZpZXdNb2R1bGUsXG4gICAgTmdTaGFkb3dNb2R1bGUsXG4gICAgRHJvcERvd25Nb2R1bGVcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgQXBwQ29tcG9uZW50LFxuICAgIExvZ2luUGFnZUNvbXBvbmVudCxcbiAgICBOZXdBY2NvdW50Q29tcG9uZW50LFxuICAgIERldGFpbFRyYW5zYWN0aW9uQ29tcG9uZW50XG4gIF0sXG4gIHByb3ZpZGVyczogW1xuICAgIHsgcHJvdmlkZTogSFRUUF9JTlRFUkNFUFRPUlMsIHVzZUNsYXNzOiBIZWFkZXJJbnRlcmNlcHRvciwgbXVsdGk6IHRydWUgfVxuICBdLFxuICBzY2hlbWFzOiBbTk9fRVJST1JTX1NDSEVNQV1cbn0pXG4vKlxuUGFzcyB5b3VyIGFwcGxpY2F0aW9uIG1vZHVsZSB0byB0aGUgYm9vdHN0cmFwTW9kdWxlIGZ1bmN0aW9uIGxvY2F0ZWQgaW4gbWFpbi50cyB0byBzdGFydCB5b3VyIGFwcFxuKi9cbmV4cG9ydCBjbGFzcyBBcHBNb2R1bGUge31cbiJdfQ==