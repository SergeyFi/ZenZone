import { App } from "./app.js";
import { ZenTimer } from "./zenTimer.js";

window.app = {self: new App(), timer: new ZenTimer()};