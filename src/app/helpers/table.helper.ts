import {SortEvent} from 'primeng/api';

export class TableHelper {
  static sort<T>(event: SortEvent, data: T[]): T[] {
    const sortedData = [...data];
    const key = event.field as keyof T;
    const order = event.order ?? 1;

    sortedData.sort((a, b) => {
      const isValueNumber = typeof a[key] === 'number' && typeof b[key] === 'number';
      const isValueDate = a[key] instanceof Date && b[key] instanceof Date;

      if (isValueNumber) {
        return ((a[key] as number) - (b[key] as number)) * order;
      }
      if (isValueDate) {
        return ((b[key] as Date).getTime() - (a[key] as Date).getTime()) * order;
      }
      return ((a[key] as string) ?? '-').localeCompare((b[key] as string) ?? '-') * order;
    });

    return sortedData;
  }
}
