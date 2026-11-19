# Regal Renovations — Project Editor (Pages CMS)

The public website is static and no longer needs Supabase. No subscription or scheduled keep-alive requests are required.

## One-time owner setup
1. Publish all files in this ZIP to the ROOT of the existing GitHub repository `SofiiaZH/regal-renovations` (not into a subfolder).
2. Go to https://app.pagescms.org and sign in with the GitHub account that owns the repository.
3. Install/authorize the Pages CMS GitHub App for that repository, then select it. It reads `.pages.yml` in the repository root.
4. Open **Projects**. Add a project entry, title, description, cover photo and optional gallery photos. Set **Published on website** to true, then save.
5. Wait for GitHub Pages to deploy and check `projects.html` on the live website. The editor is hosted at app.pagescms.org, not at `/admin/`.
6. Give Dale the appropriate Pages CMS editing access using the service's supported user/access flow. Do not share your GitHub password. Verify Dale can sign in and edit from his own account before handover.

## Notes and limitations
- Images and project data are stored in the GitHub repository, so changes remain on the website even when Pages CMS is offline.
- Free GitHub hosting/storage has usage limits. Resize large phone photos before uploading (prefer JPEG/WebP, around 1600–2200 px wide and ~0.5–1.5 MB each). GitHub blocks individual files over 100 MB; large repositories are not recommended.
- Publishing is not instantaneous; GitHub Pages needs time to deploy after each save.
- The old Supabase project is not deleted by this ZIP. Export/back up existing project details and photos before deleting or pausing it. This ZIP starts with an empty gallery because it has no access to your uploaded Supabase data.
- The contact form is unchanged; test real delivery to Dale after deploying.
- DNS and existing email records must be preserved when connecting the domain.
- The Pages CMS editor is not part of the website; the public website will keep displaying the last published content if the editor is temporarily unavailable.
- This setup does not guarantee 100% uptime or unlimited free storage.
