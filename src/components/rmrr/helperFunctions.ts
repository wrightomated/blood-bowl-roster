import {
    characteristicCostIncrease,
    characteristicIndex,
    type CharacteristicType,
} from '../../data/statOrder.data';
import type {
    Roster,
    RosterPlayerRecord,
    SpecificAdvancement,
} from '../../models/roster.model';

export function getRingerBudget(tier: number) {
    return (
        {
            1: 100,
            2: 150,
            3: 200,
            4: 300,
        }[tier] || tier
    );
}

export function getRmrrTier(tier: number) {
    return (
        {
            1: '1',
            2: '1.5',
            3: '2',
            4: '3',
        }[tier] || tier
    );
}

export function getRinger(roster: Roster): RosterPlayerRecord | undefined {
    return roster.players.find((x) => x.player.id === 199);
}

export function getRingerCost(ringer: RosterPlayerRecord) {
    if (!ringer) {
        return 0;
    }
    let cost = 50;
    if (ringer?.alterations?.specificAdvancements?.length > 0) {
        cost += ringer?.alterations?.specificAdvancements.reduce(
            (a, b) => a + ringerAdvancementCost(b),
            0
        );
    }
    return cost;
}

function ringerAdvancementCost(specificAdvancement: SpecificAdvancement) {
    return specificAdvancement.type === 'characteristic'
        ? characteristicCostIncrease[
              characteristicIndex(
                  specificAdvancement.advancementValue as CharacteristicType
              )
          ]
        : 20;
}
