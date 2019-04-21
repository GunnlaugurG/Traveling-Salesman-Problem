import drawService from './draw.js';

class TSP {
    constructor() {
        this.points = [];
        this.verticies = [];
        this.distance = 0;
        this.c = document.getElementById("canvas");
        this.ctx = this.c.getContext("2d");
        this.numberOfCities = 10;
    }
    
    // clear points array and clear the canvas
    clearRoute() {
        this.points = [];
        drawService.clear(this.ctx, this.c);
    }
    
    drawRoute() {
        // create verticies from points
        for(var i = 0; i < this.points.length-1; i++){
            let vert = this.generateVert(i, i+1);
            // if its the last the last parameter is false to make it white instead of yellow
            if(this.points.length-2 !== i){
                drawService.drawLine(this.ctx, vert, false);
            }
            else{
                drawService.drawLine(this.ctx, vert, true);
            }
        };
        
    }
    
    // generate points to between 1 and 800
    generatePoints(numberOfPoints) {
        let point;
        // generate n many points and add to points array
        for(var i = 0; i < numberOfPoints; i++){
            point = {
                x: Math.floor((Math.random() * 800) + 1),
                y: Math.floor((Math.random() * 800) + 1)
            };
            this.points.push(point);
        }
        // add fist point again as last points to close circle
        this.points.push(this.points[0]);
    };

    // generate Vertecies from points[i] to points[i+1]
    generateVert (from, to){
        let vert = {
            fromX: this.points[from].x,
            fromY: this.points[from].y,
            toX: this.points[to].x,
            toY: this.points[to].y
       };
       this.verticies.push(vert);
       return vert;
    }
}

export default TSP;