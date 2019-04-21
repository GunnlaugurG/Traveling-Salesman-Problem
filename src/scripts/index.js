import '../styles/index.scss';
import drawService from './draw.js';
import TSP from './TSP.js';

(function (globalObject) {
    console.log("JS up and running");
    
    let tsp = new TSP();
    document.getElementById('restart').addEventListener('click', (e) => {
        tsp.clearRoute();
        tsp.generatePoints(tsp.numberOfCities);
        tsp.drawRoute();
     })
    
    tsp.generatePoints(tsp.numberOfCities);
    tsp.drawRoute();
 
})(window);
