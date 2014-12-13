var Utility;
(function (Utility) {
    /**
     * Generates standard functions
     */
    var StandardFunction = (function () {
        function StandardFunction() {
        }
        /**
         * Linear function
         *
         * @param a , scale
         * @param c , constant
         * @returns {function(number): number}
         */
        StandardFunction.linear = function (a, c) {
            return function (x) {
                return a * x + c;
            };
        };
        /**
         * Quadratic function
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
        /**
         * Creates an easing function
         *
         * @param exponent , dimension
         * @param range , start at 0 end at range
         * @returns {function(number): number}
         */
        StandardFunction.inOut = function (exponent, range) {
            return function (x) {
                var a = x;
                var r = range - x;
                var b = r;
                for (var i = 1; i < exponent; i++) {
                    a *= x;
                    b *= r;
                }
                return a / (a + b);
            };
        };
        return StandardFunction;
    })();
    Utility.StandardFunction = StandardFunction;
})(Utility || (Utility = {}));
//# sourceMappingURL=standard-function.js.map