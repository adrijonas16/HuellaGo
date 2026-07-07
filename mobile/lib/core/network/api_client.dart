import 'package:dio/dio.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import '../constants/api_constants.dart';

class ApiClient {
  late final Dio _dio;
  final _storage = const FlutterSecureStorage();

  ApiClient() {
    _dio = Dio(BaseOptions(
      baseUrl: ApiConstants.baseUrl,
      connectTimeout: const Duration(seconds: 10),
      receiveTimeout: const Duration(seconds: 10),
      headers: {
        'Content-Type': 'application/json',
        'X-Client-Platform': 'mobile',
      },
    ));

    _dio.interceptors.add(InterceptorsWrapper(
      onRequest: (options, handler) async {
        final token = await _storage.read(key: 'accessToken');
        if (token != null) {
          options.headers['Authorization'] = 'Bearer $token';
        }
        handler.next(options);
      },
      onError: (error, handler) async {
        if (error.response?.statusCode == 401) {
          // Try refresh token
          try {
            final refreshToken = await _storage.read(key: 'refreshToken');
            if (refreshToken != null) {
              final response = await _dio.post(
                ApiConstants.refreshToken,
                options: Options(
                  headers: {'Authorization': 'Bearer $refreshToken'},
                ),
              );
              final newToken = response.data['data']['accessToken'];
              await _storage.write(key: 'accessToken', value: newToken);

              // Retry original request
              error.requestOptions.headers['Authorization'] =
                  'Bearer $newToken';
              final retryResponse = await _dio.fetch(error.requestOptions);
              return handler.resolve(retryResponse);
            }
          } catch (_) {
            await _storage.deleteAll();
          }
        }
        handler.next(error);
      },
    ));
  }

  Dio get dio => _dio;

  Future<void> saveTokens(String accessToken, String refreshToken) async {
    await _storage.write(key: 'accessToken', value: accessToken);
    await _storage.write(key: 'refreshToken', value: refreshToken);
  }

  Future<void> clearTokens() async {
    await _storage.deleteAll();
  }

  Future<bool> hasToken() async {
    final token = await _storage.read(key: 'accessToken');
    return token != null;
  }
}
