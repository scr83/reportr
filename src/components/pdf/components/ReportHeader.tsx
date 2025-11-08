import React from 'react';
import { View, Text, StyleSheet } from '@react-pdf/renderer';

interface ReportHeaderProps {
  title: string;
  subtitle?: string;
  clientName?: string;
  branding?: {
    primaryColor?: string;
  };
}

export const ReportHeader: React.FC<ReportHeaderProps> = ({ 
  title, 
  subtitle, 
  clientName, 
  branding 
}) => {
  const primaryColor = branding?.primaryColor || '#7e23ce';
  
  const styles = StyleSheet.create({
    header: {
      marginBottom: 30,
      paddingBottom: 15,
      borderBottomWidth: 2,
      borderBottomColor: primaryColor,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    headerLeft: {
      flex: 1,
    },
    headerRight: {
      alignItems: 'flex-end',
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#1F2937',
      marginBottom: 5,
    },
    subtitle: {
      fontSize: 12,
      color: '#6B7280',
    },
    clientName: {
      fontSize: 14,
      fontWeight: 'bold',
      color: primaryColor,
    },
  });

  return (
    <View style={styles.header}>
      <View style={styles.headerLeft}>
        <Text style={styles.title}>{title}</Text>
        {subtitle && (
          <Text style={styles.subtitle}>{subtitle}</Text>
        )}
      </View>
      {clientName && (
        <View style={styles.headerRight}>
          <Text style={styles.clientName}>{clientName}</Text>
        </View>
      )}
    </View>
  );
};