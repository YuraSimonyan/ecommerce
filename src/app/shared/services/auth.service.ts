import {Injectable} from '@angular/core';
import {HttpService} from './http.service';
import {FormGroup} from '@angular/forms';

@Injectable()
export class AuthService {
    constructor(private readonly httpService: HttpService) {

    }

    public login(formGroup: FormGroup): void {
        if (formGroup.valid) {
            this.httpService.loginRequest(formGroup.value).subscribe(response => {
                if (response['registered']) {
                    // window.localStorage.setItem('user', response)
                    window.localStorage.setItem('user', response['idToken']);
                }
            }, error => console.log(error.error.error.message));
        }

    }

    public tokenExpired(token: string): boolean {
        const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
        return (Math.floor((new Date()).getTime() / 1000)) >= expiry;
    }
}
