
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Plus, Search, Filter, Mail, Phone } from 'lucide-react';
import { mockClients } from '@/data/mockData';
import { toast } from 'sonner';

const Clients = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const filteredClients = mockClients.filter(client => {
    const matchesSearch = client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || client.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

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

  const generateFormUrl = () => {
    const formId = Math.random().toString(36).substring(7);
    return `${window.location.origin}/form/${formId}`;
  };

  const handleSendForm = (method: 'email' | 'sms') => {
    if (method === 'email' && !email) {
      toast.error('Please enter an email address');
      return;
    }
    if (method === 'sms' && !phone) {
      toast.error('Please enter a phone number');
      return;
    }

    const formUrl = generateFormUrl();
    
    if (method === 'email') {
      // Mock email sending
      setTimeout(() => {
        toast.success(`Intake form sent to ${email}!`);
        toast.info(`Form URL: ${formUrl}`);
        setEmail('');
        setIsDialogOpen(false);
      }, 1000);
    } else {
      // Mock SMS sending
      setTimeout(() => {
        toast.success(`Intake form sent via SMS to ${phone}!`);
        toast.info(`Form URL: ${formUrl}`);
        setPhone('');
        setIsDialogOpen(false);
      }, 1000);
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Clients</h1>
          <p className="text-gray-600 mt-1">Manage your client relationships and track their journey.</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Generate Client Form
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Generate Client Intake Form</DialogTitle>
              <DialogDescription>
                Send a personalized intake form to a potential client via email or SMS.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="email">Client Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter client's email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Button 
                  onClick={() => handleSendForm('email')}
                  className="w-full"
                  disabled={!email}
                >
                  <Mail className="h-4 w-4 mr-2" />
                  Send via Email
                </Button>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="flex-1 h-px bg-gray-200"></div>
                <span className="text-sm text-gray-500">OR</span>
                <div className="flex-1 h-px bg-gray-200"></div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone">Client Phone</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="Enter client's phone number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
                <Button 
                  onClick={() => handleSendForm('sms')}
                  className="w-full"
                  disabled={!phone}
                >
                  <Phone className="h-4 w-4 mr-2" />
                  Send via SMS
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search clients..."
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
                <SelectItem value="form_submitted">Form Submitted</SelectItem>
                <SelectItem value="proposal_sent">Proposal Sent</SelectItem>
                <SelectItem value="contract_signed">Contract Signed</SelectItem>
                <SelectItem value="invoice_paid">Invoice Paid</SelectItem>
                <SelectItem value="active">Active</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Clients Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredClients.map((client) => (
          <Card key={client.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={client.avatar} />
                    <AvatarFallback>{client.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">{client.name}</CardTitle>
                    <p className="text-sm text-gray-600">{client.company}</p>
                  </div>
                </div>
                <Badge className={`text-xs ${getStatusColor(client.status)}`}>
                  {formatStatus(client.status)}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Project Type:</span>
                  <span className="font-medium">{client.projectType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Budget:</span>
                  <span className="font-medium">${client.budget.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Start Date:</span>
                  <span className="font-medium">{new Date(client.startDate).toLocaleDateString()}</span>
                </div>
              </div>
              <div className="pt-2">
                <Link to={`/clients/${client.id}`}>
                  <Button variant="outline" className="w-full">
                    View Details
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredClients.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No clients found</h3>
            <p className="text-gray-600 mb-4">
              {searchTerm || statusFilter !== 'all' 
                ? 'Try adjusting your search or filter criteria.' 
                : 'Get started by generating an intake form for your first client.'}
            </p>
            {!searchTerm && statusFilter === 'all' && (
              <Button onClick={() => setIsDialogOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Generate Client Form
              </Button>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Clients;
