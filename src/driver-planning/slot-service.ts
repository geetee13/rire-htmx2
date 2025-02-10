import { db } from '../db';
import { Slot, Tour } from '../types/db';

interface SlotStatus {
  slotStatusClass: string;
  statusText: string;
  actionUrl: string;
  actionVerb: string;
}

function determineSlotStatus(slotData: Slot, tourData: Tour | undefined, currentDriverId: string): SlotStatus {
  const isIchBinAngemeldet = slotData.drivers.includes(currentDriverId);
  const otherDriverIds = slotData.drivers.filter((e) => e !== currentDriverId);
  const isTourIstVorhanden = !!tourData;
  const tourDriver = isTourIstVorhanden ? tourData.driverName : '';

  let classes: string[] = [];
  let texts: string[] = [];
  let actions: string[] = [];
  let verbs: string[] = [];

  if (!isIchBinAngemeldet && !tourDriver) {
    if (otherDriverIds.length == 0) {
      classes.push('slot-open');
      texts.push('frei');
    } else {
      classes.push('slot-others-anmeldung');
      texts.push(`(${otherDriverIds.join(' ')})`);
    }
    actions.push(`/slots/${slotData.slotId}/drivers/${currentDriverId}`);
    verbs.push('hx-post');
  }
  if (isIchBinAngemeldet && !tourDriver) {
    classes.push('slot-my-anmeldung');
    if (slotData.drivers.length > 1) {
      texts.push(`warten auf Passagier (+${slotData.drivers.length - 1})`);
    } else {
      texts.push(`warten auf Passagier`);
    }
    actions.push(`/slots/${slotData.slotId}/drivers/${currentDriverId}`);
    verbs.push('hx-delete');
  }
  if (isTourIstVorhanden && tourData.driverId === currentDriverId) {
    classes.push('slot-my-tour');
    texts.push(`DU fährst mit<br>${tourData.passenger}`);
  }
  if (isTourIstVorhanden && tourData.driverId !== currentDriverId) {
    classes.push('slot-others-tour');
    texts.push(`${tourDriver} mit<br>${tourData.passenger}`);
  }

  return {
    slotStatusClass: classes.join(' '),
    statusText: texts.join('/'),
    actionUrl: actions.join(' '),
    actionVerb: verbs.join(' '),
  };
}

export function createSlotHtml(slotData: Slot, currentDriverId: string): string {
  const tourData = db.tours[slotData.slotId];
  const { slotStatusClass, statusText, actionUrl, actionVerb } =
    determineSlotStatus(slotData, tourData, currentDriverId);
  
  return `
    <button 
      class="slot ${slotStatusClass}" 
      ${actionVerb}="${actionUrl}" 
      hx-target="this" 
      hx-swap="outerHTML">
        <span class="date-disp">${slotData.dateAsText}</span>
        <span class="time">${slotData.vonBisAsText}</span>
        <span class="slot-status">${statusText}</span>
    </button>
  `;
}

export function getSlot(slotId: string): Slot | undefined {
  return db.slots[slotId];
}

export function addDriver(slotId: string, driverId: string): Slot {
  const slot = getSlot(slotId);
  if (!slot) {
    throw new Error(`Slot ${slotId} not found`);
  }
  if (!slot.drivers.includes(driverId)) {
    slot.drivers.push(driverId);
  }
  return slot;
}

export function removeDriver(slotId: string, driverId: string): Slot {
  const slot = getSlot(slotId);
  if (!slot) {
    throw new Error(`Slot ${slotId} not found`);
  }
  slot.drivers = slot.drivers.filter((e) => e !== driverId);
  return slot;
}

export function createAbmeldenHtml(slotData: Slot, currentDriverId: string) {
  throw new Error('Function not implemented.');
}
