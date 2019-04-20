import '../styles/index.scss';
import drawService from './draw.js';


(function (globalObject) {
    console.log("JS up and running");
    let points = [];
    let verticies = [];

    var c = document.getElementById("canvas");
    var ctx = c.getContext("2d");

    // generate points
    generatePoints(4);

    // create verticies from points
    for(var i = 0; i < points.length-1; i++){
        let vert = generateVert(i, i+1);
        // if its the last the last parameter is false to make it white instead of yellow
        if(points.length-2 !== i){
            drawService.drawLine(ctx, vert, false);
        }
        else{
            drawService.drawLine(ctx, vert, true);
        }
    };
    
    // generate points to between 1 and 800
    function generatePoints(numberOfPoints) {
        let point;
        // generate n many points and add to points array
        for(var i = 0; i < numberOfPoints; i++){
            point = {
                x: Math.floor((Math.random() * 800) + 1),
                y: Math.floor((Math.random() * 800) + 1)
            };
            points.push(point);
        }
        // add fist point again as last points to close circle
        points.push(points[0]);
    };

    // generate Vertecies from points[i] to points[i+1]
    function generateVert (from, to){
        let vert = {
            fromX: points[from].x,
            fromY: points[from].y,
            toX: points[to].x,
            toY: points[to].y
       };
       verticies.push(vert);
       return vert;
    }
})(window);
