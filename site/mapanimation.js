import { accessToken, api_params, mapDefault } from "./mapmodule.js";

mapboxgl.accessToken = accessToken;
    var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: mapDefault.center,
        zoom: mapDefault.zoom
    });

async function getBusStops(route){
    // get bus data    
    if (route == '' || route == undefined){
        return;
    }
    busStopData = await getBusStopData(route);
    console.log(new Date());
    console.log(busStopData);
    return;
    // timer
    //setTimeout(run, 15000);
}

async function getBusRoutes(){
    // get bus data    
    const routes = await getBusRouteData();
    console.log(new Date());
    //console.log(routes);
    addRouteOptions(routes);
    // timer
    //setTimeout(run, 15000);
}

//
function addRouteOptions(busRoutes){
    busRoutes.forEach(item => {
        let datalistElement = document.getElementById("bus_routes");
        let elementOption = document.createElement("option");
        elementOption.setAttribute("value", item.RouteID);
        datalistElement.appendChild(elementOption);
    });
}

function addDirectionOptions(directions){
    let directonElement = document.getElementById("direction");
    let blankOption = document.createElement("option");
    blankOption.value = "";
    blankOption.text = "(Select)";
    directonElement.add(blankOption);
    directions.forEach(item => {
        let elementOption = document.createElement("option");
        elementOption.value = item;
        elementOption.text = item;
        directonElement.add(elementOption);
    });
}

// Request bus stop data from WMATA
async function getBusStopData(busRouteID){
    const url = 'https://api.wmata.com/Bus.svc/json/jRouteDetails?RouteID=' + busRouteID;
    const response = await fetch(url, api_params);
    const json     = await response.json();
    let data = getBusStopDataShort(json);
    let directions = data.map(getDirection);
    addDirectionOptions(directions);
    display('directionDiv');
    //const data = JSON.stringify(json, null, 4);
    //console.log(data);
    return data;
}

function getBusStopDataShort(data) {
    let stopData = [];
    for (let key in data) {
        let value = data[key];
        if (key.indexOf('Direction') > -1) {
            const direction = data[key].DirectionText;
            const busStops = data[key].Stops;
            stopData.push({
                "direction": direction,
                "stops": busStops
            });
        }
    }
    return stopData;
}

function getDirection(item) {
    return item.direction;
}

// Request bus route data from WMATA
async function getBusRouteData(){
    const url = 'https://api.wmata.com/Bus.svc/json/jRoutes';
    const response = await fetch(url, api_params);
    const json = await response.json();
    console.log('Got Bus Route Options');
    return json.Routes;
}

function showStops(direction){
    if (direction === ""){
        alert("Please select a direction.");
        return;
    }
    else {
        let busStops = [];
        //routeMarkers = [];
        busStopData.find(item => item.direction == direction).stops.forEach(item => {
            busStops.push([item.Lon, item.Lat]);
        });
        let midpont = Math.floor(busStops.length / 2);
        map.flyTo({center:busStops[midpont]});
        let counter = 0;
        function addMarker(){
            setTimeout(() =>{
                if (counter >= busStops.length) return;
                let marker = new mapboxgl.Marker()
                .setLngLat(busStops[counter]).addTo(map);
                routeMarkers.push(marker);
                counter++;
                addMarker();
            },500);
        }
        addMarker();
    }
}

function hide(target){
    const element = document.getElementById(target);
    element.classList.add('hide');
}

function display(target){
    const element = document.getElementById(target);
    element.classList.remove('hide');
}

hide('directionDiv');
let busStopData, routeMarkers = [];
getBusRoutes();
let routeElement = document.getElementById("route");
routeElement.onkeydown = (e) => {
    if (e.key === "Enter"){
        routeMarkers = [];
        getBusStops(e.target.value);
    }
}
let stopsElement = document.getElementById("showStops");
stopsElement.onclick = (e) => {
    let directionList = document.getElementById("direction");
    let direction = directionList.value;
    showStops(direction);
}
// getBusLocations();