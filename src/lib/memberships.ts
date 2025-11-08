export interface Membership {
  id: string;
  name: string;
  price: number;
  period: "month" | "year";
  features: string[];
  popular?: boolean;
  color: string;
}

export const memberships: Membership[] = [
  {
    id: "1",
    name: "Basic Warrior",
    price: 29,
    period: "month",
    color: "from-gray-700 to-gray-900",
    features: [
      "Access to all workout plans",
      "Basic nutrition guidance",
      "Progress tracking",
      "Community support",
    ],
  },
  {
    id: "2",
    name: "Elite Spartan",
    price: 59,
    period: "month",
    popular: true,
    color: "from-red-600 to-red-800",
    features: [
      "Everything in Basic",
      "Personalized diet plans",
      "Advanced analytics",
      "1-on-1 coaching session (monthly)",
      "Priority support",
      "Exclusive challenges",
    ],
  },
  {
    id: "3",
    name: "Champion Legend",
    price: 499,
    period: "year",
    color: "from-yellow-600 to-yellow-800",
    features: [
      "Everything in Elite",
      "Weekly 1-on-1 coaching",
      "Custom meal prep plans",
      "Supplement recommendations",
      "Video form analysis",
      "VIP community access",
      "2 months free",
    ],
  },
];
