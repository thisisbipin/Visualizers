/*  
    ===========================
    Designed by: Bipin Jadav
    Github: thisisbipin
    ===========================

    This is a simple visualization of Breadth First Search Algorithm
*/

function toggle() {

    let theme = getComputedStyle(document.documentElement).getPropertyValue('--theme');
    let icon = document.getElementById('theme-icon');
    if (parseInt(theme) == 0) {
        document.documentElement.style.setProperty('--foreground', 'rgb(29,29,29)');
        document.documentElement.style.setProperty('--background', ' rgb(255, 255, 255)');
        document.documentElement.style.setProperty('--theme', '1');

        icon.className = "fas fa-sun";
    } else if (parseInt(theme) == 1) {
        document.documentElement.style.setProperty('--foreground', 'rgb(255, 255, 255)');
        document.documentElement.style.setProperty('--background', 'rgb(29,29,29) ');
        document.documentElement.style.setProperty('--theme', '0');

        icon.className = "fas fa-moon";
    }
}

