import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import logo from '@/assets/logo.png';
import BottomNav from '@/components/BottomNav';
import { Star, MessageCircle, Award, Users, TrendingUp, Clock, Video } from 'lucide-react';

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
  return (
    <div className="min-h-screen pb-24">
      {/* Animated background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-40 left-10 w-64 h-64 bg-secondary/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }}></div>
      </div>

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
                className="card-gradient-glow rounded-2xl p-5 border border-primary/10 hover:border-primary/30 transition-all group"
              >
                <div className="flex items-start gap-4 mb-4">
                  {/* Trainer Avatar */}
                  <div className="relative flex-shrink-0">
                    <div className={`absolute inset-0 ${trainer.status === 'Online' ? 'bg-green-500/30' : 'bg-orange-500/30'} rounded-full blur-md`}></div>
                    <div className={`relative w-20 h-20 rounded-full bg-gradient-to-br from-primary to-secondary p-0.5`}>
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
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="text-xl font-bold text-foreground mb-1">{trainer.name}</h3>
                        <p className="text-sm text-muted-foreground">{trainer.specialty}</p>
                      </div>
                      <Badge className={trainer.status === 'Online' ? 'bg-green-500/20 text-green-400 border-green-500/30' : 'bg-orange-500/20 text-orange-400 border-orange-500/30'}>
                        {trainer.status}
                      </Badge>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center gap-3 mb-3">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                        <span className="text-sm font-semibold text-foreground">{trainer.rating}</span>
                        <span className="text-xs text-muted-foreground">({trainer.reviews} reviews)</span>
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
                    <div className="flex items-center gap-4 mb-4 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Award className="w-3.5 h-3.5" />
                        <span>{trainer.experience}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{trainer.availability}</span>
                      </div>
                    </div>

                    {/* Price & Actions */}
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-2xl font-bold text-gradient-primary">
                          ${trainer.price}
                        </div>
                        <div className="text-xs text-muted-foreground">per session</div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-primary/30 hover:bg-primary/10"
                        >
                          <Video className="w-4 h-4 mr-1" />
                          Book Session
                        </Button>
                        <Button
                          size="sm"
                          className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 glow-primary"
                        >
                          <MessageCircle className="w-4 h-4 mr-1" />
                          Message
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

      <BottomNav />
    </div>
  );
}
