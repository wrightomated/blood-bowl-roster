import { writable } from "svelte/store";
import type { Writable } from "svelte/store";

import type { Roster, RosterPlayerRecord } from "../models/roster.model";
import type { TeamName } from "../models/team.model";

function createRoster() {
  const { subscribe, set, update }: Writable<Roster> = writable(
    JSON.parse(localStorage.getItem("roster")) || getEmptyRoster()
  );

  return {
    subscribe,
    addPlayer: (player: RosterPlayerRecord) =>
      update((store) => {
        return { ...store, players: store.players.concat([player]) };
      }),
    removePlayer: (index: number) =>
      update((store) => {
        return {
          ...store,
          players: store.players.filter((_, i) => index !== i),
        };
      }),
    movePlayerUp: (index: number) =>
      update((store) => {
        return {
          ...store,
          players: switchTwoElements(store.players, index, index - 1),
        };
      }),
    movePlayerDown: (index: number) =>
      update((store) => {
        return {
          ...store,
          players: switchTwoElements(store.players, index, index + 1),
        };
      }),
    addReroll: () =>
      update((store) => {
        return {
          ...store,
          rerolls: store.rerolls + 1,
        };
      }),
      removeReroll: () =>
      update((store) => {
        return {
          ...store,
          rerolls: store.rerolls - 1,
        };
      }),
    reset: (options?: {teamId: number, teamType: TeamName}) => set(getEmptyRoster(options)),
    set,
  };
}

const getEmptyRoster: (options?: {teamId: number, teamType: TeamName}) => Roster = (options) => {
  return {
    teamId: options?.teamId || 0,
    players: [], 
    rerolls: 0,
    teamName: '',
    teamType: options?.teamType || '' as TeamName
  };
};

const switchTwoElements = (arr: any[], index1: number, index2: number) => {
  if (
    typeof arr[index1] === "undefined" ||
    typeof arr[index2] === "undefined"
  ) {
    return arr;
  }
  return arr.map((x, i, a) =>
    i === index1 ? a[index2] : i === index2 ? a[index1] : x
  );
};

export const roster = createRoster();
