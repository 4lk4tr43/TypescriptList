TestCase('ScrollList', {

    testShift: function () {

        /*:DOC += <ul id="list" style="width: 100%; height: 100%"></ul>*/

        var listElement = document.querySelector('#list');
        var list = new Widgets.ScrollList(listElement, 3);

        list.xPositionFunction = function (index) {
            return 100 + Utility.StandardFunction.quadratic(.001)(index * 200)* ((index < 0) ? -1 : 1);
        };

        list.yPositionFunction = function (index, left) {
            return Utility.StandardFunction.quadratic(.0005, 0, 100)(left*index);
        };

        function createElement(id) {
            var element = document.createElement('li');
            element.id = id;
            element.style.width = '50px';
            element.style.height = '50px';
            element.style.position = 'absolute';
            element.style.display = 'block';
            element.style.backgroundColor = 'red';
            element.innerHTML = id;
            return element;
        }

        for (var i = 0; i < 5; i++) {
            listElement.appendChild(createElement(i));
        }
        list.setPositions();

        var e0 = list.element.children[0];
        var e1 = list.element.children[1];

        list.setPositions(0);
        var secondXPosition = parseInt(e1.style.left);

        assertTrue(parseInt(e0.style.left) < parseInt(e1.style.left));

        list.setPositions(1);

        assertEqualsDelta(secondXPosition, parseInt(e0.style.left), 1);
   }
});