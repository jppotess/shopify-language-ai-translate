# Shopify Language AI Translator

## Overview
The Shopify Language AI Translator is a tool designed to enhance content localization in Shopify stores. It addresses the limitations of default auto translators, which often miss nuanced translations.

## Features
- **Automated Translation:** Utilizes OpenAI APIs to translate content from an exported Shopify Language CSV file, returning a CSV with the translated text.
- **Customizable Filtering:** Allows for filtering of specific elements, such as numbers, hard-coded images, and metafield values used for reference.

## How to Use
1. **Export Languages:** Begin by exporting the language CSV from your Shopify store.
2. **Apply Filters:** Use filters to refine the content you want to translate (e.g., exclude numbers, images, or specific metafield values).
3. **Load CSV:** Import the filtered CSV into the project.
4. **API Key:** Add your OpenAI API Key to enable translations.
5. **Input and Output CSV:** Add your CSV file names to the .env.
6. **Trial Run:** Test the translation process on a sample set of 100 rows to ensure quality and accuracy.
7. **Model Tuning:** Adjust your model settings according to the complexity of the content being translated.
8. **Localization:** The tool currently supports translations for French (fr) and German (de).

## Roadmap
- **Dynamic Locale Mapping:** Implement dynamic handling of locales.
- **Environment Variables:** Add support for .env variables to manage input and output files.
- **Parallel Requests:** Enable parallel processing of translation requests.
- **Rate Limiting:** Introduce mechanisms to handle rate limiting effectively.
