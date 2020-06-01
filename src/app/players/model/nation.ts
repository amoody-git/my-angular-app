export interface Nation {
    _id: string;
    name: string;
    flagUrl: string;
}

export function sortNationsByName(a: Nation, b: Nation): number {
    return a.name.localeCompare(b.name);
}