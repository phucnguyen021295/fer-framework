export default function openFullscreen(elem: any) {
        if (!elem) return;
        if (elem.requestFullscreen) {
                elem.requestFullscreen();
        } else if (elem.webkitRequestFullscreen) { /* Safari */
                elem.webkitRequestFullscreen();
        } else if (elem.msRequestFullscreen) { /* IE11 */
                elem.msRequestFullscreen();
        }
}