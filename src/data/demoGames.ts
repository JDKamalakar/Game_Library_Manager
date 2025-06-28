import { EnhancedGame } from '../types/steam';

export const demoSteamGames: EnhancedGame[] = [
  {
    id: 'steam-1',
    appid: 1091500,
    name: 'Cyberpunk 2077',
    platform: 'steam',
    coverImage: 'https://images.pexels.com/photos/735911/pexels-photo-735911.jpeg?auto=compress&cs=tinysrgb&w=400',
    headerImage: 'https://images.pexels.com/photos/735911/pexels-photo-735911.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'An open-world, action-adventure RPG set in the dark future of Night City.',
    genres: ['RPG', 'Action', 'Open World'],
    categories: ['Single-player', 'Steam Achievements', 'Full controller support'],
    developer: 'CD Projekt Red',
    publisher: 'CD Projekt',
    releaseDate: '2020-12-10',
    playtime: 4320,
    lastPlayed: '2024-01-15T10:30:00Z',
    installed: true,
    downloading: false,
    fileSize: 70000,
    platforms: { windows: true, mac: false, linux: false },
    price: { current: 2999, original: 5999, discount: 50, formatted: '$29.99' },
    userRating: 8.5,
    metacriticScore: 86,
    achievements: { total: 44, unlocked: 23 },
    features: ['Single-player', 'Steam Achievements', 'Full controller support', 'Steam Cloud'],
    tags: ['Futuristic', 'Mature', 'Character Customization', 'First-Person']
  },
  {
    id: 'steam-2',
    appid: 292030,
    name: 'The Witcher 3: Wild Hunt',
    platform: 'steam',
    coverImage: 'https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=400',
    headerImage: 'https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'A story-driven open world RPG set in a visually stunning fantasy universe.',
    genres: ['RPG', 'Action', 'Fantasy'],
    categories: ['Single-player', 'Steam Achievements', 'Full controller support', 'Steam Trading Cards'],
    developer: 'CD Projekt Red',
    publisher: 'CD Projekt',
    releaseDate: '2015-05-19',
    playtime: 8640,
    lastPlayed: '2024-01-12T15:45:00Z',
    installed: true,
    downloading: false,
    fileSize: 50000,
    platforms: { windows: true, mac: true, linux: true },
    price: { current: 1999, original: 3999, discount: 50, formatted: '$19.99' },
    userRating: 9.3,
    metacriticScore: 93,
    achievements: { total: 78, unlocked: 45 },
    features: ['Single-player', 'Steam Achievements', 'Full controller support', 'Steam Cloud', 'Steam Trading Cards'],
    tags: ['Fantasy', 'Open World', 'Story Rich', 'Medieval']
  },
  {
    id: 'steam-3',
    appid: 1145360,
    name: 'Hades',
    platform: 'steam',
    coverImage: 'https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'A rogue-like dungeon crawler from the creators of Bastion and Transistor.',
    genres: ['Action', 'Rogue-like', 'Indie'],
    categories: ['Single-player', 'Steam Achievements', 'Full controller support'],
    developer: 'Supergiant Games',
    publisher: 'Supergiant Games',
    releaseDate: '2020-09-17',
    playtime: 2160,
    lastPlayed: '2024-01-10T20:15:00Z',
    installed: false,
    downloading: true,
    downloadProgress: 65,
    fileSize: 15000,
    platforms: { windows: true, mac: true, linux: false },
    price: { current: 2499, original: 2499, discount: 0, formatted: '$24.99' },
    userRating: 9.0,
    metacriticScore: 93,
    achievements: { total: 49, unlocked: 0 },
    features: ['Single-player', 'Steam Achievements', 'Full controller support', 'Great Soundtrack'],
    tags: ['Indie', 'Great Soundtrack', 'Difficult', 'Mythology']
  },
  {
    id: 'steam-4',
    appid: 1174180,
    name: 'Red Dead Redemption 2',
    platform: 'steam',
    coverImage: 'https://images.pexels.com/photos/371589/pexels-photo-371589.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'An epic tale of life in America at the dawn of the modern age.',
    genres: ['Action', 'Adventure', 'Western'],
    categories: ['Single-player', 'Multi-player', 'Steam Achievements', 'Full controller support'],
    developer: 'Rockstar Games',
    publisher: 'Rockstar Games',
    releaseDate: '2019-11-05',
    playtime: 5760,
    lastPlayed: '2024-01-08T14:20:00Z',
    installed: true,
    downloading: false,
    fileSize: 120000,
    platforms: { windows: true, mac: false, linux: false },
    price: { current: 5999, original: 5999, discount: 0, formatted: '$59.99' },
    userRating: 9.5,
    metacriticScore: 96,
    achievements: { total: 52, unlocked: 28 },
    features: ['Single-player', 'Multi-player', 'Steam Achievements', 'Full controller support', 'Online Co-op'],
    tags: ['Open World', 'Western', 'Story Rich', 'Horses']
  }
];

