import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Image, Pressable, Animated } from 'react-native';
import { TOTPMeta } from '../storage/totpMeta';

export type TOTPItem = {
  id: string;
  accountKey?: keyof typeof TOTPMeta;
  accountName: string;
};

const Indicator = ({ countdown }: { countdown: number }) => {
  const isNormal = countdown > 10;
  const indicatorSize = isNormal ? 10 : 15;
  const containerWidth = 18; // fixed width for the container
  const indicatorColor = isNormal ? 'green' : 'orange';
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (isNormal) {
      const pulse = Animated.loop(
        Animated.sequence([
          Animated.timing(scaleAnim, {
            toValue: 1.3,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(scaleAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
        ]),
      );
      pulse.start();
      return () => pulse.stop();
    }
  }, [isNormal]);

  return (
    <View style={[styles.indicatorContainer, { width: containerWidth }]}>
      {isNormal ? (
        <Animated.View
          style={[
            styles.indicator,
            {
              backgroundColor: indicatorColor,
              width: indicatorSize,
              height: indicatorSize,
              borderRadius: indicatorSize / 2,
              transform: [{ scale: scaleAnim }],
            },
          ]}
        />
      ) : (
        <View
          style={[
            styles.indicator,
            {
              backgroundColor: indicatorColor,
              width: indicatorSize,
              height: indicatorSize,
              borderRadius: indicatorSize / 2,
            },
          ]}
        >
          <Text style={styles.countdown}>{countdown}</Text>
        </View>
      )}
    </View>
  );
};

export default function TOTPCard({ accountKey, accountName }: TOTPItem) {
  const [countdown, setCountdown] = useState(30);

  useEffect(() => {
    const interval = setInterval(() => {
      const period = 30;
      const currentTime = Math.floor(Date.now() / 1000);
      const remaining = period - (currentTime % period);
      setCountdown(remaining);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const code = '123123'; // TODO: Implement TOTP code generation logic

  const { name, logo } = accountKey
    ? TOTPMeta[accountKey]
    : {
        name: ' -- ',
        logo: null,
      };

  return (
    <Pressable
      style={({ pressed }) => [styles.card, pressed && styles.pressedCard]}
      onPress={() => console.log(`Clicked on ${name}`)}
    >
      <View style={styles.rowBetween}>
        <View style={styles.infoContainer}>
          <Text style={styles.accountName}>{accountName}</Text>
          <View style={styles.nameRow}>
            <Indicator countdown={countdown} />
            <Text style={styles.name}>{name}</Text>
          </View>
          <Text style={styles.code}>{formatCode(code)}</Text>
        </View>
        {logo && <Image source={logo} style={styles.logo} />}
      </View>
    </Pressable>
  );
}

const formatCode = (code: string) => {
  const mid = Math.floor(code.length / 2);
  return code.slice(0, mid) + ' ' + code.slice(mid);
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 10,
    margin: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    position: 'relative',
  },
  pressedCard: {
    opacity: 0.8,
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infoContainer: {
    flex: 1,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  indicatorContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  indicator: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 6,
  },
  accountName: {
    fontSize: 12,
    color: '#666',
    marginBottom: 2,
  },
  countdown: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  logo: {
    width: 32,
    height: 32,
    marginLeft: 10,
    resizeMode: 'contain',
  },
  name: {
    fontSize: 28,
    fontWeight: '800',
  },
  code: {
    fontSize: 14,
    fontWeight: 'bold',
    letterSpacing: 2,
  },
});
