"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizeText = exports.formatReturnPrice = void 0;
function formatReturnPrice(price, origin) {
    switch (origin) {
        case 'aliexpress':
            price = price.replace(/R\$/g, '').replace(/,/, '.').trim();
            if (price.match(/\..*\./)) {
                return Number(price.replace('.', ''));
            }
            else {
                return Number(price);
            }
        default:
            return Number(price.replace(/R\$|\./g, '').replace(',', '.').trim());
    }
}
exports.formatReturnPrice = formatReturnPrice;
function normalizeText(text) {
    return text
        .normalize('NFD').toLocaleLowerCase().replace(/\s|-|\+|\.|,|[\u0300-\u036f]/g, '');
}
exports.normalizeText = normalizeText;
//# sourceMappingURL=index.js.map