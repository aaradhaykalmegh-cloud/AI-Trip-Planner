export type TravelStyle =
  | 'budget'
  | 'balanced'
  | 'luxury'
  | 'adventure'
  | 'cultural'
  | 'foodie'
  | 'relaxed'
  | 'family';

export type GroupType = 'solo' | 'couple' | 'friends' | 'family';
export type BudgetLevel = 'budget' | 'moderate' | 'luxury';
export type TripPace = 'relaxed' | 'moderate' | 'packed';

export interface TripPlanRequest {
  destination: string;
  origin?: string;
  startDate?: string;
  endDate?: string;
  durationDays: number;
  travelStyle: TravelStyle;
  groupType: GroupType;
  budgetLevel: BudgetLevel;
  currency: string;
  pace: TripPace;
  interests: string[];
  specialNotes?: string;
}

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface ActivityItem {
  id: string;
  timeBlock: 'morning' | 'afternoon' | 'evening';
  startTime?: string;
  name: string;
  description: string;
  location: string;
  coordinates?: Coordinates;
  estimatedDuration: string;
  estimatedCost: number;
  category: 'sightseeing' | 'food' | 'nature' | 'culture' | 'adventure' | 'shopping' | 'relaxation';
  insiderTip?: string;
  completed?: boolean;
}

export interface DiningSpot {
  name: string;
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  cuisine: string;
  priceRange: '$' | '$$' | '$$$' | '$$$$';
  highlightDish: string;
  location: string;
  notes: string;
}

export interface DayItinerary {
  dayNumber: number;
  title: string;
  theme: string;
  date?: string;
  activities: ActivityItem[];
  dining: DiningSpot[];
  dailyBudgetEstimate: number;
  dailyTip?: string;
}

export interface TripOverview {
  destination: string;
  country: string;
  tagline: string;
  summary: string;
  bestTimeToVisit: string;
  weatherForecast: string;
  localEtiquette: string[];
  transitTips: string[];
  emergencyInfo: {
    police: string;
    ambulance: string;
    general: string;
  };
  currencyTips: string;
  coordinates: Coordinates;
}

export interface BudgetSummary {
  currency: string;
  totalEstimatedCost: number;
  costPerPerson: number;
  categories: {
    accommodation: number;
    foodAndDining: number;
    activities: number;
    localTransit: number;
    emergencyBuffer: number;
  };
  moneySavingTips: string[];
}

export interface PackingItem {
  id: string;
  item: string;
  category: 'essentials' | 'clothing' | 'electronics' | 'toiletries' | 'gear' | 'destination-specific';
  packed: boolean;
  reason?: string;
}

export interface HiddenGem {
  name: string;
  description: string;
  location: string;
  whyVisit: string;
}

export interface TripPlan {
  id: string;
  createdAt: string;
  request: TripPlanRequest;
  overview: TripOverview;
  days: DayItinerary[];
  budget: BudgetSummary;
  packingList: PackingItem[];
  hiddenGems: HiddenGem[];
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  actionableSuggestions?: string[];
}

export interface CustomExpense {
  id: string;
  title: string;
  amount: number;
  category: string;
  date?: string;
}
