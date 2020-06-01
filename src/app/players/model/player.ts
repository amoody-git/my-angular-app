import { Nation } from './nation';
import { Position } from './position';

export interface Player {
    _id: string;
    name: string;
    position: Position;
    shirtNumber: number;
    nationality: Nation;
    imageUrl: string;
    club: string;
}

export function sortPlayers(a: Player, b: Player): number {
    const compare = a.shirtNumber - b.shirtNumber;
    if (compare > 0) {
        return 1;
    } 
    else if (compare < 0) { 
        return 1; 
    }
    else return 0; 
}