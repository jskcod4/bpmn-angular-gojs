import {BpmnDataFileStorage} from '../../../../bpmn/common/bpmn.interface';
import {PaletteCategory} from '../../../../bpmn/palette/palette.enum';

export class BpmnAttachmentStorage {
  attachmentFiles: Set<BpmnDataFileStorage>;

  constructor() {
    this.attachmentFiles = new Set<BpmnDataFileStorage>();
  }

  public storageAttachmentFiles(bpmnDataFileStorage: BpmnDataFileStorage): void {
    this.attachmentFiles.add(bpmnDataFileStorage);
  }

  public getAttachmentFiles(key: number): BpmnDataFileStorage {
    let files: BpmnDataFileStorage = null;
    this.attachmentFiles.forEach(attachment => {
      if (attachment.data.key === key) {
        files = attachment;
      }
    });
    return files;
  }

  public getGeneralFiles(category: PaletteCategory): BpmnDataFileStorage {
    let files: BpmnDataFileStorage = null;
    this.attachmentFiles.forEach(attachment => {
      if (attachment.data.category === category) {
        files = attachment;
      }
    });
    return files;
  }

  public getAttachmentFileData(): BpmnDataFileStorage[] {
    return Array.from(this.attachmentFiles);
  }

  public storageGeneralAttachmentFiles(files: File[]): void {
    this.attachmentFiles.add({
      data: { key: 0, category: PaletteCategory.diagram, loc: '' },
      files
    });
  }
}
