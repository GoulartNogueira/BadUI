const form = document.querySelector(".calendar");
const month = document.querySelector(".month");

const date = new Date();
let offset = 0;
const YEAR_MIN = 1900;
const YEAR_MAX = 2099;

// prettier-ignore
const numbers = [
  "",    "one",    "two",    "three",    "four",     "five",    "six",     "seven",     "eight",    "nine",
  "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen",
];

const tens = ["", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"];

// prettier-ignore
const months = [
  'January', 'February', 'March',     'April',   'May',      'June',
  'July',    'August',   'September', 'October', 'November', 'December',
];

const weekdays = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

const years = [...Array(YEAR_MAX - YEAR_MIN)]
  .map((_, index) => {
    const year = YEAR_MIN + index;
    const prefix = year < 2000 ? "nineteen" : "two thousand";
    const middle = year >= 2000 || year % 100 >= 10 ? " " : year % 100 > 0 ? " oh " : " hundred";
    const suffix = numbers[year % 100] ?? `${tens[((year % 100) / 10) | 0]}-${numbers[year % 10]}`;

    return [year, `${prefix}${middle}${suffix}`.replace(/-$/, "")];
  })
  .sort((a, b) => a[1] > b[1])
  .map(([numeric, text]) => {
    return `<option value="${numeric}">${text}</option>`;
  });

form.year.innerHTML = years.join("");

form.year.value = setYear(date.getFullYear());
form.month.value = setMonth(date.getMonth());
update();

form.addEventListener("input", ({ target }) => {
  switch (target) {
    case form.month:
      setMonth(target.value);
      update();
      break;

    case form.year:
      setYear(target.value);
      update();
      break;
  }
});

form.addEventListener("click", ({ target }) => {
  switch (true) {
    case form.first.contains(target):
      form.month.value = setMonth(0);
      form.year.value = setYear(YEAR_MIN);
      update();
      break;

    case form.prev.contains(target):
      offset = (offset + 6) % 7;
      weekdays.push(weekdays.shift());
      update();
      break;

    case form.next.contains(target):
      offset = (offset + 1) % 7;
      weekdays.unshift(weekdays.pop());
      update();
      break;

    case form.last.contains(target):
      form.month.value = setMonth(11);
      form.year.value = setYear(YEAR_MAX);
      update();
      break;

    case month.contains(target):
      form.classList.add("fallen");
      break;
  }
});

document.addEventListener("gesturestart", function (e) {
  e.preventDefault();
});

function setYear(year) {
  date.setFullYear(year);
  form.year.parentElement.dataset.value = year;

  return year;
}

function setMonth(month) {
  date.setMonth(month);
  form.month.parentElement.dataset.value = months[month];

  return month;
}

function update() {
  const startOfMonth = new Date(date.getFullYear(), date.getMonth());
  const endOfMonth = new Date(date.getFullYear(), date.getMonth() + 1);
  const paddingSpan = (startOfMonth.getDay() + offset) % 7;
  endOfMonth.setDate(0);

  const week = weekdays.map((day) => `<span>${day}</span>`).join("");
  const padding = paddingSpan > 0 ? `<span style="grid-column-end: span ${paddingSpan}"></span>` : "";
  const days = [...Array(endOfMonth.getDate())]
    .map((_, i) => {
      return `<button data-day="${i + 1}" type="button"></button>`;
    })
    .join("");

  month.innerHTML = `${week}${padding}${days}`;
}
