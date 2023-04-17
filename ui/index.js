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

elementID("titlebar-config").addEventListener("click", () => {
  new tauri.window.WebviewWindow("config", {
    url: "config.html",
    decorations: false,
    alwaysOnTop: false,
    fullscreen: false,
    height: 150,
    width: 300,
    resizable: false,
    title: "config",
  });
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

elementID("titlebar-close").addEventListener("click", () => {
  tauri.window.WebviewWindow.getByLabel("main").close();
});

tauri.event.listen("bg-color", (event) => {
  elementID("page").style.backgroundColor = event.payload.color;
});

tauri.event.listen("text-color", (event) => {
  elementID("page").style.color = event.payload.color;
  elementID("input").style.color = event.payload.color;
});
