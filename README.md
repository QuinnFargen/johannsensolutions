# johannsensolutions

johannsensolutions.com business page

Static single-page site for Johannsen Solutions (appliance repair &amp; power washing, Luverne, MN). No build step required.

## Structure

- `index.html` — page markup
- `css/styles.css` — styles
- `js/main.js` — mobile nav toggle + the quote form's Web3Forms submission

## Run locally

Open `index.html` directly in a browser, or serve the folder with any static file server, e.g.:

```bash
python3 -m http.server 8000
```

## Deploy (GitHub Pages)

In the repo settings, enable GitHub Pages for the `main` branch, root (`/`) folder. No build step is needed since this is plain HTML/CSS/JS.

## Quote form

The "Request a free quote" form on the homepage submits to [Web3Forms](https://web3forms.com) via `js/main.js`, which POSTs the form as JSON and shows an inline success/error message instead of redirecting the page.
