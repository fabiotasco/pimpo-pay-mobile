"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var page_1 = require("tns-core-modules/ui/page/page");
var NativescriptDocumentMaskComponent = /** @class */ (function () {
    function NativescriptDocumentMaskComponent(page) {
        this.page = page;
        this.type = DocumentType.CPF;
        this.returnKeyType = 'next';
        this.fieldId = 'default';
        this.required = false;
        this.name = 'default';
        this.fieldHint = 'Conteudo';
        this.returnPress = new core_1.EventEmitter();
        this.value = '';
    }
    NativescriptDocumentMaskComponent_1 = NativescriptDocumentMaskComponent;
    NativescriptDocumentMaskComponent.prototype.ngOnInit = function () { };
    NativescriptDocumentMaskComponent.prototype.changeEvent = function (event) {
        var noFormatText = '';
        var defaultValue;
        if (event.object.text) {
            defaultValue = event.object.text;
            noFormatText = event.object.text.replace(/\D/g, '');
        }
        if (noFormatText.length <= 11 && this.type !== DocumentType.PHONE) {
            this.type = DocumentType.CPF;
        }
        else if (noFormatText.length > 11 &&
            noFormatText.length <= 15 &&
            this.type !== DocumentType.PHONE) {
            this.type = DocumentType.CNPJ;
        }
        else if (this.type !== DocumentType.PHONE) {
            return;
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
            console.log(obj);
            this.value =
                obj.length === 11 ? this.formatToCpf(obj) : this.formatToCnpj(obj);
        }
    };
    NativescriptDocumentMaskComponent.prototype.returnKeyPress = function (event) {
        this.returnPress.emit(event);
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
    NativescriptDocumentMaskComponent.prototype.getMaxSize = function () {
        var sizes = {
            cpf: 18,
            cnpj: 18,
            phone: 13
        };
        return sizes[this.type.toString()];
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
        var textField = this.page.getViewById(this.fieldId);
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
        __metadata("design:type", Object)
    ], NativescriptDocumentMaskComponent.prototype, "returnKeyType", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], NativescriptDocumentMaskComponent.prototype, "fieldId", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], NativescriptDocumentMaskComponent.prototype, "required", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], NativescriptDocumentMaskComponent.prototype, "name", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], NativescriptDocumentMaskComponent.prototype, "fieldHint", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], NativescriptDocumentMaskComponent.prototype, "returnPress", void 0);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmF0aXZlc2NyaXB0LWRvY3VtZW50LW1hc2suY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibmF0aXZlc2NyaXB0LWRvY3VtZW50LW1hc2suY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBT3VCO0FBQ3ZCLHdDQUF5RTtBQUV6RSxzREFBcUQ7QUFjckQ7SUFlRSwyQ0FBb0IsSUFBVTtRQUFWLFNBQUksR0FBSixJQUFJLENBQU07UUFackIsU0FBSSxHQUFpQixZQUFZLENBQUMsR0FBRyxDQUFDO1FBQ3RDLGtCQUFhLEdBQUcsTUFBTSxDQUFDO1FBQ3ZCLFlBQU8sR0FBRyxTQUFTLENBQUM7UUFDcEIsYUFBUSxHQUFHLEtBQUssQ0FBQztRQUNqQixTQUFJLEdBQUcsU0FBUyxDQUFDO1FBQ2pCLGNBQVMsR0FBRyxVQUFVLENBQUM7UUFHaEMsZ0JBQVcsR0FBRyxJQUFJLG1CQUFZLEVBQUUsQ0FBQztRQUVqQyxVQUFLLEdBQUcsRUFBRSxDQUFDO0lBRXNCLENBQUM7MENBZnZCLGlDQUFpQztJQWlCNUMsb0RBQVEsR0FBUixjQUFrQixDQUFDO0lBR25CLHVEQUFXLEdBQVgsVUFBWSxLQUFVO1FBQ3BCLElBQUksWUFBWSxHQUFXLEVBQUUsQ0FBQztRQUM5QixJQUFJLFlBQVksQ0FBQztRQUNqQixJQUFJLEtBQUssQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFO1lBQ3JCLFlBQVksR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQztZQUNqQyxZQUFZLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQztTQUNyRDtRQUVELElBQUksWUFBWSxDQUFDLE1BQU0sSUFBSSxFQUFFLElBQUksSUFBSSxDQUFDLElBQUksS0FBSyxZQUFZLENBQUMsS0FBSyxFQUFFO1lBQ2pFLElBQUksQ0FBQyxJQUFJLEdBQUcsWUFBWSxDQUFDLEdB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QztJQUFELHdDQUFDO0NBQUEsQUExSEQsSUEwSEM7QUExSFksOEVBQWlDO0FBNEg5QyxJQUFZLFlBSVg7QUFKRCxXQUFZLFlBQVk7SUFDdEIsMkJBQVcsQ0FBQTtJQUNYLDZCQUFhLENBQUE7SUFDYiwrQkFBZSxDQUFBO0FBQ2pCLENBQUMsRUFKVyxZQUFZLEdBQVosb0JBQVksS0FBWixvQkFBWSxRQUl2QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgT25Jbml0LFxuICBJbnB1dCxcbiAgZm9yd2FyZFJlZixcbiAgT3V0cHV0LFxuICBFdmVudEVtaXR0ZXJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb250cm9sVmFsdWVBY2Nlc3NvciwgTkdfVkFMVUVfQUNDRVNTT1IgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBUZXh0RmllbGQgfSBmcm9tICd0bnMtY29yZS1tb2R1bGVzL3VpL3RleHQtZmllbGQvdGV4dC1maWVsZCc7XG5pbXBvcnQgeyBQYWdlIH0gZnJvbSAndG5zLWNvcmUtbW9kdWxlcy91aS9wYWdlL3BhZ2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdUZXh0RmllbGREb2N1bWVudCcsXG4gIHRlbXBsYXRlVXJsOiAnLi9uYXRpdmVzY3JpcHQtZG9jdW1lbnQtbWFzay5jb21wb25lbnQuaHRtbCcsXG4gIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gIHByb3ZpZGVyczogW1xuICAgIHtcbiAgICAgIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICAgICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gTmF0aXZlc2NyaXB0RG9jdW1lbnRNYXNrQ29tcG9uZW50KSxcbiAgICAgIG11bHRpOiB0cnVlXG4gICAgfVxuICBdXG59KVxuZXhwb3J0IGNsYXNzIE5hdGl2ZXNjcmlwdERvY3VtZW50TWFza0NvbXBvbmVudFxuICBpbXBsZW1lbnRzIE9uSW5pdCwgQ29udHJvbFZhbHVlQWNjZXNzb3Ige1xuICBASW5wdXQoKSBjbGFzc05hbWU6IHN0cmluZztcbiAgQElucHV0KCkgdHlwZTogRG9jdW1lbnRUeXBlID0gRG9jdW1lbnRUeXBlLkNQRjtcbiAgQElucHV0KCkgcmV0dXJuS2V5VHlwZSA9ICduZXh0JztcbiAgQElucHV0KCkgZmllbGRJZCA9ICdkZWZhdWx0JztcbiAgQElucHV0KCkgcmVxdWlyZWQgPSBmYWxzZTtcbiAgQElucHV0KCkgbmFtZSA9ICdkZWZhdWx0JztcbiAgQElucHV0KCkgZmllbGRIaW50ID0gJ0NvbnRldWRvJztcblxuICBAT3V0cHV0KClcbiAgcmV0dXJuUHJlc3MgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgdmFsdWUgPSAnJztcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHBhZ2U6IFBhZ2UpIHt9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7fVxuICBwcml2YXRlIHByb3BhZ2F0ZU9uQ2hhbmdlOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcblxuICBjaGFuZ2VFdmVudChldmVudDogYW55KSB7XG4gICAgbGV0IG5vRm9ybWF0VGV4dDogc3RyaW5nID0gJyc7XG4gICAgbGV0IGRlZmF1bHRWYWx1ZTtcbiAgICBpZiAoZXZlbnQub2JqZWN0LnRleHQpIHtcbiAgICAgIGRlZmF1bHRWYWx1ZSA9IGV2ZW50Lm9iamVjdC50ZXh0O1xuICAgICAgbm9Gb3JtYXRUZXh0ID0gZXZlbnQub2JqZWN0LnRleHQucmVwbGFjZSgvXFxEL2csICcnKTtcbiAgICB9XG5cbiAgICBpZiAobm9Gb3JtYXRUZXh0Lmxlbmd0aCA8PSAxMSAmJiB0aGlzLnR5cGUgIT09IERvY3VtZW50VHlwZS5QSE9ORSkge1xuICAgICAgdGhpcy50eXBlID0gRG9jdW1lbnRUeXBlLkNQRjtcbiAgICB9IGVsc2UgaWYgKFxuICAgICAgbm9Gb3JtYXRUZXh0Lmxlbmd0aCA+IDExICYmXG4gICAgICBub0Zvcm1hdFRleHQubGVuZ3RoIDw9IDE1ICYmXG4gICAgICB0aGlzLnR5cGUgIT09IERvY3VtZW50VHlwZS5QSE9ORVxuICAgICkge1xuICAgICAgdGhpcy50eXBlID0gRG9jdW1lbnRUeXBlLkNOUEo7XG4gICAgfSBlbHNlIGlmICh0aGlzLnR5cGUgIT09IERvY3VtZW50VHlwZS5QSE9ORSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICh0aGlzLnR5cGUgPT09IERvY3VtZW50VHlwZS5DUEYpIHtcbiAgICAgIHRoaXMudmFsdWUgPSB0aGlzLmZvcm1hdFRvQ3BmKG5vRm9ybWF0VGV4dCk7XG4gICAgICB0aGlzLnNldEZvY3VzUG9zaXRpb25Ub0ZpbmlzaCgpO1xuICAgICAgdGhpcy5wcm9wYWdhdGVPbkNoYW5nZSh0aGlzLnZhbHVlLnJlcGxhY2UoL1xcRC9nLCAnJykpO1xuICAgIH0gZWxzZSBpZiAodGhpcy50eXBlID09PSBEb2N1bWVudFR5cGUuQ05QSikge1xuICAgICAgdGhpcy52YWx1ZSA9IHRoaXMuZm9ybWF0VG9DbnBqKG5vRm9ybWF0VGV4dCk7XG4gICAgICB0aGlzLnNldEZvY3VzUG9zaXRpb25Ub0ZpbmlzaCgpO1xuICAgICAgdGhpcy5wcm9wYWdhdGVPbkNoYW5nZSh0aGlzLnZhbHVlLnJlcGxhY2UoL1xcRC9nLCAnJykpO1xuICAgIH0gZWxzZSBpZiAodGhpcy50eXBlID09PSBEb2N1bWVudFR5cGUuUEhPTkUpIHtcbiAgICAgIHRoaXMudmFsdWUgPSB0aGlzLmZvcm1hdFRvUGhvbmUobm9Gb3JtYXRUZXh0KTtcbiAgICAgIHRoaXMuc2V0Rm9jdXNQb3NpdGlvblRvRmluaXNoKCk7XG4gICAgICB0aGlzLnByb3BhZ2F0ZU9uQ2hhbmdlKHRoaXMudmFsdWUucmVwbGFjZSgvXFxEL2csICcnKSk7XG4gICAgfVxuICB9XG5cbiAgd3JpdGVWYWx1ZShvYmo6IHN0cmluZyk6IHZvaWQge1xuICAgIGlmIChvYmopIHtcbiAgICAgIGNvbnNvbGUubG9nKG9iaik7XG4gICAgICB0aGlzLnZhbHVlID1cbiAgICAgICAgb2JqLmxlbmd0aCA9PT0gMTEgPyB0aGlzLmZvcm1hdFRvQ3BmKG9iaikgOiB0aGlzLmZvcm1hdFRvQ25waihvYmopO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybktleVByZXNzKGV2ZW50OiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLnJldHVyblByZXNzLmVtaXQoZXZlbnQpO1xuICB9XG4gIHJlZ2lzdGVyT25DaGFuZ2UoZm46IGFueSk6IHZvaWQge1xuICAgIHRoaXMucHJvcGFnYXRlT25DaGFuZ2UgPSBmbjtcbiAgfVxuICByZWdpc3Rlck9uVG91Y2hlZChmbjogYW55KTogdm9pZCB7XG4gICAgLy8gdG9kb1xuICB9XG4gIHNldERpc2FibGVkU3RhdGU/KGlzRGlzYWJsZWQ6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICAvLyB0b2RvXG4gIH1cblxuICBwdWJsaWMgZ2V0TWF4U2l6ZSgpOiBzdHJpbmcge1xuICAgIGNvbnN0IHNpemVzID0ge1xuICAgICAgY3BmOiAxOCxcbiAgICAgIGNucGo6IDE4LFxuICAgICAgcGhvbmU6IDEzXG4gICAgfTtcblxuICAgIHJldHVybiBzaXplc1t0aGlzLnR5cGUudG9TdHJpbmcoKV07XG4gIH1cbiAgcHJpdmF0ZSBmb3JtYXRUb0NwZih2OiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIHYgPSB2LnJlcGxhY2UoL1xcRC9nLCAnJyk7IC8vIFJlbW92ZSB0dWRvIG8gcXVlIG7Do28gw6kgZMOtZ2l0b1xuICAgIHYgPSB2LnJlcGxhY2UoLyhcXGR7M30pKFxcZCkvLCAnJDEuJDInKTsgLy8gQ29sb2NhIHVtIHBvbnRvIGVudHJlIG8gdGVyY2Vpcm8gZSBvIHF1YXJ0byBkw61naXRvc1xuICAgIHYgPSB2LnJlcGxhY2UoLyhcXGR7M30pKFxcZCkvLCAnJDEuJDInKTsgLy8gQ29sb2NhIHVtIHBvbnRvIGVudHJlIG8gdGVyY2Vpcm8gZSBvIHF1YXJ0byBkw61naXRvc1xuICAgIC8vIGRlIG5vdm8gKHBhcmEgbyBzZWd1bmRvIGJsb2NvIGRlIG7Dum1lcm9zKVxuICAgIHYgPSB2LnJlcGxhY2UoLyhcXGR7M30pKFxcZHsxLDJ9KSQvLCAnJDEtJDInKTsgLy8gQ29sb2NhIHVtIGjDrWZlbiBlbnRyZSBvIHRlcmNlaXJvIGUgbyBxdWFydG8gZMOtZ2l0b3NcblxuICAgIHJldHVybiB2O1xuICB9XG5cbiAgcHJpdmF0ZSBmb3JtYXRUb0NucGoodjogc3RyaW5nKTogc3RyaW5nIHtcbiAgICB2ID0gdi5yZXBsYWNlKC9cXEQvZywgJycpOyAvLyBSZW1vdmUgdHVkbyBvIHF1ZSBuw6NvIMOpIGTDrWdpdG9cbiAgICB2ID0gdi5yZXBsYWNlKC9eKFxcZHsyfSkoXFxkKS8sICckMS4kMicpOyAvLyBDb2xvY2EgcG9udG8gZW50cmUgbyBzZWd1bmRvIGUgbyB0ZXJjZWlybyBkw61naXRvc1xuICAgIHYgPSB2LnJlcGxhY2UoL14oXFxkezJ9KVxcLihcXGR7M30pKFxcZCkvLCAnJDEuJDIuJDMnKTsgLy8gQ29sb2NhIHBvbnRvIGVudHJlIG8gcXVpbnRvIGUgbyBzZXh0byBkw61naXRvc1xuICAgIHYgPSB2LnJlcGxhY2UoL1xcLihcXGR7M30pKFxcZCkvLCAnLiQxLyQyJyk7IC8vIENvbG9jYSB1bWEgYmFycmEgZW50cmUgbyBvaXRhdm8gZSBvIG5vbm8gZMOtZ2l0b3NcbiAgICB2ID0gdi5yZXBsYWNlKC8oXFxkezR9KShcXGQpLywgJyQxLSQyJyk7IC8vIENvbG9jYSB1bSBow61mZW4gZGVwb2lzIGRvIGJsb2NvIGRlIHF1YXRybyBkw61naXRvc1xuICAgIHJldHVybiB2O1xuICB9XG5cbiAgcHJpdmF0ZSBmb3JtYXRUb1Bob25lKHY6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgdiA9IHYucmVwbGFjZSgvXFxEL2csICcnKS50cmltKCk7IC8vIFJlbW92ZSB0dWRvIG8gcXVlIG7Do28gw6kgZMOtZ2l0b1xuXG4gICAgaWYgKHYubGVuZ3RoIDw9IDcpIHtcbiAgICAgIHYgPSB2LnJlcGxhY2UoL14oXFxkezJ9KShcXGR7MSw0fSkvLCAnJDEgJDInKTsgLy8gU2VwYXJhIG8gREREIGRvIHRlbGVmb25lXG4gICAgfSBlbHNlIGlmICh2Lmxlbmd0aCA+IDcpIHtcbiAgICAgIHYgPSB2LnJlcGxhY2UoLyhcXGR7Mn0pKFxcZHsxLDV9KShcXGR7MSw0fSkvLCAnJDEgJDItJDMnKTsgLy8gU2VwYXJhIG8gREREIGUgYWp1c3RhIG9zIGRpZ2l0b3MgZG8gY2VsdWxhclxuICAgIH1cblxuICAgIHJldHVybiB2O1xuICB9XG5cbiAgcHJpdmF0ZSBzZXRGb2N1c1Bvc2l0aW9uVG9GaW5pc2goKTogdm9pZCB7XG4gICAgY29uc3QgdGV4dEZpZWxkID0gdGhpcy5wYWdlLmdldFZpZXdCeUlkKHRoaXMuZmllbGRJZCk7XG4gICAgaWYgKHRleHRGaWVsZCAmJiB0aGlzLnBhZ2UuYW5kcm9pZCkge1xuICAgICAgdGV4dEZpZWxkLmFuZHJvaWQuc2V0U2VsZWN0aW9uKHRleHRGaWVsZC5hbmRyb2lkLmxlbmd0aCgpKTtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGVudW0gRG9jdW1lbnRUeXBlIHtcbiAgQ1BGID0gJ2NwZicsXG4gIENOUEogPSAnY25waicsXG4gIFBIT05FID0gJ3Bob25lJ1xufVxuIl19