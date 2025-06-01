import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import TOTPCard, { TOTPItem } from './TOTPCard';

type TOTPSection = {
  title: string;
  data: TOTPItem[];
};

const data: TOTPItem[] = [
  {
    id: 'a1',
    accountKey: 'github',
    accountName: 'xx@gmail.com',
  },
  {
    id: 'a2',
    accountKey: 'github',
    accountName: 'xx@gmail.com',
  },
  {
    id: 'b2',
    accountKey: 'amazon',
    accountName: '123456789@gmail.com',
  },
  {
    id: 'c2',
    accountKey: 'amazon',
    accountName: 'xx@gmail.com',
  },
  {
    id: 'd2',
    accountKey: undefined,
    accountName: 'xx@gmail.com',
  },
];

function groupItemsByInitialLetter(items: TOTPItem[]): TOTPSection[] {
  const groups: { [key: string]: TOTPItem[] } = {};
  items.forEach((item) => {
    const initial = item.id[0].toUpperCase();
    if (!groups[initial]) {
      groups[initial] = [];
    }
    groups[initial].push(item);
  });
  return Object.keys(groups)
    .sort()
    .map((letter) => ({
      title: letter,
      data: groups[letter],
    }));
}

function getSoftColor(seed: string): string {
  const colors = ['#A2D2FF', '#BDE0FE', '#CDEAC0', '#FFF1BD', '#FFD6A5', '#E2C2FF'];
  const index = seed.charCodeAt(0) % colors.length;
  return colors[index];
}

export default function TOTPContainer() {
  const sections = groupItemsByInitialLetter(data);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {sections.map((section) => (
        <View key={section.title} style={styles.sectionWrapper}>
          <View style={[styles.leftBar, { backgroundColor: getSoftColor(section.title) }]} />
          <View style={styles.grid}>
            {section.data.map((item, index) => {
              const isLastItem = index === section.data.length - 1;
              const isOdd = section.data.length % 2 === 1;
              const cardWidth = isLastItem && isOdd ? '100%' : '48%';
              return (
                <View key={item.id} style={[styles.cardWrapper, { width: cardWidth }]}>
                  <TOTPCard {...item} />
                </View>
              );
            })}
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  sectionWrapper: {
    flexDirection: 'row',
    marginBottom: 10,
    alignItems: 'center',
  },
  leftBar: {
    width: 2,
    height: '83%',
    borderRadius: 2,
    marginRight: 6,
  },
  grid: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  cardWrapper: {
    width: '48%',
  },
});
