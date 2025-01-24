import {ITours} from "models/tours/index";
import {postTicketData} from "@rest/tickets";
import {IVipTicket, TicketType} from "../../models/ticket/ticket";
import {initTicketElementTemplate} from "../../templates/ticketInfo";
import {ticketPostInstance} from "./../../pages/tickets/tickets";
import {getTourTemplate} from "templates/tours";
import {openModal} from "@services/modal/modalService";


export function initTicketInfo(ticket: TicketType | IVipTicket): void {
    const targetElement = document.querySelector('.ticket-info') as HTMLElement;

    const ticketDescription = ticket?.description as string;
    const ticketOperator = ticket?.tourOperator as string;
    let vipClientType: string;
    if ("vipStatus" in ticket) {
        vipClientType = ticket.vipStatus;
    }


    const ticketElemsArr: [string, string, string] = [ticketDescription, ticketOperator, vipClientType];
    let ticketElemTemplate: string;

    ticketElemsArr.forEach((el: string, i: number) => {
        ticketElemTemplate += initTicketElementTemplate(el, i);
    });

    targetElement.innerHTML = ticketElemTemplate;

}

export function initUserData(): void {
const userInfo = document.querySelectorAll('.user-info > p');
let userInfoObj;
    userInfo.forEach((el) => {
    const inputDataName = el.getAttribute('data-name');
    if (inputDataName) {
        const inputElems = el.querySelector('input');
        userInfoObj[inputDataName] = inputElems.value;
    }
    });

    console.log('userInfoObj',userInfoObj)
    return userInfoObj;
}

export function initPostData(data) {
    initUserData();
    postTicketData(data).then((data) => {
        if (data.success) {

        }
    })
}

export function registerConfirmButton(): void {
    const targetEl = document.getElementById('accept-order-button');
    if (targetEl) {
        targetEl.addEventListener('click', () => {
            initPostData(ticketPostInstance);
        });
    }
}


//Для app/index.ts

export function initToursDivElements(data: ITours[]): void {

    if (Array.isArray(data)) {
      const rootElement: Element = document.querySelector('.main-app');
      const tourWrap: HTMLDivElement = document.createElement('div');
  
      tourWrap.classList.add('tour-wrap');
  
      // init click for modal
      initTourElemListener(tourWrap);
  
      let rootElementData: string = '';
      data.forEach((el, i) => {
        rootElementData += getTourTemplate(el, i);
      });
  
      tourWrap.innerHTML = rootElementData;
      rootElement.appendChild(tourWrap) ;
    }
  }
  
  
  export function initTourElemListener(tourWrap): void {
    tourWrap.addEventListener('click', (ev) => {
      const targetItem = ev.target;
      const parentItem = targetItem?.parentNode;
      let realTarget;
  
      if (targetItem.hasAttribute('data-tour-item-index')) {
        realTarget = targetItem;
      } else if (parentItem && parentItem.hasAttribute('data-tour-item-index')) {
        realTarget = parentItem;
      }
  
      if (realTarget) {
        const dataIndex = realTarget.getAttribute('data-tour-item-index');
        openModal('order', Number(dataIndex));
      }
    });
  }