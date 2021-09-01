import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {HttpService} from '../../../shared/services/http.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    public formGroup: FormGroup;

    constructor(private readonly httpService: HttpService) {
    }

    ngOnInit(): void {
        this.formGroup = new FormGroup({
            email: new FormControl('', Validators.required),
            password: new FormControl('', Validators.required)

        });
    }

    private login(): void {
        if (this.formGroup.valid) {
            this.httpService.loginRequest(this.formGroup.value).subscribe(response => {
                if (response['registered']) {
                    alert('success');
                }
            }, error => console.log(error.error['error'].message))
        }

    }


}
