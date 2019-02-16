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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlZGl0LXBhZ2UuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY3JlZGl0LXBhZ2UuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQWtEO0FBQ2xELDBDQUErQztBQUMvQyx3RUFBcUU7QUFDckUsd0VBQXVFO0FBQ3ZFLGdEQUErQztBQUMvQyxtREFBd0Q7QUFDeEQsa0VBQWdFO0FBQ2hFLHNEQUFxRDtBQUNyRCxzREFBMkQ7QUFFM0QsMENBQXlDO0FBR3pDLGlFQUFnRTtBQUNoRSwrQkFBaUM7QUFTakM7SUEwQkUsNkJBQ1UsSUFBVSxFQUNWLGNBQThCLEVBQzlCLGtCQUFzQyxFQUN0QyxXQUErQjtRQUgvQixTQUFJLEdBQUosSUFBSSxDQUFNO1FBQ1YsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBQzlCLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBb0I7UUFDdEMsZ0JBQVcsR0FBWCxXQUFXLENBQW9CO1FBN0JsQyxjQUFTLEdBQWdCO1lBQzlCLFNBQVMsRUFBRSxDQUFDO1lBQ1osT0FBTyxFQUFFLFNBQVM7WUFDbEIsS0FBSyxFQUFFLGtDQUFTLENBQUMsU0FBUztZQUMxQixZQUFZLEVBQUUsQ0FBQztTQUNoQixDQUFDO1FBQ0ssZ0JBQVcsR0FBRyxzQ0FBc0MsQ0FBQztRQUVyRCx5QkFBb0IsR0FBRyxLQUFLLENBQUM7UUFDN0IsZ0JBQVcsR0FBRyxJQUFJLENBQUM7UUFDbkIsaUJBQVksR0FBRyxLQUFLLENBQUM7UUFJckIsWUFBTyxHQUFHLEtBQUssQ0FBQztRQUNoQixXQUFNLEdBQUcsS0FBSyxDQUFDO1FBSWYsY0FBUyxHQUFHLEtBQUssQ0FBQztRQUNsQixzQkFBaUIsR0FBRyxLQUFLLENBQUM7UUFDMUIsdUJBQWtCLEdBQUcsS0FBSyxDQUFDO0lBUy9CLENBQUM7SUFFRyxzQ0FBUSxHQUFmO1FBQUEsaUJBUUM7UUFQQyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksaUJBQU8sRUFBRSxD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QUMsU0FBUyxDQUFDLEVBQUUsUUFBUSxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUM7SUFDbEYsQ0FBQztJQXZLVSxtQkFBbUI7UUFQL0IsZ0JBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixRQUFRLEVBQUUsWUFBWTtZQUN0QixXQUFXLEVBQUUsOEJBQThCO1lBQzNDLFNBQVMsRUFBRSxDQUFDLDZCQUE2QixDQUFDO1lBQzFDLFNBQVMsRUFBRSxDQUFDLHFCQUFZLENBQUM7U0FDMUIsQ0FBQzt5Q0E0QmdCLFdBQUk7WUFDTSxnQ0FBYztZQUNWLHVDQUFrQjtZQUN6Qix5Q0FBa0I7T0E5QjlCLG1CQUFtQixDQXdLL0I7SUFBRCwwQkFBQztDQUFBLEFBeEtELElBd0tDO0FBeEtZLGtEQUFtQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDdXJyZW5jeVBpcGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgVG9hc3RIZWxwZXJTZXJ2aWNlIH0gZnJvbSAnfi9hcHAvY29yZS90b2FzdC1oZWxwZXIuc2VydmljZSc7XG5pbXBvcnQgeyBUcmFuc2FjdGlvblNlcnZpY2UgfSBmcm9tICd+L2FwcC9zZXJ2aWNlcy90cmFzYWN0aW9uLnNlcnZpY2UnO1xuaW1wb3J0IHsgRGVwb3NpdCB9IGZyb20gJ34vYXBwL21vZGVscy9kZXBvc2l0JztcbmltcG9ydCB7IFBvc2l0aW9uQ2hldnJvbiB9IGZyb20gJ34vYXBwL3V0aWxzL3ZhcmlhYmxlcyc7XG5pbXBvcnQgeyBBY2NvdW50U2VydmljZSB9IGZyb20gJ34vYXBwL3NlcnZpY2VzL2FjY291bnQuc2VydmljZSc7XG5pbXBvcnQgeyBDb2xvciB9IGZyb20gJ3Rucy1jb3JlLW1vZHVsZXMvY29sb3IvY29sb3InO1xuaW1wb3J0IHsgVmlldywgUGFnZSB9IGZyb20gJ3Rucy1jb3JlLW1vZHVsZXMvdWkvcGFnZS9wYWdlJztcbmltcG9ydCB7IFN0YWNrTGF5b3V0IH0gZnJvbSAndG5zLWNvcmUtbW9kdWxlcy91aS9sYXlvdXRzL3N0YWNrLWxheW91dC9zdGFjay1sYXlvdXQnO1xuaW1wb3J0IHsgUGxhbiB9IGZyb20gJ34vYXBwL21vZGVscy9wbGFuJztcbmltcG9ydCB7IEJ1dHRvbiB9IGZyb20gJ3Rucy1jb3JlLW1vZHVsZXMvdWkvYnV0dG9uL2J1dHRvbic7XG5pbXBvcnQgeyBVc2VyRGF0YSB9IGZyb20gJ34vYXBwL21vZGVscy91c2VyLWRhdGEnO1xuaW1wb3J0IHsgU2hhcGVFbnVtLCBBbmRyb2lkRGF0YSB9IGZyb20gJ25hdGl2ZXNjcmlwdC1uZy1zaGFkb3cnO1xuaW1wb3J0ICogYXMgbW9tZW50IGZyb20gJ21vbWVudCc7XG5cbkBDb21wb25lbnQoe1xuICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICBzZWxlY3RvcjogJ0NyZWRpdFBhZ2UnLFxuICB0ZW1wbGF0ZVVybDogJy4vY3JlZGl0LXBhZ2UuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9jcmVkaXQtcGFnZS5jb21wb25lbnQuY3NzJ10sXG4gIHByb3ZpZGVyczogW0N1cnJlbmN5UGlwZV1cbn0pXG5leHBvcnQgY2xhc3MgQ3JlZGl0UGFnZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIHB1YmxpYyBidG5TaGFkb3c6IEFuZHJvaWREYXRhID0ge1xuICAgIGVsZXZhdGlvbjogMixcbiAgICBiZ2NvbG9yOiAnI0VDNDA3QScsXG4gICAgc2hhcGU6IFNoYXBlRW51bS5SRUNUQU5HTEUsXG4gICAgY29ybmVyUmFkaXVzOiA4XG4gIH07XG4gIHB1YmxpYyBtZW51Q2hldnJvbiA9ICdyZXM6Ly9iYXNlbGluZV9jaGV2cm9uX2xlZnRfYmxhY2tfMjQnO1xuICBwdWJsaWMgYWN0dWFsUG9zaXRpb246IFBvc2l0aW9uQ2hldnJvbjtcbiAgcHVibGljIHNob3dJbnN0YWxsbWVudEZpZWxkID0gZmFsc2U7XG4gIHB1YmxpYyBzaG93QnV5Q2FyZCA9IHRydWU7XG4gIHB1YmxpYyBzaG93UGxhbkNhcmQgPSBmYWxzZTtcblxuICBwdWJsaWMgc2VsZWN0ZWRWYWx1ZTogbnVtYmVyO1xuICBwdWJsaWMgc2VsZWN0ZWRQbGFuOiBQbGFuO1xuICBwdWJsaWMgdmFsdWVPayA9IGZhbHNlO1xuICBwdWJsaWMgcGxhbk9rID0gZmFsc2U7XG5cbiAgcHVibGljIG15SG9sZGVyTnVtYmVyOiBzdHJpbmc7XG5cbiAgcHVibGljIGlzTG9hZGluZyA9IGZhbHNlO1xuICBwdWJsaWMgdHJhbnNhY3Rpb25GaW5pc2ggPSBmYWxzZTtcbiAgcHVibGljIHRyYW5zYWN0aW9uU3VjY2VzcyA9IGZhbHNlO1xuICBwdWJsaWMgZXJyb3JNZXNzYWdlOiBzdHJpbmc7XG4gIHB1YmxpYyBkZXBvc2l0OiBEZXBvc2l0O1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgcGFnZTogUGFnZSxcbiAgICBwcml2YXRlIGFjY291bnRTZXJ2aWNlOiBBY2NvdW50U2VydmljZSxcbiAgICBwcml2YXRlIHRyYW5zYWN0aW9uU2VydmljZTogVHJhbnNhY3Rpb25TZXJ2aWNlLFxuICAgIHByaXZhdGUgdG9hc3RIZWxwZXI6IFRvYXN0SGVscGVyU2VydmljZVxuICApIHt9XG5cbiAgcHVibGljIG5nT25Jbml0KCkge1xuICAgIHRoaXMuZGVwb3NpdCA9IG5ldyBEZXBvc2l0KCk7XG4gICAgdGhpcy5hY2NvdW50U2VydmljZS51c2VyRGF0YSQuc3Vic2NyaWJlKCh1c2VyOiBVc2VyRGF0YSkgPT4ge1xuICAgICAgdGhpcy5teUhvbGRlck51bWJlciA9IHVzZXIucGhvbmVzWzBdLm51bWJlcjtcbiAgICB9KTtcbiAgICB0aGlzLmFjdHVhbFBvc2l0aW9uID0gUG9zaXRpb25DaGV2cm9uLkNMT1NFO1xuICAgIHRoaXMuc2VsZWN0ZWRQbGFuID0gbmV3IFBsYW4oKTtcbiAgICB0aGlzLnNlbGVjdGVkUGxhbi5uYW1lID0gJ1ByZXBhaWQnO1xuICB9XG5cbiAgcHVibGljIGZpbmFsaXplVHJhc2FjdGlvbihidG5JZDogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5pc0xvYWRpbmcgPSB0cnVlO1xuICAgIGNvbnN0IHZpZXc6IEJ1dHRvbiA9IHRoaXMucGFnZS5nZXRWaWV3QnlJZChidG5JZCk7XG4gICAgdmlldy5hbmltYXRlKHsgYmFja2dyb3VuZENvbG9yOiBuZXcgQ29sb3IoJyNmZjc3YTknKSwgZHVyYXRpb246IDIwMCB9KS50aGVuKCgpID0+IHtcbiAgICAgIHZpZXcuYW5pbWF0ZSh7IGJhY2tncm91bmRDb2xvcjogbmV3IENvbG9yKCcjZWM0MDdhJyksIGR1cmF0aW9uOiAyMDAgfSk7XG4gICAgfSk7XG5cbiAgICB0aGlzLmRlcG9zaXQuYW1vdW50ID0gdGhpcy5zZWxlY3RlZFZhbHVlO1xuICAgIHRoaXMuZGVwb3NpdC5jdXJyZW5jeSA9ICdCUkwnO1xuICAgIHRoaXMuZGVwb3NpdC5kYXRlID0gbW9tZW50KG5ldyBEYXRlKCkpLmZvcm1hdCgnWVlZWS1NTS1ERCBISDptbTpzcycpO1xuICAgIHRoaXMuZGVwb3NpdC5ob2xkZXJBY2NvdW50Lm51bWJlciA9IHRoaXMubXlIb2xkZXJOdW1iZXI7XG5cbiAgICB0aGlzLnRyYW5zYWN0aW9uU2VydmljZS5leGVjdXRlRGVwb3NpdCh0aGlzLmRlcG9zaXQpLnN1YnNjcmliZShyZXMgPT4ge1xuICAgICAgdGhpcy5pc0xvYWRpbmcgPSBmYWxzZTtcbiAgICAgIHRoaXMudHJhbnNhY3Rpb25GaW5pc2ggPSB0cnVlO1xuICAgICAgdGhpcy50cmFuc2FjdGlvblN1Y2Nlc3MgPSByZXMuc3VjY2VzcztcbiAgICAgIGlmICghdGhpcy50cmFuc2FjdGlvblN1Y2Nlc3MpIHtcbiAgICAgICAgdGhpcy5lcnJvck1lc3NhZ2UgPSByZXMuZXJyb3JzWzBdLm1lc3NhZ2U7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgbmV3VHJhbnNhY3Rpb24oKTogdm9pZCB7XG4gICAgdGhpcy50cmFuc2FjdGlvbkZpbmlzaCA9IGZhbHNlO1xuICB9XG5cbiAgcHVibGljIHNldFZhbHVlKCkge1xuICAgIGlmICghdGhpcy5zZWxlY3RlZFZhbHVlKSB7XG4gICAgICB0aGlzLnRvYXN0SGVscGVyLnNob3dUb2FzdCgnSW5mb3JtZSBvIHZhbG9yIGRhIGNvbXByYScpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLnZhbHVlT2sgPSB0cnVlO1xuICAgIHRoaXMuc2hvd0J1eUNhcmQgPSBmYWxzZTtcbiAgICB0aGlzLnNob3dQbGFuQ2FyZCA9IHRydWU7XG4gIH1cblxuICBwdWJsaWMgc2V0UGxhbihwbGFuOiBzdHJpbmcsIGluc3RhbGxtZW50ID0gMCkge1xuICAgIHRoaXMuc2VsZWN0ZWRQbGFuLm5hbWUgPSBwbGFuO1xuICAgIHRoaXMuc2VsZWN0ZWRQbGFuLmluc3RhbGxtZW50cyA9IGluc3RhbGxtZW50O1xuICAgIHRoaXMucGxhbk9rID0gdHJ1ZTtcbiAgICB0aGlzLnNob3dCdXlDYXJkID0gZmFsc2U7XG4gIH1cblxuICBwdWJsaWMgY2FyZENsaWNrKGlkOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBjb25zdCB2aWV3OiBTdGFja0xheW91dCA9IHRoaXMucGFnZS5nZXRWaWV3QnlJZChpZCk7XG5cbiAgICB0aGlzLnNldENhcmRFeGliaXRpb24odmlldywgaWQpO1xuICB9XG5cbiAgcHVibGljIHBvc1BhZ0NsaWNrKGV2ZW50OiBhbnksIGltYWdlVmlld0lkOiBzdHJpbmcpIHtcbiAgICBjb25zdCB2aWV3ID0gZXZlbnQudmlldy5nZXRWaWV3QnlJZChpbWFnZVZpZXdJZCk7XG4gICAgdGhpcy5leGVjdXRlQW5pbWF0aW9uKHZpZXcpO1xuICAgIHRoaXMuc2hvd0luc3RhbGxtZW50RmllbGQgPSAhdGhpcy5zaG93SW5zdGFsbG1lbnRGaWVsZDtcbiAgfVxuXG4gIHB1YmxpYyByZWVudGVyVmFsdWUoKTogdm9pZCB7XG4gICAgdGhpcy5zZWxlY3RlZFZhbHVlID0gbnVsbDtcbiAgICB0aGlzLnNob3dCdXlDYXJkID0gdHJ1ZTtcbiAgICB0aGlzLnZhbHVlT2sgPSBmYWxzZTtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIGNvbnN0IHZpZXc6IFN0YWNrTGF5b3V0ID0gdGhpcy5wYWdlLmdldFZpZXdCeUlkKCdidXlDYXJkJyk7XG4gICAgICB2aWV3LnN0eWxlLmJhY2tncm91bmQgPSAnI2ZmZmZmZic7XG4gICAgfSwgMTAwKTtcbiAgfVxuXG4gIHB1YmxpYyByZWVudGVyUGxhbigpOiB2b2lkIHtcbiAgICB0aGlzLnNlbGVjdGVkUGxhbiA9IG5ldyBQbGFuKCk7XG4gICAgdGhpcy5zaG93UGxhbkNhcmQgPSB0cnVlO1xuICAgIHRoaXMucGxhbk9rID0gZmFsc2U7XG5cbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIGNvbnN0IHZpZXc6IFN0YWNrTGF5b3V0ID0gdGhpcy5wYWdlLmdldFZpZXdCeUlkKCdwbGFuQ2FyZCcpO1xuICAgICAgdmlldy5zdHlsZS5iYWNrZ3JvdW5kID0gJyNmZmZmZmYnO1xuICAgIH0sIDEwMCk7XG4gIH1cblxuICBwcml2YXRlIGV4ZWN1dGVBbmltYXRpb24odmlldzogVmlldyk6IHZvaWQge1xuICAgIGlmICh0aGlzLmFjdHVhbFBvc2l0aW9uID09PSBQb3NpdGlvbkNoZXZyb24uQ0xPU0UpIHtcbiAgICAgIHRoaXMuYWN0dWFsUG9zaXRpb24gPSBQb3NpdGlvbkNoZXZyb24uT1BFTjtcbiAgICAgIHZpZXcuYW5pbWF0ZSh7IHJvdGF0ZTogUG9zaXRpb25DaGV2cm9uLk9QRU4sIGR1cmF0aW9uOiAyMDAgfSk7XG4gICAgfSBlbHNlIGlmICh0aGlzLmFjdHVhbFBvc2l0aW9uID09PSBQb3NpdGlvbkNoZXZyb24uT1BFTikge1xuICAgICAgdGhpcy5hY3R1YWxQb3NpdGlvbiA9IFBvc2l0aW9uQ2hldnJvbi5DTE9TRTtcbiAgICAgIHZpZXcuYW5pbWF0ZSh7IHJvdGF0ZTogUG9zaXRpb25DaGV2cm9uLkNMT1NFLCBkdXJhdGlvbjogMjAwIH0pO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgc2V0Q2FyZEV4aWJpdGlvbih2aWV3VG9BbmltYXRlLCBpZDogc3RyaW5nKTogdm9pZCB7XG4gICAgY29uc3QgYnV5Q2FyZFZpZXc6IFN0YWNrTGF5b3V0ID0gdGhpcy5wYWdlLmdldFZpZXdCeUlkKCdidXlDYXJkJyk7XG4gICAgY29uc3QgYWNjb3VudENhcmRWaWV3OiBTdGFja0xheW91dCA9IHRoaXMucGFnZS5nZXRWaWV3QnlJZCgnYWNjb3VudENhcmQnKTtcbiAgICBjb25zdCBwbGFuQ2FyZFZpZXc6IFN0YWNrTGF5b3V0ID0gdGhpcy5wYWdlLmdldFZpZXdCeUlkKCdwbGFuQ2FyZCcpO1xuXG4gICAgc3dpdGNoIChpZCkge1xuICAgICAgY2FzZSAnYnV5Q2FyZCc6XG4gICAgICAgIGlmICghdGhpcy5zaG93QnV5Q2FyZCkge1xuICAgICAgICAgIHRoaXMuc2hvd0J1eUNhcmQgPSB0cnVlO1xuICAgICAgICAgIHRoaXMuc2hvd1BsYW5DYXJkID0gZmFsc2U7XG4gICAgICAgICAgdGhpcy5leGN1dGVBbmltYXRpb25PZkNhcmRzKHZpZXdUb0FuaW1hdGUpO1xuICAgICAgICAgIGlmIChhY2NvdW50Q2FyZFZpZXcgJiYgcGxhbkNhcmRWaWV3KSB7XG4gICAgICAgICAgICBhY2NvdW50Q2FyZFZpZXcuYW5pbWF0ZSh7IGJhY2tncm91bmRDb2xvcjogbmV3IENvbG9yKCcjNWM2MDVjJyksIGR1cmF0aW9uOiAxMDAgfSk7XG4gICAgICAgICAgICBwbGFuQ2FyZFZpZXcuYW5pbWF0ZSh7IGJhY2tncm91bmRDb2xvcjogbmV3IENvbG9yKCcjNWM2MDVjJyksIGR1cmF0aW9uOiAxMDAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdwbGFuQ2FyZCc6XG4gICAgICAgIGlmICghdGhpcy5zaG93UGxhbkNhcmQpIHtcbiAgICAgICAgICB0aGlzLnNob3dQbGFuQ2FyZCA9ICF0aGlzLnNob3dQbGFuQ2FyZDtcbiAgICAgICAgICB0aGlzLnNob3dCdXlDYXJkID0gZmFsc2U7XG4gICAgICAgICAgdGhpcy5leGN1dGVBbmltYXRpb25PZkNhcmRzKHZpZXdUb0FuaW1hdGUpO1xuICAgICAgICAgIGlmIChidXlDYXJkVmlldyAmJiBhY2NvdW50Q2FyZFZpZXcpIHtcbiAgICAgICAgICAgIGFjY291bnRDYXJkVmlldy5hbmltYXRlKHsgYmFja2dyb3VuZENvbG9yOiBuZXcgQ29sb3IoJyM1YzYwNWMnKSwgZHVyYXRpb246IDEwMCB9KTtcbiAgICAgICAgICAgIGJ1eUNhcmRWaWV3LmFuaW1hdGUoeyBiYWNrZ3JvdW5kQ29sb3I6IG5ldyBDb2xvcignIzVjNjA1YycpLCBkdXJhdGlvbjogMTAwIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBkZWZhdWx0OlxuICAgICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGV4Y3V0ZUFuaW1hdGlvbk9mQ2FyZHModmlld1RvQW5pbWF0ZTogVmlldyk6IHZvaWQge1xuICAgIHZpZXdUb0FuaW1hdGUuYW5pbWF0ZSh7IGJhY2tncm91bmRDb2xvcjogbmV3IENvbG9yKCcjZmZmZmZmJyksIGR1cmF0aW9uOiAxMDAgfSk7XG4gIH1cbn1cbiJdfQ==