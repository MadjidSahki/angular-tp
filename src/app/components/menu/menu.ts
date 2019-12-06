import { Component, Input, OnInit } from '@angular/core';
import { Channel } from 'models';
import { ChannelService } from '../../services/index';


/**
 * Side menu permettant de naviguer entre les différents channels
 */
@Component({
    selector: 'menu',
    templateUrl: 'menu.html',
})
export class MenuComponent {
    constructor(
        private channelService: ChannelService,
    ) { }
    @Input() channels: Channel[] = [];

    async getChannels() {
        this.channelService.getAll().then((value) => {
            this.channels = value;
        });
    }
}

