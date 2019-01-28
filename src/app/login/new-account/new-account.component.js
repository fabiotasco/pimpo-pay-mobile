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
            _this.toast.showToast(res.errors[0].code + '-' + res.errors[0].message);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmV3LWFjY291bnQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibmV3LWFjY291bnQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQWtEO0FBQ2xELG1EQUF3RDtBQUV4RCxpRUFBZ0U7QUFDaEUsd0VBQXFFO0FBQ3JFLHlJQUFnSDtBQUVoSCxrRUFBZ0U7QUFDaEUsc0RBQStEO0FBUS9EO0lBMkJFLDZCQUNVLEtBQXlCLEVBQ3pCLGNBQThCLEVBQzlCLE1BQXdCO1FBRnhCLFVBQUssR0FBTCxLQUFLLENBQW9CO1FBQ3pCLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUM5QixXQUFNLEdBQU4sTUFBTSxDQUFrQjtRQTdCM0IsY0FBUyxHQUFnQjtZQUM5QixTQUFTLEVBQUUsQ0FBQztZQUNaLE9BQU8sRUFBRSxTQUFTO1lBQ2xCLEtBQUssRUFBRSxrQ0FBUyxDQUFDLFNBQVM7WUFDMUIsWUFBWSxFQUFFLENBQUM7U0FDaEIsQ0FBQztRQU1LLHFCQUFnQixHQUFHLEtBQUssQ0FBQztRQUN6QixpQkFBWSxHQUFHLEtBQUssQ0FBQztRQUNyQixtQkFBYyxHQUFHLDJCQUEyQixDQUFDO1FBQzdDLHFCQUFnQixHQUFHLHNCQUFzQixDQUFDO1FBTTFDLGFBQVEsR0FBRyxLQUFLLENBQUM7UUFDakIsY0FBUyxHQUFHLEtBQUssQ0FBQztJQVN0QixDQUFDO0lBRUcsc0NBQVEsR0FBZjtRQUNFLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLGVBQWUsRUFBRSxDQUFDO1FBQzlDLElBQUksQ0FBQyx1QkFBdUIsR0FBRywyQkFBZSxDQUFDLEtBQUssQ0FBQztRQUNyRCxJQUFJLENBQUMsc0JBQXNCLEdBQUcsMkJBQWUsQ0FBQyxLQUFLLENBQUM7UUFDcEQsSUFBSSxDQUFDLGVBQWUsR0FBRyxDQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQ3hELENBQUM7SUFFTSxz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QUFHLElBQUksYUFBYSxFQUFFLENBQUM7UUFDcEMsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLGFBQWEsRUFBRSxDQUFDO0lBQ3pDLENBQUM7SUFDSCxzQkFBQztBQUFELENBQUMsQUFqQkQsSUFpQkM7QUFFRDtJQUFBO0lBR0EsQ0FBQztJQUFELG9CQUFDO0FBQUQsQ0FBQyxBQUhELElBR0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUG9zaXRpb25DaGV2cm9uIH0gZnJvbSAnfi9hcHAvdXRpbHMvdmFyaWFibGVzJztcbmltcG9ydCB7IFZpZXcgfSBmcm9tICd0bnMtY29yZS1tb2R1bGVzL3VpL3BhZ2UvcGFnZSc7XG5pbXBvcnQgeyBTaGFwZUVudW0sIEFuZHJvaWREYXRhIH0gZnJvbSAnbmF0aXZlc2NyaXB0LW5nLXNoYWRvdyc7XG5pbXBvcnQgeyBUb2FzdEhlbHBlclNlcnZpY2UgfSBmcm9tICd+L2FwcC9jb3JlL3RvYXN0LWhlbHBlci5zZXJ2aWNlJztcbmltcG9ydCB7IERvY3VtZW50VHlwZSB9IGZyb20gJ34vYXBwL2NvbXBvbmVudHMvbmF0aXZlc2NyaXB0LWRvY3VtZW50LW1hc2svbmF0aXZlc2NyaXB0LWRvY3VtZW50LW1hc2suY29tcG9uZW50JztcbmltcG9ydCB7IEVucm9sbCB9IGZyb20gJ34vYXBwL21vZGVscy9lbnJvbGwnO1xuaW1wb3J0IHsgQWNjb3VudFNlcnZpY2UgfSBmcm9tICd+L2FwcC9zZXJ2aWNlcy9hY2NvdW50LnNlcnZpY2UnO1xuaW1wb3J0IHsgUm91dGVyRXh0ZW5zaW9ucyB9IGZyb20gJ25hdGl2ZXNjcmlwdC1hbmd1bGFyL3JvdXRlcic7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25zLW5ldy1hY2NvdW50JyxcbiAgdGVtcGxhdGVVcmw6ICcuL25ldy1hY2NvdW50LmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vbmV3LWFjY291bnQuY29tcG9uZW50LmNzcyddLFxuICBtb2R1bGVJZDogbW9kdWxlLmlkXG59KVxuZXhwb3J0IGNsYXNzIE5ld0FjY291bnRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBwdWJsaWMgYnRuU2hhZG93OiBBbmRyb2lkRGF0YSA9IHtcbiAgICBlbGV2YXRpb246IDIsXG4gICAgYmdjb2xvcjogJyNFQzQwN0EnLFxuICAgIHNoYXBlOiBTaGFwZUVudW0uUkVDVEFOR0xFLFxuICAgIGNvcm5lclJhZGl1czogOFxuICB9O1xuXG4gIHB1YmxpYyBtb2JpbGVPcGVyYXRvcnM6IEFycmF5PHN0cmluZz47XG4gIHB1YmxpYyBzZWxlY3RlZE9wZXJhdG9ySW5kZXg6IG51bWJlcjtcbiAgcHVibGljIHBvc2l0b25DaGV2cm9uT3BlcmF0b3JzOiBQb3NpdGlvbkNoZXZyb247XG4gIHB1YmxpYyBwb3NpdG9uQ2hldnJvbkRvY3VtZW50OiBQb3NpdGlvbkNoZXZyb247XG4gIHB1YmxpYyBzaG93T3BlcmF0b3JMaXN0ID0gZmFsc2U7XG4gIHB1YmxpYyBzaG93RG9jdW1lbnQgPSBmYWxzZTtcbiAgcHVibGljIHNlbGVjdERvY3VtZW50ID0gJ1NFTEVDSU9OQVIgVElQTyBET0NVTUVOVE8nO1xuICBwdWJsaWMgc2VsZWN0ZWRPcGVyYXRvciA9ICdTRUxFQ0lPTkFSIE9QRVJBRE9SQSc7XG4gIHB1YmxpYyBwaG9uZU51bWJlcjogc3RyaW5nO1xuICBwdWJsaWMgZG9jdW1lbnROdW1iZXI6IHN0cmluZztcbiAgcHVibGljIHBhc3N3b3JkOiBzdHJpbmc7XG4gIHB1YmxpYyBjb25maXJtUGFzc3dvcmQ6IHN0cmluZztcblxuICBwdWJsaWMgaXNTdWJtaXQgPSBmYWxzZTtcbiAgcHVibGljIGlzTG9hZGluZyA9IGZhbHNlO1xuICBwdWJsaWMgZG9jdW1lbnRUeXBlOiBEb2N1bWVudFR5cGU7XG5cbiAgcHVibGljIGVucm9sbEZvcm1FcnJvcnM6IEVucm9sbEVycm9yRm9ybTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIHRvYXN0OiBUb2FzdEhlbHBlclNlcnZpY2UsXG4gICAgcHJpdmF0ZSBhY2NvdW50U2VydmljZTogQWNjb3VudFNlcnZpY2UsXG4gICAgcHJpdmF0ZSByb3V0ZXI6IFJvdXRlckV4dGVuc2lvbnNcbiAgKSB7fVxuXG4gIHB1YmxpYyBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLmVucm9sbEZvcm1FcnJvcnMgPSBuZXcgRW5yb2xsRXJyb3JGb3JtKCk7XG4gICAgdGhpcy5wb3NpdG9uQ2hldnJvbk9wZXJhdG9ycyA9IFBvc2l0aW9uQ2hldnJvbi5DTE9TRTtcbiAgICB0aGlzLnBvc2l0b25DaGV2cm9uRG9jdW1lbnQgPSBQb3NpdGlvbkNoZXZyb24uQ0xPU0U7XG4gICAgdGhpcy5tb2JpbGVPcGVyYXRvcnMgPSBbJ0NsYXJvJywgJ09pJywgJ1RpbScsICdWaXZvJ107XG4gIH1cblxuICBwdWJsaWMgZG9FbnJvbGwoKTogdm9pZCB7XG4gICAgdGhpcy5pc1N1Ym1pdCA9IHRydWU7XG4gICAgdGhpcy5pc0xvYWRpbmcgPSB0cnVlO1xuICAgIHRoaXMudmFsaWRhdGVFbnJvbGxGb3JtKCk7XG5cbiAgICBpZiAoIXRoaXMuZW5yb2xsRm9ybUVycm9ycy52YWxpZCkge1xuICAgICAgdGhpcy5pc0xvYWRpbmcgPSBmYWxzZTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBlbnJvbGw6IEVucm9sbCA9IHtcbiAgICAgIGRvY3VtZW50OiB7XG4gICAgICAgIHR5cGU6IHRoaXMuZG9jdW1lbnRUeXBlLnRvVXBwZXJDYXNlKCksXG4gICAgICAgIHZhbHVlOiB0aGlzLmRvY3VtZW50TnVtYmVyXG4gICAgICB9LFxuICAgICAgcGFzc3dvcmQ6IHRoaXMucGFzc3dvcmQsXG4gICAgICBwaG9uZToge1xuICAgICAgICBuZXR3b3JrT3BlcmF0b3I6IHRoaXMuc2VsZWN0ZWRPcGVyYXRvcixcbiAgICAgICAgbnVtYmVyOiAnKzU1JyArIHRoaXMucGhvbmVOdW1iZXJcbiAgICAgIH1cbiAgICB9O1xuICAgIHRoaXMuYWNjb3VudFNlcnZpY2Uuc2F2ZVJlZ2lzdGVyKGVucm9sbCkuc3Vic2NyaWJlKHJlcyA9PiB7XG4gICAgICBpZiAocmVzLnN1Y2Nlc3MpIHtcbiAgICAgICAgdGhpcy50b2FzdC5zaG93VG9hc3QoJ0NvbnRhIGNhZGFzdHJhZGEgY29tIHN1Y2Vzc28nKTtcbiAgICAgICAgdGhpcy5yb3V0ZXIuYmFjaygpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICB0aGlzLnRvYXN0LnNob3dUb2FzdChyZXMuZXJyb3JzWzBdLmNvZGUgKyAnLScgKyByZXMuZXJyb3JzWzBdLm1lc3NhZ2UpO1xuICAgIH0pO1xuICB9XG5cbiAgcHVibGljIHNob3dNb2JpbGVPcGVyYXRvckxpc3QoZXZlbnQ6IGFueSwgdmlld0lkOiBzdHJpbmcpIHtcbiAgICBjb25zdCB2aWV3OiBWaWV3ID0gZXZlbnQudmlldztcbiAgICB0aGlzLnBvc2l0b25DaGV2cm9uT3BlcmF0b3JzID0gdGhpcy5leGVjdXRlQW5pbWF0aW9uKHZpZXcuZ2V0Vmlld0J5SWQodmlld0lkKSwgdGhpcy5wb3NpdG9uQ2hldnJvbk9wZXJhdG9ycyk7XG4gICAgdGhpcy5zaG93T3BlcmF0b3JMaXN0ID0gIXRoaXMuc2hvd09wZXJhdG9yTGlzdDtcbiAgfVxuXG4gIHB1YmxpYyBzaG93RG9jdW1lbnRMaXN0KGV2ZW50OiBhbnksIHZpZXdJZDogc3RyaW5nKSB7XG4gICAgY29uc3QgdmlldzogVmlldyA9IGV2ZW50LnZpZXc7XG4gICAgdGhpcy5wb3NpdG9uQ2hldnJvbkRvY3VtZW50ID0gdGhpcy5leGVjdXRlQW5pbWF0aW9uKHZpZXcuZ2V0Vmlld0J5SWQodmlld0lkKSwgdGhpcy5wb3NpdG9uQ2hldnJvbkRvY3VtZW50KTtcbiAgICB0aGlzLnNob3dEb2N1bWVudCA9ICF0aGlzLnNob3dEb2N1bWVudDtcbiAgfVxuXG4gIHB1YmxpYyBzZWxlY3RNb2JpbGVPcGVyYXRvcihldmVudDogYW55LCBzZWxlY3RlZDogc3RyaW5nKSB7XG4gICAgY29uc3QgdmlldzogVmlldyA9IGV2ZW50LnZpZXc7XG5cbiAgICB2aWV3LmFuaW1hdGUoeyBzY2FsZTogeyB4OiAxLjIsIHk6IDEuMiB9LCBkdXJhdGlvbjogMjAwIH0pLnRoZW4oKCkgPT4ge1xuICAgICAgdmlldy5hbmltYXRlKHsgc2NhbGU6IHsgeDogMSwgeTogMSB9LCBkdXJhdGlvbjogMjAwIH0pO1xuICAgICAgdGhpcy5zZWxlY3RlZE9wZXJhdG9yID0gc2VsZWN0ZWQ7XG4gICAgICB0aGlzLnNob3dPcGVyYXRvckxpc3QgPSBmYWxzZTtcbiAgICAgIHRoaXMuZW5yb2xsRm9ybUVycm9ycy5vcGVyYXRvci52YWxpZCA9IHRydWU7XG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgc2VsZWN0RG9jdW1lbnRUeXBlKGV2ZW50OiBhbnksIHNlbGVjdGVkOiBzdHJpbmcpIHtcbiAgICBjb25zdCB2aWV3OiBWaWV3ID0gZXZlbnQudmlldztcbiAgICB0aGlzLmRvY3VtZW50TnVtYmVyID0gJyc7XG4gICAgdmlldy5hbmltYXRlKHsgc2NhbGU6IHsgeDogMS4yLCB5OiAxLjIgfSwgZHVyYXRpb246IDIwMCB9KS50aGVuKCgpID0+IHtcbiAgICAgIHZpZXcuYW5pbWF0ZSh7IHNjYWxlOiB7IHg6IDEsIHk6IDEgfSwgZHVyYXRpb246IDIwMCB9KTtcbiAgICAgIHRoaXMuc2VsZWN0RG9jdW1lbnQgPSBzZWxlY3RlZDtcbiAgICAgIHRoaXMuc2hvd0RvY3VtZW50ID0gZmFsc2U7XG4gICAgICB0aGlzLmVucm9sbEZvcm1FcnJvcnMuZG9jdW1lbnRUeXBlLnZhbGlkID0gdHJ1ZTtcbiAgICAgIHRoaXMuZG9jdW1lbnRUeXBlID0gc2VsZWN0ZWQudG9Mb2NhbGVMb3dlckNhc2UoKSA9PT0gRG9jdW1lbnRUeXBlLkNQRiA/IERvY3VtZW50VHlwZS5DUEYgOiBEb2N1bWVudFR5cGUuQ05QSjtcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgZXhlY3V0ZUFuaW1hdGlvbih2aWV3OiBWaWV3LCBhY3R1YWxQb3NpdGlvbjogUG9zaXRpb25DaGV2cm9uKTogUG9zaXRpb25DaGV2cm9uIHtcbiAgICBpZiAoYWN0dWFsUG9zaXRpb24gPT09IFBvc2l0aW9uQ2hldnJvbi5DTE9TRSkge1xuICAgICAgYWN0dWFsUG9zaXRpb24gPSBQb3NpdGlvbkNoZXZyb24uT1BFTjtcbiAgICAgIHZpZXcuYW5pbWF0ZSh7IHJvdGF0ZTogUG9zaXRpb25DaGV2cm9uLk9QRU4sIGR1cmF0aW9uOiAyMDAgfSk7XG4gICAgfSBlbHNlIGlmIChhY3R1YWxQb3NpdGlvbiA9PT0gUG9zaXRpb25DaGV2cm9uLk9QRU4pIHtcbiAgICAgIGFjdHVhbFBvc2l0aW9uID0gUG9zaXRpb25DaGV2cm9uLkNMT1NFO1xuICAgICAgdmlldy5hbmltYXRlKHsgcm90YXRlOiBQb3NpdGlvbkNoZXZyb24uQ0xPU0UsIGR1cmF0aW9uOiAyMDAgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGFjdHVhbFBvc2l0aW9uO1xuICB9XG5cbiAgcHJpdmF0ZSB2YWxpZGF0ZUVucm9sbEZvcm0oKTogdm9pZCB7XG4gICAgdGhpcy5lbnJvbGxGb3JtRXJyb3JzLnZhbGlkID0gdHJ1ZTtcbiAgICB0aGlzLmVucm9sbEZvcm1FcnJvcnMuZG9jdW1lbnROdW1iZXIudmFsaWQgPSB0cnVlO1xuICAgIHRoaXMuZW5yb2xsRm9ybUVycm9ycy5jb25maXJtUGFzc3dvcmQudmFsaWQgPSB0cnVlO1xuICAgIHRoaXMuZW5yb2xsRm9ybUVycm9ycy5wYXNzd29yZC52YWxpZCA9IHRydWU7XG4gICAgdGhpcy5lbnJvbGxGb3JtRXJyb3JzLnBob25lTnVtYmVyLnZhbGlkID0gdHJ1ZTtcblxuICAgIGlmICh0aGlzLnNlbGVjdERvY3VtZW50ICE9ICdDUEYnICYmIHRoaXMuc2VsZWN0RG9jdW1lbnQgIT0gJ0NOUEonKSB7XG4gICAgICB0aGlzLmVucm9sbEZvcm1FcnJvcnMudmFsaWQgPSBmYWxzZTtcbiAgICAgIHRoaXMuZW5yb2xsRm9ybUVycm9ycy5kb2N1bWVudFR5cGUudmFsaWQgPSBmYWxzZTtcbiAgICAgIHRoaXMuZW5yb2xsRm9ybUVycm9ycy5kb2N1bWVudFR5cGUuZXJyb3IgPSAnU2VsZWNpb25lIG8gdGlwbyBkbyBkb2N1bWVudG8nO1xuICAgIH1cblxuICAgIGlmICghdGhpcy5kb2N1bWVudE51bWJlcikge1xuICAgICAgdGhpcy5lbnJvbGxGb3JtRXJyb3JzLnZhbGlkID0gZmFsc2U7XG4gICAgICB0aGlzLmVucm9sbEZvcm1FcnJvcnMuZG9jdW1lbnROdW1iZXIudmFsaWQgPSBmYWxzZTtcbiAgICAgIHRoaXMuZW5yb2xsRm9ybUVycm9ycy5kb2N1bWVudE51bWJlci5lcnJvciA9ICdEaWdpdGUgbyBudW1lcm8gZG8gZG9jdW1lbnRvJztcbiAgICB9XG5cbiAgICBpZiAodGhpcy5tb2JpbGVPcGVyYXRvcnMuaW5kZXhPZih0aGlzLnNlbGVjdGVkT3BlcmF0b3IpIDwgMCkge1xuICAgICAgdGhpcy5lbnJvbGxGb3JtRXJyb3JzLnZhbGlkID0gZmFsc2U7XG4gICAgICB0aGlzLmVucm9sbEZvcm1FcnJvcnMub3BlcmF0b3IudmFsaWQgPSBmYWxzZTtcbiAgICAgIHRoaXMuZW5yb2xsRm9ybUVycm9ycy5kb2N1bWVudFR5cGUuZXJyb3IgPSAnU2VsZWNpb25lIGEgb3BlcmFkb3JhJztcbiAgICB9XG5cbiAgICBpZiAoIXRoaXMucGhvbmVOdW1iZXIpIHtcbiAgICAgIHRoaXMuZW5yb2xsRm9ybUVycm9ycy52YWxpZCA9IGZhbHNlO1xuICAgICAgdGhpcy5lbnJvbGxGb3JtRXJyb3JzLnBob25lTnVtYmVyLnZhbGlkID0gZmFsc2U7XG4gICAgICB0aGlzLmVucm9sbEZvcm1FcnJvcnMucGhvbmVOdW1iZXIuZXJyb3IgPSAnRGlnaXRlIG8gbsO6bWVybyBkbyB0ZWxlZm9uZSc7XG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLnBhc3N3b3JkKSB7XG4gICAgICB0aGlzLmVucm9sbEZvcm1FcnJvcnMudmFsaWQgPSBmYWxzZTtcbiAgICAgIHRoaXMuZW5yb2xsRm9ybUVycm9ycy5wYXNzd29yZC52YWxpZCA9IGZhbHNlO1xuICAgICAgdGhpcy5lbnJvbGxGb3JtRXJyb3JzLnBhc3N3b3JkLmVycm9yID0gJ0RpZ2l0ZSBhIHNlbmhhJztcbiAgICB9XG5cbiAgICBpZiAoIXRoaXMuY29uZmlybVBhc3N3b3JkKSB7XG4gICAgICB0aGlzLmVucm9sbEZvcm1FcnJvcnMudmFsaWQgPSBmYWxzZTtcbiAgICAgIHRoaXMuZW5yb2xsRm9ybUVycm9ycy5jb25maXJtUGFzc3dvcmQudmFsaWQgPSBmYWxzZTtcbiAgICAgIHRoaXMuZW5yb2xsRm9ybUVycm9ycy5jb25maXJtUGFzc3dvcmQuZXJyb3IgPSAnQ29uZmlybWUgYSBzZW5oYSc7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMucGFzc3dvcmQgJiYgdGhpcy5jb25maXJtUGFzc3dvcmQgJiYgdGhpcy5jb25maXJtUGFzc3dvcmQgIT09IHRoaXMucGFzc3dvcmQpIHtcbiAgICAgIHRoaXMuZW5yb2xsRm9ybUVycm9ycy52YWxpZCA9IGZhbHNlO1xuICAgICAgdGhpcy5lbnJvbGxGb3JtRXJyb3JzLmNvbmZpcm1QYXNzd29yZC52YWxpZCA9IGZhbHNlO1xuICAgICAgdGhpcy5lbnJvbGxGb3JtRXJyb3JzLmNvbmZpcm1QYXNzd29yZC5lcnJvciA9ICdTZW5oYSBuw6NvIGNvbWJpbmEgY29tIGEgaW5mb3JtYWRhIGFjaW1hLic7XG4gICAgICB0aGlzLnRvYXN0LnNob3dUb2FzdCgnU2VuaGEgbsOjbyBjb25mZXJlLCBhIGNvbmZpcm1hw6fDo28gZGV2ZSBzZXIgaWd1YWwgYSBzZW5oYSBkaWdpdGFkYS4nKTtcbiAgICB9XG4gIH1cbn1cblxuY2xhc3MgRW5yb2xsRXJyb3JGb3JtIHtcbiAgdmFsaWQ6IGJvb2xlYW47XG4gIHBhc3N3b3JkOiBFcnJvckZvcm1UeXBlO1xuICBjb25maXJtUGFzc3dvcmQ6IEVycm9yRm9ybVR5cGU7XG4gIGRvY3VtZW50VHlwZTogRXJyb3JGb3JtVHlwZTtcbiAgZG9jdW1lbnROdW1iZXI6IEVycm9yRm9ybVR5cGU7XG4gIG9wZXJhdG9yOiBFcnJvckZvcm1UeXBlO1xuICBwaG9uZU51bWJlcjogRXJyb3JGb3JtVHlwZTtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLnBhc3N3b3JkID0gbmV3IEVycm9yRm9ybVR5cGUoKTtcbiAgICB0aGlzLmNvbmZpcm1QYXNzd29yZCA9IG5ldyBFcnJvckZvcm1UeXBlKCk7XG4gICAgdGhpcy5kb2N1bWVudFR5cGUgPSBuZXcgRXJyb3JGb3JtVHlwZSgpO1xuICAgIHRoaXMuZG9jdW1lbnROdW1iZXIgPSBuZXcgRXJyb3JGb3JtVHlwZSgpO1xuICAgIHRoaXMub3BlcmF0b3IgPSBuZXcgRXJyb3JGb3JtVHlwZSgpO1xuICAgIHRoaXMucGhvbmVOdW1iZXIgPSBuZXcgRXJyb3JGb3JtVHlwZSgpO1xuICB9XG59XG5cbmNsYXNzIEVycm9yRm9ybVR5cGUge1xuICB2YWxpZDogYm9vbGVhbjtcbiAgZXJyb3I6IHN0cmluZztcbn1cbiJdfQ==