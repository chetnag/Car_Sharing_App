import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
declare var google;
@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {

 
  @ViewChild('map') mapElement: ElementRef;
  // map: google.maps.Map;
  map: any;
  GoogleAutocomplete: any;
  autocomplete: { input: string; };
  autocomplete2: { input: string; };
  myLocation:any;
  autocompleteItems: any[];
  autocompleteItems2: any[];
  zone: any;
  geocoder: any;
  markers: any;
  geolocation: any;
  GooglePlaces: any;
  nearbyItems: any[];
  places: any;

  dec1:any
  dec2:any
  

  constructor(
    private ngZone: NgZone
  ) {
    
    this.geocoder = new google.maps.Geocoder;
    this.markers = [];
    this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
    this.autocomplete = { input: '' };
    this.autocompleteItems = [];

  }

  ngOnInit(): void {

    this.map = new google.maps.Map(document.getElementById('map'), {
      center: { lat: -34.9011, lng: -56.1645 },
      zoom: 15
    });
    this.updateSearchResults();
    //this.updateSearchResults2();
  }

  updateSearchResults() {
    if (this.autocomplete.input == '') {
      this.autocompleteItems = [];
      return;
    }
    this.GoogleAutocomplete.getPlacePredictions({ input: this.autocomplete.input },
      (predictions, status) => {
        this.autocompleteItems = [];
        this.ngZone.run(() => {
          predictions.forEach((prediction) => {
            this.autocompleteItems.push(prediction);
          });
        });
      });
    // this.selectSearchResult(item);
  }
  updateSearchResults2() {
    if (this.autocomplete2.input == '') {
      this.autocompleteItems2 = [];
      return;
    }
    this.GoogleAutocomplete.getPlacePredictions({ input: this.autocomplete2.input },
      (predictions, status) => {
        this.autocompleteItems2 = [];
        this.ngZone.run(() => {
          predictions.forEach((prediction) => {
            this.autocompleteItems2.push(prediction);
          });
        });
      });
    // this.selectSearchResult(item);
  }
  /*
    selectSearchResult1(item){
      this.autocompleteItems = [];
    
      this.geocoder.geocode({'placeId': item.place_id}, (results, status) => {
        if(status === 'OK' && results[0]){
          this.autocompleteItems = [];
          this.GooglePlaces.nearbySearch({
            location: results[0].geometry.location,
            radius: '500',
            types: ['restaurant'],
             key: 'AIzaSyCnhKcJunuePGOEgJhVi-lmBEuX4VHZMvc'
          }, (near_places) => {
              this.zone.run(() => {
                this.nearbyItems = [];
                for (var i = 0; i < near_places.length; i++) {
                  this.nearbyItems.push(near_places[i]);
                }
            });
          })
        }
      })
    }
  */
 
  selectSearchResult(item) {
    // this.clearMarkers();
    this.autocompleteItems = [];
   // this.dec1=item.description;
    //this.dec1=item;
    this.geocoder.geocode({ 'placeId': item.place_id }, (results, status) => {
      if (status === 'OK' && results[0]) {
        let position = {
          lat: results[0].geometry.location.lat,
          lng: results[0].geometry.location.lng
        };
        let marker = new google.maps.Marker({
          position: results[0].geometry.location,
          map: this.map,
        });
        this.markers.push(marker);
        this.map.setCenter(results[0].geometry.location);
      }
    })
  }

  selectSearchResult2(item) {
    // this.clearMarkers();
    this.autocompleteItems2 = [];
  //  this.dec2=item.description;
    //this.dec1=item;
    this.geocoder.geocode({ 'placeId': item.place_id }, (results, status) => {
      if (status === 'OK' && results[0]) {
        let position = {
          lat: results[0].geometry.location.lat,
          lng: results[0].geometry.location.lng
        };
        let marker = new google.maps.Marker({
          position: results[0].geometry.location,
          map: this.map,
        });
        this.markers.push(marker);
        this.map.setCenter(results[0].geometry.location);
      }
    })
  }

  clearMarkers(): any {
    throw new Error("Method not implemented.");
  }
  tryGeolocation() {
    //  this.clearMarkers();
    this.geolocation.getCurrentPosition().then((resp) => {
      let pos = {
        lat: resp.coords.latitude,
        lng: resp.coords.longitude
      };
      let marker = new google.maps.Marker({
        position: pos,
        map: this.map,
        title: 'I am here!'
      });
      this.markers.push(marker);
      this.map.setCenter(pos);
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }

  calculateAndDisplayRoute() {
    let that=this;
    let directionsService = new google.maps.DirectionsService;
    let directionsDisplay = new google.maps.DirectionsRenderer;
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 6,
      center: { lat: 41.85, lng: -87.65 }
    });
    directionsDisplay.setMap(map);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        var pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };

     /*   infoWindow.setPosition(pos);
        infoWindow.setContent('Location found.');
        infoWindow.open(map); */
        map.setCenter(pos);
        this.myLocation=new google.maps.LatLong(pos);
      }, function() {
   //     handleLocationError(true, infoWindow, map.getCenter());
      });
    } else {
      // Browser doesn't support Geolocation
   //   handleLocationError(false, infoWindow, map.getCenter());
    }

    var waypts = [];
    var checkboxArray = document.getElementById('waypoints');
    /*  
       for (var i = 0; i < checkboxArray.length; i++) {
         if (checkboxArray.options[i].selected) {
           waypts.push({
             location: checkboxArray[i].value,
             stopover: true
           });
         }
       }
       */

    directionsService.route({
      origin: this.dec1,
      destination: this.dec2,
      waypoints: waypts,
      optimizeWaypoints: true,
      travelMode: 'DRIVING'
    }, function (response, status) {
      if (status === 'OK') {
        directionsDisplay.setDirections(response);
        var route = response.routes[0];
        var summaryPanel = document.getElementById('directions-panel');
        summaryPanel.innerHTML = '';
        // For each route, display summary information.
        for (var i = 0; i < route.legs.length; i++) {
          var routeSegment = i + 1;
          summaryPanel.innerHTML += '<b>Route Segment: ' + routeSegment +
            '</b><br>';
          summaryPanel.innerHTML += route.legs[i].start_address + ' to ';
          summaryPanel.innerHTML += route.legs[i].end_address + '<br>';
          summaryPanel.innerHTML += route.legs[i].distance.text + '<br><br>';
        }
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });
  }


}
