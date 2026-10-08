# Gisela: Animation Storyboard V2

Visual: gisela-storyboard-v2.png
Created: 2026-10-07
Method: built-in image generator, editing storyboard V1 with the approved full-body design as an identity reference.
V1 is retained for comparison. This version supersedes its greeting and thinking gestures.

This is a movement concept, not a finished animation or production sprite atlas.
Generated keyframes can differ in anatomy, proportions and orientation. Production should use a consistent layered character, fixed markings, four limbs and a stable ground baseline; do not directly cycle the generated frames.
No app behavior or code has been changed.

## Idle

- Keep the existing neutral pose and occasional brief blink.
- No continuous bouncing or repetitive large gestures.

## Greeting: Hoof Wave

- Start from the neutral standing pose.
- Lift one existing front hoof beside the face, keeping three supporting legs planted.
- Wave the same hoof gently from side to side twice; raising it alone is not the greeting.
- Lower it smoothly and return to idle.
- Suggested duration: approximately 3 seconds, played once on welcome.
- 0.0-0.6 seconds: raise the hoof.
- 0.6-2.2 seconds: two small side-to-side waving cycles.
- 2.2-3.0 seconds: lower the hoof.
- The hoof remains a hoof, without fingers or extra arms.

## Thinking: Both Hooves at Chin

- Gently shift support to the two existing hind legs.
- Bring both existing front hooves under the chin, with a slight neck curve as needed.
- Hold both hooves at the chin, slightly tilt the head and glance upward.
- Keep the face relaxed and attentive, not worried.
- Do not alternate between mirrored orientations or change patch placement.
- Enter the pose in approximately 0.8-1.0 seconds; while a response is pending, hold with only subtle eye or head movement.
- On success, failure or cancellation, lower the hooves and return smoothly to idle in approximately 0.8 seconds.
- Always exactly four limbs; no additional arms attached to the neck.

## Accessibility and Layout

- With reduced motion enabled, use a static pose.
- Keep all gestures inside stable layout bounds.
- Treat the illustration as decorative; communicate pending responses separately in accessible text.

## Generation Prompt

Use case: identity-preserve. Edit target: image 1, the existing Gisela three-row storyboard. Image 2: strict approved character reference, not an edit target. Revise the storyboard to illustrate the user's two requested changes clearly. Preserve the white background, neat charcoal typography, clean brown outlined 2D cel-shaded style, approved golden giraffe, caramel patches, thin round teal glasses, neutral friendly face, ears, ossicones, mane, long neck, tail, and four hooved limbs. No fingers or human hands. Expand the sheet to THREE ROWS and FOUR COLUMNS so the waving action is visible in two distinct keyframes rather than a static raised hoof. Title 'Gisela · Bewegungsstudie'. Column labels exactly 'Start', 'Geste 1', 'Geste 2', 'Zurück'. Row labels exactly 'Ruhig', 'Begrüßen', 'Nachdenken'. Thin gray horizontal separators, generous clear spacing, consistent character scale, every full body completely in its own cell with no overlap, fixed ground baselines. ROW 1 Ruhig remains unchanged in intent: neutral eyes open, brief blink closed, eyes open, neutral eyes open again. ROW 2 Begrüßen: neutral pose; raise ONE existing front hoof up beside the lower face and angle the hoof outward to wave; next keyframe the SAME raised hoof swings inward visibly, a small friendly side-to-side hoof wave, not merely lifting a leg or taking a step; finally lower it and return to neutral. Other three legs support her, keep hoof anatomically a hoof and attached to its original front limb, no added arms. ROW 3 Nachdenken: neutral pose; BOTH existing FRONT HOOVES gently touch/support the underside of the chin side by side in a thoughtful gesture; next keyframe keep BOTH hooves touching the chin while head tilts slightly and eyes look upward thoughtfully; finally lower both and return to original neutral pose. To make the two-hooves-at-chin pose coherent, rear up slightly onto the TWO EXISTING HIND LEGS and gently curve/lower the long neck toward the raised front hooves. Those two front limbs originate at the torso, bend naturally in a stylized cartoon manner, and are NOT simultaneously shown as planted front legs. Exactly four limbs total, never extra arms emerging from neck, no six-legged giraffe. Both brown front hooves visibly meet her chin, do not put them only on chest or cheeks. Keep friendly confident thoughtful expression, not anxious or sad. Same approved mascot in all twelve frames, consistent markings and proportions except pose, no new clothes or accessories, no extra text, scenery, props, speech bubbles or watermark. This is a visual storyboard concept, not an animated file.

