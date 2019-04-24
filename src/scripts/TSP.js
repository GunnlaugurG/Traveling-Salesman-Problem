import drawService from './draw.js';

class TSP {
    constructor() {
        this.c = document.getElementById("canvas");
        this.ctx = this.c.getContext("2d");
        this.route = {
            points: [],
            edge: [],
            distance: 0
        };
        this.tempRoute = {
            points: [],
            edge: [],
            distance: 0
        };
        this.numberOfCities = 300;
        this.running = false;
        this.timeOut = 10;
    }
    
    // clear points array and clear the canvas
    clearRoute() {
        this.running = false;
        this.route.points = [];
        this.route.edge = [];
        this.route.distance = 0;
        this.tempRoute.points = [];
        this.tempRoute.edge = [];
        this.tempRoute.distance = 0;
        drawService.clear(this.ctx, this.c);
    }

    // update the number of cities to route through
    updateCitiCount(cities){
        this.numberOfCities = cities;
        console.log("numberOf cities: "+this.numberOfCities);
    }

    // solve the shortest path, set route to running and call the twoopt()
    solve(){
        this.running = true;
        this.twoOpt();
    }

    swap(i, k) {
        for(let a = 0; a < i; a++){
            this.tempRoute.points[a] = this.route.points[a];
        }

        let dec = 0;
        for(let a = i; a <= k; a++){
            this.tempRoute.points[a] = this.route.points[k - dec];
            dec++;
        }

        for(let a = k + 1; a < this.route.points.length; a++){
            this.tempRoute.points[a] = this.route.points[a];
        }
        this.updateRoute(this.tempRoute);
    }
    
    async twoOpt(){
        let shorter = true;
        const routeLength = this.route.points.length;
        while(shorter && this.running){
            shorter = false;
            for(let i = 1; i < routeLength - 1; i++){
                if(!this.running) break;
                for(let k = i + 1; k < routeLength; k++){
                    if(!this.running) break;
                    this.swap(i, k);
                    if(this.tempRoute.distance < this.route.distance){
                        shorter = true;
                        this.route.points = [...this.tempRoute.points];
                        await this.timer(this.route);
                    };
                };
            };
        };
        this.updateRoute(this.route);
        this.running = false;
        document.getElementById('spinner').style.visibility = 'hidden';
    };

    timer() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                this.updateRoute(this.route);
                resolve();
            }, this.timeOut);
        });
    }
    
    updateRoute(route) {
        route.edge = [];
        route.distance = 0;
        drawService.clear(this.ctx, this.c);
        // create edge from points
        
        let vert;
        for(var i = 0; i < route.points.length; i++){
            // if its the last the last parameter is false to make it white instead of yellow
            if(route.points.length-1 !== i){
                vert = this.generateVert(i, i+1, route);
                drawService.drawLine(this.ctx, vert);
            }
            else{
                vert = this.generateVert(i, 0, route);
                drawService.drawLine(this.ctx, vert);
                };
            };
            // draw the endpoints on the canvas
            drawService.drawDots(this.ctx, this.route.points);
            this.updateDistance();
    };
    
    // generate points to between 1 and 800
    generatePoints(numberOfPoints) {
        let point;
        // generate routeLength many points and add to points array
        for(var i = 0; i < numberOfPoints; i++){
            point = {
                x: Math.floor((Math.random() * 800) + 1),
                y: Math.floor((Math.random() * 800) + 1)
            };
            this.route.points.push(point);
        }
        // add fist point again as last points to close circle
        // this.route.points.push(this.route.points[0]);
    };

    setRouteFromFile(points){
        this.clearRoute();
        this.route.points = [...points];
        this.updateRoute(this.route);
    }

    // calculate the length from one point to another
    calculateLength(from, to){
        var dist = Number(Math.sqrt(Math.pow(from.x - to.x, 2) + Math.pow(from.y - to.y, 2)));
        return dist;
    }

    // update the distance in the html
    updateDistance() {
        document.getElementById('distance').innerHTML = "Distance: " + this.route.distance.toFixed(1);
    }
    // generate Vertecies from points[i] to points[i+1]
    generateVert (from, to, route){
        let vert = {
            fromX: route.points[from].x,
            fromY: route.points[from].y,
            toX: route.points[to].x,
            toY: route.points[to].y
       };
       route.distance += this.calculateLength(route.points[from], route.points[to]);
       route.edge.push(vert);
       return vert;
    }
}

export default TSP;