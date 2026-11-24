export const MARKETS = [
  {
    "code": "GB",
    "tag": "UK",
    "name": "United Kingdom",
    "lon": -1,
    "lat": 53,
    "roas": "3.95×",
    "finding": "A shared negative blocks a priority product term",
    "theme": "Query routing",
    "action": "Remove the conflict at the narrowest scope, then check that the right ad group is eligible."
  },
  {
    "code": "US",
    "tag": "US",
    "name": "United States",
    "lon": -98,
    "lat": 39,
    "roas": "3.50×",
    "finding": "Two purchase actions can steer the same bid",
    "theme": "Measurement",
    "action": "Choose a single validated purchase action for bidding and compare the other as a secondary action."
  },
  {
    "code": "FR",
    "tag": "FR",
    "name": "France",
    "lon": 2.5,
    "lat": 46.3,
    "roas": "2.97×",
    "finding": "French ads send shoppers to an English page",
    "theme": "Landing pages",
    "action": "Route French ads to the equivalent French collection and check ad and asset URLs."
  },
  {
    "code": "NL",
    "tag": "NL",
    "name": "Netherlands",
    "lon": 5.6,
    "lat": 52.4,
    "roas": "4.14×",
    "finding": "Dutch non-brand has room for a capped budget test",
    "theme": "Bidding & budgets",
    "action": "Run a small budget test with a fixed review date, keeping bid targets and match coverage steady."
  },
  {
    "code": "JP",
    "tag": "JP",
    "name": "Japan",
    "lon": 138,
    "lat": 36.4,
    "roas": "3.29×",
    "finding": "AI Max expands into a support journey in Japan",
    "theme": "Query routing",
    "action": "Exclude support destinations and review the query, expanded URL and ad copy together."
  },
  {
    "code": "AU",
    "tag": "AU",
    "name": "Australia",
    "lon": 134.4,
    "lat": -25.6,
    "roas": "3.74×",
    "finding": "Australian outdoor-lighting terms deserve their own readout",
    "theme": "Search terms",
    "action": "Group outdoor queries by product intent and send them to the closest matching page."
  }
] as const;
