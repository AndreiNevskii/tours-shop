
/* Общие методы используются для вставки текста в header   footer*/

/*  -
    - Указать в методах возвращающие типы, типы для параметров, в теле функции также указать типы
*/
export function initHeaderTitle(ticketName: string, selector: string): void {
    const headerElement  = document.querySelector('header') as HTMLInputElement;
    const targetItem = headerElement.querySelector(selector) as HTMLInputElement;
    if (targetItem) {
        targetItem.innerText = ticketName;
    }
}

export function initFooterTitle(ticketName: string, selector: string): void {
    const headerElement = document.querySelector('footer') as HTMLInputElement;
    const targetItem = headerElement.querySelector(selector) as HTMLInputElement;
    if (targetItem) {
        targetItem.innerText = ticketName;
    }
}