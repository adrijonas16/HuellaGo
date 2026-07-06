import '../../core/network/api_client.dart';
import '../../core/constants/api_constants.dart';
import '../models/pet_model.dart';

class PetsRepository {
  final ApiClient _apiClient;

  PetsRepository(this._apiClient);

  Future<List<PetModel>> getMyPets() async {
    final response = await _apiClient.dio.get(ApiConstants.pets);
    final list = response.data['data'] as List;
    return list.map((json) => PetModel.fromJson(json)).toList();
  }

  Future<PetModel> getById(String id) async {
    final response = await _apiClient.dio.get('${ApiConstants.pets}/$id');
    return PetModel.fromJson(response.data['data']);
  }

  Future<PetModel> create(Map<String, dynamic> data) async {
    final response = await _apiClient.dio.post(ApiConstants.pets, data: data);
    return PetModel.fromJson(response.data['data']);
  }

  Future<PetModel> update(String id, Map<String, dynamic> data) async {
    final response =
        await _apiClient.dio.patch('${ApiConstants.pets}/$id', data: data);
    return PetModel.fromJson(response.data['data']);
  }

  Future<void> delete(String id) async {
    await _apiClient.dio.delete('${ApiConstants.pets}/$id');
  }
}
