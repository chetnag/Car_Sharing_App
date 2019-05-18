import { Component, OnInit, NgZone } from '@angular/core';
import { Post, TodoService } from 'src/app/services/todo.service';
import { ActivatedRoute } from '@angular/router';
import { LoadingController, NavController } from '@ionic/angular';
import { ViewChild, ElementRef } from '@angular/core';

declare var google;
@Component({
  selector: 'app-info-search',
  templateUrl: './info-search.page.html',
  styleUrls: ['./info-search.page.scss'],
})
export class InfoSearchPage implements OnInit {

  post: Post = {
 name:null,
 mobile:null,
    start: null,
  end: null,
  time: null,
  date: null,
  seat: null,
  createAt:new Date().getTime(),
  vehicle: null
  }
  postId = null;

//createAt: new Date().getTime(),
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  GoogleAutocomplete: any;
  autocomplete: { input: string; };
  autocomplete2: { input: string; };
  myLocation: any;
  autocompleteItems: any[];
  autocompleteItems2: any[];
  zone: any;
  geocoder: any;
  markers: any;
  geolocation: any;
  GooglePlaces: any;
  nearbyItems: any[];
  places: any;

  dec1: any
  dec2: any

  constructor(private todoService: TodoService,
    private route: ActivatedRoute,
    private ngZone: NgZone,
    private loadingController: LoadingController,
    private nav: NavController) {
    this.geocoder = new google.maps.Geocoder;
    this.markers = [];
    this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
    this.autocomplete = { input: '' };
    this.autocompleteItems = [];
    this.autocomplete2 = { input: '' };
    this.autocompleteItems2 = [];
  }


  ngOnInit() {
    this.postId = this.route.snapshot.params['id'];
    if (this.postId) {
      this.loadPost();
    }
    this.updateSearchResults();
    this.updateSearchResults2();
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
  selectSearchResult(item) {
    // this.clearMarkers();
    this.autocompleteItems = [];
     this.post.start=item.description;
    //this.dec1=item;
   
  }

  selectSearchResult2(item) {
    // this.clearMarkers();
    this.autocompleteItems2 = [];
     this.post.end=item.description;
    //this.dec1=item;
    
  }


  async loadPost() {
    const loading = await this.loadingController.create({
      message: ''
    });
    await loading.present();
    this.todoService.getPost(this.postId).subscribe(rec => {
      loading.dismiss();
      this.post = rec;
    });
  }
  async savePost() {
    const loading = await this.loadingController.create({
      message: ''
    });
    await loading.present();

    if (this.postId) {
      this.todoService.updatePost(this.post, this.postId).then(() => {
        loading.dismiss();
        this.nav.navigateForward('/info-post');
      });
    } else {
      this.todoService.addPost(this.post).then(() => {
        loading.dismiss();
        this.nav.navigateForward('/info-post');
      });
    }

  }

}
