import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { ModalController, NavController, LoadingController, MenuController } from '@ionic/angular';

import { TodoService, Todo } from 'src/app/services/todo.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuControllerI } from '@ionic/core';

import * as firebase from 'Firebase';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  // splash: true;
  todo: Todo = {
       name: null,
    lastName: null,
    gender: null,
    email: null,
    mobile: null,

  }
  todoId = null;
  static splash: boolean = true;
  items: any;
  info: any;

  private todosCollection: AngularFirestoreCollection<Todo>;
  private todos: Observable<Todo[]>;

  constructor(private todoService: TodoService,
    private route: ActivatedRoute,
    private loadingController: LoadingController,
    private modalCtr: ModalController,
    private nav: NavController,
    private menuCtrl: MenuController,
    private router: Router) {

   // var infoRef = this.todosCollection.doc("todo");
   // var citiesRef = db.collection('cities');
   // var database = firebase.database();

  /*  firebase.database().ref('infos/' + this.route.snapshot.paramMap.get('key')).on('value', resp => {
      this.info = snapshotToObject(resp);
    });*/
  }

  ionViewDidLoad() {

    setTimeout(() => {
      LoginPage.splash = false;

    }, 4000);
  }
  /*
    async openModal(){
      const modal= await this.modalCtr.create({
        component:ModalPage,
        componentProps:{
         // custom_id:this.value
          //foo:'hello'
        }
      });
     return await modal.present();
    }*/
  ionViewWillEnter() {

    this.menuCtrl.swipeEnable(false)
  }
  /*
    ionViewDidLeave() {
  
  
      this.menuCtrl.swipeEnable(true)
   }*/
  ngOnInit() {
    this.menuCtrl.swipeEnable(false)
    this.todoId = this.route.snapshot.params['id'];
    if (this.todoId) {
      this.loadTodo();
    }

    /*   const todoId: string = this.route.snapshot.paramMap.get('id');
       this.info = this.todoService.getTodo(todoId).valueChanges();
       */

  }
  /*
    print(key, email) {
      this.items=this.todoService.get(key, {email: email});
    }
  */

  login() {
    (<any>window).AccountKitPlugin.loginWithPhoneNumber({
      useAccessToken: true,
      defaultCountryCode: "IN",
      facebookNotificationsEnabled: true
    }, (successdata) => {
      (<any>window).AccountKitPlugin.getAccount((user) => {
        // this.nav.setRoot('home');
        this.router.navigateByUrl('/home');
      })
    }, (err) => {
      alert(err);
    })
  }

  async loadTodo() {
    const loading = await this.loadingController.create({
      message: ''
    });
    await loading.present();
    this.todoService.getTodo(this.todoId).subscribe(rec => {
      loading.dismiss();
      this.todo = rec;
    });
  }
  async saveTodo() {
    const loading = await this.loadingController.create({
      message: ''
    });
    await loading.present();

    if (this.todoId) {
      this.todoService.updateTodo(this.todo, this.todoId).then(() => {
        loading.dismiss();
        this.nav.navigateForward('/home');
      });
    } else {
      this.todoService.addTodo(this.todo).then(() => {
        loading.dismiss();
        this.nav.navigateForward('/home');
      });
    }

  }

}
export const snapshotToObject = snapshot => {
  let item = snapshot.val();
  item.key = snapshot.key;

  return item;
}