# Shopify Language AI Translator

Tool to localize content in a Shopify store. The default language auto translators seem to miss a good amount.

This tool simply runs translation requests to OPEN AI APIs on an exported Shopify Language CSV and gives back a CSV with translations.

1. Export languages from Shopify
2. Filter based on your criteria, example:
   1. Filter out numbers.
   2. Exclude hard-coded images.
   3. Remove metafield values used for reference.
3. Load CSV into the project.
4. Add you Open AI API Key
5. Trial run for example 100 rows.
6. Update your model depending on the complexity of translations.
7. Update locales** - currently running for just `fr` (French) and `de` (German).

## TODO

- Add locale mapping to handle locales dynamically
- Add `.env` vars for input/output files
- Handle parallel requests
- Handle rate limiting
