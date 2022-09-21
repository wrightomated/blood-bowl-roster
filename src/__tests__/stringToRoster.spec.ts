// import { render } from "@testing-library/svelte";
// import App from "../App.svelte";
import { rosterToString } from '../helpers/rosterToString';
import { stringToRoster } from '../helpers/stringToRoster';
import type { Roster } from '../models/roster.model';
import {
    // norseNoSpecialRuleRoster,
    // norseNoSpecialRuleString,
    norseSpecialRuleRoster,
    norseSpecialRuleString,
} from './data/specialRuleData';
import {
    encodedRosterString,
    inducementAndStarPlayer,
    inducementAndStarPlayerString,
    noTeamName,
    playerSkills,
    playerSkillsString,
    testRoster,
    testRosterString,
} from './data/testRosterData';

// test("should render", () => {
//   const results = render(App, { props: { name: "world" } });

// //   expect(() => results.getByText("Hello world!")).not.toThrow();
// });

test('should convert string into roster', () => {
    expect(stringToRoster(testRosterString)).toEqual(testRoster);
});

test('should convert inducement string into roster', () => {
    expect(stringToRoster(inducementAndStarPlayerString)).toEqual(
        inducementAndStarPlayer
    );
});

test('should convert encoded colons', () => {
    expect(stringToRoster(encodedRosterString)).toEqual(testRoster);
});

test('should convert player skills string into roster', () => {
    expect(stringToRoster(playerSkillsString)).toEqual(playerSkills);
});

test('should convert string into roster into string', () => {
    const roster = noTeamName as Roster;
    expect(stringToRoster(rosterToString(noTeamName as Roster))).toEqual(
        roster
    );
});

describe('Special rule', () => {
    test('should convert a team with a special rule', () => {
        expect(stringToRoster(norseSpecialRuleString)).toEqual(
            norseSpecialRuleRoster
        );
    });
});
