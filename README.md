# Himanshu Verma - Portfolio Website

A modern, aesthetic portfolio website with 3D effects and smooth transitions built with Next.js, Chakra UI, Framer Motion, and React Three Fiber.

## 🚀 Features

- **3D Hero Section** with animated camera journey
- **Smooth Scroll Navigation** with parallax effects
- **Interactive 3D Cards** in Skills and Experience sections
- **Portfolio Video Gallery** with modal playback
- **Certificates & Testimonials** sections
- **Contact Form** with social media links
- **Fully Responsive** design
- **Modern Animations** using Framer Motion

## 🛠️ Tech Stack

- **Next.js 16** (App Router)
- **TypeScript**
- **Chakra UI v3** - Component library
- **Framer Motion** - Animations
- **React Three Fiber** - 3D graphics
- **Drei** - R3F helpers
- **React Icons** - Icon library

## 📦 Installation

```bash
npm install
```

## 🏃 Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🏗️ Build

```bash
npm run build
npm start
```

## 📁 Project Structure

```
portfolio-website/
├── app/
│   ├── components/
│   │   ├── Navigation.tsx       # Top navigation bar
│   │   ├── HeroSection.tsx       # Hero with 3D scene
│   │   ├── AboutSection.tsx      # About me section
│   │   ├── SkillsSection.tsx     # Skills & talents
│   │   ├── ExperienceSection.tsx # Collaborations
│   │   ├── PortfolioSection.tsx  # Video gallery
│   │   ├── CertificatesSection.tsx # Certificates & testimonials
│   │   ├── ContactSection.tsx    # Contact form
│   │   └── Footer.tsx            # Footer
│   ├── layout.tsx
│   ├── page.tsx                  # Main page
│   ├── providers.tsx             # Chakra UI provider
│   └── globals.css
└── public/                        # Static assets
```

## 📝 Customization

### Adding Video Links

Edit `app/components/PortfolioSection.tsx` and update the `portfolioItems` array with actual video URLs:

```typescript
{
  title: 'Hindi Introduction',
  videoUrl: 'YOUR_YOUTUBE_OR_VIMEO_URL',
  // ...
}
```

### Updating Content

- Personal info: `app/components/AboutSection.tsx`
- Skills: `app/components/SkillsSection.tsx`
- Collaborations: `app/components/ExperienceSection.tsx`
- Contact info: `app/components/ContactSection.tsx`

## 🎨 Design Features

- **Color Scheme**: Dark theme with gold/yellow accents
- **3D Effects**: Subtle 3D rotations and transforms on hover
- **Animations**: Smooth scroll-triggered animations
- **Typography**: Clean, modern font hierarchy
- **Responsive**: Mobile-first design approach

## 📧 Contact

For questions or customization, contact:
- Email: himanshuverma1july2003@gmail.com
- Phone: +91 99972 54939

## 📄 License

This project is private and proprietary.
