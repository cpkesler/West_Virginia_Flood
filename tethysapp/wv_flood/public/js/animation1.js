//This is another way to display the data using the geoserver built into tethys, there area still bugs that need to be worked out

//Here we are declaring the projection object for Web Mercator
var projection = ol.proj.get('EPSG:3857');

//Define Basemap
//Here we are declaring the raster layer as a separate object to put in the map later
var baseLayer = new ol.layer.Tile({
    source: new ol.source.BingMaps({
        key: '5TC0yID7CYaqv3nVQLKe~xWVt4aXWMJq2Ed72cO4xsA~ApdeyQwHyH_btMjQS1NJ7OHKY8BK-W-EMQMrIavoQUMYXeZIQOUURnKGBOC7UCt4',
        imagerySet: 'AerialWithLabels'  // Options 'Aerial', 'AerialWithLabels', 'Road'
        })
    });

flood_layer_obj_list = [];
for(i=1; i<=11; i++)
{
    //Define all WMS Sources:
        var FloodMap =  new ol.source.TileWMS({
        url:'http://tethys.byu.edu:8181/geoserver/wms',
        params:{
            LAYERS:"wv_flood:flood_" + i.toString(),
//            FORMAT:"image/png", //Not a necessary line, but maybe useful if needed later
        },
        crossOrigin: 'Anonymous' //This is necessary for CORS security in the browser
        });

        var flood = new ol.layer.Tile({
          source:FloodMap
          });
        flood.setOpacity(0.8);

        flood.setVisible(false);
        flood_layer_obj_list.push(flood);

};

land_layer_obj_list = [];
for(i=1; i<=11; i++)
{
    //Define all WMS Sources:
        var LandCover =  new ol.source.TileWMS({
        url:'http://tethys.byu.edu:8181/geoserver/wms',
        params:{
            LAYERS:"wv_flood:land_" + i.toString(),
//            FORMAT:"image/png", //Not a necessary line, but maybe useful if needed later
        },
        crossOrigin: 'Anonymous' //This is necessary for CORS security in the browser
        });

        var land = new ol.layer.Tile({
          source:LandCover
          });
        land.setOpacity(0.8);

        land.setVisible(false);
        land_layer_obj_list.push(land);
};

//var LandCover =  new ol.source.TileWMS({
//        url:'http://tethys.byu.edu:8181/geoserver/wms',
//        params:{
//            LAYERS:"",
////            FORMAT:"image/png", //Not a necessary line, but maybe useful if needed later
//        },
//        crossOrigin: 'Anonymous' //This is necessary for CORS security in the browser
//        });

//Define all WMS layers
//The gauge layers can be changed to layer.Image instead of layer.Tile (and .ImageWMS instead of .TileWMS) for a single tile
//var land = new ol.layer.Tile({
//    source:LandCover
//    });

//Thanks to http://jsfiddle.net/GFarkas/tr0s6uno/ for getting the layer working

//Set opacity of layers

//land.setOpacity(0.7);

layers = [baseLayer];
layers = layers.concat(flood_layer_obj_list);
layers = layers.concat(land_layer_obj_list);

//Establish the view area. Note the reprojection from lat long (EPSG:4326) to Web Mercator (EPSG:3857)
var view = new ol.View({
        center: [-8940000, 4551000],
        projection: projection,
        zoom: 13,
    })

//Declare the map object itself.
var map = new ol.Map({
    target: document.getElementById("map"),
    layers: layers,
    view: view,
});

//flood.setVisible(false);

map.addControl(new ol.control.ZoomSlider());

//This function is ran to set a listener to update the map size when the navigation pane is opened or closed
(function () {
    var target, observer, config;
    // select the target node
    target = $('#app-content-wrapper')[0];

    observer = new MutationObserver(function () {
        window.setTimeout(function () {
            map.updateSize();
        }, 350);
    });

    config = {attributes: true};

    observer.observe(target, config);
}());

function setLayersVisibility(layer_index, layer_list_obj)
{
//    alert("hi");
    for(i=0; i<11; i++)
    {
        var layer = layer_list_obj[i];
        if (i==layer_index)
        {
            layer.setVisible(true);
        }
        else
        {
            layer.setVisible(false);
        }
    }
}

//Here we set the styles and inital setting for the slider bar (https://jqueryui.com/slider/#steps)
$(function() {
    $( "#slider" ).slider({
      value:0,
      min: 0,
      max: 11,
      step: 1,
      slide: function( event, ui ) {
        $( "#amount" ).val( ui.value );
        var decimal_value = ui.value.toString().split(".").join("")
        if (ui.value != 0) {
//            var url = 'http://geoserver.byu.edu/arcgis/services/West_Virginia_Flood/Flood_' + decimal_value + '/MapServer/WmsServer?';
//            var url = "wv_flood:flood_" + decimal_value;
            var layer_index = parseInt(decimal_value) - 1;
            setLayersVisibility(layer_index, flood_layer_obj_list);
            setLayersVisibility(layer_index, land_layer_obj_list);
           }
      }
    });
    $( "#amount" ).val( $( "#slider" ).slider( "value" ) );
  });

