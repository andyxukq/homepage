// Author links configuration
const authorLinks = {
    'Zhenghang Ren': 'https://home.cse.ust.hk/~zrenak/',
    // Add more authors here as needed
};

// Function to process author names in the document
function processAuthorLinks() {
    // Get all elements that might contain author names
    const elements = document.querySelectorAll('.authors');
    
    elements.forEach(element => {
        // Get the text content
        let content = element.innerHTML;
        
        // Process each author in our configuration
        Object.entries(authorLinks).forEach(([name, url]) => {
            // Create a regex that matches the author name as a whole word
            const regex = new RegExp(`\\b${name}\\b`, 'g');
            
            // Replace the name with a link if it exists
            content = content.replace(regex, `<a href="${url}" target="_blank" rel="noopener noreferrer">${name}</a>`);
        });
        
        // Update the element's content
        element.innerHTML = content;
    });
}

// Run when the document is ready
document.addEventListener('DOMContentLoaded', processAuthorLinks); 