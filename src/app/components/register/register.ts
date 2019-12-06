import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { RegistrationService } from '../../services/index';
import { UserRegistration } from 'models';
import { NgForm } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd';

/**
 * Ajoute un nouvel utilisateur
 */
@Component({
    selector: 'register',
    templateUrl: 'register.html'
})
export class RegisterComponent {
    @ViewChild(NgForm, { static: false })
    ngForm: NgForm;
    usernameInvalid = false;
    model = new UserRegistration();

    constructor(
        private registrationService: RegistrationService,
        private messageService: NzMessageService,
        private router: Router
    ) { }

    async register() {
        if (this.ngForm.form.invalid) {
            return;
        }

        let exist = await this.registrationService.usernameExists(this.model.username)
        let user: UserRegistration;

        if (!exist) {
            user = await this.registrationService.register(this.model);
        } else {
            this.usernameInvalid = true;
            return;
        }

        if (user) {
            this.router.navigate(['/']);
        }
    }
}
