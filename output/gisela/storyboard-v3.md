# Gisela: Storyboard V3

Created: 2026-10-07.
Visual: gisela-storyboard-v3.png.
Method: built-in image generator, localized edit of V2.

Corrects the extra planted foreleg in the greeting row, Geste 2.
Both waving keyframes now show one raised hoof and three grounded hooves.
The idle and thinking gestures remain unchanged. Timing and production guidance from storyboard-v2.md still apply, but use the V3 visual rather than the defective V2 image.
This is a static movement reference, not a production animation.

## Generation Prompt

Use case: precise-object-edit. Edit the supplied Gisela storyboard image with ONE localized correction only. The fault is in row 2 'Begrüßen', column 3 'Geste 2': that waving giraffe currently has FIVE hooves, one raised and four on the ground. Remove the redundant LEFTMOST PLANTED FRONT LEG AND ITS GROUND HOOF from this character. On the 1536x1024 reference this unwanted leg runs approximately from x946,y537 down to its hoof at x950,y651. Erase that entire planted foreleg from chest to ground and restore the white background and smooth natural chest edge where needed. Keep the raised waving foreleg with its hoof beside the face at approximately x1015,y478. Keep the OTHER THREE planted legs and their three ground hooves around x995,y650, x1020,y643, x1054,y649 unchanged. The corrected figure must have EXACTLY FOUR TOTAL LIMBS AND FOUR HOOVES: ONE waving front leg plus ONE planted front leg plus TWO planted hind legs, so exactly THREE hooves on the ground. Do not add limbs, do not add human hands, do not replace the tail with a leg. The lifted foreleg REPLACES the erased standing foreleg; it is not an extra arm. Preserve absolutely everything else in the image: all other eleven giraffe keyframes, including the already-correct greeting column 2 with three grounded hooves, the two-hooves-under-chin thinking poses, typography, labels, white background, grid layout, colors, glasses, spots, face, proportions and style. No whole-sheet redesign. No changes to any other panel, no extra text, no watermark. Carefully verify the corrected row2/column3 character has one raised hoof and three ground hooves.

