import { Injectable, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as firebase from 'Firebase';
import { ActivatedRoute, Router } from '@angular/router';
import { Timestamp } from 'rxjs/internal/operators/timestamp';

export interface Todo {

  name: string;
  lastName: string;
  gender: string;
  email: string;
  mobile: number;

}

export interface Post {
  name: string;
  mobile: number;
  start: string;
  end: string;
  time: number;
  date: number;
  seat: number;
  vehicle: string;
  createAt:number;

}
export interface Search {

  start: string;
  end: string;
  time: number;
  date: number;



}

export interface Feed {

  id:string;
  start: string;
  end: string;
  time: number;
  date: number;
  name: string;
  lastName: string;
  gender: string;
  email: string;
  mobile: number;


}

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private todosCollection: AngularFirestoreCollection<Todo>;
  private todos: Observable<Todo[]>;

  private postCollection: AngularFirestoreCollection<Post>;
  private posts: Observable<Post[]>;

  private searchCollection: AngularFirestoreCollection<Search>;
  private searches: Observable<Search[]>;
db:AngularFirestore;

  constructor(db: AngularFirestore,
    private route: ActivatedRoute,
    public router: Router) {
//this.db=db;
    this.todosCollection = db.collection<Todo>('todos');
    this.todos = this.todosCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );


    this.postCollection = db.collection<Post>('posts');
    this.posts = this.postCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );


    this.searchCollection = db.collection<Search>('searches');
    this.searches = this.searchCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }
  getTodos() {
    return this.todos;
  }
  getTodo(id) {
    return this.todosCollection.doc<Todo>(id).valueChanges();
  }
  updateTodo(todo: Todo, id: string) {
    return this.todosCollection.doc(id).update(todo);
  }
  addTodo(todo: Todo) {
    return this.todosCollection.add(todo);
  }
  removeTodo(id) {
    return this.todosCollection.doc(id).delete();
  }

  
  getPosts() {
    return this.posts;
  }
  getPost(id) {
    return this.postCollection.doc<Post>(id).valueChanges();
  }
  updatePost(post: Post, id: string) {
    return this.postCollection.doc(id).update(post);
  }
  addPost(post: Post) {
    return this.postCollection.add(post);
  }
  removePost(id) {
    return this.postCollection.doc(id).delete();
  }
  
  getByFilters(size: string, category: string) {
  //  return this.postCollection = this.db.collection<Post>('post', ref => 
      // Compose a query using multiple .where() methods
      return this.postCollection.get()
        .where('start', '==', size)
        .where('end', '==', category);
     
    
   
  }
  /*getPostEntry ( postTitle: string ): Observable<any> {
    return this.db.collection<any> ( "posts" , ref => ref.where ( 'title' , '==' , postTitle ) ).valueChanges ();
  }
*/

  getSearches() {
    return this.searches;
  }
  getSearch(id) {
    return this.searchCollection.doc<Search>(id).valueChanges();
  }
  updateSearch(search: Search, id: string) {
    return this.searchCollection.doc(id).update(search);
  }
  addSearch(search: Search) {
    return this.searchCollection.add(search);
  }
  removeSearch(id) {
    return this.searchCollection.doc(id).delete();
  }

}

