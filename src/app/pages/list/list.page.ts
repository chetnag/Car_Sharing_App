import { Component, OnInit, NgZone } from '@angular/core';
import { NavController, NavParams, LoadingController,AlertController } from '@ionic/angular';
import * as firebase from 'firebase';
import { Search, TodoService, Post, Feed, Todo } from 'src/app/services/todo.service';
import { ActivatedRoute } from '@angular/router';
import { ViewChild, ElementRef } from '@angular/core';

import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import * as _ from 'lodash';
import { Observable, combineLatest } from 'rxjs';

import { getQueryValue } from '@angular/core/src/view/query';
import { HomePage } from '../home/home.page';
import { map, flatMap } from 'rxjs/operators';

declare var google;

@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit {
  search: Search = {
    start: null,
    end: null,
    time: null,
    date: null,

  }
 /* my: Post = {
    start: null,
    end: null,
    time: null,
    date: null,
    vehicle: null,
    createAt: null,
    seat: null,

  } */
  searchId = null;


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

  dec1: string='';
  dec2: string='';
  date1:number;
 // allItems = any [];
 
 //allItems:{};
  /*
  animals: any;
  filteredAnimals: any;

  /// filter-able properties
  family: string;
  weight: number;
  endangered: boolean;

  /// Active filter rules
  filters = {}
  //countries: any[];
  countries: Observable<Post[]>;*/
akola:string;

  private postCollection: AngularFirestoreCollection<Post>;
  private posts: Observable<Post[]>;

  private feedCollection: AngularFirestoreCollection<Feed>;
  private feedItem: Observable<Feed[]>;

  private my:AngularFirestoreCollection<{}>;

  //alertCtrl: any;

  constructor(private todoService: TodoService,
    private route: ActivatedRoute,
    private ngZone: NgZone,
    private loadingController: LoadingController,
    private nav: NavController,
    private db: AngularFirestore,
    private alertController:AlertController
  ) {
    this.geocoder = new google.maps.Geocoder;
    this.markers = [];
    this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
    this.autocomplete = { input: '' };
    this.autocompleteItems = [];
    this.autocomplete2 = { input: '' };
    this.autocompleteItems2 = [];


   // this.dec2=this.search.end;
   /*
    this.postCollection = this.db.collection('posts',ref=>{
      return ref.where('end', '==', this.dec2);
    });
    this.posts = this.postCollection.valueChanges();

    //this.postCollection = this.db.collection<Post>('posts');
    //this.posts = this.postCollection.valueChanges();
    this.posts.subscribe(data => console.log(data));
*/

    
   // this.posts.subscribe(data => console.log(data));

    //const collection=this.db.collection('posts');
    //this.posts=this.collection.whereEqualTo('end',  'akola'))
    

    //this.posts.subscribe(data => data.where("","=","").valueChanges() );
   
    //const collection=this.db.collection('posts');
    //this.posts=collection.where('end', '==', 'akola');
    
    
   // console.log(ref)
    
/*
    var currentDate = new Date().getTime();
    this.postCollection.valueChanges()
      .filter ((data) => new Date(data.start).getTime() < currentDate)
      .subscribe ((data2) => console.log(data2));  
      */
  }
  
  
  ngOnInit() {
    this.searchId = this.route.snapshot.params['id'];
    if (this.searchId) {
      this.loadSearch();
    }
   // const my=new AngularFirestoreCollection<Post[]>();
    
   // this.get("akola");

    //this.countries = this.getPostEntry("akola");
   // console.log(this.countries.val());

    this.updateSearchResults();
    this.updateSearchResults2();
    //this.getPostEntry("akola");
   /// console.log(this.getByFilters("gcoea","akola"));
   //this.posts=this.todoService.getByFilters("gcoea","akola").valueChanges();
   //console.log(this.posts);

  // this.posts.subscribe(data => console.log(data) );
/*
   this.posts.where("end", "==", "akola")
   .onSnapshot(function(querySnapshot) {
    let allItems:any[]; 
         querySnapshot.forEach(function(doc) {
             // binded to the UI
             
             allItems.push(doc.data());
         });
         if (allItems.length > 0) {
          console.log("Document data:", allItems);
          //resolve(allItems);
      } else {
        console.log("No such document!");
        //resolve(null);
    }

     });

     console.log(this.posts);*/
 
     
  }

 
  async alert() {
    //  this.todoService.removeTodo(item.id);
  
     // this.todoService.removeTodo(item.id);
  
     
    const alert = await this.alertController.create({
      header: 'Confirm',
      message: 'Congratulations!! Your Ride is Booked. Contact your rider',
      buttons: [
        {
          text: 'okay',
          
          cssClass: 'secondary',
          handler: (blah) => {
          
          }
        }
      ]
    });
    
    await alert.present(); 
    }


  go(){
    this.nav.navigateForward('/home/${this.dec2}');
  }
 /* getVal(){
    this.postCollection = this.db.collection('posts',ref=>{
      return ref.where('end', '==', 'dec2');
    });
    this.posts = this.postCollection.valueChanges();
  }*/

  /*
  //second method
  async get(endR: string) {
    const loading = await this.loadingController.create({
      message: ''
    });
    await loading.present();
    this.todoService.getPostEntry(endR).subscribe(rec => {
      loading.dismiss();
      this.my = rec;
      console.log(rec);
    });
  }
  */

  /*
  //another method
  getPostEntry(postTitle: string): any {
     console.log(this.db.collection<any>("post", ref => ref.where('end', '==', postTitle)).valueChanges().val());
    
  }
*/


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
    this.search.start = item.description;
    this.dec1=item.description;

  }

  selectSearchResult2(item) {
    // this.clearMarkers();
    this.autocompleteItems2 = [];
    this.search.end = item.description;
    this.dec2=item.description;

  }
  async loadSearch() {
    const loading = await this.loadingController.create({
      message: ''
    });
    await loading.present();
    this.todoService.getSearch(this.searchId).subscribe(rec => {
      loading.dismiss();
      this.search = rec;
    });
  }
  /*
  async saveSearch() {
    const loading = await this.loadingController.create({
      message: ''
    });
    await loading.present();

    if (this.searchId) {
      this.todoService.updateSearch(this.search, this.searchId).then(() => {
        loading.dismiss();
        this.nav.navigateForward('/info-post');
      });
    } else {
      this.todoService.addSearch(this.search).then(() => {
        loading.dismiss();
        this.nav.navigateForward('/info-post');
      });
    }

  }*/
  async saveSearch(event ,item) {
    const loading = await this.loadingController.create({
      message: ''
    });
    await loading.present();


    this.postCollection = this.db.collection('posts',ref=>{
      return ref.where('end', '==', this.dec2)
     .where('start', '==', this.dec1)
      .where('date', '==', this.date1); 
    
    });


    this.posts = this.postCollection.valueChanges();
    loading.dismiss();
      //  this.nav.navigateForward('/info-post');

    //this.postCollection = this.db.collection<Post>('posts');
    //this.posts = this.postCollection.valueChanges();
    //this.posts.subscribe(data => console.log(data));
    
  /*  this.postCollection = this.db.collection('posts');
this.feedItem = this.postCollection.snapshotChanges().map(changes => {
      return changes.map(a => {
        //here you get the data without first name
        const data = a.payload.doc.data() ;
        //get the signup_id for getting doc from coll-signup
        const signupId = data.end;
        //get the related document
        return this.db.collection('todos').doc(signupId).snapshotChanges().map(actions => {
          return actions.payload.data();
        }).map(signup => {
          //export the data in feeds interface format
          return { firstName: signup.name, ...data };
        });
      })
    }).flatMap(feeds => combineLatest(feeds));
*/
    this.postCollection = this.db.collection('posts');
    this.feedItem = this.postCollection.snapshotChanges().pipe(map(changes  => {
     return changes.map( change => {
       const data = change.payload.doc.data();
       const signupId = data.end;
       const title = data.start;
         return this.db.doc('todos/' + signupId).valueChanges().pipe(map( (collSignupData: Todo) => {
           return Object.assign(
             {name: collSignupData.name, end: signupId, start: title}); }
         ));
     });
   }), flatMap(feeds => combineLatest(feeds)));
  
  }

  // add back when alpha.4 is out
  // navigate(item) {
  //   this.router.navigate(['/list', JSON.stringify(item)]);
  // }
}
