import {getTodayApod} from "./todayApod.js";
import { getLaunches } from "./launches.js";
import { getPlanets } from "./planets.js"
const navLinks = document.querySelectorAll(".nav-link");
const appSections = document.querySelectorAll(".app-section");


async function main() {
    await Promise.all([
        getTodayApod(),
        getLaunches(),
        getPlanets()
    ]);
}main();


navLinks.forEach(link => {
    link.addEventListener("click", function (e) {
        e.preventDefault();
        const dataSection = link.getAttribute("data-section");
        // Show/hide correct section
        appSections.forEach(section => {
            if (section.id === dataSection) {
                section.classList.remove("hidden");
            } else {
                section.classList.add("hidden");
            }
        });

        // Update nav link styles
        navLinks.forEach(item => {
            if (item === link) {
                item.classList.add("bg-blue-500/10", "text-blue-400");
                item.classList.remove("text-slate-300", "hover:bg-slate-800");
            } else {
                item.classList.remove("bg-blue-500/10", "text-blue-400");
                item.classList.add("text-slate-300", "hover:bg-slate-800");
            }
        });
    });
});



