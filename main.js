/**
 * Created by bbarnett on 8/23/2016.
 */
console.log(d3);

var map = L.map('map')
    .setView([42.345706, -71.045908], 14);

L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

var testPoints = {
    "type": "FeatureCollection",
    "features": [
        {
            "type": "Feature",
            "properties": {},
            "geometry": {
                "type": "Point",
                "coordinates": [
                    -71.04609489440917,
                    42.35175718416955
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {},
            "geometry": {
                "type": "Point",
                "coordinates": [
                    -71.0442066192627,
                    42.35042512243457
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {},
            "geometry": {
                "type": "Point",
                "coordinates": [
                    -71.05467796325684,
                    42.354262652372825
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {},
            "geometry": {
                "type": "Point",
                "coordinates": [
                    -71.04763984680176,
                    42.34715828010312
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {},
            "geometry": {
                "type": "Point",
                "coordinates": [
                    -71.04583740234375,
                    42.340433759599044
                ]
            }
        }
    ]
};

var _features;

map._initPathRoot();

var svg = d3.select(map.getPanes().overlayPane).append("svg"),
    g = svg.append("g").attr("class", "leaflet-zoom-hide");

d3.json("data/yelp-locations.geojson", function (error, collection) {
    if (error) throw error;
    var features = collection.features;
    features.forEach(function (d) {
        d.LatLng = new L.LatLng(d.geometry.coordinates[1],
            d.geometry.coordinates[0])
    })

    console.log(features);
    var feature = g.selectAll("circle")
        .data(features)
        .enter()
        .append("circle")
        .style("stroke", "black")
        .style("opacity", .6)
        .style("fill", "red")
        .attr("r", 5);

    map.on("viewreset", update);
    update();

    function update() {
        feature.attr("transform",
            function (d) {
                return "translate(" +
                    map.latLngToLayerPoint(d.LatLng).x + "," +
                    map.latLngToLayerPoint(d.LatLng).y + ")";
            }
        )
    }
});

// var _prepareData = function () {
//     prepData1(function(){
//         prepData2(function(features){
//             setFeatures(features);
//             comparePoints(testPoints.features);
//         });
//     });
// };
//
// var prepData1 = function (callback) {
//     d3.json("data/yelp-locations.geojson"), function (error, collection) {
//         if (error) throw error;
//
//         console.log("hi");
//         collection.features.forEach(function(d) {
//             d.LatLng = new L.LatLng(d.geometry.coordinates[0],
//                 d.circle.coordinates[1])
//         })
//
//         var feature = g.selectAll("circle")
//             .data(collection.features)
//             .enter()
//             .append("circle")
//             .style("stroke", "black")
//             .style("opacity", .6)
//             .style("fill", "red")
//             .attr("r", 5);
//
//         map.on("viewreset", update);
//         update();
//
//         function update() {
//             feature.attr("transform",
//                 function(d) {
//                     return "translate("+
//                         map.latLngToLayerPoint(d.LatLng).x +","+
//                         map.latLngToLayerPoint(d.LatLng).y +")";
//                 }
//             )
//         }
//         if(callback) callback();
//     };
// }
//
// var prepData2 = function (callback) {
//     d3.json("data/ten-min.geojson", function (error, collection) {
//         if (error) throw error;
//         var features = collection.features[0];
//
//         if(callback) callback(features);
//
//         var transform = d3.geo.transform({point: projectPoint}),
//             path = d3.geo.path().projection(transform);
//
//         var feature = g.selectAll("path")
//             .data(collection.features)
//             .enter().append("path").attr("class", "ten-min");
//
//         map.on("viewreset", reset);
//         reset();
//
//         // Reposition the SVG to cover the features.
//         function reset() {
//             var bounds = path.bounds(collection),
//                 topLeft = bounds[0],
//                 bottomRight = bounds[1];
//
//             svg.attr("width", bottomRight[0] - topLeft[0])
//                 .attr("height", bottomRight[1] - topLeft[1])
//                 .style("left", topLeft[0] + "px")
//                 .style("top", topLeft[1] + "px");
//
//             g.attr("transform", "translate(" + -topLeft[0] + "," + -topLeft[1] + ")");
//
//             feature.attr("d", path);
//         }
//
//         // Use Leaflet to implement a D3 geometric transformation.
//         function projectPoint(x, y) {
//             var point = map.latLngToLayerPoint(new L.LatLng(y, x));
//             this.stream.point(point.x, point.y);
//         }
//
//
//     });
// };
//
// function comparePoints(array) {
//     for (i = 0; i < array.length; i++) {
//         console.log(turf.inside(array[i], _features));
//     }
// }
//
// _prepareData();
//
//
// function setFeatures(features) {
//     _features = features;
// }