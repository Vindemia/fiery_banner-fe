import { writable } from "svelte/store";

export const isLoggedIn = writable(false);
export const username = writable("");
export const characterList = writable([""]);
export const userType = writable("USER");
export const userId = writable("");
