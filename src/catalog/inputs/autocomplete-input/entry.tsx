import { defineComponent } from "../../../lib/registry";
import { AutocompleteInput } from "./AutocompleteInput";
import reactSource from "./AutocompleteInput.tsx?raw";
import svelteSource from "./AutocompleteInput.svelte?raw";

const COUNTRIES = [
  "Argentina",
  "Australia",
  "Austria",
  "Belgium",
  "Brazil",
  "Canada",
  "Denmark",
  "Finland",
  "France",
  "Germany",
  "India",
  "Indonesia",
  "Ireland",
  "Italy",
  "Japan",
  "Mexico",
  "Netherlands",
  "Norway",
  "Portugal",
  "Spain",
  "Sweden",
  "Switzerland",
  "United Kingdom",
  "United States",
];

function AutocompleteInputPreview() {
  return (
    <div className="w-72">
      <AutocompleteInput suggestions={COUNTRIES} placeholder="Search a country…" />
    </div>
  );
}

export default defineComponent({
  id: "autocomplete-input",
  name: "Autocomplete Input",
  category: "inputs",
  description:
    "A typeahead combobox that filters suggestions as you type, highlights the match, and supports full keyboard navigation.",
  tags: ["combobox", "typeahead", "keyboard", "accessible"],
  Preview: AutocompleteInputPreview,
  react: [
    {
      filename: "AutocompleteInput.tsx",
      language: "tsx",
      source: reactSource,
    },
  ],
  svelte: [
    {
      filename: "AutocompleteInput.svelte",
      language: "svelte",
      source: svelteSource,
    },
  ],
});
