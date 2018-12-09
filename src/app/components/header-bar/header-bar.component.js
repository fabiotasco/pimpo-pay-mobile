"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var trasaction_service_1 = require("~/app/services/trasaction.service");
var HeaderBarComponent = /** @class */ (function () {
    function HeaderBarComponent(transactionService) {
        this.transactionService = transactionService;
        this.hideBalance = false;
    }
    HeaderBarComponent.prototype.ngOnInit = function () {
        this.balance$ = this.transactionService.accountBalance$;
    };
    HeaderBarComponent.prototype.closeBalance = function () {
        this.hideBalance = !this.hideBalance;
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
        __metadata("design:paramtypes", [trasaction_service_1.TransactionService])
    ], HeaderBarComponent);
    return HeaderBarComponent;
}());
exports.HeaderBarComponent = HeaderBarComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVhZGVyLWJhci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJoZWFkZXItYmFyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUF5RDtBQUN6RCx3RUFBdUU7QUFTdkU7SUFLRSw0QkFBb0Isa0JBQXFDO1FBQXJDLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBbUI7UUFGekQsZ0JBQVcsR0FBRyxLQUFLLENBQUM7SUFFeUMsQ0FBQztJQUU5RCxxQ0FBUSxHQUFSO1FBQ0UsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUMsZUFBZSxDQUFDO0lBQzFELENBQUM7SUFFRCx5Q0FBWSxHQUFaO1FBQ0UsSUFBSSxDQUFDLFdBQVcsR0FBRyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUM7SUFDdkMsQ0FBQztJQVpRO1FBQVIsWUFBSyxFQUFFOzt3REFBaUI7SUFEZCxrQkFBa0I7UUFOOUIsZ0JBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxnQkFBZ0I7WUFDMUIsV0FBVyxFQUFFLDZCQUE2QjtZQUMxQyxTQUFTLEVBQUUsQ0FBQyw0QkFBNEIsQ0FBQztZQUN6QyxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7U0FDcEIsQ0FBQzt5Q0FNdUMsdUNBQWtCO09BTDlDLGtCQUFrQixDQWM5QjtJQUFELHlCQUFDO0NBQUEsQUFkRCxJQWNDO0FBZFksZ0RBQWtCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBUcmFuc2FjdGlvblNlcnZpY2UgfSBmcm9tICd+L2FwcC9zZXJ2aWNlcy90cmFzYWN0aW9uLnNlcnZpY2UnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdQaW1wb0hlYWRlckJhcicsXG4gIHRlbXBsYXRlVXJsOiAnLi9oZWFkZXItYmFyLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vaGVhZGVyLWJhci5jb21wb25lbnQuY3NzJ10sXG4gIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG59KVxuZXhwb3J0IGNsYXNzIEhlYWRlckJhckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIEBJbnB1dCgpIHVzZXJuYW1lOnN0cmluZztcbiAgYmFsYW5jZSQ6T2JzZXJ2YWJsZTxudW1iZXI+O1xuICBoaWRlQmFsYW5jZSA9IGZhbHNlO1xuICBcbiAgY29uc3RydWN0b3IocHJpdmF0ZSB0cmFuc2FjdGlvblNlcnZpY2U6VHJhbnNhY3Rpb25TZXJ2aWNlKSB7IH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLmJhbGFuY2UkID0gdGhpcy50cmFuc2FjdGlvblNlcnZpY2UuYWNjb3VudEJhbGFuY2UkO1xuICB9XG5cbiAgY2xvc2VCYWxhbmNlKCk6dm9pZHtcbiAgICB0aGlzLmhpZGVCYWxhbmNlID0gIXRoaXMuaGlkZUJhbGFuY2U7XG4gIH1cbn1cbiJdfQ==