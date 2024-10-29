import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, ActivityIndicator } from 'react-native';

export default function App() {
  const [quote, setQuote] = useState('');
  const [loading, setLoading] = useState(false);

  // Função para buscar uma nova citação
  const fetchQuote = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://api.kanye.rest/');
      const data = await response.json();
      setQuote(data.quote);
    } catch (error) {
      console.error("Erro ao buscar a citação:", error);
      setQuote('Falha ao carregar a citação');
    } finally {
      setLoading(false);
    }
  };

  // Carrega uma citação ao iniciar o app
  useEffect(() => {
    fetchQuote();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Kanye West Quotes</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#f3b23d" />
      ) : (
        <Text style={styles.quote}>{quote}</Text>
      )}
      <Button title="Get another true" onPress={fetchQuote} color="#f3b23d" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1c1c1e',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#f3b23d',
    marginBottom: 20,
    textAlign: 'center',
  },
  quote: {
    fontSize: 20,
    color: '#ffffff',
    fontStyle: 'italic',
    textAlign: 'center',
    marginBottom: 30,
  },
});
