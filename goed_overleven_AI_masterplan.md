# **🔥 AI-FIRST MASTERPLAN: GOEDOVERLEVEN.NL (2026 EDITIE)**

## **🎯 DOEL: DOMINANTIE IN AI SEARCH**
**Doelstelling:** Binnen 12 maanden de absolute autoriteit worden op het gebied van "zelfredzaamheid" in Nederland, specifiek geoptimaliseerd voor AI Overviews (Google SGE, ChatGPT, Perplexity).

---

# **1️⃣ TECH STACK (ASTRO: DE NIEUWE STANDAARD)**
We stappen af van Hugo en kiezen voor **Astro**.
**Reden:** Astro levert standaard **Zero JavaScript** (HTML-only), wat cruciaal is voor razendsnelle indexatie door AI bots. Het staat wel interactieve "islands" toe (React/Svelte) voor de tools die we nodig hebben.

### **Core Stack**
*   **Framework:** `Astro 5+` (Server-side rendering voor dynamische routes, static voor content).
*   **Styling:** `Tailwind CSS 4` (Utility-first, minimale CSS bundel).
*   **Interactiviteit:** `React` of `Preact` (Alleen geactiveerd voor calculators/tools via `client:load`).
*   **Hosting:** `Cloudflare Pages` (Edge caching, extreem snel wereldwijd).
*   **CMS (Optioneel):** `Keystatic` of `Decap CMS` (Git-based, geen database nodig).

### **AI-Proof SEO Stack**
*   **@astrojs/sitemap:** Automatische sitemap generatie.
*   **@astrojs/partytown:** Third-party scripts (analytics) off-thread laden (Houdt main thread vrij voor performance).
*   **Schema-dts:** Type-safe JSON-LD structured data (CRUCIAAL voor AI begrip).

---

# **2️⃣ DESIGN & UX RICHTLIJNEN (MOBILE FIRST)**
AI "ziet" ook UX signalen (Bounce rate, CLS).

### **Header & Navigatie**
*   **Mobile View:**
    *   **Logo:** ALTIJD **gecentreerd** in de header.
    *   **Navigatie:** GEEN hamburger menu bovenin.
    *   **Bottom Bar:** Een vaste "App-like" navigatiebalk onderin het scherm (`position: fixed; bottom: 0;`).
        *   Icons: *Home, Kennisbank, Tools, Zoeken*.
*   **Desktop View:**
    *   Standaard header navigatie.

### **HTML Semantiek (STRIKT)**
Elke pagina MOET valide semantische HTML5 gebruiken. Dit helpt AI de structuur te begrijpen.
*   `<main>`: Unieke content.
*   `<nav>`: Alle navigatieblokken.
*   `<article>`: Blogposts/gidsen.
*   `<aside>`: Gerelateerde links/sidebar.
*   `<time datetime="2026-02-10">`: Datums expliciet maken.
*   `<figure>` & `<figcaption>`: Voor alle afbeeldingen.

---

# **3️⃣ CONTENT ARCHITECTUUR (AI-OPTIMALISATIE)**
We bouwen geen "blog", we bouwen een **Kennis Graph**.

### **URL Structuur**
Hou het plat en logisch.
*   `/` (Home)
*   `/gids/` (Content Hubs)
    *   `/gids/stroom/` (Cluster: Energie)
    *   `/gids/water/` (Cluster: Water)
*   `/tools/` (Calculators)

### **Content Clusters (De "Pillars")**
Consistent met het originele plan, maar nu technisch versterkt.

#### **🟢 PILLAR 1: ENERGIE & STROOM**
*   *Hoofdartikel:* `stroomuitval-nederland-gids`
*   *Tools:* Stroomverbruik Calculator (React component).

#### **🟢 PILLAR 2: WATER & ZUIVERING**
*   *Hoofdartikel:* `water-opslag-gids`
*   *Tools:* Waterbehoefte Calculator (o.b.v. gezinsgrootte).

#### **🟢 PILLAR 3: VOEDSEL & VOORRAAD**
*   *Hoofdartikel:* `noodvoorraad-samenstellen`
*   *Tools:* Voorraad Generator (Genereert boodschappenlijst).

---

# **4️⃣ DATA STRUCTURED (SCHEMA.ORG)**
Dit is de taal die AI spreekt. Elke pagina krijgt hardcoded JSON-LD.

**Minimale Vereisten per Pagina Type:**
1.  **Artikel:** `Article` props: `headline`, `image`, `author`, `datePublished`.
2.  **How-to:** `HowTo` props: `step` (met `text` en `image`).
3.  **FAQ:** `FAQPage` (Vraag & Antwoord paren).
4.  **Breadcrumbs:** `BreadcrumbList` (Navigatiepad).

*Astro Code Voorbeeld:*
```astro
---
import { Schema } from 'astro-seo-schema';
---
<Schema
  item={{
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Stroomuitval in Nederland: Wat te doen?",
    "author": {
      "@type": "Organization",
      "name": "GoedOverleven"
    }
  }}
/>
```

---

# **5️⃣ 12-MAANDEN ROADMAP (HERZIEN)**

### **Fase 1: Fundering & Tech (Maand 1)**
*   [ ] Astro project opzetten met Tailwind.
*   [ ] Component Library bouwen (Buttons, Cards, BottomNav).
*   [ ] Vaste Layouts maken (`BaseLayout.astro`, `ArticleLayout.astro`).
*   [ ] JSON-LD Component integreren.
*   [ ] Deployen naar Cloudflare Pages (Hello World).

### **Fase 2: Content "Seed" (Maand 2-3)**
*   [ ] 5 Pillar Pages schrijven (Extreem gedetailleerd > 2000 woorden).
*   [ ] 20 Supporting Articles (Long-tail keywords).
*   [ ] Eerste Tool bouwen: **Noodpakket Calculator**.

### **Fase 3: Autoriteit & Optimalisatie (Maand 4-6)**
*   [ ] Interne linking structuur optimaliseren (Silos).
*   [ ] User Testing (Mobiele navigatie test).
*   [ ] Backlink outreach (naar lokale overheden/verenigingen).

### **Fase 4: Schaling & Tools (Maand 7-12)**
*   [ ] Uitbreiden tools: Water, Energie backup.
*   [ ] Community building (Nieuwsbrief).
*   [ ] Monetisatie start (Affiliate/Digital Products).

---

# **6️⃣ CONCLUSIE**
Door te kiezen voor **Astro** + **Semantic HTML** + **Structured Data**, bouwen we een site die technisch superieur is aan 99% van de concurrentie (vaak WordPress). AI zal onze content prefereren omdat het:
1.  Sneller leest (HTML-only).
2.  Beter begrijpt (Schema.org).
3.  Logischer gestructureerd is (Clusters).

**Taal:** Alles in correct **Nederlands**.
**Platform:** Mobile-First (Bottom Nav).
