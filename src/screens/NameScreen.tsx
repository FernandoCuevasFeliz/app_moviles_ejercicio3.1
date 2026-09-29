import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useUser } from '../context/UserContext';
import { colors, radius, spacing } from '../theme/theme';

export default function NameScreen() {
  const { saveName, storagePath } = useUser();
  const insets = useSafeAreaInsets();
  const [value, setValue] = useState('');
  const [error, setError] = useState<string | null>(null);

  function handleContinue() {
    if (!value.trim()) {
      setError('Escribe tu nombre para continuar');
      return;
    }

    saveName(value);
  }

  return (
    <View
      style={[
        styles.container,
        { paddingTop: insets.top + spacing.xl, paddingBottom: insets.bottom + spacing.lg },
      ]}
    >
      <View style={styles.header}>
        <View style={styles.badge}>
          <Ionicons name="person" size={30} color={colors.primary} />
        </View>
        <Text style={styles.title}>Bienvenido</Text>
        <Text style={styles.subtitle}>¿Cómo te llamas?</Text>
      </View>

      <View style={styles.form}>
        <Text style={styles.label}>Tu nombre</Text>
        <TextInput
          value={value}
          onChangeText={(text) => {
            setValue(text);
            if (error) {
              setError(null);
            }
          }}
          placeholder="Ej. Fernando"
          placeholderTextColor={colors.textMuted}
          style={[styles.input, error ? styles.inputError : null]}
          autoCapitalize="words"
          autoCorrect={false}
          returnKeyType="go"
          onSubmitEditing={handleContinue}
        />
        {error ? <Text style={styles.error}>{error}</Text> : null}

        <Pressable
          onPress={handleContinue}
          accessibilityRole="button"
          style={({ pressed }) => [styles.button, pressed && styles.pressed]}
        >
          <Text style={styles.buttonLabel}>Continuar</Text>
          <Ionicons name="arrow-forward" size={18} color={colors.white} />
        </Pressable>
      </View>

      <Text style={styles.path} numberOfLines={2}>
        Se guardará en: {storagePath}
      </Text>
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
  header: {
    alignItems: 'center',
    gap: spacing.xs,
    marginTop: spacing.lg,
  },
  badge: {
    width: 88,
    height: 88,
    borderRadius: radius.pill,
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  title: {
    fontSize: 30,
    fontWeight: '800',
    color: colors.text,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textMuted,
  },
  form: {
    gap: spacing.sm,
  },
  label: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.6,
  },
  input: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: 14,
    fontSize: 17,
    color: colors.text,
  },
  inputError: {
    borderColor: colors.danger,
  },
  error: {
    fontSize: 13,
    color: colors.danger,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    marginTop: spacing.sm,
    backgroundColor: colors.primary,
    borderRadius: radius.pill,
    paddingVertical: 15,
  },
  pressed: {
    opacity: 0.78,
  },
  buttonLabel: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '700',
  },
  path: {
    fontSize: 11,
    color: colors.textMuted,
    textAlign: 'center',
  },
});
