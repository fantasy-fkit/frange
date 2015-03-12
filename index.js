/**
 * Created by KlimMalgin on 06.03.2015.
 */

var l = require('core.lambda'),
    curry = l.curry,
    constant = l.constant,
    Option = require('fantasy-options').Option;

var opt = function (val) {
    return Option.from(val);
};

/**
 * Возьмет подмассив из массива в контексте и 
 * передаст его дальше по контексту
 * @param args набор параметров, переданных в range-метод
 * @param list массив из контекста
 */
var rangeOp = curry(2, function (args, list) {
    return list.slice.apply(list, args);
});

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
    range: function (/*arguments*/) { return this.operation(rangeOp)(arguments); }

};
