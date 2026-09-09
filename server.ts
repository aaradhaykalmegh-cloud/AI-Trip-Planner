import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { GoogleGenAI, Type } from '@google/genai';
import { createServer as createViteServer } from 'vite';
import { TripPlan, TripPlanRequest, ChatMessage } from './src/types';
import { SAMPLE_TRIPS } from './src/data/sampleTrips';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '10mb' }));

// Lazy GoogleGenAI client
function getGenAI(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.warn('[SERVER] Warning: GEMINI_API_KEY environment variable is not set. Using intelligent fallback.');
    return null;
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    hasGeminiKey: Boolean(process.env.GEMINI_API_KEY),
    timestamp: new Date().toISOString(),
  });
});

// Helper to sanitize or parse JSON safely from model response
function cleanJsonResponse(text: string): any {
  let cleaned = text.trim();
  // Remove markdown code fence if present
  if (cleaned.startsWith('```json')) {
    cleaned = cleaned.slice(7);
  } else if (cleaned.startsWith('```')) {
    cleaned = cleaned.slice(3);
  }
  if (cleaned.endsWith('```')) {
    cleaned = cleaned.slice(0, -3);
  }
  cleaned = cleaned.trim();
  return JSON.parse(cleaned);
}

// Intelligent fallback generator in case of API rate limits or missing keys
function generateFallbackTrip(request: TripPlanRequest): TripPlan {
  // Check if we have a matching sample trip
  const destLower = request.destination.toLowerCase();
  const sampleMatch = SAMPLE_TRIPS.find(
    s => s.overview.destination.toLowerCase().includes(destLower) ||
         destLower.includes(s.overview.destination.toLowerCase())
  );

  if (sampleMatch && sampleMatch.request.durationDays === request.durationDays) {
    return {
      ...sampleMatch,
      id: `trip-${Date.now()}`,
      createdAt: new Date().toISOString(),
      request,
    };
  }

  // Construct a bespoke fallback trip for requested duration
  const daysCount = Math.min(Math.max(request.durationDays || 3, 1), 10);
  const days = [];

  const activityCategories: Array<'sightseeing' | 'culture' | 'food' | 'nature' | 'adventure' | 'shopping' | 'relaxation'> = [
    'sightseeing', 'culture', 'food', 'nature', 'adventure', 'shopping', 'relaxation'
  ];

  for (let i = 1; i <= daysCount; i++) {
    const dayTheme = i === 1
      ? 'Arrival, Orientation & Iconic Landmarks'
      : i === daysCount
      ? 'Local Artisan Markets & Grand Farewell'
      : i % 2 === 0
      ? 'Deep Cultural Heritage & Hidden Neighborhoods'
      : 'Scenic Views, Culinary Trails & Evening Splendor';

    days.push({
      dayNumber: i,
      title: `Day ${i}: ${dayTheme.split('&')[0].trim()}`,
      theme: dayTheme,
      activities: [
        {
          id: `act-${i}-1`,
          timeBlock: 'morning' as const,
          startTime: '09:00 AM',
          name: `Explore Iconic ${request.destination} Landmark & Central Square`,
          description: `Begin your morning discovering the primary heritage attraction of ${request.destination}. Soak in the morning atmosphere with fewer crowds.`,
          location: `Central ${request.destination}`,
          estimatedDuration: '2.5 hours',
          estimatedCost: request.budgetLevel === 'budget' ? 5 : request.budgetLevel === 'luxury' ? 45 : 18,
          category: 'sightseeing' as const,
          insiderTip: 'Arrive 15 minutes before opening for best photo light and easy access.'
        },
        {
          id: `act-${i}-2`,
          timeBlock: 'afternoon' as const,
          startTime: '01:30 PM',
          name: `${request.interests[0] || 'Cultural Arts'} Walking Experience`,
          description: `Immerse in the authentic local vibe, exploring boutique streets, scenic viewpoints, and artisanal shops.`,
          location: `Old Quarter, ${request.destination}`,
          estimatedDuration: '3 hours',
          estimatedCost: request.budgetLevel === 'budget' ? 10 : request.budgetLevel === 'luxury' ? 60 : 25,
          category: (activityCategories[i % activityCategories.length]) as any,
          insiderTip: 'Keep small local currency for street vendors and transit tickets.'
        },
        {
          id: `act-${i}-3`,
          timeBlock: 'evening' as const,
          startTime: '06:30 PM',
          name: `Sunset Vistas & Night Market / Promenade`,
          description: `Witness the sunset over ${request.destination}, followed by an illuminated evening walk through the liveliest evening district.`,
          location: `Waterfront / High Point, ${request.destination}`,
          estimatedDuration: '2.5 hours',
          estimatedCost: request.budgetLevel === 'budget' ? 15 : request.budgetLevel === 'luxury' ? 80 : 30,
          category: 'food' as const,
          insiderTip: 'Book dinner or arrive before 7 PM for scenic terrace seating.'
        }
      ],
      dining: [
        {
          name: `Local Gourmet Corner & Bakery`,
          mealType: 'lunch' as const,
          cuisine: 'Regional Traditional Cuisine',
          priceRange: (request.budgetLevel === 'budget' ? '$' : request.budgetLevel === 'luxury' ? '$$$' : '$$') as any,
          highlightDish: 'Chef Daily Special Platter & Fresh Bread',
          location: `Historic District, ${request.destination}`,
          notes: 'Beloved neighborhood spot with fresh seasonal ingredients.'
        },
        {
          name: `Bistro & Terrace at ${request.destination}`,
          mealType: 'dinner' as const,
          cuisine: 'Authentic Local Specialty',
          priceRange: (request.budgetLevel === 'budget' ? '$$' : request.budgetLevel === 'luxury' ? '$$$$' : '$$$') as any,
          highlightDish: 'Signature Regional Tasting Course',
          location: `Downtown, ${request.destination}`,
          notes: 'Great ambiance, wine pairing, and lively evening atmosphere.'
        }
      ],
      dailyBudgetEstimate: request.budgetLevel === 'budget' ? 55 : request.budgetLevel === 'luxury' ? 240 : 105,
      dailyTip: `Comfortable walking shoes are recommended to navigate the historic streets easily.`
    });
  }

  const baseAccom = request.budgetLevel === 'budget' ? 50 : request.budgetLevel === 'luxury' ? 250 : 110;
  const baseFood = request.budgetLevel === 'budget' ? 30 : request.budgetLevel === 'luxury' ? 130 : 60;
  const totalCost = (baseAccom + baseFood + 40) * daysCount;

  return {
    id: `trip-${Date.now()}`,
    createdAt: new Date().toISOString(),
    request,
    overview: {
      destination: request.destination,
      country: 'International',
      tagline: `Unforgettable ${request.durationDays}-day curated adventure in ${request.destination}`,
      summary: `Tailored for a ${request.travelStyle} experience with a ${request.pace} pace, highlighting ${request.interests.join(', ') || 'essential sights and local gastronomy'}.`,
      bestTimeToVisit: 'Spring and Autumn for mild temperatures and optimal daylight hours.',
      weatherForecast: 'Expected comfortable seasonal conditions. Layered attire recommended.',
      localEtiquette: [
        'Greet shopkeepers and hospitality staff warmly upon entering.',
        'Respect local customs, quiet hours on public transit, and sacred site dress codes.',
        'Keep emergency numbers and accommodation addresses handy in your offline notes.'
      ],
      transitTips: [
        'Look for local rechargeable transit cards or multi-day tourist transport passes.',
        'Walking between sights in the central districts is often the most rewarding way to explore.'
      ],
      emergencyInfo: {
        police: '112 / 911',
        ambulance: '112 / 911',
        general: 'Local tourist support and emergency services'
      },
      currencyTips: `Primary currency: ${request.currency}. Have both cards and modest local cash handy for small stalls.`,
      coordinates: { lat: 45.0, lng: 9.0 }
    },
    days,
    budget: {
      currency: request.currency || 'USD',
      totalEstimatedCost: totalCost,
      costPerPerson: Math.round(totalCost / (request.groupType === 'couple' ? 2 : request.groupType === 'family' ? 3.5 : 1)),
      categories: {
        accommodation: Math.round(baseAccom * daysCount),
        foodAndDining: Math.round(baseFood * daysCount),
        activities: Math.round(30 * daysCount),
        localTransit: Math.round(15 * daysCount),
        emergencyBuffer: Math.round(totalCost * 0.1)
      },
      moneySavingTips: [
        'Take advantage of lunch specials which often offer the same quality as dinner at 40% lower cost.',
        'Book major museum and landmark tickets online ahead of time to skip long lines and get early bird discounts.',
        'Use local metro, tram, or cycling paths rather than hailing private taxis during peak hours.'
      ]
    },
    packingList: [
      { id: 'pk-1', item: 'Comfortable, broken-in walking shoes', category: 'clothing', packed: true, reason: 'Essential for high daily walking volume' },
      { id: 'pk-2', item: 'Universal travel power adapter & multi-port charger', category: 'electronics', packed: true, reason: 'Keep phones, camera, and power bank charged' },
      { id: 'pk-3', item: 'Compact portable power bank (10,000mAh)', category: 'electronics', packed: false, reason: 'Heavy GPS navigation and photography' },
      { id: 'pk-4', item: 'Passports / IDs & digital backup copies', category: 'essentials', packed: true, reason: 'Mandatory documentation for travel' },
      { id: 'pk-5', item: 'Weather-appropriate outer shell / light jacket', category: 'clothing', packed: false, reason: 'Evenings can be breezy' },
      { id: 'pk-6', item: 'Compact daypack or crossbody anti-theft bag', category: 'gear', packed: false, reason: 'Daily essentials, water bottle, and souvenirs' }
    ],
    hiddenGems: [
      {
        name: `Secret Courtyards of ${request.destination}`,
        description: `Hidden quiet courtyards away from main tourist arteries with local artisans and quiet cafes.`,
        location: `Historic Quarter`,
        whyVisit: 'Peaceful oasis to relax between sightseeing blocks.'
      },
      {
        name: `Panoramic Rooftop / Scenic Hilltop`,
        description: `Lesser-known vantage point offering unobstructed views of the city horizon at twilight.`,
        location: `Elevated Lookout District`,
        whyVisit: 'Spectacular sunset photos without massive crowds.'
      }
    ]
  };
}

