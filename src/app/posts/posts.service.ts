import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Observable } from 'rxjs';
import { Post } from './post.model';
import { environment } from '../../environments/environment';

const POSTS_SERVER_URL = environment.apiUrl + '/posts/';

@Injectable({providedIn: 'root'})
export class PostsService {
    private posts: Post[] = [];
    private postsUpdated = new Subject<{ posts: Post[], postCount: number }>();

    constructor(private http: HttpClient, private router: Router) {

    }

    getPosts(currentPage: number, postsPerPage: number) {
        const queryParams = `?page=${currentPage}&pagesize=${postsPerPage}`;
        this.http.get<{ posts: Post[], maxPosts: number }>(POSTS_SERVER_URL + queryParams)
            .subscribe(res => {
                this.posts = res.posts;
                this.postsUpdated.next({
                    posts: [...this.posts], 
                    postCount: res.maxPosts
                });
            });
    }

    getPostUpdateListener() {
        return this.postsUpdated.asObservable();
    }

    getPost(id: string): Observable<Post> {
        return this.http.get<Post>(POSTS_SERVER_URL + id);
    }

    addPost(title: string, image: File, content: string) {
        const postData = new FormData();
        postData.append("title", title);
        postData.append("image", image, title);
        postData.append("content", content);

        this.http.post<Post>(POSTS_SERVER_URL, postData)
            .subscribe(() => {
                this.router.navigate(['/']);
            });
    }

    updatePost(id: string, title: string, image: File | string, content: string) {
        let postData: FormData | Post;
        if (typeof(image) === 'object') {
            postData = new FormData();
            postData.append("_id", id);
            postData.append("title", title);
            postData.append("image", image, title);
            postData.append("content", content);
        } else {
            postData = { 
                _id: id, 
                title: title,
                imagePath: image, 
                content: content, 
                creator: null 
            };
        }
        
        this.http.put(POSTS_SERVER_URL + id, postData)
            .subscribe(() => {
                this.router.navigate(['/']);
            });
    }

    deletePost(postId: string) {
        return this.http.delete(POSTS_SERVER_URL + postId);
    }
}