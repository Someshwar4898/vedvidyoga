"use client";

import { generateFAQSchema, schemaToJsonString } from "../../lib/schema/generateFAQSchema";
import type { FAQ, FAQSchemaProps } from "../../lib/schema/types";

export default function FAQSchema({ faqs, addToHead = false }: FAQSchemaProps) {
  if (!faqs || !Array.isArray(faqs) || faqs.length === 0) {
    return null;
  }

  const schema = generateFAQSchema(faqs);

  if (!schema) {
    return null;
  }

  const jsonLdString = schemaToJsonString(schema);

  return (
    <script
      type="application/ld+json"
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: jsonLdString }}
    />
  );
}

export { FAQSchema as FAQSchemaComponent };

export type { FAQ, FAQSchemaProps } from "../../lib/schema/types";
