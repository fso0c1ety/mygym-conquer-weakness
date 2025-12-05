import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from '@/components/ui/use-toast';
import logo from '@/assets/logo.png';
import BottomNav from '@/components/BottomNav';
import { Star, MessageCircle, Award, Users, TrendingUp, Clock, Video, Calendar, Send } from 'lucide-react';

const trainers = [
  {
    id: 1,
    name: 'Emma Johnson',
    specialty: 'Strength & Conditioning',
    status: 'Online',
    image: logo,
    rating: 4.9,
    reviews: 120,
    price: 40,
    experience: '8 years',
    students: 450,
    availability: 'Available now',
    specialties: ['Powerlifting', 'Bodybuilding', 'Olympic Lifting'],
  },
  {
    id: 2,
    name: 'Liam Smith',
    specialty: 'Cardio & HIIT',
    status: 'Online',
    image: logo,
    rating: 4.8,
    reviews: 95,
    price: 35,
    experience: '6 years',
    students: 380,
    availability: 'Available now',
    specialties: ['HIIT', 'Endurance', 'Fat Loss'],
  },
  {
    id: 3,
    name: 'Sophia Lee',
    specialty: 'Yoga & Flexibility',
    status: 'Busy',
    image: logo,
    rating: 4.9,
    reviews: 156,
    price: 30,
    experience: '10 years',
    students: 620,
    availability: 'Next available: 2:00 PM',
    specialties: ['Vinyasa', 'Mobility', 'Meditation'],
  },
  {
    id: 4,
    name: 'Marcus Chen',
    specialty: 'Functional Training',
    status: 'Online',
    image: logo,
    rating: 4.7,
    reviews: 88,
    price: 45,
    experience: '7 years',
    students: 340,
    availability: 'Available now',
    specialties: ['CrossFit', 'Athletic Performance', 'Core'],
  },
  {
    id: 5,
    name: 'Isabella Garcia',
    specialty: 'Nutrition & Wellness',
    status: 'Online',
    image: logo,
    rating: 5.0,
    reviews: 203,
    price: 50,
    experience: '12 years',
    students: 780,
    availability: 'Available now',
    specialties: ['Meal Planning', 'Weight Management', 'Sports Nutrition'],
  },
];

