"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("nativescript-angular/router");
var login_component_1 = require("./login/login.component");
var new_account_component_1 = require("./login/new-account/new-account.component");
var detail_transaction_component_1 = require("./home/balance-page/detail-transaction/detail-transaction.component");
var routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: login_component_1.LoginPageComponent },
    { path: 'new-account', component: new_account_component_1.NewAccountComponent },
    { path: 'home', loadChildren: './app/home/home.module#HomeModule' },
    { path: 'detail', component: detail_transaction_component_1.DetailTransactionComponent },
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.NativeScriptRouterModule.forRoot(routes)],
            exports: [router_1.NativeScriptRouterModule]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());
exports.AppRoutingModule = AppRoutingModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLXJvdXRpbmcubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXBwLXJvdXRpbmcubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQXlDO0FBQ3pDLHNEQUF1RTtBQUV2RSwyREFBNkQ7QUFDN0QsbUZBQWdGO0FBQ2hGLG9IQUFpSDtBQUVqSCxJQUFNLE1BQU0sR0FBVztJQUNyQixFQUFFLElBQUksRUFBRSxFQUFFLEVBQUUsVUFBVSxFQUFFLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFO0lBQ3BELEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxTQUFTLEVBQUUsb0NBQWtCLEVBQUU7SUFDaEQsRUFBRSxJQUFJLEVBQUUsYUFBYSxFQUFFLFNBQVMsRUFBRSwyQ0FBbUIsRUFBRTtJQUN2RCxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLG1DQUFtQyxFQUFDO0lBQ2xFLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUseURBQTBCLEVBQUU7Q0FDMUQsQ0FBQztBQU1GO0lBQUE7SUFBK0IsQ0FBQztJQUFuQixnQkFBZ0I7UUFKNUIsZUFBUSxDQUFDO1lBQ1IsT0FBTyxFQUFFLENBQUMsaUNBQXdCLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ25ELE9BQU8sRUFBRSxDQUFDLGlDQUF3QixDQUFDO1NBQ3BDLENBQUM7T0FDVyxnQkFBZ0IsQ0FBRztJQUFELHVCQUFDO0NBQUEsQUFBaEMsSUFBZ0M7QUFBbkIsNENBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5hdGl2ZVNjcmlwdFJvdXRlck1vZHVsZSB9IGZyb20gJ25hdGl2ZXNjcmlwdC1hbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBSb3V0ZXMgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgTG9naW5QYWdlQ29tcG9uZW50IH0gZnJvbSAnLi9sb2dpbi9sb2dpbi5jb21wb25lbnQnO1xuaW1wb3J0IHsgTmV3QWNjb3VudENvbXBvbmVudCB9IGZyb20gJy4vbG9naW4vbmV3LWFjY291bnQvbmV3LWFjY291bnQuY29tcG9uZW50JztcbmltcG9ydCB7IERldGFpbFRyYW5zYWN0aW9uQ29tcG9uZW50IH0gZnJvbSAnLi9ob21lL2JhbGFuY2UtcGFnZS9kZXRhaWwtdHJhbnNhY3Rpb24vZGV0YWlsLXRyYW5zYWN0aW9uLmNvbXBvbmVudCc7XG5cbmNvbnN0IHJvdXRlczogUm91dGVzID0gW1xuICB7IHBhdGg6ICcnLCByZWRpcmVjdFRvOiAnbG9naW4nLCBwYXRoTWF0Y2g6ICdmdWxsJyB9LFxuICB7IHBhdGg6ICdsb2dpbicsIGNvbXBvbmVudDogTG9naW5QYWdlQ29tcG9uZW50IH0sXG4gIHsgcGF0aDogJ25ldy1hY2NvdW50JywgY29tcG9uZW50OiBOZXdBY2NvdW50Q29tcG9uZW50IH0sXG4gIHsgcGF0aDogJ2hvbWUnLCBsb2FkQ2hpbGRyZW46ICcuL2FwcC9ob21lL2hvbWUubW9kdWxlI0hvbWVNb2R1bGUnfSxcbiAgeyBwYXRoOiAnZGV0YWlsJywgY29tcG9uZW50OiBEZXRhaWxUcmFuc2FjdGlvbkNvbXBvbmVudCB9LFxuXTtcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW05hdGl2ZVNjcmlwdFJvdXRlck1vZHVsZS5mb3JSb290KHJvdXRlcyldLFxuICBleHBvcnRzOiBbTmF0aXZlU2NyaXB0Um91dGVyTW9kdWxlXVxufSlcbmV4cG9ydCBjbGFzcyBBcHBSb3V0aW5nTW9kdWxlIHt9XG4iXX0=