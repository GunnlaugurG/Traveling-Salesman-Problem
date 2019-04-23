import '../styles/index.scss';
import drawService from './draw.js';
import TSP from './TSP.js';

(function (globalObject) {
    console.log("JS up and running");
    
    let tsp = new TSP();

    // start by filling canvas with 48 nodes
    newRoute();

    document.getElementById('restart').addEventListener('click', (e) => {
        newRoute();
     });
     document.getElementById('solve').addEventListener('click', (e) => {
        document.getElementById('spinner').style.visibility = 'visible';
        tsp.solve();
     });
     document.getElementById('generate').addEventListener('click', (e) => {
        newRoute();
     });
     document.getElementById('delay').addEventListener('change', (e) => {
         tsp.timeOut = document.getElementById('delay').value;
     })
 

     function newRoute(){
        var getCitieCount = document.getElementById('cities');
        var numberOfCities = getCitieCount.value;
        console.log(numberOfCities);
        if(numberOfCities <= 2){
            alert("number of cities needs to be more then 2");
            getCitieCount.value = 48;
        } 
        else{
            tsp.updateCitiCount(numberOfCities);
            tsp.clearRoute();
            tsp.generatePoints(numberOfCities);
            tsp.updateRoute(tsp.route);
        }
     }
})(window);
