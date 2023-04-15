use tauri::Menu;

fn main() {
    let menu = Menu::new();
    tauri::Builder::default()
        .menu(menu)
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
