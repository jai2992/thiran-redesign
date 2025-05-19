// Image configuration file with free-to-use images from Unsplash and Pexels
// These images are licensed for free use under their respective licenses

export const images = {
  // Hero section images
  hero: {
    main: "https://images.unsplash.com/photo-1531058020387-3be344556be6?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1200",
    overlay: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1200",
  },
  
  // Event categories
  events: {
    hackathon: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=800",
    robotics: "https://images.unsplash.com/photo-1518314916428-7b1c04268e2a?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=800",
    dance: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=800",
    music: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=800",
    gaming: "https://images.unsplash.com/photo-1511512578047-dfb367046420?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=800",
    workshops: "https://images.unsplash.com/photo-1531496681078-27dc2a596bc6?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=800",
  },
  
  // Celebrity images
  celebrities: {
    speaker1: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=400",
    speaker2: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=400",
    speaker3: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=400",
    performer1: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=400",
    performer2: "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=400",
  },
  
  // Background and decorative images
  backgrounds: {
    about: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1200",
    contact: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1200",
    schedule: "https://images.unsplash.com/photo-1506784365847-bbad939e9335?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1200",
    register: "https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1200",
  },
  
  // Logo placeholders (optional, can be replaced with actual logos)
  logos: {
    sponsors: [
      "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=200",
      "https://images.unsplash.com/photo-1614680376739-414d95ff43df?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=200",
      "https://images.unsplash.com/photo-1563694983011-6f4d90358083?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=200",
    ],
  }
}

// Function to get a random image for a specific category
export function getRandomImage(category: keyof typeof images): string {
  const imageCategory = images[category];
  if (typeof imageCategory === 'string') return imageCategory;
  
  const keys = Object.keys(imageCategory);
  const randomKey = keys[Math.floor(Math.random() * keys.length)];
  return imageCategory[randomKey as keyof typeof imageCategory];
}
