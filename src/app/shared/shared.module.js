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
var loading_component_1 = require("../components/loading/loading.component");
var resume_component_1 = require("../components/resume/resume.component");
var SharedModule = /** @class */ (function () {
    function SharedModule() {
    }
    SharedModule = __decorate([
        core_1.NgModule({
            declarations: [loading_component_1.LoadingComponent, resume_component_1.ResumeComponent],
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
                nativescript_mask_module_1.NativescriptMaskModule,
                loading_component_1.LoadingComponent,
                resume_component_1.ResumeComponent
            ],
            schemas: [core_1.NO_ERRORS_SCHEMA]
        })
    ], SharedModule);
    return SharedModule;
}());
exports.SharedModule = SharedModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hhcmVkLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNoYXJlZC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBMkQ7QUFDM0Qsc0RBQXVFO0FBQ3ZFLGdGQUEwRTtBQUMxRSxnRkFBNkU7QUFDN0Usb0RBQXFFO0FBQ3JFLGlFQUF3RDtBQUV4RCxzSUFBa0k7QUFDbEksd0NBQTZDO0FBQzdDLDhHQUEyRztBQUMzRyxnSUFBNEg7QUFDNUgsNkVBQTJFO0FBQzNFLDBFQUF3RTtBQTRCeEU7SUFBQTtJQUEyQixDQUFDO0lBQWYsWUFBWTtRQTFCeEIsZUFBUSxDQUFDO1lBQ1IsWUFBWSxFQUFFLENBQUMsb0NBQWdCLEVBQUUsa0NBQWUsQ0FBQztZQUNqRCxPQUFPLEVBQUU7Z0JBQ1AsaUNBQXdCO2dCQUN4QixnQ0FBWTtnQkFDWixtQ0FBZTtnQkFDZiwrQkFBdUI7Z0JBQ3ZCLHVDQUFjO2dCQUNkLG1CQUFXO2dCQUNYLGlEQUFzQjtnQkFDdEIsa0VBQThCO2FBQy9CO1lBQ0QsT0FBTyxFQUFFO2dCQUNQLGlDQUF3QjtnQkFDeEIsbUJBQVc7Z0JBQ1gsZ0NBQVk7Z0JBQ1osbUNBQWU7Z0JBQ2YsK0JBQXVCO2dCQUN2Qix1Q0FBYztnQkFDZCx3RUFBaUM7Z0JBQ2pDLGlEQUFzQjtnQkFDdEIsb0NBQWdCO2dCQUNoQixrQ0FBZTthQUNoQjtZQUNELE9BQU8sRUFBRSxDQUFDLHVCQUFnQixDQUFDO1NBQzVCLENBQUM7T0FDVyxZQUFZLENBQUc7SUFBRCxtQkFBQztDQUFBLEFBQTVCLElBQTRCO0FBQWYsb0NBQVkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSwgTk9fRVJST1JTX1NDSEVNQSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTmF0aXZlU2NyaXB0Q29tbW9uTW9kdWxlIH0gZnJvbSAnbmF0aXZlc2NyaXB0LWFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IEJvdHRvbU1vZHVsZSB9IGZyb20gJy4uL2NvbXBvbmVudHMvYm90dG9tLWJhci9ib3R0b20tYmFyLm1vZHVsZSc7XG5pbXBvcnQgeyBIZWFkZXJCYXJNb2R1bGUgfSBmcm9tICcuLi9jb21wb25lbnRzL2hlYWRlci1iYXIvaGVhZGVyLWJhci5tb2R1bGUnO1xuaW1wb3J0IHsgTmF0aXZlU2NyaXB0Rm9ybXNNb2R1bGUgfSBmcm9tICduYXRpdmVzY3JpcHQtYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBOZ1NoYWRvd01vZHVsZSB9IGZyb20gJ25hdGl2ZXNjcmlwdC1uZy1zaGFkb3cnO1xuaW1wb3J0IHsgQ3VycmVuY3lNYXNrUHRDb21wb25lbnQgfSBmcm9tICcuLi9jb21wb25lbnRzL25hdGl2ZXNjcmlwdC1jdXJyZW5jeS1tYXNrL25hdGl2ZXNjcmlwdC1jdXJyZW5jeS1tYXNrLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBOYXRpdmVzY3JpcHREb2N1bWVudE1hc2tDb21wb25lbnQgfSBmcm9tICcuLi9jb21wb25lbnRzL25hdGl2ZXNjcmlwdC1kb2N1bWVudC1tYXNrL25hdGl2ZXNjcmlwdC1kb2N1bWVudC1tYXNrLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IE5hdGl2ZXNjcmlwdE1hc2tNb2R1bGUgfSBmcm9tICcuLi9jb21wb25lbnRzL25hdGl2ZXNjcmlwdC1jdXJyZW5jeS1tYXNrL25hdGl2ZXNjcmlwdC1tYXNrLm1vZHVsZSc7XG5pbXBvcnQgeyBOYXRpdmVzY3JpcHREb2N1bWVudE1hc2tNb2R1bGUgfSBmcm9tICcuLi9jb21wb25lbnRzL25hdGl2ZXNjcmlwdC1kb2N1bWVudC1tYXNrL25hdGl2ZXNjcmlwdC1kb2N1bWVudC1tYXNrLm1vZHVsZSc7XG5pbXBvcnQgeyBMb2FkaW5nQ29tcG9uZW50IH0gZnJvbSAnLi4vY29tcG9uZW50cy9sb2FkaW5nL2xvYWRpbmcuY29tcG9uZW50JztcbmltcG9ydCB7IFJlc3VtZUNvbXBvbmVudCB9IGZyb20gJy4uL2NvbXBvbmVudHMvcmVzdW1lL3Jlc3VtZS5jb21wb25lbnQnO1xuXG5ATmdNb2R1bGUoe1xuICBkZWNsYXJhdGlvbnM6IFtMb2FkaW5nQ29tcG9uZW50LCBSZXN1bWVDb21wb25lbnRdLFxuICBpbXBvcnRzOiBbXG4gICAgTmF0aXZlU2NyaXB0Q29tbW9uTW9kdWxlLFxuICAgIEJvdHRvbU1vZHVsZSxcbiAgICBIZWFkZXJCYXJNb2R1bGUsXG4gICAgTmF0aXZlU2NyaXB0Rm9ybXNNb2R1bGUsXG4gICAgTmdTaGFkb3dNb2R1bGUsXG4gICAgRm9ybXNNb2R1bGUsXG4gICAgTmF0aXZlc2NyaXB0TWFza01vZHVsZSxcbiAgICBOYXRpdmVzY3JpcHREb2N1bWVudE1hc2tNb2R1bGVcbiAgXSxcbiAgZXhwb3J0czogW1xuICAgIE5hdGl2ZVNjcmlwdENvbW1vbk1vZHVsZSxcbiAgICBGb3Jtc01vZHVsZSxcbiAgICBCb3R0b21Nb2R1bGUsXG4gICAgSGVhZGVyQmFyTW9kdWxlLFxuICAgIE5hdGl2ZVNjcmlwdEZvcm1zTW9kdWxlLFxuICAgIE5nU2hhZG93TW9kdWxlLFxuICAgIE5hdGl2ZXNjcmlwdERvY3VtZW50TWFza0NvbXBvbmVudCxcbiAgICBOYXRpdmVzY3JpcHRNYXNrTW9kdWxlLFxuICAgIExvYWRpbmdDb21wb25lbnQsXG4gICAgUmVzdW1lQ29tcG9uZW50XG4gIF0sXG4gIHNjaGVtYXM6IFtOT19FUlJPUlNfU0NIRU1BXVxufSlcbmV4cG9ydCBjbGFzcyBTaGFyZWRNb2R1bGUge31cbiJdfQ==