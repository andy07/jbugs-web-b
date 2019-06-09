import {Component, Input, OnInit} from '@angular/core';
import {Attachment} from '../models/restBug';

@Component({
  selector: 'app-attachment-create',
  templateUrl: './attachment-create.component.html',
  styleUrls: ['./attachment-create.component.scss']
})
export class AttachmentCreateComponent implements OnInit {

  @Input()
  public bugTitle: string;
  public attachments: Attachment[];

  constructor() {
    this.attachments = [];
  }

  ngOnInit() {
  }

  addAttachment() {
    this.attachments.push({
      file: 'ma-sa',
      id: 1
    });
    console.log(this.attachments);
  }

  onFileChange(event) {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        console.log(file);
      };
    }
  }

  send() {

  }
}
