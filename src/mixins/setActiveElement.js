import { __decorate } from "tslib";
import Vue from 'vue';
import Component from 'vue-class-component';
// You can declare a mixin as the same style as components.
let setActiveElement = class setActiveElement extends Vue {
    setActiveElement(e, cell, source) {
        const dt = e.dataTransfer;
        if (dt) {
            const updatedDataCell = { ...cell, source };
            dt.setData('text', JSON.stringify(cell));
        }
        this.$emit('setActiveElement', cell);
    }
};
setActiveElement = __decorate([
    Component
], setActiveElement);
export default setActiveElement;
//# sourceMappingURL=setActiveElement.js.map