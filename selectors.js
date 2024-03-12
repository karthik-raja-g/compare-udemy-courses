export const SELECTORS = {
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
      type: 'partial-class',
      selector: 'instructor__title'
    },
    {
      type: 'data-purpose',
      selector: 'instructor-name-top'
    }
  ]
};