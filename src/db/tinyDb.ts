import { readRaw, storageLocation, writeRaw } from './backend';

type Table = Record<string, unknown>;

export class TinyDB {
  private name: string;

  constructor(name: string) {
    this.name = name;
  }

  private readAll(): Table {
    const raw = readRaw(this.name);

    if (!raw) {
      return {};
    }

    try {
      const parsed = JSON.parse(raw) as Table;
      return typeof parsed === 'object' && parsed !== null ? parsed : {};
    } catch {
      return {};
    }
  }

  private writeAll(data: Table): void {
    writeRaw(this.name, JSON.stringify(data, null, 2));
  }

  get<T>(key: string): T | undefined {
    return this.readAll()[key] as T | undefined;
  }

  put<T>(key: string, value: T): void {
    const data = this.readAll();
    data[key] = value;
    this.writeAll(data);
  }

  remove(key: string): void {
    const data = this.readAll();

    if (key in data) {
      delete data[key];
      this.writeAll(data);
    }
  }

  clear(): void {
    this.writeAll({});
  }

  get storagePath(): string {
    return storageLocation(this.name);
  }
}

export const appDb = new TinyDB('app');
