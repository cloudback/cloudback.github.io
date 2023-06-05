(function() {
  // Check if 'doNotTrack' is set in sessionStorage or localStorage
  if (sessionStorage.getItem('doNotTrack') || localStorage.getItem('doNotTrack')) {
    return; // If 'doNotTrack' is set, exit the function
  }
  
  // Get custom data attributes from the current script element
  var id = document.currentScript.getAttribute("data-id");
  var utcoffset = document.currentScript.getAttribute("data-utcoffset");
  var server = document.currentScript.getAttribute("data-server") || "https://docs.cloudback.it/counter";
  
  // Check if '_swa' is not in sessionStorage and if the document referrer doesn't start with the current protocol and host
  if (!sessionStorage.getItem("_swa") && !document.referrer.startsWith(location.protocol + "//" + location.host)) {
    // If conditions are met, wait 4500ms then perform the following actions
    setTimeout(function() {
      // Set '_swa' in sessionStorage
      sessionStorage.setItem("_swa", "1");
      // Send a fetch request to the server with various data parameters
      fetch(server + "/track?" + new URLSearchParams({
        referrer: document.referrer,
        screen: screen.width + "x" + screen.height,
        id: id,
        utcoffset: utcoffset,
      }));
    }, 4500);
  }
  
  // Send a 'beacon' request to the server with the page ID and pathname
  navigator.sendBeacon(server + "/trackpage", new URLSearchParams({
    id: id,
    page: window.location.pathname,
  }));
})();
