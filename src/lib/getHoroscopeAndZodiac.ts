const zodiacSigns = [
  { sign: "Aries", symbol: "Ram", start: "03-21", end: "04-19" },
  { sign: "Taurus", symbol: "Bull", start: "04-20", end: "05-20" },
  { sign: "Gemini", symbol: "Twins", start: "05-21", end: "06-21" },
  { sign: "Cancer", symbol: "Crab", start: "06-22", end: "07-22" },
  { sign: "Leo", symbol: "Lion", start: "07-23", end: "08-22" },
  { sign: "Virgo", symbol: "Virgin", start: "08-23", end: "09-22" },
  { sign: "Libra", symbol: "Balance", start: "09-23", end: "10-23" },
  { sign: "Scorpio", symbol: "Scorpion", start: "10-24", end: "11-21" },
  { sign: "Sagittarius", symbol: "Archer", start: "11-22", end: "12-21" },
  { sign: "Capricorn", symbol: "Goat", start: "12-22", end: "01-19" },
  { sign: "Aquarius", symbol: "Water Bearer", start: "01-20", end: "02-18" },
  { sign: "Pisces", symbol: "Fish", start: "02-19", end: "03-20" },
];

export const getHoroscopeAndZodiac = (birthday: any) => {
  const date = new Date(birthday);
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const dateString = `${month}-${day}`;

  for (let i = 0; i < zodiacSigns.length; i++) {
    const { sign, symbol, start, end } = zodiacSigns[i];
    if (
      (dateString >= start && dateString <= end) ||
      (start > end && (dateString >= start || dateString <= end))
    ) {
      return { horoscope: sign, zodiac: symbol };
    }
  }
  return { horoscope: "", zodiac: "" };
};

export const formatBirthday = (birthday: any) => {
  if (birthday) {
    const date = new Date(birthday);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();

    // Calculate age
    const today = new Date();
    let age = today.getFullYear() - year;
    const monthDiff = today.getMonth() - date.getMonth();
    const dayDiff = today.getDate() - date.getDate();

    // Adjust age if the birthday has not yet occurred this year
    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
      age--;
    }

    return `${day} / ${month} / ${year} (Age ${age})`;
  } else {
    return null;
  }
};

export const calculateAge = (birthday: any) => {
  const date = new Date(birthday);
  const year = date.getFullYear();

  // Calculate age
  const today = new Date();
  let age = today.getFullYear() - year;
  const monthDiff = today.getMonth() - date.getMonth();
  const dayDiff = today.getDate() - date.getDate();

  // Adjust age if the birthday has not yet occurred this year
  if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
    age--;
  }
  return age;
};
