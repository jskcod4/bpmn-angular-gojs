import { Component, OnInit, HostBinding, HostListener, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'bpmn-upload-option',
  templateUrl: './upload-option.component.html',
  styleUrls: ['./upload-option.component.scss']
})
export class UploadOptionComponent implements OnInit {
  @HostBinding('class.bpmn-upload__option') hostClass: boolean = true;

  @Output() delete = new EventEmitter<void>();
  @Output() download = new EventEmitter<void>();
  @Output() preview = new EventEmitter<void>();

  constructor() { }

  ngOnInit() {
  }

  @HostListener('click', ['$event'])
  click(evt: MouseEvent) {
    evt.preventDefault();
    evt.stopPropagation();
  }

  public clickDownload(evt: MouseEvent): void {
    evt.preventDefault();
    evt.stopPropagation();
    this.download.emit();
  }

  public clickPreview(evt: MouseEvent): void {
    evt.preventDefault();
    evt.stopPropagation();
    this.preview.emit();
  }

  public clickDelete(evt: MouseEvent): void {
    evt.preventDefault();
    evt.stopPropagation();
    this.delete.emit();
  }
}
