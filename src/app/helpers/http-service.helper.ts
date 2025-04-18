export class HttpServiceHelper {
  static createFormData(payload: Record<string, any>): FormData {
    const formData = new FormData();

    Object.keys(payload).forEach((key) => {
      formData.append(key, payload[key]);
    });

    return formData;
  }
}
