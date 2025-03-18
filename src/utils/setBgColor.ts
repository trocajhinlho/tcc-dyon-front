const colors = {
    white: "#fff",
    gray: "#eee"
}

export default function setBgColor(color: keyof typeof colors) {
    document.body.style.backgroundColor = colors[color];
}