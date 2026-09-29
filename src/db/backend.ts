import { Directory, File, Paths } from 'expo-file-system';

const FOLDER = 'tinydb';

function directory(): Directory {
  return new Directory(Paths.document, FOLDER);
}

export function readRaw(name: string): string | null {
  const file = new File(directory(), `${name}.json`);

  if (!file.exists) {
    return null;
  }

  try {
    return file.textSync() || null;
  } catch {
    return null;
  }
}

export function writeRaw(name: string, content: string): void {
  const dir = directory();

  if (!dir.exists) {
    dir.create({ intermediates: true, idempotent: true });
  }

  const file = new File(dir, `${name}.json`);
  file.create({ overwrite: true, intermediates: true });
  file.write(content);
}

export function storageLocation(name: string): string {
  return new File(directory(), `${name}.json`).uri;
}
