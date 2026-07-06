import '../../core/network/api_client.dart';
import '../../core/constants/api_constants.dart';
import '../models/user_model.dart';

class AuthRepository {
  final ApiClient _apiClient;

  AuthRepository(this._apiClient);

  Future<UserModel> login(String email, String password) async {
    final response = await _apiClient.dio.post(
      ApiConstants.login,
      data: {'email': email, 'password': password},
    );
    final data = response.data['data'];
    await _apiClient.saveTokens(data['accessToken'], data['refreshToken']);
    return UserModel.fromJson(data['user']);
  }

  Future<UserModel> register({
    required String email,
    required String password,
    required String firstName,
    required String lastName,
  }) async {
    final response = await _apiClient.dio.post(
      ApiConstants.register,
      data: {
        'email': email,
        'password': password,
        'firstName': firstName,
        'lastName': lastName,
      },
    );
    final data = response.data['data'];
    await _apiClient.saveTokens(data['accessToken'], data['refreshToken']);
    return UserModel.fromJson(data['user']);
  }

  Future<UserModel> getProfile() async {
    final response = await _apiClient.dio.get(ApiConstants.profile);
    return UserModel.fromJson(response.data['data']);
  }

  Future<void> logout() async {
    await _apiClient.clearTokens();
  }

  Future<bool> isAuthenticated() async {
    return _apiClient.hasToken();
  }
}
