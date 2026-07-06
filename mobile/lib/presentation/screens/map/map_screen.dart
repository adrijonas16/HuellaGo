import 'package:flutter/material.dart';
import '../../../core/theme/app_colors.dart';

class MapScreen extends StatelessWidget {
  const MapScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Stack(
        children: [
          // Map placeholder - replace with GoogleMap widget
          Container(
            color: AppColors.border.withOpacity(0.3),
            child: const Center(
              child: Text('Google Map aqui'),
            ),
          ),

          // Search bar
          Positioned(
            top: MediaQuery.of(context).padding.top + 8,
            left: 16,
            right: 16,
            child: Container(
              padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
              decoration: BoxDecoration(
                color: Colors.white,
                borderRadius: BorderRadius.circular(16),
                boxShadow: [
                  BoxShadow(
                    color: Colors.black.withOpacity(0.08),
                    blurRadius: 12,
                  ),
                ],
              ),
              child: Row(
                children: [
                  const Icon(Icons.search, color: AppColors.textLight),
                  const SizedBox(width: 12),
                  Text(
                    'Buscar en esta zona...',
                    style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                          color: AppColors.textLight,
                        ),
                  ),
                  const Spacer(),
                  const Icon(Icons.tune, color: AppColors.textLight),
                ],
              ),
            ),
          ),

          // Category chips
          Positioned(
            top: MediaQuery.of(context).padding.top + 68,
            left: 0,
            right: 0,
            child: SizedBox(
              height: 40,
              child: ListView(
                scrollDirection: Axis.horizontal,
                padding: const EdgeInsets.symmetric(horizontal: 16),
                children: [
                  _FilterChip(label: 'Veterinarias', active: true),
                  _FilterChip(label: '24h'),
                  _FilterChip(label: 'Paseadores'),
                  _FilterChip(label: 'Hoteles'),
                  _FilterChip(label: 'Grooming'),
                  _FilterChip(label: 'Tiendas'),
                  _FilterChip(label: 'Pet Friendly'),
                ],
              ),
            ),
          ),

          // My location button
          Positioned(
            bottom: 100,
            right: 16,
            child: FloatingActionButton.small(
              heroTag: 'location',
              backgroundColor: Colors.white,
              onPressed: () {},
              child: const Icon(Icons.my_location, color: AppColors.primary),
            ),
          ),
        ],
      ),
    );
  }
}

class _FilterChip extends StatelessWidget {
  final String label;
  final bool active;

  const _FilterChip({required this.label, this.active = false});

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.only(right: 8),
      child: Chip(
        label: Text(
          label,
          style: TextStyle(
            color: active ? Colors.white : AppColors.textSecondary,
            fontSize: 13,
            fontWeight: FontWeight.w500,
          ),
        ),
        backgroundColor: active ? AppColors.primary : Colors.white,
        side: BorderSide(
          color: active ? AppColors.primary : AppColors.border,
        ),
        padding: const EdgeInsets.symmetric(horizontal: 4),
      ),
    );
  }
}
