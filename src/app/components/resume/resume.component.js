"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var ResumeComponent = /** @class */ (function () {
    function ResumeComponent() {
        this.showResume = false;
        this.actionClick = new core_1.EventEmitter();
    }
    ResumeComponent.prototype.ngOnInit = function () { };
    ResumeComponent.prototype.action = function (btnClicked) {
        this.actionClick.emit(btnClicked);
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], ResumeComponent.prototype, "resume", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], ResumeComponent.prototype, "showResume", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], ResumeComponent.prototype, "actionClick", void 0);
    ResumeComponent = __decorate([
        core_1.Component({
            selector: 'ns-resume',
            templateUrl: './resume.component.html',
            styleUrls: ['./resume.component.css'],
            moduleId: module.id
        }),
        __metadata("design:paramtypes", [])
    ], ResumeComponent);
    return ResumeComponent;
}());
exports.ResumeComponent = ResumeComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzdW1lLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInJlc3VtZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBK0U7QUFTL0U7SUFRRTtRQUpBLGVBQVUsR0FBRyxLQUFLLENBQUM7UUFFbkIsZ0JBQVcsR0FBRyxJQUFJLG1CQUFZLEVBQUUsQ0FBQztJQUVsQixDQUFDO0lBRWhCLGtDQUFRLEdBQVIsY0FBWSxDQUFDO0lBRU4sZ0NBQU0sR0FBYixVQUFjLFVBQWtCO1FBQzlCLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ3BDLENBQUM7SUFaRDtRQURDLFlBQUssRUFBRTs7bURBQ1k7SUFFcEI7UUFEQyxZQUFLLEVBQUU7O3VEQUNXO0lBRW5CO1FBREMsYUFBTSxFQUFFOzt3REFDd0I7SUFOdEIsZUFBZTtRQU4zQixnQkFBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLFdBQVc7WUFDckIsV0FBVyxFQUFFLHlCQUF5QjtZQUN0QyxTQUFTLEVBQUUsQ0FBQyx3QkFBd0IsQ0FBQztZQUNyQyxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7U0FDcEIsQ0FBQzs7T0FDVyxlQUFlLENBZTNCO0lBQUQsc0JBQUM7Q0FBQSxBQWZELElBZUM7QUFmWSwwQ0FBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFJlc3VtZU1vZGVsIH0gZnJvbSAnfi9hcHAvdXRpbHMvdmFyaWFibGVzJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbnMtcmVzdW1lJyxcbiAgdGVtcGxhdGVVcmw6ICcuL3Jlc3VtZS5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL3Jlc3VtZS5jb21wb25lbnQuY3NzJ10sXG4gIG1vZHVsZUlkOiBtb2R1bGUuaWRcbn0pXG5leHBvcnQgY2xhc3MgUmVzdW1lQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgQElucHV0KClcbiAgcmVzdW1lOiBSZXN1bWVNb2RlbDtcbiAgQElucHV0KClcbiAgc2hvd1Jlc3VtZSA9IGZhbHNlO1xuICBAT3V0cHV0KClcbiAgYWN0aW9uQ2xpY2sgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgY29uc3RydWN0b3IoKSB7fVxuXG4gIG5nT25Jbml0KCkge31cblxuICBwdWJsaWMgYWN0aW9uKGJ0bkNsaWNrZWQ6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMuYWN0aW9uQ2xpY2suZW1pdChidG5DbGlja2VkKTtcbiAgfVxufVxuIl19