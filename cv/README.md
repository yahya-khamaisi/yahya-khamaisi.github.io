# CV

`Yahya-Khamayseh-CV.docx` is the editable master. The served copy at
`public/Yahya-Khamayseh-CV.pdf` (linked from the site as "Download CV") is
generated from it.

## Regenerate

```bash
npm install                              # docx is a devDependency
node cv/build-cv.cjs cv/Yahya-Khamayseh-CV.docx
soffice --headless --convert-to pdf --outdir public cv/Yahya-Khamayseh-CV.docx
```

Edit `build-cv.cjs` for content changes, or edit the `.docx` directly in Word
and re-export the PDF. Keep the two in sync — and keep the contact URLs matching
`profile` in `src/data/content.ts`.
