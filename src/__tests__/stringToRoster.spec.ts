// import { render } from "@testing-library/svelte";
// import App from "../App.svelte";
import { rosterToString } from "../helpers/rosterToString";
import { stringToRoster } from "../helpers/stringToRoster";
import type { Roster } from "../models/roster.model";
import { inducementAndStarPlayer, inducementAndStarPlayerString, noTeamName, playerSkills, playerSkillsString, testRoster, testRosterString } from "./data/testRosterData";

// test("should render", () => {
//   const results = render(App, { props: { name: "world" } });

// //   expect(() => results.getByText("Hello world!")).not.toThrow();
// });


test("should convert string into roster", () => {
    expect(stringToRoster(testRosterString)).toEqual(testRoster);
});

test("should convert inducement string into roster", () => {
    expect(stringToRoster(inducementAndStarPlayerString)).toEqual(inducementAndStarPlayer);
});

test("should convert player skills string into roster", () => {
    expect(stringToRoster(playerSkillsString)).toEqual(playerSkills);
});

test("should convert string into roster into string", () => {
    const roster = noTeamName as Roster;
    expect(stringToRoster(rosterToString(noTeamName as Roster))).toEqual(roster);

});

