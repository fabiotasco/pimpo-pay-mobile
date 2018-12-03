"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var page_1 = require("tns-core-modules/ui/page/page");
var toast_helper_service_1 = require("../core/toast-helper.service");
var account_service_1 = require("../services/account.service");
var variables_1 = require("../utils/variables");
var LoginPageComponent = /** @class */ (function () {
    function LoginPageComponent(page, toastHelper, accountService) {
        this.page = page;
        this.toastHelper = toastHelper;
        this.accountService = accountService;
        this.proccessing = false;
        this.showRegister = false;
        this.errorMessage = {};
    }
    LoginPageComponent.prototype.ngOnInit = function () {
        this.page.actionBarHidden = true;
        this.optionsType = ['CPF', 'CNPJ'];
        this.operatorlist = variables_1.mobileOperatorList().map(function (item) {
            return item.toLocaleUpperCase();
        });
    };
    LoginPageComponent.prototype.submitLogin = function () {
        this.proccessing = true;
        if (this.showRegister) {
            this.register();
        }
        else {
            this.doLogin();
        }
    };
    LoginPageComponent.prototype.showRegisterForm = function () {
        this.showRegister = true;
    };
    LoginPageComponent.prototype.doLogin = function () {
        var _this = this;
        if (this.username && this.password) {
            var credentials = {
                username: this.username,
                password: this.password
            };
            this.accountService.login(credentials).subscribe(function (res) {
                _this.proccessing = false;
            }, function (err) {
                _this.proccessing = false;
                _this.toastHelper.showToast(err.message);
            });
        }
        else {
            this.proccessing = false;
            this.toastHelper.showToast('Informe o documento e o password');
        }
    };
    LoginPageComponent.prototype.register = function () {
        var _this = this;
        if (this.validateForm()) {
            this.enroll = {
                password: this.password,
                document: {
                    value: this.username,
                    type: this.optionsType[this.type]
                },
                phone: {
                    number: variables_1.formatPhoneNumber(this.phoneNumber),
                    networkOperator: variables_1.mobileOperatorList()[this.operator + 1]
                }
            };
            this.accountService.saveRegister(this.enroll).subscribe(function (res) {
                if (res.success) {
                    _this.resetFields();
                    _this.toastHelper.showToast('Usuário cadastrado');
                }
                else {
                    _this.toastHelper.showToast(res.errors[0].code + " " + res.errors[0].message);
                    _this.proccessing = false;
                }
            }, function (err) { return _this.proccessing = false; });
        }
        else {
            this.proccessing = false;
        }
    };
    LoginPageComponent.prototype.validateForm = function () {
        var valid = true;
        if (!this.password) {
            valid = false;
            this.errorMessage.password = 'Preencha o password';
        }
        if (this.password) {
            if (this.confirmPassword !== this.password) {
                valid = false;
                this.errorMessage.confirmPassword = 'Informe o mesmo password';
            }
        }
        var type = this.optionsType[this.type];
        if (!type) {
            valid = false;
            this.errorMessage.type = 'Preencha o tipo';
        }
        var operator = this.operatorlist[this.operator];
        if (!operator) {
            valid = false;
            this.errorMessage.operator = 'Preencha a operadora';
        }
        if (!this.username) {
            valid = false;
            this.errorMessage.username = 'Preencha o documento';
        }
        if (!this.phoneNumber) {
            valid = false;
            this.errorMessage.phoneNumber = 'Preencha o telefone';
        }
        if (valid) {
            this.errorMessage = {};
        }
        return valid;
    };
    LoginPageComponent.prototype.resetFields = function () {
        this.phoneNumber = '';
        this.password = '';
        this.operator = '';
        this.type = '';
        this.confirmPassword = '';
        this.proccessing = false;
        this.showRegister = false;
    };
    LoginPageComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'LoginPage',
            templateUrl: './login.component.html',
            styleUrls: ['./login.component.css']
        }),
        __metadata("design:paramtypes", [page_1.Page, toast_helper_service_1.ToastHelperService, account_service_1.AccountService])
    ], LoginPageComponent);
    return LoginPageComponent;
}());
exports.LoginPageComponent = LoginPageComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibG9naW4uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQXdGO0FBQ3hGLHNEQUFxRDtBQUVyRCxxRUFBa0U7QUFDbEUsK0RBQTZEO0FBRTdELGdEQUEyRTtBQVEzRTtJQWdCRSw0QkFBb0IsSUFBVSxFQUFVLFdBQStCLEVBQVUsY0FBOEI7UUFBM0YsU0FBSSxHQUFKLElBQUksQ0FBTTtRQUFVLGdCQUFXLEdBQVgsV0FBVyxDQUFvQjtRQUFVLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQVAvRyxnQkFBVyxHQUFHLEtBQUssQ0FBQztRQUNwQixpQkFBWSxHQUFHLEtBQUssQ0FBQztRQUVyQixpQkFBWSxHQUFRLEVBQUUsQ0FBQztJQUkyRixDQUFDO0lBRW5ILHFDQUFRLEdBQVI7UUFDRSxJQUFJLENBQUMsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUM7UUFDakMsSUFBSSxDQUFDLFdBQVcsR0FBRyxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsQ0FBQztRQUNuQyxJQUFJLENBQUMsWUFBWSxHQUFHLDhCQUFrQixFQUFFLENBQUMsR0FBRyxDQUFDLFVBQUEsSUFBSTtZQUMvQyxPQUFPLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1FBQ2xDLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELHdDQUFXLEdBQVg7UUFDRSxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQztRQUV4QixJQUFJLElBQUksQ0FBQyxZQUFZLEVBQUU7WUFDckIsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1NBQ2pCO2FBQU07WUFDTCxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7U0FDaEI7SUFDSCxDQUFDO0lBRUQsNkNBQWdCLEdBQWhCO1FBQ0UsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUM7SUFDM0IsQ0FBQztJQUVPLG9DQUFPLEdBQWY7UUFB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SVUsa0JBQWtCO1FBTjlCLGdCQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsUUFBUSxFQUFFLFdBQVc7WUFDckIsV0FBVyxFQUFFLHdCQUF3QjtZQUNyQyxTQUFTLEVBQUUsQ0FBQyx1QkFBdUIsQ0FBQztTQUNyQyxDQUFDO3lDQWlCMEIsV0FBSSxFQUF1Qix5Q0FBa0IsRUFBMEIsZ0NBQWM7T0FoQnBHLGtCQUFrQixDQTZJOUI7SUFBRCx5QkFBQztDQUFBLEFBN0lELElBNklDO0FBN0lZLGdEQUFrQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBWaWV3Q2hpbGQsIEVsZW1lbnRSZWYsIEFmdGVyVmlld0luaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFBhZ2UgfSBmcm9tICd0bnMtY29yZS1tb2R1bGVzL3VpL3BhZ2UvcGFnZSc7XG5pbXBvcnQgeyBDcmVkZW50aWFscyB9IGZyb20gJy4uL21vZGVscy9jcmVkZW50aWFscyc7XG5pbXBvcnQgeyBUb2FzdEhlbHBlclNlcnZpY2UgfSBmcm9tICcuLi9jb3JlL3RvYXN0LWhlbHBlci5zZXJ2aWNlJztcbmltcG9ydCB7IEFjY291bnRTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvYWNjb3VudC5zZXJ2aWNlJztcbmltcG9ydCB7IEh0dHBFcnJvclJlc3BvbnNlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgbW9iaWxlT3BlcmF0b3JMaXN0LCBmb3JtYXRQaG9uZU51bWJlciB9IGZyb20gJy4uL3V0aWxzL3ZhcmlhYmxlcyc7XG5pbXBvcnQgeyBFbnJvbGwgfSBmcm9tICcuLi9tb2RlbHMvZW5yb2xsJztcbkBDb21wb25lbnQoe1xuICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICBzZWxlY3RvcjogJ0xvZ2luUGFnZScsXG4gIHRlbXBsYXRlVXJsOiAnLi9sb2dpbi5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL2xvZ2luLmNvbXBvbmVudC5jc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBMb2dpblBhZ2VDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBvcHRpb25zVHlwZTogQXJyYXk8c3RyaW5nPjtcbiAgb3BlcmF0b3JsaXN0OiBBcnJheTxzdHJpbmc+O1xuICB1c2VybmFtZTogc3RyaW5nO1xuICBwYXNzd29yZDogc3RyaW5nO1xuICBjb25maXJtUGFzc3dvcmQ6IHN0cmluZztcbiAgdHlwZTogc3RyaW5nO1xuICBvcGVyYXRvcjogc3RyaW5nO1xuICBwaG9uZU51bWJlcjogc3RyaW5nO1xuICBwcm9jY2Vzc2luZyA9IGZhbHNlO1xuICBzaG93UmVnaXN0ZXIgPSBmYWxzZTtcblxuICBlcnJvck1lc3NhZ2U6IGFueSA9IHt9O1xuXG4gIGVucm9sbDogRW5yb2xsO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcGFnZTogUGFnZSwgcHJpdmF0ZSB0b2FzdEhlbHBlcjogVG9hc3RIZWxwZXJTZXJ2aWNlLCBwcml2YXRlIGFjY291bnRTZXJ2aWNlOiBBY2NvdW50U2VydmljZSkge31cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLnBhZ2UuYWN0aW9uQmFySGlkZGVuID0gdHJ1ZTtcbiAgICB0aGlzLm9wdGlvbnNUeXBlID0gWydDUEYnLCAnQ05QSiddO1xuICAgIHRoaXMub3BlcmF0b3JsaXN0ID0gbW9iaWxlT3BlcmF0b3JMaXN0KCkubWFwKGl0ZW0gPT4ge1xuICAgICAgcmV0dXJuIGl0ZW0udG9Mb2NhbGVVcHBlckNhc2UoKTtcbiAgICB9KTtcbiAgfVxuXG4gIHN1Ym1pdExvZ2luKCk6IHZvaWQge1xuICAgIHRoaXMucHJvY2Nlc3NpbmcgPSB0cnVlO1xuXG4gICAgaWYgKHRoaXMuc2hvd1JlZ2lzdGVyKSB7XG4gICAgICB0aGlzLnJlZ2lzdGVyKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZG9Mb2dpbigpO1xuICAgIH1cbiAgfVxuXG4gIHNob3dSZWdpc3RlckZvcm0oKSB7XG4gICAgdGhpcy5zaG93UmVnaXN0ZXIgPSB0cnVlO1xuICB9XG5cbiAgcHJpdmF0ZSBkb0xvZ2luKCkge1xuICAgIGlmICh0aGlzLnVzZXJuYW1lICYmIHRoaXMucGFzc3dvcmQpIHtcbiAgICAgIGNvbnN0IGNyZWRlbnRpYWxzOiBDcmVkZW50aWFscyA9IHtcbiAgICAgICAgdXNlcm5hbWU6IHRoaXMudXNlcm5hbWUsXG4gICAgICAgIHBhc3N3b3JkOiB0aGlzLnBhc3N3b3JkXG4gICAgICB9O1xuICAgICAgdGhpcy5hY2NvdW50U2VydmljZS5sb2dpbihjcmVkZW50aWFscykuc3Vic2NyaWJlKFxuICAgICAgICByZXMgPT4ge1xuICAgICAgICAgIHRoaXMucHJvY2Nlc3NpbmcgPSBmYWxzZTtcbiAgICAgICAgfSxcbiAgICAgICAgKGVycjogSHR0cEVycm9yUmVzcG9uc2UpID0+IHtcbiAgICAgICAgICB0aGlzLnByb2NjZXNzaW5nID0gZmFsc2U7XG4gICAgICAgICAgdGhpcy50b2FzdEhlbHBlci5zaG93VG9hc3QoZXJyLm1lc3NhZ2UpO1xuICAgICAgICB9XG4gICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnByb2NjZXNzaW5nID0gZmFsc2U7XG4gICAgICB0aGlzLnRvYXN0SGVscGVyLnNob3dUb2FzdCgnSW5mb3JtZSBvIGRvY3VtZW50byBlIG8gcGFzc3dvcmQnKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHJlZ2lzdGVyKCkge1xuICAgIGlmICh0aGlzLnZhbGlkYXRlRm9ybSgpKSB7XG4gICAgICB0aGlzLmVucm9sbCA9IHtcbiAgICAgICAgcGFzc3dvcmQ6IHRoaXMucGFzc3dvcmQsXG4gICAgICAgIGRvY3VtZW50OiB7XG4gICAgICAgICAgdmFsdWU6IHRoaXMudXNlcm5hbWUsXG4gICAgICAgICAgdHlwZTogdGhpcy5vcHRpb25zVHlwZVt0aGlzLnR5cGVdXG4gICAgICAgIH0sXG4gICAgICAgIHBob25lOiB7XG4gICAgICAgICAgbnVtYmVyOiBmb3JtYXRQaG9uZU51bWJlcih0aGlzLnBob25lTnVtYmVyKSxcbiAgICAgICAgICBuZXR3b3JrT3BlcmF0b3I6IG1vYmlsZU9wZXJhdG9yTGlzdCgpW3RoaXMub3BlcmF0b3IgKyAxXVxuICAgICAgICB9XG4gICAgICB9O1xuXG4gICAgICB0aGlzLmFjY291bnRTZXJ2aWNlLnNhdmVSZWdpc3Rlcih0aGlzLmVucm9sbCkuc3Vic2NyaWJlKHJlcyA9PiB7XG4gICAgICAgIGlmKHJlcy5zdWNjZXNzKXtcbiAgICAgICAgICB0aGlzLnJlc2V0RmllbGRzKCk7XG4gICAgICAgICAgdGhpcy50b2FzdEhlbHBlci5zaG93VG9hc3QoJ1VzdcOhcmlvIGNhZGFzdHJhZG8nKTtcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgdGhpcy50b2FzdEhlbHBlci5zaG93VG9hc3QoYCR7cmVzLmVycm9yc1swXS5jb2RlfSAke3Jlcy5lcnJvcnNbMF0ubWVzc2FnZX1gKTtcbiAgICAgICAgICB0aGlzLnByb2NjZXNzaW5nID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICB9LGVyciA9PiB0aGlzLnByb2NjZXNzaW5nID0gZmFsc2UpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnByb2NjZXNzaW5nID0gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSB2YWxpZGF0ZUZvcm0oKTogYm9vbGVhbiB7XG4gICAgbGV0IHZhbGlkID0gdHJ1ZTtcbiAgICBpZiAoIXRoaXMucGFzc3dvcmQpIHtcbiAgICAgIHZhbGlkID0gZmFsc2U7XG4gICAgICB0aGlzLmVycm9yTWVzc2FnZS5wYXNzd29yZCA9ICdQcmVlbmNoYSBvIHBhc3N3b3JkJztcbiAgICB9XG4gICAgaWYgKHRoaXMucGFzc3dvcmQpIHtcbiAgICAgIGlmICh0aGlzLmNvbmZpcm1QYXNzd29yZCAhPT0gdGhpcy5wYXNzd29yZCkge1xuICAgICAgICB2YWxpZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLmVycm9yTWVzc2FnZS5jb25maXJtUGFzc3dvcmQgPSAnSW5mb3JtZSBvIG1lc21vIHBhc3N3b3JkJztcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCB0eXBlID0gdGhpcy5vcHRpb25zVHlwZVt0aGlzLnR5cGVdO1xuICAgIGlmICghdHlwZSkge1xuICAgICAgdmFsaWQgPSBmYWxzZTtcbiAgICAgIHRoaXMuZXJyb3JNZXNzYWdlLnR5cGUgPSAnUHJlZW5jaGEgbyB0aXBvJztcbiAgICB9XG5cbiAgICBjb25zdCBvcGVyYXRvciA9IHRoaXMub3BlcmF0b3JsaXN0W3RoaXMub3BlcmF0b3JdO1xuICAgIGlmICghb3BlcmF0b3IpIHtcbiAgICAgIHZhbGlkID0gZmFsc2U7XG4gICAgICB0aGlzLmVycm9yTWVzc2FnZS5vcGVyYXRvciA9ICdQcmVlbmNoYSBhIG9wZXJhZG9yYSc7XG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLnVzZXJuYW1lKSB7XG4gICAgICB2YWxpZCA9IGZhbHNlO1xuICAgICAgdGhpcy5lcnJvck1lc3NhZ2UudXNlcm5hbWUgPSAnUHJlZW5jaGEgbyBkb2N1bWVudG8nO1xuICAgIH1cblxuICAgIGlmICghdGhpcy5waG9uZU51bWJlcikge1xuICAgICAgdmFsaWQgPSBmYWxzZTtcbiAgICAgIHRoaXMuZXJyb3JNZXNzYWdlLnBob25lTnVtYmVyID0gJ1ByZWVuY2hhIG8gdGVsZWZvbmUnO1xuICAgIH1cblxuICAgIGlmICh2YWxpZCkge1xuICAgICAgdGhpcy5lcnJvck1lc3NhZ2UgPSB7fTtcbiAgICB9XG5cbiAgICByZXR1cm4gdmFsaWQ7XG4gIH1cblxuICBwcml2YXRlIHJlc2V0RmllbGRzKCk6IHZvaWQge1xuICAgIHRoaXMucGhvbmVOdW1iZXIgPSAnJztcbiAgICB0aGlzLnBhc3N3b3JkID0gJyc7XG4gICAgdGhpcy5vcGVyYXRvciA9ICcnO1xuICAgIHRoaXMudHlwZSA9ICcnO1xuICAgIHRoaXMuY29uZmlybVBhc3N3b3JkID0gJyc7XG4gICAgdGhpcy5wcm9jY2Vzc2luZyA9IGZhbHNlO1xuICAgIHRoaXMuc2hvd1JlZ2lzdGVyID0gZmFsc2U7XG4gIH1cbn1cbiJdfQ==