import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Post } from './post.model';

@Injectable({providedIn: 'root'})
export class PostsService {
    private posts: Post[] = [];
    private postsUpdated = new Subject<Post[]>();

    constructor(private http: HttpClient) {

    }

    getPosts() {
        this.http.get<Post[]>('http://localhost:3000/api/posts')
            .subscribe((posts) => {
                this.posts = posts;
                this.postsUpdated.next([...this.posts])
            });
    }

    getPostUpdateListener() {
        return this.postsUpdated.asObservable();
    }

    addPost(title: string, content: string) {
        const post: Post = { id: null, title: title, content: content };
        this.http.post<string>('http://localhost:3000/api/posts', post)
            .subscribe((res) => {
                console.log(res);
                this.posts.push(post);
                this.postsUpdated.next([...this.posts]);
            })
    }
}