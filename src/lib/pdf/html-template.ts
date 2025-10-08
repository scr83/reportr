interface ReportData {
  clientName: string
  startDate: string
  endDate: string
  agencyName?: string
  agencyLogo?: string
  gscData: {
    clicks: number
    impressions: number
    ctr: number
    position: number
    topQueries?: Array<{
      query: string
      clicks: number
      impressions: number
      ctr: number
      position: number
    }>
  }
  ga4Data: {
    users: number
    sessions: number
    bounceRate: number
    conversions: number
  }
}

export function generateReportHTML(data: ReportData): string {
  const formatNumber = (num: number): string => {
    return num.toLocaleString()
  }

  const formatDate = (dateStr: string): string => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const agencyName = data.agencyName || 'SEO Agency'

  return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>SEO Report - ${data.clientName}</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            font-size: 12px;
            line-height: 1.4;
            color: #1e293b;
        }
        
        .page {
            width: 210mm;
            min-height: 297mm;
            padding: 20mm;
            margin: 0 auto;
            background: white;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
        }
        
        .page-break {
            page-break-before: always;
        }
        
        /* Cover Page */
        .cover-page {
            background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
            color: white;
            text-align: center;
            padding: 60px 40px;
            border-radius: 12px;
            margin-bottom: 40px;
        }
        
        .cover-title {
            font-size: 36px;
            font-weight: bold;
            margin-bottom: 20px;
            text-shadow: 0 2px 4px rgba(0,0,0,0.3);
        }
        
        .cover-subtitle {
            font-size: 24px;
            margin-bottom: 30px;
            opacity: 0.9;
        }
        
        .cover-period {
            font-size: 18px;
            opacity: 0.8;
            margin-bottom: 40px;
        }
        
        .cover-agency {
            font-size: 16px;
            opacity: 0.7;
            border-top: 1px solid rgba(255,255,255,0.3);
            padding-top: 20px;
        }
        
        /* Headers */
        .section-header {
            font-size: 24px;
            font-weight: bold;
            color: #6366f1;
            margin: 40px 0 20px 0;
            padding-bottom: 10px;
            border-bottom: 3px solid #6366f1;
        }
        
        .page-title {
            font-size: 32px;
            font-weight: bold;
            color: #6366f1;
            margin-bottom: 20px;
            text-align: center;
        }
        
        /* Metrics Grid */
        .metrics-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
            margin-bottom: 40px;
        }
        
        .metric-card {
            background: #f8fafc;
            padding: 20px;
            border-radius: 8px;
            border-left: 4px solid #6366f1;
            box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }
        
        .metric-label {
            font-size: 12px;
            color: #64748b;
            text-transform: uppercase;
            font-weight: bold;
            margin-bottom: 8px;
        }
        
        .metric-value {
            font-size: 28px;
            font-weight: bold;
            color: #1e293b;
        }
        
        /* Tables */
        .table {
            width: 100%;
            border-collapse: collapse;
            margin: 20px 0;
            box-shadow: 0 1px 3px rgba(0,0,0,0.1);
            border-radius: 8px;
            overflow: hidden;
        }
        
        .table th {
            background: #6366f1;
            color: white;
            padding: 12px;
            text-align: left;
            font-weight: bold;
        }
        
        .table td {
            padding: 12px;
            border-bottom: 1px solid #e2e8f0;
        }
        
        .table tr:nth-child(even) {
            background: #f8fafc;
        }
        
        .table tr:hover {
            background: #f1f5f9;
        }
        
        /* Summary Section */
        .summary-section {
            background: #f0f9ff;
            padding: 30px;
            border-radius: 12px;
            border: 1px solid #bae6fd;
            margin-bottom: 30px;
        }
        
        .summary-title {
            font-size: 20px;
            font-weight: bold;
            color: #0369a1;
            margin-bottom: 15px;
        }
        
        .summary-text {
            font-size: 14px;
            line-height: 1.6;
            color: #0f172a;
        }
        
        /* Footer */
        .footer {
            text-align: center;
            margin-top: 40px;
            padding-top: 20px;
            border-top: 1px solid #e2e8f0;
            color: #64748b;
            font-size: 11px;
        }
        
        @media print {
            .page {
                box-shadow: none;
                margin: 0;
            }
        }
    </style>
