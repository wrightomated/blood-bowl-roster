import {
    type AdvancementCombination,
    advancementCostsMap,
    type SelectionType,
    skillIncreaseCost,
    type SkillType,
} from '../data/advancementCost.data';
import { skillCatalogue } from '../data/skills.data';
import {
    characteristicCostIncrease,
    characteristics,
} from '../data/statOrder.data';
import type {
    RosterPlayerRecord,
    SpecificAdvancement,
} from '../models/roster.model';

export function guessSpecificAdvancements(
    rosterPlayer: RosterPlayerRecord
): SpecificAdvancement[] {
    if (
        rosterPlayer.deleted ||
        rosterPlayer.starPlayer ||
        !rosterPlayer.alterations
    ) {
        return [];
    }
    let mappedSkillTypes: { skillType: SkillType; skillId: number }[] = [];
    if (rosterPlayer.alterations?.extraSkills?.length > 0) {
        mappedSkillTypes = rosterPlayer.alterations.extraSkills.map(
            (skillId) => {
                return {
                    skillType: getSkillType(skillId, rosterPlayer.player),
                    skillId,
                };
            }
        );
    }
    return mappedSkillTypes.map((s) => {
        return {
            type:
                s.skillType === 'primary' ? 'primaryselect' : 'secondaryselect',
            advancementValue: s.skillId,
            sppCost: 0,
        };
    });

    // return determinePlayerAdvancements(
    //     rosterPlayer.alterations.valueChange,
    //     rosterPlayer.alterations?.statChange || [0, 0, 0, 0, 0],
    //     mappedSkillTypes
    // );
}

export function getSkillType(
    skillId: number,
    player: RosterPlayerRecord['player']
): SkillType {
    const skill = skillCatalogue.find((skill) => skill.id === skillId);
    return player.primary.includes(skill.category) ? 'primary' : 'secondary';
}

function determinePlayerAdvancements(
    costChange: number,
    addedCharacteristics: number[],
    mappedSkillTypes: { skillType: SkillType; skillId: number }[]
): SpecificAdvancement[] {
    const { characteristicAdvancements, characteristicsCost } =
        mapCharacteristicAdvancements(addedCharacteristics);

    const remainingCost = costChange - characteristicsCost;
    const skillCombinations = expandSkillTypes(
        remainingCost,
        mappedSkillTypes.map((s) => s.skillType)
    );
    const skillAdvancements: SpecificAdvancement[] = skillCombinations.map(
        (combination: AdvancementCombination, i) => {
            return {
                type: combination,
                advancementValue: mappedSkillTypes[i].skillId,
                sppCost:
                    advancementCostsMap[combination][
                        i + characteristicAdvancements.length
                    ],
            };
        }
    );

    return [...characteristicAdvancements, ...skillAdvancements];
}

function mapCharacteristicAdvancements(addedCharacteristics: number[]): {
    characteristicAdvancements: SpecificAdvancement[];
    characteristicsCost: number;
} {
    let advancementAmount = 0;
    let characteristicsCost = 0;
    let characteristicAdvancements: SpecificAdvancement[] = [];
    addedCharacteristics.forEach((characteristic, index) => {
        for (let i = 0; i < characteristic; i++) {
            characteristicAdvancements.push({
                type: 'characteristic',
                advancementValue: characteristics[index],
                sppCost:
                    advancementCostsMap['characteristic'][advancementAmount],
            });
            advancementAmount++;
            characteristicsCost += characteristicCostIncrease[index];
        }
    });

    return { characteristicAdvancements, characteristicsCost };
}

function expandSkillTypes(
    totalMoneyCost: number,
    skillOrder: SkillType[]
): (SkillType & SelectionType)[] {
    const result = findValidCombination(totalMoneyCost, skillOrder);
    if (result) {
        return result;
    } else {
        throw new Error('No valid combination found');
    }
}

function findValidCombination(
    remainingMoney: number,
    skillOrder: SkillType[],
    currentResult: (SkillType & SelectionType)[] = []
): (SkillType & SelectionType)[] | null {
    if (remainingMoney < 0) {
        return null;
    }

    if (skillOrder.length === 0) {
        return remainingMoney === 0 ? currentResult : null;
    }

    const currentSkillType = skillOrder[0];
    const remainingSkills = skillOrder.slice(1);

    const randomKey =
        `${currentSkillType}random` as keyof typeof skillIncreaseCost;
    const selectKey =
        `${currentSkillType}select` as keyof typeof skillIncreaseCost;

    const randomResult = findValidCombination(
        remainingMoney - skillIncreaseCost[randomKey],
        remainingSkills,
        [
            ...currentResult,
            `${currentSkillType}random` as SkillType & SelectionType,
        ]
    );
    if (randomResult) {
        return randomResult;
    }

    const selectResult = findValidCombination(
        remainingMoney - skillIncreaseCost[selectKey],
        remainingSkills,
        [
            ...currentResult,
            `${currentSkillType}select` as SkillType & SelectionType,
        ]
    );
    if (selectResult) {
        return selectResult;
    }

    return null;
}
