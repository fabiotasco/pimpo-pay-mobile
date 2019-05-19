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
        this.returnPress = new core_1.EventEmitter();
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
        this.returnPress.emit(event);
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
    ], CurrencyMaskPtComponent.prototype, "returnPress", void 0);
    CurrencyMaskPtComponent = CurrencyMaskPtComponent_1 = __decorate([
        core_1.Component({
            moduleId: module.id,
            templateUrl: './nativescript-currency-mask.component.html',
            selector: 'TextFieldCurrency,[TextFieldCurrency]',
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmF0aXZlc2NyaXB0LWN1cnJlbmN5LW1hc2suY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibmF0aXZlc2NyaXB0LWN1cnJlbmN5LW1hc2suY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBT3VCO0FBQ3ZCLHdDQUF5RTtBQUV6RSxzREFBcUQ7QUFjckQ7SUF5QkUsaUNBQW9CLElBQVU7UUFBVixTQUFJLEdBQUosSUFBSSxDQUFNO1FBckI5QixjQUFTLEdBQVcsYUFBYSxDQUFDO1FBSWxDLGNBQVMsR0FBRyxJQUFJLENBQUM7UUFXakIsZ0JBQVcsR0FBRyxJQUFJLG1CQUFZLEVBQUUsQ0FBQztRQUl6QixvQkFBZSxHQUFHLFVBQUMsQ0FBTSxJQUFNLENBQUMsQ0FBQztJQUVSLENBQUM7Z0NBekJ2Qix1QkFBdUI7SUEyQmxDLDBDQUFRLEdBQVI7UUFDRSxJQUFJLENBQUMsVUFBVSxHQUFjLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBQ25FLENBQUM7SUFFRCw0Q0FBVSxHQUFWLFVBQVcsR0FBUTtRQUNqQixJQUFJLEdBQUcsRUFBRTtZQUNQLElBQUksQ0FBQyxVQUFVLEdBQUcsR0FBRyxDQUFDO1NBQ3ZCO0lBQ0gsQ0FBQztJQUVELGtEQUFnQixHQUFoQixVQUFpQixFQUFPO1FBQ3RCLElBQUksQ0FBQyxlQUFlLEdBQUcsRUFBRSxDQUFDO0lBQzVCLENBQUM7SUFFRCxtREFBaUIsR0FBakIsVUFBa0IsRUFBTyxJQUFTLENBQUM7SUFDbkMsa0RBQWdCLEdBQWhCLFVBQWtCLFVBQW1CLElBQVMsQ0FBQztJQUUvQyw2Q0FBVyxHQUFYLFVBQVksS0FBVTtRQUNwQixJQUFJLEtBQUssQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFO1lBQ3JCLElBQUksS0FBSyxHQUFXLEtBQUssQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDO1lBRXRDLEtBQUssR0FBRyxLQUFLLENBQUMs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U0FBUyxFQUFFO2dCQUNUO29CQUNFLE9BQU8sRUFBRSx5QkFBaUI7b0JBQzFCLFdBQVcsRUFBRSxpQkFBVSxDQUFDLGNBQU0sT0FBQSx5QkFBdUIsRUFBdkIsQ0FBdUIsQ0FBQztvQkFDdEQsS0FBSyxFQUFFLElBQUk7aUJBQ1o7YUFDRjtTQUNGLENBQUM7eUNBMEIwQixXQUFJO09BekJuQix1QkFBdUIsQ0F3R25DO0lBQUQsOEJBQUM7Q0FBQSxBQXhHRCxJQXdHQztBQXhHWSwwREFBdUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBmb3J3YXJkUmVmLFxuICBPbkluaXQsXG4gIENvbXBvbmVudCxcbiAgSW5wdXQsXG4gIE91dHB1dCxcbiAgRXZlbnRFbWl0dGVyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE5HX1ZBTFVFX0FDQ0VTU09SIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgVGV4dEZpZWxkIH0gZnJvbSAndG5zLWNvcmUtbW9kdWxlcy91aS90ZXh0LWZpZWxkJztcbmltcG9ydCB7IFBhZ2UgfSBmcm9tICd0bnMtY29yZS1tb2R1bGVzL3VpL3BhZ2UvcGFnZSc7XG5cbkBDb21wb25lbnQoe1xuICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICB0ZW1wbGF0ZVVybDogJy4vbmF0aXZlc2NyaXB0LWN1cnJlbmN5LW1hc2suY29tcG9uZW50Lmh0bWwnLFxuICBzZWxlY3RvcjogJ1RleHRGaWVsZEN1cnJlbmN5LFtUZXh0RmllbGRDdXJyZW5jeV0nLFxuICBwcm92aWRlcnM6IFtcbiAgICB7XG4gICAgICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgICAgIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IEN1cnJlbmN5TWFza1B0Q29tcG9uZW50KSxcbiAgICAgIG11bHRpOiB0cnVlXG4gICAgfVxuICBdXG59KVxuZXhwb3J0IGNsYXNzIEN1cnJlbmN5TWFza1B0Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBDb250cm9sVmFsdWVBY2Nlc3NvciB7XG4gIEBJbnB1dCgpXG4gIGhpbnQ6IHN0cmluZztcbiAgQElucHV0KClcbiAgY2xhc3NOYW1lOiBzdHJpbmcgPSAnaW5wdXQtZmllbGQnO1xuICBASW5wdXQoKVxuICByZXR1cm5LZXlUeXBlOiBzdHJpbmc7XG4gIEBJbnB1dCgpXG4gIGlzRW5hYmxlZCA9IHRydWU7XG5cbiAgQElucHV0KClcbiAgY29sU3Bhbjogc3RyaW5nO1xuXG4gIEBJbnB1dCgpXG4gIHJvdzogc3RyaW5nO1xuICBASW5wdXQoKVxuICBjb2w6IHN0cmluZztcblxuICBAT3V0cHV0KClcbiAgcmV0dXJuUHJlc3MgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgaW5wdXRWYWx1ZTogc3RyaW5nO1xuICBwcml2YXRlIGZpZWxkVmFsdWU6IFRleHRGaWVsZDtcbiAgcHJpdmF0ZSBwcm9wYWdhdGVDaGFuZ2UgPSAoXzogYW55KSA9PiB7fTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHBhZ2U6IFBhZ2UpIHt9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5maWVsZFZhbHVlID0gPFRleHRGaWVsZD50aGlzLnBhZ2UuZ2V0Vmlld0J5SWQoJ2ZpZWxkVmFsdWUnKTtcbiAgfVxuXG4gIHdyaXRlVmFsdWUob2JqOiBhbnkpOiB2b2lkIHtcbiAgICBpZiAob2JqKSB7XG4gICAgICB0aGlzLmlucHV0VmFsdWUgPSBvYmo7XG4gICAgfVxuICB9XG5cbiAgcmVnaXN0ZXJPbkNoYW5nZShmbjogYW55KTogdm9pZCB7XG4gICAgdGhpcy5wcm9wYWdhdGVDaGFuZ2UgPSBmbjtcbiAgfVxuXG4gIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBhbnkpOiB2b2lkIHt9XG4gIHNldERpc2FibGVkU3RhdGU/KGlzRGlzYWJsZWQ6IGJvb2xlYW4pOiB2b2lkIHt9XG5cbiAgY2hhbmdlVmFsdWUoZXZlbnQ6IGFueSkge1xuICAgIGlmIChldmVudC5vYmplY3QudGV4dCkge1xuICAgICAgbGV0IHZhbHVlOiBzdHJpbmcgPSBldmVudC5vYmplY3QudGV4dDtcblxuICAgICAgdmFsdWUgPSB2YWx1ZS5yZXBsYWNlKC9cXEQvLCAnJyk7XG4gICAgICB2YWx1ZSA9IHZhbHVlLnJlcGxhY2UoJywnLCAnJyk7IC8vIHBhcmEgY29udGVyIG8gYnVnIGRvIHJlcGxhY2VcbiAgICAgIHZhbHVlID0gdmFsdWUucmVwbGFjZSgnLicsICcnKTsgLy8gZGUgbmFvIHN1YnN0aXR1aXIgdG9kb3Mgb3MgY2FyYWN0ZXJlcy5cbiAgICAgIHZhbHVlID0gdmFsdWUucmVwbGFjZSgnLicsICcnKTtcblxuICAgICAgaWYgKHZhbHVlLmxlbmd0aCA9PT0gMykge1xuICAgICAgICB2YWx1ZSA9IHZhbHVlLnJlcGxhY2UoLyhcXGR7MX0pKFxcZHsyfSkvLCAnJDEsJDInKTtcbiAgICAgIH0gZWxzZSBpZiAodmFsdWUubGVuZ3RoID09PSA0KSB7XG4gICAgICAgIHZhbHVlID0gdmFsdWUucmVwbGFjZSgvKFxcZHsyfSkoXFxkezJ9KS8sICckMSwkMicpO1xuICAgICAgfSBlbHNlIGlmICh2YWx1ZS5sZW5ndGggPT09IDUpIHtcbiAgICAgICAgdmFsdWUgPSB2YWx1ZS5yZXBsYWNlKC8oXFxkezN9KShcXGR7Mn0pLywgJyQxLCQyJyk7XG4gICAgICB9IGVsc2UgaWYgKHZhbHVlLmxlbmd0aCA9PT0gNikge1xuICAgICAgICB2YWx1ZSA9IHZhbHVlLnJlcGxhY2UoLyhcXGR7MX0pKFxcZHszfSkoXFxkezJ9KS8sICckMS4kMiwkMycpO1xuICAgICAgfSBlbHNlIGlmICh2YWx1ZS5sZW5ndGggPT09IDcpIHtcbiAgICAgICAgdmFsdWUgPSB2YWx1ZS5yZXBsYWNlKC8oXFxkezJ9KShcXGR7M30pKFxcZHsyfSkvLCAnJDEuJDIsJDMnKTtcbiAgICAgIH0gZWxzZSBpZiAodmFsdWUubGVuZ3RoID09PSA4KSB7XG4gICAgICAgIHZhbHVlID0gdmFsdWUucmVwbGFjZSgvKFxcZHszfSkoXFxkezN9KShcXGR7Mn0pLywgJyQxLiQyLCQzJyk7XG4gICAgICB9IGVsc2UgaWYgKHZhbHVlLmxlbmd0aCA9PT0gOSkge1xuICAgICAgICB2YWx1ZSA9IHZhbHVlLnJlcGxhY2UoLyhcXGR7MX0pKFxcZHszfSkoXFxkezN9KShcXGR7Mn0pLywgJyQxLiQyLiQzLCQ0Jyk7XG4gICAgICB9IGVsc2UgaWYgKHZhbHVlLmxlbmd0aCA9PT0gMTApIHtcbiAgICAgICAgdmFsdWUgPSB2YWx1ZS5yZXBsYWNlKC8oXFxkezJ9KShcXGR7M30pKFxcZHszfSkoXFxkezJ9KS8sICckMS4kMi4kMywkNCcpO1xuICAgICAgfSBlbHNlIGlmICh2YWx1ZS5sZW5ndGggPT09IDExKSB7XG4gICAgICAgIHZhbHVlID0gdmFsdWUucmVwbGFjZSgvKFxcZHszfSkoXFxkezN9KShcXGR7M30pKFxcZHsyfSkvLCAnJDEuJDIuJDMsJDQnKTtcbiAgICAgIH0gZWxzZSBpZiAodmFsdWUubGVuZ3RoID09PSAxMikge1xuICAgICAgICB2YWx1ZSA9IHZhbHVlLnJlcGxhY2UoXG4gICAgICAgICAgLyhcXGR7MX0pKFxcZHszfSkoXFxkezN9KShcXGR7M30pKFxcZHsyfSkvLFxuICAgICAgICAgICckMS4kMi4kMy4kNCwkNSdcbiAgICAgICAgKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZhbHVlID0gdmFsdWUucmVwbGFjZSgvKFxcZHsxMCx9KShcXGR7Mn0pLywgJyQxLiQyJyk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuaW5wdXRWYWx1ZSA9IHZhbHVlO1xuICAgICAgaWYgKHRoaXMucGFnZS5hbmRyb2lkKSB7XG4gICAgICAgIHRoaXMuZmllbGRWYWx1ZS5hbmRyb2lkLnNldFNlbGVjdGlvbih0aGlzLmZpZWxkVmFsdWUuYW5kcm9pZC5sZW5ndGgoKSk7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHJlc2V0ZWRWYWx1ZSA9IHRoaXMucHJlcGFyZVRvUHJvcGFnYXRlKHZhbHVlKTtcbiAgICAgIHRoaXMucHJvcGFnYXRlQ2hhbmdlKHJlc2V0ZWRWYWx1ZSk7XG4gICAgfVxuICB9XG5cbiAgZm9jdXNPdXQoZXZlbnQ6IGFueSkge1xuICAgIHRoaXMucmV0dXJuUHJlc3MuZW1pdChldmVudCk7XG4gIH1cblxuICBwcml2YXRlIHByZXBhcmVUb1Byb3BhZ2F0ZSh2YWx1ZTogc3RyaW5nKTogc3RyaW5nIHtcbiAgICB2YWx1ZSA9IHZhbHVlLnJlcGxhY2UoL1xcRC8sICcnKTtcbiAgICB2YWx1ZSA9IHZhbHVlLnJlcGxhY2UoJywnLCAnJyk7IC8vIHBhcmEgY29udGVyIG8gYnVnIGRvIHJlcGxhY2VcbiAgICB2YWx1ZSA9IHZhbHVlLnJlcGxhY2UoJy4nLCAnJyk7IC8vIGRlIG5hbyBzdWJzdGl0dWlyIHRvZG9zIG9zIGNhcmFjdGVyZXMuXG4gICAgdmFsdWUgPSB2YWx1ZS5yZXBsYWNlKCcuJywgJycpO1xuXG4gICAgY29uc3QgaW50ZWdlclBhcnQgPSB2YWx1ZS5zbGljZSgwLCB2YWx1ZS5sZW5ndGggLSAyKTtcbiAgICBjb25zdCBkZWNpbWFsUGFydCA9IHZhbHVlLnNsaWNlKHZhbHVlLmxlbmd0aCAtIDIpO1xuICAgIHJldHVybiBwYXJzZUZsb2F0KGludGVnZXJQYXJ0ICsgJy4nICsgZGVjaW1hbFBhcnQpLnRvRml4ZWQoMik7XG4gIH1cbn1cbiJdfQ==