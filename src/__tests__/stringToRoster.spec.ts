// import { render } from "@testing-library/svelte";
// import App from "../App.svelte";
import { stringToRoster } from "../helpers/stringToRoster";
import { inducementAndStarPlayer, inducementAndStarPlayerString, playerSkills, playerSkillsString, testRoster, testRosterString } from "./data/testRosterData";

// test("should render", () => {
//   const results = render(App, { props: { name: "world" } });

// //   expect(() => results.getByText("Hello world!")).not.toThrow();
// });


test("should convert string into roster", () => {
    expect(stringToRoster(testRosterString)).toEqual(testRoster);
});

test("should convert string into roster", () => {
    expect(stringToRoster(inducementAndStarPlayerString)).toEqual(inducementAndStarPlayer);
});

test("should convert string into roster", () => {
    expect(stringToRoster(playerSkillsString)).toEqual(playerSkills);
});

