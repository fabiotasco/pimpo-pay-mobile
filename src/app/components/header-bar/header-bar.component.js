"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var HeaderBarComponent = /** @class */ (function () {
    function HeaderBarComponent() {
    }
    HeaderBarComponent.prototype.ngOnInit = function () {
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], HeaderBarComponent.prototype, "username", void 0);
    HeaderBarComponent = __decorate([
        core_1.Component({
            selector: 'PimpoHeaderBar',
            templateUrl: './header-bar.component.html',
            styleUrls: ['./header-bar.component.css'],
            moduleId: module.id,
        }),
        __metadata("design:paramtypes", [])
    ], HeaderBarComponent);
    return HeaderBarComponent;
}());
exports.HeaderBarComponent = HeaderBarComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVhZGVyLWJhci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJoZWFkZXItYmFyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUF5RDtBQVF6RDtJQUlFO0lBQWdCLENBQUM7SUFFakIscUNBQVEsR0FBUjtJQUNBLENBQUM7SUFMUTtRQUFSLFlBQUssRUFBRTs7d0RBQWlCO0lBRmQsa0JBQWtCO1FBTjlCLGdCQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsZ0JBQWdCO1lBQzFCLFdBQVcsRUFBRSw2QkFBNkI7WUFDMUMsU0FBUyxFQUFFLENBQUMsNEJBQTRCLENBQUM7WUFDekMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1NBQ3BCLENBQUM7O09BQ1csa0JBQWtCLENBUzlCO0lBQUQseUJBQUM7Q0FBQSxBQVRELElBU0M7QUFUWSxnREFBa0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnUGltcG9IZWFkZXJCYXInLFxuICB0ZW1wbGF0ZVVybDogJy4vaGVhZGVyLWJhci5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL2hlYWRlci1iYXIuY29tcG9uZW50LmNzcyddLFxuICBtb2R1bGVJZDogbW9kdWxlLmlkLFxufSlcbmV4cG9ydCBjbGFzcyBIZWFkZXJCYXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIEBJbnB1dCgpIHVzZXJuYW1lOnN0cmluZztcbiAgXG4gIGNvbnN0cnVjdG9yKCkgeyB9XG5cbiAgbmdPbkluaXQoKSB7XG4gIH1cblxufVxuIl19