"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var action_card_component_1 = require("./action-card.component");
var action_card_service_1 = require("./action-card.service");
var nativescript_mask_module_1 = require("../nativescript-currency-mask/nativescript-mask.module");
var ActionCardModule = /** @class */ (function () {
    function ActionCardModule() {
    }
    ActionCardModule = __decorate([
        core_1.NgModule({
            imports: [nativescript_mask_module_1.NativescriptMaskModule],
            exports: [action_card_component_1.ActionCardComponent],
            declarations: [action_card_component_1.ActionCardComponent],
            providers: [action_card_service_1.ActionCardService],
            schemas: [core_1.NO_ERRORS_SCHEMA]
        })
    ], ActionCardModule);
    return ActionCardModule;
}());
exports.ActionCardModule = ActionCardModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWN0aW9uLWNhcmQubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYWN0aW9uLWNhcmQubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQTJEO0FBQzNELGlFQUE4RDtBQUM5RCw2REFBMEQ7QUFDMUQsbUdBQWdHO0FBU2hHO0lBQUE7SUFBK0IsQ0FBQztJQUFuQixnQkFBZ0I7UUFQNUIsZUFBUSxDQUFDO1lBQ1IsT0FBTyxFQUFFLENBQUMsaURBQXNCLENBQUM7WUFDakMsT0FBTyxFQUFFLENBQUMsMkNBQW1CLENBQUM7WUFDOUIsWUFBWSxFQUFFLENBQUMsMkNBQW1CLENBQUM7WUFDbkMsU0FBUyxFQUFFLENBQUMsdUNBQWlCLENBQUM7WUFDOUIsT0FBTyxFQUFFLENBQUMsdUJBQWdCLENBQUM7U0FDNUIsQ0FBQztPQUNXLGdCQUFnQixDQUFHO0lBQUQsdUJBQUM7Q0FBQSxBQUFoQyxJQUFnQztBQUFuQiw0Q0FBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSwgTk9fRVJST1JTX1NDSEVNQSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQWN0aW9uQ2FyZENvbXBvbmVudCB9IGZyb20gJy4vYWN0aW9uLWNhcmQuY29tcG9uZW50JztcbmltcG9ydCB7IEFjdGlvbkNhcmRTZXJ2aWNlIH0gZnJvbSAnLi9hY3Rpb24tY2FyZC5zZXJ2aWNlJztcbmltcG9ydCB7IE5hdGl2ZXNjcmlwdE1hc2tNb2R1bGUgfSBmcm9tICcuLi9uYXRpdmVzY3JpcHQtY3VycmVuY3ktbWFzay9uYXRpdmVzY3JpcHQtbWFzay5tb2R1bGUnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbTmF0aXZlc2NyaXB0TWFza01vZHVsZV0sXG4gIGV4cG9ydHM6IFtBY3Rpb25DYXJkQ29tcG9uZW50XSxcbiAgZGVjbGFyYXRpb25zOiBbQWN0aW9uQ2FyZENvbXBvbmVudF0sXG4gIHByb3ZpZGVyczogW0FjdGlvbkNhcmRTZXJ2aWNlXSxcbiAgc2NoZW1hczogW05PX0VSUk9SU19TQ0hFTUFdXG59KVxuZXhwb3J0IGNsYXNzIEFjdGlvbkNhcmRNb2R1bGUge31cbiJdfQ==