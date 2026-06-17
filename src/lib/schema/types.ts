
export interface FAQ {
  question: string;
  answer: string;
}


export interface Question {
  "@type": "Question";
  name: string;
  acceptedAnswer: Answer;
}


export interface Answer {
  "@type": "Answer";
  text: string;
}


export interface FAQSchema {
  "@context": "https://schema.org";
  "@type": "FAQPage";
  mainEntity: Question[];
}

export interface FAQSchemaProps {
  faqs: FAQ[];
  addToHead?: boolean;
}
