import dayJs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';


export function getDeliveryOption(deliveryOptionId) {
      const deliveryOption = deliveryOptions.find(option => option.id === deliveryOptionId);
  return deliveryOption || deliveryOptions[0];
}
//--------------------------
export function calculateDeliveryDate(deliveryOption) {
  const today = dayJs();
  const deliveryDay = () => {
    //check if the date falls in weekend
    function isWeekend(date) {
          const dayOfWeek = date.format('dddd');
      return dayOfWeek === 'Saturday' || dayOfWeek === 'Sunday';
    }
    //calculate the delivery date with skipping the weekends
    const numOfDaysToAdd = deliveryOption.deliveryDays;
    let currentDay = today;
    let deliveryDaysAdded = 0;
      while (deliveryDaysAdded < numOfDaysToAdd) {
        currentDay = currentDay.add(1, 'day');
        if (!isWeekend(currentDay)) { deliveryDaysAdded++; }
        }
    return currentDay;
  }
  //return the formatted delivery date string
  const deliveryDate = deliveryDay();
  const deliveryString = deliveryDate.format('YYYY, MMMM D');
  return deliveryString;
}
//----------------------------------

export const deliveryOptions = [
  {
    id: '1',
    deliveryDays: 7,
    priceCents: 0
  },
  {
    id: '2',
    deliveryDays: 3,
    priceCents: 499
  },
  {
    id: '3',
    deliveryDays: 1,
    priceCents: 999
  }
]