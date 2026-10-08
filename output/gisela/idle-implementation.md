# Gisela: Idle Animation

Implemented on 2026-10-07.

## Files

- public/img/gisela/gisela-idle-v1.png: approved figure prepared as a transparent 1024 x 1536 PNG with the name caption removed.
- public/img/gisela/gisela-body-v1.png: transparent fixed body layer with three standing legs and no tail, aligned to the original 1024 x 1536 canvas.
- src/components/gisela/Gisela.tsx: shared figure with aligned SVG eyelids, one original foreleg split into overlapping upper/lower clips and one clipped original tail. The lower leg is nested inside the shoulder group so both joints remain attached. The moving layers sit behind the fixed body to hide their attachment points.
- src/components/gisela/Gisela.module.css: approximately 360 ms blink once per five-second cycle. The first blink starts 0.8 seconds after the images load. Tail swishing repeats every 3.2 seconds; the shoulder lifts by 55 degrees while the lower leg bends by 110 to 128 degrees for two small waves. Greeting begins immediately, lasts 4.2 seconds and repeats every 30 seconds.
- WelcomePopover and Start: use the shared component.
- tests/gisela.test.cjs: accessible markup, static mode and separate SVG mask IDs.

There is no start/stop control. All three CSS animations repeat indefinitely while visible.
Reduced-motion preferences disable all animations and restore the original complete standstill image.
Until both images load, the original complete figure remains visible as a fallback.
Hidden Ionic pages pause the CSS animations. No JavaScript timer, animation library or new dependency is required.
The masks are aligned to these specific images; replacing or reframing a PNG requires checking their coordinates.
The foreleg uses two jointed original-image cutouts rather than rotating the entire limb as a rigid pointer. A thinking gesture is not implemented yet.
- WelcomePopover: Gisela introduces herself and asks for a name and schoolform; the chosen schoolform controls the available subjects. A schoolform with one subject selects it automatically. No new student's course is silently preselected.
- src/data/schoolforms.ts: shared schoolform/subject mapping used by onboarding and Profile, retaining the existing course IDs in the persisted currentExam field.
For better visibility the full-body figure is 112 pixels wide in the welcome popover and 96 pixels wide on the start page.

## Visual Verification

The current browser check verified the actual welcome popover, the lifted hoof, blinking at measured intervals of 5000 and 5002 ms, independent tail movement and no browser error logs.
Screenshots are saved under tmp/gisela-qa/rig-wave.png and rig-blink.png.
The refined jointed wave and new greeting are captured in tmp/gisela-qa/refined-wave.png.
The 320 x 568 mobile viewport was checked with both schoolform and subject fields visible, without horizontal overflow. Browser tests checked subject reset on a schoolform change, disabled submission until a matching subject is selected, and automatic selection for single-subject schoolforms. Only unsaved test drafts were used; no profile was submitted.
The earlier tmp/gisela-check.cjs script tested the old blink-only implementation and its removed pause button; it is not a current rig test.
The node tests cover fixed-size accessible markup, no controls, separate masks across instances, PNG dimensions and alpha, animation periods and the reduced-motion rule.
The temporary preview uses port 3001 and tmp/gisela-next as an isolated build directory, leaving the existing port-3000 server and its .next cache untouched.

## Image Preparation

Method: built-in image generator, followed by copying the output into public/img/gisela.
Reference: output/gisela/gisela-ganzfigur-v1.png.

Prompt:

Use case: background-extraction. Edit target: the approved Gisela full-body image supplied. Prepare a production-ready transparent PNG cutout for an animated learning companion in the app. Change ONLY these two things: remove the white background to genuine alpha transparency, and completely remove the 'Gisela' caption below the feet. Preserve the entire approved giraffe EXACTLY: full-body standing pose, four limbs and four hooves, all proportions and framing, head tilt, open eyes and their exact positioning, thin round teal glasses, expression, ears, ossicones, golden colors, patches, mane, outlines and tail. Do not redraw, reposition, rescale within the canvas, alter pose, change eye shape, add limbs, add shadows, add scenery, or add text. Keep the original 1024x1536 portrait canvas and the original character placement so a separately animated eye layer can align accurately. Preserve the white sclera inside the eyes; only the background and caption become transparent. Clean antialiased silhouette, genuinely transparent background, no checkerboard baked into pixels.

## Fixed Body Preparation

Method: built-in image generator, referenced to public/img/gisela/gisela-idle-v1.png. The moving tail and foreleg remain clipped copies of the original image, not new generated appendages.

Prompt:

Use case: precise-object-edit. Edit target: the supplied transparent Gisela PNG. Create the FIXED BODY LAYER for a 2D animation rig. This is an intentionally incomplete animation layer, not a whole new giraffe. Remove ONLY (1) the tail, including the long thin tail and brown tuft on the right, and (2) the LEFTMOST FRONT LEG AND HOOF, which runs down the left silhouette from the shoulder/chest around x365,y875 to the leftmost hoof around x325,y1390. Keep the other THREE existing standing legs and their hooves precisely unchanged: middle-front hoof near x530,y1405, small rear hoof near x620,y1360, right rear hoof near x790,y1390. The missing front leg will be supplied as a moving layer later; do NOT replace it with a newly generated leg. Reconstruct only the small torso/shoulder area formerly covered by the removed foreleg, matching original golden fur and spots, with a smooth shoulder edge and no dangling stub. Remove the tail entirely, reconstruct a clean rump outline without tail; tail will be provided separately. The rest of the image must be PIXEL-ALIGNED to the reference: preserve exact head, face, eyes, glasses, mane, neck, all patches, body size and positioning. Keep the SAME 1024x1536 canvas, do not crop, scale, center or reposition anything. All removed regions become genuinely transparent alpha, not black, white, checkerboard or a shadow. No labels, no new objects or limbs. Result must show THREE planted hooves and no tail, because this is the base layer to which ONE original foreleg and ONE tail will be added by animation code.

