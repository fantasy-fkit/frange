/**
 * Created by KlimMalgin on 06.03.2015.
 */

var constant = require('core.lambda').constant,
    Option = require('fantasy-options').Option;

var opt = function (val) {
    return Option.from(val);
};

var rangeOp = function (/*arguments*/) {
    var args = arguments;
    return this.cata({
        Cons: function(x) {
            return Seq.Cons(x.apply(x, args));
        },
        Nil: constant(this)
    });
};

var accumulationOp = function (accumulatorFunction) {
    return this.chain(function (list) {
        var ln = list.length,
            res = Option.None;

        for (var i = 0; i<ln; i++) {
            if (i == 0) res = accumulatorFunction(opt(list[i]), opt(list[i]), opt(i), opt(ln));
            else res = accumulatorFunction(res, opt(list[i]), opt(i), opt(ln));
        }
        return res;
    });
};

module.exports = {

    accumulator: accumulationOp,
    range: rangeOp

};
