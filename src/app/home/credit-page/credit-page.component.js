"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var toast_helper_service_1 = require("~/app/core/toast-helper.service");
var trasaction_service_1 = require("~/app/services/trasaction.service");
var deposit_1 = require("~/app/models/deposit");
var variables_1 = require("~/app/utils/variables");
var account_service_1 = require("~/app/services/account.service");
var color_1 = require("tns-core-modules/color/color");
var page_1 = require("tns-core-modules/ui/page/page");
var plan_1 = require("~/app/models/plan");
var nativescript_ng_shadow_1 = require("nativescript-ng-shadow");
var moment = require("moment");
var CreditPageComponent = /** @class */ (function () {
    function CreditPageComponent(page, accountService, transactionService, toastHelper) {
        this.page = page;
        this.accountService = accountService;
        this.transactionService = transactionService;
        this.toastHelper = toastHelper;
        this.btnShadow = {
            elevation: 2,
            bgcolor: '#EC407A',
            shape: nativescript_ng_shadow_1.ShapeEnum.RECTANGLE,
            cornerRadius: 8
        };
        this.menuChevron = 'res://baseline_chevron_left_black_24';
        this.showInstallmentField = false;
        this.showBuyCard = true;
        this.showPlanCard = false;
        this.valueOk = false;
        this.planOk = false;
        this.isLoading = false;
        this.transactionFinish = false;
        this.transactionSuccess = false;
    }
    CreditPageComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.deposit = new deposit_1.Deposit();
        this.accountService.userData$.subscribe(function (user) {
            _this.myHolderNumber = user.phones[0].number;
        });
        this.actualPosition = variables_1.PositionChevron.CLOSE;
        this.selectedPlan = new plan_1.Plan();
        this.selectedPlan.name = 'Prepaid';
    };
    CreditPageComponent.prototype.finalizeTrasaction = function (btnId) {
        var _this = this;
        this.isLoading = true;
        var view = this.page.getViewById(btnId);
        view.animate({ backgroundColor: new color_1.Color('#ff77a9'), duration: 200 }).then(function () {
            view.animate({ backgroundColor: new color_1.Color('#ec407a'), duration: 200 });
        });
        this.deposit.amount = this.selectedValue;
        this.deposit.currency = 'BRL';
        this.deposit.date = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
        this.deposit.holderAccount.number = this.myHolderNumber;
        this.transactionService.executeDeposit(this.deposit).subscribe(function (res) {
            _this.isLoading = false;
            _this.transactionFinish = true;
            _this.transactionSuccess = res.success;
            if (!_this.transactionSuccess) {
                _this.errorMessage = res.errors[0].message;
            }
        });
    };
    CreditPageComponent.prototype.newTransaction = function () {
        this.transactionFinish = false;
    };
    CreditPageComponent.prototype.setValue = function () {
        if (!this.selectedValue) {
            this.toastHelper.showToast('Informe o valor da compra');
            return;
        }
        this.valueOk = true;
        this.showBuyCard = false;
        this.showPlanCard = true;
    };
    CreditPageComponent.prototype.setPlan = function (plan, installment) {
        if (installment === void 0) { installment = 0; }
        this.selectedPlan.name = plan;
        this.selectedPlan.installments = installment;
        this.planOk = true;
        this.showBuyCard = false;
    };
    CreditPageComponent.prototype.cardClick = function (id) {
        var view = this.page.getViewById(id);
        this.setCardExibition(view, id);
    };
    CreditPageComponent.prototype.posPagClick = function (event, imageViewId) {
        var view = event.view.getViewById(imageViewId);
        this.executeAnimation(view);
        this.showInstallmentField = !this.showInstallmentField;
    };
    CreditPageComponent.prototype.reenterValue = function () {
        var _this = this;
        this.selectedValue = null;
        this.showBuyCard = true;
        this.valueOk = false;
        setTimeout(function () {
            var view = _this.page.getViewById('buyCard');
            view.style.background = '#ffffff';
        }, 100);
    };
    CreditPageComponent.prototype.reenterPlan = function () {
        var _this = this;
        this.selectedPlan = new plan_1.Plan();
        this.showPlanCard = true;
        this.planOk = false;
        setTimeout(function () {
            var view = _this.page.getViewById('planCard');
            view.style.background = '#ffffff';
        }, 100);
    };
    CreditPageComponent.prototype.executeAnimation = function (view) {
        if (this.actualPosition === variables_1.PositionChevron.CLOSE) {
            this.actualPosition = variables_1.PositionChevron.OPEN;
            view.animate({ rotate: variables_1.PositionChevron.OPEN, duration: 200 });
        }
        else if (this.actualPosition === variables_1.PositionChevron.OPEN) {
            this.actualPosition = variables_1.PositionChevron.CLOSE;
            view.animate({ rotate: variables_1.PositionChevron.CLOSE, duration: 200 });
        }
    };
    CreditPageComponent.prototype.setCardExibition = function (viewToAnimate, id) {
        var buyCardView = this.page.getViewById('buyCard');
        var accountCardView = this.page.getViewById('accountCard');
        var planCardView = this.page.getViewById('planCard');
        switch (id) {
            case 'buyCard':
                if (!this.showBuyCard) {
                    this.showBuyCard = true;
                    this.showPlanCard = false;
                    this.excuteAnimationOfCards(viewToAnimate);
                    if (accountCardView && planCardView) {
                        accountCardView.animate({ backgroundColor: new color_1.Color('#5c605c'), duration: 100 });
                        planCardView.animate({ backgroundColor: new color_1.Color('#5c605c'), duration: 100 });
                    }
                }
                break;
            case 'planCard':
                if (!this.showPlanCard) {
                    this.showPlanCard = !this.showPlanCard;
                    this.showBuyCard = false;
                    this.excuteAnimationOfCards(viewToAnimate);
                    if (buyCardView && accountCardView) {
                        accountCardView.animate({ backgroundColor: new color_1.Color('#5c605c'), duration: 100 });
                        buyCardView.animate({ backgroundColor: new color_1.Color('#5c605c'), duration: 100 });
                    }
                }
                break;
            default:
                break;
        }
    };
    CreditPageComponent.prototype.excuteAnimationOfCards = function (viewToAnimate) {
        viewToAnimate.animate({ backgroundColor: new color_1.Color('#ffffff'), duration: 100 });
    };
    CreditPageComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'CreditPage',
            templateUrl: './credit-page.component.html',
            styleUrls: ['./credit-page.component.css'],
            providers: [common_1.CurrencyPipe]
        }),
        __metadata("design:paramtypes", [page_1.Page,
            account_service_1.AccountService,
            trasaction_service_1.TransactionService,
            toast_helper_service_1.ToastHelperService])
    ], CreditPageComponent);
    return CreditPageComponent;
}());
exports.CreditPageComponent = CreditPageComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlZGl0LXBhZ2UuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY3JlZGl0LXBhZ2UuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQWtEO0FBQ2xELDBDQUErQztBQUMvQyx3RUFBcUU7QUFDckUsd0VBQXVFO0FBQ3ZFLGdEQUErQztBQUMvQyxtREFBd0Q7QUFDeEQsa0VBQWdFO0FBQ2hFLHNEQUFxRDtBQUNyRCxzREFBMkQ7QUFFM0QsMENBQXlDO0FBSXpDLGlFQUFnRTtBQUNoRSwrQkFBa0M7QUFTbEM7SUEwQkUsNkJBQ1UsSUFBVSxFQUNWLGNBQThCLEVBQzlCLGtCQUFzQyxFQUN0QyxXQUErQjtRQUgvQixTQUFJLEdBQUosSUFBSSxDQUFNO1FBQ1YsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBQzlCLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBb0I7UUFDdEMsZ0JBQVcsR0FBWCxXQUFXLENBQW9CO1FBN0JsQyxjQUFTLEdBQWdCO1lBQzlCLFNBQVMsRUFBRSxDQUFDO1lBQ1osT0FBTyxFQUFFLFNBQVM7WUFDbEIsS0FBSyxFQUFFLGtDQUFTLENBQUMsU0FBUztZQUMxQixZQUFZLEVBQUUsQ0FBQztTQUNoQixDQUFDO1FBQ0ssZ0JBQVcsR0FBRyxzQ0FBc0MsQ0FBQztRQUVyRCx5QkFBb0IsR0FBRyxLQUFLLENBQUM7UUFDN0IsZ0JBQVcsR0FBRyxJQUFJLENBQUM7UUFDbkIsaUJBQVksR0FBRyxLQUFLLENBQUM7UUFJckIsWUFBTyxHQUFHLEtBQUssQ0FBQztRQUNoQixXQUFNLEdBQUcsS0FBSyxDQUFDO1FBSWYsY0FBUyxHQUFHLEtBQUssQ0FBQztRQUNsQixzQkFBaUIsR0FBRyxLQUFLLENBQUM7UUFDMUIsdUJBQWtCLEdBQUcsS0FBSyxDQUFDO0lBUy9CLENBQUM7SUFFRyxzQ0FBUSxHQUFmO1FBQUEsaUJBUUM7UUFQQyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksaUJBQU8sRUFBRSxD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QUMsU0FBUyxDQUFDLEVBQUUsUUFBUSxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUM7SUFDbEYsQ0FBQztJQXZLVSxtQkFBbUI7UUFQL0IsZ0JBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixRQUFRLEVBQUUsWUFBWTtZQUN0QixXQUFXLEVBQUUsOEJBQThCO1lBQzNDLFNBQVMsRUFBRSxDQUFDLDZCQUE2QixDQUFDO1lBQzFDLFNBQVMsRUFBRSxDQUFDLHFCQUFZLENBQUM7U0FDMUIsQ0FBQzt5Q0E0QmdCLFdBQUk7WUFDTSxnQ0FBYztZQUNWLHVDQUFrQjtZQUN6Qix5Q0FBa0I7T0E5QjlCLG1CQUFtQixDQXdLL0I7SUFBRCwwQkFBQztDQUFBLEFBeEtELElBd0tDO0FBeEtZLGtEQUFtQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDdXJyZW5jeVBpcGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgVG9hc3RIZWxwZXJTZXJ2aWNlIH0gZnJvbSAnfi9hcHAvY29yZS90b2FzdC1oZWxwZXIuc2VydmljZSc7XG5pbXBvcnQgeyBUcmFuc2FjdGlvblNlcnZpY2UgfSBmcm9tICd+L2FwcC9zZXJ2aWNlcy90cmFzYWN0aW9uLnNlcnZpY2UnO1xuaW1wb3J0IHsgRGVwb3NpdCB9IGZyb20gJ34vYXBwL21vZGVscy9kZXBvc2l0JztcbmltcG9ydCB7IFBvc2l0aW9uQ2hldnJvbiB9IGZyb20gJ34vYXBwL3V0aWxzL3ZhcmlhYmxlcyc7XG5pbXBvcnQgeyBBY2NvdW50U2VydmljZSB9IGZyb20gJ34vYXBwL3NlcnZpY2VzL2FjY291bnQuc2VydmljZSc7XG5pbXBvcnQgeyBDb2xvciB9IGZyb20gJ3Rucy1jb3JlLW1vZHVsZXMvY29sb3IvY29sb3InO1xuaW1wb3J0IHsgVmlldywgUGFnZSB9IGZyb20gJ3Rucy1jb3JlLW1vZHVsZXMvdWkvcGFnZS9wYWdlJztcbmltcG9ydCB7IFN0YWNrTGF5b3V0IH0gZnJvbSAndG5zLWNvcmUtbW9kdWxlcy91aS9sYXlvdXRzL3N0YWNrLWxheW91dC9zdGFjay1sYXlvdXQnO1xuaW1wb3J0IHsgUGxhbiB9IGZyb20gJ34vYXBwL21vZGVscy9wbGFuJztcbmltcG9ydCB7IEJ1dHRvbiB9IGZyb20gJ3Rucy1jb3JlLW1vZHVsZXMvdWkvYnV0dG9uL2J1dHRvbic7XG5pbXBvcnQgeyBVc2VyRGF0YSB9IGZyb20gJ34vYXBwL21vZGVscy91c2VyLWRhdGEnO1xuaW1wb3J0IHsgQmFyY29kZVNjYW5uZXIgfSBmcm9tICduYXRpdmVzY3JpcHQtYmFyY29kZXNjYW5uZXInO1xuaW1wb3J0IHsgU2hhcGVFbnVtLCBBbmRyb2lkRGF0YSB9IGZyb20gJ25hdGl2ZXNjcmlwdC1uZy1zaGFkb3cnO1xuaW1wb3J0IG1vbWVudCA9IHJlcXVpcmUoJ21vbWVudCcpO1xuXG5AQ29tcG9uZW50KHtcbiAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgc2VsZWN0b3I6ICdDcmVkaXRQYWdlJyxcbiAgdGVtcGxhdGVVcmw6ICcuL2NyZWRpdC1wYWdlLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vY3JlZGl0LXBhZ2UuY29tcG9uZW50LmNzcyddLFxuICBwcm92aWRlcnM6IFtDdXJyZW5jeVBpcGVdXG59KVxuZXhwb3J0IGNsYXNzIENyZWRpdFBhZ2VDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBwdWJsaWMgYnRuU2hhZG93OiBBbmRyb2lkRGF0YSA9IHtcbiAgICBlbGV2YXRpb246IDIsXG4gICAgYmdjb2xvcjogJyNFQzQwN0EnLFxuICAgIHNoYXBlOiBTaGFwZUVudW0uUkVDVEFOR0xFLFxuICAgIGNvcm5lclJhZGl1czogOFxuICB9O1xuICBwdWJsaWMgbWVudUNoZXZyb24gPSAncmVzOi8vYmFzZWxpbmVfY2hldnJvbl9sZWZ0X2JsYWNrXzI0JztcbiAgcHVibGljIGFjdHVhbFBvc2l0aW9uOiBQb3NpdGlvbkNoZXZyb247XG4gIHB1YmxpYyBzaG93SW5zdGFsbG1lbnRGaWVsZCA9IGZhbHNlO1xuICBwdWJsaWMgc2hvd0J1eUNhcmQgPSB0cnVlO1xuICBwdWJsaWMgc2hvd1BsYW5DYXJkID0gZmFsc2U7XG5cbiAgcHVibGljIHNlbGVjdGVkVmFsdWU6IG51bWJlcjtcbiAgcHVibGljIHNlbGVjdGVkUGxhbjogUGxhbjtcbiAgcHVibGljIHZhbHVlT2sgPSBmYWxzZTtcbiAgcHVibGljIHBsYW5PayA9IGZhbHNlO1xuXG4gIHB1YmxpYyBteUhvbGRlck51bWJlcjogc3RyaW5nO1xuXG4gIHB1YmxpYyBpc0xvYWRpbmcgPSBmYWxzZTtcbiAgcHVibGljIHRyYW5zYWN0aW9uRmluaXNoID0gZmFsc2U7XG4gIHB1YmxpYyB0cmFuc2FjdGlvblN1Y2Nlc3MgPSBmYWxzZTtcbiAgcHVibGljIGVycm9yTWVzc2FnZTogc3RyaW5nO1xuICBwdWJsaWMgZGVwb3NpdDogRGVwb3NpdDtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIHBhZ2U6IFBhZ2UsXG4gICAgcHJpdmF0ZSBhY2NvdW50U2VydmljZTogQWNjb3VudFNlcnZpY2UsXG4gICAgcHJpdmF0ZSB0cmFuc2FjdGlvblNlcnZpY2U6IFRyYW5zYWN0aW9uU2VydmljZSxcbiAgICBwcml2YXRlIHRvYXN0SGVscGVyOiBUb2FzdEhlbHBlclNlcnZpY2VcbiAgKSB7fVxuXG4gIHB1YmxpYyBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLmRlcG9zaXQgPSBuZXcgRGVwb3NpdCgpO1xuICAgIHRoaXMuYWNjb3VudFNlcnZpY2UudXNlckRhdGEkLnN1YnNjcmliZSgodXNlcjogVXNlckRhdGEpID0+IHtcbiAgICAgIHRoaXMubXlIb2xkZXJOdW1iZXIgPSB1c2VyLnBob25lc1swXS5udW1iZXI7XG4gICAgfSk7XG4gICAgdGhpcy5hY3R1YWxQb3NpdGlvbiA9IFBvc2l0aW9uQ2hldnJvbi5DTE9TRTtcbiAgICB0aGlzLnNlbGVjdGVkUGxhbiA9IG5ldyBQbGFuKCk7XG4gICAgdGhpcy5zZWxlY3RlZFBsYW4ubmFtZSA9ICdQcmVwYWlkJztcbiAgfVxuXG4gIHB1YmxpYyBmaW5hbGl6ZVRyYXNhY3Rpb24oYnRuSWQ6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMuaXNMb2FkaW5nID0gdHJ1ZTtcbiAgICBjb25zdCB2aWV3OiBCdXR0b24gPSB0aGlzLnBhZ2UuZ2V0Vmlld0J5SWQoYnRuSWQpO1xuICAgIHZpZXcuYW5pbWF0ZSh7IGJhY2tncm91bmRDb2xvcjogbmV3IENvbG9yKCcjZmY3N2E5JyksIGR1cmF0aW9uOiAyMDAgfSkudGhlbigoKSA9PiB7XG4gICAgICB2aWV3LmFuaW1hdGUoeyBiYWNrZ3JvdW5kQ29sb3I6IG5ldyBDb2xvcignI2VjNDA3YScpLCBkdXJhdGlvbjogMjAwIH0pO1xuICAgIH0pO1xuXG4gICAgdGhpcy5kZXBvc2l0LmFtb3VudCA9IHRoaXMuc2VsZWN0ZWRWYWx1ZTtcbiAgICB0aGlzLmRlcG9zaXQuY3VycmVuY3kgPSAnQlJMJztcbiAgICB0aGlzLmRlcG9zaXQuZGF0ZSA9IG1vbWVudChuZXcgRGF0ZSgpKS5mb3JtYXQoJ1lZWVktTU0tREQgSEg6bW06c3MnKTtcbiAgICB0aGlzLmRlcG9zaXQuaG9sZGVyQWNjb3VudC5udW1iZXIgPSB0aGlzLm15SG9sZGVyTnVtYmVyO1xuXG4gICAgdGhpcy50cmFuc2FjdGlvblNlcnZpY2UuZXhlY3V0ZURlcG9zaXQodGhpcy5kZXBvc2l0KS5zdWJzY3JpYmUocmVzID0+IHtcbiAgICAgIHRoaXMuaXNMb2FkaW5nID0gZmFsc2U7XG4gICAgICB0aGlzLnRyYW5zYWN0aW9uRmluaXNoID0gdHJ1ZTtcbiAgICAgIHRoaXMudHJhbnNhY3Rpb25TdWNjZXNzID0gcmVzLnN1Y2Nlc3M7XG4gICAgICBpZiAoIXRoaXMudHJhbnNhY3Rpb25TdWNjZXNzKSB7XG4gICAgICAgIHRoaXMuZXJyb3JNZXNzYWdlID0gcmVzLmVycm9yc1swXS5tZXNzYWdlO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcHVibGljIG5ld1RyYW5zYWN0aW9uKCk6IHZvaWQge1xuICAgIHRoaXMudHJhbnNhY3Rpb25GaW5pc2ggPSBmYWxzZTtcbiAgfVxuXG4gIHB1YmxpYyBzZXRWYWx1ZSgpIHtcbiAgICBpZiAoIXRoaXMuc2VsZWN0ZWRWYWx1ZSkge1xuICAgICAgdGhpcy50b2FzdEhlbHBlci5zaG93VG9hc3QoJ0luZm9ybWUgbyB2YWxvciBkYSBjb21wcmEnKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy52YWx1ZU9rID0gdHJ1ZTtcbiAgICB0aGlzLnNob3dCdXlDYXJkID0gZmFsc2U7XG4gICAgdGhpcy5zaG93UGxhbkNhcmQgPSB0cnVlO1xuICB9XG5cbiAgcHVibGljIHNldFBsYW4ocGxhbjogc3RyaW5nLCBpbnN0YWxsbWVudCA9IDApIHtcbiAgICB0aGlzLnNlbGVjdGVkUGxhbi5uYW1lID0gcGxhbjtcbiAgICB0aGlzLnNlbGVjdGVkUGxhbi5pbnN0YWxsbWVudHMgPSBpbnN0YWxsbWVudDtcbiAgICB0aGlzLnBsYW5PayA9IHRydWU7XG4gICAgdGhpcy5zaG93QnV5Q2FyZCA9IGZhbHNlO1xuICB9XG5cbiAgcHVibGljIGNhcmRDbGljayhpZDogc3RyaW5nKTogdm9pZCB7XG4gICAgY29uc3QgdmlldzogU3RhY2tMYXlvdXQgPSB0aGlzLnBhZ2UuZ2V0Vmlld0J5SWQoaWQpO1xuXG4gICAgdGhpcy5zZXRDYXJkRXhpYml0aW9uKHZpZXcsIGlkKTtcbiAgfVxuXG4gIHB1YmxpYyBwb3NQYWdDbGljayhldmVudDogYW55LCBpbWFnZVZpZXdJZDogc3RyaW5nKSB7XG4gICAgY29uc3QgdmlldyA9IGV2ZW50LnZpZXcuZ2V0Vmlld0J5SWQoaW1hZ2VWaWV3SWQpO1xuICAgIHRoaXMuZXhlY3V0ZUFuaW1hdGlvbih2aWV3KTtcbiAgICB0aGlzLnNob3dJbnN0YWxsbWVudEZpZWxkID0gIXRoaXMuc2hvd0luc3RhbGxtZW50RmllbGQ7XG4gIH1cblxuICBwdWJsaWMgcmVlbnRlclZhbHVlKCk6IHZvaWQge1xuICAgIHRoaXMuc2VsZWN0ZWRWYWx1ZSA9IG51bGw7XG4gICAgdGhpcy5zaG93QnV5Q2FyZCA9IHRydWU7XG4gICAgdGhpcy52YWx1ZU9rID0gZmFsc2U7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBjb25zdCB2aWV3OiBTdGFja0xheW91dCA9IHRoaXMucGFnZS5nZXRWaWV3QnlJZCgnYnV5Q2FyZCcpO1xuICAgICAgdmlldy5zdHlsZS5iYWNrZ3JvdW5kID0gJyNmZmZmZmYnO1xuICAgIH0sIDEwMCk7XG4gIH1cblxuICBwdWJsaWMgcmVlbnRlclBsYW4oKTogdm9pZCB7XG4gICAgdGhpcy5zZWxlY3RlZFBsYW4gPSBuZXcgUGxhbigpO1xuICAgIHRoaXMuc2hvd1BsYW5DYXJkID0gdHJ1ZTtcbiAgICB0aGlzLnBsYW5PayA9IGZhbHNlO1xuXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBjb25zdCB2aWV3OiBTdGFja0xheW91dCA9IHRoaXMucGFnZS5nZXRWaWV3QnlJZCgncGxhbkNhcmQnKTtcbiAgICAgIHZpZXcuc3R5bGUuYmFja2dyb3VuZCA9ICcjZmZmZmZmJztcbiAgICB9LCAxMDApO1xuICB9XG5cbiAgcHJpdmF0ZSBleGVjdXRlQW5pbWF0aW9uKHZpZXc6IFZpZXcpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5hY3R1YWxQb3NpdGlvbiA9PT0gUG9zaXRpb25DaGV2cm9uLkNMT1NFKSB7XG4gICAgICB0aGlzLmFjdHVhbFBvc2l0aW9uID0gUG9zaXRpb25DaGV2cm9uLk9QRU47XG4gICAgICB2aWV3LmFuaW1hdGUoeyByb3RhdGU6IFBvc2l0aW9uQ2hldnJvbi5PUEVOLCBkdXJhdGlvbjogMjAwIH0pO1xuICAgIH0gZWxzZSBpZiAodGhpcy5hY3R1YWxQb3NpdGlvbiA9PT0gUG9zaXRpb25DaGV2cm9uLk9QRU4pIHtcbiAgICAgIHRoaXMuYWN0dWFsUG9zaXRpb24gPSBQb3NpdGlvbkNoZXZyb24uQ0xPU0U7XG4gICAgICB2aWV3LmFuaW1hdGUoeyByb3RhdGU6IFBvc2l0aW9uQ2hldnJvbi5DTE9TRSwgZHVyYXRpb246IDIwMCB9KTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHNldENhcmRFeGliaXRpb24odmlld1RvQW5pbWF0ZSwgaWQ6IHN0cmluZyk6IHZvaWQge1xuICAgIGNvbnN0IGJ1eUNhcmRWaWV3OiBTdGFja0xheW91dCA9IHRoaXMucGFnZS5nZXRWaWV3QnlJZCgnYnV5Q2FyZCcpO1xuICAgIGNvbnN0IGFjY291bnRDYXJkVmlldzogU3RhY2tMYXlvdXQgPSB0aGlzLnBhZ2UuZ2V0Vmlld0J5SWQoJ2FjY291bnRDYXJkJyk7XG4gICAgY29uc3QgcGxhbkNhcmRWaWV3OiBTdGFja0xheW91dCA9IHRoaXMucGFnZS5nZXRWaWV3QnlJZCgncGxhbkNhcmQnKTtcblxuICAgIHN3aXRjaCAoaWQpIHtcbiAgICAgIGNhc2UgJ2J1eUNhcmQnOlxuICAgICAgICBpZiAoIXRoaXMuc2hvd0J1eUNhcmQpIHtcbiAgICAgICAgICB0aGlzLnNob3dCdXlDYXJkID0gdHJ1ZTtcbiAgICAgICAgICB0aGlzLnNob3dQbGFuQ2FyZCA9IGZhbHNlO1xuICAgICAgICAgIHRoaXMuZXhjdXRlQW5pbWF0aW9uT2ZDYXJkcyh2aWV3VG9BbmltYXRlKTtcbiAgICAgICAgICBpZiAoYWNjb3VudENhcmRWaWV3ICYmIHBsYW5DYXJkVmlldykge1xuICAgICAgICAgICAgYWNjb3VudENhcmRWaWV3LmFuaW1hdGUoeyBiYWNrZ3JvdW5kQ29sb3I6IG5ldyBDb2xvcignIzVjNjA1YycpLCBkdXJhdGlvbjogMTAwIH0pO1xuICAgICAgICAgICAgcGxhbkNhcmRWaWV3LmFuaW1hdGUoeyBiYWNrZ3JvdW5kQ29sb3I6IG5ldyBDb2xvcignIzVjNjA1YycpLCBkdXJhdGlvbjogMTAwIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAncGxhbkNhcmQnOlxuICAgICAgICBpZiAoIXRoaXMuc2hvd1BsYW5DYXJkKSB7XG4gICAgICAgICAgdGhpcy5zaG93UGxhbkNhcmQgPSAhdGhpcy5zaG93UGxhbkNhcmQ7XG4gICAgICAgICAgdGhpcy5zaG93QnV5Q2FyZCA9IGZhbHNlO1xuICAgICAgICAgIHRoaXMuZXhjdXRlQW5pbWF0aW9uT2ZDYXJkcyh2aWV3VG9BbmltYXRlKTtcbiAgICAgICAgICBpZiAoYnV5Q2FyZFZpZXcgJiYgYWNjb3VudENhcmRWaWV3KSB7XG4gICAgICAgICAgICBhY2NvdW50Q2FyZFZpZXcuYW5pbWF0ZSh7IGJhY2tncm91bmRDb2xvcjogbmV3IENvbG9yKCcjNWM2MDVjJyksIGR1cmF0aW9uOiAxMDAgfSk7XG4gICAgICAgICAgICBidXlDYXJkVmlldy5hbmltYXRlKHsgYmFja2dyb3VuZENvbG9yOiBuZXcgQ29sb3IoJyM1YzYwNWMnKSwgZHVyYXRpb246IDEwMCB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBicmVhaztcblxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBleGN1dGVBbmltYXRpb25PZkNhcmRzKHZpZXdUb0FuaW1hdGU6IFZpZXcpOiB2b2lkIHtcbiAgICB2aWV3VG9BbmltYXRlLmFuaW1hdGUoeyBiYWNrZ3JvdW5kQ29sb3I6IG5ldyBDb2xvcignI2ZmZmZmZicpLCBkdXJhdGlvbjogMTAwIH0pO1xuICB9XG59XG4iXX0=