var count = 100;

var path = new Path.Circle({
	center: [0, 0],
	radius: 5,
	fillColor: '#f5b700',
	strokeColor: 'black'
});

var symbol = new Symbol(path);

for (var i = 0; i < count; i++) {
	var center = Point.random() * view.size;
	var placed = symbol.place(center);
	placed.scale(i / count + 0.001);
	placed.data.vector = new Point({
		angle: Math.random() * 360,
		length : (i / count) * Math.random() / 5
	});
}

var vector = new Point({
	angle: 45,
	length: 0
});

var mouseVector = vector.clone();

function onMouseMove(event) {
	mouseVector = view.center - event.point;
	return false;
}

function onFrame(event) {
	vector = vector + (mouseVector - vector) / 30;
	
	for (var i = 0; i < count; i++) {
		var item = project.activeLayer.children[i];
		var size = item.bounds.size;
		var length = vector.length / 25 * size.width / 25;
		item.position += vector.normalize(length) + item.data.vector;
		keepInView(item);
	}
}

function keepInView(item) {
	var position = item.position;
	var viewBounds = view.bounds;
	if (position.isInside(viewBounds))
		return;
	var itemBounds = item.bounds;
	if (position.x > viewBounds.width + 5) {
		position.x = -item.bounds.width;
	}

	if (position.x < -itemBounds.width - 5) {
		position.x = viewBounds.width;
	}

	if (position.y > viewBounds.height + 5) {
		position.y = -itemBounds.height;
	}

	if (position.y < -itemBounds.height - 5) {
		position.y = viewBounds.height
	}
}