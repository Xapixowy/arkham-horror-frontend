export class FileHelper {
  static async convertImageFromUrlToFile(imageUrl: string): Promise<File> {
    const response = await fetch(imageUrl);
    const blob = await response.blob();

    return new File([blob], this.extractFileNameFromUrl(imageUrl), { type: blob.type });
  }

  static convertFileToBlob(file: File): string {
    return URL.createObjectURL(file);
  }

  static extractFileNameFromUrl(url: string): string {
    const urlParts = url.split('/');
    return urlParts[urlParts.length - 1];
  }
}
