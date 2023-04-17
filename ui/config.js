elementID("titlebar-close").addEventListener("click", () => {
  tauri.window.WebviewWindow.getByLabel("config").close();
});

elementID("bg-color").addEventListener("input", (event) => {
  tauri.event.emit("bg-color", {
    color: event.target.value,
  });
});

elementID("text-color").addEventListener("input", (event) => {
  tauri.event.emit("text-color", {
    color: event.target.value,
  });
});

/* 
elementID("transparency").addEventListener("input", (event) => {
  tauri.event.emit("transparency", {
    transparency: event.target.value,
  });
});
*/
