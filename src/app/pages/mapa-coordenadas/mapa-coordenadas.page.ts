import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
declare var mapboxgl: any;
@Component({
  selector: 'app-mapa-coordenadas',
  templateUrl: './mapa-coordenadas.page.html',
  styleUrls: ['./mapa-coordenadas.page.scss'],
})
export class MapaCoordenadasPage implements OnInit {


  @Input() lng: number;
  @Input() lat: number;
  
  constructor(private modalController:ModalController) { }

  ngOnInit() {
    
  }
  cerrar(){
    this.modalController.dismiss({
      'dismissed': true
    });
  }
  ngAfterViewInit() {

    mapboxgl.accessToken = 'pk.eyJ1IjoidmlsbGVndWl0YXMiLCJhIjoiY2tsaDN6dDFuNDlwejJ2bnJlN3dpcGUwaCJ9.Vt95ktwq1W6TLS10xsHPuw';
    const coordinates = document.getElementById('coordinates');
    const map = new mapboxgl.Map({
      style: 'mapbox://styles/mapbox/light-v10',
      center: [this.lng, this.lat],
      zoom: 15.5,
      pitch: 45,
      bearing: -17.6,
      container: 'map',
      antialias: true
      });
      map.addControl(
        new mapboxgl.GeolocateControl({
        positionOptions: {
        enableHighAccuracy: true
        },
        // When active the map will receive updates to the device's location as it changes.
        trackUserLocation: true,
        // Draw an arrow next to the location dot to indicate which direction the device is heading.
        showUserHeading: true
        })
        );
      map.on('load', () => {
        map.resize();

        // Marker
        new mapboxgl.Marker()
          .setLngLat([ this.lng, this.lat ])
          .addTo(map);
          //
        map.resize();
        // Insert the layer beneath any symbol layer.
        const layers = map.getStyle().layers;
        const labelLayerId = layers.find(
        (layer) => layer.type === 'symbol' && layer.layout['text-field']
        ).id;
         
        // The 'building' layer in the Mapbox Streets
        // vector tileset contains building height data
        // from OpenStreetMap.
        map.addLayer(
        {
        'id': 'add-3d-buildings',
        'source': 'composite',
        'source-layer': 'building',
        'filter': ['==', 'extrude', 'true'],
        'type': 'fill-extrusion',
        'minzoom': 15,
        'paint': {
        'fill-extrusion-color': '#aaa',
         
        // Use an 'interpolate' expression to
        // add a smooth transition effect to
        // the buildings as the user zooms in.
        'fill-extrusion-height': [
        'interpolate',
        ['linear'],
        ['zoom'],
        15,
        0,
        15.05,
        ['get', 'height']
        ],
        'fill-extrusion-base': [
        'interpolate',
        ['linear'],
        ['zoom'],
        15,
        0,
        15.05,
        ['get', 'min_height']
        ],
        'fill-extrusion-opacity': 0.6
        }
        },
        labelLayerId
        );
        });

  }

}
