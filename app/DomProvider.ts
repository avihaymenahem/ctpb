export default class DomProvider {
    public static getElement(element: string): HTMLElement {
        return <HTMLElement> document.querySelector(element);
    }

    public static show(element : HTMLElement) {
        element.style.display = "block";
    }

    public static hide(element : HTMLElement) {
        element.style.display = "none";
    }

    public static setContent(element : HTMLElement, content: string) {
        element.innerHTML = content;
    }
}