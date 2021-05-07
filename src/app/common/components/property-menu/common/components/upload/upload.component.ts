import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import {FileManager} from './common/class';

@Component({
  selector: 'bpmn-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {
  @Input() set preview(files: File[]) {
    this.files.clear();
    if (files && files.length) {
      files.forEach(file => {
        this.files.add(file);
      });
    }
  }
  files: Set<File>;
  activeFile: number = null;

  @Output() select = new EventEmitter<File[]>();

  constructor() {
    this.files = new Set<File>();
  }

  ngOnInit() {}

  get showPlaceholder(): boolean {
    return !this.files.size;
  }

  get getFiles(): File[] {
    return Array.from(this.files);
  }

  onSelect(event) {
    event.addedFiles.forEach(file => {
      this.files.add(file);
    });
    this.select.emit(this.getFiles);
  }

  onPreviewClick(evt: MouseEvent, index: number): void {
    if (this.activeFile === index) {
      this.activeFile = null;
    } else {
      this.activeFile = index;
    }
    evt.preventDefault();
    evt.stopPropagation();
  }

  getBoxClass(file: File): string [] {
    const { type } = file;
    let classList: string[] = [];
    switch (type) {
      case 'application/pdf':
        classList.push('bpmn-upload__box--red');
        break;
      default:
        break;
    }
    return classList;
  }

  onFileDownload(file: File): void {
    console.log(file);
  }

  onFilePreview(file: File): void {
    console.log(file);
  }

  onFileDelete(file: File): void {
    this.files.delete(file);
    this.select.emit(this.getFiles);
  }

  showOptions(index: number): boolean {
    return this.activeFile === index;
  }

  fileIsPreviewable(file: File): boolean {
    const fileManager = new FileManager(file);
    return fileManager.fileIsPreviewable();
  }

  getUrlFile(file: File): string {
    const fileManager = new FileManager(file);
    return fileManager.previewFile();
  }
}
