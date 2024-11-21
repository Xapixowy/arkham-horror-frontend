import { SortEvent } from 'primeng/api';

export class TableHelper {
  static sort<T>(event: SortEvent, data: T[]): T[] {
    const sortedData = [...data];
    const key = event.field as keyof T;

    sortedData.sort((a, b) => {
      const isValueNumber = typeof a[key] === 'number' && typeof b[key] === 'number';

      if (isValueNumber) {
        return ((a[key] as number) - (b[key] as number)) * (event.order || 0);
      }
      return ((a[key] as string) ?? '-').localeCompare((b[key] as string) ?? '-') * (event.order || 0);
    });

    return sortedData;
  }
}
