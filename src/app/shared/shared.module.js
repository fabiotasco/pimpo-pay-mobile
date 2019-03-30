"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("nativescript-angular/common");
var bottom_bar_module_1 = require("../components/bottom-bar/bottom-bar.module");
var header_bar_module_1 = require("../components/header-bar/header-bar.module");
var forms_1 = require("nativescript-angular/forms");
var nativescript_ng_shadow_1 = require("nativescript-ng-shadow");
var nativescript_currency_mask_component_1 = require("../components/nativescript-currency-mask/nativescript-currency-mask.component");
var nativescript_document_mask_component_1 = require("../components/nativescript-document-mask/nativescript-document-mask.component");
var forms_2 = require("@angular/forms");
var nativescript_phone_mask_component_1 = require("../components/nativescript-phone-mask/nativescript-phone-mask.component");
var SharedModule = /** @class */ (function () {
    function SharedModule() {
    }
    SharedModule = __decorate([
        core_1.NgModule({
            declarations: [
                nativescript_currency_mask_component_1.CurrencyMaskPtComponent,
                nativescript_document_mask_component_1.NativescriptDocumentMaskComponent,
                nativescript_phone_mask_component_1.PhoneMaskComponent
            ],
            imports: [
                common_1.NativeScriptCommonModule,
                bottom_bar_module_1.BottomModule,
                header_bar_module_1.HeaderBarModule,
                forms_1.NativeScriptFormsModule,
                nativescript_ng_shadow_1.NgShadowModule,
                forms_2.FormsModule
            ],
            exports: [
                common_1.NativeScriptCommonModule,
                forms_2.FormsModule,
                bottom_bar_module_1.BottomModule,
                header_bar_module_1.HeaderBarModule,
                forms_1.NativeScriptFormsModule,
                nativescript_ng_shadow_1.NgShadowModule,
                nativescript_currency_mask_component_1.CurrencyMaskPtComponent,
                nativescript_document_mask_component_1.NativescriptDocumentMaskComponent,
                nativescript_phone_mask_component_1.PhoneMaskComponent
            ],
            schemas: [core_1.NO_ERRORS_SCHEMA]
        })
    ], SharedModule);
    return SharedModule;
}());
exports.SharedModule = SharedModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hhcmVkLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNoYXJlZC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBMkQ7QUFDM0Qsc0RBQXVFO0FBQ3ZFLGdGQUEwRTtBQUMxRSxnRkFBNkU7QUFDN0Usb0RBQXFFO0FBQ3JFLGlFQUF3RDtBQUN4RCxzSUFBd0g7QUFDeEgsc0lBQWtJO0FBQ2xJLHdDQUE2QztBQUM3Qyw2SEFBNkc7QUE2QjdHO0lBQUE7SUFBMkIsQ0FBQztJQUFmLFlBQVk7UUEzQnhCLGVBQVEsQ0FBQztZQUNSLFlBQVksRUFBRTtnQkFDWiw4REFBdUI7Z0JBQ3ZCLHdFQUFpQztnQkFDakMsc0RBQWtCO2FBQ25CO1lBQ0QsT0FBTyxFQUFFO2dCQUNQLGlDQUF3QjtnQkFDeEIsZ0NBQVk7Z0JBQ1osbUNBQWU7Z0JBQ2YsK0JBQXVCO2dCQUN2Qix1Q0FBYztnQkFDZCxtQkFBVzthQUNaO1lBQ0QsT0FBTyxFQUFFO2dCQUNQLGlDQUF3QjtnQkFDeEIsbUJBQVc7Z0JBQ1gsZ0NBQVk7Z0JBQ1osbUNBQWU7Z0JBQ2YsK0JBQXVCO2dCQUN2Qix1Q0FBYztnQkFDZCw4REFBdUI7Z0JBQ3ZCLHdFQUFpQztnQkFDakMsc0RBQWtCO2FBQ25CO1lBQ0QsT0FBTyxFQUFFLENBQUMsdUJBQWdCLENBQUM7U0FDNUIsQ0FBQztPQUNXLFlBQVksQ0FBRztJQUFELG1CQUFDO0NBQUEsQUFBNUIsSUFBNEI7QUFBZixvQ0FBWSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlLCBOT19FUlJPUlNfU0NIRU1BIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRDb21tb25Nb2R1bGUgfSBmcm9tICduYXRpdmVzY3JpcHQtYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgQm90dG9tTW9kdWxlIH0gZnJvbSAnLi4vY29tcG9uZW50cy9ib3R0b20tYmFyL2JvdHRvbS1iYXIubW9kdWxlJztcbmltcG9ydCB7IEhlYWRlckJhck1vZHVsZSB9IGZyb20gJy4uL2NvbXBvbmVudHMvaGVhZGVyLWJhci9oZWFkZXItYmFyLm1vZHVsZSc7XG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRGb3Jtc01vZHVsZSB9IGZyb20gJ25hdGl2ZXNjcmlwdC1hbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IE5nU2hhZG93TW9kdWxlIH0gZnJvbSAnbmF0aXZlc2NyaXB0LW5nLXNoYWRvdyc7XG5pbXBvcnQgeyBDdXJyZW5jeU1hc2tQdENvbXBvbmVudCB9IGZyb20gJy4uL2NvbXBvbmVudHMvbmF0aXZlc2NyaXB0LWN1cnJlbmN5LW1hc2svbmF0aXZlc2NyaXB0LWN1cnJlbmN5LW1hc2suY29tcG9uZW50JztcbmltcG9ydCB7IE5hdGl2ZXNjcmlwdERvY3VtZW50TWFza0NvbXBvbmVudCB9IGZyb20gJy4uL2NvbXBvbmVudHMvbmF0aXZlc2NyaXB0LWRvY3VtZW50LW1hc2svbmF0aXZlc2NyaXB0LWRvY3VtZW50LW1hc2suY29tcG9uZW50JztcbmltcG9ydCB7IEZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgUGhvbmVNYXNrQ29tcG9uZW50IH0gZnJvbSAnLi4vY29tcG9uZW50cy9uYXRpdmVzY3JpcHQtcGhvbmUtbWFzay9uYXRpdmVzY3JpcHQtcGhvbmUtbWFzay5jb21wb25lbnQnO1xuXG5ATmdNb2R1bGUoe1xuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBDdXJyZW5jeU1hc2tQdENvbXBvbmVudCxcbiAgICBOYXRpdmVzY3JpcHREb2N1bWVudE1hc2tDb21wb25lbnQsXG4gICAgUGhvbmVNYXNrQ29tcG9uZW50XG4gIF0sXG4gIGltcG9ydHM6IFtcbiAgICBOYXRpdmVTY3JpcHRDb21tb25Nb2R1bGUsXG4gICAgQm90dG9tTW9kdWxlLFxuICAgIEhlYWRlckJhck1vZHVsZSxcbiAgICBOYXRpdmVTY3JpcHRGb3Jtc01vZHVsZSxcbiAgICBOZ1NoYWRvd01vZHVsZSxcbiAgICBGb3Jtc01vZHVsZVxuICBdLFxuICBleHBvcnRzOiBbXG4gICAgTmF0aXZlU2NyaXB0Q29tbW9uTW9kdWxlLFxuICAgIEZvcm1zTW9kdWxlLFxuICAgIEJvdHRvbU1vZHVsZSxcbiAgICBIZWFkZXJCYXJNb2R1bGUsXG4gICAgTmF0aXZlU2NyaXB0Rm9ybXNNb2R1bGUsXG4gICAgTmdTaGFkb3dNb2R1bGUsXG4gICAgQ3VycmVuY3lNYXNrUHRDb21wb25lbnQsXG4gICAgTmF0aXZlc2NyaXB0RG9jdW1lbnRNYXNrQ29tcG9uZW50LFxuICAgIFBob25lTWFza0NvbXBvbmVudFxuICBdLFxuICBzY2hlbWFzOiBbTk9fRVJST1JTX1NDSEVNQV1cbn0pXG5leHBvcnQgY2xhc3MgU2hhcmVkTW9kdWxlIHt9XG4iXX0=