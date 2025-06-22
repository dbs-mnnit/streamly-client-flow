
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Users, FileText, File, Receipt, DollarSign, Plus, ArrowUpRight, Activity } from 'lucide-react';
import { mockClients, mockProposals, mockInvoices } from '@/data/mockData';

const Dashboard = () => {
  const totalClients = mockClients.length;
  const proposalsSent = mockProposals.length;
  const contractsSigned = mockClients.filter(c => c.status === 'contract_signed').length;
  const invoicesPaid = mockInvoices.filter(i => i.status === 'paid').length;
  const totalRevenue = mockInvoices.filter(i => i.status === 'paid').reduce((sum, i) => sum + i.total, 0);
  const paymentsOverdue = mockInvoices.filter(i => i.status === 'overdue').length;

  const recentClients = mockClients.slice(0, 5);
  const recentActivity = [
    { type: 'client', message: 'New client Sarah Johnson submitted intake form', time: '2 hours ago' },
    { type: 'proposal', message: 'Proposal sent to Emily Rodriguez', time: '4 hours ago' },
    { type: 'payment', message: 'Payment received from David Park ($12,960)', time: '1 day ago' },
    { type: 'contract', message: 'Contract signed by Michael Chen', time: '2 days ago' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'contract_signed':
        return 'bg-blue-100 text-blue-800';
      case 'proposal_sent':
        return 'bg-yellow-100 text-yellow-800';
      case 'invoice_paid':
        return 'bg-purple-100 text-purple-800';
      case 'form_submitted':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatStatus = (status: string) => {
    return status.replace('_', ' ').toUpperCase();
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">Welcome back! Here's what's happening with your clients.</p>
        </div>
        <div className="flex space-x-2">
          <Link to="/clients">
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              New Client
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-gray-600">Total Clients</CardTitle>
              <Users className="h-4 w-4 text-gray-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{totalClients}</div>
            <p className="text-xs text-green-600 flex items-center mt-1">
              <ArrowUpRight className="h-3 w-3 mr-1" />
              +2 this week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-gray-600">Proposals Sent</CardTitle>
              <FileText className="h-4 w-4 text-gray-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{proposalsSent}</div>
            <p className="text-xs text-green-600 flex items-center mt-1">
              <ArrowUpRight className="h-3 w-3 mr-1" />
              +1 this week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-gray-600">Contracts Signed</CardTitle>
              <File className="h-4 w-4 text-gray-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{contractsSigned}</div>
            <p className="text-xs text-blue-600 flex items-center mt-1">
              <ArrowUpRight className="h-3 w-3 mr-1" />
              +1 this week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-gray-600">Invoices Paid</CardTitle>
              <Receipt className="h-4 w-4 text-gray-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{invoicesPaid}</div>
            <p className="text-xs text-green-600 flex items-center mt-1">
              <ArrowUpRight className="h-3 w-3 mr-1" />
              +1 this week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-gray-600">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-gray-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">${totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-green-600 flex items-center mt-1">
              <ArrowUpRight className="h-3 w-3 mr-1" />
              +15% this month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-gray-600">Payments Due</CardTitle>
              <DollarSign className="h-4 w-4 text-red-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{paymentsOverdue}</div>
            <p className="text-xs text-red-600 flex items-center mt-1">
              Requires attention
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Clients and Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Recent Clients</CardTitle>
              <Link to="/clients">
                <Button variant="ghost" size="sm">View all</Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentClients.map((client) => (
                <div key={client.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={client.avatar} />
                      <AvatarFallback>{client.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{client.name}</p>
                      <p className="text-xs text-gray-500">{client.company}</p>
                    </div>
                  </div>
                  <Badge className={`text-xs ${getStatusColor(client.status)}`}>
                    {formatStatus(client.status)}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Activity className="h-5 w-5 mr-2" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">{activity.message}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
