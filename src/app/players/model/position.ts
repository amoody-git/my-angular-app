export interface Position {
    _id: string;
    name: string;
}

export function sortPositionByName(a: Position, b: Position): number {
    return a.name.localeCompare(b.name);
}