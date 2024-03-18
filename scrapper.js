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
  instructorBio: [
    {
      type: "data-purpose",
      selector: "instructor-bio",
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

function scrapeBySelector(
  { type = "", selector },
  returnElement = false,
  parent = null
) {
  let data = "";
  const anchor = parent || document;
  switch (type) {
    case "data-purpose":
      data = anchor.querySelector(`[${type}="${selector}"]`);
      break;
    case "tag":
      data = anchor.getElementsByTagName(selector)[0];
      break;
    case "class":
      data = anchor.getElementsByClassName(selector)[0];
      break;
    case "id":
      data = anchor.getElementById(selector);
      break;
    case "partial-class":
      data = anchor.querySelector(`[class*="${selector}"]`);
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

function getContentInfo() {
  const contentInfo = getDataFromSelectors(SELECTORS.contentInfo);
  const parts = contentInfo.split("•");
  const { sections, lectures, length } = parts.reduce(
    (acc, part) => {
      if (part.includes("sections"))
        acc.sections = part.replace("sections", "").trim();
      if (part.includes("lectures"))
        acc.lectures = part.replace("lectures", "").trim();
      if (part.includes("length"))
        acc.length = part.replace("total length", "").trim();
      return acc;
    },
    {
      sections: 0,
      lectures: 0,
      length: 0,
    }
  );
  console.log({ sections, lectures, length });
  return { sections, lectures, length };
}

function getInstructorStats() {
  const bios = document.querySelectorAll("[data-purpose='instructor-bio']");
  const data = [];
  for (const bio of bios) {
    const name = bio
      .querySelector(`[class*="instructor__title"]`)
      ?.textContent.trim();
    const stats = bio.getElementsByTagName("li");
    const detail = {
      name,
      stats: [],
    };
    for (const stat of stats) {
      detail.stats.push(stat.textContent.trim());
    }
    data.push(detail);
  }
  return data;
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
    contentInfo: getContentInfo(),
    instructorStats: getInstructorStats(),
  };
}
init();
