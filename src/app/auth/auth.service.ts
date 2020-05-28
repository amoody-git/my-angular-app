import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AuthData } from './auth-data.model';
import { environment } from '../../environments/environment';

const USER_SERVER_URL = environment.apiUrl + '/user/';

@Injectable({ providedIn: "root" })
export class AuthService {

    private isAuthenticated = false;
    private userId: string;
    private token: string;
    private tokenTimer: any;
    private authStatusListener = new Subject<boolean>();

    constructor(private http: HttpClient, private router: Router) {}

    getIsAuth() {
        return this.isAuthenticated;
    }

    getUserId () {
        return this.userId;
    }

    getToken() {
        return this.token;
    }

    getAuthStatusListener() {
        return this.authStatusListener.asObservable();
    }

    createUser(email: string, password: string) {
        const authData: AuthData = { email: email, password: password };
        this.http.post(USER_SERVER_URL + 'register', authData)
            .subscribe(() => {
                this.router.navigate(['/auth/login']);
            }, () => {
                this.authStatusListener.next(false);
            });
    }

    login(email: string, password: string) {
        const authData: AuthData = { email: email, password: password };
        this.http.post<{ userId: string, token: string, expiresIn: number }>(USER_SERVER_URL + 'login', authData)
            .subscribe(response => {
                const token = response.token;
                this.token = token;
                if (token) {
                    const expiresInDuration = response.expiresIn;
                    this.setAuthTimer(expiresInDuration);
                    this.isAuthenticated = true;
                    this.userId = response.userId;
                    this.authStatusListener.next(true);
                    const now = new Date();
                    const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
                    this.saveAuthData(this.userId, token, expirationDate);
                    this.router.navigate(['/']);
                }
            }, () => {
                this.authStatusListener.next(false);
            });
    }

    autoAuthUser() {
        const authData = this.getAuthData();
        if (!authData) {
            return;
        }
        const now = new Date();
        const expiresIn = authData.expirationDate.getTime() - now.getTime();
        if (expiresIn > 0) {
            this.isAuthenticated = true;
            this.userId = authData.userId;
            this.token = authData.token;
            this.setAuthTimer(expiresIn / 1000);
            this.authStatusListener.next(true);
        }
    }

    logout() {
        this.isAuthenticated = false;
        this.userId = null;
        this.token = null;
        this.authStatusListener.next(false);
        clearTimeout(this.tokenTimer);
        this.clearAuthData();
        this.router.navigate(['/']);
    }

    private setAuthTimer(duration: number) {
        this.tokenTimer = setTimeout(() => {
            this.logout();                        
        }, duration * 1000);
    }

    private saveAuthData(userId: string, token: string, expirationDate: Date) {
        localStorage.setItem('userId', userId);
        localStorage.setItem('token', token);
        localStorage.setItem('expiration', expirationDate.toISOString());
    }

    private clearAuthData() {
        localStorage.removeItem('userId');
        localStorage.removeItem('token');
        localStorage.removeItem('expiration');
    }

    private getAuthData() {
        const userId = localStorage.getItem('userId');
        const token = localStorage.getItem('token');
        const expirationDate = localStorage.getItem('expiration');
        if (!userId || !token || !expirationDate) {
            return;
        }
        return {
            userId: userId,
            token: token, 
            expirationDate: new Date(expirationDate)
        }
    }
}