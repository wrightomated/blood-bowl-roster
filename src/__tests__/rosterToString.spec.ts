// import { render } from "@testing-library/svelte";
// import App from "../App.svelte";
import { rosterToString } from '../helpers/rosterToString';
import type { Roster } from '../models/roster.model';
import {
    inducementAndStarPlayer,
    inducementAndStarPlayerString,
    playerSkills,
    playerSkillsString,
    testRoster,
    testRosterString,
} from './data/testRosterData';

test('should convert roster into string', () => {
    expect(rosterToString(testRoster as Roster)).toBe(testRosterString);
});

test('should convert roster into string', () => {
    expect(rosterToString(inducementAndStarPlayer as Roster)).toBe(
        inducementAndStarPlayerString,
    );
});

test('should convert roster into string', () => {
    expect(rosterToString(playerSkills as Roster)).toBe(
        playerSkillsString,
    );
});


