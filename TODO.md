# Content & Integration TODOs — The Picture Square

The following items are deliberately stubbed or left empty in accordance with the project build rules (which forbid placeholder phone numbers, lorem ipsum, fake social feeds, or invented content).

## 1. Google Business Profile & Studio Contact Verification
- [ ] **Official Studio Email Address**: Confirm the official studio inbox for client commissions (currently defaulted to `inquiries@thepicturesquare.com`).
- [ ] **WhatsApp Capability**: Confirm whether the primary phone number (`+91 99581 26122`) is enabled for direct WhatsApp messaging.
- [ ] **Weekly Opening Hours Schedule**: Google Maps currently shows only "Closes 9 pm". Supply the full 7-day schedule (e.g., Monday–Sunday 10:00–21:00) before emitting `openingHoursSpecification` in JSON-LD.

## 2. Social Media & Feeds
- [ ] **Instagram Integration**: Provide official Instagram handle / token if an automated live grid is desired, or confirm linking to a static profile URL.
- [ ] **Social Profiles**: Add verified links for YouTube, Vimeo, Pinterest, or LinkedIn if applicable.

## 3. Cinematography & Video Embeds
- [ ] **Film 01 ("The Palace Chronicle")**: Provide 4K YouTube / Vimeo video embed URL or direct stream link.
- [ ] **Film 02 ("Sacred Yamuna Rituals")**: Provide 4K video embed URL.
- [ ] **Film 03 ("Royal Lakeside Celebration")**: Provide 4K video embed URL.

## 4. Client Testimonials & Stories
- [ ] **Verified Reviews**: Supply real client reviews, quotes, couples' names, and event dates to expand the testimonial section.
- [ ] **Additional Case Studies**: Provide additional real wedding and pre-wedding galleries, metadata, and narratives to expand `/stories`.

## 5. Contact Form Backend
- [ ] **Form Submission Endpoint**: Connect the contact form to a transactional email service (e.g. Resend, SendGrid, Postmark) or CRM webhook for real-time notification on new wedding inquiries.

## 6. Photography & Asset Optimization
- [ ] **High-Resolution Photography**: Supply expanded high-resolution image assets for individual wedding sub-galleries to eliminate repeated photos across different pages.
- [ ] **Custom OpenGraph Image**: Provide a dedicated 1200x630 branded OG card image for social link sharing.

## 7. Music Collection & Audio Licensing [BLOCKING]
- [ ] **Original / Rights-Cleared Audio Tracks**: Supply studio-commissioned or web-licensed audio recordings (MP3/AAC master files, artists, durations, and download rights) before enabling the `/music` page and global persistent audio player.

## 8. FAQ Answers & Studio Policy Review [DRAFT - REQUIRES STUDIO OWNER REVIEW]
All 19 FAQ answers in `content/faq/faq.json` are drafted with `{{BRACKETED}}` placeholders and require final review and exact figure substitution by the studio owner:
- [ ] `coverage-areas-travel`: Verify coverage radius and travel logistics phrasing.
- [ ] `team-size-3day-wedding`: Fill `{{CREW_COUNT_TOTAL}}`, `{{LEAD_PHOTOGRAPHERS_COUNT}}`, `{{CANDID_STILLS_COUNT}}`, `{{CINEMATOGRAPHERS_COUNT}}`.
- [ ] `package-inclusions`: Confirm standard inclusions vs add-on services.
- [ ] `travel-accommodation-costs`: Verify client travel/hotel expense policy.
- [ ] `commission-capacity`: Confirm `{{ANNUAL_WEDDING_LIMIT}}` (maximum commissions accepted/year).
- [ ] `day-of-point-of-contact`: Confirm role of Studio Production Coordinator vs Lead Photographer.
- [ ] `venue-lighting-requirements`: Confirm `{{MINIMUM_CRI_RATING}}` and recommended color temperature specifications.
- [ ] `pre-wedding-shoot-session`: Confirm `{{PRE_WEDDING_HOURS}}` duration and `{{PRE_WEDDING_TIMELINE_MONTHS}}` scheduling window.
- [ ] `traditional-vs-candid`: Confirm family stage portrait allocation policy.
- [ ] `edited-images-count`: Fill `{{MIN_EDITED_IMAGES}}` and `{{MAX_EDITED_IMAGES}}` expectations per multi-day commission.
- [ ] `delivery-format-timeline`: Fill `{{PREVIEW_DELIVERY_DAYS}}`, `{{GALLERY_DELIVERY_WEEKS}}`, `{{FILM_DELIVERY_WEEKS}}`, `{{ALBUM_DELIVERY_WEEKS}}`.
- [ ] `raw-footage-selection`: Fill `{{RAW_ARCHIVE_STORAGE_TYPE}}` (e.g., external SSD drive or cloud cold storage) and RAW delivery policy.
- [ ] `photobook-album-production`: Fill `{{STANDARD_ALBUM_PAGES}}` and `{{ALBUM_REVISION_ROUNDS}}`.
- [ ] `same-day-edits-instacuts`: Fill `{{INSTACUT_TURNAROUND_HOURS}}`.
- [ ] `custom-music-scoring`: Confirm licensing workflow and custom composition offerings.
- [ ] `archive-storage-backup`: Fill `{{BACKUP_RETENTION_YEARS}}` and `{{CLOUD_GALLERY_ACTIVE_MONTHS}}`.
- [ ] `copyright-image-ownership`: Confirm personal print/reproduction license terms.
- [ ] `studio-portfolio-usage`: Confirm online portfolio and social publication discretion terms.
- [ ] `privacy-nondisclosure-agreements`: Fill `{{NDA_FEE_PERCENTAGE}}` for 100% private non-disclosure commissions.
