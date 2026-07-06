class ApiConstants {
  ApiConstants._();

  static const String baseUrl = 'http://10.0.2.2:3000/api'; // Android emulator
  // static const String baseUrl = 'http://localhost:3000/api'; // iOS simulator

  // Auth
  static const String login = '/auth/login';
  static const String register = '/auth/register';
  static const String refreshToken = '/auth/refresh';

  // Users
  static const String profile = '/users/me';

  // Pets
  static const String pets = '/pets';

  // Businesses
  static const String businesses = '/businesses';

  // Events
  static const String events = '/events';

  // Routes
  static const String routes = '/routes';

  // Walks
  static const String walksStart = '/walks/start';
  static const String walksHistory = '/walks/history';
  static const String walksStats = '/walks/stats';

  // Photos
  static const String photos = '/photos';

  // Reviews
  static const String reviews = '/reviews';

  // Favorites
  static const String favorites = '/favorites';

  // Notifications
  static const String notifications = '/notifications';
}
