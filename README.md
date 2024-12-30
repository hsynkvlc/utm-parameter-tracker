# UTM Parameter Tracker

A JavaScript script for capturing, storing, and managing UTM parameters in local storage with expiration handling. It ensures UTM parameters persist across sessions and automatically appends them to links on your website.

## Features
- Captures UTM parameters from the URL and stores them in local storage.
- Automatically expires UTM parameters after 30 days.
- Prevents expired UTM parameters from being appended to links.
- Adds valid UTM parameters to all links dynamically.
- Excludes timestamp keys from appearing in URLs.

---

## Usage
### 1. Add the Script
Copy and paste the following tag into the `<head>` or before the closing `<body>` tag of your HTML file:

```html
<script src="https://raw.githubusercontent.com/hsynkvlc/utm-parameter-tracker/main/utm-tracker.js"></script>
```
Replace `USERNAME` with your GitHub username and ensure the repository is publicly hosted.

---

### 2. Testing
1. Visit your website with UTM parameters in the URL:
```
https://example.com/?utm_source=test&utm_medium=social&utm_campaign=promo
```
2. Open browser developer tools and check **localStorage** for saved UTM parameters.
3. Test expiration by modifying timestamps to an older value and refreshing the page.
4. Inspect links to verify that valid UTM parameters are dynamically appended.

---

## Parameters Supported
- **utm_source**
- **utm_medium**
- **utm_campaign**
- **utm_term**
- **utm_content**

> _Note_: Timestamp keys (e.g., `utm_content_timestamp`) are automatically excluded from links.

---

## Configuration
By default:
- **Expiration**: 30 days.
- **Storage**: Local storage for cross-session persistence.

To change expiration time, modify the following line in the script:
```javascript
var expirationTime = 30 * 24 * 60 * 60 * 1000; // 30 days in milliseconds
```

---

## License
This project is licensed under the MIT License.

---

## Contributing
Contributions are welcome! Feel free to fork this repository, make updates, and submit a pull request.

