"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var variables_1 = require("~/app/utils/variables");
var nativescript_ng_shadow_1 = require("nativescript-ng-shadow");
var toast_helper_service_1 = require("~/app/core/toast-helper.service");
var nativescript_document_mask_component_1 = require("~/app/components/nativescript-document-mask/nativescript-document-mask.component");
var account_service_1 = require("~/app/services/account.service");
var router_1 = require("nativescript-angular/router");
var NewAccountComponent = /** @class */ (function () {
    function NewAccountComponent(toast, accountService, router) {
        this.toast = toast;
        this.accountService = accountService;
        this.router = router;
        this.btnShadow = {
            elevation: 2,
            bgcolor: '#EC407A',
            shape: nativescript_ng_shadow_1.ShapeEnum.RECTANGLE,
            cornerRadius: 8
        };
        this.showOperatorList = false;
        this.showDocument = false;
        this.selectDocument = 'SELECIONAR TIPO DOCUMENTO';
        this.selectedOperator = 'SELECIONAR OPERADORA';
        this.isSubmit = false;
        this.isLoading = false;
    }
    NewAccountComponent.prototype.ngOnInit = function () {
        this.enrollFormErrors = new EnrollErrorForm();
        this.positonChevronOperators = variables_1.PositionChevron.CLOSE;
        this.positonChevronDocument = variables_1.PositionChevron.CLOSE;
        this.mobileOperators = ['Claro', 'Oi', 'Tim', 'Vivo'];
    };
    NewAccountComponent.prototype.doEnroll = function () {
        var _this = this;
        this.isSubmit = true;
        this.isLoading = true;
        this.validateEnrollForm();
        if (!this.enrollFormErrors.valid) {
            this.isLoading = false;
            return;
        }
        var enroll = {
            document: {
                type: this.documentType.toUpperCase(),
                value: this.documentNumber
            },
            password: this.password,
            phone: {
                networkOperator: this.selectedOperator,
                number: '+55' + this.phoneNumber
            }
        };
        this.accountService.saveRegister(enroll).subscribe(function (res) {
            if (res.success) {
                _this.toast.showToast('Conta cadastrada com sucesso');
                _this.router.back();
                return;
            }
            _this.toast.showToast(res.errors[0].message);
        });
    };
    NewAccountComponent.prototype.showMobileOperatorList = function (event, viewId) {
        var view = event.view;
        this.positonChevronOperators = this.executeAnimation(view.getViewById(viewId), this.positonChevronOperators);
        this.showOperatorList = !this.showOperatorList;
    };
    NewAccountComponent.prototype.showDocumentList = function (event, viewId) {
        var view = event.view;
        this.positonChevronDocument = this.executeAnimation(view.getViewById(viewId), this.positonChevronDocument);
        this.showDocument = !this.showDocument;
    };
    NewAccountComponent.prototype.selectMobileOperator = function (event, selected) {
        var _this = this;
        var view = event.view;
        view.animate({ scale: { x: 1.2, y: 1.2 }, duration: 200 }).then(function () {
            view.animate({ scale: { x: 1, y: 1 }, duration: 200 });
            _this.selectedOperator = selected;
            _this.showOperatorList = false;
            _this.enrollFormErrors.operator.valid = true;
        });
    };
    NewAccountComponent.prototype.selectDocumentType = function (event, selected) {
        var _this = this;
        var view = event.view;
        this.documentNumber = '';
        view.animate({ scale: { x: 1.2, y: 1.2 }, duration: 200 }).then(function () {
            view.animate({ scale: { x: 1, y: 1 }, duration: 200 });
            _this.selectDocument = selected;
            _this.showDocument = false;
            _this.enrollFormErrors.documentType.valid = true;
            _this.documentType = selected.toLocaleLowerCase() === nativescript_document_mask_component_1.DocumentType.CPF ? nativescript_document_mask_component_1.DocumentType.CPF : nativescript_document_mask_component_1.DocumentType.CNPJ;
        });
    };
    NewAccountComponent.prototype.executeAnimation = function (view, actualPosition) {
        if (actualPosition === variables_1.PositionChevron.CLOSE) {
            actualPosition = variables_1.PositionChevron.OPEN;
            view.animate({ rotate: variables_1.PositionChevron.OPEN, duration: 200 });
        }
        else if (actualPosition === variables_1.PositionChevron.OPEN) {
            actualPosition = variables_1.PositionChevron.CLOSE;
            view.animate({ rotate: variables_1.PositionChevron.CLOSE, duration: 200 });
        }
        return actualPosition;
    };
    NewAccountComponent.prototype.validateEnrollForm = function () {
        this.enrollFormErrors.valid = true;
        this.enrollFormErrors.documentNumber.valid = true;
        this.enrollFormErrors.confirmPassword.valid = true;
        this.enrollFormErrors.password.valid = true;
        this.enrollFormErrors.phoneNumber.valid = true;
        if (this.selectDocument != 'CPF' && this.selectDocument != 'CNPJ') {
            this.enrollFormErrors.valid = false;
            this.enrollFormErrors.documentType.valid = false;
            this.enrollFormErrors.documentType.error = 'Selecione o tipo do documento';
        }
        if (!this.documentNumber) {
            this.enrollFormErrors.valid = false;
            this.enrollFormErrors.documentNumber.valid = false;
            this.enrollFormErrors.documentNumber.error = 'Digite o numero do documento';
        }
        if (this.mobileOperators.indexOf(this.selectedOperator) < 0) {
            this.enrollFormErrors.valid = false;
            this.enrollFormErrors.operator.valid = false;
            this.enrollFormErrors.documentType.error = 'Selecione a operadora';
        }
        if (!this.phoneNumber) {
            this.enrollFormErrors.valid = false;
            this.enrollFormErrors.phoneNumber.valid = false;
            this.enrollFormErrors.phoneNumber.error = 'Digite o número do telefone';
        }
        if (!this.password) {
            this.enrollFormErrors.valid = false;
            this.enrollFormErrors.password.valid = false;
            this.enrollFormErrors.password.error = 'Digite a senha';
        }
        if (!this.confirmPassword) {
            this.enrollFormErrors.valid = false;
            this.enrollFormErrors.confirmPassword.valid = false;
            this.enrollFormErrors.confirmPassword.error = 'Confirme a senha';
        }
        if (this.password && this.confirmPassword && this.confirmPassword !== this.password) {
            this.enrollFormErrors.valid = false;
            this.enrollFormErrors.confirmPassword.valid = false;
            this.enrollFormErrors.confirmPassword.error = 'Senha não combina com a informada acima.';
            this.toast.showToast('Senha não confere, a confirmação deve ser igual a senha digitada.');
        }
    };
    NewAccountComponent = __decorate([
        core_1.Component({
            selector: 'ns-new-account',
            templateUrl: './new-account.component.html',
            styleUrls: ['./new-account.component.css'],
            moduleId: module.id
        }),
        __metadata("design:paramtypes", [toast_helper_service_1.ToastHelperService,
            account_service_1.AccountService,
            router_1.RouterExtensions])
    ], NewAccountComponent);
    return NewAccountComponent;
}());
exports.NewAccountComponent = NewAccountComponent;
var EnrollErrorForm = /** @class */ (function () {
    function EnrollErrorForm() {
        this.password = new ErrorFormType();
        this.confirmPassword = new ErrorFormType();
        this.documentType = new ErrorFormType();
        this.documentNumber = new ErrorFormType();
        this.operator = new ErrorFormType();
        this.phoneNumber = new ErrorFormType();
    }
    return EnrollErrorForm;
}());
var ErrorFormType = /** @class */ (function () {
    function ErrorFormType() {
    }
    return ErrorFormType;
}());
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmV3LWFjY291bnQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibmV3LWFjY291bnQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQWtEO0FBQ2xELG1EQUF3RDtBQUV4RCxpRUFBZ0U7QUFDaEUsd0VBQXFFO0FBQ3JFLHlJQUFnSDtBQUVoSCxrRUFBZ0U7QUFDaEUsc0RBQStEO0FBUS9EO0lBMkJFLDZCQUNVLEtBQXlCLEVBQ3pCLGNBQThCLEVBQzlCLE1BQXdCO1FBRnhCLFVBQUssR0FBTCxLQUFLLENBQW9CO1FBQ3pCLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUM5QixXQUFNLEdBQU4sTUFBTSxDQUFrQjtRQTdCM0IsY0FBUyxHQUFnQjtZQUM5QixTQUFTLEVBQUUsQ0FBQztZQUNaLE9BQU8sRUFBRSxTQUFTO1lBQ2xCLEtBQUssRUFBRSxrQ0FBUyxDQUFDLFNBQVM7WUFDMUIsWUFBWSxFQUFFLENBQUM7U0FDaEIsQ0FBQztRQU1LLHFCQUFnQixHQUFHLEtBQUssQ0FBQztRQUN6QixpQkFBWSxHQUFHLEtBQUssQ0FBQztRQUNyQixtQkFBYyxHQUFHLDJCQUEyQixDQUFDO1FBQzdDLHFCQUFnQixHQUFHLHNCQUFzQixDQUFDO1FBTTFDLGFBQVEsR0FBRyxLQUFLLENBQUM7UUFDakIsY0FBUyxHQUFHLEtBQUssQ0FBQztJQVN0QixDQUFDO0lBRUcsc0NBQVEsR0FBZjtRQUNFLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLGVBQWUsRUFBRSxDQUFDO1FBQzlDLElBQUksQ0FBQyx1QkFBdUIsR0FBRywyQkFBZSxDQUFDLEtBQUssQ0FBQztRQUNyRCxJQUFJLENBQUMsc0JBQXNCLEdBQUcsMkJBQWUsQ0FBQyxLQUFLLENBQUM7UUFDcEQsSUFBSSxDQUFDLGVBQWUsR0FBRyxDQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQ3hELENBQUM7SUFFTSxz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YUFBYSxFQUFFLENBQUM7SUFDekMsQ0FBQztJQUNILHNCQUFDO0FBQUQsQ0FBQyxBQWpCRCxJQWlCQztBQUVEO0lBQUE7SUFHQSxDQUFDO0lBQUQsb0JBQUM7QUFBRCxDQUFDLEFBSEQsSUFHQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBQb3NpdGlvbkNoZXZyb24gfSBmcm9tICd+L2FwcC91dGlscy92YXJpYWJsZXMnO1xuaW1wb3J0IHsgVmlldyB9IGZyb20gJ3Rucy1jb3JlLW1vZHVsZXMvdWkvcGFnZS9wYWdlJztcbmltcG9ydCB7IFNoYXBlRW51bSwgQW5kcm9pZERhdGEgfSBmcm9tICduYXRpdmVzY3JpcHQtbmctc2hhZG93JztcbmltcG9ydCB7IFRvYXN0SGVscGVyU2VydmljZSB9IGZyb20gJ34vYXBwL2NvcmUvdG9hc3QtaGVscGVyLnNlcnZpY2UnO1xuaW1wb3J0IHsgRG9jdW1lbnRUeXBlIH0gZnJvbSAnfi9hcHAvY29tcG9uZW50cy9uYXRpdmVzY3JpcHQtZG9jdW1lbnQtbWFzay9uYXRpdmVzY3JpcHQtZG9jdW1lbnQtbWFzay5jb21wb25lbnQnO1xuaW1wb3J0IHsgRW5yb2xsIH0gZnJvbSAnfi9hcHAvbW9kZWxzL2Vucm9sbCc7XG5pbXBvcnQgeyBBY2NvdW50U2VydmljZSB9IGZyb20gJ34vYXBwL3NlcnZpY2VzL2FjY291bnQuc2VydmljZSc7XG5pbXBvcnQgeyBSb3V0ZXJFeHRlbnNpb25zIH0gZnJvbSAnbmF0aXZlc2NyaXB0LWFuZ3VsYXIvcm91dGVyJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbnMtbmV3LWFjY291bnQnLFxuICB0ZW1wbGF0ZVVybDogJy4vbmV3LWFjY291bnQuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9uZXctYWNjb3VudC5jb21wb25lbnQuY3NzJ10sXG4gIG1vZHVsZUlkOiBtb2R1bGUuaWRcbn0pXG5leHBvcnQgY2xhc3MgTmV3QWNjb3VudENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIHB1YmxpYyBidG5TaGFkb3c6IEFuZHJvaWREYXRhID0ge1xuICAgIGVsZXZhdGlvbjogMixcbiAgICBiZ2NvbG9yOiAnI0VDNDA3QScsXG4gICAgc2hhcGU6IFNoYXBlRW51bS5SRUNUQU5HTEUsXG4gICAgY29ybmVyUmFkaXVzOiA4XG4gIH07XG5cbiAgcHVibGljIG1vYmlsZU9wZXJhdG9yczogQXJyYXk8c3RyaW5nPjtcbiAgcHVibGljIHNlbGVjdGVkT3BlcmF0b3JJbmRleDogbnVtYmVyO1xuICBwdWJsaWMgcG9zaXRvbkNoZXZyb25PcGVyYXRvcnM6IFBvc2l0aW9uQ2hldnJvbjtcbiAgcHVibGljIHBvc2l0b25DaGV2cm9uRG9jdW1lbnQ6IFBvc2l0aW9uQ2hldnJvbjtcbiAgcHVibGljIHNob3dPcGVyYXRvckxpc3QgPSBmYWxzZTtcbiAgcHVibGljIHNob3dEb2N1bWVudCA9IGZhbHNlO1xuICBwdWJsaWMgc2VsZWN0RG9jdW1lbnQgPSAnU0VMRUNJT05BUiBUSVBPIERPQ1VNRU5UTyc7XG4gIHB1YmxpYyBzZWxlY3RlZE9wZXJhdG9yID0gJ1NFTEVDSU9OQVIgT1BFUkFET1JBJztcbiAgcHVibGljIHBob25lTnVtYmVyOiBzdHJpbmc7XG4gIHB1YmxpYyBkb2N1bWVudE51bWJlcjogc3RyaW5nO1xuICBwdWJsaWMgcGFzc3dvcmQ6IHN0cmluZztcbiAgcHVibGljIGNvbmZpcm1QYXNzd29yZDogc3RyaW5nO1xuXG4gIHB1YmxpYyBpc1N1Ym1pdCA9IGZhbHNlO1xuICBwdWJsaWMgaXNMb2FkaW5nID0gZmFsc2U7XG4gIHB1YmxpYyBkb2N1bWVudFR5cGU6IERvY3VtZW50VHlwZTtcblxuICBwdWJsaWMgZW5yb2xsRm9ybUVycm9yczogRW5yb2xsRXJyb3JGb3JtO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgdG9hc3Q6IFRvYXN0SGVscGVyU2VydmljZSxcbiAgICBwcml2YXRlIGFjY291bnRTZXJ2aWNlOiBBY2NvdW50U2VydmljZSxcbiAgICBwcml2YXRlIHJvdXRlcjogUm91dGVyRXh0ZW5zaW9uc1xuICApIHt9XG5cbiAgcHVibGljIG5nT25Jbml0KCkge1xuICAgIHRoaXMuZW5yb2xsRm9ybUVycm9ycyA9IG5ldyBFbnJvbGxFcnJvckZvcm0oKTtcbiAgICB0aGlzLnBvc2l0b25DaGV2cm9uT3BlcmF0b3JzID0gUG9zaXRpb25DaGV2cm9uLkNMT1NFO1xuICAgIHRoaXMucG9zaXRvbkNoZXZyb25Eb2N1bWVudCA9IFBvc2l0aW9uQ2hldnJvbi5DTE9TRTtcbiAgICB0aGlzLm1vYmlsZU9wZXJhdG9ycyA9IFsnQ2xhcm8nLCAnT2knLCAnVGltJywgJ1Zpdm8nXTtcbiAgfVxuXG4gIHB1YmxpYyBkb0Vucm9sbCgpOiB2b2lkIHtcbiAgICB0aGlzLmlzU3VibWl0ID0gdHJ1ZTtcbiAgICB0aGlzLmlzTG9hZGluZyA9IHRydWU7XG4gICAgdGhpcy52YWxpZGF0ZUVucm9sbEZvcm0oKTtcblxuICAgIGlmICghdGhpcy5lbnJvbGxGb3JtRXJyb3JzLnZhbGlkKSB7XG4gICAgICB0aGlzLmlzTG9hZGluZyA9IGZhbHNlO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IGVucm9sbDogRW5yb2xsID0ge1xuICAgICAgZG9jdW1lbnQ6IHtcbiAgICAgICAgdHlwZTogdGhpcy5kb2N1bWVudFR5cGUudG9VcHBlckNhc2UoKSxcbiAgICAgICAgdmFsdWU6IHRoaXMuZG9jdW1lbnROdW1iZXJcbiAgICAgIH0sXG4gICAgICBwYXNzd29yZDogdGhpcy5wYXNzd29yZCxcbiAgICAgIHBob25lOiB7XG4gICAgICAgIG5ldHdvcmtPcGVyYXRvcjogdGhpcy5zZWxlY3RlZE9wZXJhdG9yLFxuICAgICAgICBudW1iZXI6ICcrNTUnICsgdGhpcy5waG9uZU51bWJlclxuICAgICAgfVxuICAgIH07XG4gICAgdGhpcy5hY2NvdW50U2VydmljZS5zYXZlUmVnaXN0ZXIoZW5yb2xsKS5zdWJzY3JpYmUocmVzID0+IHtcbiAgICAgIGlmIChyZXMuc3VjY2Vzcykge1xuICAgICAgICB0aGlzLnRvYXN0LnNob3dUb2FzdCgnQ29udGEgY2FkYXN0cmFkYSBjb20gc3VjZXNzbycpO1xuICAgICAgICB0aGlzLnJvdXRlci5iYWNrKCk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIHRoaXMudG9hc3Quc2hvd1RvYXN0KHJlcy5lcnJvcnNbMF0ubWVzc2FnZSk7XG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgc2hvd01vYmlsZU9wZXJhdG9yTGlzdChldmVudDogYW55LCB2aWV3SWQ6IHN0cmluZykge1xuICAgIGNvbnN0IHZpZXc6IFZpZXcgPSBldmVudC52aWV3O1xuICAgIHRoaXMucG9zaXRvbkNoZXZyb25PcGVyYXRvcnMgPSB0aGlzLmV4ZWN1dGVBbmltYXRpb24odmlldy5nZXRWaWV3QnlJZCh2aWV3SWQpLCB0aGlzLnBvc2l0b25DaGV2cm9uT3BlcmF0b3JzKTtcbiAgICB0aGlzLnNob3dPcGVyYXRvckxpc3QgPSAhdGhpcy5zaG93T3BlcmF0b3JMaXN0O1xuICB9XG5cbiAgcHVibGljIHNob3dEb2N1bWVudExpc3QoZXZlbnQ6IGFueSwgdmlld0lkOiBzdHJpbmcpIHtcbiAgICBjb25zdCB2aWV3OiBWaWV3ID0gZXZlbnQudmlldztcbiAgICB0aGlzLnBvc2l0b25DaGV2cm9uRG9jdW1lbnQgPSB0aGlzLmV4ZWN1dGVBbmltYXRpb24odmlldy5nZXRWaWV3QnlJZCh2aWV3SWQpLCB0aGlzLnBvc2l0b25DaGV2cm9uRG9jdW1lbnQpO1xuICAgIHRoaXMuc2hvd0RvY3VtZW50ID0gIXRoaXMuc2hvd0RvY3VtZW50O1xuICB9XG5cbiAgcHVibGljIHNlbGVjdE1vYmlsZU9wZXJhdG9yKGV2ZW50OiBhbnksIHNlbGVjdGVkOiBzdHJpbmcpIHtcbiAgICBjb25zdCB2aWV3OiBWaWV3ID0gZXZlbnQudmlldztcblxuICAgIHZpZXcuYW5pbWF0ZSh7IHNjYWxlOiB7IHg6IDEuMiwgeTogMS4yIH0sIGR1cmF0aW9uOiAyMDAgfSkudGhlbigoKSA9PiB7XG4gICAgICB2aWV3LmFuaW1hdGUoeyBzY2FsZTogeyB4OiAxLCB5OiAxIH0sIGR1cmF0aW9uOiAyMDAgfSk7XG4gICAgICB0aGlzLnNlbGVjdGVkT3BlcmF0b3IgPSBzZWxlY3RlZDtcbiAgICAgIHRoaXMuc2hvd09wZXJhdG9yTGlzdCA9IGZhbHNlO1xuICAgICAgdGhpcy5lbnJvbGxGb3JtRXJyb3JzLm9wZXJhdG9yLnZhbGlkID0gdHJ1ZTtcbiAgICB9KTtcbiAgfVxuXG4gIHB1YmxpYyBzZWxlY3REb2N1bWVudFR5cGUoZXZlbnQ6IGFueSwgc2VsZWN0ZWQ6IHN0cmluZykge1xuICAgIGNvbnN0IHZpZXc6IFZpZXcgPSBldmVudC52aWV3O1xuICAgIHRoaXMuZG9jdW1lbnROdW1iZXIgPSAnJztcbiAgICB2aWV3LmFuaW1hdGUoeyBzY2FsZTogeyB4OiAxLjIsIHk6IDEuMiB9LCBkdXJhdGlvbjogMjAwIH0pLnRoZW4oKCkgPT4ge1xuICAgICAgdmlldy5hbmltYXRlKHsgc2NhbGU6IHsgeDogMSwgeTogMSB9LCBkdXJhdGlvbjogMjAwIH0pO1xuICAgICAgdGhpcy5zZWxlY3REb2N1bWVudCA9IHNlbGVjdGVkO1xuICAgICAgdGhpcy5zaG93RG9jdW1lbnQgPSBmYWxzZTtcbiAgICAgIHRoaXMuZW5yb2xsRm9ybUVycm9ycy5kb2N1bWVudFR5cGUudmFsaWQgPSB0cnVlO1xuICAgICAgdGhpcy5kb2N1bWVudFR5cGUgPSBzZWxlY3RlZC50b0xvY2FsZUxvd2VyQ2FzZSgpID09PSBEb2N1bWVudFR5cGUuQ1BGID8gRG9jdW1lbnRUeXBlLkNQRiA6IERvY3VtZW50VHlwZS5DTlBKO1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBleGVjdXRlQW5pbWF0aW9uKHZpZXc6IFZpZXcsIGFjdHVhbFBvc2l0aW9uOiBQb3NpdGlvbkNoZXZyb24pOiBQb3NpdGlvbkNoZXZyb24ge1xuICAgIGlmIChhY3R1YWxQb3NpdGlvbiA9PT0gUG9zaXRpb25DaGV2cm9uLkNMT1NFKSB7XG4gICAgICBhY3R1YWxQb3NpdGlvbiA9IFBvc2l0aW9uQ2hldnJvbi5PUEVOO1xuICAgICAgdmlldy5hbmltYXRlKHsgcm90YXRlOiBQb3NpdGlvbkNoZXZyb24uT1BFTiwgZHVyYXRpb246IDIwMCB9KTtcbiAgICB9IGVsc2UgaWYgKGFjdHVhbFBvc2l0aW9uID09PSBQb3NpdGlvbkNoZXZyb24uT1BFTikge1xuICAgICAgYWN0dWFsUG9zaXRpb24gPSBQb3NpdGlvbkNoZXZyb24uQ0xPU0U7XG4gICAgICB2aWV3LmFuaW1hdGUoeyByb3RhdGU6IFBvc2l0aW9uQ2hldnJvbi5DTE9TRSwgZHVyYXRpb246IDIwMCB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gYWN0dWFsUG9zaXRpb247XG4gIH1cblxuICBwcml2YXRlIHZhbGlkYXRlRW5yb2xsRm9ybSgpOiB2b2lkIHtcbiAgICB0aGlzLmVucm9sbEZvcm1FcnJvcnMudmFsaWQgPSB0cnVlO1xuICAgIHRoaXMuZW5yb2xsRm9ybUVycm9ycy5kb2N1bWVudE51bWJlci52YWxpZCA9IHRydWU7XG4gICAgdGhpcy5lbnJvbGxGb3JtRXJyb3JzLmNvbmZpcm1QYXNzd29yZC52YWxpZCA9IHRydWU7XG4gICAgdGhpcy5lbnJvbGxGb3JtRXJyb3JzLnBhc3N3b3JkLnZhbGlkID0gdHJ1ZTtcbiAgICB0aGlzLmVucm9sbEZvcm1FcnJvcnMucGhvbmVOdW1iZXIudmFsaWQgPSB0cnVlO1xuXG4gICAgaWYgKHRoaXMuc2VsZWN0RG9jdW1lbnQgIT0gJ0NQRicgJiYgdGhpcy5zZWxlY3REb2N1bWVudCAhPSAnQ05QSicpIHtcbiAgICAgIHRoaXMuZW5yb2xsRm9ybUVycm9ycy52YWxpZCA9IGZhbHNlO1xuICAgICAgdGhpcy5lbnJvbGxGb3JtRXJyb3JzLmRvY3VtZW50VHlwZS52YWxpZCA9IGZhbHNlO1xuICAgICAgdGhpcy5lbnJvbGxGb3JtRXJyb3JzLmRvY3VtZW50VHlwZS5lcnJvciA9ICdTZWxlY2lvbmUgbyB0aXBvIGRvIGRvY3VtZW50byc7XG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLmRvY3VtZW50TnVtYmVyKSB7XG4gICAgICB0aGlzLmVucm9sbEZvcm1FcnJvcnMudmFsaWQgPSBmYWxzZTtcbiAgICAgIHRoaXMuZW5yb2xsRm9ybUVycm9ycy5kb2N1bWVudE51bWJlci52YWxpZCA9IGZhbHNlO1xuICAgICAgdGhpcy5lbnJvbGxGb3JtRXJyb3JzLmRvY3VtZW50TnVtYmVyLmVycm9yID0gJ0RpZ2l0ZSBvIG51bWVybyBkbyBkb2N1bWVudG8nO1xuICAgIH1cblxuICAgIGlmICh0aGlzLm1vYmlsZU9wZXJhdG9ycy5pbmRleE9mKHRoaXMuc2VsZWN0ZWRPcGVyYXRvcikgPCAwKSB7XG4gICAgICB0aGlzLmVucm9sbEZvcm1FcnJvcnMudmFsaWQgPSBmYWxzZTtcbiAgICAgIHRoaXMuZW5yb2xsRm9ybUVycm9ycy5vcGVyYXRvci52YWxpZCA9IGZhbHNlO1xuICAgICAgdGhpcy5lbnJvbGxGb3JtRXJyb3JzLmRvY3VtZW50VHlwZS5lcnJvciA9ICdTZWxlY2lvbmUgYSBvcGVyYWRvcmEnO1xuICAgIH1cblxuICAgIGlmICghdGhpcy5waG9uZU51bWJlcikge1xuICAgICAgdGhpcy5lbnJvbGxGb3JtRXJyb3JzLnZhbGlkID0gZmFsc2U7XG4gICAgICB0aGlzLmVucm9sbEZvcm1FcnJvcnMucGhvbmVOdW1iZXIudmFsaWQgPSBmYWxzZTtcbiAgICAgIHRoaXMuZW5yb2xsRm9ybUVycm9ycy5waG9uZU51bWJlci5lcnJvciA9ICdEaWdpdGUgbyBuw7ptZXJvIGRvIHRlbGVmb25lJztcbiAgICB9XG5cbiAgICBpZiAoIXRoaXMucGFzc3dvcmQpIHtcbiAgICAgIHRoaXMuZW5yb2xsRm9ybUVycm9ycy52YWxpZCA9IGZhbHNlO1xuICAgICAgdGhpcy5lbnJvbGxGb3JtRXJyb3JzLnBhc3N3b3JkLnZhbGlkID0gZmFsc2U7XG4gICAgICB0aGlzLmVucm9sbEZvcm1FcnJvcnMucGFzc3dvcmQuZXJyb3IgPSAnRGlnaXRlIGEgc2VuaGEnO1xuICAgIH1cblxuICAgIGlmICghdGhpcy5jb25maXJtUGFzc3dvcmQpIHtcbiAgICAgIHRoaXMuZW5yb2xsRm9ybUVycm9ycy52YWxpZCA9IGZhbHNlO1xuICAgICAgdGhpcy5lbnJvbGxGb3JtRXJyb3JzLmNvbmZpcm1QYXNzd29yZC52YWxpZCA9IGZhbHNlO1xuICAgICAgdGhpcy5lbnJvbGxGb3JtRXJyb3JzLmNvbmZpcm1QYXNzd29yZC5lcnJvciA9ICdDb25maXJtZSBhIHNlbmhhJztcbiAgICB9XG5cbiAgICBpZiAodGhpcy5wYXNzd29yZCAmJiB0aGlzLmNvbmZpcm1QYXNzd29yZCAmJiB0aGlzLmNvbmZpcm1QYXNzd29yZCAhPT0gdGhpcy5wYXNzd29yZCkge1xuICAgICAgdGhpcy5lbnJvbGxGb3JtRXJyb3JzLnZhbGlkID0gZmFsc2U7XG4gICAgICB0aGlzLmVucm9sbEZvcm1FcnJvcnMuY29uZmlybVBhc3N3b3JkLnZhbGlkID0gZmFsc2U7XG4gICAgICB0aGlzLmVucm9sbEZvcm1FcnJvcnMuY29uZmlybVBhc3N3b3JkLmVycm9yID0gJ1NlbmhhIG7Do28gY29tYmluYSBjb20gYSBpbmZvcm1hZGEgYWNpbWEuJztcbiAgICAgIHRoaXMudG9hc3Quc2hvd1RvYXN0KCdTZW5oYSBuw6NvIGNvbmZlcmUsIGEgY29uZmlybWHDp8OjbyBkZXZlIHNlciBpZ3VhbCBhIHNlbmhhIGRpZ2l0YWRhLicpO1xuICAgIH1cbiAgfVxufVxuXG5jbGFzcyBFbnJvbGxFcnJvckZvcm0ge1xuICB2YWxpZDogYm9vbGVhbjtcbiAgcGFzc3dvcmQ6IEVycm9yRm9ybVR5cGU7XG4gIGNvbmZpcm1QYXNzd29yZDogRXJyb3JGb3JtVHlwZTtcbiAgZG9jdW1lbnRUeXBlOiBFcnJvckZvcm1UeXBlO1xuICBkb2N1bWVudE51bWJlcjogRXJyb3JGb3JtVHlwZTtcbiAgb3BlcmF0b3I6IEVycm9yRm9ybVR5cGU7XG4gIHBob25lTnVtYmVyOiBFcnJvckZvcm1UeXBlO1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMucGFzc3dvcmQgPSBuZXcgRXJyb3JGb3JtVHlwZSgpO1xuICAgIHRoaXMuY29uZmlybVBhc3N3b3JkID0gbmV3IEVycm9yRm9ybVR5cGUoKTtcbiAgICB0aGlzLmRvY3VtZW50VHlwZSA9IG5ldyBFcnJvckZvcm1UeXBlKCk7XG4gICAgdGhpcy5kb2N1bWVudE51bWJlciA9IG5ldyBFcnJvckZvcm1UeXBlKCk7XG4gICAgdGhpcy5vcGVyYXRvciA9IG5ldyBFcnJvckZvcm1UeXBlKCk7XG4gICAgdGhpcy5waG9uZU51bWJlciA9IG5ldyBFcnJvckZvcm1UeXBlKCk7XG4gIH1cbn1cblxuY2xhc3MgRXJyb3JGb3JtVHlwZSB7XG4gIHZhbGlkOiBib29sZWFuO1xuICBlcnJvcjogc3RyaW5nO1xufVxuIl19