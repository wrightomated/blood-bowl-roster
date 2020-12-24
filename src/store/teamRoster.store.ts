import { writable } from "svelte/store";
import type { Writable } from "svelte/store";

import type { Roster, RosterPlayerRecord } from "../models/roster.model";

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
    reset: () => set(getEmptyRoster()),
    set,
  };
}

const getEmptyRoster: () => Roster = () => {
  return {
    teamId: 0,
    players: [], 
    rerolls: 0,
    teamName: 'Team Name'
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
