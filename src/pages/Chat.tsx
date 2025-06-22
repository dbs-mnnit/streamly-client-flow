
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Send, Search, Phone, Video, MoreVertical, MessageCircle } from 'lucide-react';
import { mockClients, mockChatMessages } from '@/data/mockData';
import { toast } from 'sonner';

const Chat = () => {
  const [selectedClientId, setSelectedClientId] = useState(mockClients[0]?.id || '');
  const [message, setMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const selectedClient = mockClients.find(c => c.id === selectedClientId);
  const clientMessages = mockChatMessages.filter(m => m.clientId === selectedClientId);

  const filteredClients = mockClients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getLastMessage = (clientId: string) => {
    const messages = mockChatMessages.filter(m => m.clientId === clientId);
    return messages[messages.length - 1];
  };

  const handleSendMessage = () => {
    if (!message.trim()) return;
    
    toast.success('Message sent!');
    setMessage('');
  };

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="h-[calc(100vh-2rem)] flex">
      {/* Sidebar - Chat List */}
      <div className="w-80 border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Messages</h2>
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search conversations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {filteredClients.map((client) => {
            const lastMessage = getLastMessage(client.id);
            const isSelected = client.id === selectedClientId;
            const hasUnreadMessages = mockChatMessages.some(m => m.clientId === client.id && !m.read && m.senderType === 'client');

            return (
              <div
                key={client.id}
                onClick={() => setSelectedClientId(client.id)}
                className={`p-4 border-b cursor-pointer transition-colors ${
                  isSelected ? 'bg-blue-50 border-blue-200' : 'hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={client.avatar} />
                      <AvatarFallback>{client.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-gray-900 truncate">{client.name}</p>
                      {lastMessage && (
                        <span className="text-xs text-gray-500">{formatTime(lastMessage.timestamp)}</span>
                      )}
                    </div>
                    <p className="text-xs text-gray-500 truncate">{client.company}</p>
                    {lastMessage && (
                      <p className="text-sm text-gray-600 truncate mt-1">
                        {lastMessage.senderType === 'vendor' ? 'You: ' : ''}{lastMessage.message}
                      </p>
                    )}
                  </div>
                  {hasUnreadMessages && (
                    <Badge variant="destructive" className="h-5 w-5 p-0 flex items-center justify-center text-xs">
                      1
                    </Badge>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {selectedClient ? (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b border-gray-200 bg-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={selectedClient.avatar} />
                    <AvatarFallback>{selectedClient.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{selectedClient.name}</h3>
                    <p className="text-sm text-gray-600">{selectedClient.company}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm" onClick={() => toast.info('Phone call feature coming soon!')}>
                    <Phone className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => toast.info('Video call feature coming soon!')}>
                    <Video className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {clientMessages.map((msg) => {
                const isVendor = msg.senderType === 'vendor';
                return (
                  <div key={msg.id} className={`flex ${isVendor ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                      isVendor 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-gray-100 text-gray-900'
                    }`}>
                      <p className="text-sm">{msg.message}</p>
                      <p className={`text-xs mt-1 ${
                        isVendor ? 'text-blue-200' : 'text-gray-500'
                      }`}>
                        {formatTime(msg.timestamp)}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-gray-200 bg-white">
              <div className="flex items-end space-x-2">
                <div className="flex-1">
                  <Input
                    placeholder="Type your message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                    className="min-h-10"
                  />
                </div>
                <Button onClick={handleSendMessage} disabled={!message.trim()}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No conversation selected</h3>
              <p className="text-gray-600">Choose a client from the sidebar to start chatting.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Chat;
