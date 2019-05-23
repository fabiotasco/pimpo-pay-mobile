"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var LoadingComponent = /** @class */ (function () {
    function LoadingComponent() {
    }
    LoadingComponent.prototype.ngOnInit = function () { };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], LoadingComponent.prototype, "active", void 0);
    LoadingComponent = __decorate([
        core_1.Component({
            selector: 'ns-loading',
            template: "\n    <StackLayout\n      class=\"dimmer\"\n      visibility=\"{{ active ? 'visible' : 'collapsed' }}\"\n    ></StackLayout>\n    <GridLayout\n      columns=\"40,*\"\n      class=\"loading-container\"\n      rows=\"*\"\n      visibility=\"{{ active ? 'visible' : 'collapsed' }}\"\n    >\n      <ActivityIndicator\n        col=\"0\"\n        busy=\"true\"\n        verticalAlignment=\"center\"\n      ></ActivityIndicator>\n      <Label\n        class=\"font-weight-bold m-l-10\"\n        text=\"Aguarde...\"\n        col=\"1\"\n        verticalAlignment=\"center\"\n      ></Label>\n    </GridLayout>\n  "
        }),
        __metadata("design:paramtypes", [])
    ], LoadingComponent);
    return LoadingComponent;
}());
exports.LoadingComponent = LoadingComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9hZGluZy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJsb2FkaW5nLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUF5RDtBQThCekQ7SUFJRTtJQUFlLENBQUM7SUFFaEIsbUNBQVEsR0FBUixjQUFZLENBQUM7SUFKYjtRQURDLFlBQUssRUFBRTs7b0RBQ1E7SUFGTCxnQkFBZ0I7UUEzQjVCLGdCQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsWUFBWTtZQUN0QixRQUFRLEVBQUUsOGxCQXVCVDtTQUNGLENBQUM7O09BQ1csZ0JBQWdCLENBTzVCO0lBQUQsdUJBQUM7Q0FBQSxBQVBELElBT0M7QUFQWSw0Q0FBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IExvYWRpbmdTZXJ2aWNlIH0gZnJvbSAnfi9hcHAvc2VydmljZXMvbG9hZGluZy5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbnMtbG9hZGluZycsXG4gIHRlbXBsYXRlOiBgXG4gICAgPFN0YWNrTGF5b3V0XG4gICAgICBjbGFzcz1cImRpbW1lclwiXG4gICAgICB2aXNpYmlsaXR5PVwie3sgYWN0aXZlID8gJ3Zpc2libGUnIDogJ2NvbGxhcHNlZCcgfX1cIlxuICAgID48L1N0YWNrTGF5b3V0PlxuICAgIDxHcmlkTGF5b3V0XG4gICAgICBjb2x1bW5zPVwiNDAsKlwiXG4gICAgICBjbGFzcz1cImxvYWRpbmctY29udGFpbmVyXCJcbiAgICAgIHJvd3M9XCIqXCJcbiAgICAgIHZpc2liaWxpdHk9XCJ7eyBhY3RpdmUgPyAndmlzaWJsZScgOiAnY29sbGFwc2VkJyB9fVwiXG4gICAgPlxuICAgICAgPEFjdGl2aXR5SW5kaWNhdG9yXG4gICAgICAgIGNvbD1cIjBcIlxuICAgICAgICBidXN5PVwidHJ1ZVwiXG4gICAgICAgIHZlcnRpY2FsQWxpZ25tZW50PVwiY2VudGVyXCJcbiAgICAgID48L0FjdGl2aXR5SW5kaWNhdG9yPlxuICAgICAgPExhYmVsXG4gICAgICAgIGNsYXNzPVwiZm9udC13ZWlnaHQtYm9sZCBtLWwtMTBcIlxuICAgICAgICB0ZXh0PVwiQWd1YXJkZS4uLlwiXG4gICAgICAgIGNvbD1cIjFcIlxuICAgICAgICB2ZXJ0aWNhbEFsaWdubWVudD1cImNlbnRlclwiXG4gICAgICA+PC9MYWJlbD5cbiAgICA8L0dyaWRMYXlvdXQ+XG4gIGBcbn0pXG5leHBvcnQgY2xhc3MgTG9hZGluZ0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIEBJbnB1dCgpXG4gIGFjdGl2ZTogYm9vbGVhbjtcblxuICBjb25zdHJ1Y3RvcigpIHt9XG5cbiAgbmdPbkluaXQoKSB7fVxufVxuIl19