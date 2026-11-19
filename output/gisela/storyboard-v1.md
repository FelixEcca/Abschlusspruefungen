# Gisela: Animation Storyboard

Visual: gisela-storyboard-v1.png
Created: 2026-10-07
Method: built-in image generator using the approved full-body illustration.

This sheet illustrates movement intent. It is not an animation or a production sprite atlas.
Generated frames can differ slightly in proportions and markings. Production animation should use one consistent layered character rather than directly cycling these images.
No app code or interaction behavior was changed.

## Proposed Motions

### Idle

- Maintain the neutral standing pose, without bouncing.
- Blink in approximately 160-220 milliseconds.
- Pause for approximately 6-10 seconds between blinks, with slight variation.
- Keep the glasses fixed to the head and the feet planted.

### Greeting

- Play once when the welcome popover becomes visible.
- 0.0-0.4 seconds: settle gently into view.
- 0.4-1.1 seconds: slightly tilt the head and raise one front hoof.
- 1.1-1.5 seconds: briefly hold the greeting.
- 1.5-2.3 seconds: lower the hoof and return to the neutral pose.
- Continue in idle; do not repeat the greeting continuously.

### Thinking

- Use only while a chat response is actually pending.
- Gently tilt the head and glance upward over approximately 0.8 seconds.
- Hold briefly, then return smoothly; approximately 3 seconds per cycle.
- End on success, error, or cancellation, returning to idle.
- Do not imply that the response is verified merely because the thinking motion ends.

## Production Constraints

- Preserve the approved glasses, face, proportions, colors and patch placement.
- Prepare transparent layers without the name caption.
- Keep animation within fixed layout bounds, with no movement of surrounding content.
- Honor reduced-motion preferences with a static pose.
- Keep animations decorative, separate from accessible status messages.

## Generation Prompt

Use case: identity-preserve. Asset type: a visual animation storyboard, ONE finished comparison sheet, not an animated file and not a production sprite atlas. Input image: the approved Gisela giraffe mascot, strict character identity and style reference. Create a clean professional landscape storyboard with EXACTLY three rows and three columns of animation keyframes, nine depictions total. White background, thin light-gray horizontal separators, generous spacing, no heavy cards or decorative frames. Title at top: 'Gisela · Bewegungsstudie'. Three column headings: 'Start', 'Bewegung', 'Zurück'. Each row has its own clear left-side label: first 'Ruhig', second 'Begrüßen', third 'Nachdenken'. Use compact legible charcoal German sans-serif typography, no explanatory paragraphs. All nine characters are the SAME approved giraffe: warm golden-yellow coat, caramel patches, dark brown clean outlines and mane, same thin round teal glasses, long neck, ears and two ossicones, four legs with hooves, same body proportions, tail, small friendly closed-mouth smile, gender-neutral approachable expression. Preserve recognizable patch arrangement and style between frames; do not change into a baby, human, different species, new accessory or a different design. Consistent scale and fixed ground baseline across all cells. Full body visible in every keyframe, head and feet not clipped. Match reference three-quarter orientation. Movements are SMALL, calm and suitable for teenagers/adults, not exaggerated slapstick. ROW 1 Ruhig: first reference neutral pose eyes open; middle same pose with both eyes gently closed for a blink, glasses unchanged; third exact original eyes open pose again. No body bouncing. ROW 2 Begrüßen: first original standing pose; middle gently lift and bend ONE existing front leg in a modest greeting, tiny welcoming head tilt; third original standing pose again. Hoof remains a hoof, no fingers, no extra limb, other three legs planted. ROW 3 Nachdenken: first original standing pose; middle slight thoughtful head tilt in opposite direction and eyes glance a little upward, relaxed thoughtful brow, all legs remain planted; third original standing pose and gaze again. Do not depict sadness, anxiety, frustration or helplessness. Each row must visibly return to the identical neutral starting pose in column 3 so an animator can understand smooth return to idle. No motion blur, no ghost limbs, no speech bubbles, no new scene or props, no watermark. Neat polished storyboard for reviewing animation intent, highest available detail and sharpness.

