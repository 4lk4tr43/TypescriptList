module Utility {

    /**
     * Generates standard functions
     */
    export class StandardFunction {
        /**
         * Creates an easing function
         *
         * @param exponent , dimension
         * @param range , start at 0, ends at range
         * @returns {function(number): number}
         */
        static inOut(exponent:number, range:number) {
            return function (x:number) {
                var a = x;
                var r = range - x;
                var b = r;

                for (var i = 1; i < exponent; i++){
                    a *= x;
                    b *= r;
                }

                return a / (a + b);
            }
        }
    }
}