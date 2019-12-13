import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { UserLogin } from 'models';
import { Channel } from 'models';
import { AuthenticationService } from '../../services/index';
import { ChannelService } from 'services';


/**
 * Connecte un utilisateur à la plateforme
 */
@Component({
    selector: 'login',
    templateUrl: 'login.html'
})
export class LoginComponent {
    model = new UserLogin();
    failed = false;
    constructor(
        private authService: AuthenticationService,
        private router: Router,
        private channelService: ChannelService
    ) { }
    @Input() channelsId: string;

    async login() {
        this.failed = false;
        this.channelService.getAll().then((value) => {
            if (value[0].id) {
                this.channelsId = 'channel/' + value[0].id;
            } else {
                this.channelsId = '';
            }


        });
        try {
            await this.authService.authenticate(this.model);
            this.router.navigate(['/' + this.channelsId]);
        }
        catch (e) {
            return this.failed = true;
        }
    }
}
