// All images live in public/images/ and are referenced relatively so the
// site works from any GitHub Pages path. To use your own photos, drop a
// file with the same name (e.g. kagami-ike.jpg) into public/images/ and
// update the `image` field here.

const img = (name) => `${import.meta.env.BASE_URL}images/${name}`

// Real photographs hotlinked from Wikimedia Commons via the stable
// Special:FilePath redirector. If a photo ever fails to load, the site
// automatically falls back to the local illustration in public/images/.
const commons = (file, width = 1400) => ({
  photo: `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(file)}?width=${width}`,
  credit: `https://commons.wikimedia.org/wiki/File:${encodeURIComponent(file.replaceAll(' ', '_'))}`,
})

const gmap = (q) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`

export const trip = {
  title: 'Nagano Trip with Jie Ge',
  subtitle: 'A three-day photography road trip through the Japanese Alps',
  dates: 'August 21 – 23, 2026',
  gear: [
    { label: 'Camera', value: 'Sony A7V' },
    { label: 'Lens', value: 'Sigma 24-70mm f/2.8 DG DN' },
    {
      label: 'Wheels',
      value: 'Nissan Note e-POWER',
      url: 'https://www3.nissan.co.jp/vehicles/new/note.html',
    },
  ],
}

export const stats = [
  { value: '≈580 km', label: 'in the Nissan Note' },
  { value: '40 → 2,307 m', label: 'elevation range' },
  { value: '5', label: 'Togakushi shrines' },
  { value: '11', label: 'photo locations' },
  { value: '2', label: 'onsen nights' },
]

// Approximate coordinates power the route map, sun/moon times and weather.
export const days = [
  {
    id: 'day-1',
    number: 1,
    date: 'Thursday, Aug 21',
    isoDate: '2026-08-21',
    title: 'The Scenic Route',
    theme: 'Tokyo → Karuizawa → Nagano, chasing light along the way',
    color: '#f0b464',
    weatherPoint: { lat: 36.35, lon: 138.63, label: 'Karuizawa' },
    sunPoint: { lat: 36.35, lon: 138.63 },
    planB:
      'Rain plan: Shiraito Falls still works in drizzle (soft light, bring a lens cloth) — swap Kumoba reflections for Karuizawa Old Town arcades and Hoshino Harunire Terrace, then catch Matsushiro under moody skies.',
    stops: [
      {
        type: 'travel',
        icon: '🚗',
        time: 'Morning · 07:30',
        start: '2026-08-21T07:30:00+09:00',
        name: 'Depart from Ookayama Station, Tokyo',
        map: gmap('Ookayama Station, Meguro City, Tokyo'),
        coords: [35.607, 139.6857],
        description:
          'Load up the Nissan Note and hit the road. Driving gives us full freedom to stop whenever the light looks good.',
      },
      {
        type: 'photo',
        icon: '📷',
        time: 'Stop 1 · 10:00',
        start: '2026-08-21T10:00:00+09:00',
        name: 'Megane Bridge',
        subname: 'Shin-etsu Main Line No. 3 Bridge',
        map: gmap('Megane Bridge Usui No.3 Bridge, Matsuida, Annaka, Gunma'),
        coords: [36.3417, 138.728],
        leg: { mode: 'drive', label: '≈2 h 15 min · 150 km' },
        image: img('megane-bridge.svg'),
        ...commons('Usui no.3 bridge.JPG'),
        description:
          'Great for architectural shots of the red brick arches. The four-story “Spectacles Bridge” is the largest brick bridge in Japan.',
        tips: 'Shoot from the riverbed below at 24mm to exaggerate the arches, or compress the repeating spans from a distance at 70mm.',
        shots: [
          '24mm from below — arches towering, sky as negative space',
          '70mm compression of the repeating spans from the trail',
          'Detail: brickwork texture in side light, 50mm',
        ],
      },
      {
        type: 'photo',
        icon: '📷',
        time: 'Stop 2 · 11:30',
        start: '2026-08-21T11:30:00+09:00',
        name: 'Kumoba Pond',
        subname: 'Karuizawa',
        map: gmap('Kumoba Pond, Karuizawa, Nagano'),
        coords: [36.3535, 138.6295],
        leg: { mode: 'drive', label: '≈30 min · 17 km' },
        image: img('kumoba-pond.svg'),
        ...commons('160729 Kumoba-ike Karuizawa Japan01s3.jpg'),
        description:
          'Practice mirror-like reflections of the trees in the water. A calm, wind-sheltered pond nicknamed “Swan Lake.”',
        tips: 'Arrive when the air is still. A polarizer lets you dial reflection intensity; try symmetry compositions with the horizon dead-center.',
        shots: [
          'Dead-center horizon symmetry, 24mm',
          'Polarizer on/off comparison of the same reflection',
          'Lone tree + reflection isolated at 70mm',
        ],
      },
      {
        type: 'photo',
        icon: '📷',
        time: 'Stop 3 · 13:00',
        start: '2026-08-21T13:00:00+09:00',
        name: 'Shiraito Waterfall',
        subname: 'Shiraito-no-taki, Karuizawa',
        map: gmap('Shiraito Falls, Nagakura, Karuizawa, Nagano'),
        coords: [36.4222, 138.5847],
        leg: { mode: 'drive', label: '≈25 min · 10 km' },
        image: img('shiraito-falls.svg'),
        ...commons('Shiraito Falls Karuizawa.jpg'),
        description:
          'Use slow shutter speeds for silky water effects on the 70-meter curved rock face, where hundreds of fine threads of spring water seep straight out of the rock.',
        tips: 'Bring the tripod and an ND filter: 0.5–2s exposures turn the threads to silk. The shaded gorge is naturally soft-lit all day.',
        shots: [
          'Full curved face at 24mm, 1–2 s exposure',
          'Thread detail at 70mm, 0.5 s',
          'Foreground stream leading line into the falls',
        ],
      },
      {
        type: 'photo',
        icon: '📷',
        time: 'Stop 4 · Golden hour · 16:30',
        start: '2026-08-21T16:30:00+09:00',
        name: 'Matsushiro Castle Ruins',
        subname: 'Nagano City',
        map: gmap('Matsushiro Castle Ruins, Nagano'),
        coords: [36.5672, 138.1959],
        leg: { mode: 'drive', label: '≈1 h 20 min · 85 km' },
        image: img('matsushiro-castle.svg'),
        ...commons('Matsushiro castle 2.jpg'),
        description:
          'Golden hour photography of the stone walls and gates. Low warm light rakes across the restored stonework and wooden gates of the old Sanada stronghold.',
        tips: 'Side-light the stone walls at 24–35mm to bring out texture; frame the gate through the cherry trees for depth.',
        shots: [
          'Raking golden light across the stone wall, 35mm',
          'Gate framed through trees, 50mm',
          'Silhouette of the gate against the sunset sky',
        ],
      },
      {
        type: 'hotel',
        icon: '🏨',
        time: 'Evening · 18:30',
        start: '2026-08-21T18:30:00+09:00',
        name: 'Mercure Nagano Matsushiro Resort & Spa',
        subname: 'Check-in · Basecamp for two nights',
        map: gmap('Mercure Nagano Matsushiro Resort & Spa'),
        coords: [36.557, 138.2],
        leg: { mode: 'drive', label: '≈5 min · 2 km' },
        image: img('mercure-hotel.svg'),
        description:
          'Our basecamp with hot springs and private parking. Soak in the onsen, charge every battery, and format cards for tomorrow.',
      },
    ],
  },
  {
    id: 'day-2',
    number: 2,
    date: 'Friday, Aug 22',
    isoDate: '2026-08-22',
    title: 'Deep Forests & Dark Skies',
    theme: 'The five shrines of Togakushi by day, the Milky Way by night',
    color: '#a490c2',
    weatherPoint: { lat: 36.74, lon: 138.08, label: 'Togakushi' },
    sunPoint: { lat: 36.74, lon: 138.08 },
    moonPoint: { lat: 36.7391, lon: 138.0672 }, // Kagami-ike
    planB:
      'Clouded-out night: soak in the onsen and reshoot Zuishinmon in evening mist instead (fog is atmosphere, not failure). Backup dark-sky window: pre-dawn Aug 23 at Kagami-ike before breakfast.',
    stops: [
      {
        type: 'photo',
        icon: '⛩️',
        time: 'Stop 1 · 09:00',
        start: '2026-08-22T09:00:00+09:00',
        name: 'Togakushi-Jinja Chusha',
        subname: 'Middle Shrine',
        map: gmap('Togakushi Shrine Chusha, Nagano'),
        coords: [36.7256, 138.0793],
        leg: { mode: 'drive', label: '≈55 min · 33 km' },
        image: img('togakushi-chusha.svg'),
        ...commons('160430 Togakushi-jinja Chusha Nagano Japan04s3.jpg'),
        description:
          'Ancient shrines surrounded by cedar trees, including a sacred 800-year-old triple cedar at the gate.',
        tips: 'Morning mist between the cedars makes god-rays — expose for the highlights and let the shadows fall deep.',
        shots: [
          'Triple cedar + shrine gate, 24mm vertical',
          'God-rays through morning mist, underexposed 1 stop',
        ],
      },
      {
        type: 'photo',
        icon: '⛩️',
        time: 'Stop 2 · 10:30',
        start: '2026-08-22T10:30:00+09:00',
        name: 'Togakushi Shrine Okusha — The Great Torii Gate',
        subname: 'Entrance to the Main Shrine path',
        map: gmap('Togakushi Shrine Okusha Entrance, Togakushi, Nagano'),
        coords: [36.7433, 138.0851],
        leg: { mode: 'drive', label: '≈5 min · 3 km' },
        image: img('okusha-torii.svg'),
        ...commons('160430 Togakushi-jinja Chusha Nagano Japan02n.jpg'),
        description:
          'Massive gate perfect for wide 24mm framing — the gateway to the 2 km approach to the upper shrine.',
        tips: 'Get low and center the gate at 24mm so the trail vanishes through it. Wait for a walker to pass through for scale.',
        shots: [
          'Low + centered 24mm, trail vanishing through the gate',
          'Walker passing through for scale, 35mm',
        ],
      },
      {
        type: 'photo',
        icon: '⛩️',
        time: 'Stop 3 · 11:00',
        start: '2026-08-22T11:00:00+09:00',
        name: 'Togakushi Shrine Okusha — Zuishinmon',
        subname: 'The red thatched gate & cedar avenue',
        map: gmap('Zuishinmon Gate, Togakushi, Nagano'),
        coords: [36.7508, 138.0806],
        leg: { mode: 'walk', label: '≈20 min walk · 1 km' },
        image: img('okusha-zuishinmon.svg'),
        ...commons('Togakushi Shrine in winter (49819864367).jpg'),
        description:
          'Dramatic leading lines created by 400-year-old cedars flanking the path beyond the vermilion, moss-thatched gate.',
        tips: 'The classic shot: stand center-path at 24–35mm and let both cedar walls converge on the gate. Overcast light is your friend here.',
        shots: [
          'Center-path leading lines into the gate, 28mm',
          'Cedar trunks converging skyward, 24mm straight up',
          'Moss on the thatched roof, 70mm detail',
        ],
      },
      {
        type: 'photo',
        icon: '⛩️',
        time: 'Stop 4 · 11:45',
        start: '2026-08-22T11:45:00+09:00',
        name: 'Upper Togakushi Shrine',
        subname: 'Okusha inner sanctuary',
        map: gmap('Togakushi Shrine Okusha, Nagano'),
        coords: [36.7585, 138.077],
        leg: { mode: 'walk', label: '≈20 min walk · 0.7 km' },
        image: img('upper-togakushi.svg'),
        ...commons('Togakushi - Togakushi6.jpg'),
        description:
          '2,000-year-old shrine set into the mountain slope, pressed against the sheer rock wall of Mt. Togakushi.',
        tips: 'Include the cliff face at 24mm to show how the shrine hugs the mountain; a person on the steps gives the scene scale.',
        shots: [
          'Shrine dwarfed by the cliff, 24mm vertical',
          'Steps + person for scale, 35mm',
        ],
      },
      {
        type: 'night',
        icon: '🌌',
        time: 'Night session · 20:30 · The main event',
        start: '2026-08-22T20:30:00+09:00',
        name: 'Kagami-ike Pond',
        subname: 'Mirror Pond astrophotography',
        map: gmap('Kagamiike Pond, Togakushi, Nagano'),
        coords: [36.7391, 138.0672],
        leg: { mode: 'drive', label: '≈15 min · 3 km' },
        image: img('kagami-ike.svg'),
        ...commons('Kagami-ike Pond, Togakushi.jpg'),
        bortle: {
          label: 'Bortle 3–4 · rural dark sky',
          url: 'https://www.lightpollutionmap.info/#zoom=11&lat=36.7391&lon=138.0672',
        },
        description:
          'The main event. Extremely low light pollution and mirror-like water for astrophotography and Milky Way reflections beneath the jagged silhouette of Mt. Togakushi.',
        tips: 'A7V + 24mm f/2.8: start around 15s · ISO 3200 and adjust. New-moon window and still air = double Milky Way. Bring a headlamp with a red mode and a warm layer.',
        shots: [
          'Milky Way + reflection, 24mm vertical, NPF shutter',
          'Ridge silhouette panorama, 3 frames stitched',
          'Star trails, 45 min stacked, after the core sets',
        ],
      },
    ],
  },
  {
    id: 'day-3',
    number: 3,
    date: 'Saturday, Aug 23',
    isoDate: '2026-08-23',
    title: 'High Altitudes & Return Drive',
    theme: 'One last summit — pick a direction, then roll home to Tokyo',
    color: '#7a8dd9',
    weatherPoint: { lat: 36.68, lon: 138.52, label: 'Shiga Kogen' },
    sunPoint: { lat: 36.68, lon: 138.52 },
    planB:
      'Low cloud on the summits: swap the viewpoints for Zenkō-ji temple in Nagano City (morning light in the main hall) or Obuse old town streets, then start the drive home early.',
    stops: [
      {
        type: 'option',
        icon: '🅰️',
        time: 'Option A · North · 09:30',
        start: '2026-08-23T09:30:00+09:00',
        name: 'Yokote 2307 View Terrace & Yokoteyama View Terrace',
        subname: 'Shiga Kogen, 2,307 m',
        map: gmap('Yokoteyama Summit Station, Shiga Kogen, Nagano'),
        coords: [36.6816, 138.5199],
        leg: { mode: 'drive', label: '≈1 h 30 min · 55 km' },
        image: img('yokote-terrace.svg'),
        ...commons('Kasagatake seen from Yokoteyama Drive-In.jpg'),
        description:
          'Expansive daytime panoramas of the Northern Alps above the clouds — on a clear morning you shoot down onto a rolling sea of cloud.',
        tips: 'Stack a polarizer for deep-blue skies at altitude; 70mm compresses the layered ridgelines beautifully.',
        shots: [
          'Sea of clouds at 24mm with terrace railing foreground',
          'Layered ridgelines compressed at 70mm',
        ],
      },
      {
        type: 'option',
        icon: '🅱️',
        time: 'Option B · South · 09:30',
        start: '2026-08-23T09:30:00+09:00',
        name: 'Utsukushigahara Open Air Museum',
        subname: '2,000 m plateau',
        map: gmap('Utsukushigahara Open-Air Museum, Nagano'),
        coords: [36.2196, 138.1642],
        leg: { mode: 'drive', label: '≈1 h 40 min · 70 km' },
        image: img('utsukushigahara.svg'),
        ...commons('美ヶ原高原美術館－ 光の美術館 8140278.JPG'),
        description:
          'High-altitude plateau with 350 abstract sculptures against the sky — surreal shapes on open grassland with 360° mountain horizons.',
        tips: 'Use the sculptures as bold foregrounds at 24mm against the clouds; minimalist negative-space compositions work well here.',
        shots: [
          'Sculpture vs. sky, 24mm from ground level',
          'Minimalist negative space: one shape, lots of cloud',
        ],
      },
      {
        type: 'travel',
        icon: '🏁',
        time: 'Evening · 15:00',
        start: '2026-08-23T15:00:00+09:00',
        name: 'Return to Ookayama, Tokyo',
        map: gmap('Ookayama Station, Meguro City, Tokyo'),
        coords: [35.607, 139.6857],
        leg: { mode: 'drive', label: '≈3 h 30 min · 230 km' },
        description:
          'The drive home. Back up every card to two drives before sleeping — the Milky Way shots ride shotgun.',
      },
    ],
  },
]
