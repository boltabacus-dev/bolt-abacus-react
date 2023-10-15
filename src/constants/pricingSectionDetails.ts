export const pricingPlans = [
  {
    title: 'Super 30 Edition',
    description: '1-5 levels or 6-10 levels',
    currency: 'INR',
    symbol: '₹',
    price: 300,
    total: 18000,
    frequency: '/session',
    features: [
      '30 Students per batch',
      '4 sessions for 2 hours/month',
      'Duration - 15 months',
      'Homework support (Weekdays 5pm-8pm)',
    ],
    mostPopular: false,
  },
  {
    title: '15 Rangers Squad',
    description: '1-5 levels or 6-10 levels',
    currency: 'INR',
    symbol: '₹',
    price: 400,
    total: 24000,
    frequency: '/session',
    features: [
      '15 Students per batch',
      '4 sessions for 2 hours/month',
      'Duration - 15 months',
      'Homework support (Weekdays 5pm-8pm)',
    ],
    mostPopular: true,
  },
  {
    title: 'Perfect X',
    description: '1-5 levels or 6-10 levels',
    currency: 'INR',
    symbol: '₹',
    price: 550,
    total: 33000,
    frequency: '/session',
    features: [
      '10 Students per batch',
      '4 sessions for 2 hours/month',
      'Duration - 15 months',
      'Homework support (Weekdays 5pm-8pm)',
    ],
    mostPopular: false,
  },
];

export const PricingPlans = typeof pricingPlans;
