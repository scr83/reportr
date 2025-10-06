import { 
  Typography, 
  Container, 
  Card, 
  Grid, 
  Icon,
  Button,
  Badge 
} from '@/components/atoms'
import { 
  FileText, 
  Download, 
  Clock, 
  CheckCircle,
  AlertCircle,
  Plus 
} from 'lucide-react'

export default function ReportsPage() {
  const reports = [
    {
      id: '1',
      client: 'TechCorp Solutions',
      type: 'Monthly SEO Report',
      status: 'completed',
      generatedAt: '2024-01-15',
      fileSize: '2.3 MB'
    },
    {
      id: '2',
      client: 'Digital Marketing Pro',
      type: 'Quarterly Analysis',
      status: 'processing',
      generatedAt: '2024-01-14',
      fileSize: '-'
    },
    {
      id: '3',
      client: 'Local Business Hub',
      type: 'Weekly Summary',
      status: 'completed',
      generatedAt: '2024-01-13',
      fileSize: '1.8 MB'
    },
    {
      id: '4',
      client: 'E-commerce Plus',
      type: 'Monthly SEO Report',
      status: 'failed',
      generatedAt: '2024-01-12',
      fileSize: '-'
    }
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return CheckCircle
      case 'processing':
        return Clock
      case 'failed':
        return AlertCircle
      default:
        return FileText
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'success'
      case 'processing':
        return 'warning'
      case 'failed':
        return 'error'
      default:
        return 'neutral'
    }
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <Typography variant="h1" className="text-3xl font-bold text-neutral-900 mb-2">
            Reports
          </Typography>
          <Typography variant="body" className="text-neutral-600">
            Generate and manage SEO reports for your clients
          </Typography>
        </div>
        <Button size="lg" className="px-6 py-3">
          <Icon icon={Plus} size="sm" className="mr-2" />
          Generate Report
        </Button>
      </div>

      {/* Stats Cards */}
      <Grid cols={1} gap="lg" className="sm:grid-cols-4 mb-8">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <Typography variant="caption" className="text-neutral-600 font-medium">
              Total Reports
            </Typography>
            <Icon icon={FileText} size="sm" className="text-brand-600" />
          </div>
          <Typography variant="h2" className="text-2xl font-bold text-neutral-900">
            48
          </Typography>
        </Card>
        
        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <Typography variant="caption" className="text-neutral-600 font-medium">
              This Month
            </Typography>
            <Icon icon={Clock} size="sm" className="text-green-600" />
          </div>
          <Typography variant="h2" className="text-2xl font-bold text-neutral-900">
            12
          </Typography>
        </Card>
        
        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <Typography variant="caption" className="text-neutral-600 font-medium">
              Completed
            </Typography>
            <Icon icon={CheckCircle} size="sm" className="text-green-600" />
          </div>
          <Typography variant="h2" className="text-2xl font-bold text-neutral-900">
            45
          </Typography>
        </Card>
        
        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <Typography variant="caption" className="text-neutral-600 font-medium">
              Processing
            </Typography>
            <Icon icon={AlertCircle} size="sm" className="text-yellow-600" />
          </div>
          <Typography variant="h2" className="text-2xl font-bold text-neutral-900">
            3
          </Typography>
        </Card>
      </Grid>

      {/* Reports List */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <Typography variant="h3" className="text-xl font-semibold text-neutral-900">
            Recent Reports
          </Typography>
          <Button variant="ghost" size="sm">
            View All
          </Button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-neutral-200">
                <th className="text-left py-3 px-4 font-medium text-neutral-600">Client</th>
                <th className="text-left py-3 px-4 font-medium text-neutral-600">Report Type</th>
                <th className="text-left py-3 px-4 font-medium text-neutral-600">Status</th>
                <th className="text-left py-3 px-4 font-medium text-neutral-600">Generated</th>
                <th className="text-left py-3 px-4 font-medium text-neutral-600">Size</th>
                <th className="text-left py-3 px-4 font-medium text-neutral-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((report) => (
                <tr key={report.id} className="border-b border-neutral-100 hover:bg-neutral-50">
                  <td className="py-4 px-4">
                    <Typography variant="body" className="font-medium text-neutral-900">
                      {report.client}
                    </Typography>
                  </td>
                  <td className="py-4 px-4">
                    <Typography variant="body" className="text-neutral-700">
                      {report.type}
                    </Typography>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-2">
                      <Icon 
                        icon={getStatusIcon(report.status)} 
                        size="sm" 
                        className={`text-${getStatusColor(report.status) === 'success' ? 'green' : 
                                   getStatusColor(report.status) === 'warning' ? 'yellow' : 
                                   getStatusColor(report.status) === 'error' ? 'red' : 'neutral'}-600`}
                      />
                      <Badge variant={getStatusColor(report.status) as any} size="sm">
                        {report.status}
                      </Badge>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <Typography variant="caption" className="text-neutral-600">
                      {report.generatedAt}
                    </Typography>
                  </td>
                  <td className="py-4 px-4">
                    <Typography variant="caption" className="text-neutral-600">
                      {report.fileSize}
                    </Typography>
                  </td>
                  <td className="py-4 px-4">
                    {report.status === 'completed' && (
                      <Button variant="ghost" size="sm">
                        <Icon icon={Download} size="sm" className="mr-2" />
                        Download
                      </Button>
                    )}
                    {report.status === 'failed' && (
                      <Button variant="ghost" size="sm" className="text-red-600">
                        Retry
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}