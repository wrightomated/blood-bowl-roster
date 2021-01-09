export interface Extra {
    extraString: ExtraString;
    cost: number;
    max: number;
    min?: number;
}

export type ExtraString = 'rerolls' | 'assistant_coaches' | 'cheerleaders' | 'dedicated_fans' | 'apothecary';
