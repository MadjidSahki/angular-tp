import { Component, ViewChild, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ChannelService } from 'services';
import { EventEmitter } from '@angular/core';

/**
 * Ajoute un nouveau channel
 */
@Component({
    selector: 'add-channel',
    templateUrl: 'add-channel.html'
})
export class AddChannelComponent {
    @ViewChild(NgForm, { static: false })
    ngForm: NgForm;
    isVisible: boolean = false;
    @Output() channelAdded: EventEmitter<any> = new EventEmitter();

    model = { name: '' };
    constructor(
        private channelService: ChannelService
    ) {
    }

    show() {
        this.isVisible = true;
    }

    hide() {
        this.isVisible = false;
        this.model.name = '';
    }

    async save() {
        if (this.ngForm.valid) {
            let channel = await this.channelService.add(this.model.name);
            this.channelAdded.emit(channel);
            this.hide();
        }
    }
}