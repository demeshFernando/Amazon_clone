import { formatCurrency } from "../../../scripts/utils/money.js";

describe('test suite: formatCurrency()', () => {
    it('formatting the price cents into valid dollar symbols', () => {
        expect(formatCurrency(2095)).toEqual('20.95');
    }); 

    it('testing special symbols', () => {
        expect(formatCurrency(2000.5)).toEqual('20.01');
    });
});