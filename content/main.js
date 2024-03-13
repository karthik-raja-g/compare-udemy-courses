import React from 'react';
import { render } from 'react-dom';
import App from "./app/App";

const pluginContent = document.createElement("div");
pluginContent.id = "compare--courses";
document?.querySelector("body")?.appendChild(pluginContent);

render(<App />, document.querySelector("#compare--courses"));
