import { get, writable } from "svelte/store";
import logo from "../../../assets/apps/settings/apps.svg";
import OpenWith from "../../../lib/Apps/OpenWith.svelte";
import type { App } from "../interface";
import type { ArcFile } from "../../api/interface";
import sleep from "../../sleep";
import { closeWindow } from "../events";

export const OpenWithApp: App = {
  info: {
    name: "Open With",
    description: "Open a file with an app",
    builtin: true,
    version: "1.0.1",
    author: "Izaak Kuipers",
    hidden: true,
    icon: logo,
  },
  size: { w: 450, h: 550 },
  pos: { x: 0, y: 0 },
  minSize: { w: 450, h: 550 },
  maxSize: { w: 450, h: 550 },
  controls: { min: false, max: false, cls: false },
  state: {
    headless: true,
    resizable: false,
    windowState: { min: false, max: false, fll: true },
  },
  content: OpenWith,
  glass: true,
  events: {
    close() {
      OpenWithFile.set(null);
    },
    async open(app: App) {
      await sleep(10);

      if (!get(OpenWithFile)) closeWindow(app.id);
    },
  },
};

export const OpenWithFile = writable<ArcFile>(null);
