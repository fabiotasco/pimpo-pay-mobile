"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("nativescript-angular/common");
var bottom_bar_module_1 = require("../components/bottom-bar/bottom-bar.module");
var header_bar_module_1 = require("../components/header-bar/header-bar.module");
var forms_1 = require("nativescript-angular/forms");
var nativescript_ng_shadow_1 = require("nativescript-ng-shadow");
var SharedModule = /** @class */ (function () {
    function SharedModule() {
    }
    SharedModule = __decorate([
        core_1.NgModule({
            declarations: [],
            imports: [common_1.NativeScriptCommonModule, bottom_bar_module_1.BottomModule, header_bar_module_1.HeaderBarModule, forms_1.NativeScriptFormsModule, nativescript_ng_shadow_1.NgShadowModule],
            exports: [common_1.NativeScriptCommonModule, bottom_bar_module_1.BottomModule, header_bar_module_1.HeaderBarModule, forms_1.NativeScriptFormsModule, nativescript_ng_shadow_1.NgShadowModule],
            schemas: [core_1.NO_ERRORS_SCHEMA]
        })
    ], SharedModule);
    return SharedModule;
}());
exports.SharedModule = SharedModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hhcmVkLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNoYXJlZC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBMkQ7QUFDM0Qsc0RBQXVFO0FBQ3ZFLGdGQUEwRTtBQUMxRSxnRkFBNkU7QUFDN0Usb0RBQXFFO0FBQ3JFLGlFQUF3RDtBQVF4RDtJQUFBO0lBQTJCLENBQUM7SUFBZixZQUFZO1FBTnhCLGVBQVEsQ0FBQztZQUNSLFlBQVksRUFBRSxFQUFFO1lBQ2hCLE9BQU8sRUFBRSxDQUFDLGlDQUF3QixFQUFFLGdDQUFZLEVBQUUsbUNBQWUsRUFBQywrQkFBdUIsRUFBQyx1Q0FBYyxDQUFDO1lBQ3pHLE9BQU8sRUFBRSxDQUFDLGlDQUF3QixFQUFFLGdDQUFZLEVBQUUsbUNBQWUsRUFBQywrQkFBdUIsRUFBQyx1Q0FBYyxDQUFDO1lBQ3pHLE9BQU8sRUFBRSxDQUFDLHVCQUFnQixDQUFDO1NBQzVCLENBQUM7T0FDVyxZQUFZLENBQUc7SUFBRCxtQkFBQztDQUFBLEFBQTVCLElBQTRCO0FBQWYsb0NBQVkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSwgTk9fRVJST1JTX1NDSEVNQSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTmF0aXZlU2NyaXB0Q29tbW9uTW9kdWxlIH0gZnJvbSAnbmF0aXZlc2NyaXB0LWFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IEJvdHRvbU1vZHVsZSB9IGZyb20gJy4uL2NvbXBvbmVudHMvYm90dG9tLWJhci9ib3R0b20tYmFyLm1vZHVsZSc7XG5pbXBvcnQgeyBIZWFkZXJCYXJNb2R1bGUgfSBmcm9tICcuLi9jb21wb25lbnRzL2hlYWRlci1iYXIvaGVhZGVyLWJhci5tb2R1bGUnO1xuaW1wb3J0IHsgTmF0aXZlU2NyaXB0Rm9ybXNNb2R1bGUgfSBmcm9tICduYXRpdmVzY3JpcHQtYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBOZ1NoYWRvd01vZHVsZSB9IGZyb20gJ25hdGl2ZXNjcmlwdC1uZy1zaGFkb3cnO1xuXG5ATmdNb2R1bGUoe1xuICBkZWNsYXJhdGlvbnM6IFtdLFxuICBpbXBvcnRzOiBbTmF0aXZlU2NyaXB0Q29tbW9uTW9kdWxlLCBCb3R0b21Nb2R1bGUsIEhlYWRlckJhck1vZHVsZSxOYXRpdmVTY3JpcHRGb3Jtc01vZHVsZSxOZ1NoYWRvd01vZHVsZV0sXG4gIGV4cG9ydHM6IFtOYXRpdmVTY3JpcHRDb21tb25Nb2R1bGUsIEJvdHRvbU1vZHVsZSwgSGVhZGVyQmFyTW9kdWxlLE5hdGl2ZVNjcmlwdEZvcm1zTW9kdWxlLE5nU2hhZG93TW9kdWxlXSxcbiAgc2NoZW1hczogW05PX0VSUk9SU19TQ0hFTUFdXG59KVxuZXhwb3J0IGNsYXNzIFNoYXJlZE1vZHVsZSB7fVxuIl19