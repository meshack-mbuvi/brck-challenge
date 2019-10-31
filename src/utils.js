const daysOftheWeekStrings = {
  Sun: 0,
  Mon: 1,
  Tue: 2,
  Wed: 3,
  Thur: 4,
  Fri: 5,
  Sat: 6,
};

/**
 *
 * @param {array} daysOpen - an array containing a range of days
 * @param {Number} today - index for the current date
 * @return {Boolean} isOpen
 */
const handleDateCheck = (daysOpen, today) => {
  const len = daysOpen.length;
  let isOpen = false;
  let willOpen = "";

  if (len > 2) {
    if (
      daysOftheWeekStrings[daysOpen[0]] >= today &&
      today <= daysOftheWeekStrings[daysOpen[1]]
    ) {
      isOpen = true;
    } else {
      if (daysOftheWeekStrings[daysOpen[2]] === today) {
        isOpen = true;
      }
    }
  } else if (len < 1) {
    if (daysOftheWeekStrings[daysOpen[2]] === today) {
      isOpen = true;
    } else {
      willOpen = daysOpen[2];
    }
  } else {
    isOpen = true;
  }

  return [isOpen, willOpen];
};

/**
 * @summary - An helper function for checking whether a restaurant is open or not.
 * @param {string} time
 * @return {Boolean}
 */
export const isOpenHelper = time => {
  const date = new Date();
  const timeOftheDay = date.getHours();
  const today = date.getDay();

  const [day_open, m_hr, am, , e_hr, pm] = time.split(" ");

  let isOpen = false;

  let m_hr_in_24hr_format = parseInt(m_hr);
  let e_hr_in_24hr_format = parseInt(e_hr);

  if (am === "pm") {
    m_hr_in_24hr_format = parseFloat(m_hr) + 12;
  }

  if (pm !== "am") {
    e_hr_in_24hr_format = parseFloat(m_hr) + 12;
    if (
      m_hr_in_24hr_format <= timeOftheDay &&
      timeOftheDay <= e_hr_in_24hr_format
    ) {
      isOpen = true;
    }
  } else {
    if (m_hr_in_24hr_format >= timeOftheDay && timeOftheDay <= e_hr) {
      isOpen = true;
    }
  }

  // check for particular day
  let [first, second] = day_open.split("-");
  first = first ? first.split(",") : [];
  second = second ? second.split(",") : [];
  const daysOpen = [...first, ...second];

  const [openToday, willOpen] = handleDateCheck(daysOpen, today);

  return [isOpen && openToday, willOpen];
};
