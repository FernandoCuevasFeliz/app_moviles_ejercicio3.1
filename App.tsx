import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { UserProvider, useUser } from './src/context/UserContext';
import NameScreen from './src/screens/NameScreen';
import WelcomeScreen from './src/screens/WelcomeScreen';
import { colors } from './src/theme/theme';

function Router() {
  const { name, isLoading } = useUser();

  if (isLoading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return name ? <WelcomeScreen /> : <NameScreen />;
}

export default function App() {
  return (
    <SafeAreaProvider>
      <UserProvider>
        <StatusBar style="dark" />
        <Router />
      </UserProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
  },
});
