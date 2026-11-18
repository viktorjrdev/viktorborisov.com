viktorborisov.com — files for GitHub Pages
==========================================

Upload everything in this folder to the root of the repository, keeping the folders:

  index.html                      homepage (replaces the current one)
  assets/nav.css                  navigation + Courses dropdown (all pages)
  assets/nav.js                   dropdown on touch screens, mobile menu
  assets/pages.css                styles for the Courses and Documents pages
  assets/glass.css                glass effect for the Courses and Documents pages
                                  (delete its <link> line in a page to switch it off)
  courses/index.html              -> viktorborisov.com/courses/
  documents/index.html            -> viktorborisov.com/documents/
  documents/files/                PDFs and cover images
  soc2-course/index.html          unchanged, included so the zip is complete

ADD A NEW DOCUMENT
1. Upload the PDF to documents/files/ (use a name without spaces, e.g. GDPR-Checklist.pdf).
   Optional: a cover image (JPG of page 1) with the same name.
2. In documents/index.html, copy the block between
   <!-- ===== DOCUMENT ... --> and <!-- ===== /DOCUMENT ===== -->
   and change the title, text, facts, tags and the file names.
   Without a cover image, delete the <a class="doc-cover">...</a> part.

ADD A NEW COURSE
1. Put the course in its own folder, e.g. gdpr-course/index.html
2. In courses/index.html, copy the <!-- ===== COURSE ... --> block and edit it.
3. Add one line to the dropdown in the <nav> of index.html, courses/index.html
   and documents/index.html (look for "Add new courses here"):
   <a href="gdpr-course/" class="drop-item"><b>Course title</b><span>Short line</span></a>
   (in courses/ and documents/ the link starts with ../ , e.g. href="../gdpr-course/")

After committing, GitHub Pages usually updates within 1–2 minutes.
Hard-refresh (Ctrl+Shift+R) if you still see the old version.
