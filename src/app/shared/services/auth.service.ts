import {Injectable} from '@angular/core';
import {HttpService} from './http.service';
import {FormGroup} from '@angular/forms';
import {BehaviorSubject} from 'rxjs';
import {Router} from '@angular/router';

@Injectable()
export class AuthService {
    private errorSubject$ = new BehaviorSubject(null);
    public error = this.errorSubject$.asObservable();

    constructor(private readonly httpService: HttpService, private router: Router) {
    }

    public login(formGroup: FormGroup): void {
        if (formGroup.valid) {
            this.httpService.loginRequest(formGroup.value).subscribe(response => {
                if (response['registered']) {
                    window.localStorage.setItem('user', response['idToken']);
                    this.router.navigate(['/admin']).then(r => r);
                }
            }, error => this.errorSubject$.next(error.error.error));
        }

    }

    public tokenExpired(token: string): boolean {
        const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
        return (Math.floor((new Date()).getTime() / 1000)) >= expiry;
    }
}
