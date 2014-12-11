var Utility;
(function (Utility) {
    /**
     * Converts X positions the corresponding Y positions using a provided function
     */
    var StandardFunction = (function () {
        function StandardFunction() {
        }
        /**
         * Standard Quadratic function
         *
         * @param a , quadratic portion
         * @param b , linear portion
         * @param c , constant portion
         * @returns {function(number): number}
         */
        StandardFunction.quadratic = function (a, b, c) {
            if (a === void 0) { a = 1; }
            if (b === void 0) { b = 0; }
            if (c === void 0) { c = 0; }
            return function (x) {
                return a * x * x + b * x + c;
            };
        };
        return StandardFunction;
    })();
    Utility.StandardFunction = StandardFunction;
})(Utility || (Utility = {}));
//# sourceMappingURL=standard-function.js.map