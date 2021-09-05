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

    constructor(private readonly authService: AuthService) {
    }

    ngOnInit(): void {
        this.formGroup = new FormGroup({
            email: new FormControl('', Validators.required),
            password: new FormControl('', Validators.required)

        });
    }

    public onLogin(): void {
        this.authService.login(this.formGroup);
    }


}
