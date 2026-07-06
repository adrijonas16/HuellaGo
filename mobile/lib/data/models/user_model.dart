class UserModel {
  final String id;
  final String email;
  final String firstName;
  final String lastName;
  final String? avatarUrl;
  final String? phone;
  final String? city;
  final String? district;
  final String role;

  const UserModel({
    required this.id,
    required this.email,
    required this.firstName,
    required this.lastName,
    this.avatarUrl,
    this.phone,
    this.city,
    this.district,
    required this.role,
  });

  factory UserModel.fromJson(Map<String, dynamic> json) => UserModel(
        id: json['id'],
        email: json['email'],
        firstName: json['firstName'],
        lastName: json['lastName'],
        avatarUrl: json['avatarUrl'],
        phone: json['phone'],
        city: json['city'],
        district: json['district'],
        role: json['role'],
      );

  String get fullName => '$firstName $lastName';
}
