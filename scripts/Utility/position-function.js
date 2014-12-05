var Utility;
(function (Utility) {
    /**
     * Converts X positions the corresponding Y positions using a provided function
     */
    var PositionFunction = (function () {
        /**
         * Constructor
         *
         * @param positionFunction , the function to use for the y position
         * @param xOffset , offset for the input
         * @param yOffset , offset for the output
         * @param xMin , min unwrapped value inclusive
         * @param xMax , max unwrapped value inclusive
         * @param yMin , min unwrapped value inclusive
         * @param yMax , max unwrapped value inclusive
         * @param wrappingEvent , fired in cas of wrapping e.x/e.y -> -1 lower, 0 not wrapped, 1 upper,
         */
        function PositionFunction(positionFunction, xOffset, yOffset, xMin, xMax, yMin, yMax, wrappingEvent) {
            if (xOffset === void 0) { xOffset = 0; }
            if (yOffset === void 0) { yOffset = 0; }
            if (xMin === void 0) { xMin = undefined; }
            if (xMax === void 0) { xMax = undefined; }
            if (yMin === void 0) { yMin = undefined; }
            if (yMax === void 0) { yMax = undefined; }
            if (wrappingEvent === void 0) { wrappingEvent = undefined; }
            this.positionFunction = positionFunction;
            this.xOffset = xOffset;
            this.yOffset = yOffset;
            this.xMin = xMin;
            this.xMax = xMax;
            this.yMin = yMin;
            this.yMax = yMax;
            this.wrappingEvent = wrappingEvent;
        }
        /**
         * Standard Quadratic function
         *
         * @param a , quadratic portion
         * @param b , linear portion
         * @param c , constant portion
         * @returns {function(number): number}
         */
        PositionFunction.createQuadraticFunction = function (a, b, c) {
            if (a === void 0) { a = 1; }
            if (b === void 0) { b = 0; }
            if (c === void 0) { c = 0; }
            return function (x) {
                return a * x * x + b * x + c;
            };
        };
        /**
         * Get the corresponding y position
         * @param x , x axis
         * @returns {number} , y axis
         */
        PositionFunction.prototype.getY = function (x) {
            if (this.xMin !== undefined || this.xMax !== undefined || this.yMin !== undefined || this.yMax !== undefined) {
                if (this.xMin === undefined)
                    this.xMin = Number.MIN_VALUE;
                if (this.xMax === undefined)
                    this.xMax = Number.MAX_VALUE;
                if (this.yMin === undefined)
                    this.yMin = Number.MIN_VALUE;
                if (this.yMax === undefined)
                    this.yMax = Number.MAX_VALUE;
                var eventArgs = { x: 0, y: 0 };
                var cappedX = x;
                if (cappedX < this.xMin) {
                    var distance = this.xMax - this.xMin;
                    eventArgs.x = -1;
                    cappedX = this.xMax + ((x + this.xMax) % distance);
                }
                else if (cappedX > this.xMax) {
                    var distance = this.xMax - this.xMin;
                    eventArgs.x = 1;
                    cappedX = this.xMin + ((x - this.xMin) % distance);
                }
                var y = this.positionFunction(cappedX);
                if (y < this.yMin) {
                    var distance = this.yMax - this.yMin;
                    eventArgs.y = -1;
                    y = this.yMax - (y % distance);
                }
                else if (y > this.yMax) {
                    var distance = this.yMax - this.yMin;
                    eventArgs.y = 1;
                    y = this.yMin + (y % distance);
                }
                if (this.wrappingEvent !== undefined && (eventArgs.x !== 0 || eventArgs.y !== 0))
                    this.wrappingEvent(eventArgs);
                return y;
            }
            else
                return this.positionFunction(x + this.xOffset) + this.yOffset;
        };
        return PositionFunction;
    })();
    Utility.PositionFunction = PositionFunction;
})(Utility || (Utility = {}));
//# sourceMappingURL=position-function.js.map