# 📖 Studio Owner Handover & Editorial Guide — The Picture Square

Welcome to your new website! This guide explains how to manage your stories, photos, films, planners directory, and FAQs without touching any code.

---

## 1. Accessing Your Studio CMS

1. Navigate to **`https://thepicturesquare.com/studio`** (or `http://localhost:3000/studio` in local testing).
2. Log in using your registered Google, GitHub, or Sanity account.
3. You will see the left sidebar listing your content types:
   - **Wedding Stories**
   - **Pre-Wedding Lookbooks**
   - **4K Cinema Films**
   - **Heirloom Photobooks**
   - **Planners & Partners**
   - **FAQ Commission Questions**
   - **Client Reviews / Testimonials**
   - **Studio Settings & Config**

---

## 2. Publishing a New Wedding Story

### Step-by-Step Instructions:
1. Click **Wedding Stories** &rarr; **Create New Document**.
2. **Title**: Enter the story title (e.g. *The Palace Chronicle* or *Shadows on Sandstone*).
3. **Couple**: Enter the couple names (e.g. *Ananya & Rohan*).
4. **Slug**: Click **Generate** (creates `ananya-rohan`).
5. **Location**: Enter venue and city (e.g. *Rambagh Palace, Jaipur, India*).
6. **Dates**: Select the event date and enter display date (*NOVEMBER 2026*).
7. **Excerpt**: Write a 2-sentence summary (approx 150 characters). This appears on Google search results and social media shares.
8. **Cover Image**: Upload a **4:5 vertical photograph** (see Section 5 below for guidelines). **Always fill in the Alt Text** (e.g. *"Bride adjusting her emerald necklace in the mirror, Jaipur"*).
9. **Banner Image**: Upload a high-resolution horizontal photograph for the 82vh header banner.
10. **Narrative Paragraphs**: Enter one or two story paragraphs describing the couple and atmosphere.
11. **Chapter Events (Drag-to-Reorder)**:
    - Click **Add Item** to create chapter events (e.g. *I. The Haldi*, *II. The Sangeet*, *III. The Royal Pheras*).
    - Inside each event, upload that event's curated photographs.
    - **Important**: Grab the drag handle icon next to any chapter event to change its order. **The order here immediately controls the left chapter navigation rail on the wedding page.**
12. **Vendor Credits**: Add planners, decorators, makeup artists, and outfit ateliers.
    - *Bonus*: Any vendor you add here **automatically appears** in the `/planners` recommended vendor directory!
13. Click **Publish** in the bottom right corner.
    - The website automatically rebuilds and refreshes the story page, `/stories`, and the `/planners` directory in under 2 seconds.

---

## 3. What Makes a Good Cover Photograph?

Your cover photograph is the first visual a prospective bride sees when browsing your collection:

| Attribute | Recommended Practice | What to Avoid |
| :--- | :--- | :--- |
| **Aspect Ratio** | **4:5 Vertical** (e.g. 2400 × 3000px). | Wide horizontal cuts or square crops that get clipped. |
| **Framing** | Couple framed in the centre or upper two-thirds with breathing room. | Faces pressed against the extreme top edge. |
| **Lighting** | Warm natural golden hour, dramatic architectural rim light, or quiet candlelit ambiance. | Direct harsh midday sun with clipped highlights. |
| **Mood** | Quiet emotional connection, timeless candid poise, or regal stillness. | Awkward over-posed novelty party poses. |

---

## 4. Adding 4K Cinema Films & Instacuts

1. Click **4K Cinema Films** &rarr; **Create New Document**.
2. **Category**: Select **Instacuts** (Vertical 9:16 under 60s), **Trailers** (3–5 min widescreen), or **Compilations / Showreels**.
3. **Provider & Video ID**:
   - For YouTube: Enter the 11-character video ID (e.g. `dQw4w9WgXcQ` from `youtube.com/watch?v=dQw4w9WgXcQ`).
   - For Vimeo: Enter the numeric video ID (e.g. `76979871`).
4. **Poster Frame**: Upload a sharp, high-res still from the film. The website serves this poster first and only loads the video iframe when the couple clicks play, ensuring ultra-fast load times.
5. **Linked Story**: (Optional) Enter the slug of the matching wedding story (e.g. `ananya-rohan`) to display a *"View Full Story"* link on the video card.
6. Click **Publish**.

---

## 5. Editing FAQ Commission Answers

1. Click **FAQ Commission Questions** in Sanity Studio.
2. Click the question you want to update (or create a new one).
3. Update the answer text with your confirmed pricing packages, crew size, or deliverables turnaround.
4. Click **Publish**. The `/faq` page updates immediately.

---

## 6. Managing Vendor Partners (`/planners`)

The `/planners` page stays current automatically because it extracts vendor credits from every published wedding story.

- **To add a vendor**: Simply credit them in any wedding story or pre-wedding lookbook.
- **To customize or exclude**: Edit `/content/planners/planners.json` to add direct website URLs, verified logos, or exclude specific entries.

---

## 7. Google Business Profile & Local SEO Alignment

To maximize your local Google Maps and organic rankings in Mathura, Vrindavan, and Agra, ensure your Google Business Profile (GBP) exactly matches your website data character for character:

- **Business Name**: `The Picture Square`
- **Legal Name**: `The Picture Square`
- **Primary Category**: `Wedding photographer`
- **Studio Address**: `Shop No. 229, Shri Square Complex, in front of Shri Radha Puram, Mathura, Uttar Pradesh 281001, India`
- **Street Address**: `Shop No. 229, Shri Square Complex, in front of Shri Radha Puram`
- **Locality**: `Mathura`
- **Region**: `Uttar Pradesh`
- **Postal Code**: `281001`
- **Country**: `IN`
- **Phone (Display)**: `+91 99581 26122`
- **Phone (E.164)**: `+919958126122`
- **Google Maps CID**: `0xf63f101f60651b9`
- **Google Place ID**: `ChIJyVpA8B88DTkRuVFGYAEPYw8`
- **Google Maps URL**: `https://maps.google.com/?cid=0xf63f101f60651b9`
- **Website Link**: `https://thepicturesquare.com`
- **Service Areas**: Mathura, Vrindavan, Agra, Delhi NCR, Jaipur, Udaipur
- **Pending Verification**: Studio email address, WhatsApp capability on primary line, and complete weekly opening hours schedule (Google currently lists only "Closes 9 pm").
