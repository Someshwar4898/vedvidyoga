import SanskritTerm from "./SanskritTerm";
import { SANSKRIT_TERMS } from "../utils/sanskritTerms";

// Renders a category or subcategory name.
// If the slug matches a known Sanskrit term, it uses SanskritTerm so
// Devanagari script shows in Hindi/Marathi/Nepali, and a meaning
// bracket appears for other translated languages.
// If not found in the map, it just renders the name string as-is.
function CategoryName({ name, slug }) {
  const data = SANSKRIT_TERMS[slug];
  if (data) {
    // term comes from the backend (name prop) so it always reflects WP.
    // Only devanagari and meaning come from the local lookup table.
    return <SanskritTerm term={name} devanagari={data.devanagari} meaning={data.meaning} />;
  }
  return name;
}

export default CategoryName;
