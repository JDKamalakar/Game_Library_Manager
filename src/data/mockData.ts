import { Game, GamePlatform, LibraryStats } from '../types/game';

export const mockGames: Game[] = [
  {
    id: '1',
    name: 'Cyberpunk 2077',
    platform: GamePlatform.STEAM,
    coverImage: 'https://images.pexels.com/photos/735911/pexels-photo-735911.jpeg?auto=compress&cs=tinysrgb&w=400',
    headerImage: 'https://images.pexels.com/photos/735911/pexels-photo-735911.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'An open-world, action-adventure RPG set in the dark future of Night City.',
    genres: ['RPG', 'Action', 'Open World'],
    developer: 'CD Projekt Red',
    publisher: 'CD Projekt',
    releaseDate: '2020-12-10',
    playtime: 4320, // 72 hours
    lastPlayed: '2024-01-15T10:30:00Z',
    installed: true,
    metacriticScore: 86,
    userRating: 8.5,
    price: 59.99,
    tags: ['Futuristic', 'Mature', 'Character Customization']
  },
  {
    id: '2',
    name: 'The Witcher 3: Wild Hunt',
    platform: GamePlatform.GOG,
    coverImage: 'https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'A story-driven open world RPG set in a visually stunning fantasy universe.',
    genres: ['RPG', 'Action', 'Fantasy'],
    developer: 'CD Projekt Red',
    publisher: 'CD Projekt',
    releaseDate: '2015-05-19',
    playtime: 8640, // 144 hours
    lastPlayed: '2024-01-12T15:45:00Z',
    installed: true,
    metacriticScore: 93,
    userRating: 9.3,
    price: 39.99,
    tags: ['Fantasy', 'Open World', 'Story Rich']
  },
  {
    id: '3',
    name: 'Hades',
    platform: GamePlatform.EPIC,
    coverImage: 'https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'A rogue-like dungeon crawler from the creators of Bastion and Transistor.',
    genres: ['Action', 'Rogue-like', 'Indie'],
    developer: 'Supergiant Games',
    publisher: 'Supergiant Games',
    releaseDate: '2020-09-17',
    playtime: 2160, // 36 hours
    lastPlayed: '2024-01-10T20:15:00Z',
    installed: false,
    metacriticScore: 93,
    userRating: 9.0,
    price: 24.99,
    tags: ['Indie', 'Great Soundtrack', 'Difficult']
  },
  {
    id: '4',
    name: 'Red Dead Redemption 2',
    platform: GamePlatform.STEAM,
    coverImage: 'https://images.pexels.com/photos/371589/pexels-photo-371589.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'An epic tale of life in America at the dawn of the modern age.',
    genres: ['Action', 'Adventure', 'Western'],
    developer: 'Rockstar Games',
    publisher: 'Rockstar Games',
    releaseDate: '2019-11-05',
    playtime: 5760, // 96 hours
    lastPlayed: '2024-01-08T14:20:00Z',
    installed: true,
    metacriticScore: 96,
    userRating: 9.5,
    price: 59.99,
    tags: ['Open World', 'Western', 'Story Rich']
  },
  {
    id: '5',
    name: 'Disco Elysium',
    platform: GamePlatform.STEAM,
    coverImage: 'https://images.pexels.com/photos/275033/pexels-photo-275033.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'A groundbreaking role playing game with unprecedented freedom of choice.',
    genres: ['RPG', 'Mystery', 'Indie'],
    developer: 'ZA/UM',
    publisher: 'ZA/UM',
    releaseDate: '2019-10-15',
    playtime: 1440, // 24 hours
    lastPlayed: '2024-01-05T11:10:00Z',
    installed: true,
    metacriticScore: 91,
    userRating: 8.8,
    price: 39.99,
    tags: ['Story Rich', 'Choices Matter', 'Detective']
  },
  {
    id: '6',
    name: 'Control',
    platform: GamePlatform.EPIC,
    coverImage: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'A supernatural action-adventure game set in a secret government agency.',
    genres: ['Action', 'Supernatural', 'Mystery'],
    developer: 'Remedy Entertainment',
    publisher: '505 Games',
    releaseDate: '2019-08-27',
    playtime: 960, // 16 hours
    installed: false,
    metacriticScore: 82,
    userRating: 8.2,
    price: 29.99,
    tags: ['Supernatural', 'Great Graphics', 'Mystery']
  }
];

export const mockStats: LibraryStats = {
  totalGames: 156,
  totalPlaytime: 45360, // 756 hours
  installedGames: 42,
  recentlyPlayed: mockGames.slice(0, 4),
  mostPlayed: mockGames.slice(0, 3),
  libraryValue: 2847.50,
  achievementProgress: {
    total: 2340,
    unlocked: 1256,
    percentage: 53.7
  },
  platformDistribution: {
    [GamePlatform.STEAM]: 89,
    [GamePlatform.GOG]: 23,
    [GamePlatform.EPIC]: 18,
    [GamePlatform.ORIGIN]: 12,
    [GamePlatform.UPLAY]: 8,
    [GamePlatform.BATTLENET]: 4,
    [GamePlatform.XBOX]: 2,
    [GamePlatform.PLAYSTATION]: 0,
    [GamePlatform.OTHER]: 0
  },
  genreDistribution: {
    'Action': 45,
    'RPG': 32,
    'Strategy': 28,
    'Indie': 25,
    'Adventure': 22,
    'Simulation': 18,
    'Sports': 12,
    'Racing': 8
  }
};