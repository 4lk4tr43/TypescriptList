var Utility;
(function (Utility) {
    /**
     * Generates standard functions
     */
    var StandardFunction = (function () {
        function StandardFunction() {
        }
        /**
         * Creates an easing function
         *
         * @param exponent , dimension
         * @param range , start at 0, ends at range
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