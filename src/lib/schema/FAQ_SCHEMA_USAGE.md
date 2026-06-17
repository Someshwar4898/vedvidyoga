# FAQ Schema - Usage Guide

This document provides examples of how to use the FAQ Schema component and helper function in your Next.js application.

## Files Created

1. **`src/lib/schema/generateFAQSchema.ts`** - Reusable helper function
2. **`src/lib/schema/types.ts`** - TypeScript type definitions
3. **`src/lib/schema/index.ts`** - Barrel exports for easy importing
4. **`src/components/SEO/FAQSchema.tsx`** - React component for rendering JSON-LD

## Quick Start

### Basic Usage

```tsx
import FAQSchema from "@/components/SEO/FAQSchema";

// In your component render
<FAQSchema 
  faqs={[
    { question: "What is yoga?", answer: "Yoga is a practice..." },
    { question: "How often should I practice?", answer: "Ideally daily..." }
  ]} 
/>
```

### Conditional Rendering

Only renders the JSON-LD script when FAQs exist:

```tsx
{faqs.length > 0 && <FAQSchema faqs={faqs} />}
```

## Example Integration

### With WordPress ACF Data

```tsx
import FAQSchema from "@/components/SEO/FAQSchema";

// Parse ACF textarea format (Q: / A:)
const faqs = [
  { question: "What is yoga?", answer: "Yoga is a practice..." },
  { question: "How often should I practice?", answer: "Ideally daily..." }
];

// Render both the visual FAQ and the JSON-LD schema
<FAQSchema faqs={faqs} />
<PostFAQ raw={rawACFString} />
```

### Server Component (App Router)

```tsx
// app/blog/[slug]/page.tsx
import FAQSchema from "@/components/SEO/FAQSchema";

async function getPost(slug: string) {
  const res = await fetch(`${API}/posts/${slug}`);
  return res.json();
}

export default async function BlogPost({ params }) {
  const post = await getPost(params.slug);
  const faqs = post?.acf?.faqs || [];
  
  return (
    <>
      <article>
        <h1>{post.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </article>
      
      {/* FAQ Schema - Only renders when faqs array has items */}
      {faqs.length > 0 && <FAQSchema faqs={faqs} />}
    </>
  );
}
```

### Client Component

```tsx
// components/BlogPost.tsx
"use client";

import { useState, useMemo } from "react";
import FAQSchema from "@/components/SEO/FAQSchema";

function BlogPost({ initialPost }) {
  const [post, setPost] = useState(initialPost);
  
  // Parse FAQs with useMemo to avoid re-parsing on every render
  const parsedFAQs = useMemo(() => {
    if (!post?.faqs) return [];
    return parseFAQs(post.faqs);
  }, [post?.faqs]);
  
  return (
    <>
      <h1>{post.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
      
      {/* FAQ Schema renders JSON-LD when FAQs exist */}
      {parsedFAQs.length > 0 && <FAQSchema faqs={parsedFAQs} />}
      
      {/* Visual FAQ component */}
      <PostFAQ raw={post.faqs} />
    </>
  );
}
```

## Using the Helper Function Directly

### generateFAQSchema()

```tsx
import { generateFAQSchema, schemaToJsonString } from "@/lib/schema";

function MyComponent() {
  const faqs = [
    { question: "What is yoga?", answer: "Yoga is..." },
    { question: "Who can practice?", answer: "Anyone can..." }
  ];
  
  // Get the schema object
  const schema = generateFAQSchema(faqs);
  
  if (!schema) {
    return <p>No FAQs to display</p>;
  }
  
  // Convert to JSON string
  const jsonLd = schemaToJsonString(schema);
  
  // Use directly in a script tag if needed
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: jsonLd }}
    />
  );
}
```

### Sanitization

The helper function automatically sanitizes input:

```tsx
import { generateFAQSchema } from "@/lib/schema";

// These will be filtered out:
// - null values
// - undefined values
// - empty strings ""
// - whitespace-only strings "   "

const faqs = [
  { question: "Valid question", answer: "Valid answer" },
  { question: null, answer: "No question" },
  { question: "  ", answer: "Empty question" },
  { question: "", answer: "" }
];

const schema = generateFAQSchema(faqs);
// Result: Only the first FAQ is included
```

## Output Format

The generated JSON-LD follows Google's FAQPage guidelines:

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is yoga?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yoga is a practice..."
      }
    },
    {
      "@type": "Question",
      "name": "How often should I practice?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ideally daily..."
      }
    }
  ]
}
```

## TypeScript Types

```typescript
// Input type
interface FAQ {
  question: string;
  answer: string;
}

// Output type
interface FAQSchema {
  "@context": "https://schema.org";
  "@type": "FAQPage";
  mainEntity: Array<{
    "@type": "Question";
    name: string;
    acceptedAnswer: {
      "@type": "Answer";
      text: string;
    };
  }>;
}

// Component props
interface FAQSchemaProps {
  faqs: FAQ[];
  addToHead?: boolean; // Optional, defaults to false
}
```

## Best Practices

1. **Always use conditional rendering**: Only render when FAQs exist
   ```tsx
   {parsedFAQs.length > 0 && <FAQSchema faqs={parsedFAQs} />}
   ```

2. **Parse FAQs once**: Use `useMemo` to avoid re-parsing
   ```tsx
   const parsedFAQs = useMemo(() => parseFAQs(post?.faqs), [post?.faqs]);
   ```

3. **Keep FAQs in sync**: If you update the visual FAQ display, update the schema data accordingly

4. **Test with Google**: Use [Google's Rich Results Test](https://search.google.com/test/rich-results) to verify the schema

5. **Server-side rendering**: The component is optimized for SSR/SEO - the JSON-LD is rendered on the server
