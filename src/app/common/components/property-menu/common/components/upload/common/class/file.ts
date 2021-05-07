export class FileManager {
  private extensionsPreviewable: Set<string> = new Set(['png', 'jpg', 'jpeg']);
  private readonly file: File;

  constructor(file: File) {
    this.file = file;
  }

  public fileIsPreviewable(): boolean {
    const { type } = this.file;
    let allowPreview = false;
    this.extensionsPreviewable.forEach((allowedExtension) => {
      if (type.match(new RegExp(allowedExtension))) {
        allowPreview = true;
      }
    });
    return  allowPreview;
  }

  public previewFile(): string {
    return URL.createObjectURL(this.file);
  }
}
