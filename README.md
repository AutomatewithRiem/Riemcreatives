# Riem Lumapay — Personal Portfolio

Personalized from `brewed-ops/portfolio-template` using the supplied October resume and portrait. This is a separate project from Lumina.

## Preview and build

```sh
cd /Users/yam/Desktop/riem-portfolio
npm install
npm run dev -- --host 127.0.0.1
```

Open http://127.0.0.1:5173/. `npm run build` typechecks and creates `dist/`. `npm run preview` serves the production build locally.

## Personal content

- Identity and contact: `src/data/profile.ts`
- Home previews: `src/components/HomeBento.tsx`, `src/components/HomeMobile.tsx`
- Projects, services, about and background: `src/components/ResumePages.tsx`
- FAQs: `src/data/faqs.ts`
- Personal styling: `src/styles/riem.css`
- Portrait and original downloadable resume: `public/riem-portrait.png`, `public/riem-lumapay-resume.pdf`

The portfolio uses only resume-supported experience and project claims. The template's testimonial route is labeled **Background** and presents experience and a professional reference. No unsupported certifications or customer quotes were added. The two SVG project images are labeled process summaries, not product screenshots.

The contact form prepares a mailto draft for the visitor to review and send. No submission backend is configured. The project-files link is the Google Drive URL embedded in the resume; its external availability was not checked. No social profiles were invented.

## Design and verification

The portfolio defaults to the portrait's black-and-violet branding. A canvas neural network replaces the contour background, with drifting nodes, softly pulsing glows and traveling connection signals. It pauses in hidden tabs and becomes static for reduced motion or low performance. The profile rail, bento home, phone navigation and theme/accessibility controls remain. The intro illustrates the dental project: inquiry intake → create/reuse opportunity → email follow-up → customer booking → reminder removal, tracker update and team notification. It runs locally as an illustration, with condensed timing, Skip/Escape and reduced-motion support. It performs no external actions. Animated homepage previews and hover/navigation transitions remain.

Browser checks covered 1440px desktop, 390px mobile and 320px mobile routes, light/dark switching, placeholder-free rendered pages and horizontal overflow. `npm run build` passes. Compatible dependency updates applied via `npm audit fix`; npm reported zero vulnerabilities afterward.

## Deploy with Cloudflare Pages

Cloudflare Pages is the recommended free host for this Vite single-page app. Connect the GitHub repository `https://github.com/brewed-ops/portfolio-template.git` and use these build settings:

| Setting | Value |
|---|---|
| Production branch | `main` |
| Framework preset | `Vite` |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Root directory | `/` |

To set it up, sign in to Cloudflare, open **Workers & Pages**, choose **Create application** → **Pages** → **Connect to Git**, authorize GitHub, select `brewed-ops/portfolio-template`, and enter the settings above. Cloudflare will build and publish the site when you confirm the first deployment. Later pushes to `main` will trigger deployments automatically.

Cloudflare Pages serves `index.html` for application routes such as `/about`, `/projects`, and `/contact` when the deployed site has no top-level `404.html`; React Router handles those routes in the browser. Do not add a top-level `404.html` unless you intend to change this fallback behavior. No deployment-specific redirect file or environment variables are required. The contact form opens a mailto draft and does not need a server.

