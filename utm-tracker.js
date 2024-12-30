  <script>
  (function () {
    // Function to get URL parameters
    function getParams(url) {
      var params = {};
      var parser = document.createElement('a');
      parser.href = url;
      var query = parser.search.substring(1);
      var vars = query.split('&');
      for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split('=');
        if (pair[0]) {
          params[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '');
        }
      }
      return params;
    }

    // Function to save UTM parameters with an expiration timestamp
    function saveUTMParams(params) {
      var currentTime = new Date().getTime();

      // Clear previous UTM parameters and timestamps
      Object.keys(localStorage).forEach(function(key) {
        if (key.startsWith('utm_')) {
          localStorage.removeItem(key);
          localStorage.removeItem(key + "_timestamp");
        }
      });

      // Save new UTM parameters and their timestamp
      for (var key in params) {
        if (params.hasOwnProperty(key) && key.startsWith('utm_') && !key.includes('_timestamp')) { // Exclude timestamps
          localStorage.setItem(key, params[key]);
          localStorage.setItem(key + "_timestamp", currentTime);
        }
      }
    }

    // Function to check if UTM parameters have expired and clean them up
    function cleanExpiredUTMParams() {
      var expirationTime = 30 * 24 * 60 * 60 * 1000; // 30 days
      var currentTime = new Date().getTime();

      // Collect all expired keys
      var keysToDelete = [];

      Object.keys(localStorage).forEach(function(key) {
        if (key.startsWith('utm_')) {
          var timestampKey = key + "_timestamp";
          var timestamp = localStorage.getItem(timestampKey);

          // Check if timestamp exists and is expired
          if (timestamp && (currentTime - parseInt(timestamp) > expirationTime)) {
            keysToDelete.push(key);            // Mark UTM key
            keysToDelete.push(timestampKey);  // Mark timestamp key
          }
        }
      });

      // Delete all expired keys
      keysToDelete.forEach(function(key) {
        localStorage.removeItem(key);
      });
    }

    // Function to retrieve valid (non-expired) UTM parameters from localStorage
    function getStoredUTMParams() {
      var storedParams = {};
      var expirationTime = 30 * 24 * 60 * 60 * 1000; // 30 days
      var currentTime = new Date().getTime();

      Object.keys(localStorage).forEach(function(key) {
        if (key.startsWith('utm_') && !key.includes('_timestamp')) { // Only retrieve UTM keys, exclude timestamps
          var timestampKey = key + "_timestamp";
          var timestamp = localStorage.getItem(timestampKey);

          // Include only non-expired keys
          if (timestamp && (currentTime - parseInt(timestamp) <= expirationTime)) {
            storedParams[key] = localStorage.getItem(key);
          }
        }
      });
      return storedParams;
    }

    // Function to add UTM parameters to all links
    function addParamsToLinks(params) {
      var links = document.querySelectorAll('a[href]');
      for (var i = 0; i < links.length; i++) {
        var link = links[i];
        var url = new URL(link.href);

        for (var key in params) {
          // Exclude timestamps explicitly
          if (params.hasOwnProperty(key) && key.startsWith('utm_') && !key.includes('_timestamp')) { 
            var searchParams = new URLSearchParams(url.search);
            searchParams.set(key, params[key]);
            url.search = searchParams.toString();
          }
        }
        link.href = url.href;
      }
    }

    // Get UTM parameters from the current URL
    var urlParams = getParams(window.location.href);

    // If URL contains UTM parameters, save them and overwrite any existing parameters
    if (Object.keys(urlParams).some(function (key) { return key.startsWith('utm_'); })) {
      saveUTMParams(urlParams); // Store them in localStorage (will overwrite any existing UTM parameters)
    }

    // Clean expired UTM parameters
    cleanExpiredUTMParams();

    // Retrieve stored UTM parameters, excluding expired ones
    var storedParams = getStoredUTMParams();

    // Merge URL and stored parameters (priority to URL values)
    var combinedParams = Object.assign({}, storedParams, urlParams);

    // Add UTM parameters to all links
    addParamsToLinks(combinedParams);
  })();
</script>
