
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Search, Filter, Eye, Edit, Send } from 'lucide-react';
import { mockProposals, mockClients } from '@/data/mockData';
import { toast } from 'sonner';

const Proposals = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  // New proposal form state
  const [newProposal, setNewProposal] = useState({
    clientId: '',
    title: '',
    description: '',
    deliverables: '',
    timeline: '',
    price: ''
  });

  const filteredProposals = mockProposals.filter(proposal => {
    const client = mockClients.find(c => c.id === proposal.clientId);
    const matchesSearch = proposal.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client?.company.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || proposal.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'sent':
        return 'bg-blue-100 text-blue-800';
      case 'draft':
        return 'bg-gray-100 text-gray-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleCreateProposal = async () => {
    if (!newProposal.clientId || !newProposal.title || !newProposal.description || !newProposal.price) {
      toast.error('Please fill in all required fields');
      return;
    }

    // Mock proposal creation
    setTimeout(() => {
      toast.success('Proposal created successfully!');
      setIsDialogOpen(false);
      setNewProposal({
        clientId: '',
        title: '',
        description: '',
        deliverables: '',
        timeline: '',
        price: ''
      });
    }, 1000);
  };

  const handleSendProposal = (proposalId: string) => {
    toast.success('Proposal sent to client!');
    toast.info('Client will receive an email with the proposal details.');
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Proposals</h1>
          <p className="text-gray-600 mt-1">Create and manage project proposals for your clients.</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              New Proposal
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Proposal</DialogTitle>
              <DialogDescription>
                Create a professional proposal for your client.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="client">Client *</Label>
                <Select onValueChange={(value) => setNewProposal({ ...newProposal, clientId: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a client" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockClients.map((client) => (
                      <SelectItem key={client.id} value={client.id}>
                        {client.name} - {client.company}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="title">Proposal Title *</Label>
                <Input
                  id="title"
                  placeholder="e.g., E-commerce Website Development"
                  value={newProposal.title}
                  onChange={(e) => setNewProposal({ ...newProposal, title: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  placeholder="Describe the project scope and objectives..."
                  value={newProposal.description}
                  onChange={(e) => setNewProposal({ ...newProposal, description: e.target.value })}
                  className="min-h-24"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="deliverables">Deliverables</Label>
                <Textarea
                  id="deliverables"
                  placeholder="List the key deliverables (one per line)..."
                  value={newProposal.deliverables}
                  onChange={(e) => setNewProposal({ ...newProposal, deliverables: e.target.value })}
                  className="min-h-20"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="timeline">Timeline</Label>
                  <Input
                    id="timeline"
                    placeholder="e.g., 6-8 weeks"
                    value={newProposal.timeline}
                    onChange={(e) => setNewProposal({ ...newProposal, timeline: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="price">Price *</Label>
                  <Input
                    id="price"
                    type="number"
                    placeholder="0"
                    value={newProposal.price}
                    onChange={(e) => setNewProposal({ ...newProposal, price: e.target.value })}
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-2 pt-4">
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreateProposal}>
                  Create Proposal
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
                placeholder="Search proposals..."
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
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="sent">Sent</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Proposals List */}
      <div className="space-y-4">
        {filteredProposals.map((proposal) => {
          const client = mockClients.find(c => c.id === proposal.clientId);
          return (
            <Card key={proposal.id} className="hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{proposal.title}</h3>
                      <Badge className={getStatusColor(proposal.status)}>
                        {proposal.status.toUpperCase()}
                      </Badge>
                    </div>
                    <p className="text-gray-600 mb-2">{proposal.description}</p>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                      <span>Client: {client?.name} ({client?.company})</span>
                      <span>Timeline: {proposal.timeline}</span>
                      <span>Price: ${proposal.price.toLocaleString()}</span>
                      <span>Created: {new Date(proposal.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Link to={`/proposals/${proposal.id}`}>
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-2" />
                        View
                      </Button>
                    </Link>
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                    {proposal.status === 'draft' && (
                      <Button 
                        size="sm"
                        onClick={() => handleSendProposal(proposal.id)}
                      >
                        <Send className="h-4 w-4 mr-2" />
                        Send
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredProposals.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <FileText className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No proposals found</h3>
            <p className="text-gray-600 mb-4">
              {searchTerm || statusFilter !== 'all' 
                ? 'Try adjusting your search or filter criteria.' 
                : 'Create your first proposal to get started.'}
            </p>
            {!searchTerm && statusFilter === 'all' && (
              <Button onClick={() => setIsDialogOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Create Proposal
              </Button>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Proposals;
