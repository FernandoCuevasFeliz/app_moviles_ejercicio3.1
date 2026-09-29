const PREFIX = 'tinydb:';

function storage(): Storage | null {
  try {
    return typeof localStorage === 'undefined' ? null : localStorage;
  } catch {
    return null;
  }
}

export function readRaw(name: string): string | null {
  return storage()?.getItem(`${PREFIX}${name}`) ?? null;
}

export function writeRaw(name: string, content: string): void {
  storage()?.setItem(`${PREFIX}${name}`, content);
}

export function storageLocation(name: string): string {
  return `localStorage://${PREFIX}${name}`;
}
