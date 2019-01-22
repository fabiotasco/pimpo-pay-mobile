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
            declarations: [app_component_1.AppComponent, login_component_1.LoginPageComponent, new_account_component_1.NewAccountComponent],
            providers: [{ provide: http_1.HTTP_INTERCEPTORS, useClass: http_interceptor_1.HeaderInterceptor, multi: true }],
            schemas: [core_1.NO_ERRORS_SCHEMA]
        })
        /*
        Pass your application module to the bootstrapModule function located in main.ts to start your app
        */
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFwcC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBMkQ7QUFDM0QsZ0ZBQThFO0FBRTlFLDJEQUF3RDtBQUN4RCxpREFBK0M7QUFFL0MsZ0VBQWdGO0FBQ2hGLDJEQUE2RDtBQUM3RCxvREFBcUU7QUFDckUsNkNBQXlEO0FBQ3pELDREQUE0RDtBQUM1RCwwREFBZ0U7QUFDaEUsNERBQWdGO0FBQ2hGLG1GQUFnRjtBQUNoRixpRUFBd0Q7QUFDeEQsd0NBQXFEO0FBQ3JELHdEQUFzRDtBQXNCdEQ7SUFIQTs7TUFFRTtJQUNGO0lBQXdCLENBQUM7SUFBWixTQUFTO1FBcEJyQixlQUFRLENBQUM7WUFDUixTQUFTLEVBQUUsQ0FBQyw0QkFBWSxDQUFDO1lBQ3pCLE9BQU8sRUFBRTtnQkFDUCx3Q0FBa0I7Z0JBQ2xCLDRCQUFZO2dCQUNaLCtCQUF1QjtnQkFDdkIsMkJBQW1CO2dCQUNuQixxQ0FBZ0I7Z0JBQ2hCLDBDQUE0QjtnQkFDNUIsc0NBQTRCO2dCQUM1Qix1Q0FBYztnQkFDZCx3QkFBYzthQUNmO1lBQ0QsWUFBWSxFQUFFLENBQUMsNEJBQVksRUFBRSxvQ0FBa0IsRUFBRSwyQ0FBbUIsQ0FBQztZQUNyRSxTQUFTLEVBQUUsQ0FBQyxFQUFFLE9BQU8sRUFBRSx3QkFBaUIsRUFBRSxRQUFRLEVBQUUsb0NBQWlCLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxDQUFDO1lBQ3JGLE9BQU8sRUFBRSxDQUFDLHVCQUFnQixDQUFDO1NBQzVCLENBQUM7UUFDRjs7VUFFRTtPQUNXLFNBQVMsQ0FBRztJQUFELGdCQUFDO0NBQUEsQUFBekIsSUFBeUI7QUFBWiw4QkFBUyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlLCBOT19FUlJPUlNfU0NIRU1BIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRNb2R1bGUgfSBmcm9tICduYXRpdmVzY3JpcHQtYW5ndWxhci9uYXRpdmVzY3JpcHQubW9kdWxlJztcblxuaW1wb3J0IHsgQXBwUm91dGluZ01vZHVsZSB9IGZyb20gJy4vYXBwLXJvdXRpbmcubW9kdWxlJztcbmltcG9ydCB7IEFwcENvbXBvbmVudCB9IGZyb20gJy4vYXBwLmNvbXBvbmVudCc7XG5cbmltcG9ydCB7IE5hdGl2ZVNjcmlwdEh0dHBDbGllbnRNb2R1bGUgfSBmcm9tICduYXRpdmVzY3JpcHQtYW5ndWxhci9odHRwLWNsaWVudCc7XG5pbXBvcnQgeyBMb2dpblBhZ2VDb21wb25lbnQgfSBmcm9tICcuL2xvZ2luL2xvZ2luLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRGb3Jtc01vZHVsZSB9IGZyb20gJ25hdGl2ZXNjcmlwdC1hbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IEhUVFBfSU5URVJDRVBUT1JTIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgSGVhZGVySW50ZXJjZXB0b3IgfSBmcm9tICcuL2NvcmUvaHR0cC5pbnRlcmNlcHRvcic7XG5pbXBvcnQgeyBEcm9wRG93bk1vZHVsZSB9IGZyb20gJ25hdGl2ZXNjcmlwdC1kcm9wLWRvd24vYW5ndWxhcic7XG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRVSUxpc3RWaWV3TW9kdWxlIH0gZnJvbSAnbmF0aXZlc2NyaXB0LXVpLWxpc3R2aWV3L2FuZ3VsYXInO1xuaW1wb3J0IHsgTmV3QWNjb3VudENvbXBvbmVudCB9IGZyb20gJy4vbG9naW4vbmV3LWFjY291bnQvbmV3LWFjY291bnQuY29tcG9uZW50JztcbmltcG9ydCB7IE5nU2hhZG93TW9kdWxlIH0gZnJvbSAnbmF0aXZlc2NyaXB0LW5nLXNoYWRvdyc7XG5pbXBvcnQgeyBSZWFjdGl2ZUZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgU2hhcmVkTW9kdWxlIH0gZnJvbSAnLi9zaGFyZWQvc2hhcmVkLm1vZHVsZSc7XG5cbkBOZ01vZHVsZSh7XG4gIGJvb3RzdHJhcDogW0FwcENvbXBvbmVudF0sXG4gIGltcG9ydHM6IFtcbiAgICBOYXRpdmVTY3JpcHRNb2R1bGUsXG4gICAgU2hhcmVkTW9kdWxlLFxuICAgIE5hdGl2ZVNjcmlwdEZvcm1zTW9kdWxlLFxuICAgIFJlYWN0aXZlRm9ybXNNb2R1bGUsXG4gICAgQXBwUm91dGluZ01vZHVsZSxcbiAgICBOYXRpdmVTY3JpcHRIdHRwQ2xpZW50TW9kdWxlLFxuICAgIE5hdGl2ZVNjcmlwdFVJTGlzdFZpZXdNb2R1bGUsXG4gICAgTmdTaGFkb3dNb2R1bGUsXG4gICAgRHJvcERvd25Nb2R1bGVcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbQXBwQ29tcG9uZW50LCBMb2dpblBhZ2VDb21wb25lbnQsIE5ld0FjY291bnRDb21wb25lbnRdLFxuICBwcm92aWRlcnM6IFt7IHByb3ZpZGU6IEhUVFBfSU5URVJDRVBUT1JTLCB1c2VDbGFzczogSGVhZGVySW50ZXJjZXB0b3IsIG11bHRpOiB0cnVlIH1dLFxuICBzY2hlbWFzOiBbTk9fRVJST1JTX1NDSEVNQV1cbn0pXG4vKlxuUGFzcyB5b3VyIGFwcGxpY2F0aW9uIG1vZHVsZSB0byB0aGUgYm9vdHN0cmFwTW9kdWxlIGZ1bmN0aW9uIGxvY2F0ZWQgaW4gbWFpbi50cyB0byBzdGFydCB5b3VyIGFwcFxuKi9cbmV4cG9ydCBjbGFzcyBBcHBNb2R1bGUge31cbiJdfQ==