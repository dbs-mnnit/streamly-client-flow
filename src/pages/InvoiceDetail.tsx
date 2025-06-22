
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Edit, Download, Send, DollarSign } from 'lucide-react';
import { mockInvoices, mockClients } from '@/data/mockData';
import { toast } from 'sonner';

const InvoiceDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const invoice = mockInvoices.find(i => i.id === id);
  const client = invoice ? mockClients.find(c => c.id === invoice.clientId) : null;

  if (!invoice || !client) {
    return (
      <div className="p-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Invoice not found</h2>
          <p className="text-gray-600 mt-2">The invoice you're looking for doesn't exist.</p>
          <Button onClick={() => navigate('/invoices')} className="mt-4">
            Back to Invoices
          </Button>
        </div>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-800';
      case 'sent':
        return 'bg-blue-100 text-blue-800';
      case 'overdue':
        return 'bg-red-100 text-red-800';
      case 'draft':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const subtotal = invoice.services.reduce((sum, service) => sum + (service.quantity * service.rate), 0);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" onClick={() => navigate('/invoices')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Invoices
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
          {invoice.status === 'draft' && (
            <Button onClick={() => toast.success('Invoice sent to client!')}>
              <Send className="h-4 w-4 mr-2" />
              Send Invoice
            </Button>
          )}
        </div>
      </div>

      {/* Invoice Content */}
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader className="pb-8">
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-teal-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold">S</span>
                  </div>
                  <span className="text-xl font-bold text-gray-900">Stream</span>
                </div>
                <h1 className="text-3xl font-bold text-gray-900">Invoice</h1>
                <p className="text-gray-600">{invoice.number}</p>
              </div>
              <div className="text-right">
                <Badge className={getStatusColor(invoice.status)}>
                  {invoice.status.toUpperCase()}
                </Badge>
                <div className="mt-4 space-y-1 text-sm">
                  <p><span className="text-gray-600">Issue Date:</span> {new Date(invoice.createdAt).toLocaleDateString()}</p>
                  <p><span className="text-gray-600">Due Date:</span> {new Date(invoice.dueDate).toLocaleDateString()}</p>
                  {invoice.paidAt && (
                    <p><span className="text-gray-600">Paid Date:</span> {new Date(invoice.paidAt).toLocaleDateString()}</p>
                  )}
                </div>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-8">
            {/* Billing Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">From</h3>
                <div className="space-y-1 text-sm">
                  <p className="font-medium">StreamCorp Solutions</p>
                  <p>123 Business Street</p>
                  <p>San Francisco, CA 94105</p>
                  <p>john@streamcorp.com</p>
                  <p>+1 (555) 123-4567</p>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Bill To</h3>
                <div className="space-y-1 text-sm">
                  <p className="font-medium">{client.name}</p>
                  <p className="font-medium">{client.company}</p>
                  <p>456 Client Avenue</p>
                  <p>New York, NY 10001</p>
                  <p>{client.email}</p>
                </div>
              </div>
            </div>

            <Separator />

            {/* Services */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Services</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Description</th>
                      <th className="text-right py-3 px-4 font-medium text-gray-900">Quantity</th>
                      <th className="text-right py-3 px-4 font-medium text-gray-900">Rate</th>
                      <th className="text-right py-3 px-4 font-medium text-gray-900">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {invoice.services.map((service, index) => (
                      <tr key={index} className="border-b">
                        <td className="py-3 px-4 text-gray-700">{service.description}</td>
                        <td className="py-3 px-4 text-right text-gray-700">{service.quantity}</td>
                        <td className="py-3 px-4 text-right text-gray-700">${service.rate.toLocaleString()}</td>
                        <td className="py-3 px-4 text-right text-gray-700">${(service.quantity * service.rate).toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Totals */}
            <div className="flex justify-end">
              <div className="w-64 space-y-2">
                <div className="flex justify-between py-2">
                  <span className="text-gray-600">Subtotal:</span>
                  <span className="text-gray-900">${subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-gray-600">Tax:</span>
                  <span className="text-gray-900">${invoice.tax.toLocaleString()}</span>
                </div>
                <Separator />
                <div className="flex justify-between py-2 text-lg font-semibold">
                  <span className="text-gray-900">Total:</span>
                  <span className="text-gray-900">${invoice.total.toLocaleString()}</span>
                </div>
              </div>
            </div>

            <Separator />

            {/* Payment Information */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Information</h3>
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-blue-800 mb-2">
                  <strong>Payment Terms:</strong> Net 30 days
                </p>
                <p className="text-sm text-blue-800 mb-2">
                  <strong>Payment Methods:</strong> Bank transfer, Credit card, PayPal
                </p>
                {invoice.status !== 'paid' && (
                  <div className="mt-4">
                    <Button className="bg-blue-600 hover:bg-blue-700">
                      <DollarSign className="h-4 w-4 mr-2" />
                      Pay Now
                    </Button>
                  </div>
                )}
              </div>
            </div>

            {/* Notes */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Notes</h3>
              <p className="text-sm text-gray-600">
                Thank you for your business! Please contact us if you have any questions about this invoice.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default InvoiceDetail;
