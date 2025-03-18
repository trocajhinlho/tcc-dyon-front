export default function setScrollMode(overflow: "initial" | "hidden") {
    document.body.style.overflowY = overflow;
}