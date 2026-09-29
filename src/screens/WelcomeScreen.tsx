import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useUser } from '../context/UserContext';
import { colors, radius, spacing } from '../theme/theme';

export default function WelcomeScreen() {
  const { name, forgetName, storagePath } = useUser();
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.container,
        { paddingTop: insets.top + spacing.xl, paddingBottom: insets.bottom + spacing.lg },
      ]}
    >
      <View style={styles.body}>
        <View style={styles.badge}>
          <Ionicons name="sparkles" size={34} color={colors.primary} />
        </View>

        <Text style={styles.greeting}>Bienvenido de nuevo,</Text>
        <Text style={styles.name}>{name}</Text>

        <View style={styles.card}>
          <Ionicons name="shield-checkmark" size={20} color={colors.primary} />
          <Text style={styles.cardText}>
            Tu nombre se guardó en un archivo y se recupera cada vez que abres la app.
          </Text>
        </View>
      </View>

      <View style={styles.footer}>
        <Pressable
          onPress={forgetName}
          accessibilityRole="button"
          style={({ pressed }) => [styles.secondary, pressed && styles.pressed]}
        >
          <Ionicons name="trash-outline" size={18} color={colors.danger} />
          <Text style={styles.secondaryLabel}>Borrar mi nombre</Text>
        </Pressable>

        <Text style={styles.path} numberOfLines={2}>
          {storagePath}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: spacing.lg,
    justifyContent: 'space-between',
  },
  body: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs,
  },
  badge: {
    width: 104,
    height: 104,
    borderRadius: radius.pill,
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  greeting: {
    fontSize: 18,
    color: colors.textMuted,
  },
  name: {
    fontSize: 40,
    fontWeight: '800',
    color: colors.text,
    textAlign: 'center',
    marginBottom: spacing.lg,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.lg,
    padding: spacing.md,
  },
  cardText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
    color: colors.textMuted,
  },
  footer: {
    gap: spacing.md,
    alignItems: 'center',
  },
  secondary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    alignSelf: 'stretch',
    backgroundColor: colors.dangerSoft,
    borderRadius: radius.pill,
    paddingVertical: 14,
  },
  pressed: {
    opacity: 0.75,
  },
  secondaryLabel: {
    color: colors.danger,
    fontSize: 15,
    fontWeight: '700',
  },
  path: {
    fontSize: 11,
    color: colors.textMuted,
    textAlign: 'center',
  },
});
