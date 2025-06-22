
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Search, Filter, Send, CreditCard, DollarSign, TrendingUp } from 'lucide-react';
import { mockPayments, mockClients, mockInvoices } from '@/data/mockData';
import { toast } from 'sonner';

const Payments = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredPayments = mockPayments.filter(payment => {
    const client = mockClients.find(c => c.id === payment.clientId);
    const matchesSearch = client?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client?.company.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || payment.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-800';
      case 'partial':
        return 'bg-yellow-100 text-yellow-800';
      case 'unpaid':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getMethodIcon = (method: string) => {
    switch (method) {
      case 'card':
        return <CreditCard className="h-4 w-4" />;
      case 'bank':
        return <div className="h-4 w-4 bg-blue-600 rounded"></div>;
      case 'paypal':
        return <div className="h-4 w-4 bg-blue-500 rounded-full"></div>;
      default:
        return <CreditCard className="h-4 w-4" />;
    }
  };

  const totalReceived = filteredPayments.filter(p => p.status === 'paid').reduce((sum, p) => sum + p.amount, 0);
  const totalPending = mockInvoices.filter(i => i.status === 'sent').reduce((sum, i) => sum + i.total, 0);

  const handleSendReminder = (clientId: string) => {
    const client = mockClients.find(c => c.id === clientId);
    toast.success(`Payment reminder sent to ${client?.name}!`);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Payments</h1>
          <p className="text-gray-600 mt-1">Track payment history and manage outstanding invoices.</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Received</p>
                <p className="text-2xl font-bold text-green-600">${totalReceived.toLocaleString()}</p>
                <p className="text-xs text-green-600 flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +15% this month
                </p>
              </div>
              <DollarSign className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-yellow-600">${totalPending.toLocaleString()}</p>
                <p className="text-xs text-yellow-600 mt-1">2 invoices</p>
              </div>
              <DollarSign className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">This Month</p>
                <p className="text-2xl font-bold text-blue-600">${totalReceived.toLocaleString()}</p>
                <p className="text-xs text-blue-600 mt-1">1 payment</p>
              </div>
              <DollarSign className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search payments..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="paid">Paid</SelectItem>
                <SelectItem value="partial">Partial</SelectItem>
                <SelectItem value="unpaid">Unpaid</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Payments List */}
      <div className="space-y-4">
        {filteredPayments.map((payment) => {
          const client = mockClients.find(c => c.id === payment.clientId);
          const invoice = mockInvoices.find(i => i.id === payment.invoiceId);
          
          return (
            <Card key={payment.id} className="hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
                  <div className="flex items-center space-x-4 flex-1">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={client?.avatar} />
                      <AvatarFallback>{client?.name?.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{client?.name}</h3>
                        <Badge className={getStatusColor(payment.status)}>
                          {payment.status.toUpperCase()}
                        </Badge>
                      </div>
                      <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                        <span>Company: {client?.company}</span>
                        <span>Invoice: {invoice?.number}</span>
                        <span>Method: {payment.method.charAt(0).toUpperCase() + payment.method.slice(1)}</span>
                        <span>Date: {new Date(payment.date).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center space-x-2 mb-1">
                        {getMethodIcon(payment.method)}
                        <span className="text-xl font-bold text-gray-900">
                          ${payment.amount.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    {payment.status === 'unpaid' && (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleSendReminder(payment.clientId)}
                      >
                        <Send className="h-4 w-4 mr-2" />
                        Send Reminder
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Outstanding Invoices */}
      <Card>
        <CardHeader>
          <CardTitle>Outstanding Invoices</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockInvoices.filter(i => i.status === 'sent').map((invoice) => {
              const client = mockClients.find(c => c.id === invoice.clientId);
              const isOverdue = new Date(invoice.dueDate) < new Date();
              
              return (
                <div key={invoice.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={client?.avatar} />
                      <AvatarFallback>{client?.name?.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-gray-900">{invoice.number}</p>
                      <p className="text-sm text-gray-600">
                        {client?.name} • Due: {new Date(invoice.dueDate).toLocaleDateString()}
                        {isOverdue && <span className="text-red-600 ml-2">(Overdue)</span>}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="font-semibold text-gray-900">${invoice.total.toLocaleString()}</span>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleSendReminder(invoice.clientId)}
                    >
                      <Send className="h-4 w-4 mr-2" />
                      Send Reminder
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
          
          {mockInvoices.filter(i => i.status === 'sent').length === 0 && (
            <div className="text-center py-8">
              <DollarSign className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No outstanding invoices. Great job!</p>
            </div>
          )}
        </CardContent>
      </Card>

      {filteredPayments.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <DollarSign className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No payments found</h3>
            <p className="text-gray-600">
              {searchTerm || statusFilter !== 'all' 
                ? 'Try adjusting your search or filter criteria.' 
                : 'Payment history will appear here once you receive payments.'}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Payments;
