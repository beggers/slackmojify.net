// Our overlay images (laser eye effects, emojis, etc) are all pngs with transparent
// backgrounds. For the laser eye effects, we want the image controls (the box
// that lets you resize and rotate the image) to be smaller than the images themselves,
// since the images often contain small lens flare effects which go hella wide.
// This function gives the padding values to use for the FabricJS image controls.
// They are selected entirely on vibes.
export default function get_overlay_padding(image_name: string): number {
    switch (image_name) {
        case 'blue-flare.png':
            return -130;
        case 'white-flare.png':
            return -70;
        default:
            return 0;
    }
}