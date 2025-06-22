
import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Mail, Phone, Calendar, DollarSign, FileText, File, Receipt, MessageCircle, Plus, Edit } from 'lucide-react';
import { mockClients, mockProposals, mockContracts, mockInvoices, mockChatMessages } from '@/data/mockData';
import { toast } from 'sonner';

const ClientDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [notes, setNotes] = useState('');
  
  const client = mockClients.find(c => c.id === id);
  const clientProposals = mockProposals.filter(p => p.clientId === id);
  const clientContracts = mockContracts.filter(c => c.clientId === id);
  const clientInvoices = mockInvoices.filter(i => i.clientId === id);
  const clientMessages = mockChatMessages.filter(m => m.clientId === id);

  if (!client) {
    return (
      <div className="p-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Client not found</h2>
          <p className="text-gray-600 mt-2">The client you're looking for doesn't exist.</p>
          <Link to="/clients">
            <Button className="mt-4">Back to Clients</Button>
          </Link>
        </div>
      </div>
    );
  }

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

  const handleCreateProposal = () => {
    toast.success('Redirecting to proposal builder...');
    navigate('/proposals');
  };

  const handleSendContract = () => {
    toast.success('Contract template created and sent!');
  };

  const handleGenerateInvoice = () => {
    toast.success('Invoice generated and ready to send!');
    navigate('/invoices');
  };

  const handleSaveNotes = () => {
    toast.success('Notes saved successfully!');
  };

  const timeline = [
    { date: client.createdAt, event: 'Client intake form submitted', type: 'form' },
    ...(clientProposals.length > 0 ? [{ date: clientProposals[0].createdAt, event: 'Proposal created and sent', type: 'proposal' }] : []),
    ...(clientContracts.length > 0 ? [{ date: clientContracts[0].createdAt, event: 'Contract sent for signature', type: 'contract' }] : []),
    ...(clientContracts.filter(c => c.status === 'signed').length > 0 ? [{ date: clientContracts.filter(c => c.status === 'signed')[0].signedAt!, event: 'Contract signed', type: 'signed' }] : []),
    ...(clientInvoices.length > 0 ? [{ date: clientInvoices[0].createdAt, event: 'Invoice generated', type: 'invoice' }] : []),
    ...(clientInvoices.filter(i => i.status === 'paid').length > 0 ? [{ date: clientInvoices.filter(i => i.status === 'paid')[0].paidAt!, event: 'Payment received', type: 'payment' }] : []),
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="sm" onClick={() => navigate('/clients')}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Clients
        </Button>
      </div>

      {/* Client Profile */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={client.avatar} />
                <AvatarFallback className="text-lg">{client.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{client.name}</h1>
                <p className="text-gray-600">{client.company}</p>
                <Badge className={`mt-2 ${getStatusColor(client.status)}`}>
                  {formatStatus(client.status)}
                </Badge>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" onClick={handleCreateProposal}>
                <FileText className="h-4 w-4 mr-2" />
                Create Proposal
              </Button>
              <Button variant="outline" onClick={handleSendContract}>
                <File className="h-4 w-4 mr-2" />
                Send Contract
              </Button>
              <Button variant="outline" onClick={handleGenerateInvoice}>
                <Receipt className="h-4 w-4 mr-2" />
                Generate Invoice
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-gray-900">Contact Information</h3>
                <div className="mt-2 space-y-2">
                  <div className="flex items-center space-x-2 text-sm">
                    <Mail className="h-4 w-4 text-gray-400" />
                    <span>{client.email}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <Phone className="h-4 w-4 text-gray-400" />
                    <span>+1 (555) 123-4567</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-gray-900">Project Details</h3>
                <div className="mt-2 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Type:</span>
                    <span>{client.projectType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Budget:</span>
                    <span>${client.budget.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Start Date:</span>
                    <span>{new Date(client.startDate).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-gray-900">Timeline</h3>
                <div className="mt-2 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Created:</span>
                    <span>{new Date(client.createdAt).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Last Activity:</span>
                    <span>{new Date(client.lastActivity).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs defaultValue="activity" className="space-y-4">
        <TabsList>
          <TabsTrigger value="activity">Activity Timeline</TabsTrigger>
          <TabsTrigger value="proposals">Proposals ({clientProposals.length})</TabsTrigger>
          <TabsTrigger value="contracts">Contracts ({clientContracts.length})</TabsTrigger>
          <TabsTrigger value="invoices">Invoices ({clientInvoices.length})</TabsTrigger>
          <TabsTrigger value="notes">Notes</TabsTrigger>
        </TabsList>

        <TabsContent value="activity">
          <Card>
            <CardHeader>
              <CardTitle>Activity Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {timeline.map((item, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{item.event}</p>
                      <p className="text-xs text-gray-500">{new Date(item.date).toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="proposals">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Proposals</CardTitle>
                <Button size="sm" onClick={handleCreateProposal}>
                  <Plus className="h-4 w-4 mr-2" />
                  New Proposal
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {clientProposals.length > 0 ? (
                <div className="space-y-4">
                  {clientProposals.map((proposal) => (
                    <div key={proposal.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-medium text-gray-900">{proposal.title}</h3>
                        <Badge variant={proposal.status === 'approved' ? 'default' : 'secondary'}>
                          {proposal.status.toUpperCase()}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{proposal.description}</p>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-500">
                          Created: {new Date(proposal.createdAt).toLocaleDateString()}
                        </span>
                        <span className="font-medium">${proposal.price.toLocaleString()}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">No proposals yet. Create one to get started!</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contracts">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Contracts</CardTitle>
                <Button size="sm" onClick={handleSendContract}>
                  <Plus className="h-4 w-4 mr-2" />
                  New Contract
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {clientContracts.length > 0 ? (
                <div className="space-y-4">
                  {clientContracts.map((contract) => (
                    <div key={contract.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-medium text-gray-900">{contract.title}</h3>
                        <Badge variant={contract.status === 'signed' ? 'default' : 'secondary'}>
                          {contract.status.toUpperCase()}
                        </Badge>
                      </div>
                      <div className="text-sm text-gray-600 space-y-1">
                        <p>Payment Schedule: {contract.paymentSchedule}</p>
                        <p>Created: {new Date(contract.createdAt).toLocaleDateString()}</p>
                        {contract.signedAt && (
                          <p>Signed: {new Date(contract.signedAt).toLocaleDateString()}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <File className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">No contracts yet. Send one to formalize the agreement!</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="invoices">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Invoices</CardTitle>
                <Button size="sm" onClick={handleGenerateInvoice}>
                  <Plus className="h-4 w-4 mr-2" />
                  New Invoice
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {clientInvoices.length > 0 ? (
                <div className="space-y-4">
                  {clientInvoices.map((invoice) => (
                    <div key={invoice.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-medium text-gray-900">{invoice.number}</h3>
                        <Badge variant={invoice.status === 'paid' ? 'default' : 'secondary'}>
                          {invoice.status.toUpperCase()}
                        </Badge>
                      </div>
                      <div className="text-sm text-gray-600 space-y-1">
                        <p>Total: ${invoice.total.toLocaleString()}</p>
                        <p>Due: {new Date(invoice.dueDate).toLocaleDateString()}</p>
                        {invoice.paidAt && (
                          <p>Paid: {new Date(invoice.paidAt).toLocaleDateString()}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Receipt className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">No invoices yet. Generate one to request payment!</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notes">
          <Card>
            <CardHeader>
              <CardTitle>Client Notes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">Initial Requirements</h4>
                <p className="text-sm text-gray-600">{client.notes}</p>
              </div>
              <Separator />
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Additional Notes</h4>
                <Textarea
                  placeholder="Add your notes about this client..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="min-h-32"
                />
                <Button onClick={handleSaveNotes} className="mt-2">
                  Save Notes
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            <Link to={`/chat`}>
              <Button variant="outline" size="sm">
                <MessageCircle className="h-4 w-4 mr-2" />
                Open Chat
              </Button>
            </Link>
            <Button variant="outline" size="sm" onClick={() => toast.info('Feature coming soon!')}>
              <Calendar className="h-4 w-4 mr-2" />
              Schedule Meeting
            </Button>
            <Button variant="outline" size="sm" onClick={() => toast.info('Feature coming soon!')}>
              <Edit className="h-4 w-4 mr-2" />
              Edit Client Info
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ClientDetail;
