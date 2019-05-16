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
var action_card_module_1 = require("../components/action-card/action-card.module");
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
                action_card_module_1.ActionCardModule,
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
                action_card_module_1.ActionCardModule,
                nativescript_mask_module_1.NativescriptMaskModule
            ],
            schemas: [core_1.NO_ERRORS_SCHEMA]
        })
    ], SharedModule);
    return SharedModule;
}());
exports.SharedModule = SharedModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hhcmVkLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNoYXJlZC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBMkQ7QUFDM0Qsc0RBQXVFO0FBQ3ZFLGdGQUEwRTtBQUMxRSxnRkFBNkU7QUFDN0Usb0RBQXFFO0FBQ3JFLGlFQUF3RDtBQUV4RCxzSUFBa0k7QUFDbEksd0NBQTZDO0FBQzdDLG1GQUFnRjtBQUNoRiw4R0FBMkc7QUFDM0csZ0lBQTRIO0FBNEI1SDtJQUFBO0lBQTJCLENBQUM7SUFBZixZQUFZO1FBMUJ4QixlQUFRLENBQUM7WUFDUixZQUFZLEVBQUUsRUFBRTtZQUNoQixPQUFPLEVBQUU7Z0JBQ1AsaUNBQXdCO2dCQUN4QixnQ0FBWTtnQkFDWixtQ0FBZTtnQkFDZiwrQkFBdUI7Z0JBQ3ZCLHVDQUFjO2dCQUNkLG1CQUFXO2dCQUNYLHFDQUFnQjtnQkFDaEIsaURBQXNCO2dCQUN0QixrRUFBOEI7YUFDL0I7WUFDRCxPQUFPLEVBQUU7Z0JBQ1AsaUNBQXdCO2dCQUN4QixtQkFBVztnQkFDWCxnQ0FBWTtnQkFDWixtQ0FBZTtnQkFDZiwrQkFBdUI7Z0JBQ3ZCLHVDQUFjO2dCQUNkLHdFQUFpQztnQkFDakMscUNBQWdCO2dCQUNoQixpREFBc0I7YUFDdkI7WUFDRCxPQUFPLEVBQUUsQ0FBQyx1QkFBZ0IsQ0FBQztTQUM1QixDQUFDO09BQ1csWUFBWSxDQUFHO0lBQUQsbUJBQUM7Q0FBQSxBQUE1QixJQUE0QjtBQUFmLG9DQUFZIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUsIE5PX0VSUk9SU19TQ0hFTUEgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5hdGl2ZVNjcmlwdENvbW1vbk1vZHVsZSB9IGZyb20gJ25hdGl2ZXNjcmlwdC1hbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBCb3R0b21Nb2R1bGUgfSBmcm9tICcuLi9jb21wb25lbnRzL2JvdHRvbS1iYXIvYm90dG9tLWJhci5tb2R1bGUnO1xuaW1wb3J0IHsgSGVhZGVyQmFyTW9kdWxlIH0gZnJvbSAnLi4vY29tcG9uZW50cy9oZWFkZXItYmFyL2hlYWRlci1iYXIubW9kdWxlJztcbmltcG9ydCB7IE5hdGl2ZVNjcmlwdEZvcm1zTW9kdWxlIH0gZnJvbSAnbmF0aXZlc2NyaXB0LWFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgTmdTaGFkb3dNb2R1bGUgfSBmcm9tICduYXRpdmVzY3JpcHQtbmctc2hhZG93JztcbmltcG9ydCB7IEN1cnJlbmN5TWFza1B0Q29tcG9uZW50IH0gZnJvbSAnLi4vY29tcG9uZW50cy9uYXRpdmVzY3JpcHQtY3VycmVuY3ktbWFzay9uYXRpdmVzY3JpcHQtY3VycmVuY3ktbWFzay5jb21wb25lbnQnO1xuaW1wb3J0IHsgTmF0aXZlc2NyaXB0RG9jdW1lbnRNYXNrQ29tcG9uZW50IH0gZnJvbSAnLi4vY29tcG9uZW50cy9uYXRpdmVzY3JpcHQtZG9jdW1lbnQtbWFzay9uYXRpdmVzY3JpcHQtZG9jdW1lbnQtbWFzay5jb21wb25lbnQnO1xuaW1wb3J0IHsgRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBBY3Rpb25DYXJkTW9kdWxlIH0gZnJvbSAnLi4vY29tcG9uZW50cy9hY3Rpb24tY2FyZC9hY3Rpb24tY2FyZC5tb2R1bGUnO1xuaW1wb3J0IHsgTmF0aXZlc2NyaXB0TWFza01vZHVsZSB9IGZyb20gJy4uL2NvbXBvbmVudHMvbmF0aXZlc2NyaXB0LWN1cnJlbmN5LW1hc2svbmF0aXZlc2NyaXB0LW1hc2subW9kdWxlJztcbmltcG9ydCB7IE5hdGl2ZXNjcmlwdERvY3VtZW50TWFza01vZHVsZSB9IGZyb20gJy4uL2NvbXBvbmVudHMvbmF0aXZlc2NyaXB0LWRvY3VtZW50LW1hc2svbmF0aXZlc2NyaXB0LWRvY3VtZW50LW1hc2subW9kdWxlJztcblxuQE5nTW9kdWxlKHtcbiAgZGVjbGFyYXRpb25zOiBbXSxcbiAgaW1wb3J0czogW1xuICAgIE5hdGl2ZVNjcmlwdENvbW1vbk1vZHVsZSxcbiAgICBCb3R0b21Nb2R1bGUsXG4gICAgSGVhZGVyQmFyTW9kdWxlLFxuICAgIE5hdGl2ZVNjcmlwdEZvcm1zTW9kdWxlLFxuICAgIE5nU2hhZG93TW9kdWxlLFxuICAgIEZvcm1zTW9kdWxlLFxuICAgIEFjdGlvbkNhcmRNb2R1bGUsXG4gICAgTmF0aXZlc2NyaXB0TWFza01vZHVsZSxcbiAgICBOYXRpdmVzY3JpcHREb2N1bWVudE1hc2tNb2R1bGVcbiAgXSxcbiAgZXhwb3J0czogW1xuICAgIE5hdGl2ZVNjcmlwdENvbW1vbk1vZHVsZSxcbiAgICBGb3Jtc01vZHVsZSxcbiAgICBCb3R0b21Nb2R1bGUsXG4gICAgSGVhZGVyQmFyTW9kdWxlLFxuICAgIE5hdGl2ZVNjcmlwdEZvcm1zTW9kdWxlLFxuICAgIE5nU2hhZG93TW9kdWxlLFxuICAgIE5hdGl2ZXNjcmlwdERvY3VtZW50TWFza0NvbXBvbmVudCxcbiAgICBBY3Rpb25DYXJkTW9kdWxlLFxuICAgIE5hdGl2ZXNjcmlwdE1hc2tNb2R1bGVcbiAgXSxcbiAgc2NoZW1hczogW05PX0VSUk9SU19TQ0hFTUFdXG59KVxuZXhwb3J0IGNsYXNzIFNoYXJlZE1vZHVsZSB7fVxuIl19