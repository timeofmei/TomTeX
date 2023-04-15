const elementID = (id) => {
  return document.getElementById(id);
};

const tauri = window.__TAURI__;

MathJax = {
  options: {
    enableMenu: false,
  },
  svg: {
    scale: 1.5,
  },
};

elementID("titlebar-github").addEventListener("click", async () => {
  await tauri.shell.open("https://github.com/timeofmei/TomTeX");
});

let alwaysOnTop = false;
elementID("titlebar-pin").addEventListener("click", () => {
  alwaysOnTop = !alwaysOnTop;
  elementID("titlebar-pin").children[0].src = `assets/pin${
    alwaysOnTop ? "" : "-outline"
  }.svg`;
  tauri.window.appWindow.setAlwaysOnTop(alwaysOnTop);
});

elementID("titlebar-minimize").addEventListener("click", () => {
  tauri.window.appWindow.minimize();
});

elementID("titlebar-close").addEventListener("click", () => {
  tauri.window.appWindow.close();
});

elementID("input").addEventListener("input", (event) => {
  const input = event.target.value.trim();
  let output = elementID("output");
  output.innerHTML = "";
  MathJax.texReset();
  MathJax.tex2svgPromise(input).then((node) => {
    output.appendChild(node);
    MathJax.startup.document.clear();
    MathJax.startup.document.updateDocument();
  });
});
