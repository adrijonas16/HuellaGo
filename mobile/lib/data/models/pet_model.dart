class PetModel {
  final String id;
  final String userId;
  final String name;
  final String? photoUrl;
  final String? breed;
  final DateTime? birthDate;
  final String? size;
  final double? weight;
  final String energyLevel;
  final String? allergies;

  const PetModel({
    required this.id,
    required this.userId,
    required this.name,
    this.photoUrl,
    this.breed,
    this.birthDate,
    this.size,
    this.weight,
    required this.energyLevel,
    this.allergies,
  });

  factory PetModel.fromJson(Map<String, dynamic> json) => PetModel(
        id: json['id'],
        userId: json['userId'],
        name: json['name'],
        photoUrl: json['photoUrl'],
        breed: json['breed'],
        birthDate: json['birthDate'] != null
            ? DateTime.parse(json['birthDate'])
            : null,
        size: json['size'],
        weight: json['weight']?.toDouble(),
        energyLevel: json['energyLevel'] ?? 'MEDIUM',
        allergies: json['allergies'],
      );

  Map<String, dynamic> toJson() => {
        'name': name,
        'photoUrl': photoUrl,
        'breed': breed,
        'birthDate': birthDate?.toIso8601String(),
        'size': size,
        'weight': weight,
        'energyLevel': energyLevel,
        'allergies': allergies,
      };
}
