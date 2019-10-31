const daysOftheWeekStrings = {
  Sun: 0,
  Mon: 1,
  Tue: 2,
  Wed: 3,
  Thur: 4,
  Fri: 5,
  Sat: 6,
};

const daysOftheWeekIndices = {
  0: "Sun",
  1: "Mon",
  2: "Tue",
  3: "Wed",
  4: "Thur",
  5: "Fri",
  6: "Sat",
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
      } else {
        willOpen = daysOpen[2];
      }
    }
  } else if (len < 2) {
    if (daysOftheWeekStrings[daysOpen[0]] === today) {
      isOpen = true;
      willOpen = daysOftheWeekIndices[++today];
    } else {
      willOpen = daysOftheWeekIndices[++today];
    }
  } else {
    isOpen = true;
    willOpen = daysOftheWeekIndices[++today];
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
    e_hr_in_24hr_format = parseFloat(e_hr) + 12;
    if (
      m_hr_in_24hr_format <= timeOftheDay &&
      timeOftheDay <= e_hr_in_24hr_format
    ) {
      isOpen = true;
    }
  } else {
    if (
      m_hr_in_24hr_format >= timeOftheDay &&
      timeOftheDay <= e_hr_in_24hr_format
    ) {
      isOpen = true;
    }
  }

  // check for particular day
  let [first, second] = day_open.split("-");
  first = first ? first.split(",") : [];
  second = second ? second.split(",") : [];
  const daysOpen = [...first, ...second];

  const [openToday, willOpen] = handleDateCheck(daysOpen, today);

  return [isOpen && openToday, `${willOpen} ${m_hr} am`];
};

/**
 * @summary - Determines whether a restaurant is open or not.
 * @description - checks whether a restaurant is open by comparing the
 *  current date and the time range for a particular restaurant.
 *
 * @param (String) time.
 * @return (Array) - An array with two fields (isOpen,willOpen).
 */
export const isOpen = time => {
  let isOpen = false;
  let willOpen = "";

  if (time.length > 1) {
    time.forEach(time => {
      let [openToday, whenWillOpen] = isOpenHelper(time.trim());

      isOpen = isOpen || openToday;
      willOpen = willOpen || whenWillOpen;
    });
  } else {
    [isOpen, willOpen] = isOpenHelper(time[0]);
  }

  return [isOpen, willOpen];
};
