"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var action_card_component_1 = require("./action-card.component");
var action_card_service_1 = require("./action-card.service");
var nativescript_mask_module_1 = require("../nativescript-currency-mask/nativescript-mask.module");
var nativescript_document_mask_module_1 = require("../nativescript-document-mask/nativescript-document-mask.module");
var ActionCardModule = /** @class */ (function () {
    function ActionCardModule() {
    }
    ActionCardModule = __decorate([
        core_1.NgModule({
            imports: [nativescript_mask_module_1.NativescriptMaskModule, nativescript_document_mask_module_1.NativescriptDocumentMaskModule],
            exports: [action_card_component_1.ActionCardComponent],
            declarations: [action_card_component_1.ActionCardComponent],
            providers: [action_card_service_1.ActionCardService],
            schemas: [core_1.NO_ERRORS_SCHEMA]
        })
    ], ActionCardModule);
    return ActionCardModule;
}());
exports.ActionCardModule = ActionCardModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWN0aW9uLWNhcmQubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYWN0aW9uLWNhcmQubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQTJEO0FBQzNELGlFQUE4RDtBQUM5RCw2REFBMEQ7QUFDMUQsbUdBQWdHO0FBQ2hHLHFIQUFpSDtBQVNqSDtJQUFBO0lBQStCLENBQUM7SUFBbkIsZ0JBQWdCO1FBUDVCLGVBQVEsQ0FBQztZQUNSLE9BQU8sRUFBRSxDQUFDLGlEQUFzQixFQUFFLGtFQUE4QixDQUFDO1lBQ2pFLE9BQU8sRUFBRSxDQUFDLDJDQUFtQixDQUFDO1lBQzlCLFlBQVksRUFBRSxDQUFDLDJDQUFtQixDQUFDO1lBQ25DLFNBQVMsRUFBRSxDQUFDLHVDQUFpQixDQUFDO1lBQzlCLE9BQU8sRUFBRSxDQUFDLHVCQUFnQixDQUFDO1NBQzVCLENBQUM7T0FDVyxnQkFBZ0IsQ0FBRztJQUFELHVCQUFDO0NBQUEsQUFBaEMsSUFBZ0M7QUFBbkIsNENBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUsIE5PX0VSUk9SU19TQ0hFTUEgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFjdGlvbkNhcmRDb21wb25lbnQgfSBmcm9tICcuL2FjdGlvbi1jYXJkLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBBY3Rpb25DYXJkU2VydmljZSB9IGZyb20gJy4vYWN0aW9uLWNhcmQuc2VydmljZSc7XG5pbXBvcnQgeyBOYXRpdmVzY3JpcHRNYXNrTW9kdWxlIH0gZnJvbSAnLi4vbmF0aXZlc2NyaXB0LWN1cnJlbmN5LW1hc2svbmF0aXZlc2NyaXB0LW1hc2subW9kdWxlJztcbmltcG9ydCB7IE5hdGl2ZXNjcmlwdERvY3VtZW50TWFza01vZHVsZSB9IGZyb20gJy4uL25hdGl2ZXNjcmlwdC1kb2N1bWVudC1tYXNrL25hdGl2ZXNjcmlwdC1kb2N1bWVudC1tYXNrLm1vZHVsZSc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtOYXRpdmVzY3JpcHRNYXNrTW9kdWxlLCBOYXRpdmVzY3JpcHREb2N1bWVudE1hc2tNb2R1bGVdLFxuICBleHBvcnRzOiBbQWN0aW9uQ2FyZENvbXBvbmVudF0sXG4gIGRlY2xhcmF0aW9uczogW0FjdGlvbkNhcmRDb21wb25lbnRdLFxuICBwcm92aWRlcnM6IFtBY3Rpb25DYXJkU2VydmljZV0sXG4gIHNjaGVtYXM6IFtOT19FUlJPUlNfU0NIRU1BXVxufSlcbmV4cG9ydCBjbGFzcyBBY3Rpb25DYXJkTW9kdWxlIHt9XG4iXX0=