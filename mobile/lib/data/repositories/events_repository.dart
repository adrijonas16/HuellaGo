import '../../core/network/api_client.dart';
import '../../core/constants/api_constants.dart';
import '../models/event_model.dart';

class EventsRepository {
  final ApiClient _apiClient;

  EventsRepository(this._apiClient);

  Future<List<EventModel>> getAll({int page = 1, int limit = 20}) async {
    final response = await _apiClient.dio.get(
      ApiConstants.events,
      queryParameters: {'page': page, 'limit': limit},
    );
    final list = response.data['data']['data'] as List;
    return list.map((json) => EventModel.fromJson(json)).toList();
  }

  Future<EventModel> getById(String id) async {
    final response = await _apiClient.dio.get('${ApiConstants.events}/$id');
    return EventModel.fromJson(response.data['data']);
  }

  Future<void> attend(String eventId, String petId) async {
    await _apiClient.dio.post(
      '${ApiConstants.events}/$eventId/attend',
      data: {'petId': petId},
    );
  }

  Future<void> cancelAttendance(String eventId, String petId) async {
    await _apiClient.dio.delete(
      '${ApiConstants.events}/$eventId/attend',
      data: {'petId': petId},
    );
  }
}
