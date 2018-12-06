"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("nativescript-angular/common");
var bottom_bar_module_1 = require("../components/bottom-bar/bottom-bar.module");
var header_bar_module_1 = require("../components/header-bar/header-bar.module");
var forms_1 = require("nativescript-angular/forms");
var SharedModule = /** @class */ (function () {
    function SharedModule() {
    }
    SharedModule = __decorate([
        core_1.NgModule({
            declarations: [],
            imports: [common_1.NativeScriptCommonModule, bottom_bar_module_1.BottomModule, header_bar_module_1.HeaderBarModule, forms_1.NativeScriptFormsModule],
            exports: [common_1.NativeScriptCommonModule, bottom_bar_module_1.BottomModule, header_bar_module_1.HeaderBarModule, forms_1.NativeScriptFormsModule],
            schemas: [core_1.NO_ERRORS_SCHEMA]
        })
    ], SharedModule);
    return SharedModule;
}());
exports.SharedModule = SharedModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hhcmVkLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNoYXJlZC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBMkQ7QUFDM0Qsc0RBQXVFO0FBQ3ZFLGdGQUEwRTtBQUMxRSxnRkFBNkU7QUFDN0Usb0RBQXFFO0FBUXJFO0lBQUE7SUFBMkIsQ0FBQztJQUFmLFlBQVk7UUFOeEIsZUFBUSxDQUFDO1lBQ1IsWUFBWSxFQUFFLEVBQUU7WUFDaEIsT0FBTyxFQUFFLENBQUMsaUNBQXdCLEVBQUUsZ0NBQVksRUFBRSxtQ0FBZSxFQUFDLCtCQUF1QixDQUFDO1lBQzFGLE9BQU8sRUFBRSxDQUFDLGlDQUF3QixFQUFFLGdDQUFZLEVBQUUsbUNBQWUsRUFBQywrQkFBdUIsQ0FBQztZQUMxRixPQUFPLEVBQUUsQ0FBQyx1QkFBZ0IsQ0FBQztTQUM1QixDQUFDO09BQ1csWUFBWSxDQUFHO0lBQUQsbUJBQUM7Q0FBQSxBQUE1QixJQUE0QjtBQUFmLG9DQUFZIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUsIE5PX0VSUk9SU19TQ0hFTUEgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5hdGl2ZVNjcmlwdENvbW1vbk1vZHVsZSB9IGZyb20gJ25hdGl2ZXNjcmlwdC1hbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBCb3R0b21Nb2R1bGUgfSBmcm9tICcuLi9jb21wb25lbnRzL2JvdHRvbS1iYXIvYm90dG9tLWJhci5tb2R1bGUnO1xuaW1wb3J0IHsgSGVhZGVyQmFyTW9kdWxlIH0gZnJvbSAnLi4vY29tcG9uZW50cy9oZWFkZXItYmFyL2hlYWRlci1iYXIubW9kdWxlJztcbmltcG9ydCB7IE5hdGl2ZVNjcmlwdEZvcm1zTW9kdWxlIH0gZnJvbSAnbmF0aXZlc2NyaXB0LWFuZ3VsYXIvZm9ybXMnO1xuXG5ATmdNb2R1bGUoe1xuICBkZWNsYXJhdGlvbnM6IFtdLFxuICBpbXBvcnRzOiBbTmF0aXZlU2NyaXB0Q29tbW9uTW9kdWxlLCBCb3R0b21Nb2R1bGUsIEhlYWRlckJhck1vZHVsZSxOYXRpdmVTY3JpcHRGb3Jtc01vZHVsZV0sXG4gIGV4cG9ydHM6IFtOYXRpdmVTY3JpcHRDb21tb25Nb2R1bGUsIEJvdHRvbU1vZHVsZSwgSGVhZGVyQmFyTW9kdWxlLE5hdGl2ZVNjcmlwdEZvcm1zTW9kdWxlXSxcbiAgc2NoZW1hczogW05PX0VSUk9SU19TQ0hFTUFdXG59KVxuZXhwb3J0IGNsYXNzIFNoYXJlZE1vZHVsZSB7fVxuIl19