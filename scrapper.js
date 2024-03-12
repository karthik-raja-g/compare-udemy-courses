// import { SELECTORS } from "./selectors";
const SELECTORS = {
  title: [
    {
      type: "data-purpose",
      selector: "lead-title",
    },
    {
      type: "tag",
      selector: "h1",
    },
  ],
  price: [
    {
      type: "data-purpose",
      selector: "course-price-text",
    },
  ],
  ratingNumber: [
    {
      type: "data-purpose",
      selector: "rating-number",
    },
  ],
  ratingCount: [
    {
      type: "data-purpose",
      selector: "rating",
    },
  ],
  enrollment: [
    {
      type: "data-purpose",
      selector: "enrollment",
    },
    {
      type: "class",
      selector: "enrollment",
    },
  ],
  instructor: [
    {
      type: "data-purpose",
      selector: "instructor-name-top",
    },
    {
      type: "partial-class",
      selector: "instructor__title",
    },
  ],
  updatedAt: [
    {
      type: "data-purpose",
      selector: "last-update-date",
    },
    {
      class: "class",
      selector: "last-update-date",
    },
  ],
  language: [
    {
      type: "data-purpose",
      selector: "lead-course-locale",
    },
  ],
  contentInfo: [
    {
      type: "data-purpose",
      selector: "curriculum-stats",
    },
    {
      type: "partial-class",
      selector: "curriculum--content-length",
    },
  ],
};

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function removeSpaces(text = "") {
  if (!text) return "";
  return text.replace(/\s+/g, "");
}

function scrapeBySelector({ type = "", selector }, returnElement = false) {
  let data = "";
  switch (type) {
    case "data-purpose":
      data = document.querySelector(`[${type}="${selector}"]`);
      break;
    case "tag":
      data = document.getElementsByTagName(selector)[0];
      break;
    case "class":
      data = document.getElementsByClassName(selector)[0];
      break;
    case "id":
      data = document.getElementById(selector);
      break;
    case "partial-class":
      data = document.querySelector(`[class*="${selector}"]`);
      break;
    default:
      data = "";
  }
  if (returnElement) return data;
  return data?.textContent.trim();
}

function getDataFromSelectors(selectors = []) {
  let data = "";
  for (const selector of selectors) {
    data = scrapeBySelector(selector);
    if (data) break;
  }
  return data;
}
function getTitle() {
  const title = getDataFromSelectors(SELECTORS.title);
  return title;
}

function getPrice() {
  const price = getDataFromSelectors(SELECTORS.price);
  const cleaned = price.replace(/[^\d.-]/g, "");
  return cleaned;
}

function getRatingsCount() {
  const ratingRaw = getDataFromSelectors(SELECTORS.ratingCount);
  const countRaw = ratingRaw.match(/\(([^)]+)\)/g)?.[0];
  const count = countRaw.replace(/[^\d.-]/g, "");
  return count;
}

function getRatingNumber() {
  const rating = getDataFromSelectors(SELECTORS.ratingNumber);
  return rating;
}

function getEnrollment() {
  const enrollment = getDataFromSelectors(SELECTORS.enrollment);
  return enrollment;
}

function getInstructorName() {
  const instructor = getDataFromSelectors(SELECTORS.instructor);
  const cleaned = instructor.replace("Created by ", "");
  return cleaned;
}

function getLastUpdated() {
  const lastUpdated = getDataFromSelectors(SELECTORS.updatedAt);
  const dt = lastUpdated.replace("Last updated ");
  return lastUpdated;
}

function getLanguage() {
  const language = getDataFromSelectors(SELECTORS.language);
  return language;
}

function init() {
  return {
    title: getTitle(),
    price: getPrice(),
    ratingsCount: getRatingsCount(),
    ratingsNumber: getRatingNumber(),
    enrollment: getEnrollment(),
    instructorName: getInstructorName(),
    lastUpdated: getLastUpdated(),
    language: getLanguage(),
  };
}
init();
