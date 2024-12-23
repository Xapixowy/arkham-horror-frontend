import { LandingCarouselItem } from '@Pages/landing/landing-page/_types/landing-carousel-item.type';
import { CarouselResponsiveOptions } from 'primeng/carousel';

export const LANDING_PAGE_CONFIG: {
  carousel: {
    items: LandingCarouselItem[];
    autoplayInterval: number;
    responsiveOptions: CarouselResponsiveOptions[];
  };
} = {
  carousel: {
    items: [
      {
        image: 'images/character-page.webp',
        title: '_LandingPage.Character Management',
        description:
          '_LandingPage.Track your characters in an intuitive and interactive way! The app allows you to manage their attributes, stats, and game phase changes – all synchronized in real-time with other players in the session. Viewing character details and stats has never been easier!',
      },
      {
        image: 'images/equipment-page.webp',
        title: '_LandingPage.Inventory Management',
        description:
          "_LandingPage.Keep full control over your character's resources! Easily add and edit money, clues, and inventory cards. Practicality and intuitiveness in one place!",
      },
      {
        image: 'images/players-page.webp',
        title: '_LandingPage.View Other Players',
        description:
          '_LandingPage.See what’s happening with your friends’ characters! The app lets you view the details and stats of other players, including their money, clues, and character attributes – perfect for teamwork or a little friendly competition!',
      },
      {
        image: 'images/history-page.webp',
        title: '_LandingPage.Game History',
        description:
          '_LandingPage.Revisit your epic adventures! Browse the history of past sessions, their game phases, character details, and stats – with the option to rejoin (for logged-in players). Your story is always at your fingertips!',
      },
      {
        image: 'images/statistics-page.webp',
        title: '_LandingPage.Account Statistics',
        description:
          '_LandingPage.Track your progress like a pro! The app provides detailed insights into your account stats: money earned and spent, clues, cards, stamina, or sanity gained and lost. Check how many sessions you’ve played and which characters you’ve led!',
      },
    ],
    autoplayInterval: 5000,
    responsiveOptions: [
      {
        breakpoint: '1920px',
        numVisible: 4,
        numScroll: 1,
      },
      {
        breakpoint: '1400px',
        numVisible: 3,
        numScroll: 1,
      },
      {
        breakpoint: '1000px',
        numVisible: 2,
        numScroll: 1,
      },
      {
        breakpoint: '768px',
        numVisible: 1,
        numScroll: 1,
      },
    ],
  },
};
