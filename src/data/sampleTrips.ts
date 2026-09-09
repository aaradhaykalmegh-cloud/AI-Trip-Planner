import { TripPlan } from '../types';

export const SAMPLE_TRIPS: TripPlan[] = [
  {
    id: 'sample-tokyo-5day',
    createdAt: '2026-04-10T10:00:00Z',
    request: {
      destination: 'Tokyo, Japan',
      durationDays: 5,
      travelStyle: 'foodie',
      groupType: 'couple',
      budgetLevel: 'moderate',
      currency: 'USD',
      pace: 'moderate',
      interests: ['Street Food', 'Cultural Temples', 'Tech & Anime', 'Gardens', 'Hidden Bars'],
      specialNotes: 'Interested in authentic izakayas and peaceful morning walks.'
    },
    overview: {
      destination: 'Tokyo',
      country: 'Japan',
      tagline: 'Where neon skyscrapers embrace timeless shrines & culinary mastery',
      summary: 'An exhilarating 5-day journey through the vibrant metropolis of Tokyo. Blend historic shrines in Asakusa with the cutting-edge cyber-culture of Akihabara, world-class gastronomy in Ginza, and intimate alleyway bars in Shinjuku.',
      bestTimeToVisit: 'March to May (Cherry Blossoms) or October to November (Autumn foliage)',
      weatherForecast: 'Mild and pleasant (16°C – 22°C), occasional light showers. Layered clothing recommended.',
      localEtiquette: [
        'Bow slightly when greeting or saying thank you.',
        'Avoid walking while eating; consume street food near stalls.',
        'Keep voice low on trains and subways; phone calls are discouraged.',
        'Tipping is not customary and can cause confusion.'
      ],
      transitTips: [
        'Get a digital Suica or Pasmo IC card on your phone for seamless subway taps.',
        'Download Google Maps or Japan Travel by NAVITIME for platform numbers.',
        'Trains stop running around midnight; plan evening rides accordingly.'
      ],
      emergencyInfo: {
        police: '110',
        ambulance: '119',
        general: 'Japan Visitor Hotline (+81 50 3816 2720)'
      },
      currencyTips: 'Cash is still king at small ramen joints, temples, and coin lockers. Keep 10,000–20,000 JPY handy.',
      coordinates: { lat: 35.6762, lng: 139.6503 }
    },
    days: [
      {
        dayNumber: 1,
        title: 'Historic Roots & Riverside Serenity',
        theme: 'Tradition in Asakusa & River Cruising to Odaiba',
        activities: [
          {
            id: 'tok-d1-a1',
            timeBlock: 'morning',
            startTime: '08:30 AM',
            name: 'Sensō-ji Temple & Nakamise-dori',
            description: 'Visit Tokyo oldest and most revered Buddhist temple before the midday crowds. Stroll Nakamise shopping street for warm melonpan and freshly baked ningyo-yaki cakes.',
            location: '2 Chome-3-1 Asakusa, Taito City',
            coordinates: { lat: 35.7148, lng: 139.7967 },
            estimatedDuration: '2.5 hours',
            estimatedCost: 10,
            category: 'culture',
            insiderTip: 'Visit before 9:00 AM to photograph the iconic Kaminarimon red lantern in quiet tranquility.'
          },
          {
            id: 'tok-d1-a2',
            timeBlock: 'afternoon',
            startTime: '01:30 PM',
            name: 'Sumida River Water Bus to Hama-rikyu Gardens',
            description: 'Board the futuristic Himiko water bus from Asakusa pier down the Sumida River to the feudal duck-hunting grounds turned lush bay-front park.',
            location: '1-1 Hamarikyuteien, Chuo City',
            coordinates: { lat: 35.6599, lng: 139.7634 },
            estimatedDuration: '2 hours',
            estimatedCost: 18,
            category: 'nature',
            insiderTip: 'Order a matcha set with seasonal wagashi sweet at the floating Nakajima tea house.'
          },
          {
            id: 'tok-d1-a3',
            timeBlock: 'evening',
            startTime: '06:00 PM',
            name: 'teamLab Planets Immersive Digital Art',
            description: 'Wade barefoot through water surrounded by infinite crystal rooms and floating orchids in this internationally acclaimed sensory art museum.',
            location: '6 Chome-1-16 Toyosu, Koto City',
            coordinates: { lat: 35.6491, lng: 139.7898 },
            estimatedDuration: '2 hours',
            estimatedCost: 32,
            category: 'sightseeing',
            insiderTip: 'Book tickets 3 weeks in advance; wear pants that roll up above the knees easily.'
          }
        ],
        dining: [
          {
            name: 'Asakusa Imahan',
            mealType: 'lunch',
            cuisine: 'Traditional Sukiyaki & Beef',
            priceRange: '$$',
            highlightDish: 'A5 Wagyu Sukiyaki Bento',
            location: 'Asakusa',
            notes: 'Historic restaurant operating since 1895. Arrive at 11:15 AM for the special lunch set.'
          },
          {
            name: 'Tsukiji Outer Market Izakaya Ginza-hachigo',
            mealType: 'dinner',
            cuisine: 'French-influenced Chashu Ramen',
            priceRange: '$$',
            highlightDish: 'Special Chashu Soba with Prosciutto reduction',
            location: 'Ginza / Tsukiji border',
            notes: 'Michelin Bib Gourmand. Delicate broth with no tare (seasoning paste).'
          }
        ],
        dailyBudgetEstimate: 110,
        dailyTip: 'Comfortable walking shoes are vital — you will easily clock 18,000 steps today!'
      },
      {
        dayNumber: 2,
        title: 'Shibuya Crossing, Meiji Shrine & Harajuku',
        theme: 'Modern Energy, Pop Culture & Sacred Forests',
        activities: [
          {
            id: 'tok-d2-a1',
            timeBlock: 'morning',
            startTime: '09:00 AM',
            name: 'Meiji Jingu Shrine & Forest Walk',
            description: 'Step under towering cypress torii gates into a tranquil 170-acre evergreen forest in the heart of Tokyo. Write an ema wooden wishing tablet.',
            location: '1-1 Yoyogikamizonocho, Shibuya City',
            coordinates: { lat: 35.6764, lng: 139.6993 },
            estimatedDuration: '2 hours',
            estimatedCost: 5,
            category: 'culture',
            insiderTip: 'Look out for traditional Shinto wedding processions on weekend mornings.'
          },
          {
            id: 'tok-d2-a2',
            timeBlock: 'afternoon',
            startTime: '01:00 PM',
            name: 'Takeshita Street & Cat Street Boutiques',
            description: 'Wander Harajuku vibrant fashion strip, sample fluffy Japanese soufflé pancakes, then transition into peaceful Cat Street with artisanal coffee bars.',
            location: 'Jingumae, Shibuya City',
            coordinates: { lat: 35.6698, lng: 139.7042 },
            estimatedDuration: '2.5 hours',
            estimatedCost: 25,
            category: 'shopping',
            insiderTip: 'Chibous cafe tucked down a side lane has the softest chiffon toast in Tokyo.'
          },
          {
            id: 'tok-d2-a3',
            timeBlock: 'evening',
            startTime: '05:30 PM',
            name: 'Shibuya Sky & The World Famous Scramble',
            description: 'Catch golden hour from the 229-meter open-air rooftop deck of Shibuya Sky. Watch thousands cross the scramble intersection below simultaneously.',
            location: '2 Chome-24-12 Shibuya',
            coordinates: { lat: 35.6591, lng: 139.7006 },
            estimatedDuration: '2 hours',
            estimatedCost: 20,
            category: 'sightseeing',
            insiderTip: 'Reserve sunset time slots 4 weeks in advance on the official web portal.'
          }
        ],
        dining: [
          {
            name: 'A Happy Pancake (Shiawase no Pancake)',
            mealType: 'lunch',
            cuisine: 'Japanese Fluffy Soufflé Pancakes',
            priceRange: '$$',
            highlightDish: 'Warm Soufflé Pancake with Manuka honey butter',
            location: 'Omotesando',
            notes: 'Prepared fresh to order; takes 20 minutes to bake and melts in your mouth.'
          },
          {
            name: 'Torikizoku or Uobei Shibuya Dogenzaka',
            mealType: 'dinner',
            cuisine: 'High-speed conveyor sushi or Yakitori',
            priceRange: '$',
            highlightDish: 'Seared Salmon with Mayo and Tare yakitori skewers',
            location: 'Shibuya',
            notes: 'Fun touch-screen ordering with plates delivered on magnetic mini-train tracks.'
          }
        ],
        dailyBudgetEstimate: 95,
        dailyTip: 'Pick up an iced hojicha latte at Roasted COFFEE LABORATORY on Cat Street.'
      },
      {
        dayNumber: 3,
        title: 'Culinary Masterclasses & Electric Akihabara',
        theme: 'Tsukiji Market Delicacies & Retro Arcade Culture',
        activities: [
          {
            id: 'tok-d3-a1',
            timeBlock: 'morning',
            startTime: '08:00 AM',
            name: 'Tsukiji Outer Market Food Exploration',
            description: 'Graze through 300+ stalls serving fresh uni (sea urchin), flame-torched A5 wagyu skewers, tamagoyaki sweet rolled omelets, and fresh oysters.',
            location: '4 Chome-16-2 Tsukiji, Chuo City',
            coordinates: { lat: 35.6655, lng: 139.7708 },
            estimatedDuration: '2.5 hours',
            estimatedCost: 35,
            category: 'food',
            insiderTip: 'Visit Yamachou for a piping hot sweet egg skewer for just 150 JPY.'
          },
          {
            id: 'tok-d3-a2',
            timeBlock: 'afternoon',
            startTime: '01:00 PM',
            name: 'Akihabara Electric Town & Retro Gaming',
            description: 'Explore multi-level electronics meccas, retro game boutiques like Super Potato, and gachapon toy capsule corridors.',
            location: 'Sotokanda, Chiyoda City',
            coordinates: { lat: 35.6997, lng: 139.7714 },
            estimatedDuration: '3 hours',
            estimatedCost: 20,
            category: 'adventure',
            insiderTip: 'Level 5 of Super Potato has vintage arcade machines and retro glass-bottle soda.'
          },
          {
            id: 'tok-d3-a3',
            timeBlock: 'evening',
            startTime: '06:30 PM',
            name: 'Kanda River Walk & Ginza Stroll',
            description: 'Window shop architectural flagships in Ginza, browse 12 floors of stationery at Itoya, and marvel at the Kabuki-za theater facade.',
            location: 'Ginza, Chuo City',
            coordinates: { lat: 35.6719, lng: 139.765 },
            estimatedDuration: '2 hours',
            estimatedCost: 15,
            category: 'shopping',
            insiderTip: 'Itoya 8th floor features an indoor hydroponic lettuce farm used in their rooftop cafe.'
          }
        ],
        dining: [
          {
            name: 'Sushizanmai Hon-ten',
            mealType: 'lunch',
            cuisine: 'Fresh Edomae Sushi',
            priceRange: '$$',
            highlightDish: 'Bluefin Tuna O-toro & Chu-toro Platter',
            location: 'Tsukiji',
            notes: 'Open 24 hours, highest freshness direct from Toyosu market auctions.'
          },
          {
            name: 'Kanda Matsuya',
            mealType: 'dinner',
            cuisine: 'Handmade Soba Noodles',
            priceRange: '$$',
            highlightDish: 'Goma Soba (Sesame dip) with crisp Tempura',
            location: 'Kanda',
            notes: 'Operating since 1884 with traditional wooden lattice architecture.'
          }
        ],
        dailyBudgetEstimate: 120,
        dailyTip: 'Carry a small coin pouch for 100-yen coins used in gachapon capsule machines.'
      },
      {
        dayNumber: 4,
        title: 'Shinjuku Skyscraper Vistas & Omoide Yokocho',
        theme: 'Ghibli Magic or Shinjuku Gyoen National Garden',
        activities: [
          {
            id: 'tok-d4-a1',
            timeBlock: 'morning',
            startTime: '09:00 AM',
            name: 'Shinjuku Gyoen National Garden',
            description: 'Sprawling park blending French Formal, English Landscape, and Traditional Japanese garden styles with tranquil koi ponds and glass greenhouse.',
            location: '11 Naitomachi, Shinjuku City',
            coordinates: { lat: 35.6852, lng: 139.7101 },
            estimatedDuration: '2 hours',
            estimatedCost: 5,
            category: 'nature',
            insiderTip: 'Alcohol is prohibited in the park, making it remarkably serene and clean.'
          },
          {
            id: 'tok-d4-a2',
            timeBlock: 'afternoon',
            startTime: '01:30 PM',
            name: 'Tokyo Metropolitan Government Building Observation Deck',
            description: 'Ascend to the 45th floor for breathtaking 360-degree panoramic views of Tokyo cityscape and Mount Fuji on clear crisp days. Free admission!',
            location: '2 Chome-8-1 Nishishinjuku',
            coordinates: { lat: 35.6896, lng: 139.6921 },
            estimatedDuration: '1.5 hours',
            estimatedCost: 0,
            category: 'sightseeing',
            insiderTip: 'Visit the South Observatory around 3:00 PM for the best lighting angle on Mt. Fuji.'
          },
          {
            id: 'tok-d4-a3',
            timeBlock: 'evening',
            startTime: '06:00 PM',
            name: 'Omoide Yokocho & Golden Gai Bar Crawl',
            description: 'Squeeze into historic atmospheric laneways with red paper lanterns and miniature izakayas seating just 5 to 7 patrons each.',
            location: '1 Chome-1-1 Kabukicho, Shinjuku',
            coordinates: { lat: 35.6938, lng: 139.7034 },
            estimatedDuration: '3 hours',
            estimatedCost: 40,
            category: 'food',
            insiderTip: 'Check door signs for "English Friendly / No Cover Charge" before entering Golden Gai bars.'
          }
        ],
        dining: [
          {
            name: 'Fuunji Ramen',
            mealType: 'lunch',
            cuisine: 'Tsukemen (Dipping Noodles)',
            priceRange: '$',
            highlightDish: 'Special Tsukemen with thick poultry and fish broth',
            location: 'Nishi-Shinjuku',
            notes: 'Consistent queue moving swiftly. Dip thick noodles into rich savory soup.'
          },
          {
            name: 'Kabuto Yakitori Alley',
            mealType: 'dinner',
            cuisine: 'Charcoal Grilled Eel & Skewers',
            priceRange: '$$',
            highlightDish: 'Eel skewers with tare sauce and cold Draft Kirin',
            location: 'Omoide Yokocho',
            notes: 'Smoky, authentic ambiance with masters grilling over binchotan charcoal.'
          }
        ],
        dailyBudgetEstimate: 105,
        dailyTip: 'Golden Gai bars often charge a 500-1000 JPY seating fee; have exact cash ready.'
      },
      {
        dayNumber: 5,
        title: 'Artisan Yanaka & Tokyo Farewell Banquet',
        theme: 'Old Shitamachi Nostalgia & Craft Souvenirs',
        activities: [
          {
            id: 'tok-d5-a1',
            timeBlock: 'morning',
            startTime: '09:30 AM',
            name: 'Yanaka Ginza "Old Tokyo" Stroll',
            description: 'One of the few neighborhoods that survived WWII unscathed. Experience Showa-era charm, artisan pottery, cat statues, and retro confectionery shops.',
            location: 'Yanaka, Taito City',
            coordinates: { lat: 35.7276, lng: 139.7675 },
            estimatedDuration: '2.5 hours',
            estimatedCost: 15,
            category: 'culture',
            insiderTip: 'Stop at Sunset Hill (Yuyake Dandan) steps for a nostalgic view over the street.'
          },
          {
            id: 'tok-d5-a2',
            timeBlock: 'afternoon',
            startTime: '01:30 PM',
            name: 'Ueno Park & Tokyo National Museum',
            description: 'Japan oldest national museum holding over 110,000 cultural artifacts including samurai armor, katana swords, and ukiyo-e woodblock prints.',
            location: '13-9 Uenokoen, Taito City',
            coordinates: { lat: 35.7188, lng: 139.7765 },
            estimatedDuration: '2.5 hours',
            estimatedCost: 12,
            category: 'culture',
            insiderTip: 'The Honkan (Japanese Gallery) on the 2nd floor houses National Treasures.'
          },
          {
            id: 'tok-d5-a3',
            timeBlock: 'evening',
            startTime: '06:00 PM',
            name: 'Roppongi Hills Sunset & Farewell Kaiseki',
            description: 'Take in nighttime illuminations of Tokyo Tower and conclude your trip with a multi-course seasonal Japanese dining experience.',
            location: '6 Chome-10-1 Roppongi, Minato City',
            coordinates: { lat: 35.6628, lng: 139.7291 },
            estimatedDuration: '2.5 hours',
            estimatedCost: 75,
            category: 'food',
            insiderTip: 'Mori Art Museum on 53rd floor stays open till 10:00 PM on most days.'
          }
        ],
        dining: [
          {
            name: 'Inshotei in Ueno Park',
            mealType: 'lunch',
            cuisine: 'Traditional Tofu & Kaiseki',
            priceRange: '$$',
            highlightDish: 'Seasonal Hanakago Tofu Basket Bento',
            location: 'Ueno Park',
            notes: 'Historic 1875 tea house overlooking serene bamboo groves.'
          },
          {
            name: 'Gonpachi Nishi-Azabu (The Kill Bill Izakaya)',
            mealType: 'dinner',
            cuisine: 'Handmade Soba, Charcoal Robata & Sake',
            priceRange: '$$$',
            highlightDish: 'Kobe Beef Skewer and House-made Tempura Soba',
            location: 'Nishi-Azabu / Roppongi',
            notes: 'Atmospheric multi-tiered wooden tavern that inspired the famous movie scene.'
          }
        ],
        dailyBudgetEstimate: 140,
        dailyTip: 'Pack your suitcase the night before and arrange luggage forwarding (Takkyubin) if heading to Kyoto or Narita.'
      }
    ],
    budget: {
      currency: 'USD',
      totalEstimatedCost: 1480,
      costPerPerson: 740,
      categories: {
        accommodation: 650,
        foodAndDining: 450,
        activities: 210,
        localTransit: 70,
        emergencyBuffer: 100
      },
      moneySavingTips: [
        'Use local 7-Eleven, Lawson, or FamilyMart for delicious onigiri and tamago sandwiches for breakfast ($3/person).',
        'Take advantage of lunch set menus (Teishoku) at high-end restaurants for half the dinner price.',
        'Purchase the Tokyo Subway 72-hour pass for unlimited rides on Tokyo Metro & Toei Subway lines for just 1,500 JPY.',
        'Carry a reusable water bottle; Tokyo tap water is completely safe and delicious.'
      ]
    },
    packingList: [
      { id: 'p1', item: 'Comfortable slip-on walking shoes (for easy removal at temples/izakayas)', category: 'clothing', packed: true, reason: 'High daily step count + frequent shoes-off etiquette' },
      { id: 'p2', item: 'Universal power plug adapter (Type A/B, two-prong ungrounded)', category: 'electronics', packed: true, reason: 'Japan uses 100V Type A outlets' },
      { id: 'p3', item: 'Compact portable power bank (10,000mAh)', category: 'electronics', packed: false, reason: 'Navigation & translation apps drain battery fast' },
      { id: 'p4', item: 'Passports with at least 6 months validity & Visit Japan Web QR code', category: 'essentials', packed: true, reason: 'Mandatory for immigration and tax-free shopping' },
      { id: 'p5', item: 'Coin purse or small zipped pouch', category: 'gear', packed: false, reason: 'Japanese currency has 1, 5, 10, 50, 100, and 500 yen coins' },
      { id: 'p6', item: 'Small hand towel or tenugui', category: 'toiletries', packed: false, reason: 'Many public restrooms do not have paper towels or air dryers' },
      { id: 'p7', item: 'Compact pocket umbrella', category: 'gear', packed: false, reason: 'Sudden afternoon rain showers are common' },
      { id: 'p8', item: 'Light breathable layers & cardigan', category: 'clothing', packed: true, reason: 'Subways are warm while outdoor evenings can be crisp' },
      { id: 'p9', item: 'Activated eSIM or Pocket WiFi confirmation', category: 'essentials', packed: true, reason: 'Essential for live train schedules & translation' }
    ],
    hiddenGems: [
      {
        name: 'Nezu Shrine Torii Tunnel',
        description: 'One of Japan oldest shrines featuring a picturesque tunnel of vermilion torii gates without the suffocating crowds of Kyoto Fushimi Inari.',
        location: '1 Chome-28-9 Nezu, Bunkyo City',
        whyVisit: 'Peaceful garden pond with carp, blooming azalea hills in spring, and centuries-old wooden structures.'
      },
      {
        name: 'Shimokitazawa Vintage District',
        description: 'A bohemian enclave of narrow alleys filled with curated second-hand record stores, indie cafes, and vintage clothing boutiques.',
        location: 'Setagaya City (8 min train from Shibuya)',
        whyVisit: 'Relaxed hipster vibe distinct from Tokyo commercial core.'
      },
      {
        name: 'Depachika Food Halls (Isetan Shinjuku B1)',
        description: 'Subterranean luxury food basements showcasing hundreds of jewel-box pastry counters, artisan bento boxes, and premium fruit.',
        location: '3 Chome-14-1 Shinjuku',
        whyVisit: 'Perfect for building a gourmet picnic for Shinjuku Gyoen park.'
      }
    ]
  },
  {
    id: 'sample-paris-4day',
    createdAt: '2026-04-08T12:00:00Z',
    request: {
      destination: 'Paris, France',
      durationDays: 4,
      travelStyle: 'cultural',
      groupType: 'couple',
      budgetLevel: 'moderate',
      currency: 'EUR',
      pace: 'relaxed',
      interests: ['Art Museums', 'Historic Architecture', 'Bakeries & Cafes', 'Romantic Walks', 'Wine & Cheese'],
      specialNotes: 'Focus on charming neighborhoods, sunset viewpoints, and classic French bistros.'
    },
    overview: {
      destination: 'Paris',
      country: 'France',
      tagline: 'The City of Light, romance, bohemian cafes, and timeless art',
      summary: 'A tailored 4-day itinerary soaking in Parisian elegance. Marvel at masterpieces in the Louvre and Musée d’Orsay, wander Montmartre’s cobblestones, picnic under the sparkling Eiffel Tower, and enjoy slow café culture along Saint-Germain-des-Prés.',
      bestTimeToVisit: 'April to June or September to October (crisp weather & sidewalk cafe charm)',
      weatherForecast: 'Spring temperatures around 14°C – 19°C. Crisp mornings and mild sunny afternoons.',
      localEtiquette: [
        'Always greet shopkeepers and waitstaff with a polite "Bonjour, Madame/Monsieur" upon entering.',
        'Keep hands visible on the dining table (wrist resting on edge, not elbows).',
        'Speak at a gentle indoor volume on public transport.',
        'Tipping is included (service compris), but leaving 1–2€ for good service is appreciated.'
      ],
      transitTips: [
        'Use the Navigo Easy card or purchase 10-ticket carnet for the metro.',
        'Walking between arrondissements is often faster and much more scenic than taking the train.',
        'Be mindful of personal belongings around major tourist monuments and Gare du Nord.'
      ],
      emergencyInfo: {
        police: '17',
        ambulance: '15',
        general: 'European Emergency Number (112)'
      },
      currencyTips: 'Contactless credit/debit cards are accepted almost everywhere, even for a 1.40€ baguette.',
      coordinates: { lat: 48.8566, lng: 2.3522 }
    },
    days: [
      {
        dayNumber: 1,
        title: 'The Royal Heart & The Seine',
        theme: 'Louvre, Tuileries & Sunset Cruise',
        activities: [
          {
            id: 'par-d1-a1',
            timeBlock: 'morning',
            startTime: '09:00 AM',
            name: 'Musée du Louvre & Cour Carrée',
            description: 'Marvel at the glass pyramid, Mona Lisa, Winged Victory of Samothrace, and Venus de Milo in the world largest art sanctuary.',
            location: 'Rue de Rivoli, 75001 Paris',
            coordinates: { lat: 48.8606, lng: 2.3376 },
            estimatedDuration: '3 hours',
            estimatedCost: 22,
            category: 'culture',
            insiderTip: 'Enter through the Carrousel du Louvre underground mall entrance to bypass surface queues.'
          },
          {
            id: 'par-d1-a2',
            timeBlock: 'afternoon',
            startTime: '01:30 PM',
            name: 'Tuileries Garden & Place de la Concorde',
            description: 'Stroll through Catherine de Medici landscaped gardens, pull up a green metal chair by the fountain, and admire the Luxor Obelisk.',
            location: 'Place de la Concorde, 75001 Paris',
            coordinates: { lat: 48.8635, lng: 2.3275 },
            estimatedDuration: '1.5 hours',
            estimatedCost: 0,
            category: 'nature',
            insiderTip: 'Grab a hot chocolate from historic Angelina on Rue de Rivoli to sip in the park.'
          },
          {
            id: 'par-d1-a3',
            timeBlock: 'evening',
            startTime: '06:30 PM',
            name: 'Vedettes du Pont Neuf Seine Cruise',
            description: 'Glide under historic stone bridges past Notre-Dame Cathedral and the Musée d’Orsay as twilight falls and monuments illuminate.',
            location: 'Square du Vert-Galant, Pont Neuf',
            coordinates: { lat: 48.8575, lng: 2.3413 },
            estimatedDuration: '1.5 hours',
            estimatedCost: 16,
            category: 'sightseeing',
            insiderTip: 'Book the sunset departure so you witness the Eiffel Tower sparkle on the hour.'
          }
        ],
        dining: [
          {
            name: 'Café Kitsuné Palais Royal',
            mealType: 'lunch',
            cuisine: 'Artisanal Cafe & Pastry',
            priceRange: '$$',
            highlightDish: 'Fox shortbread cookie and flat white overlooking the arcades',
            location: 'Jardin du Palais Royal',
            notes: 'Serene courtyard setting framed by Daniel Buren black-and-white striped columns.'
          },
          {
            name: 'Le Soufflé',
            mealType: 'dinner',
            cuisine: 'Classic French Soufflés',
            priceRange: '$$$',
            highlightDish: 'Trio of savory Comte cheese, mushroom, and chocolate Grand Marnier soufflés',
            location: 'Rue du Mont Thabor',
            notes: 'A culinary institution dedicated entirely to sweet and savory light-as-air soufflés.'
          }
        ],
        dailyBudgetEstimate: 95,
        dailyTip: 'Pre-book Louvre timed entry tickets online; walk-in tickets are rarely available.'
      },
      {
        dayNumber: 2,
        title: 'Bohemian Montmartre & Sunset at Sacré-Cœur',
        theme: 'Artists, Windmills & Romantic Vistas',
        activities: [
          {
            id: 'par-d2-a1',
            timeBlock: 'morning',
            startTime: '09:30 AM',
            name: 'Montmartre Cobblestones & Place du Tertre',
            description: 'Climb the atmospheric staircases of the bohemian hill where Picasso, Renoir, and Van Gogh lived. Browse open-air portrait easels.',
            location: 'Place du Tertre, 75018 Paris',
            coordinates: { lat: 48.8867, lng: 2.3408 },
            estimatedDuration: '2.5 hours',
            estimatedCost: 0,
            category: 'culture',
            insiderTip: 'Walk down Rue de l’Abreuvoir past La Maison Rose for Paris most charming street view.'
          },
          {
            id: 'par-d2-a2',
            timeBlock: 'afternoon',
            startTime: '01:30 PM',
            name: 'Sacré-Cœur Basilica & Dome Climb',
            description: 'Admire the striking white travertine stone basilica, then climb 300 steps up the dome for an incredible panoramic vista over all Paris.',
            location: '35 Rue du Chevalier de la Barre',
            coordinates: { lat: 48.8867, lng: 2.3431 },
            estimatedDuration: '2 hours',
            estimatedCost: 8,
            category: 'sightseeing',
            insiderTip: 'The basilica interior is free; dome tickets are purchased at the left entrance.'
          },
          {
            id: 'par-d2-a3',
            timeBlock: 'evening',
            startTime: '06:00 PM',
            name: 'Moulin Rouge & South Pigalle (SoPi) Cocktail Crawl',
            description: 'Snap photos of the iconic red windmill facade, then explore trendy wine bars and neo-bistros in the hip South Pigalle district.',
            location: '82 Boulevard de Clichy',
            coordinates: { lat: 48.8841, lng: 2.3323 },
            estimatedDuration: '2.5 hours',
            estimatedCost: 30,
            category: 'relaxation',
            insiderTip: 'Visit Lulu White Drinking Club for New Orleans inspired craft absinthe cocktails.'
          }
        ],
        dining: [
          {
            name: 'La Boîte aux Lettres',
            mealType: 'lunch',
            cuisine: 'Contemporary French Neo-Bistro',
            priceRange: '$$',
            highlightDish: 'Duck breast with honey lavender sauce and roasted parsnips',
            location: 'Rue Lepic, Montmartre',
            notes: 'Intimate neighborhood bistro with chalked daily market specials.'
          },
          {
            name: 'Bouillon Pigalle',
            mealType: 'dinner',
            cuisine: 'Historic Belle Époque Comfort Dining',
            priceRange: '$',
            highlightDish: 'Escargots de Bourgogne (12 pcs) followed by Steak Frites',
            location: 'Pigalle',
            notes: 'Remarkable value in a vibrant two-story Parisian brasserie. Arrive early.'
          }
        ],
        dailyBudgetEstimate: 75,
        dailyTip: 'Wear sturdy flat shoes for Montmartre steep stone stairways.'
      },
      {
        dayNumber: 3,
        title: 'Impressionist Masterpieces & Latin Quarter',
        theme: 'Musée d’Orsay & Left Bank Bohemian Charm',
        activities: [
          {
            id: 'par-d3-a1',
            timeBlock: 'morning',
            startTime: '09:00 AM',
            name: 'Musée d’Orsay in the Beaux-Arts Railway Station',
            description: 'Stand before iconic Impressionist works by Monet, Degas, Renoir, and Van Gogh Starry Night Over the Rhône inside a former train station.',
            location: '1 Rue de la Légion d’Honneur',
            coordinates: { lat: 48.8599, lng: 2.3266 },
            estimatedDuration: '2.5 hours',
            estimatedCost: 16,
            category: 'culture',
            insiderTip: 'Peer through the giant station clock face on the top floor for an Eiffel Tower silhouette.'
          },
          {
            id: 'par-d3-a2',
            timeBlock: 'afternoon',
            startTime: '01:00 PM',
            name: 'Luxembourg Gardens & Latin Quarter Bookshops',
            description: 'Walk through Marie de Medici tree-lined garden with the Medici Fountain, then visit the legendary Shakespeare and Company bookstore.',
            location: 'Rue de Médicis, 75006 Paris',
            coordinates: { lat: 48.8462, lng: 2.3371 },
            estimatedDuration: '2.5 hours',
            estimatedCost: 0,
            category: 'relaxation',
            insiderTip: 'Shakespeare and Company limits visitors inside; browse the outdoor antique book stalls.'
          },
          {
            id: 'par-d3-a3',
            timeBlock: 'evening',
            startTime: '06:00 PM',
            name: 'Île de la Cité & Notre-Dame Forecourt',
            description: 'Admire the restored spires of Notre-Dame Cathedral and Sainte-Chapelle jaw-dropping 13th-century stained-glass kaleidoscope.',
            location: 'Île de la Cité, 75004 Paris',
            coordinates: { lat: 48.853, lng: 2.3499 },
            estimatedDuration: '2 hours',
            estimatedCost: 13,
            category: 'sightseeing',
            insiderTip: 'Visit Sainte-Chapelle on a sunny afternoon when light streams through the 1,113 stained glass panels.'
          }
        ],
        dining: [
          {
            name: 'Café de Flore or Les Deux Magots',
            mealType: 'lunch',
            cuisine: 'Literary Cafe & Croque Monsieur',
            priceRange: '$$$',
            highlightDish: 'Croque Madame on sourdough with melted Gruyère',
            location: 'Saint-Germain-des-Prés',
            notes: 'Sit on the terrace where Sartre, Hemingway, and Simone de Beauvoir debated philosophy.'
          },
          {
            name: 'Le Comptoir du Relais',
            mealType: 'dinner',
            cuisine: 'Chef Yves Camdeborde Bistronomy',
            priceRange: '$$$',
            highlightDish: 'Slow-braised beef cheek in Pinot Noir reduction',
            location: 'Odéon',
            notes: 'Pioneer of the Parisian bistronomy movement. Authentic culinary perfection.'
          }
        ],
        dailyBudgetEstimate: 110,
        dailyTip: 'Sainte-Chapelle security is strict; do not carry pocket knives or large scissors.'
      },
      {
        dayNumber: 4,
        title: 'The Iron Lady & Le Marais Grand Finale',
        theme: 'Eiffel Tower Picnic, Medieval Streets & Trendy Boutiques',
        activities: [
          {
            id: 'par-d4-a1',
            timeBlock: 'morning',
            startTime: '09:00 AM',
            name: 'Eiffel Tower Summit & Champ de Mars',
            description: 'Ascend Gustave Eiffel revolutionary iron masterpiece to the 276m summit for unmatched views spanning 70 kilometers.',
            location: 'Champ de Mars, 5 Av. Anatole France',
            coordinates: { lat: 48.8584, lng: 2.2945 },
            estimatedDuration: '2.5 hours',
            estimatedCost: 35,
            category: 'sightseeing',
            insiderTip: 'Book summit elevator tickets exactly 60 days in advance at midnight Paris time.'
          },
          {
            id: 'par-d4-a2',
            timeBlock: 'afternoon',
            startTime: '01:30 PM',
            name: 'Le Marais & Place des Vosges',
            description: 'Wander Paris oldest planned square with 36 symmetrical brick pavilions where Victor Hugo wrote Les Misérables. Explore art galleries and Jewish Quarter bakeries.',
            location: 'Place des Vosges, 75004 Paris',
            coordinates: { lat: 48.8554, lng: 2.3656 },
            estimatedDuration: '3 hours',
            estimatedCost: 10,
            category: 'culture',
            insiderTip: 'L’As du Fallafel on Rue des Rosiers serves the tastiest pita falafel in Europe.'
          },
          {
            id: 'par-d4-a3',
            timeBlock: 'evening',
            startTime: '07:00 PM',
            name: 'Farewell Wine Tasting & Saint-Louis Sunset',
            description: 'Cross Pont Saint-Louis to Île Saint-Louis, grab a scoop of legendary Berthillon wild strawberry sorbet, and toast to an unforgettable trip.',
            location: 'Île Saint-Louis, 75004 Paris',
            coordinates: { lat: 48.8517, lng: 2.3564 },
            estimatedDuration: '2 hours',
            estimatedCost: 25,
            category: 'relaxation',
            insiderTip: 'Sit on the western tip of the island to watch street jazz performers play under the lamp posts.'
          }
        ],
        dining: [
          {
            name: 'L’As du Fallafel',
            mealType: 'lunch',
            cuisine: 'Middle Eastern Falafel & Shawarma',
            priceRange: '$',
            highlightDish: 'Special Falafel Pita with fried eggplant, tahini, and red cabbage',
            location: 'Rue des Rosiers, Le Marais',
            notes: 'Fast, vibrant queue. Take your sandwich to eat in the grassy center of Place des Vosges.'
          },
          {
            name: 'Chez Janou',
            mealType: 'dinner',
            cuisine: 'Provençal Cuisine & Pastis',
            priceRange: '$$',
            highlightDish: 'Duck breast with rosemary and unlimited communal chocolate mousse bowl',
            location: 'Rue Roger Verlomme, Marais',
            notes: 'They bring an enormous ceramic bowl of rich chocolate mousse to your table and leave the spoon!'
          }
        ],
        dailyBudgetEstimate: 120,
        dailyTip: 'Berthillon ice cream shop is closed on Mondays and Tuesdays; nearby cafes also serve it.'
      }
    ],
    budget: {
      currency: 'EUR',
      totalEstimatedCost: 1180,
      costPerPerson: 590,
      categories: {
        accommodation: 520,
        foodAndDining: 360,
        activities: 180,
        localTransit: 40,
        emergencyBuffer: 80
      },
      moneySavingTips: [
        'Many museums offer free admission on the first Sunday of each month (booking required).',
        'Water in French restaurants is free if you request "une carafe d’eau" rather than bottled water.',
        'Buy picnic supplies (baguette, cheese, grapes, wine) at local Monoprix or street markets for a 10€ feast on the Seine banks.'
      ]
    },
    packingList: [
      { id: 'p-fr1', item: 'Comfortable chic walking sneakers (e.g. Veja or leather trainers)', category: 'clothing', packed: true, reason: 'Cobblestones and metro stairs demand stylish cushioning' },
      { id: 'p-fr2', item: 'Smart evening outfit / blazer', category: 'clothing', packed: true, reason: 'Parisian bistros appreciate a tidy, smart-casual aesthetic' },
      { id: 'p-fr3', item: 'Type C / E European power adapter plug', category: 'electronics', packed: true, reason: 'Standard French wall outlets' },
      { id: 'p-fr4', item: 'Tote bag for market pastries and baguettes', category: 'gear', packed: false, reason: 'Shops charge extra for single-use bags' },
      { id: 'p-fr5', item: 'Crossbody bag with sturdy zippers (anti-theft)', category: 'gear', packed: true, reason: 'Pickpockets operate around major metro hubs' },
      { id: 'p-fr6', item: 'Scarf or light trench coat', category: 'clothing', packed: false, reason: 'Spring breezes along the Seine can be surprisingly brisk' }
    ],
    hiddenGems: [
      {
        name: 'Passage des Panoramas',
        description: 'Paris oldest covered arcade (built in 1799) with gas lamps, philatelic stamp collectors, and charming wine bistros.',
        location: '11 Boulevard Montmartre',
        whyVisit: 'Sheltered from rain, feels like stepping straight into the 19th century.'
      },
      {
        name: 'Square René Viviani & The Oldest Tree in Paris',
        description: 'A pocket park facing Notre-Dame housing a Robinia pseudoacacia planted in 1601.',
        location: 'Quai de Montebello',
        whyVisit: 'Spectacular unobstructed view of the cathedral facade without the crowds.'
      }
    ]
  }
];
