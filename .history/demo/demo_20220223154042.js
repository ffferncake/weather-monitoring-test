
function initDemoMap(){

    var Esri_WorldImagery = L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, ' +
        'AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
    });

    // var Esri_DarkGreyCanvas = L.tileLayer(
    //     "http://{s}.sm.mapstack.stamen.com/" +
    //     "(toner-lite,$fff[difference],$fff[@23],$fff[hsl-saturation@20])/" +
    //     "{z}/{x}/{y}.png",
    //     {
    //         attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, ' +
    //         'NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community'
    //     }
    // );
    var ggs = L.tileLayer(
        "https://mt1.google.com/vt/lyrs=r&x={x}&y={y}&z={z}",
        {}
      
    );

    var openWeather = L.tileLayer(
        "https://tile.openweathermap.org/map/precipitation_new/3/4/2.png?appid=152118f99e361e7816ebd28eb775a6c6" ,
        {}
    );

    var baseLayers = {
        "Satellite": Esri_WorldImagery,
        // "Grey Canvas": Esri_DarkGreyCanvas,
        "Google": ggs,
        "OpenWeartherMap": openWeather
    };

    var map = L.map('map', {
        layers: [ ggs ]
    });

    var layerControl = L.control.layers(baseLayers);
    layerControl.addTo(map);
    map.setView([13.7563, 100.5018], 11);

    return {
        map: map,
        layerControl: layerControl
    };
}

// demo map
var mapStuff = initDemoMap();
var map = mapStuff.map;
var layerControl = mapStuff.layerControl;
var handleError = function(err){
    console.log('handleError...');
    console.log(err);
};

// wind-js-leaflet
var windJSLeaflet = new WindJSLeaflet.init({
	localMode: true,
	map: map,
	layerControl: layerControl,
	useNearest: false,
    timeISO: null,
    nearestDaysLimit: 7,
    displayValues: true,
    displayOptions: {
        displayPosition: 'bottomleft',
        displayEmptyString: 'No wind data'
    },
    overlayName: 'Wind',
    pingUrl: 'http://144.6.233.100:7000/alive/',
    latestUrl: 'http://144.6.233.100:7000/latest/',
    nearestUrl: 'http://144.6.233.100:7000/nearest/',
    errorCallback: handleError
});