
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Edit, Download, Send, FileText } from 'lucide-react';
import { mockContracts, mockClients } from '@/data/mockData';
import { toast } from 'sonner';

const ContractDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const contract = mockContracts.find(c => c.id === id);
  const client = contract ? mockClients.find(c => c.id === contract.clientId) : null;

  if (!contract || !client) {
    return (
      <div className="p-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Contract not found</h2>
          <p className="text-gray-600 mt-2">The contract you're looking for doesn't exist.</p>
          <Button onClick={() => navigate('/contracts')} className="mt-4">
            Back to Contracts
          </Button>
        </div>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'signed':
        return 'bg-green-100 text-green-800';
      case 'sent':
        return 'bg-blue-100 text-blue-800';
      case 'viewed':
        return 'bg-yellow-100 text-yellow-800';
      case 'draft':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" onClick={() => navigate('/contracts')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Contracts
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
          {contract.status === 'draft' && (
            <Button onClick={() => toast.success('Contract sent to client!')}>
              <Send className="h-4 w-4 mr-2" />
              Send Contract
            </Button>
          )}
        </div>
      </div>

      {/* Contract Content */}
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader className="text-center pb-8">
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-teal-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">S</span>
              </div>
            </div>
            <CardTitle className="text-3xl font-bold text-gray-900 mb-2">
              Service Agreement
            </CardTitle>
            <div className="flex justify-center">
              <Badge className={getStatusColor(contract.status)}>
                {contract.status.toUpperCase()}
              </Badge>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-8">
            {/* Contract Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Service Provider</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="font-medium text-gray-900">StreamCorp Solutions</p>
                  <p className="text-gray-600">john@streamcorp.com</p>
                  <p className="text-gray-600">+1 (555) 123-4567</p>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Client</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="font-medium text-gray-900">{client.name}</p>
                  <p className="text-gray-600">{client.company}</p>
                  <p className="text-gray-600">{client.email}</p>
                </div>
              </div>
            </div>

            <Separator />

            {/* Project Description */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Project Description</h3>
              <p className="text-gray-700 leading-relaxed">{contract.title}</p>
            </div>

            <Separator />

            {/* Terms and Conditions */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Terms and Conditions</h3>
              <div className="prose prose-sm max-w-none text-gray-700">
                <p className="mb-4">{contract.terms}</p>
                
                <h4 className="font-semibold text-gray-900 mb-2">1. Scope of Work</h4>
                <p className="mb-4">The service provider agrees to deliver the project as outlined in the approved proposal, including all specified deliverables and milestones.</p>
                
                <h4 className="font-semibold text-gray-900 mb-2">2. Payment Terms</h4>
                <p className="mb-4">Payment schedule: {contract.paymentSchedule}</p>
                
                <h4 className="font-semibold text-gray-900 mb-2">3. Timeline</h4>
                <p className="mb-4">The project is expected to be completed within the agreed timeline, subject to client feedback and approval at each milestone.</p>
                
                <h4 className="font-semibold text-gray-900 mb-2">4. Intellectual Property</h4>
                <p className="mb-4">Upon full payment, all intellectual property rights for the deliverables will be transferred to the client.</p>
                
                <h4 className="font-semibold text-gray-900 mb-2">5. Termination</h4>
                <p className="mb-4">Either party may terminate this agreement with 30 days written notice. Client is responsible for payment of all work completed up to the termination date.</p>
              </div>
            </div>

            <Separator />

            {/* Signature Section */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Digital Signatures</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="border-2 border-dashed border-gray-300 p-6 rounded-lg text-center">
                  <h4 className="font-medium text-gray-900 mb-2">Service Provider</h4>
                  <div className="h-16 flex items-center justify-center">
                    <div className="text-blue-600 font-cursive text-xl">John Smith</div>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">Signed on {new Date().toLocaleDateString()}</p>
                </div>
                
                <div className="border-2 border-dashed border-gray-300 p-6 rounded-lg text-center">
                  <h4 className="font-medium text-gray-900 mb-2">Client</h4>
                  <div className="h-16 flex items-center justify-center">
                    {contract.status === 'signed' ? (
                      <>
                        <div className="text-green-600 font-cursive text-xl">{client.name}</div>
                      </>
                    ) : (
                      <div className="text-gray-400">Awaiting signature</div>
                    )}
                  </div>
                  {contract.signedAt ? (
                    <p className="text-sm text-gray-500 mt-2">Signed on {new Date(contract.signedAt).toLocaleDateString()}</p>
                  ) : (
                    <p className="text-sm text-gray-400 mt-2">Pending signature</p>
                  )}
                </div>
              </div>
            </div>

            {/* Contract Details */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Contract Date:</span>
                  <span className="ml-2 font-medium">{new Date(contract.createdAt).toLocaleDateString()}</span>
                </div>
                <div>
                  <span className="text-gray-600">Contract ID:</span>
                  <span className="ml-2 font-medium">CTR-{contract.id}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ContractDetail;
