const https = require('https');
const fs = require('fs');

/**
 * Fetches google.com and saves the response to a file
 */
function fetchGoogleAndSave() {
    const outputFile = 'google-response.html';
    
    console.log('Fetching google.com...');
    
    https.get('https://www.google.com', (response) => {
        let data = '';
        
        // Collect data chunks
        response.on('data', (chunk) => {
            data += chunk;
        });
        
        // When response is complete
        response.on('end', () => {
            // Save to file
            fs.writeFile(outputFile, data, (err) => {
                if (err) {
                    console.error('Error writing to file:', err);
                    return;
                }
                console.log(`✓ Response saved successfully to ${outputFile}`);
                console.log(`  Status Code: ${response.statusCode}`);
                console.log(`  Content Length: ${data.length} bytes`);
            });
        });
        
    }).on('error', (err) => {
        console.error('Error fetching google.com:', err.message);
    });
}

// Run the function
fetchGoogleAndSave();
