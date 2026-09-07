# UnilagMarket 🛍️

A campus marketplace web app built for UNILAG students to buy and sell items with fellow students — books, electronics, food, fashion, and more.

Built as a frontend project using React, with mock auth and in-browser data persistence (no backend yet).

## Features

- **Browse & discover** — searchable, filterable product grid by category
- **Product details** — full item view with price, description, seller info, and direct contact (phone/WhatsApp)
- **Cart & checkout** — add to cart, adjust quantities, mock checkout flow with order confirmation
- **Sell** — post a listing with a real photo upload, price, category, and contact info
- **My Listings** — view and delete your own posted items
- **Auth** — sign up, log in, log out, with sessions that persist across refreshes
- **Wishlist** — save favorite items to a per-user wishlist
- **Profile** — view account details and log out

## Tech Stack

- React (via Vite)
- React Router
- Context API for state management (cart, products, auth, wishlist)
- Plain CSS (custom design system — no UI framework)

## Getting Started

```bash
git clone https://github.com/YOUR_USERNAME/unilag-market.git
cd unilag-market
npm install
npm run dev
```

Then open `http://localhost:5173` in your browser.

## ⚠️ Important Notes

This is a **frontend-only MVP** — there is no backend or real database yet:

- **Auth is mocked.** Accounts and passwords are stored in the browser's `localStorage`, in plain text. This is fine for local demo purposes but is **not secure** and should never be used as-is in a production app with real users.
- **Data doesn't persist across devices/browsers.** Listings, cart, and wishlist data live in browser state/`localStorage`, so they reset if you clear browser data or switch devices.
- **Images are stored as Base64** in `localStorage` rather than uploaded to real file storage — fine for a demo, but not scalable for many/large images.

## Roadmap / Known Limitations

- Cart quantity input doesn't currently guard against 0 or negative values
- No delete confirmation prompt on My Listings
- Not yet tested/optimized for mobile screens
- No real backend, database, or payment integration

## License

This project is for educational/demo purposes.
