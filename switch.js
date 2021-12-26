export function showHide(elemID){
    document.getElementById(elemID=="blok_id"?"blok_1":"blok_id").style.display = "none";
    document.getElementById(elemID=="blok_id"?"blok_id":"blok_1").style.display = "block";
}