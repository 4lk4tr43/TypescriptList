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
   }
});