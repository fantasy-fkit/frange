/**
 * Created by KlimMalgin on 06.03.2015.
 */

var Seqs = require('fantasy-seqs').Seq,
    Option = require('fantasy-options').Option,
    constant = require('core.lambda').constant,
    opt = require('./fcommon').opt;

var lengthOp = function () {
    return this.fold(function (list) {
        return Option.from(list.length);
    }, constant(Option.None));
};

var rangeOp = function (/*arguments*/) {
    var args = arguments;
    return this.fold(function (list) {
        return Seqs.fromArray(list.slice.apply(list, args));
    }, Seqs.empty);
};

var accumulator = function (accumulatorFunction) {
    return this.fold(function (list) {
        var ln = list.length,
            res = Option.None;

        for (var i = 0; i<ln; i++) {
            if (i == 0) res = accumulatorFunction(opt(list[i]), opt(list[i]), opt(i), opt(ln));
            else res = accumulatorFunction(res, opt(list[i]), opt(i), opt(ln));
        }
        return res;
    }, constant(Option.None));
};

module.exports = {

    accumulator: accumulator,
    length: lengthOp,
    range: rangeOp

};
