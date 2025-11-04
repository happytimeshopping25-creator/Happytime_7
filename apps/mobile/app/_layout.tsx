import { AuthProvider, useAuth } from "@/AuthProvider.native";
import { Stack } from "expo-router";
import { Button } from "react-native";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase.native";

function RootStack() {
  const { user } = useAuth();

  const handleLogout = () => {
    signOut(auth);
  };

  return (
    <Stack>
      <Stack.Screen name="login" options={{ title: "تسجيل الدخول", headerShown: false }} />
      <Stack.Screen
        name="orders"
        options={{
          title: "طلباتي",
          headerRight: () => <Button onPress={handleLogout} title="خروج" color="#f00" />,
          // استبدل شاشة تسجيل الدخول بهذه الشاشة لمنع الرجوع إليها
          presentation: 'modal',
        }}
      />
      {/* يمكنك إضافة شاشات أخرى هنا */}
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <RootStack />
    </AuthProvider>
  );
}