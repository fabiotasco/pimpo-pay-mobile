"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var page_1 = require("tns-core-modules/ui/page/page");
var CurrencyMaskPtComponent = /** @class */ (function () {
    function CurrencyMaskPtComponent(page) {
        this.page = page;
        this.className = 'input-field';
        this.isEnabled = true;
        this.blur = new core_1.EventEmitter();
        this.propagateChange = function (_) { };
    }
    CurrencyMaskPtComponent_1 = CurrencyMaskPtComponent;
    CurrencyMaskPtComponent.prototype.ngOnInit = function () {
        this.fieldValue = this.page.getViewById('fieldValue');
    };
    CurrencyMaskPtComponent.prototype.writeValue = function (obj) {
        if (obj) {
            this.inputValue = obj;
        }
    };
    CurrencyMaskPtComponent.prototype.registerOnChange = function (fn) {
        this.propagateChange = fn;
    };
    CurrencyMaskPtComponent.prototype.registerOnTouched = function (fn) { };
    CurrencyMaskPtComponent.prototype.setDisabledState = function (isDisabled) { };
    CurrencyMaskPtComponent.prototype.changeValue = function (event) {
        if (event.object.text) {
            var value = event.object.text;
            value = value.replace(/\D/, '');
            value = value.replace(',', ''); // para conter o bug do replace
            value = value.replace('.', ''); // de nao substituir todos os caracteres.
            value = value.replace('.', '');
            if (value.length === 3) {
                value = value.replace(/(\d{1})(\d{2})/, '$1,$2');
            }
            else if (value.length === 4) {
                value = value.replace(/(\d{2})(\d{2})/, '$1,$2');
            }
            else if (value.length === 5) {
                value = value.replace(/(\d{3})(\d{2})/, '$1,$2');
            }
            else if (value.length === 6) {
                value = value.replace(/(\d{1})(\d{3})(\d{2})/, '$1.$2,$3');
            }
            else if (value.length === 7) {
                value = value.replace(/(\d{2})(\d{3})(\d{2})/, '$1.$2,$3');
            }
            else if (value.length === 8) {
                value = value.replace(/(\d{3})(\d{3})(\d{2})/, '$1.$2,$3');
            }
            else if (value.length === 9) {
                value = value.replace(/(\d{1})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3,$4');
            }
            else if (value.length === 10) {
                value = value.replace(/(\d{2})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3,$4');
            }
            else if (value.length === 11) {
                value = value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3,$4');
            }
            else if (value.length === 12) {
                value = value.replace(/(\d{1})(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3.$4,$5');
            }
            else {
                value = value.replace(/(\d{10,})(\d{2})/, '$1.$2');
            }
            this.inputValue = value;
            if (this.page.android) {
                this.fieldValue.android.setSelection(this.fieldValue.android.length());
            }
            var resetedValue = this.prepareToPropagate(value);
            this.propagateChange(resetedValue);
        }
    };
    CurrencyMaskPtComponent.prototype.focusOut = function (event) {
        this.blur.emit(event);
    };
    CurrencyMaskPtComponent.prototype.prepareToPropagate = function (value) {
        value = value.replace(/\D/, '');
        value = value.replace(',', ''); // para conter o bug do replace
        value = value.replace('.', ''); // de nao substituir todos os caracteres.
        value = value.replace('.', '');
        var integerPart = value.slice(0, value.length - 2);
        var decimalPart = value.slice(value.length - 2);
        return parseFloat(integerPart + '.' + decimalPart).toFixed(2);
    };
    var CurrencyMaskPtComponent_1;
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], CurrencyMaskPtComponent.prototype, "hint", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], CurrencyMaskPtComponent.prototype, "className", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], CurrencyMaskPtComponent.prototype, "returnKeyType", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], CurrencyMaskPtComponent.prototype, "isEnabled", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], CurrencyMaskPtComponent.prototype, "colSpan", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], CurrencyMaskPtComponent.prototype, "row", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], CurrencyMaskPtComponent.prototype, "col", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], CurrencyMaskPtComponent.prototype, "blur", void 0);
    CurrencyMaskPtComponent = CurrencyMaskPtComponent_1 = __decorate([
        core_1.Component({
            moduleId: module.id,
            templateUrl: './nativescript-currency-mask.component.html',
            selector: 'TextFieldCurrency',
            providers: [
                {
                    provide: forms_1.NG_VALUE_ACCESSOR,
                    useExisting: core_1.forwardRef(function () { return CurrencyMaskPtComponent_1; }),
                    multi: true
                }
            ]
        }),
        __metadata("design:paramtypes", [page_1.Page])
    ], CurrencyMaskPtComponent);
    return CurrencyMaskPtComponent;
}());
exports.CurrencyMaskPtComponent = CurrencyMaskPtComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmF0aXZlc2NyaXB0LWN1cnJlbmN5LW1hc2suY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibmF0aXZlc2NyaXB0LWN1cnJlbmN5LW1hc2suY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQTJGO0FBQzNGLHdDQUF5RTtBQUV6RSxzREFBcUQ7QUFjckQ7SUF5QkUsaUNBQW9CLElBQVU7UUFBVixTQUFJLEdBQUosSUFBSSxDQUFNO1FBckI5QixjQUFTLEdBQVcsYUFBYSxDQUFDO1FBSWxDLGNBQVMsR0FBRyxJQUFJLENBQUM7UUFXakIsU0FBSSxHQUFHLElBQUksbUJBQVksRUFBRSxDQUFDO1FBSWxCLG9CQUFlLEdBQUcsVUFBQyxDQUFNLElBQU0sQ0FBQyxDQUFDO0lBRVIsQ0FBQztnQ0F6QnZCLHVCQUF1QjtJQTJCbEMsMENBQVEsR0FBUjtRQUNFLElBQUksQ0FBQyxVQUFVLEdBQWMsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUM7SUFDbkUsQ0FBQztJQUVELDRDQUFVLEdBQVYsVUFBVyxHQUFRO1FBQ2pCLElBQUksR0FBRyxFQUFFO1lBQ1AsSUFBSSxDQUFDLFVBQVUsR0FBRyxHQUFHLENBQUM7U0FDdkI7SUFDSCxDQUFDO0lBRUQsa0RBQWdCLEdBQWhCLFVBQWlCLEVBQU87UUFDdEIsSUFBSSxDQUFDLGVBQWUsR0FBRyxFQUFFLENBQUM7SUFDNUIsQ0FBQztJQUVELG1EQUFpQixHQUFqQixVQUFrQixFQUFPLElBQVMsQ0FBQztJQUNuQyxrREFBZ0IsR0FBaEIsVUFBa0IsVUFBbUIsSUFBUyxDQUFDO0lBRS9DLDZDQUFXLEdBQVgsVUFBWSxLQUFVO1FBQ3BCLElBQUksS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUU7WUFDckIsSUFBSSxLQUFLLEdBQVcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7WUFFdEMsS0FBSyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQ2hDLEtBQUssR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLCtCQUErQjtZQUMvRCxLQUFLLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyx5Q0FBeUM7WUFDekUsS0FBSyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBRS9CLElBQUksS0FBSyxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7Z0JBQ3RCLEtBQUssR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLGdCQUFnQixFQUFFLE9BQU8sQ0FBQyxDQUFDO2FBQ2xEO2lCQUFNLElBQUksS0FBSyxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7Z0JBQzdCLEtBQUssR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLGdCQUFnQixFQUFFLE9BQU8sQ0FBQyxDQUFDO2FBQ2xEO2lCQUFNLElBQUksS0FBSyxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7Z0JBQzdCLEtBQUssR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLGdCQUFnQixFQUFFLE9BQU8sQ0FBQyxDQUFDO2FBQ2xEO2lCQUFNLElBQUksS0FBSyxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7Z0JBQzdCLEtBQUssR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLHVCQUF1QixFQUFFLFVBQVUsQ0FBQyxDQUFDO2FBQzVEO2lCQUFNLElBQUksS0FBSyxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7Z0JBQzdCLEtBQUssR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLHVCQUF1QixFQUFFLFVBQVUsQ0FBQyxDQUFDO2FBQzVEO2lCQUFNLElBQUksS0FBSyxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7Z0JBQzdCLEtBQUssR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLHVCQUF1QixFQUFFLFVBQVUsQ0FBQyxDQUFDO2FBQzVEO2lCQUFNLElBQUksS0FBSyxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7Z0JBQzdCLEtBQUssR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLDhCQUE4QixFQUFFLGFBQWEsQ0FBQyxDQUFDO2FBQ3RFO2lCQUFNLElBQUksS0FBSyxDQUFDLE1BQU0sS0FBSyxFQUFFLEVBQUU7Z0JBQzlCLEtBQUssR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLDhCQUE4QixFQUFFLGFBQWEsQ0FBQyxDQUFDO2FBQ3RFO2lCQUFNLElBQUksS0FBSyxDQUFDLE1BQU0sS0FBSyxFQUFFLEVBQUU7Z0JBQzlCLEtBQUssR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLDhCQUE4QixFQUFFLGFBQWEsQ0FBQyxDQUFDO2FBQ3RFO2lCQUFNLElBQUksS0FBSyxDQUFDLE1BQU0sS0FBSyxFQUFFLEVBQUU7Z0JBQzlCLEtBQUssR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLHFDQUFxQyxFQUFFLGdCQUFnQixDQUFDLENBQUM7YUFDaEY7aUJBQU07Z0JBQ0wsS0FBSyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsa0JBQWtCLEVBQUUsT0FBTyxDQUFDLENBQUM7YUFDcEQ7WUFFRCxJQUFJLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQztZQUN4QixJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFO2dCQUNyQixJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQzthQUN4RTtZQUVELElBQU0sWUFBWSxHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNwRCxJQUFJLENBQUMsZUFBZSxDQUFDLFlBQVksQ0FBQyxDQUFDO1NBQ3BDO0lBQ0gsQ0FBQztJQUVELDBDQUFRLEdBQVIsVUFBUyxLQUFVO1FBQ2pCLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3hCLENBQUM7SUFFTyxvREFBa0IsR0FBMUIsVUFBMkIsS0FBYTtRQUN0QyxLQUFLLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDaEMsS0FBSyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsK0JBQStCO1FBQy9ELEtBQUssR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLHlDQUF5QztRQUN6RSxLQUFLLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFFL0IsSUFBTSxXQUFXLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQztRQUNyRCxJQUFNLFdBQVcsR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDbEQsT0FBTyxVQUFVLENBQUMsV0FBVyxHQUFHLEdBQUcsR0FBRyxXQUFXLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDaEUsQ0FBQzs7SUFsR0Q7UUFEQyxZQUFLLEVBQUU7O3lEQUNLO0lBRWI7UUFEQyxZQUFLLEVBQUU7OzhEQUMwQjtJQUVsQztRQURDLFlBQUssRUFBRTs7a0VBQ2M7SUFFdEI7UUFEQyxZQUFLLEVBQUU7OzhEQUNTO0lBR2pCO1FBREMsWUFBSyxFQUFFOzs0REFDUTtJQUdoQjtRQURDLFlBQUssRUFBRTs7d0RBQ0k7SUFFWjtRQURDLFlBQUssRUFBRTs7d0RBQ0k7SUFHWjtRQURDLGFBQU0sRUFBRTs7eURBQ2lCO0lBbkJmLHVCQUF1QjtRQVpuQyxnQkFBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFdBQVcsRUFBRSw2Q0FBNkM7WUFDMUQsUUFBUSxFQUFFLG1CQUFtQjtZQUM3QixTQUFTLEVBQUU7Z0JBQ1Q7b0JBQ0UsT0FBTyxFQUFFLHlCQUFpQjtvQkFDMUIsV0FBVyxFQUFFLGlCQUFVLENBQUMsY0FBTSxPQUFBLHlCQUF1QixFQUF2QixDQUF1QixDQUFDO29CQUN0RCxLQUFLLEVBQUUsSUFBSTtpQkFDWjthQUNGO1NBQ0YsQ0FBQzt5Q0EwQjBCLFdBQUk7T0F6Qm5CLHVCQUF1QixDQXFHbkM7SUFBRCw4QkFBQztDQUFBLEFBckdELElBcUdDO0FBckdZLDBEQUF1QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGZvcndhcmRSZWYsIE9uSW5pdCwgQ29tcG9uZW50LCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBOR19WQUxVRV9BQ0NFU1NPUiB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IFRleHRGaWVsZCB9IGZyb20gJ3Rucy1jb3JlLW1vZHVsZXMvdWkvdGV4dC1maWVsZCc7XG5pbXBvcnQgeyBQYWdlIH0gZnJvbSAndG5zLWNvcmUtbW9kdWxlcy91aS9wYWdlL3BhZ2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgdGVtcGxhdGVVcmw6ICcuL25hdGl2ZXNjcmlwdC1jdXJyZW5jeS1tYXNrLmNvbXBvbmVudC5odG1sJyxcbiAgc2VsZWN0b3I6ICdUZXh0RmllbGRDdXJyZW5jeScsXG4gIHByb3ZpZGVyczogW1xuICAgIHtcbiAgICAgIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICAgICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gQ3VycmVuY3lNYXNrUHRDb21wb25lbnQpLFxuICAgICAgbXVsdGk6IHRydWVcbiAgICB9XG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgQ3VycmVuY3lNYXNrUHRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIENvbnRyb2xWYWx1ZUFjY2Vzc29yIHtcbiAgQElucHV0KClcbiAgaGludDogc3RyaW5nO1xuICBASW5wdXQoKVxuICBjbGFzc05hbWU6IHN0cmluZyA9ICdpbnB1dC1maWVsZCc7XG4gIEBJbnB1dCgpXG4gIHJldHVybktleVR5cGU6IHN0cmluZztcbiAgQElucHV0KClcbiAgaXNFbmFibGVkID0gdHJ1ZTtcblxuICBASW5wdXQoKVxuICBjb2xTcGFuOiBzdHJpbmc7XG5cbiAgQElucHV0KClcbiAgcm93OiBzdHJpbmc7XG4gIEBJbnB1dCgpXG4gIGNvbDogc3RyaW5nO1xuXG4gIEBPdXRwdXQoKVxuICBibHVyID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIGlucHV0VmFsdWU6IHN0cmluZztcbiAgcHJpdmF0ZSBmaWVsZFZhbHVlOiBUZXh0RmllbGQ7XG4gIHByaXZhdGUgcHJvcGFnYXRlQ2hhbmdlID0gKF86IGFueSkgPT4ge307XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBwYWdlOiBQYWdlKSB7fVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuZmllbGRWYWx1ZSA9IDxUZXh0RmllbGQ+dGhpcy5wYWdlLmdldFZpZXdCeUlkKCdmaWVsZFZhbHVlJyk7XG4gIH1cblxuICB3cml0ZVZhbHVlKG9iajogYW55KTogdm9pZCB7XG4gICAgaWYgKG9iaikge1xuICAgICAgdGhpcy5pbnB1dFZhbHVlID0gb2JqO1xuICAgIH1cbiAgfVxuXG4gIHJlZ2lzdGVyT25DaGFuZ2UoZm46IGFueSk6IHZvaWQge1xuICAgIHRoaXMucHJvcGFnYXRlQ2hhbmdlID0gZm47XG4gIH1cblxuICByZWdpc3Rlck9uVG91Y2hlZChmbjogYW55KTogdm9pZCB7fVxuICBzZXREaXNhYmxlZFN0YXRlPyhpc0Rpc2FibGVkOiBib29sZWFuKTogdm9pZCB7fVxuXG4gIGNoYW5nZVZhbHVlKGV2ZW50OiBhbnkpIHtcbiAgICBpZiAoZXZlbnQub2JqZWN0LnRleHQpIHtcbiAgICAgIGxldCB2YWx1ZTogc3RyaW5nID0gZXZlbnQub2JqZWN0LnRleHQ7XG5cbiAgICAgIHZhbHVlID0gdmFsdWUucmVwbGFjZSgvXFxELywgJycpO1xuICAgICAgdmFsdWUgPSB2YWx1ZS5yZXBsYWNlKCcsJywgJycpOyAvLyBwYXJhIGNvbnRlciBvIGJ1ZyBkbyByZXBsYWNlXG4gICAgICB2YWx1ZSA9IHZhbHVlLnJlcGxhY2UoJy4nLCAnJyk7IC8vIGRlIG5hbyBzdWJzdGl0dWlyIHRvZG9zIG9zIGNhcmFjdGVyZXMuXG4gICAgICB2YWx1ZSA9IHZhbHVlLnJlcGxhY2UoJy4nLCAnJyk7XG5cbiAgICAgIGlmICh2YWx1ZS5sZW5ndGggPT09IDMpIHtcbiAgICAgICAgdmFsdWUgPSB2YWx1ZS5yZXBsYWNlKC8oXFxkezF9KShcXGR7Mn0pLywgJyQxLCQyJyk7XG4gICAgICB9IGVsc2UgaWYgKHZhbHVlLmxlbmd0aCA9PT0gNCkge1xuICAgICAgICB2YWx1ZSA9IHZhbHVlLnJlcGxhY2UoLyhcXGR7Mn0pKFxcZHsyfSkvLCAnJDEsJDInKTtcbiAgICAgIH0gZWxzZSBpZiAodmFsdWUubGVuZ3RoID09PSA1KSB7XG4gICAgICAgIHZhbHVlID0gdmFsdWUucmVwbGFjZSgvKFxcZHszfSkoXFxkezJ9KS8sICckMSwkMicpO1xuICAgICAgfSBlbHNlIGlmICh2YWx1ZS5sZW5ndGggPT09IDYpIHtcbiAgICAgICAgdmFsdWUgPSB2YWx1ZS5yZXBsYWNlKC8oXFxkezF9KShcXGR7M30pKFxcZHsyfSkvLCAnJDEuJDIsJDMnKTtcbiAgICAgIH0gZWxzZSBpZiAodmFsdWUubGVuZ3RoID09PSA3KSB7XG4gICAgICAgIHZhbHVlID0gdmFsdWUucmVwbGFjZSgvKFxcZHsyfSkoXFxkezN9KShcXGR7Mn0pLywgJyQxLiQyLCQzJyk7XG4gICAgICB9IGVsc2UgaWYgKHZhbHVlLmxlbmd0aCA9PT0gOCkge1xuICAgICAgICB2YWx1ZSA9IHZhbHVlLnJlcGxhY2UoLyhcXGR7M30pKFxcZHszfSkoXFxkezJ9KS8sICckMS4kMiwkMycpO1xuICAgICAgfSBlbHNlIGlmICh2YWx1ZS5sZW5ndGggPT09IDkpIHtcbiAgICAgICAgdmFsdWUgPSB2YWx1ZS5yZXBsYWNlKC8oXFxkezF9KShcXGR7M30pKFxcZHszfSkoXFxkezJ9KS8sICckMS4kMi4kMywkNCcpO1xuICAgICAgfSBlbHNlIGlmICh2YWx1ZS5sZW5ndGggPT09IDEwKSB7XG4gICAgICAgIHZhbHVlID0gdmFsdWUucmVwbGFjZSgvKFxcZHsyfSkoXFxkezN9KShcXGR7M30pKFxcZHsyfSkvLCAnJDEuJDIuJDMsJDQnKTtcbiAgICAgIH0gZWxzZSBpZiAodmFsdWUubGVuZ3RoID09PSAxMSkge1xuICAgICAgICB2YWx1ZSA9IHZhbHVlLnJlcGxhY2UoLyhcXGR7M30pKFxcZHszfSkoXFxkezN9KShcXGR7Mn0pLywgJyQxLiQyLiQzLCQ0Jyk7XG4gICAgICB9IGVsc2UgaWYgKHZhbHVlLmxlbmd0aCA9PT0gMTIpIHtcbiAgICAgICAgdmFsdWUgPSB2YWx1ZS5yZXBsYWNlKC8oXFxkezF9KShcXGR7M30pKFxcZHszfSkoXFxkezN9KShcXGR7Mn0pLywgJyQxLiQyLiQzLiQ0LCQ1Jyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YWx1ZSA9IHZhbHVlLnJlcGxhY2UoLyhcXGR7MTAsfSkoXFxkezJ9KS8sICckMS4kMicpO1xuICAgICAgfVxuXG4gICAgICB0aGlzLmlucHV0VmFsdWUgPSB2YWx1ZTtcbiAgICAgIGlmICh0aGlzLnBhZ2UuYW5kcm9pZCkge1xuICAgICAgICB0aGlzLmZpZWxkVmFsdWUuYW5kcm9pZC5zZXRTZWxlY3Rpb24odGhpcy5maWVsZFZhbHVlLmFuZHJvaWQubGVuZ3RoKCkpO1xuICAgICAgfVxuXG4gICAgICBjb25zdCByZXNldGVkVmFsdWUgPSB0aGlzLnByZXBhcmVUb1Byb3BhZ2F0ZSh2YWx1ZSk7XG4gICAgICB0aGlzLnByb3BhZ2F0ZUNoYW5nZShyZXNldGVkVmFsdWUpO1xuICAgIH1cbiAgfVxuXG4gIGZvY3VzT3V0KGV2ZW50OiBhbnkpIHtcbiAgICB0aGlzLmJsdXIuZW1pdChldmVudCk7XG4gIH1cblxuICBwcml2YXRlIHByZXBhcmVUb1Byb3BhZ2F0ZSh2YWx1ZTogc3RyaW5nKTogc3RyaW5nIHtcbiAgICB2YWx1ZSA9IHZhbHVlLnJlcGxhY2UoL1xcRC8sICcnKTtcbiAgICB2YWx1ZSA9IHZhbHVlLnJlcGxhY2UoJywnLCAnJyk7IC8vIHBhcmEgY29udGVyIG8gYnVnIGRvIHJlcGxhY2VcbiAgICB2YWx1ZSA9IHZhbHVlLnJlcGxhY2UoJy4nLCAnJyk7IC8vIGRlIG5hbyBzdWJzdGl0dWlyIHRvZG9zIG9zIGNhcmFjdGVyZXMuXG4gICAgdmFsdWUgPSB2YWx1ZS5yZXBsYWNlKCcuJywgJycpO1xuXG4gICAgY29uc3QgaW50ZWdlclBhcnQgPSB2YWx1ZS5zbGljZSgwLCB2YWx1ZS5sZW5ndGggLSAyKTtcbiAgICBjb25zdCBkZWNpbWFsUGFydCA9IHZhbHVlLnNsaWNlKHZhbHVlLmxlbmd0aCAtIDIpO1xuICAgIHJldHVybiBwYXJzZUZsb2F0KGludGVnZXJQYXJ0ICsgJy4nICsgZGVjaW1hbFBhcnQpLnRvRml4ZWQoMik7XG4gIH1cbn1cbiJdfQ==