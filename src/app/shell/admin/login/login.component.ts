import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../shared/services/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    public formGroup: FormGroup;
    public errorObject;

    constructor(public readonly authService: AuthService) {
    }

    ngOnInit(): void {
        this.formGroup = new FormGroup({
            email: new FormControl('', [Validators.required]),
            password: new FormControl('', [Validators.required])

        });
        this.authService.error.subscribe((error) => {
            if (error) {
                if (error.message === 'INVALID_EMAIL' || error.message === 'EMAIL_NOT_FOUND') {
                    this.formGroup.controls['email'].setErrors({'INVALID_EMAIL': true});
                }
                if (error.message === 'INVALID_PASSWORD' || error.message === 'EMAIL_NOT_FOUND') {
                    this.formGroup.controls['password'].setErrors({'INVALID_PASSWORD': true});
                }
            }

        });

    }

    public onLogin(): void {
        this.authService.login(this.formGroup);
    }


    public reset(): void {
        this.formGroup.reset();
        console.log(this.formGroup);
    }
}
