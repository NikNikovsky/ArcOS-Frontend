import { get } from "svelte/store";
import { defaultDirectory } from "../api/interface";
import {
  FileBrowserCurrentDir,
  FileBrowserDirContents,
  FileBrowserOpeningFile,
  FileBrowserSelectedFilename,
} from "../applogic/apps/FileBrowser/main";
import { closeWindow } from "../applogic/events";
import { WindowStore } from "../applogic/store";
import { ErrorMessages, ErrorWindowStore } from "../errorlogic/app";
import { NotificationStore } from "../notiflogic/main";
import { loggingOff, restarting, shuttingDown } from "./main";

export function logoff() {
  let maxTimeout = 0;

  const ws = get(WindowStore);

  for (let i = 0; i < ws.length; i++) {
    maxTimeout += 50;

    setTimeout(() => {
      closeWindow(ws[i].id);
    }, maxTimeout);
  }

  localStorage.removeItem("arcos-remembered-token");

  FileBrowserCurrentDir.set("./");
  FileBrowserSelectedFilename.set(null);
  FileBrowserDirContents.set(defaultDirectory);
  FileBrowserOpeningFile.set(null);
  NotificationStore.set({});
  ErrorWindowStore.set([]);
  ErrorMessages.set([]);
  WindowStore.set([]);

  loggingOff.set(true);
}

export function shutdown() {
  let maxTimeout = 0;

  const ws = get(WindowStore);

  for (let i = 0; i < ws.length; i++) {
    maxTimeout += 50;

    setTimeout(() => {
      closeWindow(ws[i].id);
    }, maxTimeout);
  }

  shuttingDown.set(true);
}

export function restart() {
  let maxTimeout = 0;

  const ws = get(WindowStore);

  for (let i = 0; i < ws.length; i++) {
    maxTimeout += 50;

    setTimeout(() => {
      closeWindow(ws[i].id);
    }, maxTimeout);
  }

  restarting.set(true);
}