export const demoEpicGames: EnhancedGame[] = [
  {
    id: 'epic-1',
    name: 'Fortnite',
    platform: 'epic',
    coverImage: 'https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Battle Royale game with building mechanics.',
    genres: ['Battle Royale', 'Action', 'Shooter'],
    categories: ['Multi-player', 'Free to Play', 'Cross Platform'],
    developer: 'Epic Games',
    publisher: 'Epic Games',
    releaseDate: '2017-07-25',
    playtime: 12000,
    lastPlayed: '2024-01-16T18:30:00Z',
    installed: true,
    downloading: false,
    fileSize: 30000,
    platforms: { windows: true, mac: true, linux: false },
    price: { current: 0, original: 0, discount: 0, formatted: 'Free' },
    userRating: 8.2,
    achievements: { total: 0, unlocked: 0 },
    features: ['Multi-player', 'Cross Platform', 'Free to Play', 'Battle Royale'],
    tags: ['Battle Royale', 'Building', 'Competitive', 'Free to Play']
  },
  {
    id: 'epic-2',
    name: 'Control',
    platform: 'epic',
    coverImage: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'A supernatural action-adventure game set in a secret government agency.',
    genres: ['Action', 'Supernatural', 'Mystery'],
    categories: ['Single-player', 'Controller Support'],
    developer: 'Remedy Entertainment',
    publisher: '505 Games',
    releaseDate: '2019-08-27',
    playtime: 960,
    installed: false,
    downloading: false,
    fileSize: 42000,
    platforms: { windows: true, mac: false, linux: false },
    price: { current: 2999, original: 2999, discount: 0, formatted: '$29.99' },
    userRating: 8.2,
    achievements: { total: 0, unlocked: 0 },
    features: ['Single-player', 'Controller Support', 'Ray Tracing'],
    tags: ['Supernatural', 'Great Graphics', 'Mystery', 'Telekinesis']
  }
];

