TestCase('PositionFunction', {
    testQuadratic: function () {
        var quadraticFunction = Utility.PositionFunction.createQuadraticFunction(1,0,0);
        var quadraticPosition = new Utility.PositionFunction(quadraticFunction);

        assertEquals(0, quadraticPosition.getY(0));
        assertEquals(1, quadraticPosition.getY(1));
        assertEquals(4, quadraticPosition.getY(2));
        assertEquals(4, quadraticPosition.getY(-2));

        quadraticPosition.xOffset = 1;
        quadraticPosition.yOffset = -1;
        assertEquals(0, quadraticPosition.getY(0));
        assertEquals(3, quadraticPosition.getY(1));
        assertEquals(8, quadraticPosition.getY(2));
        assertEquals(0, quadraticPosition.getY(-2));
    },
    testCapping: function () {
        var quadraticFunction = Utility.PositionFunction.createQuadraticFunction(1,0,0);

        var wrapped = false;
        var wrapHandler = function (e) { wrapped = true; };

        var quadraticPosition = new Utility.PositionFunction(quadraticFunction, 0, 0, -2, 2, undefined, undefined,
            wrapHandler);

        assertEqualsDelta(1, quadraticPosition.getY(1), 0.001);
        assertFalse(wrapped);

        assertEqualsDelta(1, quadraticPosition.getY(3), 0.001);
        assertTrue(wrapped);
        wrapped = false;
        assertEqualsDelta(1, quadraticPosition.getY(-3), 0.001);
        assertTrue(wrapped);
        wrapped = false;

        quadraticPosition.xMin = -4;
        quadraticPosition.xMax = -2;
        assertEqualsDelta(9, quadraticPosition.getY(-1), 0.001);
        assertEqualsDelta(9, quadraticPosition.getY(-5), 0.001);

        quadraticPosition.yMin = -4;
        quadraticPosition.yMax = 4;
        assertEquals(-3, quadraticPosition.getY(-1));
        assertEquals(4, quadraticPosition.getY(-2));
    }
});