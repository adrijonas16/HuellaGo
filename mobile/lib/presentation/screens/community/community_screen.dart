import 'package:flutter/material.dart';
import '../../../core/theme/app_colors.dart';

class CommunityScreen extends StatelessWidget {
  const CommunityScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.background,
      appBar: AppBar(title: const Text('Comunidades')),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Pet type filter
            SizedBox(
              height: 100,
              child: ListView(
                scrollDirection: Axis.horizontal,
                children: const [
                  _PetTypeChip(icon: '🐕', label: 'Perros', count: 1245),
                  _PetTypeChip(icon: '🐱', label: 'Gatos', count: 876),
                  _PetTypeChip(icon: '🐰', label: 'Conejos', count: 324),
                  _PetTypeChip(icon: '🦜', label: 'Aves', count: 198),
                  _PetTypeChip(icon: '🐹', label: 'Hamsters', count: 156),
                  _PetTypeChip(icon: '🐢', label: 'Tortugas', count: 67),
                ],
              ),
            ),
            const SizedBox(height: 20),

            Text(
              'Comunidades populares',
              style: Theme.of(context).textTheme.headlineSmall,
            ),
            const SizedBox(height: 12),

            _CommunityCard(
              icon: '🐕',
              name: 'Perritos de Arequipa',
              members: 1245,
              description: 'Compartimos paseos, consejos y momentos con nuestros perritos.',
              color: AppColors.primary,
            ),
            _CommunityCard(
              icon: '🐱',
              name: 'Gatitos AQP',
              members: 876,
              description: 'Tips de cuidado, fotos adorables y adopciones responsables.',
              color: AppColors.primaryDark,
            ),
            _CommunityCard(
              icon: '🐰',
              name: 'Conejos y Roedores Peru',
              members: 324,
              description: 'Alimentacion, jaulas y salud para conejos, hamsters y cobayos.',
              color: const Color(0xFFE85D75),
            ),
            _CommunityCard(
              icon: '🦜',
              name: 'Aves Exoticas Arequipa',
              members: 198,
              description: 'Loros, pericos, canarios y aves exoticas.',
              color: AppColors.success,
            ),
            _CommunityCard(
              icon: '🏠',
              name: 'Rescate Animal AQP',
              members: 2103,
              description: 'Rescate, rehabilitacion y adopcion de animales en Arequipa.',
              color: AppColors.warning,
            ),
            _CommunityCard(
              icon: '📍',
              name: 'Pet Friendly Arequipa',
              members: 1890,
              description: 'Lugares pet friendly: restaurantes, cafes, parques y tiendas.',
              color: const Color(0xFF2EC4B6),
            ),
            const SizedBox(height: 80),
          ],
        ),
      ),
    );
  }
}

class _PetTypeChip extends StatelessWidget {
  final String icon;
  final String label;
  final int count;

  const _PetTypeChip({
    required this.icon,
    required this.label,
    required this.count,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      width: 80,
      margin: const EdgeInsets.only(right: 10),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          Container(
            width: 56,
            height: 56,
            decoration: BoxDecoration(
              color: AppColors.primary.withOpacity(0.1),
              borderRadius: BorderRadius.circular(16),
            ),
            child: Center(
              child: Text(icon, style: const TextStyle(fontSize: 28)),
            ),
          ),
          const SizedBox(height: 4),
          Text(
            label,
            style: const TextStyle(
              fontSize: 12,
              fontWeight: FontWeight.w600,
              color: AppColors.dark,
            ),
          ),
          Text(
            '$count',
            style: const TextStyle(
              fontSize: 10,
              color: AppColors.textLight,
            ),
          ),
        ],
      ),
    );
  }
}

class _CommunityCard extends StatelessWidget {
  final String icon;
  final String name;
  final int members;
  final String description;
  final Color color;

  const _CommunityCard({
    required this.icon,
    required this.name,
    required this.members,
    required this.description,
    required this.color,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.only(bottom: 12),
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(16),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.06),
            blurRadius: 12,
            offset: const Offset(0, 2),
          ),
        ],
      ),
      child: Row(
        children: [
          Container(
            width: 48,
            height: 48,
            decoration: BoxDecoration(
              color: color.withOpacity(0.1),
              borderRadius: BorderRadius.circular(14),
            ),
            child: Center(
              child: Text(icon, style: const TextStyle(fontSize: 24)),
            ),
          ),
          const SizedBox(width: 12),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  name,
                  style: Theme.of(context).textTheme.bodyLarge?.copyWith(
                        fontWeight: FontWeight.w700,
                      ),
                ),
                const SizedBox(height: 2),
                Text(
                  description,
                  style: Theme.of(context).textTheme.bodySmall,
                  maxLines: 1,
                  overflow: TextOverflow.ellipsis,
                ),
                const SizedBox(height: 4),
                Text(
                  '$members miembros',
                  style: TextStyle(
                    fontSize: 11,
                    fontWeight: FontWeight.w600,
                    color: color,
                  ),
                ),
              ],
            ),
          ),
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
            decoration: BoxDecoration(
              color: color.withOpacity(0.1),
              borderRadius: BorderRadius.circular(20),
            ),
            child: Text(
              'Unirse',
              style: TextStyle(
                fontSize: 12,
                fontWeight: FontWeight.w600,
                color: color,
              ),
            ),
          ),
        ],
      ),
    );
  }
}
