# Blog Project — Claude Context

## About the User
- Complete beginner to React, learning while building
- Knows nothing about React yet — explain concepts while coding
- Wants to learn TypeScript later, starting with JavaScript for now
- Teaching style: explain concepts as we go, don't just give code

## Project Overview
- **Frontend:** React (this folder)
- **Backend:** WordPress REST API (handled by someone else, for later)
- WordPress will serve posts/categories via its REST API, React will fetch and display them

## Tech Stack
- React + Vite
- react-router-dom (already installed)
- JavaScript (not TypeScript yet)

## Pages
| Route | Component | Status |
|-------|-----------|--------|
| `/` | Home | skeleton done |
| `/blog` | Blog | skeleton done |
| `/about` | About | skeleton done |
| `/contact` | Contact | skeleton done |
| `/privacy` | PrivacyPolicy | skeleton done |

## Folder Structure
```
src/
├── components/
│   ├── Navbar.jsx     ✅ done — uses Link from react-router-dom
│   └── Footer.jsx     ✅ done
├── pages/
│   ├── Home.jsx       ✅ skeleton
│   ├── Blog.jsx       ✅ skeleton
│   ├── About.jsx      ✅ skeleton
│   ├── Contact.jsx    ✅ skeleton
│   └── PrivacyPolicy.jsx ✅ skeleton
├── App.jsx            ✅ BrowserRouter + Routes + Navbar + Footer
└── main.jsx
```

## Navbar Plan
- Links: Home, Blog, About, Contact Us, Privacy Policy
- Blog link has a dropdown on hover showing categories
- Categories have subcategories on hover (nested dropdown)
- Categories come from WordPress dynamically later

## What We Were Doing
Footer was just added. Next step: style the Navbar and add the dropdown for categories.

## Key Concepts Taught So Far
- Components = functions that return JSX
- JSX = HTML-like syntax inside JavaScript
- `export default` = makes component usable in other files
- `import` = brings in components/libraries
- React Router: `BrowserRouter`, `Routes`, `Route`, `Link`
- `Link` vs `<a>` — Link doesn't reload the page
- Vite HMR — browser updates instantly on save
