
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Send, Edit, Download } from 'lucide-react';
import { mockProposals, mockClients } from '@/data/mockData';
import { toast } from 'sonner';

const ProposalDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const proposal = mockProposals.find(p => p.id === id);
  const client = proposal ? mockClients.find(c => c.id === proposal.clientId) : null;

  if (!proposal || !client) {
    return (
      <div className="p-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Proposal not found</h2>
          <p className="text-gray-600 mt-2">The proposal you're looking for doesn't exist.</p>
          <Button onClick={() => navigate('/proposals')} className="mt-4">
            Back to Proposals
          </Button>
        </div>
      </div>
    );
  }

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

  const deliverablesList = proposal.deliverables || [];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" onClick={() => navigate('/proposals')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Proposals
          </Button>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={() => toast.info('Edit feature coming soon!')}>
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </Button>
          <Button variant="outline" onClick={() => toast.info('Download feature coming soon!')}>
            <Download className="h-4 w-4 mr-2" />
            Download PDF
          </Button>
          {proposal.status === 'draft' && (
            <Button onClick={() => toast.success('Proposal sent to client!')}>
              <Send className="h-4 w-4 mr-2" />
              Send Proposal
            </Button>
          )}
        </div>
      </div>

      {/* Proposal Content */}
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader className="text-center pb-8">
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-teal-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">S</span>
              </div>
            </div>
            <CardTitle className="text-3xl font-bold text-gray-900 mb-2">
              {proposal.title}
            </CardTitle>
            <div className="flex justify-center">
              <Badge className={getStatusColor(proposal.status)}>
                {proposal.status.toUpperCase()}
              </Badge>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-8">
            {/* Client Information */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Prepared For</h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="font-medium text-gray-900">{client.name}</p>
                <p className="text-gray-600">{client.company}</p>
                <p className="text-gray-600">{client.email}</p>
              </div>
            </div>

            <Separator />

            {/* Project Description */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Project Overview</h3>
              <p className="text-gray-700 leading-relaxed">{proposal.description}</p>
            </div>

            <Separator />

            {/* Deliverables */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Project Deliverables</h3>
              <div className="space-y-3">
                {deliverablesList.map((deliverable, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-700">{deliverable}</p>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            {/* Timeline & Investment */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Timeline</h3>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-2xl font-bold text-blue-600">{proposal.timeline}</p>
                  <p className="text-blue-600 text-sm">Estimated completion time</p>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Investment</h3>
                <div className="bg-green-50 p-4 rounded-lg">
                  <p className="text-2xl font-bold text-green-600">${proposal.price.toLocaleString()}</p>
                  <p className="text-green-600 text-sm">Total project cost</p>
                </div>
              </div>
            </div>

            <Separator />

            {/* Next Steps */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Next Steps</h3>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0">
                    1
                  </div>
                  <p className="text-gray-700">Review this proposal and let us know if you have any questions</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0">
                    2
                  </div>
                  <p className="text-gray-700">Approve the proposal to move forward with the contract</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0">
                    3
                  </div>
                  <p className="text-gray-700">Sign the contract and make the initial payment to begin work</p>
                </div>
              </div>
            </div>

            {/* Proposal Details */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Proposal Date:</span>
                  <span className="ml-2 font-medium">{new Date(proposal.createdAt).toLocaleDateString()}</span>
                </div>
                {proposal.sentAt && (
                  <div>
                    <span className="text-gray-600">Sent Date:</span>
                    <span className="ml-2 font-medium">{new Date(proposal.sentAt).toLocaleDateString()}</span>
                  </div>
                )}
                {proposal.respondedAt && (
                  <div>
                    <span className="text-gray-600">Response Date:</span>
                    <span className="ml-2 font-medium">{new Date(proposal.respondedAt).toLocaleDateString()}</span>
                  </div>
                )}
                <div>
                  <span className="text-gray-600">Valid Until:</span>
                  <span className="ml-2 font-medium">{new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProposalDetail;
