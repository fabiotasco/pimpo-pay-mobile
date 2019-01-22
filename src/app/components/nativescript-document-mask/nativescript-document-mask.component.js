"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var page_1 = require("tns-core-modules/ui/page/page");
var NativescriptDocumentMaskComponent = /** @class */ (function () {
    function NativescriptDocumentMaskComponent(page) {
        this.page = page;
        this.type = DocumentType.CPF;
        this.required = false;
        this.value = '';
    }
    NativescriptDocumentMaskComponent_1 = NativescriptDocumentMaskComponent;
    NativescriptDocumentMaskComponent.prototype.ngOnInit = function () { };
    NativescriptDocumentMaskComponent.prototype.changeEvent = function (event) {
        var noFormatText = '';
        if (event.object.text) {
            noFormatText = event.object.text.replace(/\D/g, '');
        }
        if (this.type === DocumentType.CPF) {
            this.value = this.formatToCpf(noFormatText);
            this.setFocusPositionToFinish();
            this.propagateOnChange(this.value.replace(/\D/g, ''));
        }
        else if (this.type === DocumentType.CNPJ) {
            this.value = this.formatToCnpj(noFormatText);
            this.setFocusPositionToFinish();
            this.propagateOnChange(this.value.replace(/\D/g, ''));
        }
        else if (this.type === DocumentType.PHONE) {
            this.value = this.formatToPhone(noFormatText);
            this.setFocusPositionToFinish();
            this.propagateOnChange(this.value.replace(/\D/g, ''));
        }
    };
    NativescriptDocumentMaskComponent.prototype.writeValue = function (obj) {
        if (obj) {
            this.value = obj.length === 11 ? this.formatToCpf(obj) : this.formatToCnpj(obj);
        }
    };
    NativescriptDocumentMaskComponent.prototype.registerOnChange = function (fn) {
        this.propagateOnChange = fn;
    };
    NativescriptDocumentMaskComponent.prototype.registerOnTouched = function (fn) {
        // todo
    };
    NativescriptDocumentMaskComponent.prototype.setDisabledState = function (isDisabled) {
        // todo
    };
    NativescriptDocumentMaskComponent.prototype.formatToCpf = function (v) {
        v = v.replace(/\D/g, ''); // Remove tudo o que não é dígito
        v = v.replace(/(\d{3})(\d)/, '$1.$2'); // Coloca um ponto entre o terceiro e o quarto dígitos
        v = v.replace(/(\d{3})(\d)/, '$1.$2'); // Coloca um ponto entre o terceiro e o quarto dígitos
        // de novo (para o segundo bloco de números)
        v = v.replace(/(\d{3})(\d{1,2})$/, '$1-$2'); // Coloca um hífen entre o terceiro e o quarto dígitos
        return v;
    };
    NativescriptDocumentMaskComponent.prototype.formatToCnpj = function (v) {
        v = v.replace(/\D/g, ''); // Remove tudo o que não é dígito
        v = v.replace(/^(\d{2})(\d)/, '$1.$2'); // Coloca ponto entre o segundo e o terceiro dígitos
        v = v.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3'); // Coloca ponto entre o quinto e o sexto dígitos
        v = v.replace(/\.(\d{3})(\d)/, '.$1/$2'); // Coloca uma barra entre o oitavo e o nono dígitos
        v = v.replace(/(\d{4})(\d)/, '$1-$2'); // Coloca um hífen depois do bloco de quatro dígitos
        return v;
    };
    NativescriptDocumentMaskComponent.prototype.formatToPhone = function (v) {
        v = v.replace(/\D/g, '').trim(); // Remove tudo o que não é dígito
        if (v.length <= 7) {
            v = v.replace(/^(\d{2})(\d{1,4})/, '$1 $2'); // Separa o DDD do telefone
        }
        else if (v.length > 7) {
            v = v.replace(/(\d{2})(\d{1,5})(\d{1,4})/, '$1 $2-$3'); // Separa o DDD e ajusta os digitos do celular
        }
        return v;
    };
    NativescriptDocumentMaskComponent.prototype.setFocusPositionToFinish = function () {
        var textField = this.page.getViewById(this.id);
        if (textField && this.page.android) {
            textField.android.setSelection(textField.android.length());
        }
    };
    var NativescriptDocumentMaskComponent_1;
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], NativescriptDocumentMaskComponent.prototype, "className", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], NativescriptDocumentMaskComponent.prototype, "type", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], NativescriptDocumentMaskComponent.prototype, "row", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], NativescriptDocumentMaskComponent.prototype, "id", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], NativescriptDocumentMaskComponent.prototype, "col", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], NativescriptDocumentMaskComponent.prototype, "required", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], NativescriptDocumentMaskComponent.prototype, "name", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], NativescriptDocumentMaskComponent.prototype, "hint", void 0);
    NativescriptDocumentMaskComponent = NativescriptDocumentMaskComponent_1 = __decorate([
        core_1.Component({
            selector: 'TextFieldDocument',
            templateUrl: './nativescript-document-mask.component.html',
            moduleId: module.id,
            providers: [
                {
                    provide: forms_1.NG_VALUE_ACCESSOR,
                    useExisting: core_1.forwardRef(function () { return NativescriptDocumentMaskComponent_1; }),
                    multi: true
                }
            ]
        }),
        __metadata("design:paramtypes", [page_1.Page])
    ], NativescriptDocumentMaskComponent);
    return NativescriptDocumentMaskComponent;
}());
exports.NativescriptDocumentMaskComponent = NativescriptDocumentMaskComponent;
var DocumentType;
(function (DocumentType) {
    DocumentType["CPF"] = "cpf";
    DocumentType["CNPJ"] = "cnpj";
    DocumentType["PHONE"] = "phone";
})(DocumentType = exports.DocumentType || (exports.DocumentType = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmF0aXZlc2NyaXB0LWRvY3VtZW50LW1hc2suY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibmF0aXZlc2NyaXB0LWRvY3VtZW50LW1hc2suY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQXFFO0FBQ3JFLHdDQUF5RTtBQUV6RSxzREFBcUQ7QUFjckQ7SUFZRSwyQ0FBb0IsSUFBVTtRQUFWLFNBQUksR0FBSixJQUFJLENBQU07UUFWckIsU0FBSSxHQUFpQixZQUFZLENBQUMsR0FBRyxDQUFDO1FBSXRDLGFBQVEsR0FBRyxLQUFLLENBQUM7UUFJMUIsVUFBSyxHQUFHLEVBQUUsQ0FBQztJQUVzQixDQUFDOzBDQVp2QixpQ0FBaUM7SUFjNUMsb0RBQVEsR0FBUixjQUFrQixDQUFDO0lBR25CLHVEQUFXLEdBQVgsVUFBWSxLQUFVO1FBQ3BCLElBQUksWUFBWSxHQUFXLEVBQUUsQ0FBQztRQUM5QixJQUFJLEtBQUssQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFO1lBQ3JCLFlBQVksR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1NBQ3JEO1FBRUQsSUFBSSxJQUFJLENBQUMsSUFBSSxLQUFLLFlBQVksQ0FBQyxHQUFHLEVBQUU7WUFDbEMsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFDO1lBQzVDLElBQUksQ0FBQyx3QkFBd0IsRUFBRSxDQUFDO1lBQ2hDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQztTQUN2RDthQUFNLElBQUksSUFBSSxDQUFDLElBQUksS0FBSyxZQUFZLENBQUMsSUFBSSxFQUFFO1lBQzFDLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLFlBQVks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aUMsQ0EwRjdDO0lBQUQsd0NBQUM7Q0FBQSxBQTFGRCxJQTBGQztBQTFGWSw4RUFBaUM7QUE0RjlDLElBQVksWUFJWDtBQUpELFdBQVksWUFBWTtJQUN0QiwyQkFBVyxDQUFBO0lBQ1gsNkJBQWEsQ0FBQTtJQUNiLCtCQUFlLENBQUE7QUFDakIsQ0FBQyxFQUpXLFlBQVksR0FBWixvQkFBWSxLQUFaLG9CQUFZLFFBSXZCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0LCBmb3J3YXJkUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb250cm9sVmFsdWVBY2Nlc3NvciwgTkdfVkFMVUVfQUNDRVNTT1IgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBUZXh0RmllbGQgfSBmcm9tICd0bnMtY29yZS1tb2R1bGVzL3VpL3RleHQtZmllbGQvdGV4dC1maWVsZCc7XG5pbXBvcnQgeyBQYWdlIH0gZnJvbSAndG5zLWNvcmUtbW9kdWxlcy91aS9wYWdlL3BhZ2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdUZXh0RmllbGREb2N1bWVudCcsXG4gIHRlbXBsYXRlVXJsOiAnLi9uYXRpdmVzY3JpcHQtZG9jdW1lbnQtbWFzay5jb21wb25lbnQuaHRtbCcsXG4gIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gIHByb3ZpZGVyczogW1xuICAgIHtcbiAgICAgIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICAgICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gTmF0aXZlc2NyaXB0RG9jdW1lbnRNYXNrQ29tcG9uZW50KSxcbiAgICAgIG11bHRpOiB0cnVlXG4gICAgfVxuICBdXG59KVxuZXhwb3J0IGNsYXNzIE5hdGl2ZXNjcmlwdERvY3VtZW50TWFza0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgQ29udHJvbFZhbHVlQWNjZXNzb3Ige1xuICBASW5wdXQoKSBjbGFzc05hbWU6IHN0cmluZztcbiAgQElucHV0KCkgdHlwZTogRG9jdW1lbnRUeXBlID0gRG9jdW1lbnRUeXBlLkNQRjtcbiAgQElucHV0KCkgcm93OiBudW1iZXI7XG4gIEBJbnB1dCgpIGlkOiBzdHJpbmc7XG4gIEBJbnB1dCgpIGNvbDogbnVtYmVyO1xuICBASW5wdXQoKSByZXF1aXJlZCA9IGZhbHNlO1xuICBASW5wdXQoKSBuYW1lOiBzdHJpbmc7XG4gIEBJbnB1dCgpIGhpbnQ6IHN0cmluZztcblxuICB2YWx1ZSA9ICcnO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcGFnZTogUGFnZSkge31cblxuICBuZ09uSW5pdCgpOiB2b2lkIHt9XG4gIHByaXZhdGUgcHJvcGFnYXRlT25DaGFuZ2U6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xuXG4gIGNoYW5nZUV2ZW50KGV2ZW50OiBhbnkpIHtcbiAgICBsZXQgbm9Gb3JtYXRUZXh0OiBzdHJpbmcgPSAnJztcbiAgICBpZiAoZXZlbnQub2JqZWN0LnRleHQpIHtcbiAgICAgIG5vRm9ybWF0VGV4dCA9IGV2ZW50Lm9iamVjdC50ZXh0LnJlcGxhY2UoL1xcRC9nLCAnJyk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMudHlwZSA9PT0gRG9jdW1lbnRUeXBlLkNQRikge1xuICAgICAgdGhpcy52YWx1ZSA9IHRoaXMuZm9ybWF0VG9DcGYobm9Gb3JtYXRUZXh0KTtcbiAgICAgIHRoaXMuc2V0Rm9jdXNQb3NpdGlvblRvRmluaXNoKCk7XG4gICAgICB0aGlzLnByb3BhZ2F0ZU9uQ2hhbmdlKHRoaXMudmFsdWUucmVwbGFjZSgvXFxEL2csICcnKSk7XG4gICAgfSBlbHNlIGlmICh0aGlzLnR5cGUgPT09IERvY3VtZW50VHlwZS5DTlBKKSB7XG4gICAgICB0aGlzLnZhbHVlID0gdGhpcy5mb3JtYXRUb0NucGoobm9Gb3JtYXRUZXh0KTtcbiAgICAgIHRoaXMuc2V0Rm9jdXNQb3NpdGlvblRvRmluaXNoKCk7XG4gICAgICB0aGlzLnByb3BhZ2F0ZU9uQ2hhbmdlKHRoaXMudmFsdWUucmVwbGFjZSgvXFxEL2csICcnKSk7XG4gICAgfSBlbHNlIGlmICh0aGlzLnR5cGUgPT09IERvY3VtZW50VHlwZS5QSE9ORSkge1xuICAgICAgdGhpcy52YWx1ZSA9IHRoaXMuZm9ybWF0VG9QaG9uZShub0Zvcm1hdFRleHQpO1xuICAgICAgdGhpcy5zZXRGb2N1c1Bvc2l0aW9uVG9GaW5pc2goKTtcbiAgICAgIHRoaXMucHJvcGFnYXRlT25DaGFuZ2UodGhpcy52YWx1ZS5yZXBsYWNlKC9cXEQvZywgJycpKTtcbiAgICB9XG4gIH1cblxuICB3cml0ZVZhbHVlKG9iajogc3RyaW5nKTogdm9pZCB7XG4gICAgaWYgKG9iaikge1xuICAgICAgdGhpcy52YWx1ZSA9IG9iai5sZW5ndGggPT09IDExID8gdGhpcy5mb3JtYXRUb0NwZihvYmopIDogdGhpcy5mb3JtYXRUb0NucGoob2JqKTtcbiAgICB9XG4gIH1cbiAgcmVnaXN0ZXJPbkNoYW5nZShmbjogYW55KTogdm9pZCB7XG4gICAgdGhpcy5wcm9wYWdhdGVPbkNoYW5nZSA9IGZuO1xuICB9XG4gIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBhbnkpOiB2b2lkIHtcbiAgICAvLyB0b2RvXG4gIH1cbiAgc2V0RGlzYWJsZWRTdGF0ZT8oaXNEaXNhYmxlZDogYm9vbGVhbik6IHZvaWQge1xuICAgIC8vIHRvZG9cbiAgfVxuXG4gIHByaXZhdGUgZm9ybWF0VG9DcGYodjogc3RyaW5nKTogc3RyaW5nIHtcbiAgICB2ID0gdi5yZXBsYWNlKC9cXEQvZywgJycpOyAvLyBSZW1vdmUgdHVkbyBvIHF1ZSBuw6NvIMOpIGTDrWdpdG9cbiAgICB2ID0gdi5yZXBsYWNlKC8oXFxkezN9KShcXGQpLywgJyQxLiQyJyk7IC8vIENvbG9jYSB1bSBwb250byBlbnRyZSBvIHRlcmNlaXJvIGUgbyBxdWFydG8gZMOtZ2l0b3NcbiAgICB2ID0gdi5yZXBsYWNlKC8oXFxkezN9KShcXGQpLywgJyQxLiQyJyk7IC8vIENvbG9jYSB1bSBwb250byBlbnRyZSBvIHRlcmNlaXJvIGUgbyBxdWFydG8gZMOtZ2l0b3NcbiAgICAvLyBkZSBub3ZvIChwYXJhIG8gc2VndW5kbyBibG9jbyBkZSBuw7ptZXJvcylcbiAgICB2ID0gdi5yZXBsYWNlKC8oXFxkezN9KShcXGR7MSwyfSkkLywgJyQxLSQyJyk7IC8vIENvbG9jYSB1bSBow61mZW4gZW50cmUgbyB0ZXJjZWlybyBlIG8gcXVhcnRvIGTDrWdpdG9zXG5cbiAgICByZXR1cm4gdjtcbiAgfVxuXG4gIHByaXZhdGUgZm9ybWF0VG9DbnBqKHY6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgdiA9IHYucmVwbGFjZSgvXFxEL2csICcnKTsgLy8gUmVtb3ZlIHR1ZG8gbyBxdWUgbsOjbyDDqSBkw61naXRvXG4gICAgdiA9IHYucmVwbGFjZSgvXihcXGR7Mn0pKFxcZCkvLCAnJDEuJDInKTsgLy8gQ29sb2NhIHBvbnRvIGVudHJlIG8gc2VndW5kbyBlIG8gdGVyY2Vpcm8gZMOtZ2l0b3NcbiAgICB2ID0gdi5yZXBsYWNlKC9eKFxcZHsyfSlcXC4oXFxkezN9KShcXGQpLywgJyQxLiQyLiQzJyk7IC8vIENvbG9jYSBwb250byBlbnRyZSBvIHF1aW50byBlIG8gc2V4dG8gZMOtZ2l0b3NcbiAgICB2ID0gdi5yZXBsYWNlKC9cXC4oXFxkezN9KShcXGQpLywgJy4kMS8kMicpOyAvLyBDb2xvY2EgdW1hIGJhcnJhIGVudHJlIG8gb2l0YXZvIGUgbyBub25vIGTDrWdpdG9zXG4gICAgdiA9IHYucmVwbGFjZSgvKFxcZHs0fSkoXFxkKS8sICckMS0kMicpOyAvLyBDb2xvY2EgdW0gaMOtZmVuIGRlcG9pcyBkbyBibG9jbyBkZSBxdWF0cm8gZMOtZ2l0b3NcbiAgICByZXR1cm4gdjtcbiAgfVxuXG4gIHByaXZhdGUgZm9ybWF0VG9QaG9uZSh2OiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIHYgPSB2LnJlcGxhY2UoL1xcRC9nLCAnJykudHJpbSgpOyAvLyBSZW1vdmUgdHVkbyBvIHF1ZSBuw6NvIMOpIGTDrWdpdG9cblxuICAgIGlmICh2Lmxlbmd0aCA8PSA3KSB7XG4gICAgICB2ID0gdi5yZXBsYWNlKC9eKFxcZHsyfSkoXFxkezEsNH0pLywgJyQxICQyJyk7IC8vIFNlcGFyYSBvIERERCBkbyB0ZWxlZm9uZVxuICAgIH0gZWxzZSBpZiAodi5sZW5ndGggPiA3KSB7XG4gICAgICB2ID0gdi5yZXBsYWNlKC8oXFxkezJ9KShcXGR7MSw1fSkoXFxkezEsNH0pLywgJyQxICQyLSQzJyk7IC8vIFNlcGFyYSBvIERERCBlIGFqdXN0YSBvcyBkaWdpdG9zIGRvIGNlbHVsYXJcbiAgICB9XG5cbiAgICByZXR1cm4gdjtcbiAgfVxuXG4gIHByaXZhdGUgc2V0Rm9jdXNQb3NpdGlvblRvRmluaXNoKCk6IHZvaWQge1xuICAgIGNvbnN0IHRleHRGaWVsZCA9IHRoaXMucGFnZS5nZXRWaWV3QnlJZCh0aGlzLmlkKTtcbiAgICBpZiAodGV4dEZpZWxkICYmIHRoaXMucGFnZS5hbmRyb2lkKSB7XG4gICAgICB0ZXh0RmllbGQuYW5kcm9pZC5zZXRTZWxlY3Rpb24odGV4dEZpZWxkLmFuZHJvaWQubGVuZ3RoKCkpO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZW51bSBEb2N1bWVudFR5cGUge1xuICBDUEYgPSAnY3BmJyxcbiAgQ05QSiA9ICdjbnBqJyxcbiAgUEhPTkUgPSAncGhvbmUnXG59XG4iXX0=