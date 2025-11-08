import React from 'react';
import { Page, View, Text, StyleSheet } from '@react-pdf/renderer';
import { ReportData } from '../types';
import { formatNumber, formatPercentage, formatDecimal } from './styles';
import { ReportFooter } from '../../../components/pdf/components/ReportFooter';

interface TopQueriesPageProps {
  data: ReportData;
}

export const TopQueriesPage: React.FC<TopQueriesPageProps> = ({ data }) => {
  const primaryColor = data.branding.primaryColor || '#7e23ce';

  const styles = StyleSheet.create({
    page: {
      padding: 40,
      backgroundColor: '#FFFFFF',
      fontFamily: 'Helvetica',
    },
    header: {
      marginBottom: 30,
      paddingBottom: 15,
      borderBottomWidth: 2,
      borderBottomColor: primaryColor,
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
    sectionTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#1F2937',
      marginTop: 30,
      marginBottom: 15,
    },
    tableContainer: {
      backgroundColor: '#F9FAFB',
      borderWidth: 1,
      borderColor: '#E5E7EB',
      borderRadius: 8,
      padding: 15,
      marginTop: 20,
    },
    tableHeader: {
      flexDirection: 'row',
      backgroundColor: primaryColor,
      paddingVertical: 8,
      paddingHorizontal: 10,
      borderRadius: 4,
      marginBottom: 10,
    },
    tableHeaderText: {
      color: '#FFFFFF',
      fontSize: 10,
      fontWeight: 'bold',
      flex: 1,
    },
    queryHeaderText: {
      color: '#FFFFFF',
      fontSize: 10,
      fontWeight: 'bold',
      flex: 2, // Give Query column more space
    },
    tableRow: {
      flexDirection: 'row',
      paddingVertical: 6,
      paddingHorizontal: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#E5E7EB',
    },
    tableCell: {
      fontSize: 9,
      color: '#374151',
      flex: 1,
    },
    queryCell: {
      fontSize: 9,
      color: '#374151',
      flex: 2, // Give Query column more space
    },
    noDataText: {
      fontSize: 12,
      color: '#6B7280',
      textAlign: 'center',
      marginTop: 40,
      fontStyle: 'italic',
    },
  });

  // Check if we have top queries data
  const hasQueriesData = data.gscData?.topQueries && data.gscData.topQueries.length > 0;

  return (
    <Page style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.title}>Top Search Queries</Text>
        <Text style={styles.subtitle}>
          Search queries driving traffic to {data.clientDomain} | {data.reportPeriod.startDate} - {data.reportPeriod.endDate}
        </Text>
      </View>

      {hasQueriesData ? (
        <View style={styles.tableContainer}>
          <View style={styles.tableHeader}>
            <Text style={styles.queryHeaderText}>Query</Text>
            <Text style={styles.tableHeaderText}>Clicks</Text>
            <Text style={styles.tableHeaderText}>Impressions</Text>
            <Text style={styles.tableHeaderText}>CTR</Text>
            <Text style={styles.tableHeaderText}>Position</Text>
          </View>
          {data.gscData?.topQueries?.slice(0, 20).map((query, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={styles.queryCell}>
                {query.query.length > 50 ? `${query.query.substring(0, 50)}...` : query.query}
              </Text>
              <Text style={styles.tableCell}>{formatNumber(query.clicks)}</Text>
              <Text style={styles.tableCell}>{formatNumber(query.impressions)}</Text>
              <Text style={styles.tableCell}>{formatPercentage(query.ctr)}</Text>
              <Text style={styles.tableCell}>{formatDecimal(query.position, 1)}</Text>
            </View>
          ))}
        </View>
      ) : (
        <Text style={styles.noDataText}>
          No query data available for this period
        </Text>
      )}

      <ReportFooter branding={data.branding} />
    </Page>
  );
};