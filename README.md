# AT Data website

Private working draft. GitHub Pages is intentionally not enabled.

## Preview locally

Run `python3 -m http.server 4173` in this folder and open http://localhost:4173. No install or build is required.

## Edit the site

- `index.html`: homepage
- `about.html`: About us
- `services.html`: services and interactive pyramid
- `work.html`: case studies
- `contact.html`: enquiry form (prepares an email; does not send or store it)
- `style.css`: shared styling
- `site.js`: navigation, services, email draft and case-study dialogs
- `logo.svg` and `favicon.svg`: editable vector logo in the site palette

## Case-study content

Edit `case-studies.js`. Each project has a title, introduction, four images with captions and sections containing arrays of paragraphs. Add as many paragraphs or sections as needed. The current text is explicitly placeholder content, not claims about completed work.

Replace the four `case-placeholder-*.svg` image paths in each project with real image filenames. Upload those images alongside these files. Use a 3:2 crop where practical and write useful alt text.

Cards open a scrollable dialog with four images, long-form text and a contact link. Escape, Close or clicking the backdrop closes it; keyboard focus returns to the selected card.

## Publishing later

The website is ready for a static host and supports repository subpaths. Publish this folder as the web root. There is no build step. No deployment workflow is included, so uploading or editing source does not publish it. Keep GitHub Pages off until ready to launch. `robots.txt` currently requests that crawlers do not index the draft; remove that restriction and add canonical URLs for the final domain when launching. Robots directives are not access controls.

## Checks

Desktop and mobile layout checks; case-study opening, four image slots, long text, closing and focus restoration; services selection; email draft validation. No visitor data is stored by the site.
