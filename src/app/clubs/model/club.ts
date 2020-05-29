export interface Club {
    _id: string; 
    name: string;
    crestUrl: string; 
    website: string; 
    color: string;
    venue: string;
}

export function sortClubsByName(a: Club, b: Club): number {
    return a.name.localeCompare(b.name);
}

