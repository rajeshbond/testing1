// Function to set the source of the iframe to your Google Sheets document
function setGoogleSheetIframeSource() {
    // Replace 'YOUR_EMBED_URL' with the embed URL of your Google Sheets document
    var embedUrl = 'https://docs.google.com/spreadsheets/d/1uqbCj754ZmtzetUnS7jrMOELNbbiayyBSTfR3mtTFpQ/edit#gid=0';
    document.getElementById('sheetFrame').src = embedUrl;
}


function callApi() {

    fetch('https://final-scan.onrender.com/start')
    .then(response => response.json())
    .then(data => console.log(data)) // Handle API response as needed
    .catch(error => console.error('Error:', error));
}

// Function to refresh the iframe source every 5 minutes
function refreshGoogleSheetData() {
    setGoogleSheetIframeSource();
    callApi();
    setTimeout(refreshGoogleSheetData, 2 * 60 * 1000); // Refresh every 2 minutes (5 * 60 * 1000 milliseconds)
}
function dashboard() {
    try{
        window.location.href = "/dashboard"; 
    }catch(e){
        console.log(e);
    }
}

// Function to call the API and refresh Google Sheets data when the page loads
window.onload = function() {
    callApi();
    refreshGoogleSheetData();
};
