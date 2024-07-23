import { App } from "./app.js";
import { ZenTimer } from "./zenTimer.js";

/** @type {{self: App, timer: ZenTimer}} */
window.app = {self: new App(), timer: new ZenTimer()};