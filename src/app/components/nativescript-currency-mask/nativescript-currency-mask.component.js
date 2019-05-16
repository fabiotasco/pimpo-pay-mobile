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
            selector: 'TextFieldCurrency,[TextFieldCurrency',
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmF0aXZlc2NyaXB0LWN1cnJlbmN5LW1hc2suY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibmF0aXZlc2NyaXB0LWN1cnJlbmN5LW1hc2suY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBT3VCO0FBQ3ZCLHdDQUF5RTtBQUV6RSxzREFBcUQ7QUFjckQ7SUF5QkUsaUNBQW9CLElBQVU7UUFBVixTQUFJLEdBQUosSUFBSSxDQUFNO1FBckI5QixjQUFTLEdBQVcsYUFBYSxDQUFDO1FBSWxDLGNBQVMsR0FBRyxJQUFJLENBQUM7UUFXakIsU0FBSSxHQUFHLElBQUksbUJBQVksRUFBRSxDQUFDO1FBSWxCLG9CQUFlLEdBQUcsVUFBQyxDQUFNLElBQU0sQ0FBQyxDQUFDO0lBRVIsQ0FBQztnQ0F6QnZCLHVCQUF1QjtJQTJCbEMsMENBQVEsR0FBUjtRQUNFLElBQUksQ0FBQyxVQUFVLEdBQWMsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUM7SUFDbkUsQ0FBQztJQUVELDRDQUFVLEdBQVYsVUFBVyxHQUFRO1FBQ2pCLElBQUksR0FBRyxFQUFFO1lBQ1AsSUFBSSxDQUFDLFVBQVUsR0FBRyxHQUFHLENBQUM7U0FDdkI7SUFDSCxDQUFDO0lBRUQsa0RBQWdCLEdBQWhCLFVBQWlCLEVBQU87UUFDdEIsSUFBSSxDQUFDLGVBQWUsR0FBRyxFQUFFLENBQUM7SUFDNUIsQ0FBQztJQUVELG1EQUFpQixHQUFqQixVQUFrQixFQUFPLElBQVMsQ0FBQztJQUNuQyxrREFBZ0IsR0FBaEIsVUFBa0IsVUFBbUIsSUFBUyxDQUFDO0lBRS9DLDZDQUFXLEdBQVgsVUFBWSxLQUFVO1FBQ3BCLElBQUksS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUU7WUFDckIsSUFBSSxLQUFLLEdBQVcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7WUFFdEMsS0FBSyxHQUFHLEtBQUssQ0FBQyxP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QVMsRUFBRTtnQkFDVDtvQkFDRSxPQUFPLEVBQUUseUJBQWlCO29CQUMxQixXQUFXLEVBQUUsaUJBQVUsQ0FBQyxjQUFNLE9BQUEseUJBQXVCLEVBQXZCLENBQXVCLENBQUM7b0JBQ3RELEtBQUssRUFBRSxJQUFJO2lCQUNaO2FBQ0Y7U0FDRixDQUFDO3lDQTBCMEIsV0FBSTtPQXpCbkIsdUJBQXVCLENBd0duQztJQUFELDhCQUFDO0NBQUEsQUF4R0QsSUF3R0M7QUF4R1ksMERBQXVCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgZm9yd2FyZFJlZixcbiAgT25Jbml0LFxuICBDb21wb25lbnQsXG4gIElucHV0LFxuICBPdXRwdXQsXG4gIEV2ZW50RW1pdHRlclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBOR19WQUxVRV9BQ0NFU1NPUiB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IFRleHRGaWVsZCB9IGZyb20gJ3VpL3RleHQtZmllbGQnO1xuaW1wb3J0IHsgUGFnZSB9IGZyb20gJ3Rucy1jb3JlLW1vZHVsZXMvdWkvcGFnZS9wYWdlJztcblxuQENvbXBvbmVudCh7XG4gIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gIHRlbXBsYXRlVXJsOiAnLi9uYXRpdmVzY3JpcHQtY3VycmVuY3ktbWFzay5jb21wb25lbnQuaHRtbCcsXG4gIHNlbGVjdG9yOiAnVGV4dEZpZWxkQ3VycmVuY3ksW1RleHRGaWVsZEN1cnJlbmN5JyxcbiAgcHJvdmlkZXJzOiBbXG4gICAge1xuICAgICAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gICAgICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBDdXJyZW5jeU1hc2tQdENvbXBvbmVudCksXG4gICAgICBtdWx0aTogdHJ1ZVxuICAgIH1cbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBDdXJyZW5jeU1hc2tQdENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgQ29udHJvbFZhbHVlQWNjZXNzb3Ige1xuICBASW5wdXQoKVxuICBoaW50OiBzdHJpbmc7XG4gIEBJbnB1dCgpXG4gIGNsYXNzTmFtZTogc3RyaW5nID0gJ2lucHV0LWZpZWxkJztcbiAgQElucHV0KClcbiAgcmV0dXJuS2V5VHlwZTogc3RyaW5nO1xuICBASW5wdXQoKVxuICBpc0VuYWJsZWQgPSB0cnVlO1xuXG4gIEBJbnB1dCgpXG4gIGNvbFNwYW46IHN0cmluZztcblxuICBASW5wdXQoKVxuICByb3c6IHN0cmluZztcbiAgQElucHV0KClcbiAgY29sOiBzdHJpbmc7XG5cbiAgQE91dHB1dCgpXG4gIGJsdXIgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgaW5wdXRWYWx1ZTogc3RyaW5nO1xuICBwcml2YXRlIGZpZWxkVmFsdWU6IFRleHRGaWVsZDtcbiAgcHJpdmF0ZSBwcm9wYWdhdGVDaGFuZ2UgPSAoXzogYW55KSA9PiB7fTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHBhZ2U6IFBhZ2UpIHt9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5maWVsZFZhbHVlID0gPFRleHRGaWVsZD50aGlzLnBhZ2UuZ2V0Vmlld0J5SWQoJ2ZpZWxkVmFsdWUnKTtcbiAgfVxuXG4gIHdyaXRlVmFsdWUob2JqOiBhbnkpOiB2b2lkIHtcbiAgICBpZiAob2JqKSB7XG4gICAgICB0aGlzLmlucHV0VmFsdWUgPSBvYmo7XG4gICAgfVxuICB9XG5cbiAgcmVnaXN0ZXJPbkNoYW5nZShmbjogYW55KTogdm9pZCB7XG4gICAgdGhpcy5wcm9wYWdhdGVDaGFuZ2UgPSBmbjtcbiAgfVxuXG4gIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBhbnkpOiB2b2lkIHt9XG4gIHNldERpc2FibGVkU3RhdGU/KGlzRGlzYWJsZWQ6IGJvb2xlYW4pOiB2b2lkIHt9XG5cbiAgY2hhbmdlVmFsdWUoZXZlbnQ6IGFueSkge1xuICAgIGlmIChldmVudC5vYmplY3QudGV4dCkge1xuICAgICAgbGV0IHZhbHVlOiBzdHJpbmcgPSBldmVudC5vYmplY3QudGV4dDtcblxuICAgICAgdmFsdWUgPSB2YWx1ZS5yZXBsYWNlKC9cXEQvLCAnJyk7XG4gICAgICB2YWx1ZSA9IHZhbHVlLnJlcGxhY2UoJywnLCAnJyk7IC8vIHBhcmEgY29udGVyIG8gYnVnIGRvIHJlcGxhY2VcbiAgICAgIHZhbHVlID0gdmFsdWUucmVwbGFjZSgnLicsICcnKTsgLy8gZGUgbmFvIHN1YnN0aXR1aXIgdG9kb3Mgb3MgY2FyYWN0ZXJlcy5cbiAgICAgIHZhbHVlID0gdmFsdWUucmVwbGFjZSgnLicsICcnKTtcblxuICAgICAgaWYgKHZhbHVlLmxlbmd0aCA9PT0gMykge1xuICAgICAgICB2YWx1ZSA9IHZhbHVlLnJlcGxhY2UoLyhcXGR7MX0pKFxcZHsyfSkvLCAnJDEsJDInKTtcbiAgICAgIH0gZWxzZSBpZiAodmFsdWUubGVuZ3RoID09PSA0KSB7XG4gICAgICAgIHZhbHVlID0gdmFsdWUucmVwbGFjZSgvKFxcZHsyfSkoXFxkezJ9KS8sICckMSwkMicpO1xuICAgICAgfSBlbHNlIGlmICh2YWx1ZS5sZW5ndGggPT09IDUpIHtcbiAgICAgICAgdmFsdWUgPSB2YWx1ZS5yZXBsYWNlKC8oXFxkezN9KShcXGR7Mn0pLywgJyQxLCQyJyk7XG4gICAgICB9IGVsc2UgaWYgKHZhbHVlLmxlbmd0aCA9PT0gNikge1xuICAgICAgICB2YWx1ZSA9IHZhbHVlLnJlcGxhY2UoLyhcXGR7MX0pKFxcZHszfSkoXFxkezJ9KS8sICckMS4kMiwkMycpO1xuICAgICAgfSBlbHNlIGlmICh2YWx1ZS5sZW5ndGggPT09IDcpIHtcbiAgICAgICAgdmFsdWUgPSB2YWx1ZS5yZXBsYWNlKC8oXFxkezJ9KShcXGR7M30pKFxcZHsyfSkvLCAnJDEuJDIsJDMnKTtcbiAgICAgIH0gZWxzZSBpZiAodmFsdWUubGVuZ3RoID09PSA4KSB7XG4gICAgICAgIHZhbHVlID0gdmFsdWUucmVwbGFjZSgvKFxcZHszfSkoXFxkezN9KShcXGR7Mn0pLywgJyQxLiQyLCQzJyk7XG4gICAgICB9IGVsc2UgaWYgKHZhbHVlLmxlbmd0aCA9PT0gOSkge1xuICAgICAgICB2YWx1ZSA9IHZhbHVlLnJlcGxhY2UoLyhcXGR7MX0pKFxcZHszfSkoXFxkezN9KShcXGR7Mn0pLywgJyQxLiQyLiQzLCQ0Jyk7XG4gICAgICB9IGVsc2UgaWYgKHZhbHVlLmxlbmd0aCA9PT0gMTApIHtcbiAgICAgICAgdmFsdWUgPSB2YWx1ZS5yZXBsYWNlKC8oXFxkezJ9KShcXGR7M30pKFxcZHszfSkoXFxkezJ9KS8sICckMS4kMi4kMywkNCcpO1xuICAgICAgfSBlbHNlIGlmICh2YWx1ZS5sZW5ndGggPT09IDExKSB7XG4gICAgICAgIHZhbHVlID0gdmFsdWUucmVwbGFjZSgvKFxcZHszfSkoXFxkezN9KShcXGR7M30pKFxcZHsyfSkvLCAnJDEuJDIuJDMsJDQnKTtcbiAgICAgIH0gZWxzZSBpZiAodmFsdWUubGVuZ3RoID09PSAxMikge1xuICAgICAgICB2YWx1ZSA9IHZhbHVlLnJlcGxhY2UoXG4gICAgICAgICAgLyhcXGR7MX0pKFxcZHszfSkoXFxkezN9KShcXGR7M30pKFxcZHsyfSkvLFxuICAgICAgICAgICckMS4kMi4kMy4kNCwkNSdcbiAgICAgICAgKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZhbHVlID0gdmFsdWUucmVwbGFjZSgvKFxcZHsxMCx9KShcXGR7Mn0pLywgJyQxLiQyJyk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuaW5wdXRWYWx1ZSA9IHZhbHVlO1xuICAgICAgaWYgKHRoaXMucGFnZS5hbmRyb2lkKSB7XG4gICAgICAgIHRoaXMuZmllbGRWYWx1ZS5hbmRyb2lkLnNldFNlbGVjdGlvbih0aGlzLmZpZWxkVmFsdWUuYW5kcm9pZC5sZW5ndGgoKSk7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHJlc2V0ZWRWYWx1ZSA9IHRoaXMucHJlcGFyZVRvUHJvcGFnYXRlKHZhbHVlKTtcbiAgICAgIHRoaXMucHJvcGFnYXRlQ2hhbmdlKHJlc2V0ZWRWYWx1ZSk7XG4gICAgfVxuICB9XG5cbiAgZm9jdXNPdXQoZXZlbnQ6IGFueSkge1xuICAgIHRoaXMuYmx1ci5lbWl0KGV2ZW50KTtcbiAgfVxuXG4gIHByaXZhdGUgcHJlcGFyZVRvUHJvcGFnYXRlKHZhbHVlOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIHZhbHVlID0gdmFsdWUucmVwbGFjZSgvXFxELywgJycpO1xuICAgIHZhbHVlID0gdmFsdWUucmVwbGFjZSgnLCcsICcnKTsgLy8gcGFyYSBjb250ZXIgbyBidWcgZG8gcmVwbGFjZVxuICAgIHZhbHVlID0gdmFsdWUucmVwbGFjZSgnLicsICcnKTsgLy8gZGUgbmFvIHN1YnN0aXR1aXIgdG9kb3Mgb3MgY2FyYWN0ZXJlcy5cbiAgICB2YWx1ZSA9IHZhbHVlLnJlcGxhY2UoJy4nLCAnJyk7XG5cbiAgICBjb25zdCBpbnRlZ2VyUGFydCA9IHZhbHVlLnNsaWNlKDAsIHZhbHVlLmxlbmd0aCAtIDIpO1xuICAgIGNvbnN0IGRlY2ltYWxQYXJ0ID0gdmFsdWUuc2xpY2UodmFsdWUubGVuZ3RoIC0gMik7XG4gICAgcmV0dXJuIHBhcnNlRmxvYXQoaW50ZWdlclBhcnQgKyAnLicgKyBkZWNpbWFsUGFydCkudG9GaXhlZCgyKTtcbiAgfVxufVxuIl19