<wizard-report>
# PostHog post-wizard report

The wizard has completed a deep integration of PostHog analytics into the Sui marketing site. PostHog is initialized via `instrumentation-client.ts` (the recommended approach for Next.js 15.3+), with a reverse proxy configured in `next.config.ts` to route events through `/ingest`. Seven product events were instrumented across both landing pages, tracking the full conversion funnel from page view to CTA click, plus video engagement and FAQ interactions.

| Event | Description | File |
|---|---|---|
| `main_landing_viewed` | User viewed the main "Conecta con Dios" landing page — top of conversion funnel | `src/app/page.tsx` |
| `cta_clicked` | User clicked a "Estoy lista" CTA button on the main landing (with `location` property: hero, solution, bonuses_top, bonuses_bottom) | `src/app/page.tsx` |
| `hero_video_played` | User played the hero video on the main landing page | `src/app/page.tsx` |
| `oracion_landing_viewed` | User viewed the Oracion landing page — top of conversion funnel | `src/app/landing/oracion/page.tsx` |
| `oracion_cta_clicked` | User clicked the CTA on the Oracion landing page (navigates to Skool community), with `location` property: hero, included_items, final_cta | `src/app/landing/oracion/page.tsx` |
| `oracion_hero_video_played` | User played the hero video on the Oracion landing page | `src/app/landing/oracion/OracionHeroVideo.tsx` |
| `faq_item_opened` | User expanded a FAQ accordion item (with `question` property) | `src/app/landing/oracion/OracionFaq.tsx` |

## Next steps

We've built some insights and a dashboard for you to keep an eye on user behavior, based on the events we just instrumented:

- **Dashboard**: [Analytics basics](https://us.posthog.com/project/149864/dashboard/1347186)
- **Oracion Landing Conversion Funnel**: [https://us.posthog.com/project/149864/insights/OOasNZyh](https://us.posthog.com/project/149864/insights/OOasNZyh)
- **CTA Clicks by Landing Page**: [https://us.posthog.com/project/149864/insights/NiJcuEtp](https://us.posthog.com/project/149864/insights/NiJcuEtp)
- **Daily Unique Visitors by Landing Page**: [https://us.posthog.com/project/149864/insights/QcijhwGK](https://us.posthog.com/project/149864/insights/QcijhwGK)
- **Engagement: Video Plays & FAQ Interactions**: [https://us.posthog.com/project/149864/insights/0BJNLAAJ](https://us.posthog.com/project/149864/insights/0BJNLAAJ)

### Agent skill

We've left an agent skill folder in your project. You can use this context for further agent development when using Claude Code. This will help ensure the model provides the most up-to-date approaches for integrating PostHog.

</wizard-report>