</head>
<body>
    <!-- Cover Page -->
    <div class="page">
        <div class="cover-page">
            <h1 class="cover-title">SEO Performance Report</h1>
            <h2 class="cover-subtitle">${data.clientName}</h2>
            <p class="cover-period">${formatDate(data.startDate)} - ${formatDate(data.endDate)}</p>
            <p class="cover-agency">Prepared by ${agencyName}</p>
        </div>
        
        <div class="summary-section">
            <h3 class="summary-title">Executive Summary</h3>
            <div class="summary-text">
                This comprehensive SEO report provides insights into your website's search performance 
                for the period from ${formatDate(data.startDate)} to ${formatDate(data.endDate)}. 
                The analysis includes data from Google Search Console and Google Analytics 4, 
                offering a complete view of your organic search presence and user engagement metrics.
            </div>
        </div>
    </div>

    <!-- Google Search Console Page -->
    <div class="page page-break">
        <h1 class="page-title">Google Search Console</h1>
        
        <div class="metrics-grid">
            <div class="metric-card">
                <div class="metric-label">Total Clicks</div>
                <div class="metric-value">${formatNumber(data.gscData.clicks)}</div>
            </div>
            <div class="metric-card">
                <div class="metric-label">Total Impressions</div>
                <div class="metric-value">${formatNumber(data.gscData.impressions)}</div>
            </div>
            <div class="metric-card">
                <div class="metric-label">Average CTR</div>
                <div class="metric-value">${data.gscData.ctr.toFixed(2)}%</div>
            </div>
            <div class="metric-card">
                <div class="metric-label">Average Position</div>
                <div class="metric-value">${data.gscData.position.toFixed(1)}</div>
            </div>
        </div>

        ${data.gscData.topQueries && data.gscData.topQueries.length > 0 ? `
        <h2 class="section-header">Top Performing Keywords</h2>
        <table class="table">
            <thead>
                <tr>
                    <th>Keyword</th>
                    <th>Clicks</th>
                    <th>Impressions</th>
                    <th>CTR</th>
                    <th>Position</th>
                </tr>
            </thead>
            <tbody>
                ${data.gscData.topQueries.slice(0, 10).map(query => `
                <tr>
                    <td>${query.query}</td>
                    <td>${formatNumber(query.clicks)}</td>
                    <td>${formatNumber(query.impressions)}</td>
                    <td>${query.ctr.toFixed(2)}%</td>
                    <td>${query.position.toFixed(1)}</td>
                </tr>
                `).join('')}
            </tbody>
        </table>
        ` : ''}
    </div>

    <!-- Google Analytics 4 Page -->
    <div class="page page-break">
        <h1 class="page-title">Google Analytics 4</h1>
        
        <div class="metrics-grid">
            <div class="metric-card">
                <div class="metric-label">Total Users</div>
                <div class="metric-value">${formatNumber(data.ga4Data.users)}</div>
            </div>
            <div class="metric-card">
                <div class="metric-label">Total Sessions</div>
                <div class="metric-value">${formatNumber(data.ga4Data.sessions)}</div>
            </div>
            <div class="metric-card">
                <div class="metric-label">Bounce Rate</div>
                <div class="metric-value">${data.ga4Data.bounceRate.toFixed(1)}%</div>
            </div>
            <div class="metric-card">
                <div class="metric-label">Conversions</div>
                <div class="metric-value">${formatNumber(data.ga4Data.conversions)}</div>
            </div>
        </div>

        <div class="summary-section">
            <h3 class="summary-title">Key Performance Insights</h3>
            <div class="summary-text">
                <ul style="list-style-type: disc; margin-left: 20px; line-height: 1.8;">
                    <li>Your website received <strong>${formatNumber(data.gscData.clicks)}</strong> clicks from search results</li>
                    <li>Search visibility reached <strong>${formatNumber(data.gscData.impressions)}</strong> impressions</li>
                    <li>Average click-through rate of <strong>${data.gscData.ctr.toFixed(2)}%</strong> indicates good search appeal</li>
                    <li>User engagement shows <strong>${formatNumber(data.ga4Data.users)}</strong> unique visitors</li>
                    <li>Conversion performance delivered <strong>${formatNumber(data.ga4Data.conversions)}</strong> goal completions</li>
                </ul>
            </div>
        </div>

        <div class="footer">
            <p>Generated on ${new Date().toLocaleDateString()} | ${agencyName}</p>
            <p>This report contains confidential and proprietary information</p>
        </div>
    </div>
</body>
</html>`
}