export default function OnlineTrainers() {
  const [bookingDialog, setBookingDialog] = useState(false);
  const [messageDialog, setMessageDialog] = useState(false);
  const [selectedTrainer, setSelectedTrainer] = useState<typeof trainers[0] | null>(null);
  const [bookingDate, setBookingDate] = useState('');
  const [bookingTime, setBookingTime] = useState('');
  const [sessionType, setSessionType] = useState('video');
  const [message, setMessage] = useState('');
  const [conversations, setConversations] = useState<{ [trainerId: number]: Array<{ sender: 'user' | 'trainer', message: string, time: string }> }>({});
  const { toast } = useToast();

  const handleBookSession = (trainer: typeof trainers[0]) => {
    setSelectedTrainer(trainer);
    setBookingDialog(true);
  };

  const handleSendMessage = (trainer: typeof trainers[0]) => {
    setSelectedTrainer(trainer);
    setMessageDialog(true);
  };

  const confirmBooking = () => {
    if (!bookingDate || !bookingTime) {
      toast({
        title: "Missing Information",
        description: "Please select a date and time for your session",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Session Booked! 🎉",
      description: `Your ${sessionType} session with ${selectedTrainer?.name} is confirmed for ${bookingDate} at ${bookingTime}`,
    });

    setBookingDialog(false);
    setBookingDate('');
    setBookingTime('');
    setSessionType('video');
  };

  const sendMessage = () => {
    if (!message.trim() || !selectedTrainer) {
      toast({
        title: "Empty Message",
        description: "Please write a message before sending",
        variant: "destructive"
      });
      return;
    }

    const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    // Add user message
    const newConversation = [
      ...(conversations[selectedTrainer.id] || []),
      { sender: 'user' as const, message: message.trim(), time: currentTime }
    ];

    // Simulate trainer response after a delay
    setTimeout(() => {
      const responses = [
        "Thanks for reaching out! I'd be happy to help you with your fitness goals. What are you looking to achieve?",
        "Great to hear from you! Let me know what questions you have about training.",
        "Hi! I can definitely help you with that. When would be a good time for a session?",
        "Hello! I appreciate your interest. Let's discuss your fitness journey. What's your current experience level?",
        "Thanks for your message! I'll review your goals and get back to you with a customized plan."
      ];
      
      const trainerResponse = responses[Math.floor(Math.random() * responses.length)];
      const responseTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      
      setConversations(prev => ({
        ...prev,
        [selectedTrainer.id]: [
          ...newConversation,
          { sender: 'trainer' as const, message: trainerResponse, time: responseTime }
        ]
      }));
    }, 1500);

    setConversations(prev => ({
      ...prev,
      [selectedTrainer.id]: newConversation
    }));

    toast({
      title: "Message Sent! ✉️",
      description: `Your message has been sent to ${selectedTrainer?.name}`,
    });

    setMessage('');
  };

  return (
    <div className="min-h-screen pb-24">
      {/* Static Background Gradient */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-primary/5 via-background to-secondary/5 pointer-events-none"></div>

      <div className="relative z-10">
        {/* Header */}
        <header className="px-6 pt-8 pb-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 rounded-xl blur-md"></div>
              <div className="relative bg-gradient-to-br from-primary to-secondary p-2 rounded-xl">
                <Users className="w-8 h-8 text-white" />
              </div>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gradient-primary">Expert Trainers</h1>
              <p className="text-sm text-muted-foreground">Connect with certified professionals</p>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            <div className="card-gradient rounded-xl p-3 border border-primary/10">
              <div className="flex items-center gap-2 mb-1">
                <Users className="w-4 h-4 text-primary" />
              </div>
              <div className="text-xl font-bold text-foreground">{trainers.length}</div>
              <div className="text-xs text-muted-foreground">Trainers</div>
            </div>
            <div className="card-gradient rounded-xl p-3 border border-green-500/10">
              <div className="flex items-center gap-2 mb-1">
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
              </div>
              <div className="text-xl font-bold text-foreground">4.9</div>
              <div className="text-xs text-muted-foreground">Avg Rating</div>
            </div>
            <div className="card-gradient rounded-xl p-3 border border-purple-500/10">
              <div className="flex items-center gap-2 mb-1">
                <Award className="w-4 h-4 text-purple-400" />
              </div>
              <div className="text-xl font-bold text-foreground">Certified</div>
              <div className="text-xs text-muted-foreground">Experts</div>
            </div>
          </div>
        </header>

        <div className="px-6">
          <div className="mb-4">
            <h2 className="text-2xl font-bold text-foreground mb-1">Available Now</h2>
            <p className="text-sm text-muted-foreground">Book a session with our top trainers</p>
          </div>

          <div className="space-y-4">
            {trainers.map((trainer) => (
              <div
                key={trainer.id}
                className="card-gradient-glow rounded-2xl p-4 sm:p-5 border border-primary/10 hover:border-primary/30 transition-all group"
              >
                <div className="flex flex-col sm:flex-row items-start gap-4 mb-4">
                  {/* Trainer Avatar */}
                  <div className="relative flex-shrink-0">
                    <div className={`absolute inset-0 ${trainer.status === 'Online' ? 'bg-green-500/30' : 'bg-orange-500/30'} rounded-full blur-md`}></div>
                    <div className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-primary to-secondary p-0.5`}>
                      <img
                        src={trainer.image}
                        alt={trainer.name}
                        className="w-full h-full object-cover rounded-full"
                      />
                    </div>
                    {/* Status Indicator */}
                    <div className={`absolute bottom-0 right-0 w-5 h-5 ${trainer.status === 'Online' ? 'bg-green-500' : 'bg-orange-500'} border-2 border-background rounded-full`}></div>
                  </div>

                  {/* Trainer Info */}
                  <div className="flex-1 min-w-0 w-full">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
                      <div>
                        <h3 className="text-lg sm:text-xl font-bold text-foreground mb-1">{trainer.name}</h3>
                        <p className="text-sm text-muted-foreground">{trainer.specialty}</p>
                      </div>
                      <Badge className={trainer.status === 'Online' ? 'bg-green-500/20 text-green-400 border-green-500/30 w-fit' : 'bg-orange-500/20 text-orange-400 border-orange-500/30 w-fit'}>
                        {trainer.status}
                      </Badge>
                    </div>

                    {/* Rating */}
                    <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-3">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                        <span className="text-sm font-semibold text-foreground">{trainer.rating}</span>
                        <span className="text-xs text-muted-foreground">({trainer.reviews})</span>
                      </div>
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Users className="w-4 h-4" />
                        <span className="text-xs">{trainer.students} students</span>
                      </div>
                    </div>

                    {/* Specialties */}
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {trainer.specialties.map((spec, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs border-border/50 bg-muted/30">
                          {spec}
                        </Badge>
                      ))}
                    </div>

                    {/* Stats Row */}
                    <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-4 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Award className="w-3.5 h-3.5" />
                        <span>{trainer.experience}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        <span className="truncate max-w-[150px]">{trainer.availability}</span>
                      </div>
                    </div>

                    {/* Price & Actions */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                      <div>
                        <div className="text-xl sm:text-2xl font-bold text-gradient-primary">
                          ${trainer.price}
                        </div>
                        <div className="text-xs text-muted-foreground">per session</div>
                      </div>
                      <div className="flex gap-2 w-full sm:w-auto">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleBookSession(trainer)}
                          className="border-primary/30 hover:bg-primary/10 flex-1 sm:flex-none"
                        >
                          <Video className="w-4 h-4 sm:mr-1" />
                          <span className="hidden sm:inline">Book Session</span>
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => handleSendMessage(trainer)}
                          className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 glow-primary flex-1 sm:flex-none"
                        >
                          <MessageCircle className="w-4 h-4 sm:mr-1" />
                          <span className="hidden sm:inline">Message</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Book Session Dialog */}
      <Dialog open={bookingDialog} onOpenChange={setBookingDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Book a Session</DialogTitle>
            <DialogDescription>
              Schedule a training session with {selectedTrainer?.name}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary p-0.5">
                <img src={selectedTrainer?.image} alt={selectedTrainer?.name} className="w-full h-full rounded-full" />
              </div>
              <div>
                <p className="font-semibold">{selectedTrainer?.name}</p>
                <p className="text-sm text-muted-foreground">{selectedTrainer?.specialty}</p>
              </div>
            </div>

            <div>
              <Label htmlFor="sessionType">Session Type</Label>
              <select
                id="sessionType"
                value={sessionType}
                onChange={(e) => setSessionType(e.target.value)}
                className="w-full mt-1 px-3 py-2 bg-background border border-border rounded-md"
              >
                <option value="video">Video Call</option>
                <option value="in-person">In-Person</option>
                <option value="phone">Phone Call</option>
              </select>
            </div>

            <div>
              <Label htmlFor="bookingDate">Date</Label>
              <Input
                id="bookingDate"
                type="date"
                value={bookingDate}
                onChange={(e) => setBookingDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="bookingTime">Time</Label>
              <Input
                id="bookingTime"
                type="time"
                value={bookingTime}
                onChange={(e) => setBookingTime(e.target.value)}
                className="mt-1"
              />
            </div>

            <div className="flex items-center justify-between p-3 bg-primary/10 rounded-lg">
              <span className="text-sm font-semibold">Session Price:</span>
              <span className="text-2xl font-bold text-gradient-primary">${selectedTrainer?.price}</span>
            </div>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setBookingDialog(false)} className="flex-1">
              Cancel
            </Button>
            <Button onClick={confirmBooking} className="flex-1 bg-gradient-to-r from-primary to-secondary glow-primary">
              <Calendar className="w-4 h-4 mr-2" />
              Confirm Booking
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Message Dialog */}
      <Dialog open={messageDialog} onOpenChange={setMessageDialog}>
        <DialogContent className="sm:max-w-lg max-h-[80vh] flex flex-col">
          <DialogHeader>
            <DialogTitle>Chat with {selectedTrainer?.name}</DialogTitle>
            <DialogDescription>
              {selectedTrainer?.specialty}
            </DialogDescription>
          </DialogHeader>
          
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Trainer Info */}
            <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg mb-4">
              <div className="relative w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary p-0.5">
                <img src={selectedTrainer?.image} alt={selectedTrainer?.name} className="w-full h-full rounded-full" />
                <div className={`absolute bottom-0 right-0 w-3 h-3 ${selectedTrainer?.status === 'Online' ? 'bg-green-500' : 'bg-orange-500'} border-2 border-background rounded-full`}></div>
              </div>
              <div className="flex-1">
                <p className="font-semibold">{selectedTrainer?.name}</p>
                <p className="text-xs text-muted-foreground">{selectedTrainer?.status}</p>
              </div>
              <Badge className={selectedTrainer?.status === 'Online' ? 'bg-green-500/20 text-green-400 border-green-500/30' : 'bg-orange-500/20 text-orange-400 border-orange-500/30'}>
                {selectedTrainer?.status}
              </Badge>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto space-y-3 mb-4 p-2 bg-muted/20 rounded-lg min-h-[200px] max-h-[300px]">
              {selectedTrainer && conversations[selectedTrainer.id]?.length > 0 ? (
                conversations[selectedTrainer.id].map((msg, idx) => (
                  <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[75%] ${msg.sender === 'user' ? 'bg-gradient-to-r from-primary to-secondary text-white' : 'bg-card border border-border/50'} rounded-2xl px-4 py-2`}>
                      <p className="text-sm">{msg.message}</p>
                      <p className={`text-xs mt-1 ${msg.sender === 'user' ? 'text-white/70' : 'text-muted-foreground'}`}>
                        {msg.time}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex items-center justify-center h-full text-muted-foreground text-sm">
                  <div className="text-center">
                    <MessageCircle className="w-12 h-12 mx-auto mb-2 opacity-50" />
                    <p>No messages yet. Start the conversation!</p>
                  </div>
                </div>
              )}
            </div>

            {/* Message Input */}
            <div className="space-y-3">
              <div className="flex gap-2">
                <Textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      sendMessage();
                    }
                  }}
                  placeholder="Type your message..."
                  className="min-h-[80px] resize-none"
                />
              </div>
              
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setMessageDialog(false)} className="flex-1">
                  Close
                </Button>
                <Button onClick={sendMessage} className="flex-1 bg-gradient-to-r from-primary to-secondary glow-primary">
                  <Send className="w-4 h-4 mr-2" />
                  Send
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <BottomNav />
    </div>
  );
}