The [Cloudflare Pages Free plan](https://www.cloudflare.com/plans/free/) is $0 for this static deployment and includes a `*.pages.dev` address, so a custom domain is optional. Buying a custom domain separately may cost money. Free-plan limits include 500 builds per month, one concurrent build, 20,000 files per site, and a 25 MiB maximum per file. See [Cloudflare Pages limits](https://developers.cloudflare.com/pages/platform/limits/) and [serving pages and SPA behavior](https://developers.cloudflare.com/pages/configuration/serving-pages/). Vercel Hobby is not recommended for a portfolio advertising freelance services: its current policy restricts Hobby to non-commercial personal use ([Vercel Hobby](https://vercel.com/docs/plans/hobby), [commercial usage](https://vercel.com/docs/limits/fair-use-guidelines#commercial-usage)).

The site has not been published. The current website changes are still local and uncommitted; review and push them to the GitHub repository before connecting it for deployment. Keep the original license below and in `LICENSE`.

---

## Original template documentation

# Portfolio Template

A personal portfolio with a fixed profile rail, an animated contour background, a bento home screen, a 3D page carousel, and a separate app-style layout for phones. Every piece of content is a placeholder. You swap in your own.

Stack: Vite 6, React 19, TypeScript, plain CSS custom properties, Three.js, GSAP, Lenis, React Router 7, Phosphor icons, Poppins.

## What it looks like

Straight from this repo, placeholders and all.

**Desktop** - the profile rail, the contour background and the bento home.

![Desktop: profile rail on the left, headline, tools marquee and a bento grid of project, about, credential, services and testimonial cards](docs/screenshots/desktop.png)

**Phone** - an app-style layout: a floating tab bar, a glance widget for your stats, app-icon tools and swipeable shelf cards. Light and dark.

<p>
  <img src="docs/screenshots/mobile-light.png" alt="Phone, light theme: profile header, one-line headline, stats widget, tools row and explore cards above a floating tab bar" width="300">
  &nbsp;&nbsp;
  <img src="docs/screenshots/mobile-dark.png" alt="Phone, dark theme: the same Home screen on a navy background" width="300">
</p>

## Run it

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # typecheck + production build to dist/
npm run lint       # ESLint with the TypeScript parser and the React hooks rules
```

## Make it yours

Every spot that needs your content says **PLACEHOLDER** and describes what goes there. You can edit the files yourself, or open the repo in an AI coding tool and tell it what to put in each spot.

| What | Where |
|---|---|
| Name, handle, photo, email, socials, Home headline, phone stats and their icons | `src/data/profile.ts` (start here) |
| Phone headline size (holds your headline on one line) | `--headline-em` in `src/styles/mobile-pass.css` - the comment there shows how to measure it |
| Your photo | `public/avatar.svg` (or point `avatarSrc` at a `.webp`/`.png`) |
| Page headlines and copy | the top of each page component: `ProjectsGrid`, `ServicesGrid`, `ShowcaseGrid`, `TestimonialsGrid`, `AboutGrid`, `ContactGrid` in `src/components/` |
| Funnel pages and websites (the 3D carousel) | `src/data/funnels.ts` + HTML files in `public/funnels/` and `public/samples/` |
| Projects, apps, side builds | `src/data/projects.ts`, `src/data/ai-stack.ts` |
| FAQs | `src/data/faqs.ts` |
| Tools marquee | `src/components/ToolsMarquee.tsx` (logos in `public/icons/`) |
| Testimonial videos | `public/testimonials/`, then set `src` in `TestimonialsGrid.tsx` |
| Contact form | `src/lib/contact.ts` (opens the visitor's email app by default; set `VITE_CONTACT_ENDPOINT` to post to your own backend) |
| SEO, share image, favicon | `index.html`, `public/favicon.svg` |
| Colors | `src/styles/tokens.css` |
| Privacy / Terms | `src/components/Privacy.tsx`, `src/components/ToS.tsx` |

### Adding your own funnels and websites

1. Put the page's HTML in `public/funnels/` (single pages, shown 16:9) or `public/samples/` (full websites, shown 3:4).
2. Add an entry to `src/data/funnels.ts`.
3. Run `node scripts/make-thumbs.mjs` to render the thumbnails. It uses the Playwright install that comes with the dev dependencies (run `npx playwright install chromium` once if needed).

To regenerate the placeholder pages: `node scripts/make-placeholder-sites.mjs`.

## Notes

- The background shader measures the visitor's frame rate and steps down on slow machines (`src/lib/perf.ts`). Keep any large `backdrop-filter` blur off the layers above it, because blur over an animated canvas is the most expensive thing on the page.
- From 1100px down, the site switches to the phone layout. `src/styles/mobile-app.css` owns its components (`TabBar`, `QuickMenu`, `HomeMobile`); `src/styles/mobile-pass.css` holds the motion (the tab pill, the bar hiding on scroll, page arrival, tile depth) and the native-feel fixes. Everything respects `prefers-reduced-motion` and the site's own Reduce motion switch.
- Anything new you add above the fold on Home must join the intro hold-back list in `src/styles/boot.css`. Otherwise it shows through the intro animation.

## Credits

- Contour background technique inspired by the landonorris.com site by OFF+BRAND. The simplex noise is Ashima Arts / Ian McEwan (MIT).
- Icons: [Phosphor](https://phosphoricons.com) (MIT). Tool logos in `public/icons/` are trademarks of their owners and are included as examples only.
- Font: Poppins (SIL Open Font License).

## License

[PolyForm Noncommercial 1.0.0](LICENSE), plus one extra permission: you can use it for **your own** portfolio, even if that portfolio promotes your paid services.

What it does not allow without a commercial license: selling or reselling this template, or building portfolio sites for other people for payment. For a commercial license, email brewedops@gmail.com.

Versions up to tag `v1.0.0-mit` (commit d3c05da) were MIT and stay MIT. Everything after that is under the license above.

### Project page-stack preview

The homepage Projects tile cycles through the dental and car rental process previews and all four PNG designs in the portfolio’s Google Drive Funnels folder. `ProjectPageStack.tsx` supplies the page drop-and-rise animation above an obsidian circuit chip on desktop and mobile; reduced motion shows a static stack. The Projects page includes four preview links to the original full-resolution PNGs. Download provenance is recorded in `public/projects/funnels/sources.json`. Smaller JPEG derivatives are used for display. Each sheet rotates, lands on the circuit surface, triggers a violet impact pulse, and yields to the next page. Circuit signals travel along the surface and nodes pulse softly. Motion direction was inspired by the UNUS Dribbble reference; no reference artwork is shipped.

The homepage Projects tile opens a zooming dialog with an 80-second horizontal 3D carousel over the violet neural background. Hovering a page or focusing it with the keyboard pauses rotation; leaving resumes it in place. A Pause/Resume control supports touch users. Clicking a page opens its full scrollable preview; Back returns to the carousel, and Close/Escape restores homepage focus. Reduced motion displays a static project grid.

The Projects route also includes a reflective three-page carousel, based on the supplied local video reference: a larger central preview, smaller side previews, violet edge lighting and floor reflections over the neural background. It advances every 4.2 seconds, pauses on page hover or keyboard focus, includes previous/next/dot/pause controls, and stops automatic advance for reduced motion. Every preview links to its matching project details.
