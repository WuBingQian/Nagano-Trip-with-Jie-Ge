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

export const trip = {
  title: 'Nagano Trip with Jie Ge',
  subtitle: 'A three-day photography road trip through the Japanese Alps',
  dates: 'August 21 – 23, 2026',
  gear: [
    { label: 'Camera', value: 'Sony A7V' },
    { label: 'Lens', value: 'Sigma 24-70mm f/2.8 DG DN' },
  ],
}

export const days = [
  {
    id: 'day-1',
    number: 1,
    date: 'Thursday, Aug 21',
    title: 'The Scenic Route',
    theme: 'Tokyo → Karuizawa → Nagano, chasing light along the way',
    stops: [
      {
        type: 'travel',
        icon: '🚗',
        time: 'Morning',
        name: 'Depart from Ookayama Station, Tokyo',
        map: 'https://www.google.com/maps/search/?api=1&query=Ookayama%20Station%2C%20Meguro%20City%2C%20Tokyo',
        description:
          'Load up the car and hit the road. Driving gives us full freedom to stop whenever the light looks good.',
      },
      {
        type: 'photo',
        icon: '📷',
        time: 'Stop 1',
        name: 'Megane Bridge',
        map: 'https://www.google.com/maps/search/?api=1&query=Megane%20Bridge%20Usui%20No.3%20Bridge%2C%20Matsuida%2C%20Annaka%2C%20Gunma',
        subname: 'Shin-etsu Main Line No. 3 Bridge',
        image: img('megane-bridge.svg'),
        ...commons('Usui no.3 bridge.JPG'),
        description:
          'Great for architectural shots of the red brick arches. The four-story “Spectacles Bridge” is the largest brick bridge in Japan.',
        tips: 'Shoot from the riverbed below at 24mm to exaggerate the arches, or compress the repeating spans from a distance at 70mm.',
      },
      {
        type: 'photo',
        icon: '📷',
        time: 'Stop 2',
        name: 'Kumoba Pond',
        map: 'https://www.google.com/maps/search/?api=1&query=Kumoba%20Pond%2C%20Karuizawa%2C%20Nagano',
        subname: 'Karuizawa',
        image: img('kumoba-pond.svg'),
        ...commons('160729 Kumoba-ike Karuizawa Japan01s3.jpg'),
        description:
          'Practice mirror-like reflections of the trees in the water. A calm, wind-sheltered pond nicknamed “Swan Lake.”',
        tips: 'Arrive when the air is still. A polarizer lets you dial reflection intensity; try symmetry compositions with the horizon dead-center.',
      },
      {
        type: 'photo',
        icon: '📷',
        time: 'Stop 3',
        name: 'Shiraito Waterfall',
        map: 'https://www.google.com/maps/search/?api=1&query=Shiraito%20Falls%2C%20Nagakura%2C%20Karuizawa%2C%20Nagano',
        subname: 'Shiraito-no-taki, Karuizawa',
        image: img('shiraito-falls.svg'),
        ...commons('Shiraito Falls Karuizawa.jpg'),
        description:
          'Use slow shutter speeds for silky water effects on the 70-meter curved rock face, where hundreds of fine threads of spring water seep straight out of the rock.',
        tips: 'Bring the tripod and an ND filter: 0.5–2s exposures turn the threads to silk. The shaded gorge is naturally soft-lit all day.',
      },
      {
        type: 'photo',
        icon: '📷',
        time: 'Stop 4 · Golden hour',
        name: 'Matsushiro Castle Ruins',
        map: 'https://www.google.com/maps/search/?api=1&query=Matsushiro%20Castle%20Ruins%2C%20Nagano',
        subname: 'Nagano City',
        image: img('matsushiro-castle.svg'),
        ...commons('Matsushiro castle 2.jpg'),
        description:
          'Golden hour photography of the stone walls and gates. Low warm light rakes across the restored stonework and wooden gates of the old Sanada stronghold.',
        tips: 'Side-light the stone walls at 24–35mm to bring out texture; frame the gate through the cherry trees for depth.',
      },
      {
        type: 'hotel',
        icon: '🏨',
        time: 'Evening',
        name: 'Mercure Nagano Matsushiro Resort & Spa',
        map: 'https://www.google.com/maps/search/?api=1&query=Mercure%20Nagano%20Matsushiro%20Resort%20%26%20Spa',
        subname: 'Check-in · Basecamp for two nights',
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
    title: 'Deep Forests & Dark Skies',
    theme: 'The five shrines of Togakushi by day, the Milky Way by night',
    stops: [
      {
        type: 'photo',
        icon: '⛩️',
        time: 'Stop 1',
        name: 'Togakushi-Jinja Chusha',
        map: 'https://www.google.com/maps/search/?api=1&query=Togakushi%20Shrine%20Chusha%2C%20Nagano',
        subname: 'Middle Shrine',
        image: img('togakushi-chusha.svg'),
        ...commons('160430 Togakushi-jinja Chusha Nagano Japan04s3.jpg'),
        description:
          'Ancient shrines surrounded by cedar trees, including a sacred 800-year-old triple cedar at the gate.',
        tips: 'Morning mist between the cedars makes god-rays — expose for the highlights and let the shadows fall deep.',
      },
      {
        type: 'photo',
        icon: '⛩️',
        time: 'Stop 2',
        name: 'Togakushi Shrine Okusha — The Great Torii Gate',
        map: 'https://www.google.com/maps/search/?api=1&query=Togakushi%20Shrine%20Okusha%20Entrance%2C%20Togakushi%2C%20Nagano',
        subname: 'Entrance to the Main Shrine path',
        image: img('okusha-torii.svg'),
        ...commons('160430 Togakushi-jinja Chusha Nagano Japan02n.jpg'),
        description:
          'Massive gate perfect for wide 24mm framing — the gateway to the 2 km approach to the upper shrine.',
        tips: 'Get low and center the gate at 24mm so the trail vanishes through it. Wait for a walker to pass through for scale.',
      },
      {
        type: 'photo',
        icon: '⛩️',
        time: 'Stop 3',
        name: 'Togakushi Shrine Okusha — Zuishinmon',
        map: 'https://www.google.com/maps/search/?api=1&query=Zuishinmon%20Gate%2C%20Togakushi%2C%20Nagano',
        subname: 'The red thatched gate & cedar avenue',
        image: img('okusha-zuishinmon.svg'),
        ...commons('Togakushi Shrine in winter (49819864367).jpg'),
        description:
          'Dramatic leading lines created by 400-year-old cedars flanking the path beyond the vermilion, moss-thatched gate.',
        tips: 'The classic shot: stand center-path at 24–35mm and let both cedar walls converge on the gate. Overcast light is your friend here.',
      },
      {
        type: 'photo',
        icon: '⛩️',
        time: 'Stop 4',
        name: 'Upper Togakushi Shrine',
        map: 'https://www.google.com/maps/search/?api=1&query=Togakushi%20Shrine%20Okusha%2C%20Nagano',
        subname: 'Okusha inner sanctuary',
        image: img('upper-togakushi.svg'),
        ...commons('Togakushi - Togakushi6.jpg'),
        description:
          '2,000-year-old shrine set into the mountain slope, pressed against the sheer rock wall of Mt. Togakushi.',
        tips: 'Include the cliff face at 24mm to show how the shrine hugs the mountain; a person on the steps gives the scene scale.',
      },
      {
        type: 'night',
        icon: '🌌',
        time: 'Night session · The main event',
        name: 'Kagami-ike Pond',
        map: 'https://www.google.com/maps/search/?api=1&query=Kagamiike%20Pond%2C%20Togakushi%2C%20Nagano',
        subname: 'Mirror Pond astrophotography',
        image: img('kagami-ike.svg'),
        ...commons('Kagami-ike Pond, Togakushi.jpg'),
        description:
          'The main event. Extremely low light pollution and mirror-like water for astrophotography and Milky Way reflections beneath the jagged silhouette of Mt. Togakushi.',
        tips: 'A7V + 24mm f/2.8: start around 15s · ISO 3200 and adjust. New-moon window and still air = double Milky Way. Bring a headlamp with a red mode and a warm layer.',
      },
    ],
  },
  {
    id: 'day-3',
    number: 3,
    date: 'Saturday, Aug 23',
    title: 'High Altitudes & Return Drive',
    theme: 'One last summit — pick a direction, then roll home to Tokyo',
    stops: [
      {
        type: 'option',
        icon: '🅰️',
        time: 'Option A · North',
        name: 'Yokote 2307 View Terrace & Yokoteyama View Terrace',
        map: 'https://www.google.com/maps/search/?api=1&query=Yokoteyama%20Summit%20Station%2C%20Shiga%20Kogen%2C%20Nagano',
        subname: 'Shiga Kogen, 2,307 m',
        image: img('yokote-terrace.svg'),
        ...commons('Kasagatake seen from Yokoteyama Drive-In.jpg'),
        description:
          'Expansive daytime panoramas of the Northern Alps above the clouds — on a clear morning you shoot down onto a rolling sea of cloud.',
        tips: 'Stack a polarizer for deep-blue skies at altitude; 70mm compresses the layered ridgelines beautifully.',
      },
      {
        type: 'option',
        icon: '🅱️',
        time: 'Option B · South',
        name: 'Utsukushigahara Open Air Museum',
        map: 'https://www.google.com/maps/search/?api=1&query=Utsukushigahara%20Open-Air%20Museum%2C%20Nagano',
        subname: '2,000 m plateau',
        image: img('utsukushigahara.svg'),
        ...commons('美ヶ原高原美術館－ 光の美術館 8140278.JPG'),
        description:
          'High-altitude plateau with 350 abstract sculptures against the sky — surreal shapes on open grassland with 360° mountain horizons.',
        tips: 'Use the sculptures as bold foregrounds at 24mm against the clouds; minimalist negative-space compositions work well here.',
      },
      {
        type: 'travel',
        icon: '🏁',
        time: 'Evening',
        name: 'Return to Ookayama, Tokyo',
        map: 'https://www.google.com/maps/search/?api=1&query=Ookayama%20Station%2C%20Meguro%20City%2C%20Tokyo',
        description:
          'The drive home. Back up every card to two drives before sleeping — the Milky Way shots ride shotgun.',
      },
    ],
  },
]