// POST /api/plan-trip: Generate complete AI trip plan
app.post('/api/plan-trip', async (req, res) => {
  const request: TripPlanRequest = req.body;

  if (!request.destination) {
    return res.status(400).json({ error: 'Destination is required' });
  }

  const ai = getGenAI();

  if (!ai) {
    console.log('[API] No GEMINI_API_KEY found. Serving intelligent fallback trip.');
    const fallback = generateFallbackTrip(request);
    return res.json(fallback);
  }

  try {
    const prompt = `You are a world-class travel curator and local guide. Create an exceptional, realistic, highly detailed travel itinerary for the following trip request:

Destination: "${request.destination}"
Departure Origin: "${request.origin || 'Flexible'}"
Duration: ${request.durationDays || 3} days
Travel Style: ${request.travelStyle || 'balanced'}
Group Type: ${request.groupType || 'solo'}
Budget Level: ${request.budgetLevel || 'moderate'}
Preferred Currency: ${request.currency || 'USD'}
Pace: ${request.pace || 'moderate'}
Interests: ${(request.interests && request.interests.length > 0) ? request.interests.join(', ') : 'Must-see landmarks, authentic local food, hidden spots'}
Special Notes / Requests: "${request.specialNotes || 'None'}"

CRITICAL INSTRUCTIONS:
1. Provide a realistic, meticulously organized day-by-day itinerary for EXACTLY ${request.durationDays} day(s).
2. For each day, include 3 distinct activities (morning, afternoon, evening) with exact locations, estimated duration, cost estimate in ${request.currency}, realistic coordinates (lat/lng for the destination), category, and a valuable "insiderTip".
3. For each day, include 2 dining recommendations (lunch and dinner) with real restaurant names or renowned local establishments, cuisine, highlight dish, price range, and location.
4. Provide comprehensive overview data: best time to visit, weather forecast, real coordinates (lat/lng) of the destination city center, 4 cultural etiquette tips, transit tips, and emergency contacts.
5. Provide a realistic itemized budget summary in ${request.currency}.
6. Provide a categorized smart packing list tailored specifically to ${request.destination} climate, season, and planned activities.
7. Include 2-3 genuine "hidden gems" (secret viewpoints, lesser-known gardens, underground spots).

Output ONLY valid JSON matching this schema:
{
  "overview": {
    "destination": "City Name",
    "country": "Country Name",
    "tagline": "Inspiring one-line tagline",
    "summary": "2-3 sentence evocative summary of the trip",
    "bestTimeToVisit": "Best months and reason",
    "weatherForecast": "Expected temperature and conditions",
    "localEtiquette": ["string", "string", "string", "string"],
    "transitTips": ["string", "string", "string"],
    "emergencyInfo": {
      "police": "number",
      "ambulance": "number",
      "general": "number"
    },
    "currencyTips": "Tipping advice, cards vs cash",
    "coordinates": { "lat": 0.0, "lng": 0.0 }
  },
  "days": [
    {
      "dayNumber": 1,
      "title": "Short evocative day title",
      "theme": "Day theme or focus",
      "activities": [
        {
          "id": "act-1-1",
          "timeBlock": "morning",
          "startTime": "09:00 AM",
          "name": "Activity name",
          "description": "Engaging description",
          "location": "Specific street, neighborhood, or venue",
          "coordinates": { "lat": 0.0, "lng": 0.0 },
          "estimatedDuration": "2 hours",
          "estimatedCost": 20,
          "category": "sightseeing",
          "insiderTip": "Secret tip or timing advice"
        }
      ],
      "dining": [
        {
          "name": "Restaurant Name",
          "mealType": "lunch",
          "cuisine": "Cuisine style",
          "priceRange": "$$",
          "highlightDish": "Signature dish",
          "location": "Neighborhood",
          "notes": "Ambiance and booking tip"
        }
      ],
      "dailyBudgetEstimate": 100,
      "dailyTip": "Helpful tip for this specific day"
    }
  ],
  "budget": {
    "currency": "${request.currency || 'USD'}",
    "totalEstimatedCost": 1200,
    "costPerPerson": 600,
    "categories": {
      "accommodation": 500,
      "foodAndDining": 400,
      "activities": 200,
      "localTransit": 60,
      "emergencyBuffer": 40
    },
    "moneySavingTips": ["tip 1", "tip 2", "tip 3"]
  },
  "packingList": [
    {
      "id": "pk-1",
      "item": "Item description",
      "category": "clothing",
      "packed": false,
      "reason": "Why it is essential here"
    }
  ],
  "hiddenGems": [
    {
      "name": "Spot name",
      "description": "What makes it special",
      "location": "Where to find it",
      "whyVisit": "Why visit"
    }
  ]
}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        temperature: 0.7,
      },
    });

    const parsed = cleanJsonResponse(response.text || '{}');

    // Ensure all days have complete IDs and categories
    const days = (parsed.days || []).map((day: any, dIdx: number) => ({
      ...day,
      dayNumber: dIdx + 1,
      activities: (day.activities || []).map((act: any, aIdx: number) => ({
        ...act,
        id: act.id || `act-${dIdx + 1}-${aIdx + 1}`,
        timeBlock: act.timeBlock || (aIdx === 0 ? 'morning' : aIdx === 1 ? 'afternoon' : 'evening'),
        category: act.category || 'sightseeing',
        completed: false,
      })),
      dining: (day.dining || []).map((d: any) => ({
        ...d,
        mealType: d.mealType || 'lunch',
        priceRange: d.priceRange || '$$',
      })),
    }));

    // Ensure packing list has IDs
    const packingList = (parsed.packingList || []).map((p: any, idx: number) => ({
      ...p,
      id: p.id || `p-${idx + 1}`,
      packed: Boolean(p.packed),
      category: p.category || 'essentials',
    }));

    const tripPlan: TripPlan = {
      id: `trip-${Date.now()}`,
      createdAt: new Date().toISOString(),
      request,
      overview: {
        ...parsed.overview,
        destination: parsed.overview?.destination || request.destination,
        coordinates: parsed.overview?.coordinates || { lat: 35.6762, lng: 139.6503 },
      },
      days,
      budget: parsed.budget || {
        currency: request.currency || 'USD',
        totalEstimatedCost: 1000,
        costPerPerson: 1000,
        categories: { accommodation: 500, foodAndDining: 300, activities: 150, localTransit: 50, emergencyBuffer: 50 },
        moneySavingTips: [],
      },
      packingList,
      hiddenGems: parsed.hiddenGems || [],
    };

    return res.json(tripPlan);
  } catch (err: any) {
    console.error('[API] Error calling Gemini API:', err);
    console.log('[API] Falling back to intelligent generated trip.');
    const fallback = generateFallbackTrip(request);
    return res.json(fallback);
  }
});

// POST /api/chat-trip: Real-time AI travel assistant chat
app.post('/api/chat-trip', async (req, res) => {
  const { trip, message, history } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  const ai = getGenAI();

  if (!ai) {
    return res.json({
      reply: `I'd love to help! For ${trip?.overview?.destination || 'your destination'}, I recommend checking out local neighborhood cafes and checking weather forecasts in the morning. (Note: attach your Gemini API key in Settings > Secrets for real-time model responses!)`,
      actionableSuggestions: [
        'What should I do if it rains?',
        'Suggest best cafes near Day 1',
        'How to book public transit?'
      ]
    });
  }

  try {
    const prompt = `You are a friendly, expert personal travel assistant helping a traveler with their trip to ${trip?.overview?.destination || 'their destination'}.
Here is their current trip context:
- Destination: ${trip?.overview?.destination}, ${trip?.overview?.country}
- Duration: ${trip?.days?.length || 3} days
- Travel Style: ${trip?.request?.travelStyle}
- Budget: ${trip?.budget?.totalEstimatedCost} ${trip?.budget?.currency}
- Days Summary: ${trip?.days?.map((d: any) => `Day ${d.dayNumber}: ${d.title}`).join('; ')}

User Question: "${message}"

Respond concisely (2-3 paragraphs max), offering practical, insider advice, specific recommendations, or addressing changes. Also provide 3 short relevant follow-up suggestions.

Output in JSON format:
{
  "reply": "Your helpful answer in markdown",
  "actionableSuggestions": ["Follow-up question 1", "Follow-up question 2", "Follow-up question 3"]
}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        temperature: 0.7,
      },
    });

    const parsed = cleanJsonResponse(response.text || '{}');
    return res.json({
      reply: parsed.reply || "I'm here to help you refine your trip!",
      actionableSuggestions: parsed.actionableSuggestions || [
        'Recommend romantic dinner spots',
        'Tips for packing light',
        'Local public transit pass options'
      ]
    });
  } catch (err: any) {
    console.error('[API] Error in chat-trip:', err);
    return res.json({
      reply: `For ${trip?.overview?.destination || 'your trip'}, be sure to plan your days by neighborhood to minimize transit time, and make dinner reservations 1-2 days in advance!`,
      actionableSuggestions: [
        'Best scenic spots',
        'Local food specialties',
        'Rainy day options'
      ]
    });
  }
});

// POST /api/suggest-alternatives: Suggest activity swap
app.post('/api/suggest-alternatives', async (req, res) => {
  const { destination, currentActivity, timeBlock, category, currency } = req.body;
  const ai = getGenAI();

  if (!ai) {
    return res.json({
      alternatives: [
        {
          name: `Scenic Botanical Gardens & Tea Pavilion`,
          description: `A tranquil alternative perfect for relaxing amidst curated plant species and traditional ponds.`,
          estimatedCost: 12,
          estimatedDuration: '2 hours',
          insiderTip: 'Visit in late morning for pleasant shade and photography.'
        },
        {
          name: `Artisan Craft & Vintage Indoor Arcade`,
          description: `Indoor market showcasing local ceramics, textiles, and specialty coffee.`,
          estimatedCost: 0,
          estimatedDuration: '1.5 hours',
          insiderTip: 'Great rainy-day alternative with lots of boutique stalls.'
        }
      ]
    });
  }

  try {
    const prompt = `Traveler in ${destination} wants alternative suggestions to replace their ${timeBlock} activity "${currentActivity}".
Provide 3 exciting, high-quality alternatives in ${destination}.
Output in JSON:
{
  "alternatives": [
    {
      "name": "Activity Name",
      "description": "Compelling 1-2 sentence description",
      "estimatedCost": 20,
      "estimatedDuration": "2 hours",
      "category": "culture",
      "insiderTip": "Helpful insider tip"
    }
  ]
}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        temperature: 0.7,
      },
    });

    const parsed = cleanJsonResponse(response.text || '{}');
    return res.json(parsed);
  } catch (err) {
    console.error('[API] suggest-alternatives error:', err);
    return res.json({
      alternatives: [
        {
          name: `Local Heritage Museum & Panoramic Terrace`,
          description: `Explore regional history with an observation terrace overlooking the city.`,
          estimatedCost: 15,
          estimatedDuration: '2 hours',
          insiderTip: 'Terrace entry included in general admission.'
        }
      ]
    });
  }
});

// Vite middleware in development vs static files in production
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[SERVER] AI Trip Planner server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
