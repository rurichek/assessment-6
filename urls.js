const fs = require('fs');
const axios = require('axios');
const url = require('url');

const filename = process.argv[2];

if (!filename) {
    console.error('Please provide a filename as an argument.');
    process.exit(1);
}

fs.readFile(filename, 'utf8', async (err, data) => {
    if (err) {
        console.error(`Error reading the file ${filename}:`, err.message);
        process.exit(1);
    }

    // split the lines and filter out empty lines
    const urls = data.split('\n').filter(Boolean); 

    for (let site of urls) {
        try {
            const response = await axios.get(site);
            const htmlContent = response.data;

            // Extract the hostname from the URL
            const hostname = url.parse(site).hostname;

            // Save the HTML content to a file named after the hostname
            fs.writeFileSync(hostname, htmlContent, 'utf8');
            console.log(`Saved HTML content of ${site} to ${hostname}`);
        } catch (fetchErr) {
            console.error(`Error fetching content from ${site}:`, fetchErr.message);
        }
    }
});
