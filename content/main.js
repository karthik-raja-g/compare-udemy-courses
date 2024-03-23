import React from 'react';
import { createRoot } from 'react-dom/client';

import App from "./app/App";

const pluginContent = document.createElement("div");
pluginContent.id = "compare--courses";
document?.querySelector("body")?.appendChild(pluginContent);

const css = chrome.runtime.getURL('content/main.css');
console.log(css, 'path')
const styleSheet = document.createElement('link');
styleSheet.rel = 'stylesheet';
styleSheet.href = css;
console.log(styleSheet, 'sheet')
document.head.appendChild(styleSheet);

const root = createRoot(pluginContent); 
root.render(<App/>);