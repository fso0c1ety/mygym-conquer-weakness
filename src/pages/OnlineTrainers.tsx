import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import logo from '@/assets/logo.png';
import BottomNav from '@/components/BottomNav';

const trainers = [
  {
    id: 1,
    name: 'Emma Johnson',
    specialty: 'Strength & Conditioning',
    status: 'Online',
    image: logo, // Replace with trainer image if available
  },
  {
    id: 2,
    name: 'Liam Smith',
    specialty: 'Cardio & HIIT',
    status: 'Online',
    image: logo,
  },
  {
    id: 3,
    name: 'Sophia Lee',
    specialty: 'Yoga & Flexibility',
    status: 'Online',
    image: logo,
  },
];

export default function OnlineTrainers() {
  return (
    <div className="min-h-screen bg-background pb-20">
      <header className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center gap-3">
          <img src={logo} alt="MY GYM" className="w-10 h-10" />
          <div>
            <h1 className="text-xl font-bold text-foreground">Online Trainers</h1>
            <p className="text-xs text-muted-foreground">Connect with a professional now</p>
          </div>
        </div>
      </header>
      <div className="p-6 grid gap-6">
        {trainers.map((trainer) => (
          <Card key={trainer.id} className="flex flex-col md:flex-row items-center gap-6 p-4">
            <img src={trainer.image} alt={trainer.name} className="w-20 h-20 rounded-full object-cover border-2 border-primary" />
            <CardContent className="flex-1 w-full">
              <CardTitle className="text-lg font-bold">{trainer.name}</CardTitle>
              <CardDescription className="mb-2">{trainer.specialty}</CardDescription>
              <Badge variant="default" className="mb-2">{trainer.status}</Badge>
              <div>
                <Button variant="default" className="w-full md:w-auto">Message</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <BottomNav />
    </div>
  );
}
