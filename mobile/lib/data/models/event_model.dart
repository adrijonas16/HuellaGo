class EventModel {
  final String id;
  final String title;
  final String? description;
  final DateTime date;
  final DateTime? endDate;
  final String meetingPoint;
  final double meetingLat;
  final double meetingLng;
  final String city;
  final String? district;
  final int? maxAttendees;
  final double price;
  final bool isFree;
  final bool isPublic;
  final String? energyLevel;
  final List<String> recommendedSize;
  final List<String> requirements;
  final String status;
  final EventOrganizer organizer;
  final int attendeesCount;
  final List<String> photoUrls;

  const EventModel({
    required this.id,
    required this.title,
    this.description,
    required this.date,
    this.endDate,
    required this.meetingPoint,
    required this.meetingLat,
    required this.meetingLng,
    required this.city,
    this.district,
    this.maxAttendees,
    required this.price,
    required this.isFree,
    required this.isPublic,
    this.energyLevel,
    required this.recommendedSize,
    required this.requirements,
    required this.status,
    required this.organizer,
    required this.attendeesCount,
    required this.photoUrls,
  });

  factory EventModel.fromJson(Map<String, dynamic> json) => EventModel(
        id: json['id'],
        title: json['title'],
        description: json['description'],
        date: DateTime.parse(json['date']),
        endDate:
            json['endDate'] != null ? DateTime.parse(json['endDate']) : null,
        meetingPoint: json['meetingPoint'],
        meetingLat: json['meetingLat'].toDouble(),
        meetingLng: json['meetingLng'].toDouble(),
        city: json['city'],
        district: json['district'],
        maxAttendees: json['maxAttendees'],
        price: (json['price'] ?? 0).toDouble(),
        isFree: json['isFree'] ?? true,
        isPublic: json['isPublic'] ?? true,
        energyLevel: json['energyLevel'],
        recommendedSize: List<String>.from(json['recommendedSize'] ?? []),
        requirements: List<String>.from(json['requirements'] ?? []),
        status: json['status'] ?? 'UPCOMING',
        organizer: EventOrganizer.fromJson(json['organizer']),
        attendeesCount: json['_count']?['attendances'] ?? 0,
        photoUrls: (json['photos'] as List?)
                ?.map<String>((p) => p['url'] as String)
                .toList() ??
            [],
      );

  bool get hasSpots =>
      maxAttendees == null || attendeesCount < maxAttendees!;
}

class EventOrganizer {
  final String id;
  final String firstName;
  final String lastName;
  final String? avatarUrl;

  const EventOrganizer({
    required this.id,
    required this.firstName,
    required this.lastName,
    this.avatarUrl,
  });

  factory EventOrganizer.fromJson(Map<String, dynamic> json) =>
      EventOrganizer(
        id: json['id'],
        firstName: json['firstName'],
        lastName: json['lastName'],
        avatarUrl: json['avatarUrl'],
      );

  String get fullName => '$firstName $lastName';
}
