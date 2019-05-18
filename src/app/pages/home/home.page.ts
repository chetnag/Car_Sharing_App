import { Component, OnInit } from '@angular/core';
import { NavController, ModalController, PopoverController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Todo, TodoService, Post } from 'src/app/services/todo.service';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  /*
  todo: Todo = {
    task: 'Test 123',
    createAt: new Date().getTime(),
    priority: 2
  }
  todoId = null;
  */
 private postCollection: AngularFirestoreCollection<Post>;
  private posts: Observable<Post[]>;
  constructor(private nav: NavController,
    private todoService: TodoService,
    private modalCtr: ModalController,
    private route: ActivatedRoute,
    private popoverCtrl: PopoverController,
    private loadingController: LoadingController,
    private router: Router
  ) {
  }
  
  ngOnInit(){}
  /*
  ngOnInit() {
    this.todoId = this.route.snapshot.params['id'];
    if (this.todoId) {
      this.loadTodo();
    }
  }
  
  async loadTodo() {
    const loading = await this.loadingController.create({
      message: 'Loading Todo..'
    });
    await loading.present();
    this.todoService.getTodo(this.todoId).subscribe(rec => {
      loading.dismiss();
      this.todo = rec;
    });
  }
  */
/*
 async saveSearch() {
  const loading = await this.loadingController.create({
    message: ''
  });
  await loading.present();

  this.postCollection = this.db.collection('posts',ref=>{
    return ref.where('end', '==', this.dec2);
  });
  this.posts = this.postCollection.valueChanges();
  loading.dismiss();
      this.nav.navigateForward('/info-post');

  //this.postCollection = this.db.collection<Post>('posts');
  //this.posts = this.postCollection.valueChanges();
  this.posts.subscribe(data => console.log(data));


}*/
  goInfoPost() {
    this.router.navigate(['info-post']);
  }
  goInfoSearch() {
    this.router.navigate(['info-search']);
  }
  /*
  pushFunction(){
     // this.router.navigate(['second']);
   this.nav.navigateForward('/second/${this.value}');
   //this.nav.navigateForward('/second');
    }
  
    async openModal(){
      const modal= await this.modalCtr.create({
        component:ModalPage,
        componentProps:{
          custom_id:this.value
          //foo:'hello'
        }
      });
     return await modal.present();
    }
  
   async openPopover(event: Event){
  const popover= await this.popoverCtrl.create({
    component:PopoverPage,
    componentProps:{
      custom_id:this.value
    },
    event : event
  });
  return await popover.present();
    }
  */

}
