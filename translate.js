// Load dependencies
const axios = require('axios');
const fs = require('fs');
const csv = require('csv-parser');
const createCsvWriter = require('csv-writer').createObjectCsvWriter; // For writing CSV
require('dotenv').config();

// Load API key from environment variables
const apiKey = process.env.OPENAI_API_KEY;

// Path to your CSV file
const inputFile = process.env.INPUT_CSV
const outputFile = process.env.OUTPUT_CSV

// Function to log errors and info
const logError = (message) => {
    console.error(message);
    fs.appendFileSync('error_log.txt', `${new Date().toISOString()} - ${message}\n`);
};

const logInfo = (message) => {
    console.log(message);
    fs.appendFileSync('info_log.txt', `${new Date().toISOString()} - ${message}\n`);
};

// Function to translate text using OpenAI's model
const translateText = async (text, targetLanguage) => {
    const prompt = `
    Translate the following text to ${targetLanguage}, preserving any HTML markup as is, and do not translate URLs. 
    If a part of the text looks like a URL (starting with http:// or https://), keep it unchanged.
    Here is the text:
    
    ${text}
`;

    try {
        const response = await axios.post('https://api.openai.com/v1/chat/completions', {
            model: process.env.MODEL_ID,
            messages: [{ role: 'user', content: prompt }],
            max_tokens: 1000
        }, {
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            }
        });

        return response.data.choices[0].message.content.trim();
    } catch (error) {
        logError(`Error translating text: ${error.message}`);
        return ''; // Return an empty string on error to continue processing other rows
    }
};

// Read CSV and process rows
const rows = [];
fs.createReadStream(inputFile)
    .pipe(csv())
    .on('data', (row) => rows.push(row))
    .on('end', async () => {
        logInfo(`Started processing CSV rows for translation (${inputFile}). This may take a while...`);
        for (let row of rows) {
            const locale = row['Locale'];
            const defaultContent = row['Default content'];

            // Determine target language for translation
            let targetLanguage;
            if (locale === 'fr') targetLanguage = 'French';
            else if (locale === 'de') targetLanguage = 'German';

            if (targetLanguage && defaultContent) {
                logInfo(`Translating row ${rows.indexOf(row) + 1}...`);
                row['Translated content'] = await translateText(defaultContent, targetLanguage);
            } else {
                logInfo(`Skipping row ${rows.indexOf(row) + 1}: Missing content or target language.`);
            }
        }

        saveTranslatedCSV(rows);
        logInfo('Translation completed.');
    });

// Function to save translated data to a new CSV using csv-writer
const saveTranslatedCSV = (rows) => {
    const headers = Object.keys(rows[0]).map(header => ({ id: header, title: header }));
    
    const csvWriter = createCsvWriter({
        path: outputFile,
        header: headers,
    });

    csvWriter.writeRecords(rows)
        .then(() => logInfo(`Translated data saved to ${outputFile}`))
        .catch(error => logError(`Error writing to CSV: ${error.message}`));
};