export const demoGogGames: EnhancedGame[] = [
  {
    id: 'gog-1',
    name: 'The Witcher 3: Wild Hunt GOTY',
    platform: 'gog',
    coverImage: 'https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Complete edition with all DLCs included.',
    genres: ['RPG', 'Action', 'Fantasy'],
    categories: ['Single-player', 'DRM-Free'],
    developer: 'CD Projekt Red',
    publisher: 'CD Projekt',
    releaseDate: '2016-08-30',
    playtime: 15000,
    lastPlayed: '2024-01-14T12:00:00Z',
    installed: true,
    downloading: false,
    fileSize: 55000,
    platforms: { windows: true, mac: true, linux: true },
    price: { current: 1999, original: 4999, discount: 60, formatted: '$19.99' },
    userRating: 9.5,
    achievements: { total: 78, unlocked: 52 },
    features: ['Single-player', 'DRM-Free', 'Includes DLC'],
    tags: ['Fantasy', 'Open World', 'Story Rich', 'DRM-Free']
  },
  {
    id: 'gog-2',
    name: 'Disco Elysium - The Final Cut',
    platform: 'gog',
    coverImage: 'https://images.pexels.com/photos/275033/pexels-photo-275033.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'A groundbreaking role playing game with unprecedented freedom of choice.',
    genres: ['RPG', 'Mystery', 'Indie'],
    categories: ['Single-player', 'DRM-Free'],
    developer: 'ZA/UM',
    publisher: 'ZA/UM',
    releaseDate: '2021-03-30',
    playtime: 3600,
    lastPlayed: '2024-01-05T11:10:00Z',
    installed: true,
    downloading: false,
    fileSize: 22000,
    platforms: { windows: true, mac: true, linux: false },
    price: { current: 3999, original: 3999, discount: 0, formatted: '$39.99' },
    userRating: 9.2,
    achievements: { total: 0, unlocked: 0 },
    features: ['Single-player', 'DRM-Free', 'Voice Acting'],
    tags: ['Story Rich', 'Choices Matter', 'Detective', 'Isometric']
  }
];

export const demoOriginGames: EnhancedGame[] = [
  {
    id: 'origin-1',
    name: 'Battlefield 2042',
    platform: 'origin',
    coverImage: 'https://images.pexels.com/photos/735911/pexels-photo-735911.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'A first-person shooter set in the near future.',
    genres: ['Shooter', 'Action', 'Multiplayer'],
    categories: ['Multi-player', 'Online', 'Controller Support'],
    developer: 'DICE',
    publisher: 'Electronic Arts',
    releaseDate: '2021-11-19',
    playtime: 2400,
    lastPlayed: '2024-01-13T16:45:00Z',
    installed: true,
    downloading: false,
    fileSize: 80000,
    platforms: { windows: true, mac: false, linux: false },
    price: { current: 5999, original: 5999, discount: 0, formatted: '$59.99' },
    userRating: 6.8,
    achievements: { total: 0, unlocked: 0 },
    features: ['Multi-player', 'Online', 'Controller Support', '128 Players'],
    tags: ['Shooter', 'Multiplayer', 'War', 'Futuristic']
  }
];

export const demoUplayGames: EnhancedGame[] = [
  {
    id: 'uplay-1',
    name: 'Assassin\'s Creed Valhalla',
    platform: 'uplay',
    coverImage: 'https://images.pexels.com/photos/371589/pexels-photo-371589.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Become Eivor, a legendary Viking raider.',
    genres: ['Action', 'Adventure', 'RPG'],
    categories: ['Single-player', 'Ubisoft Connect'],
    developer: 'Ubisoft Montreal',
    publisher: 'Ubisoft',
    releaseDate: '2020-11-10',
    playtime: 6000,
    lastPlayed: '2024-01-11T14:20:00Z',
    installed: false,
    downloading: false,
    fileSize: 90000,
    platforms: { windows: true, mac: false, linux: false },
    price: { current: 5999, original: 5999, discount: 0, formatted: '$59.99' },
    userRating: 8.1,
    achievements: { total: 0, unlocked: 0 },
    features: ['Single-player', 'Ubisoft Connect', 'Photo Mode'],
    tags: ['Vikings', 'Open World', 'Historical', 'Action RPG']
  }
];

export const getAllDemoGames = (): EnhancedGame[] => [
  ...demoSteamGames,
  ...demoEpicGames,
  ...demoGogGames,
  ...demoOriginGames,
  ...demoUplayGames
];

export const getDemoGamesByPlatform = (platform: string): EnhancedGame[] => {
  switch (platform.toLowerCase()) {
    case 'steam':
      return demoSteamGames;
    case 'epic':
      return demoEpicGames;
    case 'gog':
      return demoGogGames;
    case 'origin':
      return demoOriginGames;
    case 'uplay':
      return demoUplayGames;
    default:
      return [];
  }
};