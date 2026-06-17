import type { FAQ, FAQSchema, Question } from "./types";
export function generateFAQSchema(faqs: FAQ[]): FAQSchema | null {
  if (!faqs || !Array.isArray(faqs) || faqs.length === 0) {
    return null;
  }

  const mainEntity: Question[] = [];

  for (const faq of faqs) {
    const question = sanitizeString(faq?.question);
    const answer = sanitizeString(faq?.answer);

    if (question && answer) {
      mainEntity.push({
        "@type": "Question",
        name: question,
        acceptedAnswer: {
          "@type": "Answer",
          text: answer,
        },
      });
    }
  }

  if (mainEntity.length === 0) {
    return null;
  }

  const schema: FAQSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity,
  };

  return schema;
}

function sanitizeString(value: unknown): string | null {
  if (value === null || value === undefined) {
    return null;
  }

  const stringValue = String(value).trim();

  if (stringValue.length === 0) {
    return null;
  }

  return stringValue;
}

export function schemaToJsonString(schema: FAQSchema): string {
  return JSON.stringify(schema, null, 2);
}

export default generateFAQSchema;
