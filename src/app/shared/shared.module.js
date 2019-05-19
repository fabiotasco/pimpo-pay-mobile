"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("nativescript-angular/common");
var bottom_bar_module_1 = require("../components/bottom-bar/bottom-bar.module");
var header_bar_module_1 = require("../components/header-bar/header-bar.module");
var forms_1 = require("nativescript-angular/forms");
var nativescript_ng_shadow_1 = require("nativescript-ng-shadow");
var nativescript_document_mask_component_1 = require("../components/nativescript-document-mask/nativescript-document-mask.component");
var forms_2 = require("@angular/forms");
var nativescript_mask_module_1 = require("../components/nativescript-currency-mask/nativescript-mask.module");
var nativescript_document_mask_module_1 = require("../components/nativescript-document-mask/nativescript-document-mask.module");
var SharedModule = /** @class */ (function () {
    function SharedModule() {
    }
    SharedModule = __decorate([
        core_1.NgModule({
            declarations: [],
            imports: [
                common_1.NativeScriptCommonModule,
                bottom_bar_module_1.BottomModule,
                header_bar_module_1.HeaderBarModule,
                forms_1.NativeScriptFormsModule,
                nativescript_ng_shadow_1.NgShadowModule,
                forms_2.FormsModule,
                nativescript_mask_module_1.NativescriptMaskModule,
                nativescript_document_mask_module_1.NativescriptDocumentMaskModule
            ],
            exports: [
                common_1.NativeScriptCommonModule,
                forms_2.FormsModule,
                bottom_bar_module_1.BottomModule,
                header_bar_module_1.HeaderBarModule,
                forms_1.NativeScriptFormsModule,
                nativescript_ng_shadow_1.NgShadowModule,
                nativescript_document_mask_component_1.NativescriptDocumentMaskComponent,
                nativescript_mask_module_1.NativescriptMaskModule
            ],
            schemas: [core_1.NO_ERRORS_SCHEMA]
        })
    ], SharedModule);
    return SharedModule;
}());
exports.SharedModule = SharedModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hhcmVkLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNoYXJlZC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBMkQ7QUFDM0Qsc0RBQXVFO0FBQ3ZFLGdGQUEwRTtBQUMxRSxnRkFBNkU7QUFDN0Usb0RBQXFFO0FBQ3JFLGlFQUF3RDtBQUV4RCxzSUFBa0k7QUFDbEksd0NBQTZDO0FBQzdDLDhHQUEyRztBQUMzRyxnSUFBNEg7QUEwQjVIO0lBQUE7SUFBMkIsQ0FBQztJQUFmLFlBQVk7UUF4QnhCLGVBQVEsQ0FBQztZQUNSLFlBQVksRUFBRSxFQUFFO1lBQ2hCLE9BQU8sRUFBRTtnQkFDUCxpQ0FBd0I7Z0JBQ3hCLGdDQUFZO2dCQUNaLG1DQUFlO2dCQUNmLCtCQUF1QjtnQkFDdkIsdUNBQWM7Z0JBQ2QsbUJBQVc7Z0JBQ1gsaURBQXNCO2dCQUN0QixrRUFBOEI7YUFDL0I7WUFDRCxPQUFPLEVBQUU7Z0JBQ1AsaUNBQXdCO2dCQUN4QixtQkFBVztnQkFDWCxnQ0FBWTtnQkFDWixtQ0FBZTtnQkFDZiwrQkFBdUI7Z0JBQ3ZCLHVDQUFjO2dCQUNkLHdFQUFpQztnQkFDakMsaURBQXNCO2FBQ3ZCO1lBQ0QsT0FBTyxFQUFFLENBQUMsdUJBQWdCLENBQUM7U0FDNUIsQ0FBQztPQUNXLFlBQVksQ0FBRztJQUFELG1CQUFDO0NBQUEsQUFBNUIsSUFBNEI7QUFBZixvQ0FBWSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlLCBOT19FUlJPUlNfU0NIRU1BIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRDb21tb25Nb2R1bGUgfSBmcm9tICduYXRpdmVzY3JpcHQtYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgQm90dG9tTW9kdWxlIH0gZnJvbSAnLi4vY29tcG9uZW50cy9ib3R0b20tYmFyL2JvdHRvbS1iYXIubW9kdWxlJztcbmltcG9ydCB7IEhlYWRlckJhck1vZHVsZSB9IGZyb20gJy4uL2NvbXBvbmVudHMvaGVhZGVyLWJhci9oZWFkZXItYmFyLm1vZHVsZSc7XG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRGb3Jtc01vZHVsZSB9IGZyb20gJ25hdGl2ZXNjcmlwdC1hbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IE5nU2hhZG93TW9kdWxlIH0gZnJvbSAnbmF0aXZlc2NyaXB0LW5nLXNoYWRvdyc7XG5pbXBvcnQgeyBDdXJyZW5jeU1hc2tQdENvbXBvbmVudCB9IGZyb20gJy4uL2NvbXBvbmVudHMvbmF0aXZlc2NyaXB0LWN1cnJlbmN5LW1hc2svbmF0aXZlc2NyaXB0LWN1cnJlbmN5LW1hc2suY29tcG9uZW50JztcbmltcG9ydCB7IE5hdGl2ZXNjcmlwdERvY3VtZW50TWFza0NvbXBvbmVudCB9IGZyb20gJy4uL2NvbXBvbmVudHMvbmF0aXZlc2NyaXB0LWRvY3VtZW50LW1hc2svbmF0aXZlc2NyaXB0LWRvY3VtZW50LW1hc2suY29tcG9uZW50JztcbmltcG9ydCB7IEZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgTmF0aXZlc2NyaXB0TWFza01vZHVsZSB9IGZyb20gJy4uL2NvbXBvbmVudHMvbmF0aXZlc2NyaXB0LWN1cnJlbmN5LW1hc2svbmF0aXZlc2NyaXB0LW1hc2subW9kdWxlJztcbmltcG9ydCB7IE5hdGl2ZXNjcmlwdERvY3VtZW50TWFza01vZHVsZSB9IGZyb20gJy4uL2NvbXBvbmVudHMvbmF0aXZlc2NyaXB0LWRvY3VtZW50LW1hc2svbmF0aXZlc2NyaXB0LWRvY3VtZW50LW1hc2subW9kdWxlJztcblxuQE5nTW9kdWxlKHtcbiAgZGVjbGFyYXRpb25zOiBbXSxcbiAgaW1wb3J0czogW1xuICAgIE5hdGl2ZVNjcmlwdENvbW1vbk1vZHVsZSxcbiAgICBCb3R0b21Nb2R1bGUsXG4gICAgSGVhZGVyQmFyTW9kdWxlLFxuICAgIE5hdGl2ZVNjcmlwdEZvcm1zTW9kdWxlLFxuICAgIE5nU2hhZG93TW9kdWxlLFxuICAgIEZvcm1zTW9kdWxlLFxuICAgIE5hdGl2ZXNjcmlwdE1hc2tNb2R1bGUsXG4gICAgTmF0aXZlc2NyaXB0RG9jdW1lbnRNYXNrTW9kdWxlXG4gIF0sXG4gIGV4cG9ydHM6IFtcbiAgICBOYXRpdmVTY3JpcHRDb21tb25Nb2R1bGUsXG4gICAgRm9ybXNNb2R1bGUsXG4gICAgQm90dG9tTW9kdWxlLFxuICAgIEhlYWRlckJhck1vZHVsZSxcbiAgICBOYXRpdmVTY3JpcHRGb3Jtc01vZHVsZSxcbiAgICBOZ1NoYWRvd01vZHVsZSxcbiAgICBOYXRpdmVzY3JpcHREb2N1bWVudE1hc2tDb21wb25lbnQsXG4gICAgTmF0aXZlc2NyaXB0TWFza01vZHVsZVxuICBdLFxuICBzY2hlbWFzOiBbTk9fRVJST1JTX1NDSEVNQV1cbn0pXG5leHBvcnQgY2xhc3MgU2hhcmVkTW9kdWxlIHt9XG4iXX0=