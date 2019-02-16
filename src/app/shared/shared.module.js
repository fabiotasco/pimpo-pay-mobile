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
var SharedModule = /** @class */ (function () {
    function SharedModule() {
    }
    SharedModule = __decorate([
        core_1.NgModule({
            declarations: [nativescript_currency_mask_component_1.CurrencyMaskPtComponent, nativescript_document_mask_component_1.NativescriptDocumentMaskComponent],
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
                nativescript_document_mask_component_1.NativescriptDocumentMaskComponent
            ],
            schemas: [core_1.NO_ERRORS_SCHEMA]
        })
    ], SharedModule);
    return SharedModule;
}());
exports.SharedModule = SharedModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hhcmVkLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNoYXJlZC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBMkQ7QUFDM0Qsc0RBQXVFO0FBQ3ZFLGdGQUEwRTtBQUMxRSxnRkFBNkU7QUFDN0Usb0RBQXFFO0FBQ3JFLGlFQUF3RDtBQUN4RCxzSUFBd0g7QUFDeEgsc0lBQWtJO0FBQ2xJLHdDQUE2QztBQXdCN0M7SUFBQTtJQUEyQixDQUFDO0lBQWYsWUFBWTtRQXRCeEIsZUFBUSxDQUFDO1lBQ1IsWUFBWSxFQUFFLENBQUMsOERBQXVCLEVBQUUsd0VBQWlDLENBQUM7WUFDMUUsT0FBTyxFQUFFO2dCQUNQLGlDQUF3QjtnQkFDeEIsZ0NBQVk7Z0JBQ1osbUNBQWU7Z0JBQ2YsK0JBQXVCO2dCQUN2Qix1Q0FBYztnQkFDZCxtQkFBVzthQUNaO1lBQ0QsT0FBTyxFQUFFO2dCQUNQLGlDQUF3QjtnQkFDeEIsbUJBQVc7Z0JBQ1gsZ0NBQVk7Z0JBQ1osbUNBQWU7Z0JBQ2YsK0JBQXVCO2dCQUN2Qix1Q0FBYztnQkFDZCw4REFBdUI7Z0JBQ3ZCLHdFQUFpQzthQUNsQztZQUNELE9BQU8sRUFBRSxDQUFDLHVCQUFnQixDQUFDO1NBQzVCLENBQUM7T0FDVyxZQUFZLENBQUc7SUFBRCxtQkFBQztDQUFBLEFBQTVCLElBQTRCO0FBQWYsb0NBQVkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSwgTk9fRVJST1JTX1NDSEVNQSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTmF0aXZlU2NyaXB0Q29tbW9uTW9kdWxlIH0gZnJvbSAnbmF0aXZlc2NyaXB0LWFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IEJvdHRvbU1vZHVsZSB9IGZyb20gJy4uL2NvbXBvbmVudHMvYm90dG9tLWJhci9ib3R0b20tYmFyLm1vZHVsZSc7XG5pbXBvcnQgeyBIZWFkZXJCYXJNb2R1bGUgfSBmcm9tICcuLi9jb21wb25lbnRzL2hlYWRlci1iYXIvaGVhZGVyLWJhci5tb2R1bGUnO1xuaW1wb3J0IHsgTmF0aXZlU2NyaXB0Rm9ybXNNb2R1bGUgfSBmcm9tICduYXRpdmVzY3JpcHQtYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBOZ1NoYWRvd01vZHVsZSB9IGZyb20gJ25hdGl2ZXNjcmlwdC1uZy1zaGFkb3cnO1xuaW1wb3J0IHsgQ3VycmVuY3lNYXNrUHRDb21wb25lbnQgfSBmcm9tICcuLi9jb21wb25lbnRzL25hdGl2ZXNjcmlwdC1jdXJyZW5jeS1tYXNrL25hdGl2ZXNjcmlwdC1jdXJyZW5jeS1tYXNrLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBOYXRpdmVzY3JpcHREb2N1bWVudE1hc2tDb21wb25lbnQgfSBmcm9tICcuLi9jb21wb25lbnRzL25hdGl2ZXNjcmlwdC1kb2N1bWVudC1tYXNrL25hdGl2ZXNjcmlwdC1kb2N1bWVudC1tYXNrLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcblxuQE5nTW9kdWxlKHtcbiAgZGVjbGFyYXRpb25zOiBbQ3VycmVuY3lNYXNrUHRDb21wb25lbnQsIE5hdGl2ZXNjcmlwdERvY3VtZW50TWFza0NvbXBvbmVudF0sXG4gIGltcG9ydHM6IFtcbiAgICBOYXRpdmVTY3JpcHRDb21tb25Nb2R1bGUsXG4gICAgQm90dG9tTW9kdWxlLFxuICAgIEhlYWRlckJhck1vZHVsZSxcbiAgICBOYXRpdmVTY3JpcHRGb3Jtc01vZHVsZSxcbiAgICBOZ1NoYWRvd01vZHVsZSxcbiAgICBGb3Jtc01vZHVsZVxuICBdLFxuICBleHBvcnRzOiBbXG4gICAgTmF0aXZlU2NyaXB0Q29tbW9uTW9kdWxlLFxuICAgIEZvcm1zTW9kdWxlLFxuICAgIEJvdHRvbU1vZHVsZSxcbiAgICBIZWFkZXJCYXJNb2R1bGUsXG4gICAgTmF0aXZlU2NyaXB0Rm9ybXNNb2R1bGUsXG4gICAgTmdTaGFkb3dNb2R1bGUsXG4gICAgQ3VycmVuY3lNYXNrUHRDb21wb25lbnQsXG4gICAgTmF0aXZlc2NyaXB0RG9jdW1lbnRNYXNrQ29tcG9uZW50XG4gIF0sXG4gIHNjaGVtYXM6IFtOT19FUlJPUlNfU0NIRU1BXVxufSlcbmV4cG9ydCBjbGFzcyBTaGFyZWRNb2R1bGUge31cbiJdfQ==