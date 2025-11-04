import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, ActivityIndicator } from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase.native";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const mapFirebaseError = (errorCode: string) => {
    switch (errorCode) {
      case "auth/invalid-email":
        return "البريد الإلكتروني غير صالح.";
      case "auth/user-not-found":
      case "auth/wrong-password":
        return "البريد الإلكتروني أو كلمة المرور غير صحيحة.";
      default:
        return "حدث خطأ ما، يرجى المحاولة مرة أخرى.";
    }
  };

  const handleLogin = () => {
    setLoading(true);
    setError("");
    signInWithEmailAndPassword(auth, email, password)
      .catch(err => setError(mapFirebaseError(err.code)))
      .finally(() => setLoading(false));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>تسجيل الدخول</Text>
      <TextInput
        style={styles.input}
        placeholder="البريد الإلكتروني"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="كلمة المرور"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <Button title="دخول" onPress={handleLogin} disabled={loading} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", textAlign: "center", marginBottom: 20 },
  input: { height: 40, borderColor: "gray", borderWidth: 1, marginBottom: 10, padding: 10 },
  error: { color: "red", textAlign: "center", marginBottom: 10 },
});
